import React from 'react';

interface BonusTimerProps {
    timeRemaining: number;
}

export const BonusTimer: React.FC<BonusTimerProps> = ({ timeRemaining }) => {
    return (
        <div className="bonus-timer">
            <span className="bonus-timer-text">{timeRemaining}</span>
        </div>
    );
};

