import './AttractionsPage.css';

import React, {
  useMemo,
  useState,
} from 'react';

import {
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiStar,
} from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import AttractionCard from '../../components/Cards/AttractionCard';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import useFetch from '../../hooks/useFetch';

const AttractionsPage = () => {
  const { id } = useParams();
  const { data: allAttractions, loading, error } = useFetch('/attractions');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter attractions - MOVED OUTSIDE CONDITION
  const filtered = useMemo(() => {
    if (!allAttractions) return [];
    
    return allAttractions.filter(attr => {
      const matchCategory = selectedCategory === 'all' || attr.category === selectedCategory;
      const matchSearch = attr.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [allAttractions, selectedCategory, searchTerm]);

  // NOW check if viewing single attraction
  if (id && allAttractions) {
    const attraction = allAttractions.find(a => a._id === id);
    if (attraction) {
      return <AttractionDetailsPage attraction={attraction} />;
    }
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error loading attractions</div>;

  const categories = ['all', 'religious', 'historical', 'scenic', 'museum', 'natural', 'monument'];

  return (
    <div className="attractions-page">
      {/* Rest of the component stays the same */}
      <div className="attractions-header">
        <h1>Attractions & Sites</h1>
        <p>Explore temples, historical sites and scenic spots in Nashik</p>
      </div>

      <div className="attractions-container">
        <div className="attractions-sidebar">
          <div className="filter-section">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search attractions..."
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
            <p><strong>{filtered.length}</strong> attractions found</p>
          </div>
        </div>

        <div className="attractions-main">
          {filtered.length > 0 ? (
            <div className="attractions-list">
              {filtered.map(attr => (
                <AttractionCard key={attr._id} attraction={attr} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No attractions match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AttractionDetailsPage = ({ attraction }) => {
  return (
    <div className="attr-detail-page">
      <div className="attr-detail-header">
        {attraction.images && attraction.images[0] && (
          <img src={attraction.images[0]} alt={attraction.name} className="attr-detail-image" />
        )}
      </div>

      <div className="attr-detail-content">
        <div className="attr-detail-body">
          <h1>{attraction.name}</h1>
          <span className="attr-category-badge">{attraction.category}</span>

          <div className="attr-rating-section">
            <span className="rating">
              <FiStar fill="#FFD700" color="#FFD700" size={18} />
              {attraction.rating}
            </span>
            <span className="review-count">({attraction.reviewCount} reviews)</span>
          </div>

          <div className="attr-meta">
            <div className="meta-item">
              <FiMapPin size={18} />
              <div>
                <strong>Location</strong>
                <p>{attraction.address}</p>
              </div>
            </div>

            <div className="meta-item">
              <FiClock size={18} />
              <div>
                <strong>Hours</strong>
                <p>{attraction.openingHours?.open} - {attraction.openingHours?.close}</p>
              </div>
            </div>

            {attraction.entryFee?.adult > 0 && (
              <div className="meta-item">
                <FiDollarSign size={18} />
                <div>
                  <strong>Entry Fee</strong>
                  <p>Adult: ₹{attraction.entryFee.adult}</p>
                </div>
              </div>
            )}

            {attraction.entryFee?.adult === 0 && (
              <div className="meta-item free">
                <strong>✓ Free Entry</strong>
              </div>
            )}
          </div>

          {attraction.description && (
            <div className="attr-section">
              <h2>About</h2>
              <p>{attraction.description}</p>
            </div>
          )}

          {attraction.history && (
            <div className="attr-section">
              <h2>History</h2>
              <p>{attraction.history}</p>
            </div>
          )}

          {attraction.mythology && (
            <div className="attr-section">
              <h2>Mythology & Significance</h2>
              <p>{attraction.mythology}</p>
            </div>
          )}

          {attraction.facilities && attraction.facilities.length > 0 && (
            <div className="attr-facilities">
              <h2>Facilities</h2>
              <div className="facilities-grid">
                {attraction.facilities.map((facility, idx) => (
                  <div key={idx} className="facility-item">
                    ✓ {facility}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="attr-detail-sidebar">
          <button className="action-btn">
            📞 Contact
          </button>
          <button className="action-btn secondary">
            🗺️ Directions
          </button>
          <button className="action-btn secondary">
            📷 Gallery
          </button>
          <button className="action-btn secondary">
            ❤️ Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttractionsPage;