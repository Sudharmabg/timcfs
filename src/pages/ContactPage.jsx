import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyFooter from '../components/StickyFooter';
import './ContactPage.css';

const ContactPage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1400);
    };

    return (
        <div className="contact-page">
            <Header />

            {/* ── Hero ── */}
            <div className="contact-page-hero">
                <img src="/faq-1.JPG" alt="Contact Hero" className="contact-page-hero-img" />
                <div className="contact-page-hero-overlay"></div>
                <div className="contact-page-hero-content">
                    <h1 className="contact-page-hero-title">Contact Us</h1>
                    <p className="contact-page-hero-subtitle">
                        Have a question or ready to join? We'd love to hear from you.
                        Reach out and our team will get back to you shortly.
                    </p>
                </div>
            </div>

            {/* ── Info Cards Row ── */}
            <div className="contact-info-strip">
                <div className="contact-info-strip-inner">
                    <div className="contact-info-card">
                        <div className="cic-icon">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="cic-text">
                            <span className="cic-label">Our Location</span>
                            <span className="cic-value">DD Block, Sector 1, Bidhannagar<br />Kolkata, West Bengal 700064</span>
                        </div>
                    </div>
                    <div className="contact-info-card">
                        <div className="cic-icon">
                            <i className="fa-solid fa-phone-volume"></i>
                        </div>
                        <div className="cic-text">
                            <span className="cic-label">Call Us</span>
                            <span className="cic-value">+91 76030 46111</span>
                        </div>
                    </div>
                    <div className="contact-info-card">
                        <div className="cic-icon">
                            <i className="fa-solid fa-envelope-open-text"></i>
                        </div>
                        <div className="cic-text">
                            <span className="cic-label">Email Us</span>
                            <span className="cic-value">info@tigmancity.com</span>
                        </div>
                    </div>
                    <div className="contact-info-card">
                        <div className="cic-icon">
                            <i className="fa-solid fa-clock"></i>
                        </div>
                        <div className="cic-text">
                            <span className="cic-label">Training Hours</span>
                            <span className="cic-value">Mon – Sat: 6 AM – 8 PM<br />Sun: 7 AM – 12 PM</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Content: Form + Map ── */}
            <div className="contact-main">

                {/* ── Contact Form ── */}
                <div className="contact-form-section">
                    <div className="contact-form-header">
                        <span className="contact-form-badge">
                            <i className="fa-solid fa-paper-plane"></i> Send a Message
                        </span>
                        <h2 className="contact-form-title">Get In Touch</h2>
                        <p className="contact-form-desc">
                            Fill out the form below and our coaching staff will respond within 24 hours.
                        </p>
                    </div>

                    {submitted ? (
                        <div className="contact-success">
                            <div className="contact-success-icon">
                                <i className="fa-solid fa-circle-check"></i>
                            </div>
                            <h3>Message Sent!</h3>
                            <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                            <button className="contact-success-reset" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit} noValidate>
                            <div className="contact-form-row">
                                <div className="contact-form-field">
                                    <label htmlFor="cf-name">
                                        <i className="fa-solid fa-user"></i> Full Name
                                    </label>
                                    <input
                                        id="cf-name"
                                        type="text"
                                        name="name"
                                        placeholder="Your full name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact-form-field">
                                    <label htmlFor="cf-email">
                                        <i className="fa-solid fa-envelope"></i> Email Address
                                    </label>
                                    <input
                                        id="cf-email"
                                        type="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="contact-form-row">
                                <div className="contact-form-field">
                                    <label htmlFor="cf-phone">
                                        <i className="fa-solid fa-phone"></i> Phone Number
                                    </label>
                                    <input
                                        id="cf-phone"
                                        type="tel"
                                        name="phone"
                                        placeholder="+91 00000 00000"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="contact-form-field">
                                    <label htmlFor="cf-subject">
                                        <i className="fa-solid fa-tag"></i> Subject
                                    </label>
                                    <select
                                        id="cf-subject"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select a topic…</option>
                                        <option value="tryouts">Book Tryouts</option>
                                        <option value="programs">Program Enquiry</option>
                                        <option value="fees">Fees & Admission</option>
                                        <option value="coaching">Coaching Staff</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="contact-form-field contact-form-field--full">
                                <label htmlFor="cf-message">
                                    <i className="fa-solid fa-message"></i> Your Message
                                </label>
                                <textarea
                                    id="cf-message"
                                    name="message"
                                    placeholder="Tell us how we can help…"
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="contact-submit-btn" disabled={loading}>
                                {loading ? (
                                    <><i className="fa-solid fa-spinner fa-spin"></i> Sending…</>
                                ) : (
                                    <><i className="fa-solid fa-paper-plane"></i> Send Message</>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* ── Map Section ── */}
                <div className="contact-map-section">
                    <div className="contact-map-header">
                        <span className="contact-form-badge">
                            <i className="fa-solid fa-map-location-dot"></i> Find Us
                        </span>
                        <h2 className="contact-form-title">Our Ground</h2>
                        <p className="contact-form-desc">
                            Located in the heart of Bidhannagar — easily accessible from all parts of Kolkata.
                        </p>
                    </div>

                    <div className="contact-map-wrap">
                        <iframe
                            title="TIMCFS Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.7955760540517!2d88.4029!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b043a47ef7%3A0x7d7c8e4c462e1fa9!2sDD%20Block%2C%20Sector%201%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    {/* address card below map */}
                    <div className="contact-map-address-card">
                        <div className="cmac-pin">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="cmac-details">
                            <strong>Techno India Manchester City Football School</strong>
                            <span>DD Block, Sector 1, Bidhannagar</span>
                            <span>Kolkata, West Bengal 700064</span>
                        </div>
                        <a
                            href="https://maps.google.com/?q=DD+Block,+Sector+1,+Bidhannagar,+Kolkata,+West+Bengal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cmac-directions-btn"
                        >
                            <i className="fa-solid fa-diamond-turn-right"></i> Directions
                        </a>
                    </div>

                    {/* Social links below map */}
                    <div className="contact-social-row">
                        <span className="contact-social-label">Follow Us</span>
                        <div className="contact-social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="contact-social-btn">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="contact-social-btn">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="contact-social-btn">
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="contact-social-btn">
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
            <StickyFooter isFaqPage />
        </div>
    );
};

export default ContactPage;
