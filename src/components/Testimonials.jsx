import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    id: 1,
    image: '/testimonials-1.jpg',
    text: "The MCFS coaches are brilliant and give personal attention to every child. Seeing my son's fitness, discipline, and focus improve so much in just a few months is a big relief.",
    highlight: "Best decision for his overall growth and football development!",
    author: "MR. SANDEEP KUMAR",
    role: "PARENT"
  },
  {
    id: 2,
    image: '/testimonials-1.jpg',
    text: "Such a safe and encouraging environment for girls! The structured City coaching method is amazing, and I love how much confidence my daughter has gained on and off the field.",
    highlight: "She looks forward to practice every single week with so much excitement!",
    author: "MRS. PRIYA SHARMA",
    role: "PARENT"
  },
  {
    id: 3,
    image: '/testimonials-1.jpg',
    text: "Getting international level coaching right here in Kolkata is a dream come true. The emphasis on balancing studies alongside sports is exactly what a parent wants.",
    highlight: "World-class facilities with a perfect focus on teamwork and values.",
    author: "MR. RAJESH PATEL",
    role: "PARENT"
  }
];

function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop Carousel Interval
  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile]);

  // Mobile Native Scroll Interval
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      if (gridRef.current) {
        const el = gridRef.current;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 50) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: window.innerWidth - 20, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isMobile]);

  const handlePrev = () => {
    if (isMobile && gridRef.current) {
      gridRef.current.scrollBy({ left: -(window.innerWidth - 20), behavior: 'smooth' });
    } else {
      setStartIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    }
  };

  const handleNext = () => {
    if (isMobile && gridRef.current) {
      gridRef.current.scrollBy({ left: window.innerWidth - 20, behavior: 'smooth' });
    } else {
      setStartIndex((prev) => (prev + 1) % testimonialsData.length);
    }
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(testimonialsData[(startIndex + i) % testimonialsData.length]);
    }
    return cards;
  };

  const cardsToRender = isMobile
    ? [...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData]
    : getVisibleCards();

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    // 1. Title drops in from top
    tl.fromTo(
      titleRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    // 2. Entire carousel block fades up
    tl.fromTo(
      carouselRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
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
    <section id="testimonials" className="testimonials" ref={sectionRef}>
      <div className="testimonials-container">
        <div className="testimonials-card">
          <div className="testimonials-header">
            <h2 className="testimonials-title" ref={titleRef}>TESTIMONIALS</h2>
            <div className="mobile-nav-arrows">
              <button className="mobile-nav-arrow" onClick={handlePrev}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="mobile-nav-arrow" onClick={handleNext}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="testimonials-carousel" ref={carouselRef}>
            <button className="carousel-arrow carousel-arrow-left" onClick={handlePrev}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="testimonials-grid" ref={gridRef} style={{ scrollBehavior: 'smooth' }}>
              {cardsToRender.map((testimonial, index) => (
                <div
                  key={isMobile ? `${testimonial.id}-${index}` : `${testimonial.id}-${startIndex}-${index}`}
                  className="testimonial-card"
                  style={{ animationDelay: `${(index % 3) * 0.1}s` }}
                >
                  <div className="testimonial-image">
                    <img src={testimonial.image} alt={testimonial.author} />
                  </div>
                  <div className="testimonial-content">
                    <div className="quote-icon">"</div>
                    <p className="testimonial-text">{testimonial.text}</p>
                    <p className="testimonial-highlight">{testimonial.highlight}</p>
                    <div className="testimonial-author">
                      <h4>{testimonial.author}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-arrow carousel-arrow-right" onClick={handleNext}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
