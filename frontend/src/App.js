import './App.css';

import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navigation/Navbar';
import AccommodationPage from './pages/Accommodation/AccommodationPage';
import AttractionsPage from './pages/Attractions/AttractionsPage';
import EventsPage from './pages/Events/EventsPage';
import Home from './pages/Home/Home';
import MapPage from './pages/Map/MapPage';
import ParkingPage from './pages/Parking/ParkingPage';
import WashroomsPage from './pages/Washrooms/WashroomsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Events */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventsPage />} />
            
            {/* Accommodations */}
            <Route path="/accommodations" element={<AccommodationPage />} />
            <Route path="/accommodations/:id" element={<AccommodationPage />} />
            
            {/* Attractions */}
            <Route path="/attractions" element={<AttractionsPage />} />
            <Route path="/attractions/:id" element={<AttractionsPage />} />
            
            <Route path="/map" element={<MapPage />} />

            {/* Parking - Added :id route */}
            <Route path="/parking" element={<ParkingPage />} />
            <Route path="/parking/:id" element={<ParkingPage />} /> 

            {/* Washrooms - Added :id route */}
            <Route path="/washrooms" element={<WashroomsPage />} />
            <Route path="/washrooms/:id" element={<WashroomsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;