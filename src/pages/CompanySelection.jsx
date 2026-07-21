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
      salary: "$140k - $220k / ₹25-45 LPA",
      focus: "DSA, Graph Algortihms & System Design (Spanner/Spanner)",
      rounds: "OA + 4 Tech Rounds + System Design + Googlyness",
    },
    {
      name: "Amazon",
      image: amazon,
      category: "Tier 1 Product",
      difficulty: "9.4 / 10",
      salary: "$135k - $200k / ₹22-40 LPA",
      focus: "16 Leadership Principles (STAR Method) + Scalability",
      rounds: "OA + 3 Tech Loop + 1 Bar Raiser Behavioral",
    },
    {
      name: "Microsoft",
      image: microsoft,
      category: "Tier 1 Product",
      difficulty: "9.2 / 10",
      salary: "$130k - $190k / ₹20-38 LPA",
      focus: "Low-Level Design (LLD), Object-Oriented Principles & Trees",
      rounds: "Codility Screen + 3 Technical Rounds + AA Hiring Manager",
    },
    {
      name: "Zoho",
      image: zoho,
      category: "Product / Core",
      difficulty: "8.8 / 10",
      salary: "₹6 - ₹15 LPA",
      focus: "Hands-on C/C++/Java Machine Coding & Complex Systems",
      rounds: "C Aptitude + Basic Coding + 3hr Machine Coding + Tech HR",
    },
    {
      name: "TCS",
      image: tcs,
      category: "IT / Services",
      difficulty: "8.2 / 10",
      salary: "₹3.6 - ₹11.5 LPA (Ninja/Digital/Prime)",
      focus: "SQL JOINs, Core Java/C++, Aptitude & CS Fundamentals",
      rounds: "NQT Foundation & Advanced + Tech Interview + HR",
    },
    {
      name: "Infosys",
      image: infosys,
      category: "IT / Services",
      difficulty: "8.0 / 10",
      salary: "₹3.6 - ₹9.5 LPA (SE/DSE/SP)",
      focus: "HackWithInfy Coding, Web Tech (React/Node) & DBMS ACID",
      rounds: "InfyTQ / HackWithInfy + Technical Interview + HR",
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
    <div className="company-page">

      {/* HEADER SECTION */}
      <div className="company-header">
        <div>
          <h1>Company-Specific Interview Hub</h1>
          <p>Tailor your AI interviewer, questions, and roadmaps to target top tech companies</p>
        </div>

        <div className="active-target-badge">
          <span>Active Target:</span>
          <strong>{activeCompany}</strong>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="filter-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search company or tech stack focus..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-tabs">
          {["All", "Tier 1 Product", "Product / Core", "IT / Services"].map((cat) => (
            <button
              key={cat}
              className={`cat-tab ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* COMPANY CARDS GRID */}
      <div className="company-grid">

        {filteredCompanies.map((company) => {
          const isSelected = activeCompany === company.name;

          return (
            <div
              className={`company-card ${isSelected ? "selected" : ""}`}
              key={company.name}
              onClick={() => handleSelect(company.name)}
            >

              <div className="card-top">
                <div className="logo-box">
                  <img src={company.image} alt={company.name} />
                </div>
                <div className="company-meta">
                  <h2>{company.name}</h2>
                  <span className="category-badge">{company.category}</span>
                </div>

                <div className="difficulty-badge">
                  <FaStar className="star-icon" />
                  <span>{company.difficulty}</span>
                </div>
              </div>

              <div className="card-details">
                <div className="detail-row">
                  <FaBriefcase className="icon" />
                  <span><strong>Est. Package:</strong> {company.salary}</span>
                </div>

                <div className="detail-row">
                  <FaBrain className="icon highlight" />
                  <span><strong>Key Focus:</strong> {company.focus}</span>
                </div>

                <div className="detail-row">
                  <FaQuestionCircle className="icon" />
                  <span><strong>Rounds:</strong> {company.rounds}</span>
                </div>
              </div>

              {/* ACTION SHORTCUTS */}
              <div className="card-actions">
                <button
                  className="action-btn chatbot"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(company.name);
                    navigate("/chatbot");
                  }}
                  title="Open RAG Chatbot tuned for this company"
                >
                  <FaBrain /> RAG Chat
                </button>

                <button
                  className="action-btn questions"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(company.name);
                    navigate("/interview");
                  }}
                  title="Practice Questions"
                >
                  <FaQuestionCircle /> Q&As
                </button>

                <button
                  className="action-btn mock"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(company.name);
                    navigate("/mock");
                  }}
                  title="Start Mock Interview"
                >
                  <FaMicrophone /> Mock
                </button>

                <button
                  className="action-btn roadmap"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(company.name);
                    navigate("/roadmap");
                  }}
                  title="View Preparation Roadmap"
                >
                  <FaMapMarkedAlt /> Roadmap
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