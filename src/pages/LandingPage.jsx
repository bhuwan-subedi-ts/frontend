import React, { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardSubtitle,
} from "@progress/kendo-react-layout";
import { Input } from "@progress/kendo-react-inputs";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Link } from "react-router-dom";
import "./LandingPage.css";

// Example job data (replace with API data as needed)
const JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Innovators",
    location: "Remote",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Cloud Solutions",
    location: "New York, NY",
    type: "Full-time",
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Minds",
    location: "San Francisco, CA",
    type: "Contract",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "DevOps Specialist",
    company: "Enterprise Apps",
    location: "Remote",
    type: "Full-time",
    posted: "Today",
  },
];

export default function LandingPage() {
  const [search, setSearch] = useState("");
  const filteredJobs = JOBS.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="landing-bg k-d-flex k-justify-content-center k-align-items-start"
      style={{ minHeight: "100vh", paddingTop: 48 }}
    >
      <Card
        style={{
          maxWidth: 900,
          width: "100%",
          boxShadow: "0 8px 32px rgba(25, 118, 210, 0.10)",
          borderRadius: 16,
          background: "#fff",
        }}
      >
        <CardHeader>
          <div className="k-d-flex k-align-items-center">
            <span
              className="k-icon k-i-briefcase"
              style={{
                fontSize: 40,
                color: "#1976d2",
                marginRight: 16,
                background: "#e3f2fd",
                borderRadius: "50%",
                padding: 12,
              }}
            />
            <div>
              <CardTitle style={{ fontSize: 28, fontWeight: 700, color: "#1976d2" }}>
                Elevated Work Force
              </CardTitle>
              <CardSubtitle style={{ color: "#607d8b", fontSize: 16 }}>
                Empowering Careers. Connecting Talent.
              </CardSubtitle>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="k-d-flex k-justify-content-between k-align-items-center" style={{ marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: 18, color: "#374151", margin: "0 0 8px 0" }}>
                Find your next opportunity or the perfect candidate.
              </p>
              <div
                style={{
                  background: "#f5f6fa",
                  borderRadius: 8,
                  padding: "12px 20px",
                  marginBottom: 0,
                  border: "1px solid #e3e7ed",
                  fontSize: 15,
                  color: "#455a64",
                }}
              >
                <b>Features:</b> Job search, smart matching, analytics, secure profiles, and more.
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Link to="/login">
                <Button themeColor="primary" size="medium" style={{ minWidth: 100 }}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button themeColor="secondary" size="medium" style={{ minWidth: 100 }}>
                  Register
                </Button>
              </Link>
            </div>
          </div>
          <div style={{ margin: "24px 0 16px 0" }}>
            <Input
              placeholder="Search jobs by title, company, or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", maxWidth: 400 }}
              prefixIcon="search"
            />
          </div>
          <div>
            <Grid
              style={{ minHeight: 300, background: "#fafbfc", borderRadius: 8 }}
              data={filteredJobs}
              resizable
            >
              <GridColumn field="title" title="Job Title" width="200px" />
              <GridColumn field="company" title="Company" width="180px" />
              <GridColumn field="location" title="Location" width="140px" />
              <GridColumn field="type" title="Type" width="100px" />
              <GridColumn field="posted" title="Posted" width="100px" />
              <GridColumn
                title="Action"
                width="120px"
                cell={props => (
                  <td>
                    <Button
                      themeColor="primary"
                      size="small"
                      fillMode="outline"
                      onClick={() => alert(`Apply for ${props.dataItem.title}`)}
                    >
                      Apply
                    </Button>
                  </td>
                )}
              />
            </Grid>
            {filteredJobs.length === 0 && (
              <div style={{ textAlign: "center", color: "#90a4ae", marginTop: 24 }}>
                No jobs found matching your search.
              </div>
            )}
          </div>
        </CardBody>
        <CardActions
          style={{
            justifyContent: "center",
            borderTop: "1px solid #e3e7ed",
            marginTop: 24,
            paddingTop: 12,
          }}
        >
          <span style={{ color: "#90a4ae", fontSize: 14 }}>
            &copy; {new Date().getFullYear()} Elevated Work Force. All rights reserved.
          </span>
        </CardActions>
      </Card>
    </div>
  );
}