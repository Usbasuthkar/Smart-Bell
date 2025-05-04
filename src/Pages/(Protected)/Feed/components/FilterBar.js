import React from "react";
import "./FilterBar.css"

function FilterBar({ currentFilter, onFilterChange }) {
    return (
        <div className="filter-bar">
            <h3 className="filter-heading">Feed</h3>
            <div className="filter-options">
                <button 
                    className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
                    onClick={() => onFilterChange('all')}
                >
                    All Posts
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'funding' ? 'active' : ''}`}
                    onClick={() => onFilterChange('funding')}
                >
                    Funding Requests
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'investment' ? 'active' : ''}`}
                    onClick={() => onFilterChange('investment')}
                >
                    Investment Offers
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'investor' ? 'active' : ''}`}
                    onClick={() => onFilterChange('investor')}
                >
                    Investors
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'client' ? 'active' : ''}`}
                    onClick={() => onFilterChange('client')}
                >
                    Clients
                </button>
            </div>
        </div>
    );
}

export default FilterBar;