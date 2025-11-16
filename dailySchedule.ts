import type { DailySchedule } from './types';

// Puzzle indices by difficulty (first 70 of each)
const EASY_PUZZLE_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 18, 19, 20, 22, 24, 25, 26, 30, 34, 41, 45, 50, 56, 58, 59, 64, 65, 66, 67, 72, 73, 74, 75, 76, 112, 117, 120, 127, 131, 132, 133, 135, 139, 140, 141, 146, 147, 148, 149, 150, 152, 153, 154, 155, 157, 166, 168, 171, 177, 195, 196, 199, 202, 203, 204, 206];

const HARD_PUZZLE_INDICES = [12, 46, 47, 49, 51, 52, 53, 54, 55, 57, 61, 62, 69, 70, 71, 77, 78, 79, 80, 81, 82, 87, 90, 92, 95, 96, 97, 98, 99, 100, 101, 103, 104, 109, 110, 118, 119, 121, 122, 125, 126, 128, 129, 130, 134, 136, 143, 144, 145, 151, 156, 158, 159, 161, 165, 167, 170, 172, 174, 175, 176, 178, 179, 180, 193, 197, 198, 201, 205, 208];

const IMPOSSIBLE_PUZZLE_INDICES = [13, 16, 17, 21, 23, 27, 28, 29, 31, 32, 33, 35, 36, 37, 38, 39, 40, 42, 43, 44, 48, 60, 63, 68, 83, 84, 85, 86, 88, 89, 91, 93, 94, 102, 105, 106, 107, 108, 111, 113, 114, 115, 116, 123, 124, 137, 138, 142, 160, 162, 163, 164, 169, 173, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 194, 200, 216, 217];

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
 */
export const generateDailySchedule = (startDate: Date = new Date(), days: number = 70): DailySchedule => {
    const schedule: DailySchedule = { puzzles: {} };
    
    for (let i = 0; i < days; i++) {
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
 * Default schedule starting from today
 */
export const DEFAULT_DAILY_SCHEDULE: DailySchedule = generateDailySchedule(new Date(), 70);

