import React, { useState } from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ isClient, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState({});
  
  // Define filter options based on user type
  const filterOptions = isClient 
    ? [
        { id: 'investorType', label: 'Investor Type', options: ['Angel', 'VC', 'Corporate', 'Private Equity'] },
        { id: 'investmentRange', label: 'Investment Range', options: ['$10K-$50K', '$50K-$250K', '$250K-$1M', '$1M+'] },
        { id: 'industry', label: 'Industry Focus', options: ['Tech', 'Healthcare', 'Finance', 'Education', 'Entertainment'] }
      ]
    : [
        { id: 'projectType', label: 'Project Type', options: ['Software', 'Hardware', 'Service', 'Research'] },
        { id: 'fundingStage', label: 'Funding Stage', options: ['Seed', 'Series A', 'Series B', 'Growth'] },
        { id: 'industry', label: 'Industry', options: ['Tech', 'Healthcare', 'Finance', 'Education', 'Entertainment'] }
      ];
  
  const handleFilterSelect = (filterId, value) => {
    const newFilters = {
      ...activeFilters,
      [filterId]: activeFilters[filterId] === value ? null : value
    };
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };
  
  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2 className="filter-title">Filters</h2>
        <button 
          className="filter-clear-button"
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>
      
      {filterOptions.map((filter) => (
        <div key={filter.id} className="filter-section">
          <h3 className="filter-section-title">{filter.label}</h3>
          <div className="filter-options">
            {filter.options.map((option) => (
              <button
                key={option}
                className={`filter-option ${
                  activeFilters[filter.id] === option
                    ? 'filter-option-active'
                    : ''
                }`}
                onClick={() => handleFilterSelect(filter.id, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;