import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    image: '/testimonials-1.jpg',
    text: "The experience at MCFS began in March 2023. I reached out to the academy to understand the development program. What became evident was the implementation, care and flexibility of the staff. Mr. Gaurav Poddar, the Program Director, and his team of coaches, were carefully selected to ensure that the program was both fun and educational. The coaches were carefully selected to ensure that the program was both fun and educational.",
    highlight: "The program has been so keen and well thought out and presented for my son's football development. As a parent, I feel this approach frees us to enjoy and not stress on the intricacies of my son's football development.",
    author: "MR. SANDEEP KUMAR",
    role: "PARENT"
  },
  {
    id: 2,
    image: '/testimonials-1.jpg',
    text: "Enrolling my daughter at Manchester City Football School has been one of the best decisions. The structured training program and professional coaching staff have helped her develop not just as a player, but as a confident individual. The emphasis on both technical skills and character building is truly commendable.",
    highlight: "The coaches understand each child's potential and work patiently to bring out their best. My daughter looks forward to every session with excitement and comes back with new learnings every time.",
    author: "MRS. PRIYA SHARMA",
    role: "PARENT"
  },
  {
    id: 3,
    image: '/testimonials-1.jpg',
    text: "As a parent, I was looking for a football academy that would provide world-class training while maintaining Indian values. MCFS exceeded all expectations. The curriculum is well-designed, the facilities are excellent, and the coaching methodology is truly international standard.",
    highlight: "What impressed me most is how the academy focuses on holistic development. My son has not only improved his football skills but has also learned valuable life lessons about teamwork, discipline, and perseverance.",
    author: "MR. RAJESH PATEL",
    role: "PARENT"
  }
];

function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(testimonialsData[(startIndex + i) % testimonialsData.length]);
    }
    return cards;
  };

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials-container">
        <h2 className="testimonials-title">PARENT'S TESTIMONIALS</h2>
        
        <div className="testimonials-carousel">
          <button className="carousel-arrow carousel-arrow-left" onClick={handlePrev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="testimonials-grid">
            {getVisibleCards().map((testimonial, index) => (
              <div key={`${testimonial.id}-${startIndex}-${index}`} className="testimonial-card">
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
    </section>
  );
}

export default Testimonials;
