import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.from(logoRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out'
    });

    gsap.from(navRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      delay: 0.7,
      ease: 'power3.out'
    });
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="logo-container" ref={logoRef}>
        <Link to="/">
          <img src="/navlogo.png" alt="Football School Logo" className="logo" />
        </Link>
      </div>
      <nav className="nav" ref={navRef}>
        <Link to="/#about">About Us</Link>
        <Link to="/#player-development-section">Pathways</Link>
        <Link to="/#programs">Programs</Link>
        <Link to="/#team">Our Team</Link>
        <Link to="/#testimonials">Testimonials</Link>
        <Link to="/#gallery">Gallery</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact Us</Link>
        <button className="register-btn">Book Tryouts</button>
      </nav>
    </header>
  );
};

export default Header;
