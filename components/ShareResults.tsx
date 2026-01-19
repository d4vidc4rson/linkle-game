// @ts-nocheck
import React, { useState } from 'react';
import type { DailyResults, DailyResult, DailySchedule } from '../types';
import { generateShareText, copyToClipboard } from '../utils/shareResults';
import { formatDateKey, getScheduleStartDate } from '../dailySchedule';
import { PREGENERATED_PUZZLES } from '../puzzles';
import { CloseIcon } from './Icons';

interface ShareResultsProps {
    date: Date;
    dailyResults: DailyResults | undefined;
    puzzleIndices: { easy: number; hard: number; impossible: number } | null;
    schedule: DailySchedule | null;
    onClose: () => void;
    onCopy?: () => void;
}

// Sub-component for rendering a 3x3 grid
const PuzzleGrid: React.FC<{
    result: DailyResult | undefined;
    solution: string[] | null;
}> = ({ result, solution }) => {
    // Generate cell states (correct/incorrect)
    const getCellStates = (): boolean[] => {
        if (!result) {
            return Array(9).fill(false); // All incorrect (unplayed)
        }
        if (result.solved) {
            return Array(9).fill(true); // All correct
        }
        // For lost puzzles, check each position
        if (result.boardState && solution) {
            return result.boardState.map((word, index) => word === solution[index]);
        }
        // Fallback
        return Array(9).fill(false);
    };

    const cellStates = getCellStates();

    return (
        <div className="share-grid">
            {cellStates.map((isCorrect, index) => (
                <div
                    key={index}
                    className={`share-grid-cell ${isCorrect ? 'correct' : 'incorrect'}`}
                />
            ))}
        </div>
    );
};

// Sub-component for a puzzle result (grid + status text)
const PuzzleResult: React.FC<{
    result: DailyResult | undefined;
    solution: string[] | null;
}> = ({ result, solution }) => {
    const getSolveText = (): string => {
        if (!result) return '';
        if (result.solved) return `Solved in ${result.triesUsed}`;
        return 'Nope.';
    };

    const solveText = getSolveText();

    return (
        <div className="share-puzzle-result">
            <PuzzleGrid result={result} solution={solution} />
            {solveText && <span className="share-solve-text">{solveText}</span>}
        </div>
    );
};

export const ShareResults: React.FC<ShareResultsProps> = ({
    date,
    dailyResults,
    puzzleIndices,
    schedule,
    onClose,
    onCopy,
}) => {
    const [copied, setCopied] = useState(false);
    
    // Calculate day number from schedule start date, or use fallback
    const scheduleStartDate = schedule ? getScheduleStartDate(schedule) : null;
    const fallbackDayNumber = Math.floor((date.getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const dayNumber = scheduleStartDate 
        ? Math.floor((date.getTime() - scheduleStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
        : fallbackDayNumber;
    
    // Get the day's results
    const dateKey = formatDateKey(date);
    const dayResults = dailyResults?.[dateKey];
    
    // Get solutions for determining correct/incorrect positions
    const easySolution = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.easy]?.solution : null;
    const hardSolution = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.hard]?.solution : null;
    const impossibleSolution = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.impossible]?.solution : null;
    
    // Format date for display
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Status indicators
    const easyStatus = dayResults?.easy?.solved ? '✅' : '❌';
    const hardStatus = dayResults?.hard?.solved ? '✅' : '❌';
    const impossibleStatus = dayResults?.impossible?.solved ? '✅' : '❌';
    
    // Generate the emoji-based text for clipboard
    const shareText = generateShareText(date, dailyResults, dayNumber, puzzleIndices, scheduleStartDate || undefined);

    // Desktop-only: copy to clipboard
    const handleCopy = async () => {
        const success = await copyToClipboard(shareText);
        if (success) {
            setCopied(true);
            onCopy?.(); // Track the copy action
            setTimeout(() => {
                setCopied(false);
                onClose();
            }, 2000);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content share-results-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
                <h2>Share Your Results</h2>
                
                <div className="share-preview-card">
                    <div className="share-header">Linkle.fun Daily #{dayNumber} — {dateStr}</div>
                    <div className="share-status-line">
                        <span className="share-status-item">EASY {easyStatus}</span>
                        <span className="share-status-item">HARD {hardStatus}</span>
                        <span className="share-status-item">IMPOSSIBLE {impossibleStatus}</span>
                    </div>
                    
                    <PuzzleResult result={dayResults?.easy} solution={easySolution} />
                    <PuzzleResult result={dayResults?.hard} solution={hardSolution} />
                    <PuzzleResult result={dayResults?.impossible} solution={impossibleSolution} />
                </div>
                
                <button className="button button-primary" onClick={handleCopy}>
                    {copied ? 'Copied!' : 'COPY TO SHARE'}
                </button>
            </div>
        </div>
    );
};

