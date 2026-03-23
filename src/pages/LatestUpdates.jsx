import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './LatestUpdates.css';

const LatestUpdates = () => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollTrackRef = useRef(null);

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const { data, error } = await supabase
                    .from('latest_updates')
                    .select('*')
                    .eq('is_active', true)
                    .order('created_at', { ascending: false });

                if (data) setUpdates(data);
                if (error) throw error;
            } catch (err) {
                console.error('Error fetching updates:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUpdates();
    }, []);

    // ── Unstoppable Single-Card Auto-Advance (Every 5s) ───────────────
    useEffect(() => {
        if (loading || updates.length === 0) return;

        const timer = setInterval(() => {
            const track = scrollTrackRef.current;
            if (track) {
                const scrollAmount = track.offsetWidth;
                const loopPoint = track.scrollWidth / 2;

                // Seamless jump back to start of first set if we've reached the second set
                if (track.scrollLeft >= loopPoint - 1) {
                    track.scrollLeft = 0;
                }

                track.scrollTo({
                    left: track.scrollLeft + scrollAmount,
                    behavior: 'smooth'
                });
            }
        }, 5000); // 5-second interval as requested

        return () => clearInterval(timer);
    }, [loading, updates]); // Removed isHovered so it never stops

    const scroll = (direction) => {
        const track = scrollTrackRef.current;
        if (track) {
            const scrollAmount = track.offsetWidth; 
            track.scrollTo({
                left: track.scrollLeft + (direction === 'next' ? scrollAmount : -scrollAmount),
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="updates-page">
            <Header />
            <main className="updates-container">
                <div className="updates-main-card">
                    <div className="updates-header">
                        <span className="updates-eyebrow">Stay in the Game</span>
                        <h1 className="updates-page-title">Latest Updates</h1>
                    </div>

                    <div className="updates-carousel-wrapper">
                        {loading ? (
                            <div className="updates-loader-box">
                                <div className="spinner"></div>
                                <p>Fetching MCFS News...</p>
                            </div>
                        ) : updates.length > 0 ? (
                            <>
                                <div className="updates-scroll-track" ref={scrollTrackRef}>
                                    {[0, 1].map((setIndex) => (
                                        <React.Fragment key={setIndex}>
                                            {updates.map((item) => (
                                                <article key={`${setIndex}-${item.id}`} className="update-carousel-card">
                                                    <div className="card-inner-wrapper">
                                                        <div className="card-image-container">
                                                            <img src={item.image_url} alt={item.title} className="card-img" />
                                                            <div className="card-date-badge">
                                                                {new Date(item.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                                            </div>
                                                        </div>
                                                        <div className="card-text-content">
                                                            <h2 className="card-title">{item.title}</h2>
                                                            <p className="card-desc">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </article>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>

                                <div className="updates-nav-arrows">
                                    <button className="updates-arrow updates-arrow--prev" onClick={() => scroll('prev')}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                                    </button>
                                    <button className="updates-arrow updates-arrow--next" onClick={() => scroll('next')}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="no-updates-message">
                                <h3>No Recent Updates</h3>
                                <p>Check back later for more news from the pitch.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LatestUpdates;


