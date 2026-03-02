import React, { useState, useEffect } from 'react';
import './FloatingCTA.css';
import AdmissionModal from './AdmissionModal';

const FloatingCTA = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Calculate if we're past the hero section explicitly using window height 
        // to bypass any GSAP pin-spacer IntersectionObserver issues
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 6.5) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        // Auto-expand after 3 seconds, then collapse after 8 seconds
        const expandTimer = setTimeout(() => setIsExpanded(true), 3000);
        const collapseTimer = setTimeout(() => setIsExpanded(false), 8000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(expandTimer);
            clearTimeout(collapseTimer);
        };
    }, []);

    return (
        <>
            <div
                className={`floating-cta ${isExpanded ? 'expanded' : ''} ${isVisible ? 'visible' : ''}`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
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
