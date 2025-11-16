// @ts-nocheck
import React from 'react';
import type { Theme, DailyResult } from '../types';
import { PREGENERATED_PUZZLES } from '../puzzles';

interface DailyStatsCardProps {
    date: Date;
    dayName: string;
    results?: {
        easy?: DailyResult;
        hard?: DailyResult;
        impossible?: DailyResult;
    };
    theme: Theme;
    isToday?: boolean;
    puzzleIndices?: { easy: number; hard: number; impossible: number } | null;
    onShare?: () => void;
}

const PuzzleGrid = ({ solved, triesUsed, maxTries, isLarge = false, boardState }: { solved: boolean; triesUsed: number; maxTries: number; isLarge?: boolean; boardState?: string[] }) => {
    const className = isLarge ? 'puzzle-grid' : 'puzzle-grid-mini';
    const squareClassName = isLarge ? 'grid-square' : 'grid-square-mini';
    
    // If we have boardState, use it to determine correct/incorrect positions
    // Otherwise, use the old logic
    let squares: boolean[];
    if (boardState && boardState.length === 9) {
        // boardState contains the final board state - we need to check which positions are correct
        // For now, we'll use the solved status to determine if all are correct
        // In a full implementation, we'd compare boardState to the puzzle solution
        squares = boardState.map((_, i) => solved || i < (9 - (maxTries - triesUsed)));
    } else {
        const solvedSquares = solved ? 9 : Math.max(0, 9 - (maxTries - triesUsed));
        squares = Array.from({ length: 9 }).map((_, i) => i < solvedSquares);
    }
    
    return (
        <div className={`${className} ${!solved ? 'puzzle-grid-failed' : ''}`}>
            {Array.from({ length: 9 }).map((_, i) => (
                <div
                    key={i}
                    className={`${squareClassName} ${squares[i] ? 'grid-square-solved' : 'grid-square-unsolved'}`}
                />
            ))}
        </div>
    );
};

export const DailyStatsCard: React.FC<DailyStatsCardProps> = ({
    date,
    dayName,
    results,
    theme,
    isToday = false,
    puzzleIndices,
    onShare,
}) => {
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    
    const easyPuzzle = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.easy] : null;
    const hardPuzzle = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.hard] : null;
    const impossiblePuzzle = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.impossible] : null;
    
    if (isToday) {
        // Full "Today" card with all details
        return (
            <div className={`daily-stats-card daily-stats-card-today theme-${theme}`}>
                <div className="daily-stats-card-header-today">
                    Today, {dateStr}
                </div>
                
                {easyPuzzle && (
                    <div className={`puzzle-result-section puzzle-result-easy ${!results?.easy?.solved ? 'puzzle-result-failed' : ''}`}>
                        <div className="puzzle-result-header">
                            <PuzzleGrid 
                                solved={results?.easy?.solved || false}
                                triesUsed={results?.easy?.triesUsed || 0}
                                maxTries={4}
                                isLarge={true}
                            />
                            <div className="puzzle-result-info">
                                <span className="puzzle-difficulty">Easy: {results?.easy?.triesUsed || 0}/4</span>
                            </div>
                        </div>
                        <div className="puzzle-words">
                            {(() => {
                                const groups = [];
                                for (let i = 0; i < easyPuzzle.solution.length; i += 3) {
                                    const group = easyPuzzle.solution.slice(i, i + 3);
                                    groups.push(group.join(', '));
                                }
                                return groups.map((group, idx) => (
                                    <React.Fragment key={idx}>
                                        {group}{idx < groups.length - 1 ? ',' : ''}
                                        {idx < groups.length - 1 && <br />}
                                    </React.Fragment>
                                ));
                            })()}
                        </div>
                    </div>
                )}

                {hardPuzzle && (
                    <div className={`puzzle-result-section puzzle-result-hard ${!results?.hard?.solved ? 'puzzle-result-failed' : ''}`}>
                        <div className="puzzle-result-header">
                            <PuzzleGrid 
                                solved={results?.hard?.solved || false}
                                triesUsed={results?.hard?.triesUsed || 0}
                                maxTries={3}
                                isLarge={true}
                                boardState={results?.hard?.boardState}
                            />
                            <div className="puzzle-result-info">
                                <span className="puzzle-difficulty">Hard: {results?.hard?.triesUsed || 0}/3</span>
                            </div>
                        </div>
                        <div className="puzzle-words">
                            {(() => {
                                const groups = [];
                                for (let i = 0; i < hardPuzzle.solution.length; i += 3) {
                                    const group = hardPuzzle.solution.slice(i, i + 3);
                                    groups.push(group.join(', '));
                                }
                                return groups.map((group, idx) => (
                                    <React.Fragment key={idx}>
                                        {group}{idx < groups.length - 1 ? ',' : ''}
                                        {idx < groups.length - 1 && <br />}
                                    </React.Fragment>
                                ));
                            })()}
                        </div>
                    </div>
                )}

                {impossiblePuzzle && (
                    <div className={`puzzle-result-section puzzle-result-impossible ${!results?.impossible?.solved ? 'puzzle-result-failed' : ''}`}>
                        <div className="puzzle-result-header">
                            <PuzzleGrid 
                                solved={results?.impossible?.solved || false}
                                triesUsed={results?.impossible?.triesUsed || 0}
                                maxTries={2}
                                isLarge={true}
                                boardState={results?.impossible?.boardState}
                            />
                            <div className="puzzle-result-info">
                                <span className="puzzle-difficulty">Impossible: {results?.impossible?.triesUsed || 0}/2</span>
                            </div>
                        </div>
                        <div className="puzzle-words">
                            {(() => {
                                const groups = [];
                                for (let i = 0; i < impossiblePuzzle.solution.length; i += 3) {
                                    const group = impossiblePuzzle.solution.slice(i, i + 3);
                                    groups.push(group.join(', '));
                                }
                                return groups.map((group, idx) => (
                                    <React.Fragment key={idx}>
                                        {group}{idx < groups.length - 1 ? ',' : ''}
                                        {idx < groups.length - 1 && <br />}
                                    </React.Fragment>
                                ));
                            })()}
                        </div>
                    </div>
                )}

                {onShare && (
                    <button className="share-button" onClick={onShare}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        SHARE
                    </button>
                )}
            </div>
        );
    }
    
    // Past day card - simpler version
    return (
        <div className={`daily-stats-card theme-${theme}`}>
            <div className="daily-stats-card-header">{dayName}</div>
            <div className="daily-stats-card-grids">
                <PuzzleGrid 
                    solved={results?.easy?.solved || false}
                    triesUsed={results?.easy?.triesUsed || 0}
                    maxTries={4}
                />
                <PuzzleGrid 
                    solved={results?.hard?.solved || false}
                    triesUsed={results?.hard?.triesUsed || 0}
                    maxTries={3}
                />
                <PuzzleGrid 
                    solved={results?.impossible?.solved || false}
                    triesUsed={results?.impossible?.triesUsed || 0}
                    maxTries={2}
                />
            </div>
        </div>
    );
};

