import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      <section className="hero">

        <h1>AI Interview Preparation Platform</h1>

        <p>
          Master Technical, HR and Coding Interviews using AI-powered
          preparation and personalized feedback.
        </p>

        <div className="hero-buttons">
          <button>Upload Resume</button>
          <button className="secondary-btn">
            Start Mock Interview
          </button>
        </div>

      </section>

      <section className="features">

        <div className="card">
          <h3>📄 Resume Analysis</h3>
          <p>Analyze resumes and identify strengths.</p>
        </div>

        <div className="card">
          <h3>🤖 AI Questions</h3>
          <p>Generate interview questions automatically.</p>
        </div>

        <div className="card">
          <h3>💻 Coding Assessment</h3>
          <p>Practice coding rounds and challenges.</p>
        </div>

        <div className="card">
          <h3>🎤 Mock Interview</h3>
          <p>Simulate real interview experiences.</p>
        </div>

        <div className="card">
          <h3>📊 Analytics</h3>
          <p>Track progress and performance.</p>
        </div>

        <div className="card">
          <h3>🏆 Improvement Plan</h3>
          <p>Get personalized feedback and tips.</p>
        </div>

      </section>

    </div>
  );
}

export default Home;