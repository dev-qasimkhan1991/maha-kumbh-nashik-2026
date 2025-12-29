import './AttractionCard.css';

import React from 'react';

import {
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiStar,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AttractionCard = ({ attraction }) => {
  return (
    <Link to={`/attractions/${attraction._id}`} className="attr-card-link">
      <div className="attr-card">
        <div className="attr-image-container">
          {attraction.images && attraction.images[0] ? (
            <img
              src={attraction.images[0]}
              alt={attraction.name}
              className="attr-image"
            />
          ) : (
            <div className="attr-image-placeholder">No Image</div>
          )}
          <div className="attr-category-badge">{attraction.category}</div>
        </div>

        <div className="attr-info">
          <h3 className="attr-name">{attraction.name}</h3>

          <div className="attr-rating">
            <FiStar fill="#FFD700" color="#FFD700" size={16} />
            <span>{attraction.rating}</span>
          </div>

          <div className="attr-detail">
            <FiMapPin size={16} />
            <span>{attraction.address}</span>
          </div>

          <div className="attr-detail">
            <FiClock size={16} />
            <span>
              {attraction.openingHours?.open} - {attraction.openingHours?.close}
            </span>
          </div>

          {attraction.entryFee?.adult > 0 && (
            <div className="attr-detail">
              <FiDollarSign size={16} />
              <span>₹{attraction.entryFee.adult} (Adult)</span>
            </div>
          )}

          {attraction.entryFee?.adult === 0 && (
            <div className="attr-free-tag">FREE ENTRY</div>
          )}

          <p className="attr-description">{attraction.description.substring(0, 70)}...</p>
        </div>
      </div>
    </Link>
  );
};

export default AttractionCard;