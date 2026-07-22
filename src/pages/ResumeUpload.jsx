import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaFilePdf, FaBrain } from "react-icons/fa";
import "./ResumeUpload.css";

function ResumeUpload() {
  const navigate = useNavigate();
  const company = localStorage.getItem("company") || "Google";
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const startAnalysis = () => {
    if (!file) return;
    setParsing(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        navigate("/result");
      }
    }, 250);
  };

  return (
    <div className="resume-upload-container">

      <div className="upload-header-panel glass-panel">
        <h1>{company} Resume Analyzer</h1>
        <p>Ground your resume analysis against {company}'s specific candidate performance baselines.</p>
      </div>

      <div
        className={`dropzone-box glass-panel ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="resume-file"
          className="file-input"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        <div className="dropzone-content">
          <FaCloudUploadAlt className="upload-icon" />
          {file ? (
            <div className="file-info">
              <FaFilePdf className="pdf-icon" />
              <h3>{file.name}</h3>
              <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          ) : (
            <div>
              <h3>Drag & drop your resume here</h3>
              <p>Supports PDF, DOCX, and TXT (Max 5MB)</p>
            </div>
          )}

          <label htmlFor="resume-file" className="browse-label-btn">
            Browse Files
          </label>
        </div>
      </div>

      {parsing && (
        <div className="parsing-progress-box glass-panel">
          <div className="progress-info">
            <FaBrain className="parsing-brain-icon animate-pulse" />
            <span>AI Grounding In Progress... {progress}%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {file && !parsing && (
        <button className="btn-start-analysis" onClick={startAnalysis}>
          Analyze Matching Matrix
        </button>
      )}

    </div>
  );
}

export default ResumeUpload;