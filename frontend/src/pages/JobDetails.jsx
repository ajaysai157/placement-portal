import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./JobDetails.css";
import { getJobById } from "../services/jobService";
import { applyJob } from "../services/applicationService";
import Loader from "../components/Loader";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.job);
        if (response.job.alreadyApplied) {
          setAlreadyApplied(true);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    // Guest user
    if (!isAuthenticated) {
      toast.info("Please login to apply.");

      navigate("/login");

      return;
    }

    // Recruiter
    if (user.role === "recruiter") {
      toast.error("Recruiters cannot apply for jobs.");

      return;
    }

    try {
      setApplying(true);

      const response = await applyJob(id);

      toast.success(response.message);
      setAlreadyApplied(true);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="job-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Jobs
      </button>
      <div className="job-details-card">
        <div className="job-header">
          <div>
            <h1>{job.title}</h1>
            <h3>{job.company}</h3>
          </div>

          <span className="job-badge">{job.jobType}</span>
        </div>

        <div className="job-meta">
          <div>
            📍 <strong>Location:</strong> {job.location}
          </div>

          <div>
            💼 <strong>Experience:</strong> {job.experience}
          </div>

          <div>
            💰 <strong>Salary:</strong> ₹{job.salary}
          </div>
        </div>

        <div className="job-section">
          <h2>Description</h2>

          <p>{job.description}</p>
        </div>

        <div className="job-section">
          <h2>Required Skills</h2>

          <div className="skills-list">
            {job.skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {(!isAuthenticated || user?.role === "student") && (
          <button
            className="apply-btn"
            onClick={handleApply}
            disabled={applying || alreadyApplied}
          >
            {alreadyApplied
              ? "✅ Applied"
              : applying
                ? "Applying..."
                : !isAuthenticated
                  ? "Login to Apply"
                  : "Apply Now"}
          </button>
        )}
      </div>
    </section>
  );
}

export default JobDetails;
