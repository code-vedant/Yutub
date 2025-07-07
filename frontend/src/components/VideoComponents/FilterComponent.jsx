import { useState } from 'react';
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi';
import { GoSortAsc,GoSortDesc  } from "react-icons/go";
import { MdClear } from 'react-icons/md';
import "../../style/videoFilter.css";

export default function FilterComponent() {
  const [filters, setFilters] = useState({
    query: '',
    sortBy: 'createdAt',
    sortType: 'desc',
    page: 1,
    limit: 10
  });
  
  const [showFilters, setShowFilters] = useState(false);

  // Sort options
  const sortOptions = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'title', label: 'Title' },
    { value: 'views', label: 'Views' },
    { value: 'duration', label: 'Duration' }
  ];

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value
    }));
  };


  // Clear all filters
  const clearFilters = () => {
    setFilters({
      sortBy: 'createdAt',
      sortType: 'desc',
      page: 1,
      limit: 10
    });
  };


  return (
    <div className="video-filter-component">
      {/* Header */}
      <div className="filter-header">
        <h2>Videos</h2>
        <div className="filter-actions">
        <div className="filter-sortby">
            <label>Sort by</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="filter-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
              </div>
          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? <GoSortAsc/> : <GoSortDesc />}
          </button>
        </div>
        <div className='paging-buttons'>
          <button>{"<"}</button>
          <button>1</button>
          <button>2</button>
          <button>..</button>
          <button>19</button>
          <button>20</button>
          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
}