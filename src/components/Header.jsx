import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/navlogo.png" alt="Football School Logo" className="logo" />
      </div>
      <nav className="nav">
        <a href="#about">About Us</a>
        <a href="#pathways">Pathways</a>
        <a href="#programs">Programs</a>
        <a href="#team">Our Team</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#gallery">Gallery</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact Us</a>
        <button className="register-btn">Book Tryouts</button>
      </nav>
    </header>
  );
};

export default Header;
