import { useState, useEffect } from "react";
import { getJobs } from "../services/jobService";
import JobCard from "../components/JobCard";
import "./Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response.jobs);
      } catch (error) {
        console.error(error);
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <h2>Loading Jobs...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="jobs-page">
        <h1>Available Jobs</h1>

        <div className="jobs-grid">
        {jobs.map((job) => (
            <JobCard
            key={job._id}
            job={job}
            />
        ))}
        </div>
    </section>
    );
}

export default Jobs;