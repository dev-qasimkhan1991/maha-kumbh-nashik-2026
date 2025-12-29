import '../styles/QuickStats.css';

import React from 'react';

const QuickStats = () => {
  const stats = [
    {
      number: '50+',
      label: 'Events',
      icon: '📅',
    },
    {
      number: '1000+',
      label: 'Accommodations',
      icon: '🏨',
    },
    {
      number: '100+',
      label: 'Attractions',
      icon: '🏛️',
    },
    {
      number: '10M+',
      label: 'Expected Visitors',
      icon: '👥',
    },
  ];

  return (
    <section className="quick-stats">
      <h2>Quick Overview</h2>
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickStats;