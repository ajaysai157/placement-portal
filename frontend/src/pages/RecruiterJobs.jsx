import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import { getMyJobs, deleteJob } from "../services/jobService";

import "./RecruiterJobs.css";

function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await getMyJobs();
      setJobs(response.jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteJob(id);

      toast.success(response.message);

      fetchJobs();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete job"
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="recruiter-jobs">

      <div className="page-header">

        <div>

          <h1>My Jobs</h1>

          <p>
            Manage all your job postings from one place.
          </p>

        </div>

      </div>

      {jobs.length === 0 ? (

        <EmptyState
          title="No Jobs Posted"
          description="Create your first job posting to start receiving applications."
        />

      ) : (

        jobs.map((job) => (

          <div
            className="recruiter-job-card"
            key={job._id}
          >

            <div className="job-top">

              <div className="company-logo">
                {job.company.charAt(0)}
              </div>

              <div className="job-details">

                <div className="job-title-row">

                  <h2>{job.title}</h2>

                  <span className="job-badge">
                    {job.jobType}
                  </span>

                </div>

                <h4>{job.company}</h4>

                <div className="job-meta">

                  <span>📍 {job.location}</span>

                  <span>💼 {job.experience}</span>

                  <span>💰 ₹{job.salary}</span>

                </div>

              </div>

            </div>

            <div className="skills-row">

              {job.skills?.map((skill) => (

                <span
                  key={skill}
                  className="skill-chip"
                >
                  {skill}
                </span>

              ))}

            </div>

            <div className="job-actions">

              <button
                className="edit-btn"
                onClick={() =>
                  navigate(`/recruiter/edit-job/${job._id}`)
                }
              >
                Edit
              </button>

              <button
                className="view-btn"
                onClick={() =>
                  navigate(`/recruiter/applications/${job._id}`)
                }
              >
                Applicants
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(job._id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))

      )}

    </section>
  );
}

export default RecruiterJobs;