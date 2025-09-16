import React, { useEffect, useState } from "react";
import { getApplicationsForJob } from "../../api";
import { useParams } from "react-router-dom";

export default function ApplicationList() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchApplications() {
      const data = await getApplicationsForJob(jobId);
      setApplications(data.applications || []);
    }
    fetchApplications();
  }, [jobId]);

  return (
    <div>
      <h2>Applications for Job {jobId}</h2>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <p>Name: {app.applicant_name}</p>
            <p>Email: {app.applicant_email}</p>
            <p>Cover Letter: {app.cover_letter}</p>
            <a href={app.resume_url} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
