// @ts-nocheck
import { useEffect } from 'react';
import type { GameState, SolvedStatus, Theme } from '../types';
import type { Puzzle } from '../puzzles';

/**
 * Custom hook to manage body classes based on game state, puzzle difficulty, and theme
 */
export const useBodyClasses = (
    gameState: GameState,
    puzzle: Puzzle | null,
    solvedStatus: SolvedStatus,
    theme: Theme
) => {
    // Difficulty theme body class
    useEffect(() => {
        const difficultyClass = puzzle ? `difficulty-${puzzle.difficulty.toLowerCase()}` : '';
    
        // Clean up old classes
        document.body.classList.remove('difficulty-easy', 'difficulty-hard', 'difficulty-impossible');
    
        // Add new class if there is one and we're not on the start screen
        if (difficultyClass && gameState !== 'start') {
            document.body.classList.add(difficultyClass);
        }
    }, [puzzle, gameState]);

    // Start screen body class
    useEffect(() => {
        if (gameState === 'start') {
            document.body.classList.add('start-screen-active');
        } else {
            document.body.classList.remove('start-screen-active');
        }
    }, [gameState]);

    // Loss flash effect
    useEffect(() => {
        if (gameState === 'solved' && solvedStatus === 'loss') {
            document.body.classList.add('loss-flash-active');
            const timer = setTimeout(() => {
                document.body.classList.remove('loss-flash-active');
            }, 500); // Should be slightly longer than animation
            return () => clearTimeout(timer);
        }
    }, [gameState, solvedStatus]);
};

