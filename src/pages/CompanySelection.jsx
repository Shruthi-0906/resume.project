import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBrain,
  FaMicrophone,
  FaQuestionCircle,
  FaMapMarkedAlt,
  FaStar,
  FaBriefcase,
  FaBuilding,
  FaUserGraduate,
  FaTrophy,
} from "react-icons/fa";
import "./CompanySelection.css";

import google from "../assets/companyLogos/google.webp";
import amazon from "../assets/companyLogos/amazon.jpg";
import microsoft from "../assets/companyLogos/microsoft.png";
import tcs from "../assets/companyLogos/tcs.jpg";
import infosys from "../assets/companyLogos/infosys.webp";
import zoho from "../assets/companyLogos/zoho.jpg";

function CompanySelection() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [activeCompany, setActiveCompany] = useState(() => {
    return localStorage.getItem("company") || "Google";
  });

  const companies = [
    {
      name: "Google",
      image: google,
      category: "Tier 1 Product",
      difficulty: "9.6 / 10",
      salary: "₹28L - ₹52.5 LPA",
      passRate: "6.8% Onsite",
      focus: "Graphs, Heap Streams, BSTs & System Design (Spanner/TrueTime)",
      rounds: "OA + 4 Onsites + Hiring Committee",
    },
    {
      name: "Amazon",
      image: amazon,
      category: "Tier 1 Product",
      difficulty: "9.4 / 10",
      salary: "₹34L - ₹49 LPA",
      passRate: "11.4% Onsite",
      focus: "16 Leadership Principles (STAR Method) + Cache Scalability",
      rounds: "OA + 3 Loops + 1 Bar Raiser",
    },
    {
      name: "Microsoft",
      image: microsoft,
      category: "Tier 1 Product",
      difficulty: "9.2 / 10",
      salary: "₹24L - ₹46 LPA",
      passRate: "12.8% Onsite",
      focus: "Low-Level Design (LLD), Object-Oriented Principles, Mutex locks",
      rounds: "Codility + 3 Rounds + AA Manager",
    },
    {
      name: "Zoho",
      image: zoho,
      category: "Product / Core",
      difficulty: "8.8 / 10",
      salary: "₹8L - ₹15 LPA",
      passRate: "9.6% Machine",
      focus: "Modular Code Design, Zero Crash Tolerance, Complex OOP",
      rounds: "Aptitude + Basic + 3hr Machine Coding",
    },
    {
      name: "TCS",
      image: tcs,
      category: "IT / Services",
      difficulty: "8.2 / 10",
      salary: "₹7.5L - ₹11.5 LPA (Prime)",
      passRate: "18.4% Select",
      focus: "RDBMS SQL JOINs, ACID Transactions, Core OOP concepts",
      rounds: "NQT Advanced + Tech + HR",
    },
    {
      name: "Infosys",
      image: infosys,
      category: "IT / Services",
      difficulty: "8.0 / 10",
      salary: "₹9.5L - ₹13 LPA (SP)",
      passRate: "16.0% Select",
      focus: "Algorithm Optimization, React DOM, Node.js REST API scalability",
      rounds: "HackWithInfy + Tech + HR",
    },
  ];

  const handleSelect = (companyName) => {
    setActiveCompany(companyName);
    localStorage.setItem("company", companyName);
  };

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.focus.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === "All" || c.category.includes(selectedCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <div className="company-page-container">

      {/* HEADER SECTION */}
      <div className="company-header glass-panel">
        <div className="header-text">
          <h1>Company Selection Vault</h1>
          <p>Switch target companies to update AI algorithms, question databases, and performance baselines.</p>
        </div>

        <div className="target-card">
          <FaTrophy className="target-icon" />
          <div>
            <p>Target Goal</p>
            <h3>{activeCompany}</h3>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="filter-controls-row">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search core competencies (e.g. Graph, LLD, SQL)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="cat-tabs-row">
          {["All", "Tier 1 Product", "Product / Core", "IT / Services"].map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="company-cards-grid">
        {filteredCompanies.map((company) => {
          const isSelected = activeCompany === company.name;

          return (
            <div
              key={company.name}
              className={`company-vault-card glass-panel glass-card-hover ${isSelected ? "active-border" : ""}`}
              onClick={() => handleSelect(company.name)}
            >
              <div className="vault-card-header">
                <div className="logo-container">
                  <img src={company.image} alt={company.name} />
                </div>
                <div className="title-section">
                  <h3>{company.name}</h3>
                  <span className="type-tag">{company.category}</span>
                </div>
                <div className="score-rating">
                  <FaStar className="star" />
                  <span>{company.difficulty}</span>
                </div>
              </div>

              <div className="vault-card-metrics">
                <div className="metric-pill">
                  <FaBriefcase className="icon" />
                  <span>{company.salary}</span>
                </div>
                <div className="metric-pill success">
                  <FaUserGraduate className="icon" />
                  <span>Pass Rate: {company.passRate}</span>
                </div>
              </div>

              <div className="competencies-block">
                <h4>Core Evaluated Focus:</h4>
                <p>{company.focus}</p>
              </div>

              <div className="rounds-block">
                <span>Rounds: <strong>{company.rounds}</strong></span>
              </div>

              <div className="card-actions-grid">
                <button
                  className="card-action-btn primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(company.name);
                    navigate("/chatbot");
                  }}
                >
                  <FaBrain /> RAG Chat
                </button>
                <button
                  className="card-action-btn secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(company.name);
                    navigate("/interview");
                  }}
                >
                  Practice Qs
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default CompanySelection;