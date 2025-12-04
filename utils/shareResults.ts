// @ts-nocheck
import type { DailyResults } from '../types';
import { formatDateKey } from '../dailySchedule';
import { PREGENERATED_PUZZLES } from '../puzzles';

export const generateShareText = (
    date: Date,
    dailyResults: DailyResults | undefined,
    dayNumber: number,
    puzzleIndices: { easy: number; hard: number; impossible: number } | null,
    scheduleStartDate?: Date // Optional: first date in schedule for accurate day number
): string => {
    const dateKey = formatDateKey(date);
    const dayResults = dailyResults?.[dateKey];
    
    if (!dayResults) {
        return '';
    }

    // Calculate day number from schedule start date if provided, otherwise use passed dayNumber
    const calculatedDayNumber = scheduleStartDate 
        ? Math.floor((date.getTime() - scheduleStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
        : dayNumber;

    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const easyResult = dayResults.easy;
    const hardResult = dayResults.hard;
    const impossibleResult = dayResults.impossible;

    const easyStatus = easyResult?.solved ? '✅' : '❌';
    const hardStatus = hardResult?.solved ? '✅' : '❌';
    const impossibleStatus = impossibleResult?.solved ? '✅' : '❌';

    // Generate emoji grids (3x3 for each puzzle)
    // If solved: all green squares
    // If lost: green for correct positions, white for incorrect positions
    const generateGrid = (
        result: { solved: boolean; triesUsed: number; boardState?: string[] } | undefined,
        solution: string[] | null
    ): string => {
        if (!result) {
            return '⬜⬜⬜\n⬜⬜⬜\n⬜⬜⬜';
        }
        
        if (result.solved) {
            // All green for solved puzzles (all correct)
            return '🟩🟩🟩\n🟩🟩🟩\n🟩🟩🟩';
        }
        
        // For lost puzzles, show which positions were correct
        if (result.boardState && solution) {
            const squares = result.boardState.map((word, index) => {
                return word === solution[index] ? '🟩' : '⬜'; // Green for correct, white for incorrect
            });
            // Format as 3x3 grid with line breaks
            return `${squares[0]}${squares[1]}${squares[2]}\n${squares[3]}${squares[4]}${squares[5]}\n${squares[6]}${squares[7]}${squares[8]}`;
        }
        
        // Fallback: show based on tries used (old behavior)
        const solvedSquares = Math.max(0, 9 - (4 - result.triesUsed));
        const squares = Array.from({ length: 9 }).map((_, i) => {
            return i < solvedSquares ? '🟩' : '⬜'; // Green for correct, white for incorrect
        });
        return `${squares[0]}${squares[1]}${squares[2]}\n${squares[3]}${squares[4]}${squares[5]}\n${squares[6]}${squares[7]}${squares[8]}`;
    };

    const easySolution = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.easy]?.solution : null;
    const hardSolution = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.hard]?.solution : null;
    const impossibleSolution = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.impossible]?.solution : null;

    const easyGrid = generateGrid(easyResult, easySolution);
    const hardGrid = generateGrid(hardResult, hardSolution);
    const impossibleGrid = generateGrid(impossibleResult, impossibleSolution);

    // Add spacing between grids (blank line)
    return `Linkle.fun Daily #${calculatedDayNumber} - ${dateStr}\nEasy ${easyStatus} Hard ${hardStatus} Impossible ${impossibleStatus}\n\n${easyGrid}\n\n${hardGrid}\n\n${impossibleGrid}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        return false;
    }
};

