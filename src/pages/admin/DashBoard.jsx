import React, { useEffect, useState } from "react";
import { getAdminStats } from "../../api"; // You need to implement this API call

export default function DashBoard() {
  const [stats, setStats] = useState({
    job_seekers: 0,
    jobs: 0,
    applications: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const data = await getAdminStats();
      setStats(data);
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <p>Job Seekers: {stats.job_seekers}</p>
        <p>Jobs: {stats.jobs}</p>
        <p>Applications: {stats.applications}</p>
        {/* Replace with graphs if you want */}
      </div>
    </div>
  );
}
