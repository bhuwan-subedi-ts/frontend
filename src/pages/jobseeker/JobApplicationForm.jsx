import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
} from "@progress/kendo-react-layout";
import { Input, TextArea } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { createApplication } from "../../api";
import { useNavigate, useParams } from "react-router-dom";

export default function JobApplicationForm() {
  const { jobId } = useParams();
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      setError("Please upload your resume (CV).");
      return;
    }
    const result = await createApplication({
      job_id: jobId,
      cover_letter: coverLetter,
      cv_file: cvFile,
    });
    if (result.success) {
      setSuccess(result.message);
      setError("");
      setTimeout(() => navigate("/my-applications"), 2000);
    } else {
      setError(result.error);
      setSuccess("");
    }
  };

  return (
    <div
      className="k-d-flex k-justify-content-center k-align-items-center"
      style={{ minHeight: "100vh", background: "#f5f6fa" }}
    >
      <Card
        style={{
          maxWidth: 500,
          width: "100%",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          borderRadius: 12,
        }}
      >
        <CardHeader>
          <CardTitle
            style={{ fontSize: 24, fontWeight: 700, color: "#1976d2" }}
          >
            Apply for Job
          </CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="k-form">
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="coverLetter"
                style={{ fontWeight: 500, marginBottom: 4, display: "block" }}
              >
                Cover Letter
              </label>
              <TextArea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
                style={{ width: "100%", minHeight: 100 }}
                placeholder="Write your cover letter here..."
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label
                htmlFor="cvFile"
                style={{ fontWeight: 500, marginBottom: 4, display: "block" }}
              >
                Resume (PDF/DOC)
              </label>
              <Input
                id="cvFile"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                style={{ width: "100%" }}
              />
            </div>
            {error && (
              <div style={{ color: "#d32f2f", marginBottom: 12, fontSize: 14 }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ color: "#388e3c", marginBottom: 12, fontSize: 14 }}>
                {success}
              </div>
            )}
            <Button
              type="submit"
              themeColor="primary"
              size="large"
              style={{ width: "100%" }}
            >
              Submit Application
            </Button>
          </form>
        </CardBody>
        <CardActions style={{ justifyContent: "flex-end", paddingTop: 8 }}>
          <Button look="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
