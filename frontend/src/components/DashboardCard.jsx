import "./DashboardCard.css";

function DashboardCard({ title, value }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-top">
        <p>{title}</p>
      </div>

      <h2>{value}</h2>
    </div>
  );
}

export default DashboardCard;
