// @ts-nocheck
import { useCallback, useEffect, useRef } from 'react';

// Firebase services from window
declare const window: any;
const { db, collection, addDoc, doc, setDoc, getDoc } = window.firebase || {};

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

export type AnalyticsEvent = 
    | 'session_start'
    | 'puzzle_started'
    | 'puzzle_completed'
    | 'signup_prompt_shown'
    | 'signup_completed'
    | 'share_clicked'
    | 'share_copied';

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
}

export const useAnalytics = (user: any) => {
    const sessionStartedRef = useRef(false);
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

        const now = new Date();
        const eventData: EventData = {
            sessionId,
            visitorId,
            timestamp: now.toISOString(),
            date: now.toISOString().split('T')[0],
            event,
            isAnonymous: !user,
            userId: user?.uid || undefined,
            ...extraData,
        };

        try {
            await addDoc(collection(db, 'analytics'), eventData);
        } catch (error) {
            console.warn('Analytics: Failed to log event', event, error);
        }
    }, [sessionId, visitorId, user]);

    // Log session start once per session
    useEffect(() => {
        if (!sessionStartedRef.current && db) {
            sessionStartedRef.current = true;
            logEvent('session_start');
        }
    }, [logEvent]);

    // Track puzzle started
    const trackPuzzleStarted = useCallback((difficulty: 'easy' | 'hard' | 'impossible' | 'bonus') => {
        logEvent('puzzle_started', { difficulty });
    }, [logEvent]);

    // Track puzzle completed
    const trackPuzzleCompleted = useCallback((
        difficulty: 'easy' | 'hard' | 'impossible' | 'bonus',
        solved: boolean
    ) => {
        const puzzlesPlayed = incrementPuzzlesPlayed();
        logEvent('puzzle_completed', { 
            difficulty, 
            solved,
            puzzlesPlayedTotal: puzzlesPlayed,
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

    return {
        logEvent,
        trackPuzzleStarted,
        trackPuzzleCompleted,
        trackSignupPromptShown,
        trackSignupCompleted,
        trackShareClicked,
        trackShareCopied,
        getPuzzlesPlayedBeforeSignup,
    };
};

