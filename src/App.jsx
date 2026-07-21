import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CompanySelection from "./pages/CompanySelection";
import ResumeUpload from "./pages/ResumeUpload";
import ResumeResult from "./pages/ResumeResult";
import InterviewQuestions from "./pages/InterviewQuestions";
import MockInterview from "./pages/MockInterview";
import InterviewReport from "./pages/InterviewReport";
import CompanyRoadmap from "./pages/CompanyRoadmap";
import RagChatbot from "./pages/RagChatbot";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">

        <Sidebar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chatbot" element={<RagChatbot />} />
            <Route path="/company" element={<CompanySelection />} />
            <Route path="/resume" element={<ResumeUpload />} />
            <Route path="/result" element={<ResumeResult />} />
            <Route path="/interview" element={<InterviewQuestions />} />
            <Route path="/mock" element={<MockInterview />} />
            <Route path="/report" element={<InterviewReport />} />
            <Route path="/roadmap" element={<CompanyRoadmap />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;