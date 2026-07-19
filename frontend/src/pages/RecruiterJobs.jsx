import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyJobs, deleteJob } from "../services/jobService";
import { toast } from "react-toastify";
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

      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="recruiter-jobs">
      <h1>My Jobs</h1>

      {jobs.length === 0 ? (
        <h3>No Jobs Found</h3>
      ) : (
        jobs.map((job) => (
          <div className="job-card" key={job._id}>
            <h2>{job.title}</h2>

            <p>{job.company}</p>

            <p>{job.location}</p>

            <div className="buttons">

              <button
                onClick={() =>
                  navigate(`/recruiter/edit-job/${job._id}`)
                }
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(job._id)}
              >
                Delete
              </button>

              <button
                onClick={() =>
                  navigate(`/recruiter/applications/${job._id}`)
                }
              >
                Applicants
              </button>

            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default RecruiterJobs;