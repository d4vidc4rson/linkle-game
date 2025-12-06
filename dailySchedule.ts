import type { DailySchedule } from './types';
import { PREGENERATED_PUZZLES } from './puzzles';

/**
 * Dynamically categorize all puzzles by difficulty and return their indices
 * This ensures all puzzles in puzzles.ts are automatically included
 */
const categorizePuzzlesByDifficulty = (): {
    easy: number[];
    hard: number[];
    impossible: number[];
} => {
    const easy: number[] = [];
    const hard: number[] = [];
    const impossible: number[] = [];

    PREGENERATED_PUZZLES.forEach((puzzle, index) => {
        if (puzzle.difficulty === 'EASY') {
            easy.push(index);
        } else if (puzzle.difficulty === 'HARD') {
            hard.push(index);
        } else if (puzzle.difficulty === 'IMPOSSIBLE') {
            impossible.push(index);
        }
    });

    return { easy, hard, impossible };
};

// Get dynamically categorized puzzle indices
const { easy: EASY_PUZZLE_INDICES, hard: HARD_PUZZLE_INDICES, impossible: IMPOSSIBLE_PUZZLE_INDICES } = categorizePuzzlesByDifficulty();

/**
 * Calculate the maximum number of unique days we can support
 * Based on the smallest category to ensure we have puzzles for all difficulties
 */
const calculateMaxUniqueDays = (): number => {
    return Math.min(
        EASY_PUZZLE_INDICES.length,
        HARD_PUZZLE_INDICES.length,
        IMPOSSIBLE_PUZZLE_INDICES.length
    );
};

/**
 * Generate a date string in YYYY-MM-DD format
 */
export const formatDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Parse a date string in YYYY-MM-DD format to a Date object
 * Uses local timezone to avoid date shifting issues
 */
export const parseDateKey = (dateKey: string): Date => {
    const [year, month, day] = dateKey.split('-').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in Date constructor
};

/**
 * Generate initial daily schedule starting from a given date
 * Uses dynamic day count based on available puzzles if not specified
 */
export const generateDailySchedule = (startDate: Date = new Date(), days?: number): DailySchedule => {
    // Use dynamic calculation if days not specified, otherwise use provided value
    const totalDays = days ?? calculateMaxUniqueDays();
    const schedule: DailySchedule = { puzzles: {} };
    
    for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateKey = formatDateKey(currentDate);
        
        schedule.puzzles[dateKey] = {
            easy: EASY_PUZZLE_INDICES[i % EASY_PUZZLE_INDICES.length],
            hard: HARD_PUZZLE_INDICES[i % HARD_PUZZLE_INDICES.length],
            impossible: IMPOSSIBLE_PUZZLE_INDICES[i % IMPOSSIBLE_PUZZLE_INDICES.length],
        };
    }
    
    return schedule;
};

/**
 * Get puzzle indices for a specific date from a schedule
 */
export const getPuzzlesForDateFromSchedule = (schedule: DailySchedule, date: Date): { easy: number; hard: number; impossible: number } | null => {
    const dateKey = formatDateKey(date);
    return schedule.puzzles[dateKey] || null;
};

/**
 * Get the first date in a schedule (earliest date key)
 */
export const getScheduleStartDate = (schedule: DailySchedule): Date | null => {
    const dateKeys = Object.keys(schedule.puzzles).sort();
    if (dateKeys.length === 0) return null;
    return parseDateKey(dateKeys[0]);
};

/**
 * Epoch date for puzzle cycling calculation
 * This is the original schedule start date (November 9, 2025)
 * All puzzle index calculations are based on days since this date
 */
export const SCHEDULE_EPOCH = new Date(2025, 10, 9); // Month is 0-indexed, so 10 = November

/**
 * Calculate puzzle indices for any date using modulo cycling
 * This allows the game to continue indefinitely without manual schedule updates
 * Uses days since SCHEDULE_EPOCH to determine which puzzles to show
 */
export const calculatePuzzleIndicesForDate = (date: Date): { easy: number; hard: number; impossible: number } => {
    // Normalize both dates to midnight to ensure consistent day calculation
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const normalizedEpoch = new Date(SCHEDULE_EPOCH.getFullYear(), SCHEDULE_EPOCH.getMonth(), SCHEDULE_EPOCH.getDate());
    
    // Calculate days since epoch
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysSinceEpoch = Math.floor((normalizedDate.getTime() - normalizedEpoch.getTime()) / msPerDay);
    
    // Handle dates before epoch (shouldn't happen in practice, but be safe)
    const dayIndex = Math.max(0, daysSinceEpoch);
    
    return {
        easy: EASY_PUZZLE_INDICES[dayIndex % EASY_PUZZLE_INDICES.length],
        hard: HARD_PUZZLE_INDICES[dayIndex % HARD_PUZZLE_INDICES.length],
        impossible: IMPOSSIBLE_PUZZLE_INDICES[dayIndex % IMPOSSIBLE_PUZZLE_INDICES.length],
    };
};

/**
 * Default schedule starting from today
 * Uses dynamic day count based on available puzzles
 * This is only used as a fallback when no schedule exists in Firebase
 */
export const DEFAULT_DAILY_SCHEDULE: DailySchedule = generateDailySchedule(new Date());

