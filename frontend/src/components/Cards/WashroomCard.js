import './WashroomCard.css';

import React from 'react';

import {
  FiCheckCircle,
  FiDroplet,
  FiMapPin,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const WashroomCard = ({ facility }) => {
  return (
    <Link to={`/washrooms/${facility._id}`} className="wash-card-link">
      <div className="wash-card">
        <div className="wash-image-container">
          {facility.images && facility.images[0] ? (
            <img src={facility.images[0]} alt={facility.name} className="wash-image" />
          ) : (
            <div className="wash-image-placeholder">No Image</div>
          )}
          <div className="wash-gender-badge">{facility.genderType || 'Unisex'}</div>
        </div>

        <div className="wash-info">
          <h3 className="wash-name">{facility.name}</h3>

          <div className="wash-detail">
            <FiDroplet size={16} />
            <span>{facility.hasShower ? 'Showers Available' : 'No Showers'}</span>
          </div>

          <div className="wash-detail">
            <FiCheckCircle size={16} />
            <span>{facility.isHandicapAccessible ? '♿ Accessible' : 'Standard'}</span>
          </div>

          <div className="wash-detail">
            <FiMapPin size={16} />
            <span>{facility.location?.address || 'Near Ghats'}</span>
          </div>

          <div className="wash-rating-section">
            <span style={{ fontSize: '0.75rem', color: '#888' }}>Cleanliness</span>
            <div className="wash-meter-bg">
              <div 
                className="wash-meter-fill" 
                style={{ width: facility.rating ? `${(facility.rating / 5) * 100}%` : '80%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WashroomCard;