import '../styles/FeaturedEvents.css';

import React from 'react';

import { Link } from 'react-router-dom';

import EventCard from '../../../components/Cards/EventCard';
import LoadingSpinner from '../../../components/Loading/LoadingSpinner';
import useFetch from '../../../hooks/useFetch';

const FeaturedEvents = () => {
  const { data: events, loading } = useFetch('/events/featured');

  if (loading) return <LoadingSpinner />;

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>Featured Events</h2>
        <Link to="/events" className="view-all">
          View All Events →
        </Link>
      </div>

      <div className="events-grid">
        {events && events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;