// @ts-nocheck
import React, { useState, useEffect } from 'react';
import type { Theme } from '../types';
import type { PuzzleDifficulty } from '../puzzles';
import { LOSER_EMOJIS } from '../constants';
import { LinkleAvatarIcon } from './Icons';

export const MiniGrid = () => {
    return (
        <div className="mini-grid-wrapper">
            <div className="mini-grid">
                {Array.from({ length: 9 }).map((_, index) => (
                    <div
                        key={index}
                        className={`mini-grid-tile ${[2, 4].includes(index) ? 'highlight' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

export const Confetti = ({ theme }: { theme: Theme }) => {
    const [pieces, setPieces] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        const confettiColors = theme === 'dark'
            ? ['#eddec9', '#d4c4b4', '#f7f2ec']
            : ['#331922', '#4a2f3a', '#f7f2ec'];

        const confettiPieces = Array.from({ length: 100 }).map((_, i) => {
            const horizontalDrift = `${Math.random() * 200 - 100}px`; // -100px to 100px
            const style = {
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                '--horizontal-drift': horizontalDrift,
                transform: `rotate(${Math.random() * 360}deg)`
            };
            return <div key={i} className="confetti" style={style as React.CSSProperties} />;
        });
        setPieces(confettiPieces);
    }, [theme]);

    return <div className="confetti-container">{pieces}</div>;
};

export const LoserEmojis = () => {
    const [pieces, setPieces] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        const emojiPieces = Array.from({ length: 60 }).map((_, i) => {
            const horizontalDrift = `${Math.random() * 150 - 75}px`; // -75px to 75px
            const style = {
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 3 + 3}rem`,
                animationDuration: `${Math.random() * 2 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
                '--horizontal-drift': horizontalDrift,
            };
            const emoji = LOSER_EMOJIS[Math.floor(Math.random() * LOSER_EMOJIS.length)];
            return <div key={i} className="loser-emoji" style={style as React.CSSProperties}>{emoji}</div>;
        });
        setPieces(emojiPieces);
    }, []);

    return <div className="loser-emoji-container">{pieces}</div>;
};

export const UserAvatar = ({ displayName, theme }: { displayName: string, theme: Theme }) => {
    const lightModeColors = ['#331922', '#7d6c63', '#4a2f3a', '#d0506e', '#e57373', '#c7a992'];
    const darkModeColors = ['#eddec9', '#c7a992', '#f7f2ec', '#d4c4b4', '#ff914d'];

    const colors = theme === 'light' ? lightModeColors : darkModeColors;
    const textColor = theme === 'light' ? '#eddec9' : '#331922';

    // Simple hash to get a consistent color for a name
    const colorIndex = (displayName.charCodeAt(0) + (displayName.length || 0)) % colors.length;
    const avatarColor = colors[colorIndex];

    return (
        <div className="avatar" style={{ color: textColor }} title={displayName}>
            <LinkleAvatarIcon />
        </div>
    );
};

export const TriesDots = ({ count, totalTries }) => (
    <div className="tries-dots-visual">
        {Array.from({ length: totalTries }).map((_, i) => (
            <div key={i} className={`dot ${i < count ? 'active' : ''}`}></div>
        ))}
    </div>
);

export const DifficultyTag = ({ difficulty }: { difficulty: PuzzleDifficulty }) => {
    return (
        <div className={`difficulty-tag ${difficulty.toLowerCase()}`}>
            <div className="difficulty-indicator"></div>
            <span>{difficulty.toLowerCase()}</span>
        </div>
    );
};