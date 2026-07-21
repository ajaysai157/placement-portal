import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import Loader from "../components/Loader";
import SearchBar from "../components/jobs/SearchBar";
import FilterSidebar from "../components/jobs/FilterSidebar";
import JobCard from "../components/JobCard";
import EmptyState from "../components/EmptyState";
import "../components/Jobs/Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [keyword, setKeyword] = useState("");

  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    experience: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await getJobs({
        keyword,
        ...filters,
      });

      setJobs(response.jobs);
    } catch (error) {
      console.error(error);

      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

if (loading) {
  return <Loader />;
}

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="jobs-page">

      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={fetchJobs}
      />

      <div className="jobs-layout">

        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
        />

        <div className="jobs-content">

          <div className="jobs-header">

            <h1>Available Jobs</h1>

            <button
              className="filter-btn"
              onClick={fetchJobs}
            >
              Apply Filters
            </button>

          </div>

          <div className="jobs-grid">

            {jobs.length === 0 ? (
              <EmptyState
    title="No Jobs Found"
    description="Try changing your search or filters."
/>
            ) : (
              jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                />
              ))
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

export default Jobs;