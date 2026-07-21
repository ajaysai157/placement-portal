import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getStudentDashboard } from "../services/dashboardService";

import Loader from "../components/Loader";
import DashboardCard from "../components/DashboardCard";

import "./StudentDashboard.css";

function StudentDashboard() {
  const { user } = useSelector((state) => state.auth);

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

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

  if (loading) return <Loader />;

  if (error) return <h2>{error}</h2>;

  return (
    <section className="student-dashboard">

      <div className="dashboard-header">

        <div>

          <h1>
            Welcome, {user?.name} 👋
          </h1>

          <p>
            Track your applications and placement progress.
          </p>

        </div>

      </div>

      <div className="dashboard-grid">

        <DashboardCard
          title="Applications"
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