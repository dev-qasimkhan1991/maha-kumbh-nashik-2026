import './ParkingCard.css';

import React from 'react';

import {
  FiMapPin,
  FiTruck,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ParkingCard = ({ lot }) => {
  return (
    <Link to={`/parking/${lot._id}`} className="park-card-link">
      <div className="park-card">
        <div className="park-image-container">
          {lot.images && lot.images[0] ? (
            <img src={lot.images[0]} alt={lot.name} className="park-image" />
          ) : (
            <div className="park-image-placeholder">No Image</div>
          )}
          <div className="park-type-badge">{lot.type}</div>
          <div className="park-status-badge" data-status={lot.status}>
            {lot.status}
          </div>
        </div>

        <div className="park-info">
          <h3 className="park-name">{lot.name}</h3>

          <div className="park-detail">
            <FiTruck size={16} />
            <span><strong>{lot.availableSpaces}</strong> / {lot.totalSpaces} Available</span>
          </div>

          <div className="park-detail">
            <FiMapPin size={16} />
            <span>{lot.location.address}</span>
          </div>

          <div className="park-capacity-info">
             <div className="park-available-count">{lot.availableSpaces} Spots Left</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ParkingCard;