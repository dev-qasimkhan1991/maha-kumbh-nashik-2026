import './Sidebar.css';

import React from 'react';

import {
  Menu,
  X,
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'accommodations', label: 'Accommodations', icon: '🏨' },
    { id: 'attractions', label: 'Attractions', icon: '🏛️' },
    { id: 'locations', label: 'Locations', icon: '📍' },
    { id: 'zones', label: 'Zones', icon: '🗺️' }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h1 className={`sidebar-title ${!isOpen && 'hidden'}`}>MK Admin</h1>
        <button 
          className="sidebar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? 'Collapse' : 'Expand'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            title={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className={`sidebar-label ${!isOpen && 'hidden'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className={!isOpen && 'hidden'}>Maha Kumbh 2026</p>
      </div>
    </div>
  );
};

export default Sidebar;