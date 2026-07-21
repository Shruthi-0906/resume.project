import { useState, useEffect, useRef } from "react";
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaDatabase,
  FaSlidersH,
  FaKey,
  FaVolumeUp,
  FaVolumeMute,
  FaQuoteRight,
  FaTrashAlt,
  FaPlus,
  FaCheck,
  FaBrain,
  FaInfoCircle,
  FaCopy,
} from "react-icons/fa";
import {
  generateRagResponse,
  getAllDocuments,
  addCustomDocument,
  deleteCustomDocument,
  getCustomDocuments,
} from "../services/ragEngine";
import "./RagChatbot.css";

function RagChatbot() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("rag_chat_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: "msg-welcome",
        sender: "ai",
        text: "👋 Hello! I am your **RAG AI Interview Assistant**. Select a target company or upload custom interview materials/JDs to get grounded, company-tailored interview guidance with citations!",
        citations: [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
  });

  const [input, setInput] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(() => {
    return localStorage.getItem("company") || "All";
  });
  const [ragEnabled, setRagEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("gemini_api_key") || "");
  const [copiedId, setCopiedId] = useState(null);

  // Custom Document Form state
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocCompany, setNewDocCompany] = useState("General");
  const [newDocCategory, setNewDocCategory] = useState("Job Description");
  const [newDocContent, setNewDocContent] = useState("");
  const [customDocsList, setCustomDocsList] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    setCustomDocsList(getCustomDocuments());
  }, []);

  useEffect(() => {
    localStorage.setItem("rag_chat_history", JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    localStorage.setItem("company", selectedCompany);
  }, [selectedCompany]);

  const handleSend = async (textToSend) => {
    const queryText = textToSend || input;
    if (!queryText.trim() || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const result = await generateRagResponse({
        userMessage: queryText,
        selectedCompany,
        ragEnabled,
        apiKey,
      });

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: result.answer,
        citations: result.citations || [],
        modelUsed: result.modelUsed,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (speechEnabled && "speechSynthesis" in window) {
        const cleanText = result.answer.replace(/[*#_]/g, "");
        const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 250));
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "⚠️ Apologies, an issue occurred while processing your request. Please try again.",
          citations: [],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveApiKey = () => {
    localStorage.setItem("gemini_api_key", apiKey.trim());
    setShowApiKeyModal(false);
  };

  const handleAddCustomDoc = (e) => {
    e.preventDefault();
    if (!newDocTitle.trim() || !newDocContent.trim()) return;

    addCustomDocument(newDocTitle, newDocCategory, newDocCompany, newDocContent);
    setCustomDocsList(getCustomDocuments());
    setNewDocTitle("");
    setNewDocContent("");
    alert("✅ Document indexed into RAG vector memory successfully!");
  };

  const handleDeleteCustomDoc = (docId) => {
    deleteCustomDocument(docId);
    setCustomDocsList(getCustomDocuments());
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalIndexedDocs = getAllDocuments().length;

  const quickPrompts = [
    { label: "Amazon STAR Method", prompt: "Explain Amazon STAR method with a behavioral question model answer." },
    { label: "Google System Design", prompt: "How to approach Google System Design rounds for typeahead / search autocomplete?" },
    { label: "Zoho C Coding Round", prompt: "What are the key topics and pattern questions asked in Zoho coding round?" },
    { label: "TCS SQL Queries", prompt: "Give top SQL query patterns asked in TCS Digital technical interview." },
    { label: "Infosys Web & ACID", prompt: "Explain DBMS ACID properties and React Virtual DOM differences for Infosys SE." },
  ];

  return (
    <div className="rag-chatbot-page">

      {/* TOP RAG CONTROLS BAR */}
      <div className="rag-header">

        <div className="rag-header-title">
          <FaBrain className="rag-logo-icon" />
          <div>
            <h1>AI RAG Interview Chatbot</h1>
            <p>Company-tailored vector search & citation-grounded prep</p>
          </div>
        </div>

        <div className="rag-header-controls">

          {/* Company Target Filter */}
          <div className="control-group">
            <label>Target Company:</label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="company-select"
            >
              <option value="All">🌐 All Tech Companies</option>
              <option value="Google">Google</option>
              <option value="Amazon">Amazon</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Zoho">Zoho</option>
              <option value="TCS">TCS</option>
              <option value="Infosys">Infosys</option>
              <option value="Meta">Meta</option>
              <option value="Uber">Uber</option>
            </select>
          </div>

          {/* RAG Mode Toggle */}
          <button
            className={`rag-toggle-btn ${ragEnabled ? "active" : ""}`}
            onClick={() => setRagEnabled(!ragEnabled)}
            title="Toggle Retrieval-Augmented Generation mode"
          >
            <FaDatabase />
            <span>RAG Mode: {ragEnabled ? "ON 🟢" : "OFF ⚪"}</span>
          </button>

          {/* Knowledge Drawer Button */}
          <button
            className="header-icon-btn"
            onClick={() => setShowDocModal(true)}
            title="View Indexed Knowledge Vault"
          >
            <FaSlidersH />
            <span>Vault ({totalIndexedDocs})</span>
          </button>

          {/* API Key Modal Button */}
          <button
            className={`header-icon-btn ${apiKey ? "configured" : ""}`}
            onClick={() => setShowApiKeyModal(true)}
            title="Configure Gemini API Key"
          >
            <FaKey />
            <span>{apiKey ? "API Key Set" : "Add Key"}</span>
          </button>

          {/* Speech Synthesis Toggle */}
          <button
            className={`header-icon-btn ${speechEnabled ? "active" : ""}`}
            onClick={() => setSpeechEnabled(!speechEnabled)}
            title="Toggle Text-to-Speech"
          >
            {speechEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>

        </div>

      </div>

      {/* RAG STATUS BANNER */}
      <div className="rag-status-banner">
        <FaInfoCircle className="info-icon" />
        <span>
          Active Context: <strong>{selectedCompany}</strong> | Vector Store:{" "}
          <strong>{totalIndexedDocs} Indexed Documents</strong> | Grounding Engine:{" "}
          <strong>{ragEnabled ? "Retrieval-Augmented Vector Search" : "Standard LLM Mode"}</strong>
        </span>
      </div>

      {/* CHAT MESSAGES DISPLAY */}
      <div className="chat-container">

        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender}`}>

            <div className="avatar">
              {msg.sender === "ai" ? <FaRobot /> : <FaUser />}
            </div>

            <div className="message-content">

              <div className="message-header">
                <span className="sender-name">
                  {msg.sender === "ai" ? "AI Interview Coach" : "You"}
                </span>
                <span className="timestamp">{msg.timestamp}</span>

                {msg.sender === "ai" && (
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard(msg.text, msg.id)}
                    title="Copy Answer"
                  >
                    {copiedId === msg.id ? <FaCheck className="check-icon" /> : <FaCopy />}
                  </button>
                )}
              </div>

              {/* Render message formatting */}
              <div className="message-text">
                {msg.text.split("\n").map((line, i) => {
                  if (line.startsWith("### ")) {
                    return <h3 key={i}>{line.replace("### ", "")}</h3>;
                  }
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return <strong key={i}>{line.replace(/\*\*/g, "")}</strong>;
                  }
                  return <p key={i}>{line}</p>;
                })}
              </div>

              {/* RAG GROUNDING CITATIONS DRAWER */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="citations-box">
                  <div className="citations-title">
                    <FaQuoteRight /> Grounded Context & Sources ({msg.citations.length} Documents Matched):
                  </div>

                  <div className="citations-list">
                    {msg.citations.map((c, index) => (
                      <div key={index} className="citation-card">
                        <div className="citation-card-header">
                          <span className="citation-badge">Source {index + 1}</span>
                          <span className="citation-company">{c.doc.company}</span>
                          <span className="citation-score">
                            Match: {(c.score * 100).toFixed(0)}%
                          </span>
                        </div>
                        <h4>{c.doc.title}</h4>
                        <p className="citation-snippet">"{c.doc.content.slice(0, 180)}..."</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {msg.modelUsed && (
                <div className="model-tag font-mono">
                  Engine: {msg.modelUsed}
                </div>
              )}

            </div>

          </div>
        ))}

        {isTyping && (
          <div className="chat-message ai typing">
            <div className="avatar"><FaRobot /></div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
              <p className="typing-text font-mono">Retrieving context & synthesizing response...</p>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />

      </div>

      {/* PRESET PROMPT CHIPS */}
      <div className="quick-prompts-bar">
        <span>Quick Topics:</span>
        {quickPrompts.map((item, idx) => (
          <button
            key={idx}
            className="prompt-chip"
            onClick={() => handleSend(item.prompt)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* CHAT INPUT AREA */}
      <div className="chat-input-area">

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="input-wrapper"
        >
          <input
            type="text"
            placeholder={`Ask a question tailored for ${selectedCompany} interviews...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
          />

          <button
            type="submit"
            className="send-btn"
            disabled={!input.trim() || isTyping}
          >
            <FaPaperPlane />
            <span>Send</span>
          </button>
        </form>

      </div>

      {/* MODAL 1: KNOWLEDGE VAULT & CUSTOM DOC INGESTION */}
      {showDocModal && (
        <div className="modal-overlay" onClick={() => setShowDocModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2><FaDatabase /> Knowledge Vault & Custom Ingestion</h2>
              <button className="close-btn" onClick={() => setShowDocModal(false)}>✕</button>
            </div>

            <div className="modal-body">

              {/* Add Custom Document Form */}
              <div className="add-doc-section">
                <h3><FaPlus /> Index Custom Document / Job Description</h3>
                <form onSubmit={handleAddCustomDoc}>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Document Title (e.g., Senior React Dev Job Description)"
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                      required
                    />
                    <select
                      value={newDocCompany}
                      onChange={(e) => setNewDocCompany(e.target.value)}
                    >
                      <option value="General">General / Custom</option>
                      <option value="Google">Google</option>
                      <option value="Amazon">Amazon</option>
                      <option value="Microsoft">Microsoft</option>
                      <option value="Zoho">Zoho</option>
                      <option value="TCS">TCS</option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Paste job description text, interview questions, or company notes here..."
                    rows="4"
                    value={newDocContent}
                    onChange={(e) => setNewDocContent(e.target.value)}
                    required
                  ></textarea>

                  <button type="submit" className="action-btn">
                    Index Into Vector Memory
                  </button>
                </form>
              </div>

              {/* List Indexed Documents */}
              <div className="docs-list-section">
                <h3>Indexed Document Store ({totalIndexedDocs} Total)</h3>
                <div className="docs-scroll-list">
                  {getAllDocuments().map((doc) => (
                    <div key={doc.id} className="doc-item-card">
                      <div>
                        <h4>{doc.title}</h4>
                        <span className="doc-tag">{doc.company}</span>
                        <span className="doc-tag category">{doc.category}</span>
                        {doc.isCustom && <span className="doc-tag custom">User Upload</span>}
                      </div>

                      {doc.isCustom && (
                        <button
                          className="delete-doc-btn"
                          onClick={() => handleDeleteCustomDoc(doc.id)}
                          title="Delete Document"
                        >
                          <FaTrashAlt />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: GEMINI API KEY SETUP */}
      {showApiKeyModal && (
        <div className="modal-overlay" onClick={() => setShowApiKeyModal(false)}>
          <div className="modal-content mini" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2><FaKey /> Configure Gemini API Key</h2>
              <button className="close-btn" onClick={() => setShowApiKeyModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <p className="modal-desc">
                Entering your Gemini API key enables full live AI generation grounded in vector search. Leave blank to use the high-performance offline local RAG engine!
              </p>

              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="api-input"
              />

              <div className="modal-actions">
                <button
                  className="action-btn clear"
                  onClick={() => {
                    setApiKey("");
                    localStorage.removeItem("gemini_api_key");
                  }}
                >
                  Clear Key
                </button>
                <button className="action-btn" onClick={handleSaveApiKey}>
                  Save & Apply Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default RagChatbot;
