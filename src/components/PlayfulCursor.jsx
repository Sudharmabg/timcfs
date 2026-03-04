import React, { useEffect, useState, useRef } from 'react';
import './PlayfulCursor.css';

const PlayfulCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHover, setIsHover] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [trails, setTrails] = useState([]);
    const [impacts, setImpacts] = useState([]);
    
    const lastPosition = useRef({ x: 0, y: 0 });
    const moveTimeout = useRef(null);

    useEffect(() => {
        let trailId = 0;
        let impactId = 0;

        const updateCursor = (e) => {
            const newPos = { x: e.clientX, y: e.clientY };
            setPosition(newPos);
            
            // Calculate movement speed
            const speed = Math.sqrt(
                Math.pow(newPos.x - lastPosition.current.x, 2) + 
                Math.pow(newPos.y - lastPosition.current.y, 2)
            );
            
            // Add speed trails for fast movement
            if (speed > 5) {
                setIsMoving(true);
                
                const newTrail = {
                    id: trailId++,
                    x: lastPosition.current.x,
                    y: lastPosition.current.y,
                };
                
                setTrails(prev => [...prev.slice(-6), newTrail]);
                
                // Clear moving state after delay
                clearTimeout(moveTimeout.current);
                moveTimeout.current = setTimeout(() => setIsMoving(false), 150);
            }
            
            lastPosition.current = newPos;
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive = target.matches('button, a, [role="button"], .team-card, .program-card, .testimonial-card, .gallery-cf-card');
            setIsHover(isInteractive);
        };

        const handleMouseDown = () => setIsClick(true);
        
        const handleMouseUp = (e) => {
            setIsClick(false);
            
            // Add kick impact effect
            const newImpact = {
                id: impactId++,
                x: e.clientX,
                y: e.clientY,
            };
            
            setImpacts(prev => [...prev, newImpact]);
            
            // Remove impact after animation
            setTimeout(() => {
                setImpacts(prev => prev.filter(impact => impact.id !== newImpact.id));
            }, 500);
        };

        document.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Clean up trails
        const trailCleanup = setInterval(() => {
            setTrails(prev => prev.slice(-4));
        }, 100);

        return () => {
            document.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            clearInterval(trailCleanup);
            clearTimeout(moveTimeout.current);
        };
    }, []);

    return (
        <>
            <div
                className={`playful-cursor ${isHover ? 'hover' : ''} ${isClick ? 'click' : ''} ${isMoving ? 'moving' : ''}`}
                style={{
                    transform: `translate(${position.x - 12}px, ${position.y - 12}px)`
                }}
            >
                <div className="playful-ball"></div>
            </div>
            
            {trails.map((trail, index) => (
                <div
                    key={trail.id}
                    className="speed-trail"
                    style={{
                        left: trail.x - 3,
                        top: trail.y - 3,
                        animationDelay: `${index * 0.03}s`
                    }}
                />
            ))}
            
            {impacts.map((impact) => (
                <div
                    key={impact.id}
                    className="kick-impact"
                    style={{
                        left: impact.x - 20,
                        top: impact.y - 20,
                    }}
                />
            ))}
        </>
    );
};

export default PlayfulCursor;