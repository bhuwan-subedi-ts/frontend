import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job, showApply = true }) {
  const navigate = useNavigate();

  return (
    <Card
      style={{
        maxWidth: 400,
        margin: "16px auto",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        borderRadius: 12,
      }}
    >
      <CardHeader>
        <CardTitle style={{ fontSize: 20, fontWeight: 600, color: "#1976d2" }}>
          {job.title}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ marginBottom: 8 }}>
          <strong>Company:</strong> {job.company}
        </div>
        <div style={{ marginBottom: 8 }}>
          <strong>Location:</strong> {job.location}
        </div>
        <div style={{ marginBottom: 8 }}>
          <strong>Description:</strong>
          <div style={{ fontSize: 14, color: "#444" }}>{job.description}</div>
        </div>
        {job.salary_range && (
          <div style={{ marginBottom: 8 }}>
            <strong>Salary:</strong> {job.salary_range}
          </div>
        )}
      </CardBody>
      <CardActions style={{ justifyContent: "flex-end", paddingTop: 8 }}>
        {showApply && (
          <Button
            themeColor="primary"
            onClick={() => navigate(`/jobs/${job.id}/apply`)}
          >
            Apply
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
