import './AccommodationPage.css';

import React, {
  useMemo,
  useState,
} from 'react';

import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiStar,
} from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import AccommodationCard from '../../components/Cards/AccommodationCard';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import useFetch from '../../hooks/useFetch';

const AccommodationPage = () => {
  const { id } = useParams();
  const { data: allAccommodations, loading, error } = useFetch('/accommodations');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter accommodations - MOVED OUTSIDE CONDITION
  const filtered = useMemo(() => {
    if (!allAccommodations) return [];
    
    return allAccommodations.filter(acc => {
      const matchType = selectedType === 'all' || acc.type === selectedType;
      const matchPrice = acc.pricePerNight >= priceRange[0] && acc.pricePerNight <= priceRange[1];
      const matchSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchType && matchPrice && matchSearch;
    });
  }, [allAccommodations, selectedType, priceRange, searchTerm]);

  // NOW check if viewing single accommodation
  if (id && allAccommodations) {
    const accommodation = allAccommodations.find(a => a._id === id);
    if (accommodation) {
      return <AccommodationDetailsPage accommodation={accommodation} />;
    }
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error loading accommodations</div>;

  const types = ['all', 'hotel', 'lodge', 'hostel', 'camp', 'ashram', 'dharamshala'];

  return (
    <div className="accommodation-page">
      {/* Rest of the component stays the same */}
      <div className="acc-header">
        <h1>Hotels & Accommodations</h1>
        <p>Find the perfect place to stay during Maha Kumbh 2026</p>
      </div>

      <div className="acc-container">
        <div className="acc-sidebar">
          <div className="filter-section">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search accommodations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h3>Type</h3>
            <div className="type-filters">
              {types.map(type => (
                <button
                  key={type}
                  className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-info">
              <p>₹{priceRange[0]} - ₹{priceRange[1]}</p>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="price-slider"
            />
          </div>

          <div className="filter-info">
            <p><strong>{filtered.length}</strong> accommodations found</p>
          </div>
        </div>

        <div className="acc-main">
          {filtered.length > 0 ? (
            <div className="accommodations-list">
              {filtered.map(acc => (
                <AccommodationCard key={acc._id} accommodation={acc} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No accommodations match your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AccommodationDetailsPage = ({ accommodation }) => {
  return (
    <div className="acc-detail-page">
      <div className="acc-detail-header">
        {accommodation.images && accommodation.images[0] && (
          <img src={accommodation.images[0]} alt={accommodation.name} className="acc-detail-image" />
        )}
      </div>

      <div className="acc-detail-content">
        <div className="acc-detail-body">
          <h1>{accommodation.name}</h1>
          <span className="acc-type-badge">{accommodation.type}</span>

          <div className="acc-rating-section">
            <span className="rating">
              <FiStar fill="#FFD700" color="#FFD700" size={18} />
              {accommodation.rating}
            </span>
            <span className="review-count">({accommodation.reviewCount} reviews)</span>
          </div>

          <div className="acc-meta">
            <div className="meta-item">
              <FiMapPin size={18} />
              <div>
                <strong>Address</strong>
                <p>{accommodation.address}</p>
              </div>
            </div>

            <div className="meta-item">
              <FiPhone size={18} />
              <div>
                <strong>Phone</strong>
                <p>{accommodation.phone}</p>
              </div>
            </div>

            <div className="meta-item">
              <FiMail size={18} />
              <div>
                <strong>Email</strong>
                <p>{accommodation.email || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <div className="acc-pricing">
            <h2>Pricing</h2>
            <div className="price-box">
              <span className="price-label">Price per Night</span>
              <span className="price-amount">₹{accommodation.pricePerNight}</span>
            </div>
            <p className="rooms-info">
              {accommodation.totalRooms} rooms available • Capacity: {accommodation.totalCapacity} guests
            </p>
          </div>

          <div className="acc-description">
            <h2>About This Accommodation</h2>
            <p>{accommodation.description}</p>
          </div>

          <div className="acc-amenities">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {accommodation.amenities.map((amenity, idx) => (
                <div key={idx} className="amenity-item">
                  ✓ {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="acc-detail-sidebar">
          <button className="action-btn">
            📞 Call Now
          </button>
          <button className="action-btn secondary">
            📧 Send Email
          </button>
          <button className="action-btn secondary">
            🗺️ Get Directions
          </button>
          <button className="action-btn secondary">
            ❤️ Save to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationPage;