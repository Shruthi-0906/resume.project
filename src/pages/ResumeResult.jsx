import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle, FaBrain, FaArrowLeft } from "react-icons/fa";
import "./ResumeResult.css";

function ResumeResult() {
  const navigate = useNavigate();
  const company = localStorage.getItem("company") || "Google";

  return (
    <div className="resume-result-container">

      {/* HEADER */}
      <div className="result-header-panel glass-panel">
        <button className="back-btn" onClick={() => navigate("/resume")}>
          <FaArrowLeft /> Back to Upload
        </button>
        <div>
          <h1>Parsing Analysis Results</h1>
          <p>Grounding metrics mapped against active **{company} SDE-II** target profiles.</p>
        </div>
      </div>

      {/* MATCH SCORE BLOCK */}
      <div className="result-main-card glass-panel">
        <div className="match-gauge-circle">
          <h1>88%</h1>
          <p>Target Match</p>
        </div>
        <div className="match-status-info">
          <span className="match-status-badge high">HIGH ALIGNMENT</span>
          <h2>Resume matches {company} criteria.</h2>
          <p>
            Your experiences align well with standard engineering competencies. Some minor gaps identified in distributed frameworks can be optimized via custom RAG topics.
          </p>
        </div>
      </div>

      {/* SKILL GAP GRID */}
      <div className="skills-gap-grid">

        <div className="skill-status-card glass-panel positive">
          <h3><FaCheckCircle /> Matches Found:</h3>
          <ul>
            <li>Strong JavaScript, React, and Front-End rendering vectors.</li>
            <li>Solid database normalization & transactional query layouts (SQL).</li>
            <li>Modular OOP architecture (classes, encapsulation, SOLID design).</li>
          </ul>
        </div>

        <div className="skill-status-card glass-panel negative">
          <h3><FaExclamationCircle /> Missing Competency Gaps:</h3>
          <ul>
            <li>No mention of distributed caches (e.g., Redis, Memcached).</li>
            <li>Lack of clear concurrency references (e.g. mutex locks, multi-threading).</li>
            <li>AWS Cloud storage structures not explicitly detailed.</li>
          </ul>
        </div>

      </div>

      {/* STRATEGIC SUGGESTIONS */}
      <div className="strategic-actions-box glass-panel">
        <h2><FaBrain /> Recommended Action Checklist:</h2>
        <ol>
          <li>
            <strong>Add Caching Projects:</strong> Update projects description with Redis integrations.
          </li>
          <li>
            <strong>Study Concurrency:</strong> Ask RAG chatbot: <em>"Thread synchronization and locks in Microsoft interviews"</em>.
          </li>
          <li>
            <strong>Tweak Resume:</strong> Re-upload resume targeting the identified missing areas.
          </li>
        </ol>

        <div className="result-actions-row">
          <button className="btn-action-primary" onClick={() => navigate("/chatbot")}>
            Query RAG Chatbot to Fix Gaps
          </button>
          <button className="btn-action-secondary" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </div>

    </div>
  );
}

export default ResumeResult;