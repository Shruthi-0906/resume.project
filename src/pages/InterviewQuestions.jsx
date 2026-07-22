import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBrain,
  FaLightbulb,
  FaCheckCircle,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaTrophy,
} from "react-icons/fa";
import { INTERVIEW_QUESTIONS } from "../data/interviewQuestionsData";
import "./InterviewQuestions.css";

function InterviewQuestions() {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState(() => {
    return localStorage.getItem("company") || "Google";
  });
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filteredQuestions = INTERVIEW_QUESTIONS.filter((q) => {
    const matchCompany =
      selectedCompany === "All" ||
      q.company.toLowerCase() === selectedCompany.toLowerCase();
    const matchCat =
      categoryFilter === "All" ||
      q.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
      q.topic.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCompany && matchCat && matchSearch;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="interview-page-container">

      {/* HEADER */}
      <div className="questions-header-bar glass-panel">
        <div>
          <h1>Structured Question Bank</h1>
          <p>Past questions, frequency matrices, complete code blocks, and RAG hints.</p>
        </div>

        <div className="picker-box">
          <label>Selected Target:</label>
          <select
            value={selectedCompany}
            onChange={(e) => {
              setSelectedCompany(e.target.value);
              localStorage.setItem("company", e.target.value);
            }}
          >
            <option value="All">All Companies</option>
            <option value="Google">Google</option>
            <option value="Amazon">Amazon</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Zoho">Zoho</option>
          </select>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="filter-panel-row">
        <div className="search-wrapper">
          <FaSearch />
          <input
            type="text"
            placeholder="Search topics (e.g. Heap, Cache, System)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-tabs-row">
          {["All", "Algorithms", "System Design", "Behavioral", "Machine Coding"].map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${categoryFilter === cat ? "active" : ""}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* LIST OF QUESTIONS */}
      <div className="questions-scroll-list">
        {filteredQuestions.length === 0 ? (
          <div className="no-questions glass-panel">
            <p>No questions matched your search criteria. Try switching the target company filter.</p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedId === q.id;

            return (
              <div key={q.id} className={`question-vault-card glass-panel ${isExpanded ? "expanded" : ""}`}>
                <div className="question-summary-row" onClick={() => toggleExpand(q.id)}>
                  <div className="badge-row">
                    <span className="index-badge">Q{idx + 1}</span>
                    <span className="company-tag">{q.company}</span>
                    <span className="role-tag">{q.role}</span>
                    <span className={`difficulty-tag ${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                    <span className="frequency-badge">🔥 {q.frequency}% Freq</span>
                  </div>

                  <h3>{q.question}</h3>

                  <div className="expand-chevron">
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="question-expanded-details">
                    <div className="answer-section">
                      <h4><FaCheckCircle className="icon success" /> Solution Guide & Code:</h4>
                      <pre className="code-container">
                        <code>{q.modelAnswer}</code>
                      </pre>
                    </div>

                    <div className="rag-tip-section">
                      <FaLightbulb className="hint-icon" />
                      <div>
                        <h5>RAG Grounding Hint:</h5>
                        <p>{q.ragHint}</p>
                      </div>
                    </div>

                    <div className="action-buttons-row">
                      <button className="ask-rag-btn" onClick={() => navigate("/chatbot")}>
                        <FaBrain /> Ask RAG Coach for Code Variations
                      </button>
                      <button className="practice-mock-btn" onClick={() => navigate("/mock")}>
                        Start Timed Mock Session
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

export default InterviewQuestions;