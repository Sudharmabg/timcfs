import React, { useState } from 'react';
import './FAQ.css';

const faqData = [
    {
        question: "Who are the sessions aimed at?",
        answer: "Sessions are designed for boys and girls aged 6–17 years, across all skill levels."
    },
    {
        question: "How early should my child arrive before a session?",
        answer: "Players are advised to arrive 15 minutes before the session to prepare and warm up."
    },
    {
        question: "How do I get to the venue and where can I park?",
        answer: "Detailed location and parking information will be shared upon enrollment and via confirmation emails."
    },
    {
        question: "What footwear should my child wear?",
        answer: "Players should wear appropriate football boots or turf shoes depending on the surface, along with shin guards."
    },
    {
        question: "Who delivers the coaching sessions?",
        answer: "All sessions are delivered by Manchester City–certified coaches, trained in global best practices."
    },
    {
        question: "How are players grouped?",
        answer: "Players are grouped based on age and ability to ensure balanced learning and development."
    },
    {
        question: "What size groups will my child train in?",
        answer: "We maintain small coach-to-player ratios to ensure individual attention."
    },
    {
        question: "What happens if my child misses a session?",
        answer: "Missed sessions do not affect progression; our coaches ensure players reintegrate smoothly."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq-section">
            <div className="faq-container">
                <div className="faq-header">
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <p className="faq-subtitle">Everything you need to know about our football school</p>
                </div>

                <div className="faq-list">
                    {faqData.map((item, index) => (
                        <div
                            className={`faq-item ${openIndex === index ? 'faq-item--open' : ''}`}
                            key={index}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="faq-question-icon">⚽</span>
                                <span className="faq-question-text">{item.question}</span>
                                <span className="faq-chevron"></span>
                            </button>
                            <div className="faq-answer-wrapper">
                                <div className="faq-answer">
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
