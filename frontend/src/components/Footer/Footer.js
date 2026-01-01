import './Footer.css';

import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Maha Kumbh</h3>
            <p>
              Maha Kumbh Mela 2026 - The world's largest religious gathering
              on the banks of River Godavari in Nashik, Maharashtra.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/map">Map</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/accommodations">Hotels</a></li>
              <li><a href="/attractions">Attractions</a></li>
              <li><a href="/parking">Parking</a></li>
              <li><a href="/washrooms">Washrooms</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: info@mahakumbh2026.com</p>
            <p>Phone: +91 (0)253 2574567</p>
            <p>Location: Nashik, Maharashtra, India</p>
          </div>

          <div className="footer-section">
            <h3>Event Dates</h3>
            <p>📅 January 14 - February 28, 2026</p>
            <p>📍 Godavari River, Nashik</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Maha Kumbh Mela. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;