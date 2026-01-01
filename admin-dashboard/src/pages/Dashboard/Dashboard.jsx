import './Dashboard.css';

import React from 'react';

import { useFetch } from '../../hooks/useFetch';
import { accommodationService } from '../../services/accommodationService';
import { attractionService } from '../../services/attractionService';
import { eventService } from '../../services/eventService';
import { locationService } from '../../services/locationService';

const Dashboard = () => {
  const { data: events } = useFetch(() => eventService.getAll());
  const { data: accommodations } = useFetch(() => accommodationService.getAll());
  const { data: attractions } = useFetch(() => attractionService.getAll());
  const { data: locations } = useFetch(() => locationService.getAll());

  const stats = [
    { label: 'Total Events', value: events.length, color: 'bg-blue-500', icon: '📅' },
    { label: 'Accommodations', value: accommodations.length, color: 'bg-green-500', icon: '🏨' },
    { label: 'Attractions', value: attractions.length, color: 'bg-purple-500', icon: '🏛️' },
    { label: 'Locations', value: locations.length, color: 'bg-orange-500', icon: '📍' }
  ];

  return (
    <div className="dashboard">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="recent-section">
        <h3>Recent Events</h3>
        {events.slice(0, 5).length > 0 ? (
          <div className="event-list">
            {events.slice(0, 5).map((e) => (
              <div key={e._id} className="event-item">
                <div>
                  <p className="event-title">{e.title}</p>
                  <p className="event-date">{new Date(e.date).toLocaleDateString()}</p>
                </div>
                <span className={`status-badge ${e.status}`}>{e.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No events yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;