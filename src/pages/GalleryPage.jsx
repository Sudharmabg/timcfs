import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyFooter from '../components/StickyFooter';
import FloatingCTA from '../components/FloatingCTA';
import './GalleryPage.css';

// ── Image catalogue ──────────────────────────────────────────────
// Each image tagged with a category and a bento span size
const GALLERY_ITEMS = [
    { id: 1, src: '/gallery-1.jpeg', category: 'training', alt: 'Training session on the pitch', span: 'large' },
    { id: 2, src: '/gallery-2.jpeg', category: 'matches', alt: 'Match day action', span: 'normal' },
    { id: 3, src: '/gallery-3.jpeg', category: 'events', alt: 'School event highlights', span: 'normal' },
    { id: 4, src: '/gallery-4.jpeg', category: 'training', alt: 'Coach working with players', span: 'wide' },
    { id: 5, src: '/gallery-5.jpeg', category: 'matches', alt: 'Goal celebration', span: 'tall' },
    { id: 6, src: '/gallery-6.jpeg', category: 'events', alt: 'Award ceremony moment', span: 'normal' },
    { id: 7, src: '/gallery-7.jpeg', category: 'training', alt: 'Skills drill session', span: 'normal' },
    { id: 8, src: '/gallery-1.jpeg', category: 'matches', alt: 'Team huddle before kick-off', span: 'normal' },
    { id: 9, src: '/gallery-2.jpeg', category: 'training', alt: 'Passing drills', span: 'large' },
    { id: 10, src: '/gallery-3.jpeg', category: 'events', alt: 'Parents and coaches day', span: 'normal' },
    { id: 11, src: '/gallery-4.jpeg', category: 'matches', alt: 'Penalty shootout', span: 'normal' },
    { id: 12, src: '/gallery-5.jpeg', category: 'training', alt: 'Goalkeeper training', span: 'wide' },
    { id: 13, src: '/gallery-6.jpeg', category: 'events', alt: 'End of season celebration', span: 'tall' },
    { id: 14, src: '/gallery-7.jpeg', category: 'matches', alt: 'Inter-squad tournament', span: 'normal' },
];

const CATEGORIES = [
    { key: 'all', label: 'All Photos', icon: 'fa-solid fa-images' },
    { key: 'training', label: 'Training', icon: 'fa-solid fa-person-running' },
    { key: 'matches', label: 'Matches', icon: 'fa-solid fa-trophy' },
    { key: 'events', label: 'Events', icon: 'fa-solid fa-star' },
];

// ── Component ────────────────────────────────────────────────────
const GalleryPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const filtered = activeCategory === 'all'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(img => img.category === activeCategory);

    // Smooth filter switch — brief fade out/in
    const handleCategoryChange = (key) => {
        if (key === activeCategory) return;
        setAnimating(true);
        setTimeout(() => {
            setActiveCategory(key);
            setAnimating(false);
        }, 220);
    };

    const openLightbox = (index) => { setLightboxIndex(index); setLightboxOpen(true); };
    const closeLightbox = () => setLightboxOpen(false);
    const lbNext = () => setLightboxIndex(p => (p + 1) % filtered.length);
    const lbPrev = () => setLightboxIndex(p => p === 0 ? filtered.length - 1 : p - 1);

    // Keyboard nav in lightbox
    useEffect(() => {
        if (!lightboxOpen) return;
        const onKey = (e) => {
            if (e.key === 'ArrowRight') lbNext();
            if (e.key === 'ArrowLeft') lbPrev();
            if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightboxOpen, filtered.length]);

    return (
        <div className="gallery-page">
            <Header />

            {/* ── Hero ── */}
            <div className="gallery-page-hero">
                <img src="/gallery-2.jpeg" alt="Gallery Hero" className="gallery-page-hero-img" />
                <div className="gallery-page-hero-overlay"></div>
                <div className="gallery-page-hero-content">
                    <h1 className="gallery-page-hero-title">Gallery</h1>
                    <p className="gallery-page-hero-subtitle">
                        Explore moments from our Manchester City Football School —
                        training sessions, match days, and special events.
                    </p>
                </div>
            </div>

            {/* ── Filter Tabs ── */}
            <div className="gallery-filter-bar">
                <div className="gallery-filter-inner">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.key}
                            className={`gallery-filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(cat.key)}
                        >
                            <i className={`${cat.icon} filter-icon`}></i>
                            <span className="filter-label">{cat.label}</span>
                            {activeCategory === cat.key && <span className="filter-active-dot" />}
                        </button>
                    ))}
                </div>
                <p className="gallery-count">{filtered.length} photos</p>
            </div>

            {/* ── Bento Grid ── */}
            <div className="gallery-page-container">
                <div className={`gallery-bento-grid ${animating ? 'grid-fade-out' : 'grid-fade-in'}`}>
                    {filtered.map((img, index) => (
                        <div
                            key={img.id}
                            className={`gallery-bento-item bento-${img.span}`}
                            onClick={() => openLightbox(index)}
                            style={{ animationDelay: `${index * 0.06}s` }}
                        >
                            <div className="gallery-bento-img-wrap">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    loading="lazy"
                                />
                            </div>
                            <div className="gallery-item-hover-overlay">
                                <div className="gallery-hover-content">
                                    <i className="fa-solid fa-magnifying-glass-plus gallery-zoom-icon"></i>
                                    <span className="gallery-hover-label">{img.alt}</span>
                                </div>
                            </div>
                            <div className="gallery-bento-badge">
                                <i className={CATEGORIES.find(c => c.key === img.category)?.icon}></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
            <StickyFooter isFaqPage />
            <FloatingCTA isFaqPage />

            {/* ── Lightbox ── */}
            {lightboxOpen && (
                <div className="gallery-lightbox" onClick={closeLightbox}>
                    <button className="gallery-close-btn" onClick={closeLightbox} aria-label="Close">
                        &times;
                    </button>
                    <button
                        className="gallery-lb-btn gallery-lb-prev"
                        onClick={(e) => { e.stopPropagation(); lbPrev(); }}
                        aria-label="Previous"
                    >‹</button>

                    <div className="gallery-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={filtered[lightboxIndex].src}
                            alt={filtered[lightboxIndex].alt}
                        />
                    </div>

                    <button
                        className="gallery-lb-btn gallery-lb-next"
                        onClick={(e) => { e.stopPropagation(); lbNext(); }}
                        aria-label="Next"
                    >›</button>

                    <div className="gallery-lb-footer" onClick={(e) => e.stopPropagation()}>
                        <span className="gallery-lb-caption">{filtered[lightboxIndex].alt}</span>
                        <span className="gallery-counter">{lightboxIndex + 1} / {filtered.length}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;