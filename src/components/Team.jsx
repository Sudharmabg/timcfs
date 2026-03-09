import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Team.css';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
    {
        id: 1,
        image: '/team-1.jpg',
        name: 'SCOTT DAVIES',
        jobTitle: 'LEAD COACH',
        nationality: 'England',
        countryCode: 'gb',
        certifications: ['UEFA A License', 'Man City Coaching Diploma', 'FA Youth Award'],
    },
    {
        id: 2,
        image: '/team-1.jpg',
        name: 'JASON GOODISON',
        jobTitle: 'COACH',
        nationality: 'England',
        countryCode: 'gb',
        certifications: ['UEFA B License', 'FA Level 2', 'MCFC Methodology'],
    },
    {
        id: 3,
        image: '/team-1.jpg',
        name: 'OMAR BELLANFANTE-SINCLAIR',
        jobTitle: 'COACH',
        nationality: 'England',
        countryCode: 'gb',
        certifications: ['UEFA B License', 'FA Level 2', 'Sports Science Diploma'],
    },
    {
        id: 4,
        image: '/team-1.jpg',
        name: 'LEWIS WAINRIGHT',
        jobTitle: 'COACH',
        nationality: 'England',
        countryCode: 'gb',
        certifications: ['UEFA B License', 'FA Level 2', 'Goalkeeping Badge'],
    },
];

const Team = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const gridRef = useRef(null);

    const scroll = (direction) => {
        if (gridRef.current) {
            const scrollAmount = window.innerWidth * 0.8;
            gridRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    useGSAP(() => {
        const cards = gridRef.current.querySelectorAll('.team-card');

        const tl = gsap.timeline({ paused: true });

        // 1. Title slides down from top
        tl.fromTo(
            titleRef.current,
            { y: -40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );

        // 2. Cards rise up from bottom with stagger
        tl.fromTo(
            cards,
            { y: 80, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12 },
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
        <section id="team" className="team-section" ref={sectionRef}>
            <div className="team-container">
                <div className="team-header">
                    <h2 className="team-title" ref={titleRef}>Our Team</h2>
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

                <div className="team-grid" ref={gridRef}>
                    {TEAM.map((member, index) => (
                        <div
                            key={member.id}
                            className="team-card"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            {/* Photo */}
                            <div className="team-card-photo">
                                <img src={member.image} alt={member.name} />
                                <div className="team-card-bg-pattern" />
                            </div>

                            {/* Info overlay */}
                            <div className="team-card-info">
                                <div className="team-card-row">
                                    <div className="team-info-block">
                                        <span className="team-info-label">NAME</span>
                                        <span className="team-info-value team-info-name">{member.name}</span>
                                    </div>
                                </div>

                                <div className="team-card-row team-card-row--split">
                                    <div className="team-info-block">
                                        <span className="team-info-label">JOB TITLE</span>
                                        <span className="team-info-value">{member.jobTitle}</span>
                                    </div>
                                    <div className="team-info-block team-info-block--right">
                                        <span className="team-info-label">NATIONALITY</span>
                                        <span className="team-info-nat">
                                            <img
                                                src={`https://flagcdn.com/w20/${member.countryCode}.png`}
                                                alt={member.nationality}
                                                className="team-info-flag-img"
                                            />
                                            <span className="team-info-value">{member.nationality}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Certifications */}
                                <div className="team-info-certs">
                                    {member.certifications.map((cert, i) => (
                                        <span key={i} className="team-cert-badge">[{cert}]</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
