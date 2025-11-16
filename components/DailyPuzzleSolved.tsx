// @ts-nocheck
import React from 'react';

interface DailyPuzzleSolvedProps {
    isLastPuzzle: boolean;
    onNextPuzzle: () => void;
    onShowStats: () => void;
    onShowExplanation: () => void;
}

export const DailyPuzzleSolved: React.FC<DailyPuzzleSolvedProps> = ({
    isLastPuzzle,
    onNextPuzzle,
    onShowStats,
    onShowExplanation,
}) => {
    return (
        <div className="solved-buttons daily-solved-buttons">
            <button className="button button-outline" onClick={onShowExplanation}>
                <span>Show Linkle</span>
            </button>
            {isLastPuzzle ? (
                <button className="button button-secondary" onClick={onShowStats}>
                    <span>SHOW STATS</span>
                </button>
            ) : (
                <button className="button button-secondary" onClick={onNextPuzzle}>
                    <span>NEXT PUZZLE</span>
                </button>
            )}
        </div>
    );
};

