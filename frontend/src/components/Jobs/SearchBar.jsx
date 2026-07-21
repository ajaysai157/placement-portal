import "./Jobs.css";

function SearchBar({
  keyword,
  setKeyword,
  onSearch,
}) {
  return (
    <div className="search-bar">

      <input
        type="text"
        placeholder="Search jobs, companies, skills..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
      />

      <button onClick={onSearch}>
        Search
      </button>

    </div>
  );
}

export default SearchBar;