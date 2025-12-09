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
    dayStreakWasReset?: boolean;
    mode?: 'play' | 'stats'; // 'play' = normal intro, 'stats' = shorter transition to stats
}

export const DailyIntroScreen: React.FC<DailyIntroScreenProps> = ({ 
    date, 
    theme, 
    onContinue, 
    allSolved = false,
    user = null,
    playerData,
    streakWasReset = false,
    dayStreakWasReset = false,
    mode = 'play'
}) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const [progress, setProgress] = useState(0);

    // Stats mode uses a fixed message, play mode uses personalized messages
    const introMessage = useMemo(() => {
        // Stats mode: short message for viewing stats
        if (mode === 'stats') {
            return "Calculating your stats...";
        }
        
        // Play mode: personalized messages
        if (!playerData) {
            return allSolved 
                ? "Looks like you've already\nsolved today's daily\nLinkle. Kudos."
                : "Brace yourself — today's\nEasy, Hard and Impossible\npuzzles are ready.";
        }
        
        return getIntroMessage({
            playerData,
            user,
            streakWasReset,
            dayStreakWasReset,
            allSolved
        });
    }, [playerData, user, streakWasReset, dayStreakWasReset, allSolved, mode]);

    useEffect(() => {
        // Stats mode: faster animation (~2 seconds total)
        // Play mode: normal animation (~3.6 seconds total)
        const intervalMs = mode === 'stats' ? 200 : 400;
        
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 9) {
                    clearInterval(interval);
                    // Wait a moment after completion before continuing
                    const delayMs = mode === 'stats' ? 200 : 400;
                    setTimeout(onContinue, delayMs);
                    return 9;
                }
                return prev + 1;
            });
        }, intervalMs);

        return () => clearInterval(interval);
    }, [onContinue, mode]);

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

