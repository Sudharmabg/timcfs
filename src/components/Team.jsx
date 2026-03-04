import React, { useState } from 'react';
import './Team.css';

const TEAM = [
    {
        id: 1,
        image: '/team-1.jpg',
        name: 'SCOTT DAVIES',
        jobTitle: 'LEAD COACH',
        nationality: 'England',
        countryCode: 'gb',
        certifications: ['UEFA A License', 'Man City Coaching Diploma', 'FA Youth Award'],
    },
    {
        id: 2,
        image: '/team-1.jpg',
        name: 'JASON GOODISON',
        jobTitle: 'COACH',
        nationality: 'England',
        countryCode: 'gb',
        certifications: ['UEFA B License', 'FA Level 2', 'MCFC Methodology'],
    },
    {
        id: 3,
        image: '/team-1.jpg',
        name: 'OMAR BELLANFANTE-SINCLAIR',
        jobTitle: 'COACH',
        nationality: 'England',
        countryCode: 'gb',
        certifications: ['UEFA B License', 'FA Level 2', 'Sports Science Diploma'],
    },
    {
        id: 4,
        image: '/team-1.jpg',
        name: 'LEWIS WAINRIGHT',
        jobTitle: 'COACH',
        nationality: 'England',
        countryCode: 'gb',
        certifications: ['UEFA B License', 'FA Level 2', 'Goalkeeping Badge'],
    },
];

const Team = () => {
    const [expandedCard] = useState(null);

    return (
        <section id="team" className="team-section">
            <div className="team-container">
                <h2 className="team-title">Our Team</h2>

                <div className="team-grid">
                    {TEAM.map((member, index) => (
                        <div
                            key={member.id}
                            className={`team-card ${expandedCard === member.id ? 'expanded' : ''}`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            {/* Photo */}
                            <div className="team-card-photo">
                                <img src={member.image} alt={member.name} />
                                <div className="team-card-bg-pattern" />
                            </div>

                            {/* Info overlay */}
                            <div className="team-card-info">
                                <div className="team-card-row">
                                    <div className="team-info-block">
                                        <span className="team-info-label">NAME</span>
                                        <span className="team-info-value team-info-name">{member.name}</span>
                                    </div>
                                </div>

                                <div className="team-card-row team-card-row--split">
                                    <div className="team-info-block">
                                        <span className="team-info-label">JOB TITLE</span>
                                        <span className="team-info-value">{member.jobTitle}</span>
                                    </div>
                                    <div className="team-info-block team-info-block--right">
                                        <span className="team-info-label">NATIONALITY</span>
                                        <span className="team-info-nat">
                                            <img
                                                src={`https://flagcdn.com/w20/${member.countryCode}.png`}
                                                alt={member.nationality}
                                                className="team-info-flag-img"
                                            />
                                            <span className="team-info-value">{member.nationality}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Certifications */}
                                <div className="team-info-certs">
                                    {member.certifications.map((cert, i) => (
                                        <span key={i} className="team-cert-badge">[{cert}]</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
