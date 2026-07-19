import { useState, useEffect } from "react";
import { getStudentDashboard } from "../services/dashboardService";

import DashboardCard from "../components/DashboardCard";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getStudentDashboard();
        setDashboard(response.dashboard);
      } catch (error) {
        console.error(error);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="student-dashboard">
      <h1>Student Dashboard</h1>

      <div className="dashboard-grid">
        <DashboardCard
          title="Total Applications"
          value={dashboard.totalApplications}
        />

        <DashboardCard
          title="Pending"
          value={dashboard.pendingCount}
        />

        <DashboardCard
          title="Accepted"
          value={dashboard.acceptedCount}
        />

        <DashboardCard
          title="Rejected"
          value={dashboard.rejectedCount}
        />
      </div>
    </section>
  );
}

export default StudentDashboard;