import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getRecruiterDashboard } from "../services/dashboardService";

import DashboardCard from "../components/DashboardCard";
import Loader from "../components/Loader";

import "./RecruiterDashboard.css";

function RecruiterDashboard() {
  const { user } = useSelector((state) => state.auth);

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

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

  if (loading) return <Loader />;

  if (error) return <h2>{error}</h2>;

  return (
    <section className="recruiter-dashboard">

      <div className="dashboard-header">

        <div>

          <h1>Welcome, {user?.name} 👋</h1>

          <p>
            Manage your job postings and applicants from one place.
          </p>

        </div>

        <button
          className="create-job-btn"
          onClick={() => navigate("/recruiter/create-job")}
        >
          + Create Job
        </button>

      </div>

      <div className="dashboard-grid">

        <DashboardCard
          title="Jobs Posted"
          value={dashboard.totalJobs}
        />

        <DashboardCard
          title="Applications"
          value={dashboard.totalApplications}
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

export default RecruiterDashboard;