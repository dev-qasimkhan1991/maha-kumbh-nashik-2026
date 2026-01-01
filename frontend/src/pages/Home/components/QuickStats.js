import React from 'react';

const statsStyles = `
.quick-stats {
  padding: 60px 20px;
  background: #f9f9f9;
  text-align: center;
}

.quick-stats h2 {
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #1a1a1a;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-card {
  background: white;
  padding: 40px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 3.5rem;
  margin-bottom: 15px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6b35;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 1.1rem;
  color: #666;
}

@media screen and (max-width: 768px) {
  .quick-stats h2 {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .stat-card {
    padding: 25px 15px;
  }

  .stat-icon {
    font-size: 2.5rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}
`;

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
    <>
      <style>{statsStyles}</style>
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
    </>
  );
};

export default QuickStats;