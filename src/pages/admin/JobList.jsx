import React, { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../../api";
import { useNavigate } from "react-router-dom";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobs() {
      const data = await getJobs();
      console.log("job list==>", data);
      setJobs(data.jobs || []);
    }
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    await deleteJob(jobId);
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  return (
    <div>
      <h2>Jobs</h2>
      <button onClick={() => navigate("/admin/jobs/new")}>Create Job</button>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title}
            <button onClick={() => navigate(`/admin/jobs/edit/${job.id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(job.id)}>Delete</button>
            <button
              onClick={() => navigate(`/admin/jobs/${job.id}/applications`)}
            >
              View Applications
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
