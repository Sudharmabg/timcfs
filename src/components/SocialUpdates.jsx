import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SocialUpdates.css';

gsap.registerPlugin(ScrollTrigger);

const SocialUpdates = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const socialCarouselRef = useRef(null);

    useGSAP(() => {
        const cards = socialCarouselRef.current.querySelectorAll('.social-carousel-card');
        const tl = gsap.timeline({ paused: true });

        // Title drops in
        tl.fromTo(
            titleRef.current,
            { y: -40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );

        // Cards fan up
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

    // Auto-scroll logic
    useEffect(() => {
        const track = socialCarouselRef.current;
        if (!track) return;

        let animationFrameId;
        let isHovered = false;

        const scrollStep = () => {
            if (!isHovered && track) {
                track.scrollLeft += 1;
                // Simple infinite loop behavior: if scrolled past end, jump back to start
                if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) {
                    track.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        // Start scrolling
        animationFrameId = requestAnimationFrame(scrollStep);

        // Pause on hover
        const handleMouseEnter = () => isHovered = true;
        const handleMouseLeave = () => isHovered = false;

        track.addEventListener('mouseenter', handleMouseEnter);
        track.addEventListener('mouseleave', handleMouseLeave);
        // Also pause on touch
        track.addEventListener('touchstart', handleMouseEnter);
        track.addEventListener('touchend', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            track.removeEventListener('mouseenter', handleMouseEnter);
            track.removeEventListener('mouseleave', handleMouseLeave);
            track.removeEventListener('touchstart', handleMouseEnter);
            track.removeEventListener('touchend', handleMouseLeave);
        };
    }, []);

    return (
        <div className="social-carousel-section" id="social-media" ref={sectionRef}>
            <div className="social-carousel-container">
                <div className="social-carousel-header">
                    <h2 className="social-carousel-title" ref={titleRef}>Social Media</h2>
                </div>

                <div className="social-carousel-track-wrapper">
                    <div className="social-carousel-track" ref={socialCarouselRef}>
                        {/* Card 1 */}
                        <div className="social-carousel-card">
                            <div className="social-card-img-wrapper">
                                <i className="fa-brands fa-instagram social-brand-icon"></i>
                                <img src="/gallery-1.webp" alt="Update 1" />
                                <div className="social-card-duration-overlay">
                                    <div className="social-play-btn"><i className="fa-solid fa-play"></i></div>
                                    <span className="social-duration">02:04</span>
                                </div>
                                <div className="social-progress-bar"><div className="social-progress-fill" style={{ width: '45%' }}></div></div>
                            </div>
                            <div className="social-card-content">
                                <h3>Game Recap: U-15 Team Wins Final 3-1</h3>
                                <div className="social-card-metrics">
                                    <span><i className="fa-regular fa-heart"></i> 1.2k</span>
                                    <span><i className="fa-regular fa-comment"></i> 48</span>
                                </div>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="social-carousel-card">
                            <div className="social-card-img-wrapper">
                                <i className="fa-brands fa-youtube social-brand-icon youtube"></i>
                                <img src="/gallery-2.webp" alt="Update 2" />
                                <div className="social-card-duration-overlay">
                                    <div className="social-play-btn"><i className="fa-solid fa-play"></i></div>
                                    <span className="social-duration">01:45</span>
                                </div>
                                <div className="social-progress-bar"><div className="social-progress-fill" style={{ width: '80%' }}></div></div>
                            </div>
                            <div className="social-card-content">
                                <h3>Training Highlights: precision passing drills</h3>
                                <div className="social-card-metrics">
                                    <span><i className="fa-regular fa-heart"></i> 856</span>
                                    <span><i className="fa-regular fa-comment"></i> 12</span>
                                </div>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="social-carousel-card">
                            <div className="social-card-img-wrapper">
                                <i className="fa-brands fa-tiktok social-brand-icon tiktok"></i>
                                <img src="/gallery-3.webp" alt="Update 3" />
                                <div className="social-card-duration-overlay">
                                    <div className="social-play-btn"><i className="fa-solid fa-play"></i></div>
                                    <span className="social-duration">03:12</span>
                                </div>
                                <div className="social-progress-bar"><div className="social-progress-fill" style={{ width: '20%' }}></div></div>
                            </div>
                            <div className="social-card-content">
                                <h3>Interview: Head Coach Discusses Tactics</h3>
                                <div className="social-card-metrics">
                                    <span><i className="fa-regular fa-heart"></i> 3.4k</span>
                                    <span><i className="fa-regular fa-comment"></i> 210</span>
                                </div>
                            </div>
                        </div>
                        {/* Card 4 */}
                        <div className="social-carousel-card">
                            <div className="social-card-img-wrapper">
                                <i className="fa-brands fa-instagram social-brand-icon"></i>
                                <img src="/gallery-4.webp" alt="Update 4" />
                                <div className="social-card-duration-overlay">
                                    <div className="social-play-btn"><i className="fa-solid fa-play"></i></div>
                                    <span className="social-duration">02:30</span>
                                </div>
                                <div className="social-progress-bar"><div className="social-progress-fill" style={{ width: '65%' }}></div></div>
                            </div>
                            <div className="social-card-content">
                                <h3>Behind the Scenes: Match Day Prep</h3>
                                <div className="social-card-metrics">
                                    <span><i className="fa-regular fa-heart"></i> 2.1k</span>
                                    <span><i className="fa-regular fa-comment"></i> 89</span>
                                </div>
                            </div>
                        </div>
                        {/* Card 5 */}
                        <div className="social-carousel-card">
                            <div className="social-card-img-wrapper">
                                <i className="fa-brands fa-youtube social-brand-icon youtube"></i>
                                <img src="/gallery-5.webp" alt="Update 5" />
                                <div className="social-card-duration-overlay">
                                    <div className="social-play-btn"><i className="fa-solid fa-play"></i></div>
                                    <span className="social-duration">01:15</span>
                                </div>
                                <div className="social-progress-bar"><div className="social-progress-fill" style={{ width: '90%' }}></div></div>
                            </div>
                            <div className="social-card-content">
                                <h3>Goal of the Month Contenders</h3>
                                <div className="social-card-metrics">
                                    <span><i className="fa-regular fa-heart"></i> 5.6k</span>
                                    <span><i className="fa-regular fa-comment"></i> 452</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialUpdates;
