// @ts-nocheck
import React from 'react';
import type { Theme } from '../types';

interface DailyIntroScreenProps {
    date: Date;
    theme: Theme;
    onContinue: () => void;
}

export const DailyIntroScreen: React.FC<DailyIntroScreenProps> = ({ date, theme, onContinue }) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    return (
        <div className={`daily-intro-screen theme-${theme}`}>
            <div className="daily-intro-content">
                <div className="daily-intro-stack">
                    <div className="daily-intro-date">
                        {dayName}, {dateStr}
                    </div>
                    <div className="daily-intro-message-container">
                        <img
                            src="/linkle-logomark.svg"
                            alt="Linkle logomark"
                            className="daily-intro-logomark"
                        />
                        <div className="daily-intro-copy">
                            Brace yourself — today's<br />
                            Easy, Hard and Impossible<br />
                            puzzles are ready.
                        </div>
                    </div>
                    <button className="daily-intro-play-button" onClick={onContinue}>
                        PLAY
                    </button>
                </div>
            </div>
        </div>
    );
};

