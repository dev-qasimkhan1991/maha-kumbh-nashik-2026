import '../styles/FeaturedAccommodations.css';

import React from 'react';

import { Link } from 'react-router-dom';

import AccommodationCard from '../../../components/Cards/AccommodationCard';
import LoadingSpinner from '../../../components/Loading/LoadingSpinner';
import useFetch from '../../../hooks/useFetch';

const FeaturedAccommodations = () => {
  const { data: accommodations, loading } = useFetch('/accommodations/featured');

  if (loading) return <LoadingSpinner />;

  return (
    <section className="featured-acc-section">
      <div className="featured-acc-header">
        <h2>Featured Hotels & Accommodations</h2>
        <Link to="/accommodations" className="view-all">
          Browse All Hotels →
        </Link>
      </div>

      <div className="accommodations-grid">
        {accommodations && accommodations.map((acc) => (
          <AccommodationCard key={acc._id} accommodation={acc} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedAccommodations;