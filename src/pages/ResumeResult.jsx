import "./ResumeResult.css";

function ResumeResult() {
  const company = localStorage.getItem("company");

  return (
    <div className="result-container">

      <h1>{company} Resume Analysis</h1>

      <div className="score-card">
        <h2>Resume Score</h2>
        <div className="score-circle">
          85%
        </div>
      </div>

      <div className="analysis-section">

        <div className="card">
          <h2>✅ Matching Skills</h2>

          <ul>
            <li>Java</li>
            <li>React</li>
            <li>SQL</li>
            <li>Problem Solving</li>
          </ul>
        </div>

        <div className="card">
          <h2>❌ Missing Skills</h2>

          <ul>
            <li>Data Structures</li>
            <li>System Design</li>
            <li>AWS</li>
            <li>Git</li>
          </ul>
        </div>

      </div>

      <div className="recommendation">
        <h2>💡 Recommendation</h2>

        <p>
          Improve Data Structures, AWS and System Design
          before applying to {company}.
        </p>
      </div>

    </div>
    

  );
}

export default ResumeResult;