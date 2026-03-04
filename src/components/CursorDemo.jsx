import React, { useState } from 'react';
import FootballCursor from './FootballCursor';
import PlayfulCursor from './PlayfulCursor';

const CursorDemo = () => {
    const [cursorType, setCursorType] = useState('football'); // 'football' or 'playful'

    return (
        <div style={{ padding: '2rem', minHeight: '100vh', background: '#f4f7fb' }}>
            {cursorType === 'football' && <FootballCursor />}
            {cursorType === 'playful' && <PlayfulCursor />}
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: 'rgb(0, 40, 94)', marginBottom: '1rem' }}>
                    Custom Cursor Demo
                </h2>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setCursorType('football')}
                        style={{
                            padding: '10px 20px',
                            background: cursorType === 'football' ? 'rgb(0, 40, 94)' : 'white',
                            color: cursorType === 'football' ? 'white' : 'rgb(0, 40, 94)',
                            border: '2px solid rgb(0, 40, 94)',
                            borderRadius: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Football Theme
                    </button>
                    
                    <button
                        onClick={() => setCursorType('playful')}
                        style={{
                            padding: '10px 20px',
                            background: cursorType === 'playful' ? 'rgb(0, 40, 94)' : 'white',
                            color: cursorType === 'playful' ? 'white' : 'rgb(0, 40, 94)',
                            border: '2px solid rgb(0, 40, 94)',
                            borderRadius: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Playful Theme
                    </button>
                </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
                <div className="team-card" style={{ 
                    background: 'white', 
                    padding: '1.5rem', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: 'rgb(0, 40, 94)', marginBottom: '0.5rem' }}>Hover over me!</h3>
                    <p>This card has hover effects</p>
                </div>
                
                <div className="program-card" style={{ 
                    background: 'white', 
                    padding: '1.5rem', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: 'rgb(0, 40, 94)', marginBottom: '0.5rem' }}>Click me!</h3>
                    <p>Try clicking for kick effect</p>
                </div>
                
                <button style={{
                    background: 'rgb(152, 197, 233)',
                    color: 'rgb(0, 40, 94)',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                }}>
                    Interactive Button
                </button>
                
                <a href="#" style={{
                    background: 'rgb(0, 40, 94)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    Link Element
                </a>
            </div>
            
            <div style={{ marginTop: '2rem', textAlign: 'center', color: '#666' }}>
                <p>Move your cursor around, hover over elements, and click to see the effects!</p>
                <p><strong>Football Theme:</strong> Spinning ball with trails</p>
                <p><strong>Playful Theme:</strong> Bouncing ball with kick effects</p>
            </div>
        </div>
    );
};

export default CursorDemo;