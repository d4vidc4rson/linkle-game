import React, { useState } from 'react';
import { TitleGraphic } from './Icons';
import { MiniGrid } from './GameUI';
import type { AuthMode } from '../types';

interface DailyStartScreenProps {
    onPlay: () => void;
    user: any; // Using any to avoid importing User type for now, or import it if preferred
    onShowAuth: (mode?: AuthMode) => void;
}

export const DailyStartScreen: React.FC<DailyStartScreenProps> = ({ onPlay, user, onShowAuth }) => {
    const [isExiting, setIsExiting] = useState(false);

    const handlePlay = () => {
        setIsExiting(true);
        setTimeout(onPlay, 300);
    };

    return (
        <div className={`start-screen-container ${isExiting ? 'fade-out' : ''}`}>
            <div className="start-screen-content">
                <div className="header">
                    <MiniGrid />
                    <TitleGraphic />
                    <p className="tagline">One dumb thing<br />leads to another.</p>
                </div>
                <div className="start-screen-interaction">
                    <div className="start-screen-buttons">
                        <button className="button" onClick={handlePlay}><span>Play</span></button>
                        {!user && (
                            <>
                                <button className="button button-outline" onClick={() => onShowAuth('login')}><span>Login</span></button>
                                <button className="button button-signup" onClick={() => onShowAuth('signup')}><span>Sign-Up</span></button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};