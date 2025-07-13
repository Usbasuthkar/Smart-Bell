import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../css/Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [id,setId] = useState('');
  const [isExp,setIsExp] = useState(true);
  const location = useLocation();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      try{
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64).split('').map(c =>
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          ).join('')
        );
      const payload = JSON.parse(jsonPayload);
      if(!payload || !payload.exp) setIsExp(true);
      setIsExp(payload.exp < Math.floor(Date.now() / 1000));
      }
      catch(error){console.log(error)}
    }
  },[]);

  useEffect(()=>{
    if(!isExp){
    setId(localStorage.getItem('id'));
    }
    else{
      localStorage.clear()
    }
  },[isExp])

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
    isExp?{ name: 'login', path: `/login` }:{name:'Dashboard',path:`/dashboard/${id}`},
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
