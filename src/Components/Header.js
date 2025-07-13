import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Header.css';

const Header = ({ id }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prev => !prev);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const navLinks = [
    { name: 'Dashboard', path: `/dashboard/${id}` },
    { name: 'Feed', path: `/feed/${id}` },
    { name: 'Chat', path: `/chat/${id}` },
  ];

  return (
    <header className="header" role="banner">
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar__brand">
          <Link to={`/dashboard/${id}`} className="navbar__logo" onClick={closeAllMenus}>
            <img src="/logo_only_transparent.png" alt="Brand Logo" width="32" height="32" />
          </Link>
        </div>

        <button 
          className="navbar__toggle" 
          aria-controls="navigation-menu" 
          aria-expanded={isMobileMenuOpen} 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <ul 
          className={`navbar__links ${isMobileMenuOpen ? 'navbar__links--active' : ''}`} 
          id="navigation-menu"
        >
          {navLinks.map(link => (
            <li key={link.name} className="navbar__item">
              <Link 
                to={link.path} 
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                onClick={closeAllMenus}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Profile Dropdown */}
          <li className="navbar__item navbar__item--dropdown">
            <button 
              className="navbar__link navbar__link--button"
              onClick={toggleProfileDropdown}
              aria-haspopup="true"
              aria-expanded={isProfileDropdownOpen}
            >
              Profile ▼
            </button>
            {isProfileDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to={`/profile/${id}`} onClick={closeAllMenus}>View Profile</Link></li>
                <li><Link to='/login' onClick={() => { closeAllMenus();}}>Logout</Link></li>
                <li><button onClick={() => { closeAllMenus(); alert('Delete Account action'); }}>Delete Account</button></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
