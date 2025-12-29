import './Navbar.css';

import React, { useState } from 'react';

import {
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          🙏 Maha Kumbh 2026
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/map" className="nav-links" onClick={closeMenu}>
              Map
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-links" onClick={closeMenu}>
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/accommodations" className="nav-links" onClick={closeMenu}>
              Hotels
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/attractions" className="nav-links" onClick={closeMenu}>
              Attractions
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;