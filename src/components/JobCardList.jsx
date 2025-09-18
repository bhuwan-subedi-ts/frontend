import React, { useEffect, useState } from "react";
import { getJobs } from "../api";
import JobCard from "./JobCard";

export default function JobCardList({ showApply = true }) {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    async function fetchJobs() {
      const data = await getJobs();
      setJobs(data || []);
    }
    fetchJobs();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "24px 0" }}>Available Jobs</h2>
      {jobs.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888" }}>No jobs found.</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} showApply={showApply} />
          ))}
        </div>
      )}
    </div>
  );
}
