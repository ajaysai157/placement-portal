import { useState, useEffect } from "react";
import { getRecruiterDashboard } from "../services/dashboardService";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import "./RecruiterDashboard.css";

function RecruiterDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getRecruiterDashboard();
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
    return <h2>Loading Dashboard...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="recruiter-dashboard">
      <div className="dashboard-header">
        <h1>Recruiter Dashboard</h1>

        <button
          className="create-job-btn"
          onClick={() => navigate("/recruiter/create-job")}
        >
          + Create Job
        </button>
      </div>

      <div className="dashboard-grid">
        <DashboardCard title="Total Jobs" value={dashboard.totalJobs} />

        <DashboardCard
          title="Applications"
          value={dashboard.totalApplications}
        />

        <DashboardCard title="Accepted" value={dashboard.acceptedCount} />

        <DashboardCard title="Rejected" value={dashboard.rejectedCount} />
      </div>
    </section>
  );
}

export default RecruiterDashboard;
