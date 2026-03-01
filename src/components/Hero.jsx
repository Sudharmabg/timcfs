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

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useGSAP(() => {
    // 3 full screens of scrolling to experience the majestic intro
    const scrollDistance = window.innerHeight * 3;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroWrapperRef.current,
        // Pin exactly below the header automatically by measuring its height
        start: () => {
          const header = document.querySelector('.header');
          return `top top+=${header ? header.offsetHeight : 90}`;
        },
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      }
    });

    // Phase 1: Zoom container backwards, add border radius, and darken overlay shadow
    tl.to(videoContainerRef.current, {
      scale: 0.92,
      borderRadius: '35px',
      ease: 'power2.inOut',
      duration: 3
    }, 0);

    tl.to(overlayRef.current, {
      backgroundColor: 'rgba(0, 40, 94, 0.5)', // Using City Blue tint for the dark overlay
      ease: 'power2.inOut',
      duration: 3
    }, 0);

    // Phase 2: Reveal Text 1
    tl.fromTo(text1Ref.current,
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 2
    )
      .to(text1Ref.current, { opacity: 0, y: -100, scale: 1.1, duration: 2, ease: "power2.in" }, 5);

    // Phase 3: Reveal Text 2
    tl.fromTo(text2Ref.current,
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 7
    )
      .to(text2Ref.current, { opacity: 0, y: -100, scale: 1.1, duration: 2, ease: "power2.in" }, 10);

    // Phase 4: Reveal Text 3 (The Punchline)
    tl.fromTo(text3Ref.current,
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 12
    )
      // Hold the final frame briefly before unlocking the scroll to let the user process it
      .to({}, { duration: 3 });

  }, { scope: heroWrapperRef });

  return (
    <section className="hero-wrapper" ref={heroWrapperRef}>
      <div className="hero-video-container" ref={videoContainerRef}>
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" ref={overlayRef}></div>

        <div className="hero-texts">
          <h1 className="hero-text" ref={text1Ref}>WORLD-CLASS TRAINING.</h1>
          <h1 className="hero-text" ref={text2Ref}>IN KOLKATA.</h1>
          <h1 className="hero-text" ref={text3Ref}>BEGINS NOW.</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
