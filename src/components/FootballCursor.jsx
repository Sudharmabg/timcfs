import React, { useEffect, useState } from 'react';
import './Cursor.css';

const FootballCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHover, setIsHover] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        let trailId = 0;

        const updateCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            
            // Add trail effect
            const newTrail = {
                id: trailId++,
                x: e.clientX,
                y: e.clientY,
            };
            
            setTrails(prev => [...prev.slice(-8), newTrail]);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive = target.matches('button, a, [role="button"], .team-card, .program-card, .testimonial-card, .gallery-cf-card');
            setIsHover(isInteractive);
        };

        const handleMouseDown = () => setIsClick(true);
        const handleMouseUp = () => setIsClick(false);

        document.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Clean up trails
        const trailCleanup = setInterval(() => {
            setTrails(prev => prev.slice(-5));
        }, 100);

        return () => {
            document.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            clearInterval(trailCleanup);
        };
    }, []);

    return (
        <>
            <div
                className={`custom-cursor ${isHover ? 'hover' : ''} ${isClick ? 'click' : ''}`}
                style={{
                    transform: `translate(${position.x - 10}px, ${position.y - 10}px)`
                }}
            >
                <div className="cursor-ball"></div>
            </div>
            
            {trails.map((trail, index) => (
                <div
                    key={trail.id}
                    className="cursor-trail"
                    style={{
                        left: trail.x - 2,
                        top: trail.y - 2,
                        animationDelay: `${index * 0.05}s`
                    }}
                />
            ))}
        </>
    );
};

export default FootballCursor;