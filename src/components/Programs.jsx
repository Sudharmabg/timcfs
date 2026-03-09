import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Programs.css';

gsap.registerPlugin(ScrollTrigger);

const PROGRAMS = [
    {
        id: 1,
        image: '/programs-1.jpg',
        title: 'PLAY FOR FUN',
        description:
            'Designed for beginners, this programme focuses on fun and confidence, helping players enjoy football in a safe environment while building strong fundamentals and a lifelong love for the game.',
    },
    {
        id: 2,
        image: '/programs-2.jpg',
        title: 'PLAY TO LEARN',
        description:
            'Ideal for players with some football experience, this programme introduces structured learning and teamwork, helping players build a strong team mentality, play like their heroes, and deepen their understanding of the game.',
    },
    {
        id: 3,
        image: '/programs-3.jpg',
        title: 'PLAY TO PROGRESS',
        description:
            'Tailored for experienced players, this programme focuses on growth within the game, improving overall performance while developing key technical and tactical skills needed for the next level.',
    },
    {
        id: 4,
        image: '/programs-4.jpg',
        title: 'PLAY TO PERFORM',
        description:
            'Designed for experienced players, this programme prepares them to compete at higher levels while showcasing talent, sharing passion, and maturing into confident, complete footballers.',
    },
];

const Programs = () => {
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
        const cards = cardsRef.current.querySelectorAll('.program-card');

        const tl = gsap.timeline({ paused: true });

        // 1. Title drops in from top
        tl.fromTo(
            titleRef.current,
            { y: -40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );

        // 2. Cards fan up from bottom with stagger
        tl.fromTo(
            cards,
            { y: 80, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out', stagger: 0.12 },
            '-=0.2'
        );

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
        <section id="programs" className="programs-section" ref={sectionRef}>
            <div className="programs-container">
                <div className="programs-card">
                    <div className="programs-header">
                        <h2 className="programs-title" ref={titleRef}>Our Programmes</h2>
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

                    <div className="programs-grid" ref={cardsRef}>
                        {PROGRAMS.map((prog, i) => (
                            <div
                                key={prog.id}
                                className="program-card"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="program-card-image">
                                    <img src={prog.image} alt={prog.title} />
                                    <div className="program-card-image-overlay" />
                                </div>

                                <div className="program-card-body">
                                    <h3 className="program-card-title">{prog.title}</h3>
                                    <p className="program-card-desc">{prog.description}</p>

                                    <div className="program-card-footer">
                                        <a href="#contact" className="program-book-btn">
                                            Book Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Programs;
