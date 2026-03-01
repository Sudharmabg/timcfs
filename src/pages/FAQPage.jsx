import React from 'react';
import Header from '../components/Header';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import './FAQPage.css';

const FAQPage = () => {
    return (
        <div className="faq-page">
            <Header />
            <div className="faq-page-hero">
                <div className="faq-page-hero-content">
                    <h1 className="faq-page-hero-title">FAQ</h1>
                    <p className="faq-page-hero-subtitle">
                        Got questions? We've got answers. Find everything you need to know
                        about the Techno India Manchester City Football School.
                    </p>
                </div>
                <div className="faq-page-hero-pattern"></div>
            </div>
            <FAQ />
            <Footer />
        </div>
    );
};

export default FAQPage;
