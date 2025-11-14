

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
}