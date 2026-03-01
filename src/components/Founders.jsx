import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Founders.css';

gsap.registerPlugin(ScrollTrigger);

const Founders = () => {
    const cardRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        gsap.from(cardRef.current, {
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        });

        gsap.from(contentRef.current, {
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            x: -50,
            opacity: 0,
            duration: 1,
            delay: 0.4,
            ease: "power3.out"
        });

        gsap.from(imageRef.current, {
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            x: 50,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        });
    }, []);

    return (
        <section className="founders-section">
            <div className="founders-card" ref={cardRef}>
                <div className="founders-content" ref={contentRef}>
                    <h1>OUR FOUNDERS</h1>
                    <p>
                        The founders played a crucial role in bringing the <strong>Manchester City Football School</strong> to Kolkata. Their vision and dedication have made it possible for young talents to receive world-class training in India.
                    </p>
                    <a href="#" className="find-out-more"><span>FIND OUT MORE</span></a>
                </div>
                <div className="founders-image" ref={imageRef}>
                    <img src="/founders.jpg" alt="Our Founders" />
                </div>
            </div>
        </section>
    );
};

export default Founders;
