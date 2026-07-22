import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFire,
  FaTrophy,
  FaBrain,
  FaBuilding,
  FaQuestionCircle,
  FaMapMarkedAlt,
  FaArrowRight,
  FaFileAlt,
  FaRobot,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";
import { SkillRadarChart, MockPerformanceChart } from "../components/PerformanceChart";
import { CANDIDATE_METRICS } from "../data/analyticsData";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [activeCompany] = useState(() => {
    return localStorage.getItem("company") || "Google";
  });

  const activeReadiness = CANDIDATE_METRICS.companyReadiness.find(
    (c) => c.name.toLowerCase() === activeCompany.toLowerCase()
  ) || { score: 80, difficulty: "Medium", passRate: "10%" };

  return (
    <div className="dashboard-container">

      {/* TOP GLASS HERO BANNER */}
      <div className="dash-hero glass-panel">
        <div className="dash-hero-info">
          <div className="candidate-rank">
            <FaTrophy className="rank-trophy" />
            <span>LEVEL {CANDIDATE_METRICS.level} CANDIDATE</span>
          </div>
          <h1>Welcome Back, {CANDIDATE_METRICS.name}</h1>
          <p>
            Your current targeted roadmap: <strong>{activeCompany} SDE-II</strong>. Practice RAG-grounded interview scenarios to boost your readiness.
          </p>
        </div>

        <div className="dash-telemetry">
          <div className="telemetry-item">
            <FaFire className="telemetry-icon streak" />
            <div>
              <h3>{CANDIDATE_METRICS.streakDays} Days</h3>
              <p>Active Streak</p>
            </div>
          </div>
          <div className="telemetry-item">
            <FaBrain className="telemetry-icon readiness" />
            <div>
              <h3>{activeReadiness.score}%</h3>
              <p>{activeCompany} Readiness</p>
            </div>
          </div>
        </div>
      </div>

      {/* THREE SECTION GRID LAYOUT */}
      <div className="dash-grid">

        {/* LEFT COLUMN: QUICK STATS & ROADMAP PROGRESS */}
        <div className="dash-left">

          <div className="dash-card glass-panel">
            <div className="card-header">
              <h2><FaChartLine /> Performance Analytics</h2>
              <span className="subtitle">Skill mastery index vs FAANG benchmarks</span>
            </div>
            <SkillRadarChart />
          </div>

          <div className="dash-card glass-panel">
            <div className="card-header">
              <h2>Mock Simulation Telemetry</h2>
              <span className="subtitle">Recent score progression (last 7 sessions)</span>
            </div>
            <MockPerformanceChart />
          </div>

        </div>

        {/* RIGHT COLUMN: ACTION PATHS, WEAKNESS AUDIT, AND GOALS */}
        <div className="dash-right">

          {/* RAG QUICK ACCELERATOR HERO */}
          <div className="rag-accelerator-card glass-panel">
            <div className="accelerator-text">
              <span className="glow-badge">RAG POWERED</span>
              <h3>Grounded Context Query</h3>
              <p>Ask anything about {activeCompany}'s architectural rubrics or leadership formats.</p>
            </div>
            <button className="accelerator-btn" onClick={() => navigate("/chatbot")}>
              Launch Chatbot <FaArrowRight />
            </button>
          </div>

          {/* WEAK SPOT AUDIT */}
          <div className="dash-card glass-panel">
            <div className="card-header">
              <h2>⚠️ RAG AI Weakness Audit</h2>
              <span className="subtitle">Identified gaps needing target optimization</span>
            </div>
            <div className="weakness-list">
              {CANDIDATE_METRICS.weaknessAudit.map((item, idx) => (
                <div key={idx} className="weakness-item">
                  <div className="weakness-item-header">
                    <span className="weakness-domain">{item.domain}</span>
                    <span className={`weakness-impact ${item.impact.toLowerCase()}`}>
                      {item.impact} Priority
                    </span>
                  </div>
                  <p className="weakness-desc">{item.issue}</p>
                  <p className="weakness-rec">💡 <strong>Action:</strong> {item.recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TODAY'S TARGET GOALS */}
          <div className="dash-card glass-panel">
            <div className="card-header">
              <h2>🎯 Active Milestones</h2>
              <span className="subtitle">Complete today to maintain your {CANDIDATE_METRICS.streakDays}-day streak</span>
            </div>
            <div className="milestones-list">
              <label className="milestone-item checked">
                <input type="checkbox" defaultChecked disabled />
                <span>Optimize median of streaming data source (Google)</span>
              </label>
              <label className="milestone-item">
                <input type="checkbox" />
                <span>Complete 1 mock system design round</span>
              </label>
              <label className="milestone-item">
                <input type="checkbox" />
                <span>Ask RAG chatbot about Google Spanner TrueTime API</span>
              </label>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;