import React, { useState, useEffect } from 'react';
import './StickyFooter.css';

const StickyFooter = ({ isFaqPage = false }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [footerInView, setFooterInView] = useState(false);
    const [heroInView, setHeroInView] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target.classList.contains('site-footer')) {
                        setFooterInView(entry.isIntersecting);
                    }
                });
            },
            { rootMargin: '0px', threshold: 0.1 }
        );

        const siteFooter = document.querySelector('.site-footer');
        if (siteFooter) observer.observe(siteFooter);

        const handleScroll = () => {
            if (isFaqPage) {
                // On FAQ page, show after a small scroll (past the header)
                setHeroInView(window.scrollY <= 200);
            } else {
                // On homepage, hide during the very long pinned hero section
                setHeroInView(window.scrollY <= window.innerHeight * 8.5);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => {
            if (siteFooter) observer.unobserve(siteFooter);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isFaqPage]);

    if (!isVisible || footerInView || heroInView) return null;

    return (
        <div className="sticky-footer">
            <button className="sticky-close-btn" onClick={() => setIsVisible(false)}>
                &times;
            </button>
            <div className="sticky-footer-content">
                <span className="sticky-footer-text">Let's secure your child's future</span>
                <div className="arrow-animation">⚽</div>
                <div className="sticky-footer-contacts">
                    <a href="tel:+917603046111" className="sticky-footer-contact-item pulse-phone" aria-label="Call +91 76030 46111">
                        {/* Using an inline SVG for phone instead of font-awesome since FA might not be loaded */}
                        <svg className="sticky-footer-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.03 21c.75 0 .99-.65.99-1.19v-3.44c0-.54-.45-.99-.99-.99z" />
                        </svg>
                        <span className="sticky-footer-contact-text">+91 76030 46111</span>
                    </a>
                    <a href="mailto:info@tigmancity.com" className="sticky-footer-contact-item pulse-email" aria-label="Email info@tigmancity.com">
                        <svg className="sticky-footer-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        <span className="sticky-footer-contact-text">info@tigmancity.com</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StickyFooter;

