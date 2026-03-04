import React, { useEffect, useState, useRef } from 'react';
import './TorchlightCursor.css';

const TorchlightCursor = () => {
    const [innerPosition, setInnerPosition] = useState({ x: 0, y: 0 });
    const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
    const [isHover, setIsHover] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const outerRef = useRef({ x: 0, y: 0 });
    const isMoving = useRef(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Inner dot follows immediately
            setInnerPosition({ x: e.clientX, y: e.clientY });
            
            // Set moving state
            isMoving.current = true;
            
            // Outer circle follows with delay when moving
            const lerp = (start, end, factor) => start + (end - start) * factor;
            
            const updateOuter = () => {
                if (isMoving.current) {
                    outerRef.current.x = lerp(outerRef.current.x, e.clientX, 0.1);
                    outerRef.current.y = lerp(outerRef.current.y, e.clientY, 0.1);
                } else {
                    // When not moving, center outer circle on inner dot
                    outerRef.current.x = e.clientX;
                    outerRef.current.y = e.clientY;
                }
                setOuterPosition({ x: outerRef.current.x, y: outerRef.current.y });
            };
            
            requestAnimationFrame(updateOuter);
            
            // Reset moving state after a delay
            setTimeout(() => {
                isMoving.current = false;
                outerRef.current.x = e.clientX;
                outerRef.current.y = e.clientY;
                setOuterPosition({ x: e.clientX, y: e.clientY });
            }, 150);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive = target.matches(
                'button, a, [role="button"], .team-card, .program-card, .testimonial-card, .gallery-cf-card, .gallery-arrow, .gallery-dot, .program-book-btn, .gallery-see-more-btn, .carousel-arrow'
            );
            setIsHover(isInteractive);
        };

        const handleMouseDown = () => setIsClick(true);
        const handleMouseUp = () => setIsClick(false);

        const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (isDesktop) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseover', handleMouseOver);
            document.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            {/* Inner dot - precise tracking */}
            <div
                className={`cursor-inner ${isHover ? 'hover' : ''} ${isClick ? 'click' : ''}`}
                style={{
                    left: innerPosition.x,
                    top: innerPosition.y
                }}
            />
            
            {/* Outer circle - trailing effect */}
            <div
                className={`cursor-outer ${isHover ? 'hover' : ''} ${isClick ? 'click' : ''}`}
                style={{
                    left: outerPosition.x,
                    top: outerPosition.y
                }}
            />
        </>
    );
};

export default TorchlightCursor;