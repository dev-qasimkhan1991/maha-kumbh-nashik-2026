import '../styles/Hero.css';

import React from 'react';

import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Maha Kumbh Mela 2026</h1>
        <h2 className="hero-subtitle">Nashik - Your Spiritual Journey Awaits</h2>
        <p className="hero-description">
          Experience the world's largest religious gathering
        </p>

        <div className="hero-info">
          <div className="info-item">
            <span>📅 Jan 14 - Feb 28, 2026</span>
          </div>
          <div className="info-item">
            <span>📍 Godavari River, Nashik</span>
          </div>
          <div className="info-item">
            <span>👥 10+ Million Visitors</span>
          </div>
        </div>

        <div className="hero-buttons">
          <Link to="/map" className="btn btn-primary">
            Explore Map
          </Link>
          <Link to="/events" className="btn btn-secondary">
            View Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;