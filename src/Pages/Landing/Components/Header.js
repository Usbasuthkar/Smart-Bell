import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../css/Header.css';

const Header = ({ email }) => {
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
    { name: 'Sign Up', path: `/signup` },
    { name: 'login', path: `/login` },
  ];

  return (
    <header className="header" style={{backgroundColor:'#333'}}role="banner">
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar__brand" style={{marginBottom:'16px'}}>
          <Link to={`/`} className="navbar__logo" onClick={closeAllMenus}>
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
              <Link style={{color:"#fff"}}
                to={link.path} 
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                onClick={closeAllMenus}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
