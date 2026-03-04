import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

const Gallery = () => {
    const galleryImages = Array.from({ length: 7 }, (_, i) => `/gallery-${i + 1}.jpeg`);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [viewedImages, setViewedImages] = useState(new Set([0]));

    const goTo = useCallback((newIndex) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(newIndex);
        setViewedImages(prev => new Set([...prev, newIndex]));
        setTimeout(() => setIsTransitioning(false), 700);
    }, [isTransitioning]);

    const slideNext = useCallback(() => {
        const nextIdx = (currentIndex + 1) % galleryImages.length;
        goTo(nextIdx);
    }, [currentIndex, galleryImages.length, goTo]);

    const slidePrev = useCallback(() => {
        const prevIdx = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
        goTo(prevIdx);
    }, [currentIndex, galleryImages.length, goTo]);

    useEffect(() => {
        const interval = setInterval(slideNext, 5000);
        return () => clearInterval(interval);
    }, [slideNext]);

    const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    const nextIndex = (currentIndex + 1) % galleryImages.length;

    const totalDots = 3;
    const activeDot = currentIndex % totalDots;

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (index) => { setLightboxIndex(index); setLightboxOpen(true); };
    const closeLightbox = () => setLightboxOpen(false);

    const lightboxNext = useCallback(() => {
        setLightboxIndex((p) => (p + 1) % galleryImages.length);
    }, [galleryImages.length]);

    const lightboxPrev = useCallback(() => {
        setLightboxIndex((p) => p === 0 ? galleryImages.length - 1 : p - 1);
    }, [galleryImages.length]);

    useEffect(() => {
        if (!lightboxOpen) return;
        const onKey = (e) => {
            if (e.key === 'ArrowRight') lightboxNext();
            else if (e.key === 'ArrowLeft') lightboxPrev();
            else if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightboxOpen, lightboxNext, lightboxPrev]);

    const slots = [
        { imgIndex: prevIndex, role: 'prev' },
        { imgIndex: currentIndex, role: 'active' },
        { imgIndex: nextIndex, role: 'next' },
    ];

    const showSeeMore = viewedImages.size >= 6;

    return (
        <section id="gallery" className="gallery-section">
            <div className="gallery-container">
                <div className="gallery-card">

                    <h2 className="gallery-title">GALLERY</h2>

                    <div className="gallery-coverflow-wrapper">
                        <button className="gallery-arrow gallery-arrow-prev" onClick={slidePrev} aria-label="Previous">
                            <span className="gallery-arrow-icon" />
                        </button>

                        <div className="gallery-coverflow">
                            {slots.map(({ imgIndex, role }) => (
                                <div
                                    key={role}
                                    className={`gallery-cf-card ${role}`}
                                    onClick={() => {
                                        if (role === 'active') openLightbox(imgIndex);
                                        else if (role === 'prev') slidePrev();
                                        else slideNext();
                                    }}
                                >
                                    <img
                                        src={galleryImages[imgIndex]}
                                        alt={`Gallery ${imgIndex + 1}`}
                                        draggable={false}
                                    />
                                </div>
                            ))}
                        </div>

                        <button className="gallery-arrow gallery-arrow-next" onClick={slideNext} aria-label="Next">
                            <span className="gallery-arrow-icon" />
                        </button>
                    </div>

                    <div className="gallery-dots">
                        {Array.from({ length: totalDots }, (_, i) => (
                            <button
                                key={i}
                                className={`gallery-dot ${i === activeDot ? 'active' : ''}`}
                                onClick={() => goTo(i)}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    {showSeeMore && (
                        <div className="gallery-cta-wrapper">
                            <Link to="/gallery" className="gallery-see-more-btn">
                                <span>SEE MORE</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {lightboxOpen && (
                <div className="gallery-lightbox" onClick={closeLightbox}>
                    <span className="gallery-close-btn" onClick={closeLightbox}>&times;</span>
                    <button className="gallery-lb-btn gallery-lb-prev"
                        onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}>‹</button>
                    <img src={galleryImages[lightboxIndex]} alt={`preview-${lightboxIndex}`}
                        onClick={(e) => e.stopPropagation()} />
                    <button className="gallery-lb-btn gallery-lb-next"
                        onClick={(e) => { e.stopPropagation(); lightboxNext(); }}>›</button>
                </div>
            )}
        </section>
    );
};

export default Gallery;
