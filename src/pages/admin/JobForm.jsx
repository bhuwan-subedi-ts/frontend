import React, { useState, useEffect } from "react";
import { createJob, updateJob, getJobById } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
} from "@progress/kendo-react-layout";
import { Input, TextArea } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

export default function JobForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary_range: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { jobId } = useParams();

  useEffect(() => {
    if (jobId) {
      async function fetchJob() {
        const data = await getJobById(jobId);
        setForm(data.job);
      }
      fetchJob();
    }
  }, [jobId]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    // Basic validation
    if (
      !form.title ||
      !form.description ||
      !form.company ||
      !form.location ||
      !form.salary_range
    ) {
      setError("All fields are required.");
      return;
    }
    if (jobId) {
      await updateJob(jobId, form);
    } else {
      await createJob(form);
    }
    setSuccess("Job saved successfully!");
    setForm({
      title: "",
      description: "",
      company: "",
      location: "",
      salary_range: "",
    });
    navigate("/admin/jobs");
  };

  return (
    <div
      className="k-d-flex k-justify-content-center k-align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f5f6fa",
      }}
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
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1976d2",
            }}
          >
            {jobId ? "Edit Job" : "Create Job"}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="k-form">
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="title"
                style={{
                  fontWeight: 500,
                  marginBottom: 4,
                  display: "block",
                }}
              >
                Job Title
              </label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="description"
                style={{
                  fontWeight: 500,
                  marginBottom: 4,
                  display: "block",
                }}
              >
                Description
              </label>
              <TextArea
                id="description"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
                style={{ width: "100%", minHeight: 100 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="company"
                style={{
                  fontWeight: 500,
                  marginBottom: 4,
                  display: "block",
                }}
              >
                Company
              </label>
              <Input
                id="company"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="location"
                style={{
                  fontWeight: 500,
                  marginBottom: 4,
                  display: "block",
                }}
              >
                Location
              </label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="salary_range"
                style={{
                  fontWeight: 500,
                  marginBottom: 4,
                  display: "block",
                }}
              >
                Salary Range
              </label>
              <Input
                id="salary_range"
                value={form.salary_range}
                onChange={(e) => handleChange("salary_range", e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </div>

            {error && (
              <div style={{ color: "#d32f2f", marginBottom: 12 }}>{error}</div>
            )}
            {success && (
              <div style={{ color: "#388e3c", marginBottom: 12 }}>
                {success}
              </div>
            )}
            <Button
              type="submit"
              themeColor="primary"
              size="large"
              style={{ width: "100%" }}
            >
              {jobId ? "Update Job" : "Create Job"}
            </Button>
          </form>
        </CardBody>
        <CardActions
          style={{
            justifyContent: "flex-end",
            paddingTop: 8,
          }}
        >
          <Button
            look="outline"
            onClick={() => navigate("/admin/jobs")}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
