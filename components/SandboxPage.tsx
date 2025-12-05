import React from 'react';
import { Link } from 'react-router-dom';
import { TitleGraphic } from './Icons';
import { MiniGrid } from './GameUI';

export const SandboxPage: React.FC = () => {
    return (
        <div className="start-screen-container">
            <div className="start-screen-content">
                <div className="header">
                    <MiniGrid />
                    <TitleGraphic />
                    <p className="tagline">Sandbox</p>
                </div>
                <div className="start-screen-interaction">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
                        <h2 style={{ fontSize: '1.5em', marginBottom: '0.5em', textAlign: 'center' }}>Test Versions</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75em', width: '100%' }}>
                            <Link to="/sandbox/infinite" className="button" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                                <span>Infinite Mode</span>
                            </Link>
                            <Link to="/sandbox/bonusspeedround" className="button" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                                <span>Bonus Speed Round</span>
                            </Link>
                            <Link to="/sandbox/redesign1" className="button" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                                <span>Redesign 1</span>
                            </Link>
                            {/* Future test versions will be added here */}
                        </div>
                        <Link to="/" style={{ marginTop: '1em', color: 'var(--primary-text)', textDecoration: 'underline', fontSize: '0.9em' }}>
                            ← Back to Main Game
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

