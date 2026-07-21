import { COMPANY_KNOWLEDGE_BASE } from "../data/companyKnowledge";

// Helper: Tokenize text into normalized lower-case terms
function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

// Custom user uploaded knowledge store (stored in localStorage)
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

// Get combined corpus: Base Knowledge + Custom User Uploads
export function getAllDocuments() {
  const customDocs = getCustomDocuments();
  return [...customDocs, ...COMPANY_KNOWLEDGE_BASE];
}

// Compute TF-IDF vector similarity between query tokens and document content
export function retrieveContext(query, selectedCompany = "All", topK = 3) {
  const allDocs = getAllDocuments();

  // Filter docs by company if specified
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

  // Count term frequencies across query
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

    // Simple Dot Product / Cosine similarity score calculation
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

    // Company exact match boost
    if (
      selectedCompany !== "All" &&
      doc.company.toLowerCase() === selectedCompany.toLowerCase()
    ) {
      similarityScore *= 1.25;
    }

    return {
      doc,
      score: Math.min(Number(similarityScore.toFixed(3)), 1.0),
    };
  });

  // Sort descending by similarity score
  scoredDocs.sort((a, b) => b.score - a.score);

  // Return top K non-zero matching contexts
  const matches = scoredDocs
    .filter((item) => item.score > 0.05)
    .slice(0, topK);

  // If no match found above threshold, fallback to top 2 docs of selected company
  if (matches.length === 0 && filteredDocs.length > 0) {
    return filteredDocs.slice(0, 2).map((doc) => ({
      doc,
      score: 0.15,
      fallback: true,
    }));
  }

  return matches;
}

// Generate RAG Synthesized AI Response using retrieved context
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

  // Check if user provided Gemini API Key in localStorage or parameters
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

  // Offline / Local Grounded Synthesis Engine
  return synthesizeLocalResponse(userMessage, selectedCompany, retrievedContexts, ragEnabled);
}

// Local Grounded Synthesizer
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
    answer = `### 🎯 RAG Grounded Answer for ${topDoc.company}\n\nBased on verified knowledge vectors for **${topDoc.company}** (*Category: ${topDoc.category}*):\n\n`;

    if (queryLower.includes("process") || queryLower.includes("round") || queryLower.includes("hire") || queryLower.includes("how")) {
      answer += `**Key Interview Structure & Requirements:**\n${topDoc.content}\n\n`;
      answer += `💡 **Preparation Strategy:** Focus on writing bug-free code, analyzing time & space complexity, and demonstrating clear verbal communication during technical problem solving.`;
    } else if (queryLower.includes("star") || queryLower.includes("behavioral") || queryLower.includes("leadership") || queryLower.includes("hr")) {
      answer += `**Behavioral & Leadership Evaluation:**\n${topDoc.content}\n\n`;
      answer += `📌 **Pro Tip:** When answering behavioral questions, spend 60% of your time detailing your specific actions and technical decisions, and conclude with quantifiable metrics!`;
    } else {
      answer += `**Retrieved Technical Knowledge:**\n${topDoc.content}\n\n`;
      answer += `🔍 **Actionable Steps:** Master the underlying data structures, edge cases, and architectural trade-offs mentioned above.`;
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
