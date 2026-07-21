import { useNavigate } from "react-router-dom";
import PerformanceChart from "../components/PerformanceChart";
import "./InterviewReport.css";

function InterviewReport() {
    const navigate= useNavigate();
  return (
    <div className="report-page">

      <h1>AI Interview Report</h1>

      <div className="score-box">
        <h2>Overall Score</h2>
        <h1>88%</h1>
      </div>

      <div className="report-grid">

        <div className="report-card">
          <h3>Communication</h3>
          <p>85%</p>
        </div>

        <div className="report-card">
          <h3>Technical Skills</h3>
          <p>90%</p>
        </div>

        <div className="report-card">
          <h3>Confidence</h3>
          <p>82%</p>
        </div>

        <div className="report-card">
          <h3>Problem Solving</h3>
          <p>89%</p>
        </div>

      </div>

      <div className="feedback-box">

        <h2>AI Feedback</h2>

        <ul>
          <li>Excellent Java knowledge.</li>
          <li>Good communication skills.</li>
          <li>Improve confidence while answering.</li>
          <li>Practice system design concepts.</li>
          <li>Prepare more company-specific questions.</li>
        </ul>
        <button
  className="roadmap-btn"
  onClick={() => navigate("/roadmap")}
>
   View Preparation Roadmap
</button>

      </div>
      <PerformanceChart />

    </div>
  );
}

export default InterviewReport;