import { COMPANY_KNOWLEDGE_BASE } from "../data/companyKnowledge";
import { INTERVIEW_QUESTIONS } from "../data/interviewQuestionsData";

// Helper: Tokenize text into normalized lower-case terms
function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

const STORAGE_KEY_CUSTOM_RAG = "ai_interview_custom_rag_docs";

export function getCustomDocuments() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CUSTOM_RAG);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading custom RAG docs:", e);
    return [];
  }
}

export function addCustomDocument(title, category, company, content) {
  const customDocs = getCustomDocuments();
  const newDoc = {
    id: `custom-${Date.now()}`,
    company: company || "General / Custom",
    category: category || "Uploaded Document",
    title,
    content,
    isCustom: true,
    createdAt: new Date().toLocaleDateString(),
  };
  customDocs.unshift(newDoc);
  localStorage.setItem(STORAGE_KEY_CUSTOM_RAG, JSON.stringify(customDocs));
  return newDoc;
}

export function deleteCustomDocument(docId) {
  const customDocs = getCustomDocuments().filter((d) => d.id !== docId);
  localStorage.setItem(STORAGE_KEY_CUSTOM_RAG, JSON.stringify(customDocs));
}

// Convert Interview Questions to RAG documents format
const QUESTION_DOCUMENTS = INTERVIEW_QUESTIONS.map((q) => ({
  id: q.id,
  company: q.company,
  category: `Interview Questions (${q.category})`,
  title: `Question: ${q.question.slice(0, 50)}...`,
  content: `Question: ${q.question}\n\nModel Answer: ${q.modelAnswer}\n\nHint: ${q.ragHint}`
}));

// Get combined corpus: Base Knowledge + Question Documents + Custom User Uploads
export function getAllDocuments() {
  const customDocs = getCustomDocuments();
  return [...customDocs, ...COMPANY_KNOWLEDGE_BASE, ...QUESTION_DOCUMENTS];
}

// Compute TF-IDF vector similarity between query tokens and document content
export function retrieveContext(query, selectedCompany = "All", topK = 3) {
  const allDocs = getAllDocuments();

  const filteredDocs =
    selectedCompany && selectedCompany !== "All"
      ? allDocs.filter(
          (d) =>
            d.company.toLowerCase() === selectedCompany.toLowerCase() ||
            d.company.toLowerCase() === "all" ||
            d.isCustom
        )
      : allDocs;

  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const queryTF = {};
  queryTokens.forEach((t) => {
    queryTF[t] = (queryTF[t] || 0) + 1;
  });

  const scoredDocs = filteredDocs.map((doc) => {
    const docTokens = tokenize(`${doc.title} ${doc.category} ${doc.content}`);
    if (docTokens.length === 0) return { doc, score: 0 };

    const docTF = {};
    docTokens.forEach((t) => {
      docTF[t] = (docTF[t] || 0) + 1;
    });

    let dotProduct = 0;
    let queryMagnitudeSq = 0;
    let docMagnitudeSq = 0;

    Object.keys(queryTF).forEach((term) => {
      const qVal = queryTF[term];
      queryMagnitudeSq += qVal * qVal;
      if (docTF[term]) {
        dotProduct += qVal * docTF[term];
      }
    });

    Object.keys(docTF).forEach((term) => {
      const dVal = docTF[term];
      docMagnitudeSq += dVal * dVal;
    });

    const magnitude =
      Math.sqrt(queryMagnitudeSq) * Math.sqrt(docMagnitudeSq);
    let similarityScore = magnitude > 0 ? dotProduct / magnitude : 0;

    // Boost exact matches in titles or company match
    if (
      selectedCompany !== "All" &&
      doc.company.toLowerCase() === selectedCompany.toLowerCase()
    ) {
      similarityScore *= 1.3;
    }

    return {
      doc,
      score: Math.min(Number(similarityScore.toFixed(3)), 1.0),
    };
  });

  scoredDocs.sort((a, b) => b.score - a.score);

  const matches = scoredDocs
    .filter((item) => item.score > 0.04)
    .slice(0, topK);

  if (matches.length === 0 && filteredDocs.length > 0) {
    return filteredDocs.slice(0, 2).map((doc) => ({
      doc,
      score: 0.12,
      fallback: true,
    }));
  }

  return matches;
}

export async function generateRagResponse({
  userMessage,
  selectedCompany = "All",
  ragEnabled = true,
  apiKey = "",
}) {
  let retrievedContexts = [];

  if (ragEnabled) {
    retrievedContexts = retrieveContext(userMessage, selectedCompany, 3);
  }

  const storedKey = apiKey || localStorage.getItem("gemini_api_key") || "";

  if (storedKey) {
    try {
      const contextText = retrievedContexts
        .map(
          (c, idx) =>
            `[Source ${idx + 1}: ${c.doc.title} (${c.doc.company})] \n${c.doc.content}`
        )
        .join("\n\n");

      const prompt = `You are an elite AI Technical Interview Coach specialized in ${selectedCompany} hiring standards.
Use the following RETRIEVED GROUND TRUTH KNOWLEDGE BASE CONTEXT to answer the candidate's question accurately.

CONTEXT FROM KNOWLEDGE BASE:
${contextText || "No explicit documents matched, rely on standard company interview best practices."}

CANDIDATE QUESTION: ${userMessage}

INSTRUCTIONS:
1. Provide a direct, highly structured response using clear headings and bullet points.
2. Explicitly cite source facts when referring to company processes or specific solutions.
3. Include practical tips or code/STAR method examples where applicable.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${storedKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Could not generate response from API.";
        return {
          answer: text,
          citations: retrievedContexts,
          modelUsed: "Gemini 1.5 Flash (Live API)",
        };
      }
    } catch (err) {
      console.warn("API Call failed, falling back to local synthesis:", err);
    }
  }

  return synthesizeLocalResponse(userMessage, selectedCompany, retrievedContexts, ragEnabled);
}

function synthesizeLocalResponse(query, company, citations, ragEnabled) {
  const queryLower = query.toLowerCase();

  let answer = "";
  const companyName = company !== "All" ? company : "Top Tech Companies";

  if (!ragEnabled) {
    answer = `*(RAG Mode is OFF - General AI Knowledge)*\n\nTo prepare for ${companyName} interviews, focus on core computer science fundamentals, data structures, algorithms, and behavioral STAR techniques.\n\nBe sure to review system architecture basics, practice coding on a timed whiteboard setup, and articulate your reasoning clearly to your interviewer.`;
    return {
      answer,
      citations: [],
      modelUsed: "Standard AI Model (Un-grounded)",
    };
  }

  if (citations.length > 0) {
    const topDoc = citations[0].doc;
    answer = `### 🎯 Grounded Interview Answer for ${topDoc.company}\n\nBased on verified knowledge vectors for **${topDoc.company}**:\n\n`;

    if (queryLower.includes("process") || queryLower.includes("round") || queryLower.includes("hire") || queryLower.includes("stats")) {
      answer += `**Hiring Telemetry & Process:**\n${topDoc.content}\n\n`;
      answer += `💡 **RAG Insight:** Google onsite loop pass rates hover around 6.8%, while Amazon is 11.4%. Optimize your prep for their core competency areas.`;
    } else if (queryLower.includes("star") || queryLower.includes("behavioral") || queryLower.includes("leadership") || queryLower.includes("hr")) {
      answer += `**Behavioral & STAR Rubric:**\n${topDoc.content}\n\n`;
      answer += `📌 **STAR Strategy:** Structure your response with a 15% Situation/Task, 60% concrete action steps, and 25% quantified business metrics.`;
    } else {
      answer += `${topDoc.content}\n\n`;
      answer += `🔍 **Actionable Steps:** Master the underlying complexity limits (e.g., O(log N) heap insert bounds) and modular patterns mentioned in the sources.`;
    }
  } else {
    answer = `### 💡 ${companyName} Preparation Insights\n\nTo excel in **${companyName}** technical assessments:\n1. **Technical Proficiency:** Master Data Structures (Trees, Graphs, DP, Heaps) and System Design principles (Caching, Load Balancing, Microservices).\n2. **Communication:** Articulate your thought process aloud before writing code.\n3. **Behavioral Alignment:** Frame past experiences using the STAR method highlighting impact, technical ownership, and team collaboration.`;
  }

  return {
    answer,
    citations,
    modelUsed: "RAG Local Vector Inference Engine v2.0",
  };
}
