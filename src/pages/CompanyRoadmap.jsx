import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaRegCircle,
  FaBrain,
  FaQuestionCircle,
  FaTrophy,
  FaBookOpen,
} from "react-icons/fa";
import "./CompanyRoadmap.css";

function CompanyRoadmap() {
  const navigate = useNavigate();

  const [company, setCompany] = useState(() => {
    return localStorage.getItem("company") || "Google";
  });

  const roadmaps = {
    Google: [
      {
        week: "Week 1",
        title: "Advanced Data Structures & Big-O Mastery",
        topics: [
          "Arrays, Two Pointers, Sliding Window technique",
          "Balanced Binary Search Trees & Tries",
          "Space-Time Complexity Trade-offs & Whiteboard Clean Code",
        ],
        ragTopic: "Google Whiteboard Coding Standards & Big-O",
      },
      {
        week: "Week 2",
        title: "Graph Algorithms & Dynamic Programming",
        topics: [
          "BFS/DFS, Topological Sort, Dijkstra's Shortest Path",
          "Union-Find (Disjoint Set Union)",
          "DP patterns: 0/1 Knapsack, Longest Common Subsequence, Memoization",
        ],
        ragTopic: "Google Graph & DP Patterns",
      },
      {
        week: "Week 3",
        title: "System Design & Distributed Scalability",
        topics: [
          "Designing Typeahead Autocomplete & Global Search",
          "Distributed Databases (Spanner TrueTime API vs Bigtable)",
          "Consistent Hashing, Load Balancing & CDN caching",
        ],
        ragTopic: "Google System Design Autocomplete & Spanner",
      },
      {
        week: "Week 4",
        title: "Google Leadership & Googlyness",
        topics: [
          "Handling ambiguity and self-direction",
          "Ethical decision making & cross-functional collaboration",
          "STAR Method storytelling for complex technical conflicts",
        ],
        ragTopic: "Googlyness & General Cognitive Ability",
      },
      {
        week: "Week 5",
        title: "Timed Mock Loop & Final Polish",
        topics: [
          "45-minute timed coding challenges under pressure",
          "Mock System Design interview on Miro/Excalidraw",
          "Reviewing top 50 Google tagged questions",
        ],
        ragTopic: "Google Final Loop Preparation Checklist",
      },
    ],

    Amazon: [
      {
        week: "Week 1",
        title: "16 Leadership Principles & STAR Framework",
        topics: [
          "Customer Obsession & Ownership examples",
          "Invent and Simplify & Bias for Action metric stories",
          "Structuring Situation, Task, Action (60%), Result (Metrics)",
        ],
        ragTopic: "Amazon STAR Method & 16 Leadership Principles",
      },
      {
        week: "Week 2",
        title: "Data Structures & Scalable Code",
        topics: [
          "Binary Trees, Heaps, and Priority Queues",
          "LRU Cache implementation using HashMap & Doubly Linked List",
          "Graphs & Grid Breadth First Search",
        ],
        ragTopic: "Amazon Data Structures & Coding Standards",
      },
      {
        week: "Week 3",
        title: "System Architecture & AWS Microservices",
        topics: [
          "Designing Amazon Prime Video & S3 Storage tiers",
          "DynamoDB single-table design & latency targets",
          "SQS/SNS asynchronous message queues",
        ],
        ragTopic: "Amazon System Design Prime Video Architecture",
      },
      {
        week: "Week 4",
        title: "Bar Raiser Interview Prep",
        topics: [
          "Answering deep dive probing questions",
          "Demonstrating Have Backbone; Disagree & Commit",
          "Handling failure and learnings with humility",
        ],
        ragTopic: "Amazon Bar Raiser Evaluation Criteria",
      },
      {
        week: "Week 5",
        title: "Full Speed Mock Loop",
        topics: [
          "Solving 2 Medium coding problems in 45 minutes",
          "Simulated Bar Raiser behavioral interrogation",
          "Final resume projects audit",
        ],
        ragTopic: "Amazon Final Interview Prep",
      },
    ],

    Zoho: [
      {
        week: "Week 1",
        title: "C / C++ Aptitude & Pointer Arithmetic",
        topics: [
          "Pointer operations, malloc/free, memory leaks",
          "Bitwise operations, AND/OR/XOR mask tricks",
          "Output prediction & recursion trace",
        ],
        ragTopic: "Zoho C Aptitude & Pointer Arithmetic",
      },
      {
        week: "Week 2",
        title: "String & Matrix Pattern Machine Coding",
        topics: [
          "String manipulation without built-in library methods",
          "Matrix rotation, spiral print, Z-pattern printing",
          "Substrings and anagram matching logic",
        ],
        ragTopic: "Zoho Pattern Printing & String Problems",
      },
      {
        week: "Week 3",
        title: "Round 3 Machine Coding - Console Application",
        topics: [
          "Designing Railway Reservation System",
          "Designing Flight Booking & Call Taxi Application",
          "OOP Design Patterns (Strategy, Singleton, Factory)",
        ],
        ragTopic: "Zoho Railway Ticket Reservation System Machine Coding",
      },
      {
        week: "Week 4",
        title: "Data Structures & Database Queries",
        topics: [
          "Custom Queue and Stack implementation",
          "SQL JOINs, Group By, and Table Normalization",
          "Memory allocation (Heap vs Stack depth)",
        ],
        ragTopic: "Zoho Data Structures & SQL Normalization",
      },
      {
        week: "Week 5",
        title: "Technical HR & Live Code Review",
        topics: [
          "Explaining Round 3 code architecture clearly to interviewer",
          "Fixing live edge cases under interviewer review",
          "Cultural fit & willingness to work at Zoho campus",
        ],
        ragTopic: "Zoho Technical HR & Live Code Review",
      },
    ],
  };

  const activeRoadmap = roadmaps[company] || roadmaps["Google"];

  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem(`roadmap_completed_${company}`);
    return saved ? JSON.parse(saved) : {};
  });

  const toggleTopic = (topicKey) => {
    const updated = { ...completedTopics, [topicKey]: !completedTopics[topicKey] };
    setCompletedTopics(updated);
    localStorage.setItem(`roadmap_completed_${company}`, JSON.stringify(updated));
  };

  const totalTopics = activeRoadmap.reduce((acc, curr) => acc + curr.topics.length, 0);
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  return (
    <div className="roadmap-page">

      {/* HEADER */}
      <div className="roadmap-header">
        <div>
          <h1>{company} Preparation Roadmap</h1>
          <p>Structured 5-Week personalized preparation plan tailored for {company} interviews</p>
        </div>

        <div className="company-switch">
          <label>Company:</label>
          <select
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              localStorage.setItem("company", e.target.value);
            }}
          >
            <option value="Google">Google</option>
            <option value="Amazon">Amazon</option>
            <option value="Zoho">Zoho</option>
          </select>
        </div>
      </div>

      {/* PROGRESS TRACKER CARD */}
      <div className="roadmap-progress-card">
        <div className="progress-info">
          <FaTrophy className="trophy-icon" />
          <div>
            <h2>Overall Roadmap Progress: {progressPercent}%</h2>
            <p>{completedCount} of {totalTopics} Topics Completed</p>
          </div>
        </div>

        <div className="main-progress-bar">
          <div
            className="main-progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* TIMELINE CARDS */}
      <div className="timeline-container">

        {activeRoadmap.map((item, wIdx) => (
          <div key={wIdx} className="week-card">

            <div className="week-header">
              <span className="week-badge">{item.week}</span>
              <h2>{item.title}</h2>
            </div>

            <ul className="topics-list">
              {item.topics.map((t, tIdx) => {
                const topicKey = `${wIdx}-${tIdx}`;
                const isChecked = !!completedTopics[topicKey];

                return (
                  <li key={tIdx} onClick={() => toggleTopic(topicKey)}>
                    <span className="checkbox">
                      {isChecked ? <FaCheckCircle className="checked" /> : <FaRegCircle />}
                    </span>
                    <span className={`topic-text ${isChecked ? "done" : ""}`}>{t}</span>
                  </li>
                );
              })}
            </ul>

            <div className="week-actions">
              <button
                className="btn-rag-study"
                onClick={() => navigate("/chatbot")}
              >
                <FaBrain /> Learn Topic in RAG Chatbot
              </button>

              <button
                className="btn-practice-q"
                onClick={() => navigate("/interview")}
              >
                <FaBookOpen /> Practice Questions
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default CompanyRoadmap;