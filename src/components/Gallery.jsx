import React, { useState, useCallback, useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
    // Array of image paths
    const galleryImages = Array.from({ length: 7 }, (_, i) => `/gallery-${i + 1}.jpeg`);
    const extendedImages = [...galleryImages, ...galleryImages];

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Lightbox Controls
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

    // Keyboard navigation
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
        <section id="gallery" className="gallery-section py-5 mb-5">
            <div className="container gallery-container">
                <div className="gallery-header">
                    <h2 className="gallery-title">GALLERY</h2>
                    <h3 className="gallery-subtitle">Moments from the pitch</h3>
                </div>
                <div className="gallery-card-container">
                    <button className="gallery-track-nav gallery-track-prev" onClick={showPrev}>‹</button>

                    <div className="gallery-track-wrapper">
                        <div className="gallery-track">
                            {extendedImages.map((src, index) => (
                                <div className="gallery-item-wrapper" key={index}>
                                    <div
                                        className="gallery-item"
                                        onClick={() => openLightbox(index)}
                                    >
                                        <img src={src} alt={`Football School Gallery ${(index % galleryImages.length) + 1}`} loading="lazy" />
                                        <div className="gallery-overlay"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="gallery-track-nav gallery-track-next" onClick={showNext}>›</button>
                </div>
            </div>

            {/* Lightbox */}
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
