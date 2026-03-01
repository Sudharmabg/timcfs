import React, { useState, useCallback, useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
    // Array of image paths
    const galleryImages = Array.from({ length: 7 }, (_, i) => `/gallery-${i + 1}.jpeg`);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Lightbox Controls
    const openLightbox = (index) => {
        setCurrentIndex(index);
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
                <h2 className="gallery-title">GALLERY</h2>
                <div className="gallery-grid">
                    {galleryImages.map((src, index) => (
                        <div className="gallery-card" key={index}>
                            <div
                                className="gallery-item"
                                onClick={() => openLightbox(index)}
                            >
                                <img src={src} alt={`Football School Gallery ${index + 1}`} loading="lazy" />
                                <div className="gallery-overlay"></div>
                                <div className="gallery-icon">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                    ))}
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
