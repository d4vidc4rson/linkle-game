
export type GameState = 'start' | 'loading' | 'playing' | 'solved' | 'generating';
export type SolvedStatus = 'win' | 'loss' | null;
export type Theme = 'light' | 'dark';
export type AuthMode = 'login' | 'signup';

export interface DragState {
    isDragging: boolean;
    index: number;
    clientX: number;
    clientY: number;
    offsetX: number;
    offsetY: number;
    ghostWidth: number;
    ghostHeight: number;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    unlockMessage?: string;
    unlocked: boolean;
    icon: string;
    category: string;
    dateUnlocked: string | null;
    progress?: number;
    target?: number;
}

// Daily mode types
export interface DailyResult {
    solved: boolean;
    triesUsed: number;
    timeSeconds?: number;
    boardState?: string[]; // Store final board state for share grid (shows which positions were correct)
}

export interface DailyResults {
    [date: string]: {
        easy?: DailyResult;
        hard?: DailyResult;
        impossible?: DailyResult;
    };
}

export interface DailySchedule {
    puzzles: {
        [date: string]: {
            easy: number; // puzzle index
            hard: number; // puzzle index
            impossible: number; // puzzle index
        };
    };
}

export interface PlayerData {
    totalScore: number;
    currentStreak: number;
    badges: Badge[];
    perfectScores: number;
    totalSolved: number;
    playedPuzzleIndices: number[];
    easySolved: number;
    hardSolved: number;
    impossibleSolved: number;
    consecutiveDaysPlayed: number;
    lastPlayedDate: string | null;
    showLinkleViews: number;
    fastestEasySolve: number | null; // in seconds
    impossiblePerfects: number;
    consecutivePerfects: number;
    maxStreak?: number; // Maximum streak achieved
    dailyResults?: DailyResults; // Daily puzzle results
}

// Day summary for carousel
export type DaySummaryMode = 'summary' | 'playable';

export interface DaySummary {
    id: string;
    dateLabel: string; // "Today, November 15"
    mode: DaySummaryMode; // summary card vs "old puzzle play" card
    easy: { label: string; result: string; words: string[] };
    hard: { label: string; result: string; words: string[] };
    impossible: { label: string; result: string; words: string[] };
    date: Date;
    results?: {
        easy?: DailyResult;
        hard?: DailyResult;
        impossible?: DailyResult;
    };
    puzzleIndices?: { easy: number; hard: number; impossible: number } | null;
}
