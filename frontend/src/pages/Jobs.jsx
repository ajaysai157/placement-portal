import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";

import { getJobs } from "../services/jobService";
import JobCard from "../components/JobCard";

import "./Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const fetchJobs = async (filters = {}) => {
    try {
      setLoading(true);

      const response = await getJobs(filters);

      setJobs(response.jobs);
    } catch (error) {
      console.error(error);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = () => {
    fetchJobs({
      keyword,
      location,
      jobType,
      experience,
    });
  };

  const handleReset = () => {
    setKeyword("");
    setLocation("");
    setJobType("");
    setExperience("");

    fetchJobs();
  };

  if (loading) {
    return <h2>Loading Jobs...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="jobs-page">
      <h1>Available Jobs</h1>

      <div className="search-container">

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs by title, company or skill..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button
            className="search-btn"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="filter-toggle">
          <button
            className="filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />

            <span>
              {showFilters ? "Hide Filters" : "Filters"}
            </span>
          </button>
        </div>

        {showFilters && (
          <div className="filters">

            <div className="filter-group">
              <label>Location</label>

              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />
            </div>

            <div className="filter-group">
              <label>Job Type</label>

              <select
                value={jobType}
                onChange={(e) =>
                  setJobType(e.target.value)
                }
              >
                <option value="">
                  All Job Types
                </option>

                <option value="Full-time">
                  Full-time
                </option>

                <option value="Part-time">
                  Part-time
                </option>

                <option value="Internship">
                  Internship
                </option>
              </select>
            </div>

            <div className="filter-group">
              <label>Experience</label>

              <select
                value={experience}
                onChange={(e) =>
                  setExperience(e.target.value)
                }
              >
                <option value="">
                  All Experience
                </option>

                <option value="Fresher">
                  Fresher
                </option>

                <option value="1 Year">
                  1 Year
                </option>

                <option value="2 Years">
                  2 Years
                </option>

                <option value="3+ Years">
                  3+ Years
                </option>
              </select>
            </div>

            <div className="filter-actions">
              <button
                className="reset-btn"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                className="search-btn"
                onClick={handleSearch}
              >
                Apply Filters
              </button>
            </div>

          </div>
        )}

      </div>

      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <h2>No Jobs Found</h2>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Jobs;