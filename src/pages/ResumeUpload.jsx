import { useNavigate } from "react-router-dom";
import "./ResumeUpload.css";

function ResumeUpload() {
  const navigate = useNavigate();
  const company = localStorage.getItem("company");

  return (
    <div className="resume-page">
      <h1>{company} Resume Analyzer</h1>

      <p>
        Upload your resume and check whether it matches
        {company}'s requirements.
      </p>

      <div className="upload-box">
        <input type="file" />
        <button onClick={() => navigate("/result")}>
    Analyze Resume
</button>

        
        
        
      </div>
    </div>
  );
}

export default ResumeUpload;