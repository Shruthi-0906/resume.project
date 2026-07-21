import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  FaFileAlt,
  FaRobot,
  FaChartLine,
  FaFire,
  FaTrophy,
  FaBrain,
  FaBuilding,
  FaQuestionCircle,
  FaMapMarkedAlt,
  FaArrowRight,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [activeCompany] = useState(() => {
    return localStorage.getItem("company") || "Google";
  });

  return (
    <div className="dashboard">

      {/* TOP BANNER */}
      <div className="top-banner">
        <div>
          <h1>Welcome Shruthi 👋</h1>
          <p>Your AI RAG Career Assistant & Interview Preparation Coach</p>
        </div>

        <div className="banner-right-badges">
          <div className="company-badge-dash" onClick={() => navigate("/company")}>
            <FaBuilding />
            <span>Target: <strong>{activeCompany}</strong></span>
          </div>

          <div className="streak-box">
            <FaFire />
            <span>7 Day Streak</span>
          </div>
        </div>
      </div>

      {/* RAG FEATURED HERO BANNER */}
      <div className="rag-featured-banner">
        <div className="rag-featured-text">
          <span className="featured-tag"><FaBrain /> Powered by Vector RAG</span>
          <h2>Ground Your Prep in Verified Company Data</h2>
          <p>Query exact interview processes, coding patterns, STAR method rubrics, and upload your custom JDs.</p>
        </div>

        <button className="launch-rag-btn" onClick={() => navigate("/chatbot")}>
          Launch RAG AI Chatbot <FaArrowRight />
        </button>
      </div>

      {/* STATS CONTAINER */}
      <div className="stats-container">

        <div className="stat-card" onClick={() => navigate("/result")}>
          <FaFileAlt className="stat-icon" />
          <h2>Resume Match Score</h2>
          <h1>88%</h1>
          <span className="stat-sub">Tailored for {activeCompany}</span>
        </div>

        <div className="stat-card" onClick={() => navigate("/mock")}>
          <FaRobot className="stat-icon" />
          <h2>Mock Interviews</h2>
          <h1>14</h1>
          <span className="stat-sub">Avg Score: 85%</span>
        </div>

        <div className="stat-card" onClick={() => navigate("/chatbot")}>
          <FaBrain className="stat-icon highlight" />
          <h2>RAG Queries</h2>
          <h1>38</h1>
          <span className="stat-sub">Vector Citations</span>
        </div>

        <div className="stat-card" onClick={() => navigate("/roadmap")}>
          <FaChartLine className="stat-icon" />
          <h2>Overall Progress</h2>
          <h1>92%</h1>
          <span className="stat-sub">Roadmap Completion</span>
        </div>

      </div>

      {/* QUICK ACTIONS GRID */}
      <div className="quick-actions-row">
        <div className="quick-action-card" onClick={() => navigate("/chatbot")}>
          <FaBrain className="qa-icon" />
          <h3>RAG AI Chatbot</h3>
          <p>Ask company Q&As with grounded citations</p>
        </div>

        <div className="quick-action-card" onClick={() => navigate("/company")}>
          <FaBuilding className="qa-icon" />
          <h3>Target Companies</h3>
          <p>Switch company profiles & rubrics</p>
        </div>

        <div className="quick-action-card" onClick={() => navigate("/interview")}>
          <FaQuestionCircle className="qa-icon" />
          <h3>Question Bank</h3>
          <p>Practice real past interview questions</p>
        </div>

        <div className="quick-action-card" onClick={() => navigate("/roadmap")}>
          <FaMapMarkedAlt className="qa-icon" />
          <h3>Weekly Roadmap</h3>
          <p>Track 5-week preparation timeline</p>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="bottom-grid">

        <div className="activity-card">
          <h2>Recent Activity</h2>

          <ul>
            <li>✔ Resume Tailoring for {activeCompany} Completed</li>
            <li>✔ RAG Vector Search: Amazon Leadership Principles</li>
            <li>✔ Mock Interview Session #14 Finished (Score 88%)</li>
            <li>✔ Zoho Machine Coding Roadmap Week 3 Cleared</li>
          </ul>
        </div>

        <div className="goal-card">
          <h2>Today's Prep Goal</h2>

          <div className="goal">
            <input type="checkbox" defaultChecked />
            Solve 3 System Design problems
          </div>

          <div className="goal">
            <input type="checkbox" defaultChecked />
            Query RAG Chatbot for {activeCompany} Q&A
          </div>

          <div className="goal">
            <input type="checkbox" />
            Complete 1 Timed AI Mock Interview
          </div>
        </div>

        <div className="achievement-card">
          <FaTrophy className="trophy" />
          <h2>Level 5 Tech Candidate</h2>
          <p>Targeting {activeCompany} L4/L5 Roles</p>
          <span className="xp-badge">Next Rank in 80 XP</span>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;