import React, { useState, useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const galleryImages = Array.from({ length: 7 }, (_, i) => `/gallery-${i + 1}.jpeg`);

    const [startIndex, setStartIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const sectionRef = useRef(null);

    const handleFlipSwap = useCallback((newIndexFunc) => {
        if (isFlipping) return;
        setIsFlipping(true);

        // Halfway through the 600ms flip, swap the image src data
        setTimeout(() => {
            setStartIndex(newIndexFunc);
        }, 300);

        // Reset the animation class
        setTimeout(() => {
            setIsFlipping(false);
        }, 600);
    }, [isFlipping]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleFlipSwap(prev => (prev + 3) % galleryImages.length);
        }, 5000); // 5 seconds
        return () => clearInterval(interval);
    }, [galleryImages.length, handleFlipSwap]);

    const slideNext = () => {
        handleFlipSwap(prev => (prev + 3) % galleryImages.length);
    };

    const slidePrev = () => {
        handleFlipSwap(prev => {
            const nextVal = prev - 3;
            if (nextVal < 0) {
                return galleryImages.length - (Math.abs(nextVal) % galleryImages.length);
            }
            return nextVal;
        });
    };

    const visibleImages = [];
    for (let i = 0; i < 3; i++) {
        visibleImages.push(galleryImages[(startIndex + i) % galleryImages.length]);
    }

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentIndex(index % galleryImages.length);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const showNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, [galleryImages.length]);

    const showPrev = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
        );
    }, [galleryImages.length]);

    useEffect(() => {
        if (!lightboxOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") showNext();
            else if (e.key === "ArrowLeft") showPrev();
            else if (e.key === "Escape") closeLightbox();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxOpen, showNext, showPrev]);

    return (
        <section id="gallery" className="gallery-section py-5 mb-5" ref={sectionRef}>
            <div className="container gallery-container">
                <div className="gallery-card-container">
                    <div className="gallery-header">
                        <h2 className="gallery-title">GALLERY</h2>
                        <h3 className="gallery-subtitle">Moments from the pitch</h3>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <button className="gallery-track-nav gallery-track-prev" onClick={slidePrev}>‹</button>

                        <div className="gallery-track-wrapper">
                            <div className="gallery-track">
                                {visibleImages.map((src, idx) => {
                                    const actualIndex = (startIndex + idx) % galleryImages.length;
                                    return (
                                        <div className="gallery-item-wrapper" key={idx}> {/* key idx prevents remounts during actual flip swap */}
                                            <div
                                                className={`gallery-item ${isFlipping ? 'flipping' : ''}`}
                                                onClick={() => openLightbox(actualIndex)}
                                            >
                                                <img src={src} alt={`Football School Gallery ${actualIndex + 1}`} loading="lazy" />
                                                <div className="gallery-overlay"></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button className="gallery-track-nav gallery-track-next" onClick={slideNext}>›</button>
                    </div>
                </div>
            </div>

            {lightboxOpen && (
                <div className="gallery-lightbox" onClick={closeLightbox}>
                    <span className="gallery-close-btn" onClick={closeLightbox}>
                        &times;
                    </span>

                    <button
                        className="gallery-nav-btn gallery-prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            showPrev();
                        }}
                    >
                        ‹
                    </button>

                    <img
                        src={galleryImages[currentIndex]}
                        alt={`preview-${currentIndex}`}
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="gallery-nav-btn gallery-next"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext();
                        }}
                    >
                        ›
                    </button>
                </div>
            )}
        </section>
    );
};

export default Gallery;
