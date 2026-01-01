import React from 'react';

import { Link } from 'react-router-dom';

import AccommodationCard from '../../../components/Cards/AccommodationCard';
import LoadingSpinner from '../../../components/Loading/LoadingSpinner';
import useFetch from '../../../hooks/useFetch';

const featuredAccStyles = `
.featured-acc-section {
  padding: 60px 20px;
  background: #f9f9f9;
  max-width: 1200px;
  margin: 0 auto;
}

.featured-acc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.featured-acc-header h2 {
  font-size: 2.5rem;
  margin: 0;
  color: #1a1a1a;
}

.accommodations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

@media screen and (max-width: 768px) {
  .featured-acc-section {
    padding: 40px 15px;
  }

  .featured-acc-header h2 {
    font-size: 2rem;
  }

  .accommodations-grid {
    grid-template-columns: 1fr;
  }
}
`;

const FeaturedAccommodations = () => {
  const { data: accommodations, loading } = useFetch('/accommodations/featured');

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <style>{featuredAccStyles}</style>
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
    </>
  );
};

export default FeaturedAccommodations;