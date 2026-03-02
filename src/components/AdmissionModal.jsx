import React, { useEffect } from 'react';
import './AdmissionModal.css';

const AdmissionModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        // Prevent background scrolling when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2 className="modal-title">Admission Enquiry</h2>
                <p className="modal-subtitle">
                    Join the Manchester City Football School in Kolkata. Fill out the details below and we will get back to you shortly.
                </p>

                <form className="modal-form" onSubmit={(e) => {
                    e.preventDefault();
                    alert('Enquiry submitted successfully! We will contact you soon.');
                    onClose();
                }}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter full name" required />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="Enter email address" required />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" placeholder="Enter phone number" required />
                    </div>
                    <div className="form-group">
                        <label>Age of Player</label>
                        <input type="number" placeholder="Enter player's age" min="4" max="25" required />
                    </div>
                    <button type="submit" className="modal-submit-btn"><span>Submit Enquiry</span></button>
                </form>
            </div>
        </div>
    );
};

export default AdmissionModal;
