import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaBuilding,
  FaFileAlt,
  FaQuestionCircle,
  FaMicrophone,
  FaClipboardList,
  FaMapMarkedAlt,
  FaBrain,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">

      <div className="sidebar-brand">
        <h2><FaBrain className="brand-icon" /> AI Prep</h2>
        <span className="version-badge">RAG v2.0</span>
      </div>

      <nav className="nav-links">
        <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
          <FaChartPie /> <span>Dashboard</span>
        </Link>

        <Link to="/chatbot" className={`rag-link ${isActive("/chatbot") ? "active" : ""}`}>
          <FaBrain /> <span>RAG AI Chatbot</span> <span className="glow-tag">NEW</span>
        </Link>

        <Link to="/company" className={isActive("/company") ? "active" : ""}>
          <FaBuilding /> <span>Companies</span>
        </Link>

        <Link to="/resume" className={isActive("/resume") ? "active" : ""}>
          <FaFileAlt /> <span>Resume Analysis</span>
        </Link>

        <Link to="/interview" className={isActive("/interview") ? "active" : ""}>
          <FaQuestionCircle /> <span>Questions</span>
        </Link>

        <Link to="/mock" className={isActive("/mock") ? "active" : ""}>
          <FaMicrophone /> <span>Mock Interview</span>
        </Link>

        <Link to="/report" className={isActive("/report") ? "active" : ""}>
          <FaClipboardList /> <span>Report</span>
        </Link>

        <Link to="/roadmap" className={isActive("/roadmap") ? "active" : ""}>
          <FaMapMarkedAlt /> <span>Roadmap</span>
        </Link>
      </nav>

    </div>
  );
}

export default Sidebar;