// @ts-nocheck
import { useCallback, useEffect, useRef } from 'react';

// Firebase services from window
declare const window: any;
const { db, collection, addDoc, doc, setDoc, getDoc, auth } = window.firebase || {};

// Session ID - unique per browser session, stored in sessionStorage
const getSessionId = (): string => {
    let sessionId = sessionStorage.getItem('linkle_session_id');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('linkle_session_id', sessionId);
    }
    return sessionId;
};

// Get or create a persistent visitor ID (survives browser restarts)
const getVisitorId = (): string => {
    let visitorId = localStorage.getItem('linkle_visitor_id');
    if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('linkle_visitor_id', visitorId);
    }
    return visitorId;
};

// Track first play date for retention analysis
const getFirstPlayDate = (): string | null => {
    return localStorage.getItem('linkle_first_play_date');
};

const setFirstPlayDate = (date: string): void => {
    if (!getFirstPlayDate()) {
        localStorage.setItem('linkle_first_play_date', date);
    }
};

// Track last play date for return visit detection
const getLastPlayDate = (): string | null => {
    return localStorage.getItem('linkle_last_play_date');
};

const setLastPlayDate = (date: string): void => {
    localStorage.setItem('linkle_last_play_date', date);
};

// Track visit count
const getVisitCount = (): number => {
    const count = localStorage.getItem('linkle_visit_count');
    return count ? parseInt(count, 10) : 0;
};

const incrementVisitCount = (): number => {
    const current = getVisitCount();
    const newCount = current + 1;
    localStorage.setItem('linkle_visit_count', String(newCount));
    return newCount;
};

// Track puzzles played before signup (stored in localStorage)
const getPuzzlesPlayedBeforeSignup = (): number => {
    const count = localStorage.getItem('linkle_puzzles_before_signup');
    return count ? parseInt(count, 10) : 0;
};

const incrementPuzzlesPlayed = (): number => {
    const current = getPuzzlesPlayedBeforeSignup();
    const newCount = current + 1;
    localStorage.setItem('linkle_puzzles_before_signup', String(newCount));
    return newCount;
};

const clearPuzzlesPlayedCount = (): void => {
    localStorage.removeItem('linkle_puzzles_before_signup');
};

// Calculate days between two date strings (YYYY-MM-DD)
const daysBetween = (date1: string, date2: string): number => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export type AnalyticsEvent = 
    | 'session_start'
    | 'session_end'
    | 'puzzle_started'
    | 'puzzle_completed'
    | 'puzzle_abandoned'
    | 'return_visit'
    | 'signup_prompt_shown'
    | 'signup_completed'
    | 'share_clicked'
    | 'share_copied'
    | 'explanation_viewed'
    | 'badge_viewed'
    | 'badge_unlocked'
    | 'archive_puzzle_started'
    | 'bonus_round_started'
    | 'theme_changed';

interface EventData {
    sessionId: string;
    visitorId: string;
    timestamp: string;
    date: string; // YYYY-MM-DD for daily aggregation
    event: AnalyticsEvent;
    isAnonymous: boolean;
    userId?: string;
    // Event-specific data
    difficulty?: 'easy' | 'hard' | 'impossible' | 'bonus';
    solved?: boolean;
    puzzlesPlayedBefore?: number;
    puzzlesPlayedTotal?: number;
    shareDate?: string; // Date of puzzle being shared (YYYY-MM-DD)
    // Enhanced puzzle_completed data
    puzzleId?: number; // Index in PREGENERATED_PUZZLES
    puzzleDate?: string; // YYYY-MM-DD of the puzzle being played
    timeSpentSeconds?: number; // Time from puzzle start to completion
    triesUsed?: number; // Number of attempts before solving/giving up
    movesCount?: number; // Number of tile swaps before submitting
    // Return visit data
    daysFromFirstPlay?: number;
    daysFromLastPlay?: number;
    visitNumber?: number;
    isNewPlayer?: boolean;
    // Puzzle abandoned data
    abandonReason?: 'navigated_away' | 'closed_app' | 'timeout';
    // Badge data
    badgeId?: string;
    badgeName?: string;
    wasUnlocked?: boolean; // For badge_viewed: was badge already unlocked?
    // Archive data
    daysAgo?: number; // How many days ago was this puzzle from?
    // Session end data
    sessionDurationSeconds?: number;
    puzzlesPlayedInSession?: number;
    puzzlesSolvedInSession?: number;
    endScreen?: 'all_done' | 'mid_puzzle' | 'start_screen' | 'archive' | 'bonus';
    // Theme data
    newTheme?: 'light' | 'dark';
}

// Puzzle start times tracked in memory (per session)
const puzzleStartTimes: Record<string, number> = {};

export const useAnalytics = () => {
    const sessionStartedRef = useRef(false);
    const returnVisitLoggedRef = useRef(false);
    const sessionId = getSessionId();
    const visitorId = getVisitorId();

    const logEvent = useCallback(async (
        event: AnalyticsEvent,
        extraData?: Partial<EventData>
    ) => {
        if (!db || !addDoc || !collection) {
            console.warn('Analytics: Firebase not available');
            return;
        }

        // Check Firebase auth state directly at log time (not from React state)
        // This ensures we always get the real-time auth status, avoiding stale closures
        const currentUser = auth?.currentUser;
        
        const now = new Date();
        const eventData: EventData = {
            sessionId,
            visitorId,
            timestamp: now.toISOString(),
            date: now.toISOString().split('T')[0],
            event,
            isAnonymous: !currentUser,
            ...(currentUser?.uid && { userId: currentUser.uid }),
            ...extraData,
        };

        try {
            await addDoc(collection(db, 'analytics'), eventData);
        } catch (error) {
            console.warn('Analytics: Failed to log event', event, error);
        }
    }, [sessionId, visitorId]);

    // Log session start and detect return visits
    useEffect(() => {
        if (!sessionStartedRef.current && db) {
            sessionStartedRef.current = true;
            
            const today = new Date().toISOString().split('T')[0];
            const firstPlayDate = getFirstPlayDate();
            const lastPlayDate = getLastPlayDate();
            
            // Log session start
            logEvent('session_start');
            
            // Check if this is a return visit (played before, on a different day)
            if (firstPlayDate && lastPlayDate && lastPlayDate !== today && !returnVisitLoggedRef.current) {
                returnVisitLoggedRef.current = true;
                const visitNumber = incrementVisitCount();
                
                logEvent('return_visit', {
                    daysFromFirstPlay: daysBetween(firstPlayDate, today),
                    daysFromLastPlay: daysBetween(lastPlayDate, today),
                    visitNumber,
                    isNewPlayer: false,
                });
            } else if (!firstPlayDate) {
                // First time player - set first play date
                setFirstPlayDate(today);
                incrementVisitCount(); // First visit
            }
            
            // Update last play date
            setLastPlayDate(today);
        }
    }, [logEvent]);

    // Track puzzle started (also records start time for duration calculation)
    const trackPuzzleStarted = useCallback((
        difficulty: 'easy' | 'hard' | 'impossible' | 'bonus',
        puzzleId?: number,
        puzzleDate?: string
    ) => {
        // Record start time for this puzzle
        const puzzleKey = `${difficulty}_${puzzleDate || 'unknown'}`;
        puzzleStartTimes[puzzleKey] = Date.now();
        
        logEvent('puzzle_started', { difficulty, puzzleId, puzzleDate });
    }, [logEvent]);

    // Track puzzle completed with enhanced data
    const trackPuzzleCompleted = useCallback((
        difficulty: 'easy' | 'hard' | 'impossible' | 'bonus',
        solved: boolean,
        options?: {
            puzzleId?: number;
            puzzleDate?: string;
            triesUsed?: number;
            movesCount?: number;
        }
    ) => {
        const puzzlesPlayed = incrementPuzzlesPlayed();
        
        // Calculate time spent
        const puzzleKey = `${difficulty}_${options?.puzzleDate || 'unknown'}`;
        const startTime = puzzleStartTimes[puzzleKey];
        const timeSpentSeconds = startTime ? Math.round((Date.now() - startTime) / 1000) : undefined;
        
        // Clean up start time
        if (startTime) {
            delete puzzleStartTimes[puzzleKey];
        }
        
        logEvent('puzzle_completed', { 
            difficulty, 
            solved,
            puzzlesPlayedTotal: puzzlesPlayed,
            puzzleId: options?.puzzleId,
            puzzleDate: options?.puzzleDate,
            triesUsed: options?.triesUsed,
            movesCount: options?.movesCount,
            timeSpentSeconds,
        });
    }, [logEvent]);

    // Track puzzle abandoned (started but not completed)
    const trackPuzzleAbandoned = useCallback((
        difficulty: 'easy' | 'hard' | 'impossible' | 'bonus',
        options?: {
            puzzleId?: number;
            puzzleDate?: string;
            abandonReason?: 'navigated_away' | 'closed_app' | 'timeout';
            movesCount?: number;
        }
    ) => {
        // Calculate time spent before abandoning
        const puzzleKey = `${difficulty}_${options?.puzzleDate || 'unknown'}`;
        const startTime = puzzleStartTimes[puzzleKey];
        const timeSpentSeconds = startTime ? Math.round((Date.now() - startTime) / 1000) : undefined;
        
        // Clean up start time
        if (startTime) {
            delete puzzleStartTimes[puzzleKey];
        }
        
        logEvent('puzzle_abandoned', {
            difficulty,
            puzzleId: options?.puzzleId,
            puzzleDate: options?.puzzleDate,
            abandonReason: options?.abandonReason || 'navigated_away',
            movesCount: options?.movesCount,
            timeSpentSeconds,
        });
    }, [logEvent]);

    // Track signup prompt shown
    const trackSignupPromptShown = useCallback(() => {
        const puzzlesPlayed = getPuzzlesPlayedBeforeSignup();
        logEvent('signup_prompt_shown', { puzzlesPlayedBefore: puzzlesPlayed });
    }, [logEvent]);

    // Track signup completed
    const trackSignupCompleted = useCallback(() => {
        const puzzlesPlayed = getPuzzlesPlayedBeforeSignup();
        logEvent('signup_completed', { puzzlesPlayedBefore: puzzlesPlayed });
        // Clear the count after signup
        clearPuzzlesPlayedCount();
    }, [logEvent]);

    // Track share button clicked (opens share modal)
    const trackShareClicked = useCallback((puzzleDate: Date) => {
        const shareDate = puzzleDate.toISOString().split('T')[0];
        logEvent('share_clicked', { shareDate });
    }, [logEvent]);

    // Track copy to clipboard clicked
    const trackShareCopied = useCallback((puzzleDate: Date) => {
        const shareDate = puzzleDate.toISOString().split('T')[0];
        logEvent('share_copied', { shareDate });
    }, [logEvent]);

    // Track explanation modal viewed (Phase 2)
    const trackExplanationViewed = useCallback((
        difficulty: 'easy' | 'hard' | 'impossible' | 'bonus',
        puzzleDate?: string
    ) => {
        logEvent('explanation_viewed', { difficulty, puzzleDate });
    }, [logEvent]);

    // Track badge showcase viewed (Phase 3)
    const trackBadgeViewed = useCallback((badgeId: string, wasUnlocked: boolean) => {
        logEvent('badge_viewed', { badgeId, wasUnlocked });
    }, [logEvent]);

    // Track badge unlocked (Phase 3)
    const trackBadgeUnlocked = useCallback((badgeId: string, badgeName: string) => {
        const puzzlesPlayed = getPuzzlesPlayedBeforeSignup();
        logEvent('badge_unlocked', { 
            badgeId, 
            badgeName,
            puzzlesPlayedTotal: puzzlesPlayed,
        });
    }, [logEvent]);

    // Track archive puzzle started (Phase 3)
    const trackArchivePuzzleStarted = useCallback((
        difficulty: 'easy' | 'hard' | 'impossible',
        puzzleDate: string,
        puzzleId?: number
    ) => {
        const today = new Date().toISOString().split('T')[0];
        const daysAgo = daysBetween(puzzleDate, today);
        
        logEvent('archive_puzzle_started', { 
            difficulty, 
            puzzleDate,
            puzzleId,
            daysAgo,
        });
    }, [logEvent]);

    // Track bonus round started (Phase 3)
    const trackBonusRoundStarted = useCallback((puzzleDate?: string) => {
        logEvent('bonus_round_started', { puzzleDate });
    }, [logEvent]);

    // Track session end (Phase 3)
    const trackSessionEnd = useCallback((options: {
        sessionDurationSeconds: number;
        puzzlesPlayedInSession: number;
        puzzlesSolvedInSession: number;
        endScreen: 'all_done' | 'mid_puzzle' | 'start_screen' | 'archive' | 'bonus';
    }) => {
        logEvent('session_end', options);
    }, [logEvent]);

    // Track theme changed (Phase 3)
    const trackThemeChanged = useCallback((newTheme: 'light' | 'dark') => {
        logEvent('theme_changed', { newTheme });
    }, [logEvent]);

    return {
        logEvent,
        trackPuzzleStarted,
        trackPuzzleCompleted,
        trackPuzzleAbandoned,
        trackSignupPromptShown,
        trackSignupCompleted,
        trackShareClicked,
        trackShareCopied,
        trackExplanationViewed,
        trackBadgeViewed,
        trackBadgeUnlocked,
        trackArchivePuzzleStarted,
        trackBonusRoundStarted,
        trackSessionEnd,
        trackThemeChanged,
        getPuzzlesPlayedBeforeSignup,
    };
};

