import './AccommodationCard.css';

import React from 'react';

import {
  FiDollarSign,
  FiMapPin,
  FiPhone,
  FiStar,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AccommodationCard = ({ accommodation }) => {
  return (
    <Link to={`/accommodations/${accommodation._id}`} className="acc-card-link">
      <div className="acc-card">
        <div className="acc-image-container">
          {accommodation.images && accommodation.images[0] ? (
            <img
              src={accommodation.images[0]}
              alt={accommodation.name}
              className="acc-image"
            />
          ) : (
            <div className="acc-image-placeholder">No Image</div>
          )}
          <div className="acc-type-badge">{accommodation.type}</div>
        </div>

        <div className="acc-info">
          <h3 className="acc-name">{accommodation.name}</h3>

          <div className="acc-rating">
            <FiStar fill="#FFD700" color="#FFD700" size={16} />
            <span>{accommodation.rating}</span>
            <span className="review-count">({accommodation.reviewCount} reviews)</span>
          </div>

          <div className="acc-detail">
            <FiMapPin size={16} />
            <span>{accommodation.address}</span>
          </div>

          <div className="acc-detail">
            <FiPhone size={16} />
            <span>{accommodation.phone}</span>
          </div>

          <div className="acc-price">
            <FiDollarSign size={18} />
            <span className="price-amount">₹{accommodation.pricePerNight}</span>
            <span className="price-period">/ night</span>
          </div>

          <div className="acc-amenities">
            {accommodation.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="amenity-tag">
                {amenity}
              </span>
            ))}
            {accommodation.amenities.length > 3 && (
              <span className="amenity-tag">+{accommodation.amenities.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AccommodationCard;