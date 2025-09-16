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
    location: "",
  });
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

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (jobId) {
      await updateJob(jobId, form);
    } else {
      await createJob(form);
    }
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
            <div style={{ marginBottom: 24 }}>
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
