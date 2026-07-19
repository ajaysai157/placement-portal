import { useNavigate } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="job-card">
      <h2>{job.title}</h2>

      <p>
        <strong>Company:</strong> {job.company}
      </p>

      <p>
        <strong>Location:</strong> {job.location}
      </p>

      <p>
        <strong>Job Type:</strong> {job.jobType}
      </p>

      <p>
        <strong>Experience:</strong> {job.experience}
      </p>

      <p>
        <strong>Salary:</strong> ₹{job.salary}
      </p>

      <button
        onClick={() => navigate(`/jobs/${job._id}`)}
        className="details-btn"
      >
        View Details
      </button>
    </div>
  );
}

export default JobCard;