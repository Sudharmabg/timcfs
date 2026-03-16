import React, { useEffect, useState } from 'react';
import { submitForm } from '../utils/submitForm';
import './AdmissionModal.css';

const AdmissionModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', subject: '', message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await submitForm('modal', form);
            setSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again or email tigmcfs@gmail.com');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setSubmitted(false);
        setLoading(false);
        setError('');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const handleClose = () => {
        onClose();
        setTimeout(resetForm, 300); // reset after close animation
    };

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', onKey);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Close button */}
                <button className="modal-close" onClick={handleClose} aria-label="Close">&times;</button>

                {/* Header */}
                <div className="modal-header">
                    <span className="modal-badge">
                        <i className="fa-solid fa-paper-plane"></i> Send a Message
                    </span>
                    <h2 className="modal-title">Get In Touch</h2>
                    <p className="modal-subtitle">
                        Fill out the form below and our coaching staff will respond within 24 hours.
                    </p>
                </div>

                {/* Success state */}
                {submitted ? (
                    <div className="modal-success">
                        <div className="modal-success-icon">
                            <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <h3>Message Sent!</h3>
                        <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                        <button
                            className="modal-success-reset"
                            onClick={() => {
                                setSubmitted(false);
                                setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                            }}
                        >
                            Send Another Message
                        </button>
                    </div>
                ) : (
                    <form className="modal-form" onSubmit={handleSubmit} noValidate>

                        {/* Row 1: Name + Email */}
                        <div className="modal-form-row">
                            <div className="modal-form-field">
                                <label htmlFor="m-name">
                                    <i className="fa-solid fa-user"></i> Full Name
                                </label>
                                <input
                                    id="m-name" type="text" name="name"
                                    placeholder="Your full name"
                                    value={form.name} onChange={handleChange} required
                                />
                            </div>
                            <div className="modal-form-field">
                                <label htmlFor="m-email">
                                    <i className="fa-solid fa-envelope"></i> Email Address
                                </label>
                                <input
                                    id="m-email" type="email" name="email"
                                    placeholder="your@email.com"
                                    value={form.email} onChange={handleChange} required
                                />
                            </div>
                        </div>

                        {/* Row 2: Phone + Subject */}
                        <div className="modal-form-row">
                            <div className="modal-form-field">
                                <label htmlFor="m-phone">
                                    <i className="fa-solid fa-phone"></i> Phone Number
                                </label>
                                <input
                                    id="m-phone" type="tel" name="phone"
                                    placeholder="+91 00000 00000"
                                    value={form.phone} onChange={handleChange}
                                />
                            </div>
                            <div className="modal-form-field">
                                <label htmlFor="m-subject">
                                    <i className="fa-solid fa-tag"></i> Subject
                                </label>
                                <select
                                    id="m-subject" name="subject"
                                    value={form.subject} onChange={handleChange} required
                                >
                                    <option value="" disabled>Select a topic…</option>
                                    <option value="tryouts">Book Tryouts</option>
                                    <option value="programs">Program Enquiry</option>
                                    <option value="fees">Fees &amp; Admission</option>
                                    <option value="coaching">Coaching Staff</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="modal-form-field">
                            <label htmlFor="m-message">
                                <i className="fa-solid fa-message"></i> Your Message
                            </label>
                            <textarea
                                id="m-message" name="message"
                                placeholder="Tell us how we can help…"
                                rows={4}
                                value={form.message} onChange={handleChange} required
                            />
                        </div>

                        {error && (
                            <p className="modal-error-msg">
                                <i className="fa-solid fa-triangle-exclamation"></i> {error}
                            </p>
                        )}
                        {/* Submit */}
                        <button type="submit" className="modal-submit-btn" disabled={loading}>
                            {loading ? (
                                <><i className="fa-solid fa-spinner fa-spin"></i> Sending…</>
                            ) : (
                                <><i className="fa-solid fa-paper-plane"></i> <span>Send Message</span></>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdmissionModal;
