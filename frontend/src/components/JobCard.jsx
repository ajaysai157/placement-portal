import { useNavigate } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="job-card">

      <div className="job-card-header">

        <div>

          <h2>{job.title}</h2>

          <h4>{job.company}</h4>

        </div>

        <span className="job-type">
          {job.jobType}
        </span>

      </div>

      <div className="job-info">

        <p>📍 {job.location}</p>

        <p>💼 {job.experience}</p>

        <p>💰 ₹{job.salary}</p>

      </div>

      <div className="skills">

        {job.skills?.map((skill) => (
          <span
            key={skill}
            className="skill-chip"
          >
            {skill}
          </span>
        ))}

      </div>

      <button
        className="details-btn"
        onClick={() =>
          navigate(`/jobs/${job._id}`)
        }
      >
        View Details
      </button>

    </div>
  );
}

export default JobCard;