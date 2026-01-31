
export type GameState = 'start' | 'loading' | 'playing' | 'solved' | 'generating';
export type SolvedStatus = 'win' | 'loss' | null;
export type Theme = 'light' | 'dark';
export type AuthMode = 'login' | 'signup';

export interface DragState {
    isDragging: boolean;
    originIndex: number;
    draggedWord: string;
    hoverIndex: number | null;
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
        bonus?: DailyResult; // Bonus speed round result
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
    dayStreak?: number; // Consecutive days played (Wordle-style)
    dailyResults?: DailyResults; // Daily puzzle results
    circles?: string[]; // Array of circleIds the user belongs to
}

// Day summary for carousel
export type DaySummaryMode = 'summary' | 'playable' | 'partial' | 'bonus';

export interface DaySummary {
    id: string;
    dateLabel: string; // "Today, November 15"
    mode: DaySummaryMode; // summary card vs "old puzzle play" card vs partial completion
    easy: { label: string; result: string; words: string[] };
    hard: { label: string; result: string; words: string[] };
    impossible: { label: string; result: string; words: string[] };
    date: Date;
    completedCount?: number; // 0-3, how many puzzles attempted
    results?: {
        easy?: DailyResult;
        hard?: DailyResult;
        impossible?: DailyResult;
        bonus?: DailyResult; // Bonus speed round result
    };
    puzzleIndices?: { easy: number; hard: number; impossible: number } | null;
}

// Circle types for friends leaderboard feature
export interface Circle {
    id: string;
    name: string; // e.g., "Family", "Work Friends"
    createdBy: string; // userId of creator
    createdAt: string; // ISO timestamp
    inviteCode: string; // unique short code for invite URLs
    members: string[]; // array of userIds
    memberNames: { [userId: string]: string }; // per-circle display names
}

export interface CircleMember {
    id: string; // userId
    name: string; // display name in this circle
    totalScore: number;
    currentStreak: number;
    maxStreak: number;
    todayStatus: {
        easy: 'solved' | 'failed' | 'unplayed';
        hard: 'solved' | 'failed' | 'unplayed';
        impossible: 'solved' | 'failed' | 'unplayed';
    };
    todayTries: {
        easy: number | null; // null if not solved, otherwise 1-3
        hard: number | null;
        impossible: number | null;
    };
    winPercentage: number; // calculated from dailyResults
    bonusStatus: 'solved' | 'failed' | 'unplayed';
    bonusTimeSeconds: number | null; // only set if solved
}

export interface CircleInviteInfo {
    circleId: string;
    circleName: string;
    inviterName: string; // display name of the person who created the circle
    inviteCode: string;
}
