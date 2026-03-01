import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    gsap.from(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top 80%',
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      delay: 0.3,
      ease: 'power3.out'
    });
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default Hero;
