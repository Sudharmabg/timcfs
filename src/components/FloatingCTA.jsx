import React, { useState, useEffect } from 'react';
import './FloatingCTA.css';
import AdmissionModal from './AdmissionModal';

const FloatingCTA = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Check if the Hero section is in view to hide the CTA
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.target.classList.contains('hero-wrapper')) {
                        setIsVisible(!entry.isIntersecting);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const hero = document.querySelector('.hero-wrapper');
        if (hero) observer.observe(hero);

        // Auto-expand after 3 seconds, then collapse after 8 seconds
        const expandTimer = setTimeout(() => setIsExpanded(true), 3000);
        const collapseTimer = setTimeout(() => setIsExpanded(false), 8000);

        return () => {
            if (hero) observer.unobserve(hero);
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
