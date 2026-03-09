import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Locations.css';

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS_DATA = [
    {
        title: "Center 1",
        address: "Sportsplex - 63/1, 46, Christopher Rd, opposite Altius Project, Brindaban Garden, Seal Lane, Tangra, Kolkata, West Bengal 700046",
        mapLink: "https://maps.google.com/?q=Sportsplex+-+63/1,+46,+Christopher+Rd,+opposite+Altius+Project,+Brindaban+Garden,+Seal+Lane,+Tangra,+Kolkata,+West+Bengal+700046",
        iframeSrc: "https://maps.google.com/maps?q=Sportsplex%20-%2063/1,%2046,%20Christopher%20Rd,%20Kolkata&t=&z=13&ie=UTF8&iwloc=&output=embed"
    },
    {
        title: "Center 2",
        address: "Garia - Techno City, Ranabhutia, West Bengal 700152 (Tentative)",
        mapLink: "https://maps.google.com/?q=Techno+City,+Ranabhutia,+West+Bengal+700152",
        iframeSrc: "https://maps.google.com/maps?q=Techno%20City,%20Ranabhutia,%20West%20Bengal%20700152&t=&z=13&ie=UTF8&iwloc=&output=embed"
    }
];

const Locations = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const INFINITE_LOCATIONS = [...LOCATIONS_DATA, ...LOCATIONS_DATA, ...LOCATIONS_DATA, ...LOCATIONS_DATA];
    const displayData = isMobile ? INFINITE_LOCATIONS : LOCATIONS_DATA;

    const scroll = (direction) => {
        if (cardsRef.current) {
            const scrollAmount = window.innerWidth * 0.8;
            cardsRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    // Auto-scroll logic for mobile
    useEffect(() => {
        if (!isMobile) return;
        let interval;
        const handleAutoScroll = () => {
            if (cardsRef.current) {
                const el = cardsRef.current;
                const maxScroll = el.scrollWidth - el.clientWidth;

                if (el.scrollLeft >= maxScroll - 20) {
                    el.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    el.scrollBy({ left: window.innerWidth * 0.6, behavior: 'smooth' });
                }
            }
        };
        interval = setInterval(handleAutoScroll, 3500);
        return () => clearInterval(interval);
    }, [isMobile]);

    useGSAP(() => {
        const cards = cardsRef.current.querySelectorAll('.location-card');
        const tl = gsap.timeline({ paused: true });

        tl.fromTo(titleRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
        tl.fromTo(cards, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.2 }, '-=0.2');

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 10%',
            onEnter: () => tl.play(),
            onLeave: () => tl.reverse(),
            onEnterBack: () => tl.play(),
            onLeaveBack: () => tl.reverse(),
        });
    }, { scope: sectionRef });

    return (
        <section id="locations" className="locations-section" ref={sectionRef}>
            <div className="locations-container">
                <div className="locations-header">
                    <h2 className="locations-title" ref={titleRef}>Our Locations</h2>
                    <div className="mobile-nav-arrows">
                        <button className="mobile-nav-arrow" onClick={() => scroll('left')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button className="mobile-nav-arrow" onClick={() => scroll('right')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="locations-grid" ref={cardsRef} style={{ scrollBehavior: 'smooth' }}>
                    {displayData.map((loc, index) => (
                        <div key={`${loc.title}-${index}`} className="location-card" style={{ animationDelay: `${(index % 2) * 0.2}s` }}>
                            <div className="location-map">
                                <iframe
                                    src={loc.iframeSrc}
                                    title={`Map to ${loc.address}`}
                                    style={{ border: 0, width: '100%', height: '100%' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                            <div className="location-card-content">
                                <p>{loc.address}</p>
                                <a href={loc.mapLink} target="_blank" rel="noopener noreferrer" className="location-btn">Get Directions</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Locations;
