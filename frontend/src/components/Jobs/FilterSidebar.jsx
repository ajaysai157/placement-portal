import "./Jobs.css";

function FilterSidebar({
  filters,
  setFilters,
}) {
  return (
    <aside className="filter-sidebar">

      <h3>Filters</h3>

      <div className="filter-group">

        <label>Location</label>

        <input
          type="text"
          placeholder="Hyderabad"
          value={filters.location}
          onChange={(e) =>
            setFilters({
              ...filters,
              location: e.target.value,
            })
          }
        />

      </div>

      <div className="filter-group">

        <label>Job Type</label>

        <select
          value={filters.jobType}
          onChange={(e) =>
            setFilters({
              ...filters,
              jobType: e.target.value,
            })
          }
        >

          <option value="">
            All
          </option>

          <option value="Full Time">
            Full Time
          </option>

          <option value="Part Time">
            Part Time
          </option>

          <option value="Internship">
            Internship
          </option>

        </select>

      </div>

      <div className="filter-group">

        <label>Experience</label>

        <select
          value={filters.experience}
          onChange={(e) =>
            setFilters({
              ...filters,
              experience: e.target.value,
            })
          }
        >

          <option value="">
            All
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

    </aside>
  );
}

export default FilterSidebar;