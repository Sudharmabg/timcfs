import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { supabase } from '../lib/supabase';
import './Header.css';

const Header = () => {

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLatestUpdates, setShowLatestUpdates] = useState(false);

  // Fetch visibility toggle from Supabase
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('config_value')
          .eq('config_key', 'latest_updates_visible')
          .single();

        if (data && !error) {
          setShowLatestUpdates(data.config_value === 'true');
        }
      } catch (err) {
        console.error('Error fetching site config:', err);
      }
    };
    fetchConfig();
  }, []);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

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
      <div className="header-container">
        <div className="logo-container" ref={logoRef}>
          <Link to="/" aria-label="Home">
            <img src="/navlogo.webp" alt="Football School Logo" className="logo" />
          </Link>
        </div>
        <div
          className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`} ref={navRef}>
          <Link to="/#about" onClick={handleLinkClick}>About Us</Link>
          <Link to="/#player-development-section" onClick={handleLinkClick}>Pathways</Link>
          <Link to="/#programs" onClick={handleLinkClick}>Programs</Link>
          <Link to="/#team" onClick={handleLinkClick}>Our Team</Link>
          <Link to="/#testimonials" onClick={handleLinkClick}>Testimonials</Link>
          <Link to="/#gallery" onClick={handleLinkClick}>Gallery</Link>
          {showLatestUpdates && (
            <Link to="/latest-updates" onClick={handleLinkClick}>Latest Updates</Link>
          )}
          <Link to="/faq" onClick={handleLinkClick}>FAQ</Link>
          <Link to="/contact" onClick={handleLinkClick}>Contact Us</Link>
          <Link to="/contact" className="register-btn" onClick={handleLinkClick}>Book Tryouts</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
