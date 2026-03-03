import React, { useState, useEffect } from 'react';
import './FloatingCTA.css';
import AdmissionModal from './AdmissionModal';

const FloatingCTA = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Calculate if we're past the hero section explicitly using window height 
        // to bypass any GSAP pin-spacer IntersectionObserver issues
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 8.5) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        // Enlarge every 10 seconds, and stay expanded for 3 seconds before retracting
        const expandInterval = setInterval(() => {
            setIsExpanded(true);
            setTimeout(() => {
                setIsExpanded(false); // Retract after 3 seconds
            }, 3000);
        }, 10000); // Trigger every 10 seconds

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(expandInterval);
        };
    }, []);

    return (
        <>
            <div
                className={`floating-cta ${isExpanded || isHovered ? 'expanded' : ''} ${isVisible ? 'visible' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="cta-icon">
                    <i className="fas fa-graduation-cap" style={{ fontSize: '24px' }}></i>
                </div>

                <div className="cta-text">
                    <span>Admission Enquiry</span>
                </div>

                <div className="cta-pulse"></div>
            </div>

            <AdmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default FloatingCTA;
