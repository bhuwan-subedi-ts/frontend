import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashBoard from "./pages/admin/DashBoard";
import JobList from "./pages/admin/JobList";
import JobForm from "./pages/admin/JobForm";
import ApplicationList from "./pages/admin/ApplicationList";
import JobApplicationForm from "./pages/jobseeker/JobApplicationForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="/admin/jobs" element={<JobList />} />
          <Route path="/admin/jobs/new" element={<JobForm />} />
          <Route path="/admin/jobs/edit/:jobId" element={<JobForm />} />
          <Route
            path="/admin/jobs/:jobId/applications"
            element={<ApplicationList />}
          />
          <Route path="/jobs/:jobId/apply" element={<JobApplicationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
