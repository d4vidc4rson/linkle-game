// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import type { Theme, PlayerData } from '../types';
import { AnimatedLogomark } from './AnimatedLogomark';
import { getIntroMessage } from '../utils/introMessages';

interface DailyIntroScreenProps {
    date: Date;
    theme: Theme;
    onContinue: () => void;
    allSolved?: boolean;
    user?: any;
    playerData?: PlayerData;
    streakWasReset?: boolean;
}

export const DailyIntroScreen: React.FC<DailyIntroScreenProps> = ({ 
    date, 
    theme, 
    onContinue, 
    allSolved = false,
    user = null,
    playerData,
    streakWasReset = false
}) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const [progress, setProgress] = useState(0);

    // Get personalized intro message - memoize to prevent re-randomization on re-renders
    const introMessage = useMemo(() => {
        if (!playerData) {
            return allSolved 
                ? "Looks like you've already\nsolved today's daily\nLinkle. Kudos."
                : "Brace yourself — today's\nEasy, Hard and Impossible\npuzzles are ready.";
        }
        
        return getIntroMessage({
            playerData,
            user,
            streakWasReset,
            allSolved
        });
    }, [playerData, user, streakWasReset, allSolved]);

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

    // Convert newlines in message to <br /> tags
    const renderMessage = (message: string) => {
        return message.split('\n').map((line, index, array) => (
            <React.Fragment key={index}>
                {line}
                {index < array.length - 1 && <br />}
            </React.Fragment>
        ));
    };

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
                        <div className="daily-intro-copy fade-in">
                            {renderMessage(introMessage)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

