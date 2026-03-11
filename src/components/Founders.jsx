import React from 'react';
import './Founders.css';

const Founders = () => {
    return (
        <section className="founders-section">
            <div className="founders-card">
                <div className="founders-content">
                    <h1>OUR FOUNDERS</h1>
                    <p>
                        The founders played a crucial role in bringing the <strong>Manchester City Football School</strong> to Kolkata. Their vision and dedication have made it possible for young talents to receive world-class training in India.
                    </p>
                    <a href="/about" className="find-out-more"><span>FIND OUT MORE</span></a>
                </div>
                <div className="founders-image">
                    <img src="/founders.jpg" alt="Our Founders" loading="lazy" />
                </div>
            </div>
        </section>
    );
};

export default Founders;
