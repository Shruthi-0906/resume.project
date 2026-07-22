import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkillRadarChart } from "../components/PerformanceChart";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTrophy,
  FaArrowLeft,
  FaBrain,
} from "react-icons/fa";
import "./InterviewReport.css";

function InterviewReport() {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("latest_interview_report");
    if (saved) {
      try {
        setReport(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Fallback default report metrics
      setReport({
        company: "Google",
        score: 86,
        technicalScore: 90,
        starScore: 84,
        systemDesignScore: 82,
        answeredCount: 5,
        totalQuestions: 5,
        timestamp: new Date().toLocaleDateString(),
      });
    }
  }, []);

  if (!report) return <div className="loading">Processing evaluation...</div>;

  return (
    <div className="report-page-container">

      {/* TOP TITLE */}
      <div className="report-header glass-panel">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft /> Dashboard
        </button>
        <div>
          <h1>AI Evaluation Feedback Report</h1>
          <p>Analytical evaluation for **{report.company}** interview loop | {report.timestamp}</p>
        </div>
      </div>

      {/* SCORE GAUGES */}
      <div className="report-main-grid">

        {/* LEFT COLUMN: GAUGES & METRICS */}
        <div className="report-card-column">
          <div className="overall-score-card glass-panel">
            <span className="glow-badge">OVERALL INDEX</span>
            <div className="score-circle">
              <h1>{report.score}%</h1>
              <p>Hiring Index</p>
            </div>
            <p className="score-summary">
              {report.score >= 85
                ? "🎉 High Pass Recommendation. Performance meets the target hiring bar."
                : "💡 Borderline recommendation. Complete target roadmap areas before re-testing."}
            </p>
          </div>

          <div className="sub-scores-panel glass-panel">
            <h3>Evaluation Vector Breakdown</h3>
            <div className="sub-score-row">
              <span>Technical Accuracy:</span>
              <div className="progress-bar-wrap">
                <div className="bar-fill" style={{ width: `${report.technicalScore}%` }}></div>
                <span className="score-pct">{report.technicalScore}%</span>
              </div>
            </div>

            <div className="sub-score-row">
              <span>STAR Method Competency:</span>
              <div className="progress-bar-wrap">
                <div className="bar-fill warning" style={{ width: `${report.starScore}%` }}></div>
                <span className="score-pct">{report.starScore}%</span>
              </div>
            </div>

            <div className="sub-score-row">
              <span>System Design Depth:</span>
              <div className="progress-bar-wrap">
                <div className="bar-fill info" style={{ width: `${report.systemDesignScore}%` }}></div>
                <span className="score-pct">{report.systemDesignScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RADAR CHART */}
        <div className="report-card-column">
          <div className="chart-card glass-panel">
            <h3>Capability Vector Alignment</h3>
            <SkillRadarChart />
          </div>
        </div>

      </div>

      {/* AI RECOMMENDATIONS */}
      <div className="feedback-box-panel glass-panel">
        <h2><FaBrain className="feedback-brain-icon" /> RAG Grounded Feedback Matrix</h2>

        <div className="feedback-split">
          <div className="feedback-list-box positive">
            <h3><FaCheckCircle /> Demonstrated Strengths:</h3>
            <ul>
              <li>Excellent utilization of dual heap logic for stream processing.</li>
              <li>Strong understanding of transaction isolation boundaries and ACID properties.</li>
              <li>Proper OOP modeling layout for composite Directory/File class relationships.</li>
            </ul>
          </div>

          <div className="feedback-list-box negative">
            <h3><FaExclamationTriangle /> Gaps & Gaps Areas:</h3>
            <ul>
              <li>Missing space complexity boundary discussions (e.g., O(N) heap sizes).</li>
              <li>STAR answers lacked key business metrics. Focus on quantifiable values.</li>
              <li>Weak explainers on distributed locking vs Paxos groups for Spanner consistency.</li>
            </ul>
          </div>
        </div>

        <div className="report-actions-row">
          <button className="btn-action-primary" onClick={() => navigate("/roadmap")}>
            View Preparation Roadmap
          </button>
          <button className="btn-action-secondary" onClick={() => navigate("/chatbot")}>
            Ask RAG Chatbot to Fix Gaps
          </button>
        </div>
      </div>

    </div>
  );
}

export default InterviewReport;