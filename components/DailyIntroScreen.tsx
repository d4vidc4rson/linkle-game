// @ts-nocheck
import React, { useState, useEffect } from 'react';
import type { Theme } from '../types';
import { AnimatedLogomark } from './AnimatedLogomark';

interface DailyIntroScreenProps {
    date: Date;
    theme: Theme;
    onContinue: () => void;
    allSolved?: boolean;
}

export const DailyIntroScreen: React.FC<DailyIntroScreenProps> = ({ date, theme, onContinue, allSolved = false }) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate one tile every 400ms (9 tiles * 400ms = 3600ms)
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 9) {
                    clearInterval(interval);
                    // Wait a moment after completion before continuing
                    setTimeout(onContinue, 400);
                    return 9;
                }
                return prev + 1;
            });
        }, 400);

        return () => clearInterval(interval);
    }, [onContinue]);

    return (
        <div className={`daily-intro-screen theme-${theme}`}>
            <div className="daily-intro-content">
                <div className="daily-intro-stack">
                    <div className="daily-intro-date">
                        {dayName}, {dateStr}
                    </div>
                    <div className="daily-intro-message-container">
                        <AnimatedLogomark 
                            progress={progress}
                            className="daily-intro-logomark"
                        />
                        <div className="daily-intro-copy">
                            {allSolved ? (
                                <>
                                    Looks like you've already<br />
                                    solved today's daily<br />
                                    Linkle. Kudos.
                                </>
                            ) : (
                                <>
                                    Brace yourself — today's<br />
                                    Easy, Hard and Impossible<br />
                                    puzzles are ready.
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

