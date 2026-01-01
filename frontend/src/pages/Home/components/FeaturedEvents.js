import React from 'react';

import { Link } from 'react-router-dom';

import EventCard from '../../../components/Cards/EventCard';
import LoadingSpinner from '../../../components/Loading/LoadingSpinner';
import useFetch from '../../../hooks/useFetch';

const featuredStyles = `
.featured-section {
  padding: 60px 20px;
  background: white;
  max-width: 1200px;
  margin: 0 auto;
}

.featured-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.featured-header h2 {
  font-size: 2.5rem;
  margin: 0;
  color: #1a1a1a;
}

.view-all {
  color: #ff6b35;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.view-all:hover {
  gap: 10px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

@media screen and (max-width: 768px) {
  .featured-section {
    padding: 40px 15px;
  }

  .featured-header h2 {
    font-size: 2rem;
  }

  .events-grid {
    grid-template-columns: 1fr;
  }
}
`;

const FeaturedEvents = () => {
  const { data: events, loading } = useFetch('/events/featured');

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <style>{featuredStyles}</style>
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
    </>
  );
};

export default FeaturedEvents;