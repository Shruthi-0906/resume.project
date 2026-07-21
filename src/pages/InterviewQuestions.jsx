import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBrain,
  FaLightbulb,
  FaCheckCircle,
  FaFilter,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./InterviewQuestions.css";

function InterviewQuestions() {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState(() => {
    return localStorage.getItem("company") || "Google";
  });
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [ragHintModal, setRagHintModal] = useState(null);

  const questionsDatabase = [
    {
      id: "q1",
      company: "Google",
      category: "Algorithms & Data Structures",
      difficulty: "Hard",
      question: "How to find the median of a streaming data source with O(1) retrieval time?",
      answer: "Use two heaps: a Max-Heap for the smaller half of numbers and a Min-Heap for the larger half. Keep their sizes balanced (difference <= 1). Median is either the top of the larger heap or the average of both heap tops.",
      ragHint: "Google penalizes naive array sorting O(N log N). Emphasize space complexity O(N) and log N insertion bounds.",
    },
    {
      id: "q2",
      company: "Google",
      category: "System Design",
      difficulty: "Hard",
      question: "Design Google Search Autocomplete / Typeahead Suggestion System.",
      answer: "Use an in-memory Trie data structure. Cache top 5 prefix results in Redis. Asynchronously aggregate search logs using Apache Kafka and MapReduce into Trie DB.",
      ragHint: "Latency budget must be under 100ms. Discuss trie node serialization and prefix hashing.",
    },
    {
      id: "q3",
      company: "Amazon",
      category: "Behavioral & STAR Method",
      difficulty: "Medium",
      question: "Tell me about a time you had to make a decision without complete data.",
      answer: "Framework: STAR (Situation, Task, Action, Result). Highlight Amazon Leadership Principle 'Bias for Action'. Detail how you evaluated risk, took a calculated step, gathered metrics, and adjusted iteratively.",
      ragHint: "Quantify the outcome! Amazon interviewers require concrete metrics (e.g. 'reduced API response latency by 240ms').",
    },
    {
      id: "q4",
      company: "Amazon",
      category: "System Design",
      difficulty: "Hard",
      question: "Design Amazon Video / Prime Video Video Streaming Infrastructure.",
      answer: "Use CloudFront CDN for edge streaming, HLS/DASH adaptive bitrate transcoding, microservices on AWS ECS, DynamoDB for user state, and S3 storage.",
      ragHint: "Focus on cost optimization of storage tiers (S3 Standard vs Glacier) and CDN cache hit ratios.",
    },
    {
      id: "q5",
      company: "Microsoft",
      category: "Low-Level Design (LLD)",
      difficulty: "Medium",
      question: "Design an In-Memory File System using Object-Oriented Principles.",
      answer: "Define abstract Node class, with Directory and File subclasses. Directory holds a HashMap<String, Node>. Implement ls(), mkdir(), addFileContent(), readContentFromFile().",
      ragHint: "Microsoft interviewers test solid OOP, clean path parsing, thread safety, and immutability choices.",
    },
    {
      id: "q6",
      company: "Zoho",
      category: "Machine Coding & C/C++",
      difficulty: "Hard",
      question: "Round 3 Task: Design a Railway Reservation System in Java/C++.",
      answer: "Build seat allocation logic (Lower, Middle, Upper, RAC, Waiting List). Implement booking, cancellation with automatic promotion queues, and ticket display without external libraries.",
      ragHint: "Zoho evaluates modular code, zero crash tolerance, edge cases (e.g. senior citizen lower berth priority), and clean console UI.",
    },
    {
      id: "q7",
      company: "TCS",
      category: "SQL & Databases",
      difficulty: "Medium",
      question: "Write an SQL query to find the Nth highest salary in Employee table.",
      answer: "SELECT Salary FROM (SELECT Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) as rnk FROM Employee) WHERE rnk = N;",
      ragHint: "TCS technical rounds heavily test SQL JOINs, GROUP BY, HAVING clauses, and indexing performance.",
    },
    {
      id: "q8",
      company: "Infosys",
      category: "Web & Core CS",
      difficulty: "Medium",
      question: "Explain ACID properties in DBMS and Virtual DOM reconciliation in React.",
      answer: "ACID = Atomicity (all or nothing), Consistency, Isolation, Durability. Virtual DOM uses diffing algorithm to batch minimum DOM tree updates.",
      ragHint: "Focus on real-world practical examples like bank transfers and React state updates.",
    },
  ];

  const filteredQuestions = questionsDatabase.filter((q) => {
    const matchCompany =
      selectedCompany === "All" ||
      q.company.toLowerCase() === selectedCompany.toLowerCase();
    const matchCat =
      categoryFilter === "All" || q.category.includes(categoryFilter);
    const matchSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCompany && matchCat && matchSearch;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="interview-page">

      {/* HEADER */}
      <div className="questions-header">
        <div>
          <h1>{selectedCompany} Interview Question Bank</h1>
          <p>Curated actual questions, model solutions & RAG AI interview hints</p>
        </div>

        <div className="company-picker">
          <label>Target Company:</label>
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
            <option value="TCS">TCS</option>
            <option value="Infosys">Infosys</option>
          </select>
        </div>
      </div>

      {/* CONTROLS BAR */}
      <div className="controls-bar">
        <div className="search-input">
          <FaSearch />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {["All", "Algorithms", "System Design", "Behavioral", "Machine Coding", "SQL"].map((cat) => (
            <button
              key={cat}
              className={`cat-filter-btn ${categoryFilter === cat ? "active" : ""}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* QUESTIONS LIST */}
      <div className="questions-list">

        {filteredQuestions.length === 0 ? (
          <div className="no-questions">
            <p>No questions matched your filter criteria for {selectedCompany}. Try selecting "All Companies".</p>
          </div>
        ) : (
          filteredQuestions.map((item, index) => {
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className="question-card">

                <div className="question-card-top" onClick={() => toggleExpand(item.id)}>

                  <div className="question-info">
                    <span className="q-number">Q{index + 1}</span>
                    <span className="q-company-tag">{item.company}</span>
                    <span className="q-category-tag">{item.category}</span>
                    <span className={`q-difficulty ${item.difficulty.toLowerCase()}`}>
                      {item.difficulty}
                    </span>
                  </div>

                  <h2>{item.question}</h2>

                  <div className="expand-indicator">
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </div>

                </div>

                {isExpanded && (
                  <div className="question-card-body">

                    <div className="model-answer">
                      <h3><FaCheckCircle className="check-icon" /> Model Solution:</h3>
                      <p>{item.answer}</p>
                    </div>

                    <div className="rag-hint-banner">
                      <FaLightbulb className="hint-icon" />
                      <div>
                        <strong>RAG AI Evaluator Tip:</strong>
                        <p>{item.ragHint}</p>
                      </div>
                    </div>

                    <div className="question-actions">
                      <button
                        className="btn-rag-ask"
                        onClick={() => navigate("/chatbot")}
                      >
                        <FaBrain /> Ask RAG Chatbot for Full Code & Deep Dive
                      </button>

                      <button
                        className="btn-mock-practice"
                        onClick={() => navigate("/mock")}
                      >
                        Practice in AI Mock Interview
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}

      </div>

      {/* START MOCK INTERVIEW CALLOUT */}
      <div className="start-mock-banner">
        <div>
          <h2>Ready to test your answers in real-time?</h2>
          <p>Launch the AI Mock Interviewer tuned for {selectedCompany} questions.</p>
        </div>

        <button
          className="start-btn"
          onClick={() => navigate("/mock")}
        >
          Start AI Mock Interview
        </button>
      </div>

    </div>
  );
}

export default InterviewQuestions;