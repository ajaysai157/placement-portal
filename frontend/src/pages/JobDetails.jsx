import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getJobById } from "../services/jobService";
import { applyJob } from "../services/applicationService";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.job);
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
    try {
      setApplying(true);

      const response = await applyJob(id);

      alert(response.message);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <h2>Loading Job...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="job-details">
      <h1>{job.title}</h1>

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

      <h3>Description</h3>

      <p>{job.description}</p>

      <h3>Skills</h3>

      <ul>
        {job.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <button onClick={handleApply} disabled={applying}>
        {applying ? "Applying..." : "Apply Now"}
      </button>
    </section>
  );
}

export default JobDetails;
