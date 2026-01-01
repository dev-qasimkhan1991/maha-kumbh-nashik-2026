import './ParkingPage.css';

import React, {
  useMemo,
  useState,
} from 'react';

import { useParams } from 'react-router-dom'; // Added this

import ParkingCard from '../../components/Cards/ParkingCard';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import useFetch from '../../hooks/useFetch';

const ParkingPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { data: parkingLots, loading, error } = useFetch('/parking');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filtered = useMemo(() => {
    if (!parkingLots) return [];
    return parkingLots.filter(item => {
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [parkingLots, searchTerm, selectedType]);

  // DETAIL VIEW LOGIC
  if (id && parkingLots) {
    const lot = parkingLots.find(p => p._id === id);
    if (lot) return <ParkingDetailsPage lot={lot} />;
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error loading parking data</div>;

  const types = ['all', 'paid', 'free', 'bike', 'handicap'];

  return (
    <div className="events-page">
      <div className="events-header" style={{ background: 'linear-gradient(135deg, #434343 0%, #000000 100%)' }}>
        <h1>Find Parking</h1>
        <p>Real-time parking availability across Nashik Venues</p>
      </div>
      <div className="events-container">
        <aside className="events-sidebar">
          <div className="filter-section">
            <h3>Search Parking</h3>
            <input 
              className="search-input"
              placeholder="e.g. Panchavati Lot..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-section">
            <h3>Type</h3>
            <div className="category-filters">
              {types.map(t => (
                <button 
                  key={t}
                  className={`filter-btn ${selectedType === t ? 'active' : ''}`}
                  style={selectedType === t ? { background: '#434343', borderColor: '#434343' } : {}}
                  onClick={() => setSelectedType(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-info">
            <p>Found <strong>{filtered.length}</strong> parking lots</p>
          </div>
        </aside>
        <main className="events-main">
          <div className="events-list">
            {filtered.map(lot => (
              <ParkingCard key={lot._id} lot={lot} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

// Detail View Component
const ParkingDetailsPage = ({ lot }) => {
  return (
    <div className="event-detail-page">
      <div className="event-detail-header" style={{ background: '#333' }}>
        {lot.images && lot.images[0] && <img src={lot.images[0]} alt={lot.name} className="event-detail-image" />}
      </div>
      <div className="event-detail-content">
        <div className="event-detail-body">
          <h1>{lot.name}</h1>
          <span className="event-category" style={{ background: '#434343' }}>{lot.type} Parking</span>
          <div className="event-meta">
            <div className="meta-item"><strong>🚗 Status:</strong> {lot.status}</div>
            <div className="meta-item"><strong>🔢 Spaces:</strong> {lot.availableSpaces} / {lot.totalSpaces} Available</div>
            <div className="meta-item"><strong>📍 Address:</strong> {lot.location.address}</div>
          </div>
          <div className="event-description">
            <h2>About this Location</h2>
            <p>Reliable {lot.type} parking facility with real-time tracking.</p>
          </div>
        </div>
        <div className="event-detail-sidebar">
          <a href={`https://www.google.com/maps?q=${lot.location.latitude},${lot.location.longitude}`} target="_blank" rel="noreferrer" className="action-btn" style={{ background: '#434343', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
            📍 Navigate Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ParkingPage;