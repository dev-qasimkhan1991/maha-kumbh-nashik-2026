import './Header.css';

import React from 'react';

import {
  Plus,
  Search,
} from 'lucide-react';

const Header = ({ title, searchTerm, setSearchTerm, onAddClick, showAddButton }) => {
  return (
    <div className="header">
      <div className="header-left">
        <h2 className="header-title">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h2>
      </div>

      <div className="header-right">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {showAddButton && (
          <button 
            className="btn-add"
            onClick={onAddClick}
            title="Add New Item"
          >
            <Plus size={18} />
            <span>Add New</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;