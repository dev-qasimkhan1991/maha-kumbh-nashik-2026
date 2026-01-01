import './WashroomsPage.css';

import React, {
  useMemo,
  useState,
} from 'react';

import { useParams } from 'react-router-dom'; // Added this

import WashroomCard from '../../components/Cards/WashroomCard';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import useFetch from '../../hooks/useFetch';

const WashroomsPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { data: washrooms, loading, error } = useFetch('/washrooms');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filtered = useMemo(() => {
    if (!washrooms) return [];
    return washrooms.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = selectedType === 'all' || (item.genderType || 'unisex').toLowerCase() === selectedType;
      return matchSearch && matchType;
    });
  }, [washrooms, searchTerm, selectedType]);

  // DETAIL VIEW LOGIC
  if (id && washrooms) {
    const facility = washrooms.find(w => w._id === id);
    if (facility) return <WashroomDetailsPage facility={facility} />;
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error loading washroom data</div>;

  const categories = ['all', 'unisex', 'male', 'female'];

  return (
    <div className="events-page">
      <div className="events-header" style={{ background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)' }}>
        <h1>Public Washrooms</h1>
        <p>Clean and accessible facilities across the Maha Kumbh venues</p>
      </div>
      <div className="events-container">
        <aside className="events-sidebar">
          <div className="filter-section">
            <h3>Search Facility</h3>
            <input 
              className="search-input"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-section">
            <h3>Gender</h3>
            <div className="category-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedType === cat ? 'active' : ''}`}
                  style={selectedType === cat ? { background: '#9c27b0', borderColor: '#9c27b0' } : {}}
                  onClick={() => setSelectedType(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </aside>
        <main className="events-main">
          <div className="events-list">
            {filtered.map((facility) => (
              <WashroomCard key={facility._id} facility={facility} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

// Detail View Component
const WashroomDetailsPage = ({ facility }) => {
  return (
    <div className="event-detail-page">
      <div className="event-detail-header" style={{ background: '#9c27b0' }}>
        {facility.images && facility.images[0] && <img src={facility.images[0]} alt={facility.name} className="event-detail-image" />}
      </div>
      <div className="event-detail-content">
        <div className="event-detail-body">
          <h1>{facility.name}</h1>
          <span className="event-category" style={{ background: '#9c27b0' }}>{facility.genderType}</span>
          <div className="event-meta">
            <div className="meta-item"><strong>🚿 Showers:</strong> {facility.hasShower ? 'Yes' : 'No'}</div>
            <div className="meta-item"><strong>♿ Accessible:</strong> {facility.isHandicapAccessible ? 'Yes' : 'No'}</div>
            <div className="meta-item"><strong>⭐ Rating:</strong> {facility.rating}/5</div>
          </div>
        </div>
        <div className="event-detail-sidebar">
           <a href={`https://www.google.com/maps?q=${facility.location?.latitude},${facility.location?.longitude}`} target="_blank" rel="noreferrer" className="action-btn" style={{ background: '#9c27b0', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
            📍 View on Map
          </a>
        </div>
      </div>
    </div>
  );
};

export default WashroomsPage;