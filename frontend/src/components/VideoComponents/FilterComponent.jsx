import { GoSortAsc, GoSortDesc } from "react-icons/go";
import "../../style/videoFilter.css";

export default function FilterComponent({type,filters, setFilters}) {


  const handleSortingChange = () => {
    setFilters((prev) => ({
      ...prev,
      sortType: prev.sortType === "asc" ? "desc" : "asc",
    }));
  }

  const pageMove = (val) => {
    setFilters((prev) => ({
      ...prev,
      page: prev.page + val,
    }));
  }

  // Sort options
  const baseOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "title", label: "Title" },
  ];
  
  const sortOptions = type === "Videos"
    ? baseOptions.concat({ value: "duration", label: "Duration" })
    : baseOptions;
  

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : value,
    }));
  };

  return (
    <div className="video-filter-component">
      {/* Header */}
        <h2>{type}</h2>
        <div className="filter-actions">
          <div className="filter-sortBy">
            <label>Sort by</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="filter-select"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button onClick={handleSortingChange} className="filter-toggle">
            {filters.sortType === "asc" ? <GoSortAsc /> : <GoSortDesc />}
          </button>
          </div>
          <div className="pagination">
          <button disabled={filters.page === 1} onClick={() => pageMove(-1)}>{"<"}</button>
          <span className="page-number">{filters.page}</span>
          <button disabled={filters.page === 10} onClick={() => pageMove(1)}>{">"}</button>
        </div>
        </div>
    </div>
  );
}
