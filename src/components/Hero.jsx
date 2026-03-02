import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroWrapperRef = useRef(null);
  const videoContainerRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    // Extended scroll distance so the user can enjoy more of the 16-second video while scrolling
    const scrollDistance = window.innerHeight * 6;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroWrapperRef.current,
        // Pin exactly below the header (90px tall) to avoid expensive layout recalculations
        start: 'top top+=90',
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Phase 1: Zoom container backwards, add border radius, and darken overlay shadow 
    // Mapped to the entire duration of this timeline (1 unit)
    tl.fromTo(videoContainerRef.current,
      { scale: 1, borderRadius: '0px' },
      {
        scale: 0.92,
        borderRadius: '35px',
        ease: 'none', // Use linear ease so it maps perfectly 1:1 with scrub scrolling
        duration: 1
      }, 0);

    tl.fromTo(overlayRef.current,
      { backgroundColor: 'rgba(0, 0, 0, 0)' },
      {
        backgroundColor: 'rgba(0, 40, 94, 0.5)', // Using City Blue tint for the dark overlay
        ease: 'none',
        duration: 1
      }, 0);

  }, { scope: heroWrapperRef });

  return (
    <section className="hero-wrapper" ref={heroWrapperRef}>
      <div className="hero-video-container" ref={videoContainerRef}>
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" ref={overlayRef}></div>
      </div>
    </section>
  );
};

export default Hero;
