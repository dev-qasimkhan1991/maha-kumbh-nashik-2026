import './EventsPage.css';

import React, {
  useMemo,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import EventCard from '../../components/Cards/EventCard';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import useFetch from '../../hooks/useFetch';

const EventsPage = () => {
  const { id } = useParams();
  const { data: allEvents, loading, error } = useFetch('/events');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // If viewing single event
  if (id) {
    const event = allEvents?.find(e => e._id === id);
    if (!event) return <LoadingSpinner />;
    return <EventDetailsPage event={event} />;
  }

  // Filter events
  const filtered = useMemo(() => {
    if (!allEvents) return [];
    
    return allEvents.filter(event => {
      const matchCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [allEvents, selectedCategory, searchTerm]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error loading events</div>;

  const categories = ['all', 'ritual', 'cultural', 'sport', 'ceremony', 'other'];

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Maha Kumbh Events</h1>
        <p>Explore all the events happening during Maha Kumbh 2026</p>
      </div>

      <div className="events-container">
        {/* Filters */}
        <div className="events-sidebar">
          <div className="filter-section">
            <h3>Search Events</h3>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h3>Category</h3>
            <div className="category-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-info">
            <p>Found <strong>{filtered.length}</strong> events</p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="events-main">
          {filtered.length > 0 ? (
            <div className="events-list">
              {filtered.map(event => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No events found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Event Details Page
const EventDetailsPage = ({ event }) => {
  return (
    <div className="event-detail-page">
      <div className="event-detail-header">
        {event.images && event.images[0] && (
          <img src={event.images[0]} alt={event.title} className="event-detail-image" />
        )}
      </div>

      <div className="event-detail-content">
        <div className="event-detail-body">
          <h1>{event.title}</h1>
          <span className="event-category">{event.category}</span>

          <div className="event-meta">
            <div className="meta-item">
              <strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="meta-item">
              <strong>⏰ Time:</strong> {event.time}
            </div>
            <div className="meta-item">
              <strong>👥 Expected Capacity:</strong> {event.capacity}+ people
            </div>
            <div className="meta-item">
              <strong>📍 Location:</strong> {event.location.address}
            </div>
          </div>

          <div className="event-description">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </div>
        </div>

        <div className="event-detail-sidebar">
          <button className="action-btn">
            📌 Save to Favorites
          </button>
          <button className="action-btn secondary">
            📍 Get Directions
          </button>
          <button className="action-btn secondary">
            📤 Share Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;