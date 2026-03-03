import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PlayerDevelopment.css';

gsap.registerPlugin(ScrollTrigger);

const PlayerDevelopment = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const timelineRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState([]);



    const milestones = [
        {
            ageGroup: "U3-U4",
            title: "CITY MOVE TO PLAY",
            position: "bottom"
        },
        {
            ageGroup: "U5-U17",
            title: "CITY FOOTBALL SCHOOL",
            position: "top"
        },
        {
            ageGroup: "U8-U14",
            title: "CITY DEVELOPMENT SQUADS",
            position: "bottom"
        },
        {
            ageGroup: "U6-U16",
            title: "CITY SELECT SQUADS",
            position: "top"
        },
        {
            ageGroup: "U12-U14",
            title: "CITY TALENTED PLAYER PROGRAM",
            position: "bottom"
        },
        {
            title: "WHO COULD YOU BECOME?",
            isEndGoal: true,
            position: "top"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        if (entry.target === timelineRef.current) {
                            milestones.forEach((_, index) => {
                                // Maps the dot appearance exactly to the 6s line drawing progress
                                const leftPos = index === milestones.length - 1 ? 85 : 5 + index * 20;
                                const delayMs = (leftPos / 100) * 6000 + 100; // Total duration 6s
                                setTimeout(() => {
                                    setVisibleItems(prev => [...prev, index]);
                                }, delayMs);
                            });
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (titleRef.current) observer.observe(titleRef.current);
        if (timelineRef.current) observer.observe(timelineRef.current);

        return () => observer.disconnect();
    }, [milestones.length]);

    return (
        <section id="player-development-section" className="player-development-section" ref={sectionRef}>
            <div className="pd-container">
                <h2 ref={titleRef} className="pd-title">THE MANCHESTER CITY PLAYER DEVELOPMENT MODEL</h2>
                <div ref={timelineRef} className="timeline-container">
                    {/* Custom SVG Path for the stepped timeline line */}
                    <svg className="timeline-svg" preserveAspectRatio="none" viewBox="0 0 1000 200">
                        <path
                            className="timeline-path-bg"
                            d="M 50,100 L 250,50 L 450,150 L 650,50 L 850,20"
                        />
                        <path
                            className="timeline-path-progress"
                            d="M 50,100 L 250,50 L 450,150 L 650,50 L 850,20"
                            pathLength="1"
                        />
                    </svg>

                    {milestones.map((milestone, index) => {
                        const leftPosition = index === milestones.length - 1 ? 85 : 5 + index * 20;
                        // Heights roughly matching the SVG path points
                        const topPositions = [50, 25, 75, 25, 10];
                        const topPosition = index === milestones.length - 1 ? 10 : topPositions[index];

                        return (
                            <div
                                key={index}
                                className={`timeline-item ${milestone.position} ${visibleItems.includes(index) ? 'visible' : ''} ${milestone.isEndGoal ? 'end-goal' : ''}`}
                                style={{
                                    left: `${leftPosition}%`,
                                    top: `${topPosition}%`
                                }}
                            >
                                {!milestone.isEndGoal && (
                                    <div className="timeline-dot-wrapper">
                                        <div className="timeline-dot-outer">
                                            <div className="timeline-dot-inner"></div>
                                        </div>
                                    </div>
                                )}
                                <div className="timeline-content">
                                    {milestone.title && <div className="timeline-milestone-title">{milestone.title}</div>}
                                    {milestone.ageGroup && <div className="timeline-age">{milestone.ageGroup}</div>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PlayerDevelopment;
