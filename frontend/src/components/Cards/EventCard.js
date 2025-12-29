import './EventCard.css';

import React from 'react';

import {
  FiCalendar,
  FiClock,
  FiUsers,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Link to={`/events/${event._id}`} className="event-card-link">
      <div className="event-card">
        <div className="event-image-container">
          {event.images && event.images[0] ? (
            <img src={event.images[0]} alt={event.title} className="event-image" />
          ) : (
            <div className="event-image-placeholder">No Image</div>
          )}
          <div className="event-category-badge">{event.category}</div>
        </div>

        <div className="event-info">
          <h3 className="event-title">{event.title}</h3>

          <div className="event-detail">
            <FiCalendar size={16} />
            <span>{formatDate(event.date)}</span>
          </div>

          <div className="event-detail">
            <FiClock size={16} />
            <span>{event.time}</span>
          </div>

          <div className="event-detail">
            <FiUsers size={16} />
            <span>{event.capacity}+ people expected</span>
          </div>

          <p className="event-description">{event.description.substring(0, 80)}...</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;