import React, { useState, useEffect } from 'react';
import './FloatingCTA.css';
import AdmissionModal from './AdmissionModal';

const FloatingCTA = ({ isFaqPage = false }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (isFaqPage) {
                // On FAQ page, show after a small scroll (past the header)
                setIsVisible(window.scrollY > 200);
            } else {
                // On homepage, show after scrolling past the hero
                setIsVisible(window.scrollY > window.innerHeight * 0.8);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        // Enlarge every 15 seconds, and stay expanded for 2 seconds before retracting
        const expandInterval = setInterval(() => {
            setIsExpanded(true);
            setTimeout(() => {
                setIsExpanded(false); // Retract after 3 seconds
            }, 2000);
        }, 15000); // Trigger every 15 seconds

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(expandInterval);
        };
    }, [isFaqPage]);

    return (
        <>
            <div
                className={`floating-cta ${isExpanded || isHovered ? 'expanded' : ''} ${isVisible ? 'visible' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="cta-icon">
                    ⚽
                </div>

                <div className="cta-text">
                    <span>Enquire now</span>
                </div>
            </div>

            <AdmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default FloatingCTA;

