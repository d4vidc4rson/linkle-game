// @ts-nocheck
import React from 'react';
import type { DaySummary, Theme } from '../types';
import { PREGENERATED_PUZZLES } from '../puzzles';

interface DayCardProps {
    day: DaySummary;
    theme: Theme;
    onShare?: () => void;
    onPlay?: () => void;
}

const PuzzleGrid = ({ solved, triesUsed, maxTries, boardState, solution, isLarge = false }: { 
    solved: boolean; 
    triesUsed: number; 
    maxTries: number; 
    boardState?: string[];
    solution?: string[];
    isLarge?: boolean;
}) => {
    // Determine which squares are correct (green) vs incorrect (white)
    let squares: boolean[]; // true = correct (green), false = incorrect (white)
    
    if (boardState && boardState.length === 9 && solution && solution.length === 9) {
        // For lost puzzles, compare boardState to solution to find correct positions
        squares = boardState.map((word, index) => word === solution[index]);
    } else if (solved) {
        // All squares are correct for solved puzzles
        squares = Array(9).fill(true);
    } else {
        // Fallback: show based on tries used (old behavior)
        const solvedSquares = Math.max(0, 9 - (maxTries - triesUsed));
        squares = Array.from({ length: 9 }).map((_, i) => i < solvedSquares);
    }
    
    // Use SVG for both solved and lost puzzles (not for large grids)
    if (!isLarge) {
        // Square positions in the SVG (x, y coordinates) - matching original SVG
        const squarePositions = [
            [6, 6],   // Top-left
            [44, 6],  // Top-center
            [83, 6],  // Top-right
            [6, 44],  // Middle-left
            [44, 44], // Middle-center
            [83, 44], // Middle-right
            [6, 82],  // Bottom-left
            [44, 82], // Bottom-center
            [83, 82], // Bottom-right
        ];
        
        const squareSize = 33.5; // Approximate size of each square
        
        const greenColor = '#9eef80';
        const whiteColor = '#f6e6d9';
        const bgColor = '#3b422e';
        const bgBorderRadius = 8.18; // Rounded corners for background (matches original SVG)
        const squareBorderRadius = 2.5; // Rounded corners for squares (matches original SVG)
        
        return (
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 123 123" 
                width="164" 
                height="164"
                className="day-card-solved-grid-svg"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Dark gray background with rounded corners */}
                <rect 
                    x="0" 
                    y="0" 
                    width="123" 
                    height="123" 
                    rx={bgBorderRadius}
                    ry={bgBorderRadius}
                    fill={bgColor} 
                />
                
                {/* 9 squares in 3x3 grid with rounded corners */}
                {squares.map((isCorrect, index) => {
                    const [x, y] = squarePositions[index];
                    return (
                        <rect
                            key={index}
                            x={x}
                            y={y}
                            width={squareSize}
                            height={squareSize}
                            rx={squareBorderRadius}
                            ry={squareBorderRadius}
                            fill={isCorrect ? greenColor : whiteColor}
                        />
                    );
                })}
            </svg>
        );
    }
    
    // Fallback to div-based grid for large grids
    const gridClass = isLarge ? 'day-card-large-grid' : 'day-card-small-grid';
    const squareClass = isLarge ? 'day-card-large-square' : 'day-card-small-square';
    
    return (
        <div className={gridClass}>
            {Array.from({ length: 9 }).map((_, i) => (
                <div
                    key={i}
                    className={`${squareClass} ${squares[i] ? 'day-card-square-correct' : 'day-card-square-incorrect'}`}
                />
            ))}
        </div>
    );
};

const Section = ({ title, result, words, results, puzzleIndices, difficulty }: {
    title: string;
    result: string;
    words: string[];
    results?: { easy?: any; hard?: any; impossible?: any };
    puzzleIndices?: { easy: number; hard: number; impossible: number } | null;
    difficulty: 'easy' | 'hard' | 'impossible';
}) => {
    const resultData = results?.[difficulty];
    const maxTries = difficulty === 'easy' ? 4 : difficulty === 'hard' ? 3 : 2;
    const solved = resultData?.solved || false;
    const triesUsed = resultData?.triesUsed || 0;
    const boardState = resultData?.boardState;
    
    // Get the solution for this puzzle to compare with boardState
    const puzzleIndex = puzzleIndices?.[difficulty];
    const puzzle = puzzleIndex !== undefined ? PREGENERATED_PUZZLES[puzzleIndex] : null;
    const solution = puzzle?.solution;
    
    return (
        <div className={`day-card-section ${!solved ? 'day-card-section-failed' : ''}`}>
            <div className="day-card-section-header">
                <PuzzleGrid 
                    solved={solved}
                    triesUsed={triesUsed}
                    maxTries={maxTries}
                    boardState={boardState}
                    solution={solution}
                    isLarge={false}
                />
                <div className="day-card-section-info">
                    <div className="day-card-section-title">
                        {title}: {result}
                    </div>
                    <div className="day-card-section-words">
                        {words.reduce((acc: JSX.Element[], word, i) => {
                            // Group words into chunks of 3
                            if (i % 3 === 0) {
                                const groupWords = words.slice(i, Math.min(i + 3, words.length));
                                acc.push(
                                    <span key={`group-${i}`} className="day-card-word-group">
                                        {groupWords.join(', ')}
                                    </span>
                                );
                            }
                            return acc;
                        }, [])}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const DayCard: React.FC<DayCardProps> = ({
    day,
    theme,
    onShare,
    onPlay,
}) => {
    const { dateLabel, mode, easy, hard, impossible, results, puzzleIndices } = day;
    
    if (mode === 'playable') {
        // "old puzzle play" version (logomark + PLAY button)
        return (
            <article className="day-card day-card-playable">
                <div className="day-card-header-playable">
                    {dateLabel}
                </div>
                <div className="day-card-large-grid-container">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 123 123"
                        className="day-card-logomark-img"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <rect x="0" y="0" width="123" height="123" rx="8.18" ry="8.18" fill="#3b422e" />
                        {/* Row 1 */}
                        <rect x="6" y="6" width="33.5" height="33.5" rx="2.5" ry="2.5" fill="#9eef80" />
                        <rect x="44" y="6" width="33.5" height="33.5" rx="2.5" ry="2.5" fill="#9eef80" />
                        <rect x="83" y="6" width="33.5" height="33.5" rx="2.5" ry="2.5" fill="#f6e6d9" />
                        {/* Row 2 */}
                        <rect x="6" y="44" width="33.5" height="33.5" rx="2.5" ry="2.5" fill="#9eef80" />
                        <rect x="44" y="44" width="33.5" height="33.5" rx="2.5" ry="2.5" fill="#f6e6d9" />
                        <rect x="83" y="44" width="33.5" height="33.5" rx="2.5" ry="2.5" fill="#9eef80" />
                        {/* Row 3 */}
                        <rect x="6" y="82" width="33.5" height="33.5" rx="2.5" ry="2.5" fill="#9eef80" />
                        <rect x="83" y="82" width="33.5" height="33.5" rx="2.5" ry="2.5" fill="#9eef80" />
                        <rect x="44" y="82" width="33.5" height="33.5" rx="2.5" ry="2.5" fill="#9eef80" />
                    </svg>
                </div>
                <button className="day-card-play-button" onClick={onPlay}>
                    PLAY
                </button>
            </article>
        );
    }
    
    // Summary version
    return (
        <article className="day-card day-card-summary">
            <div className="day-card-header-summary">
                {dateLabel}
            </div>
            
            <Section 
                title="Easy" 
                result={easy.result} 
                words={easy.words}
                results={results}
                puzzleIndices={puzzleIndices}
                difficulty="easy"
            />
            
            <Section 
                title="Hard" 
                result={hard.result} 
                words={hard.words}
                results={results}
                puzzleIndices={puzzleIndices}
                difficulty="hard"
            />
            
            <Section 
                title="Impossible" 
                result={impossible.result} 
                words={impossible.words}
                results={results}
                puzzleIndices={puzzleIndices}
                difficulty="impossible"
            />
            
                {onShare && (
                    <div className="day-card-share-container">
                        <button className="day-card-share-button" onClick={onShare}>
                            <span>SHARE</span>
                        </button>
                    </div>
                )}
        </article>
    );
};
