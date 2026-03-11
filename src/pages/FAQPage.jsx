import React from 'react';
import Header from '../components/Header';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import StickyFooter from '../components/StickyFooter';
import FloatingCTA from '../components/FloatingCTA';
import './FAQPage.css';

const FAQPage = () => {
    return (
        <div className="faq-page">
            <Header />
            <div className="faq-page-hero">
                <img src="/faq-1.webp" alt="FAQ Hero" className="faq-page-hero-img" width="1920" height="600" />
                <div className="faq-page-hero-overlay"></div>
                <div className="faq-page-hero-content">
                    <h1 className="faq-page-hero-title">FAQ</h1>
                    <p className="faq-page-hero-subtitle">
                        Got questions? We've got answers. Find everything you need to know
                        about the Techno India Manchester City Football School.
                    </p>
                </div>
            </div>
            <FAQ />
            <Footer />
            <StickyFooter isFaqPage />
            <FloatingCTA isFaqPage />
        </div>
    );
};

export default FAQPage;
