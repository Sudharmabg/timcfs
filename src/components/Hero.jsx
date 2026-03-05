import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Hero.css';

const slides = [
  { type: 'image', src: '/hero-img.jpg', duration: 5000 },
  { type: 'video', src: '/hero_video.mp4', duration: 15000 },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const videoRef = useRef(null);

  // ── Navigation ────────────────────────────────────────────────
  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setProgress(0);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
    setProgress(0);
  }, []);

  // ── Auto-advance with rAF progress ───────────────────────────
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const tick = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const currentDuration = slides[current].duration;
      const pct = Math.min((elapsed / currentDuration) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Auto-advance
        setCurrent((c) => (c + 1) % slides.length);
        setProgress(0);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current]);

  // ── Play/pause video based on active slide ────────────────────
  useEffect(() => {
    if (videoRef.current) {
      if (current === 1) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [current]);

  // ── Keyboard navigation ───────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  return (
    <section className="hero-carousel" aria-label="Hero carousel">

      {/* ── Slide 1: Image ─────────────────────────────────── */}
      <div className={`hero-slide ${current === 0 ? 'hero-slide--active' : ''}`}>
        <img
          className="hero-slide-media"
          src="/hero-img.jpg"
          alt="Train the Manchester City Way"
          loading="eager"
        />
        {/* Gradient overlay for text readability (delayed) */}
        <div className="hero-slide-overlay hero-slide-overlay--delayed" />

        {/* Text content (delayed) */}
        <div className="hero-slide-content hero-slide-content--delayed">
          <span className="hero-eyebrow">Manchester City Football School</span>
          <h1 className="hero-heading">Train the<br />Manchester City Way</h1>
          <p className="hero-subtext">
            Built on the philosophy and training methodology of the Manchester City
            Academy, Techno India Manchester City Football School offers boys and girls
            aged 6–17 the opportunity to develop their football skills, stay active,
            build friendships, and enjoy the game in a positive, supportive learning
            environment under the guidance of fully qualified Manchester City–trained coaches.
          </p>
        </div>
      </div>

      {/* ── Slide 2: Video ─────────────────────────────────── */}
      <div className={`hero-slide ${current === 1 ? 'hero-slide--active' : ''}`}>
        <video
          ref={videoRef}
          className="hero-slide-media"
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        {/* Light overlay so the video content is prominent */}
        <div className="hero-slide-overlay hero-slide-overlay--video" />
      </div>

      {/* ── Arrow Navigation ────────────────────────────────── */}
      <button
        className="hero-arrow hero-arrow--prev"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        className="hero-arrow hero-arrow--next"
        onClick={goNext}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ── Progress Bars ────────────────────────────────────── */}
      <div className="hero-progress" role="tablist" aria-label="Slide progress">
        {slides.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={idx === current}
            aria-label={`Slide ${idx + 1}`}
            className="hero-progress-track"
            onClick={() => goTo(idx)}
          >
            <span
              className="hero-progress-fill"
              style={{
                width:
                  idx < current ? '100%'
                    : idx === current ? `${progress}%`
                      : '0%',
              }}
            />
          </button>
        ))}
      </div>

    </section>
  );
};

export default Hero;
