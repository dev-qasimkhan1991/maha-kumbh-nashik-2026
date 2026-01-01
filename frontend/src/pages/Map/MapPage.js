// THE FIX: Leaflet requires its CSS to position the tiles correctly
import 'leaflet/dist/leaflet.css';

import React, {
  useEffect,
  useState,
} from 'react';

import L from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';

import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import useFetch from '../../hooks/useFetch';

// Fix leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Create a default icon instance to avoid "createIcon is not a function" errors
const defaultIcon = new L.Icon.Default();

// THE FIX: This component forces the map to recalculate its size once it renders
const MapRefresher = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
};

// Custom marker icons
const eventIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const accommodationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const attractionIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// NEW: Parking and Washroom Icons
const parkingIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const washroomIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const getMarkerIcon = (type) => {
  switch(type) {
    case 'event': return eventIcon;
    case 'accommodation': return accommodationIcon;
    case 'attraction': return attractionIcon;
    case 'parking': return parkingIcon;
    case 'washroom': return washroomIcon;
    default: return defaultIcon;
  }
};

const mapStyles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.map-page {
  width: 100%;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
}

.map-header {
  background: linear-gradient(135deg, #9c27b0 0%, #673ab7 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
  flex-shrink: 0;
}

.map-header h1 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
}

.map-header p {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.map-main-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  padding: 20px;
  flex: 1;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  height: calc(100vh - 200px);
  overflow: hidden;
}

.map-filters {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.map-filters h3 {
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  color: #1a1a1a;
  flex-shrink: 0;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 10px;
  background: #f9f9f9;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.filter-checkbox:hover {
  background: #f0f0f0;
}

.filter-checkbox input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.filter-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Existing Colors */
.filter-color.event { background: #ff0000; }
.filter-color.accommodation { background: #0000ff; }
.filter-color.attraction { background: #00aa00; }

/* NEW Colors */
.filter-color.parking { background: #ff9800; }
.filter-color.washroom { background: #9c27b0; }

.locations-list {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.locations-list h4 {
  margin: 0 0 10px 0;
  color: #1a1a1a;
  flex-shrink: 0;
  font-size: 0.95rem;
}

.locations-scroll {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  flex: 1;
}

.location-item {
  padding: 10px;
  background: #f9f9f9;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.location-item:hover {
  background: #eff3f5;
  transform: translateX(5px);
}

.location-name {
  font-weight: bold;
  color: #1a1a1a;
  font-size: 0.9rem;
  line-height: 1.3;
}

.location-address {
  font-size: 0.75rem;
  color: #666;
  margin-top: 4px;
}

.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.leaflet-container {
  width: 100% !important;
  height: 100% !important;
  z-index: 1;
}

.leaflet-popup-content-wrapper {
  border-radius: 8px;
}

.popup-content h4 {
  margin: 0 0 10px 0;
  color: #1a1a1a;
  font-size: 0.95rem;
}

.popup-content p {
  margin: 5px 0;
  font-size: 0.85rem;
  color: #555;
  line-height: 1.4;
}

.directions-btn {
  display: inline-block;
  margin-top: 12px;
  padding: 8px 15px;
  background: #673ab7;
  color: white !important;
  text-decoration: none;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.3s ease;
  text-align: center;
  width: 100%;
}

.directions-btn:hover {
  background: #9c27b0;
}

@media screen and (max-width: 1024px) {
  .map-main-content {
    grid-template-columns: 1fr;
    height: calc(100vh - 220px);
  }
  .map-filters { max-height: 300px; }
}

@media screen and (max-width: 768px) {
  .map-main-content {
    grid-template-columns: 1fr;
    padding: 10px;
    gap: 10px;
    height: calc(100vh - 200px);
  }
  .map-header h1 { font-size: 2rem; }
  .map-filters { max-height: 250px; }
}
`;

const MapPage = () => {
  const { data: locations, loading } = useFetch('/locations');
  const [filters, setFilters] = useState({
    events: true,
    accommodations: true,
    attractions: true,
    parking: true,
    washrooms: true,
  });

  const nashikCenter = [19.8965, 73.7853];

  // THE FIX 1: Unique key forces Leaflet to refresh markers when filters change
  const mapKey = Object.values(filters).join('-');

  const getFilteredLocations = () => {
    if (!locations) return [];
    return locations.filter(loc => {
      // THE FIX 2: Strict matching. If no filter matches, return FALSE (hide it)
      if (loc.type === 'event') return filters.events;
      if (loc.type === 'accommodation') return filters.accommodations;
      if (loc.type === 'attraction') return filters.attractions;
      if (loc.type === 'parking') return filters.parking;
      if (loc.type === 'washroom') return filters.washrooms;
      
      return false; // Changed from 'true' to 'false' to hide unhandled types
    });
  };

  const toggleFilter = (type) => {
    setFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (loading) return <LoadingSpinner />;

  const filteredLocations = getFilteredLocations();

  return (
    <>
      <style>{mapStyles}</style>
      <div className="map-page">
        <div className="map-header">
          <h1>Interactive Map</h1>
          <p>Explore all locations, events, and accommodations around Maha Kumbh</p>
        </div>

        <div className="map-main-content">
          <div className="map-filters">
            <h3>Filters</h3>
            
            {/* Filter Checkboxes */}
            <label className="filter-checkbox">
              <input type="checkbox" checked={filters.events} onChange={() => toggleFilter('events')} />
              <span className="filter-label">
                <span className="filter-color event"></span>
                Events ({locations?.filter(l => l.type === 'event').length || 0})
              </span>
            </label>

            <label className="filter-checkbox">
              <input type="checkbox" checked={filters.accommodations} onChange={() => toggleFilter('accommodations')} />
              <span className="filter-label">
                <span className="filter-color accommodation"></span>
                Hotels ({locations?.filter(l => l.type === 'accommodation').length || 0})
              </span>
            </label>

            <label className="filter-checkbox">
              <input type="checkbox" checked={filters.attractions} onChange={() => toggleFilter('attractions')} />
              <span className="filter-label">
                <span className="filter-color attraction"></span>
                Attractions ({locations?.filter(l => l.type === 'attraction').length || 0})
              </span>
            </label>

            <label className="filter-checkbox">
              <input type="checkbox" checked={filters.parking} onChange={() => toggleFilter('parking')} />
              <span className="filter-label">
                <span className="filter-color parking"></span>
                Parking ({locations?.filter(l => l.type === 'parking').length || 0})
              </span>
            </label>

            <label className="filter-checkbox">
              <input type="checkbox" checked={filters.washrooms} onChange={() => toggleFilter('washrooms')} />
              <span className="filter-label">
                <span className="filter-color washroom"></span>
                Washrooms ({locations?.filter(l => l.type === 'washroom').length || 0})
              </span>
            </label>

            <div className="locations-list">
              <h4>All Locations ({filteredLocations.length})</h4>
              <div className="locations-scroll">
                {filteredLocations.map(location => (
                  <div key={location._id} className="location-item">
                    <div className="location-name">{location.name}</div>
                    <div className="location-address">{location.address || location.location?.address}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="map-wrapper">
  <MapContainer center={nashikCenter} zoom={14} className="leaflet-container">
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='© OpenStreetMap contributors'
    />
    <MapRefresher />

    {/* THE FIX: We move the key here. 
        Whenever 'mapKey' changes, Leaflet will clear this specific layer 
        and re-draw the filtered markers without destroying the whole map.
    */}
    <div key={mapKey}> 
      {filteredLocations.map((location) => {
        const lat = location.latitude || location.location?.latitude;
        const lng = location.longitude || location.location?.longitude;

        if (!lat || !lng) return null;

        return (
          <Marker
            key={`${location._id}-${mapKey}`} // Force individual marker refresh
            position={[lat, lng]}
            icon={getMarkerIcon(location.type)}
          >
            <Popup>
              <div className="popup-content">
                <h4>{location.name}</h4>
                <p><strong>Type:</strong> {location.type}</p>
                <p><strong>Address:</strong> {location.address || location.location?.address}</p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="directions-btn"
                >
                  Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </div>
  </MapContainer>
</div>
        </div>
      </div>
    </>
  );
};

export default MapPage;