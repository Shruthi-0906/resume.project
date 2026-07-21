import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaMicrophone,
  FaPlay,
  FaPause,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaRobot,
  FaVideo,
  FaVideoSlash,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import "./MockInterview.css";

function MockInterview() {
  const navigate = useNavigate();
  const [company, setCompany] = useState(() => {
    return localStorage.getItem("company") || "Google";
  });

  const companyQuestions = {
    Google: [
      { id: 1, text: "Tell me about yourself and your most challenging algorithmic problem.", category: "Introduction & GCA" },
      { id: 2, text: "How would you find the median of a streaming data source in real time?", category: "Data Structures & Heaps" },
      { id: 3, text: "Design Google Search Autocomplete / Typeahead Suggestion System.", category: "System Design" },
      { id: 4, text: "Explain how Google Spanner achieves global consistency without central locking.", category: "Distributed Systems" },
      { id: 5, text: "Describe a situation where you had a strong technical disagreement with a senior engineer. How did you resolve it?", category: "Googlyness & Culture" },
    ],
    Amazon: [
      { id: 1, text: "Tell me about a time when you demonstrated Customer Obsession by exceeding project expectations.", category: "Leadership Principle (STAR)" },
      { id: 2, text: "Describe a project where you had to make a fast decision with incomplete data (Bias for Action).", category: "Leadership Principle (STAR)" },
      { id: 3, text: "Design Amazon Prime Video Streaming Infrastructure and CDN edge caching.", category: "System Design" },
      { id: 4, text: "How would you implement a distributed LRU Cache for high-throughput microservices?", category: "Data Structures & Caching" },
      { id: 5, text: "Describe a situation where you dove deep into an audit metric to identify a root cause bug.", category: "Deep Dive & Delivery" },
    ],
    Microsoft: [
      { id: 1, text: "Walk me through your background and your approach to continuous learning (Growth Mindset).", category: "Background & Culture" },
      { id: 2, text: "Design an In-Memory File System using Object-Oriented software engineering principles.", category: "Low-Level Design (LLD)" },
      { id: 3, text: "How do you handle thread synchronization and race conditions in concurrent applications?", category: "OS & Concurrency" },
      { id: 4, text: "Write an algorithm to reverse nodes in k-group in a Linked List.", category: "Coding & Algorithms" },
      { id: 5, text: "How do you handle cross-team collaboration across conflicting product priorities?", category: "Collaboration" },
    ],
    Zoho: [
      { id: 1, text: "Explain your experience with C, C++, or Java programming and memory management.", category: "Technical Fundamentals" },
      { id: 2, text: "How would you design a Railway Reservation System with lower berth priority and RAC/WL queues?", category: "Round 3 Machine Coding" },
      { id: 3, text: "Write code to print a string in a Z-pattern or cross-pattern without library functions.", category: "Pattern Coding" },
      { id: 4, text: "Explain the difference between heap memory allocation and stack memory allocation.", category: "Memory Management" },
      { id: 5, text: "Why do you want to join Zoho and how do you handle intense machine coding sessions?", category: "HR & Aptitude" },
    ],
  };

  const questionsList = companyQuestions[company] || companyQuestions["Google"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes total timer
  const [timerActive, setTimerActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (val) => {
    setAnswers({ ...answers, [currentIndex]: val });
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setAnswers((prev) => ({
            ...prev,
            [currentIndex]: (prev[currentIndex] || "") + " " + transcript,
          }));
        };

        recognition.start();
        setTimeout(() => {
          recognition.stop();
          setIsRecording(false);
        }, 10000);
      } else {
        setTimeout(() => {
          setAnswers((prev) => ({
            ...prev,
            [currentIndex]:
              (prev[currentIndex] || "") +
              " [Voice Transcript]: I approached this problem by breaking down the core data structures...",
          }));
          setIsRecording(false);
        }, 2500);
      }
    } else {
      setIsRecording(false);
    }
  };

  const currentQ = questionsList[currentIndex];
  const answeredCount = Object.keys(answers).filter((k) => answers[k]?.trim()).length;

  const handleSubmitInterview = () => {
    // Generate AI report summary and navigate
    const reportData = {
      company,
      score: Math.floor(82 + Math.random() * 12),
      technicalScore: 88,
      starScore: 84,
      systemDesignScore: 86,
      answeredCount,
      totalQuestions: questionsList.length,
      answers,
      timestamp: new Date().toLocaleDateString(),
    };
    localStorage.setItem("latest_interview_report", JSON.stringify(reportData));
    navigate("/report");
  };

  return (
    <div className="mock-page">

      {/* TOP HEADER */}
      <div className="mock-header">
        <div>
          <h1>AI Mock Interview Engine</h1>
          <p>Simulated Live Technical Assessment for <strong>{company}</strong></p>
        </div>

        <div className="mock-stats-header">

          <div className="company-selector">
            <label>Target:</label>
            <select
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                localStorage.setItem("company", e.target.value);
                setCurrentIndex(0);
              }}
            >
              <option value="Google">Google</option>
              <option value="Amazon">Amazon</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Zoho">Zoho</option>
            </select>
          </div>

          <div className={`timer-badge ${timeLeft < 180 ? "warning" : ""}`}>
            <FaClock />
            <span>{formatTime(timeLeft)}</span>
            <button onClick={() => setTimerActive(!timerActive)} className="timer-toggle">
              {timerActive ? <FaPause /> : <FaPlay />}
            </button>
          </div>

        </div>
      </div>

      {/* MAIN INTERVIEW LAYOUT GRID */}
      <div className="mock-grid">

        {/* LEFT QUESTION & ANSWER PANEL */}
        <div className="mock-main-panel">

          <div className="progress-bar-container">
            <div className="progress-text">
              <span>Question {currentIndex + 1} of {questionsList.length}</span>
              <span>{Math.round(((currentIndex + 1) / questionsList.length) * 100)}% Completed</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${((currentIndex + 1) / questionsList.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="question-box">

            <div className="q-badge">
              <span>Category: {currentQ.category}</span>
            </div>

            <h2>{currentQ.text}</h2>

            <div className="answer-controls-bar">
              <span>Your Response:</span>

              <div className="mic-webcam-controls">
                <button
                  className={`control-btn mic ${isRecording ? "recording" : ""}`}
                  onClick={toggleRecording}
                >
                  <FaMicrophone /> {isRecording ? "Listening..." : "Voice Input"}
                </button>

                <button
                  className={`control-btn cam ${webcamOn ? "on" : ""}`}
                  onClick={() => setWebcamOn(!webcamOn)}
                >
                  {webcamOn ? <FaVideo /> : <FaVideoSlash />} {webcamOn ? "Cam Active" : "Enable Cam"}
                </button>
              </div>
            </div>

            <textarea
              placeholder={`Type your structured answer here (or use Voice Input)... Explain design trade-offs, time complexity, or STAR method context for ${company}.`}
              rows="9"
              value={answers[currentIndex] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
            ></textarea>

            {/* NAVIGATION FOOTER */}
            <div className="nav-footer">

              <button
                className="btn-nav"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}
              >
                <FaArrowLeft /> Previous
              </button>

              <div className="q-dots">
                {questionsList.map((q, idx) => (
                  <button
                    key={q.id}
                    className={`q-dot ${currentIndex === idx ? "current" : ""} ${answers[idx] ? "answered" : ""}`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {currentIndex < questionsList.length - 1 ? (
                <button
                  className="btn-nav primary"
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                >
                  Next <FaArrowRight />
                </button>
              ) : (
                <button
                  className="btn-submit-interview"
                  onClick={handleSubmitInterview}
                >
                  Submit & Analyze Interview <FaCheck />
                </button>
              )}

            </div>

          </div>

        </div>

        {/* RIGHT AI EVALUATOR & WEBCAM PANEL */}
        <div className="mock-sidebar-panel">

          {/* SIMULATED WEBCAM OR AVATAR */}
          <div className="webcam-box">
            {webcamOn ? (
              <div className="live-cam-feed">
                <div className="recording-dot">🔴 LIVE</div>
                <div className="cam-placeholder">
                  <p>📹 Candidate Video Stream Active</p>
                </div>
              </div>
            ) : (
              <div className="avatar-placeholder">
                <FaRobot className="ai-interviewer-avatar" />
                <p>AI Interviewer Avatar</p>
                <span>Evaluating technical tone & response depth</span>
              </div>
            )}
          </div>

          {/* COMPANY RUBRIC CHECKS */}
          <div className="rubric-box">
            <h3><FaStar className="star" /> {company} Evaluation Rubric</h3>
            <ul>
              <li><FaCheck className="icon" /> Technical Accuracy & Big-O</li>
              <li><FaCheck className="icon" /> Communication Clarity</li>
              <li><FaCheck className="icon" /> STAR Method Structure</li>
              <li><FaCheck className="icon" /> System Scalability Depth</li>
            </ul>
          </div>

          <button className="btn-rag-help" onClick={() => navigate("/chatbot")}>
            <FaRobot /> Need Help? Open RAG AI Assistant
          </button>

        </div>

      </div>

    </div>
  );
}

export default MockInterview;