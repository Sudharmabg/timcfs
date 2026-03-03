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
        ageRange: '6–8 years',
        description:
            'Designed for beginners, this programme focuses on fun and confidence, helping players enjoy football in a safe environment while building strong fundamentals and a lifelong love for the game.',
    },
    {
        id: 2,
        image: '/programs-2.jpg',
        title: 'PLAY TO LEARN',
        ageRange: '9–11 years',
        description:
            'Ideal for players with some football experience, this programme introduces structured learning and teamwork, helping players build a strong team mentality, play like their heroes, and deepen their understanding of the game.',
    },
    {
        id: 3,
        image: '/programs-3.jpg',
        title: 'PLAY TO PROGRESS',
        ageRange: '12–14 years',
        description:
            'Tailored for experienced players, this programme focuses on growth within the game, improving overall performance while developing key technical and tactical skills needed for the next level.',
    },
    {
        id: 4,
        image: '/programs-4.jpg',
        title: 'PLAY TO PERFORM',
        ageRange: '15–17 years',
        description:
            'Designed for experienced players, this programme prepares them to compete at higher levels while showcasing talent, sharing passion, and maturing into confident, complete footballers.',
    },
];

const Programs = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        // Title animation
        gsap.from(titleRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 85%',
            },
        });

        // Staggered card animations
        gsap.from(cardsRef.current, {
            y: 60,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
            },
        });
    }, []);

    return (
        <section id="programs" className="programs-section" ref={sectionRef}>
            <div className="programs-container">
                <div className="programs-header" ref={titleRef}>
                    <h2 className="programs-title">Our Programmes</h2>
                </div>

                <div className="programs-grid">
                    {PROGRAMS.map((prog, i) => (
                        <div
                            key={prog.id}
                            className="program-card"
                            ref={(el) => (cardsRef.current[i] = el)}
                        >
                            {/* Image */}
                            <div className="program-card-image">
                                <img src={prog.image} alt={prog.title} />
                                <div className="program-card-image-overlay" />
                            </div>

                            {/* Content */}
                            <div className="program-card-body">
                                <h3 className="program-card-title">{prog.title}</h3>
                                <p className="program-card-age">Ages {prog.ageRange}</p>
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
        </section>
    );
};

export default Programs;
