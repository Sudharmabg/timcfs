import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default Hero;
