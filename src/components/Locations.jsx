import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Locations.css';

gsap.registerPlugin(ScrollTrigger);

const Locations = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef(null);

    const scroll = (direction) => {
        if (cardsRef.current) {
            const scrollAmount = window.innerWidth * 0.8;
            cardsRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

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
                <div className="locations-grid" ref={cardsRef}>

                    <div className="location-card">
                        <div className="location-card-content">
                            <h3>Center 1</h3>
                            <p>Sportsplex - 63/1, 46, Christopher Rd, opposite Altius Project, Brindaban Garden, Seal Lane, Tangra, Kolkata, West Bengal 700046</p>
                            <a href="https://maps.google.com/?q=Sportsplex+-+63/1,+46,+Christopher+Rd,+opposite+Altius+Project,+Brindaban+Garden,+Seal+Lane,+Tangra,+Kolkata,+West+Bengal+700046" target="_blank" rel="noopener noreferrer" className="location-btn">Get Directions</a>
                        </div>
                    </div>

                    <div className="location-card">
                        <div className="location-card-content">
                            <h3>Center 2</h3>
                            <p>Garia - Techno City, Ranabhutia, West Bengal 700152 (Tentative)</p>
                            <a href="https://maps.google.com/?q=Techno+City,+Ranabhutia,+West+Bengal+700152" target="_blank" rel="noopener noreferrer" className="location-btn">Get Directions</a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Locations;
