import React from 'react';

import { Link } from 'react-router-dom';

const heroStyles = `
.hero {
  position: relative;
  height: 600px;
  background: linear-gradient(135deg, #ff6b35 0%, #f44336 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 20px;
  animation: slideUp 0.8s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.8rem;
  margin: 0 0 15px 0;
  font-weight: 300;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.95;
}

.hero-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 30px 0;
}

.info-item {
  background: rgba(255, 255, 255, 0.15);
  padding: 15px;
  border-radius: 8px;
  font-size: 1rem;
  backdrop-filter: blur(5px);
}

.hero-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 35px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: white;
  color: #ff6b35;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #ff6b35;
  transform: translateY(-3px);
}

@media screen and (max-width: 768px) {
  .hero {
    height: 400px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.3rem;
  }

  .hero-info {
    grid-template-columns: 1fr;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
`;

const Hero = () => {
  return (
    <>
      <style>{heroStyles}</style>
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Maha Kumbh Mela 2026 Nashik</h1>
          <h2 className="hero-subtitle">Nashik - Your Spiritual Journey Awaits</h2>
          <p className="hero-description">
            Experience the world's largest religious gathering at the sacred Godavari River
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
    </>
  );
};

export default Hero;