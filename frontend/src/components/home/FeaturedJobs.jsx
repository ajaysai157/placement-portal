import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getJobs } from "../../services/jobService";

import "./FeaturedJobs.css";

function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getJobs();

      setJobs(response.jobs.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="featured">
      <div className="container">

        <div className="section-header">

          <h2>Featured Opportunities</h2>

          <p>
            Explore the latest openings from top recruiters.
          </p>

        </div>

        <div className="job-grid">

          {jobs.map((job) => (

            <div
              className="featured-card"
              key={job._id}
            >

              <div className="company-badge">

                {job.company}

              </div>

              <h3>{job.title}</h3>

              <div className="job-info">

                <span>📍 {job.location}</span>

                <span>💼 {job.jobType}</span>

              </div>

              <div className="salary">

                ₹ {job.salary}

              </div>

              <Link
                className="view-btn"
                to={`/jobs/${job._id}`}
              >
                View Details
              </Link>

            </div>

          ))}

        </div>

        <div className="view-all">

          <Link to="/jobs">

            View All Jobs →

          </Link>

        </div>

      </div>
    </section>
  );
}

export default FeaturedJobs;