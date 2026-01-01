import './Zones.css';

import React from 'react';

import { useFetch } from '../../hooks/useFetch';
import { zoneService } from '../../services/zoneService';

const Zones = ({ searchTerm }) => {
  const { data: zones, loading } = useFetch(() => zoneService.getAll());

  const filteredZones = zones.filter((zone) =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCrowdLevelColor = (level) => {
    const colors = {
      'low': '#10b981',
      'medium': '#f59e0b',
      'high': '#ef4444',
      'very high': '#991b1b',
      'overcrowded': '#7c2d12'
    };
    return colors[level] || '#6b7280';
  };

  const getCapacityPercentage = (current, max) => {
    return Math.min((current / max) * 100, 100);
  };

  if (loading) {
    return <div className="zones-loading">Loading zones...</div>;
  }

  return (
    <div className="zones-page">
      {filteredZones.length > 0 ? (
        <div className="zones-grid">
          {filteredZones.map((zone) => {
            const percentage = getCapacityPercentage(zone.currentCrowdCount, zone.maxCapacity);
            const crowdColor = getCrowdLevelColor(zone.crowdLevel);

            return (
              <div key={zone._id} className="zone-card">
                <div className="zone-header">
                  <h3 className="zone-name">{zone.name}</h3>
                  <span 
                    className="zone-crowd-badge" 
                    style={{ backgroundColor: crowdColor }}
                  >
                    {zone.crowdLevel}
                  </span>
                </div>

                <div className="zone-body">
                  <div className="zone-stats">
                    <div className="stat-item">
                      <span className="stat-label">Max Capacity:</span>
                      <span className="stat-value">
                        {zone.maxCapacity.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="stat-item">
                      <span className="stat-label">Current Count:</span>
                      <span className="stat-value">
                        {zone.currentCrowdCount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="capacity-section">
                    <div className="capacity-header">
                      <span className="capacity-label">Capacity Utilization</span>
                      <span className="capacity-percentage">{Math.round(percentage)}%</span>
                    </div>
                    <div className="capacity-bar">
                      <div 
                        className="capacity-fill"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: crowdColor
                        }}
                      />
                    </div>
                  </div>

                  {zone.facilities && zone.facilities.length > 0 && (
                    <div className="facilities-section">
                      <span className="facilities-label">Facilities:</span>
                      <div className="facility-tags">
                        {zone.facilities.map((facility, idx) => (
                          <span key={idx} className="facility-tag">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-zones">
          <p>No zones found</p>
          <small>Try adjusting your search criteria</small>
        </div>
      )}
    </div>
  );
};

export default Zones;