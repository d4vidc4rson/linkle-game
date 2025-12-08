// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import type { PlayerData } from '../types';

// Firebase services from window
declare const window: any;
const { db, collection, getDocs, auth } = window.firebase || {};

// Admin email - hardcoded for now
const ADMIN_EMAIL = 'davidvcarson@gmail.com';

export interface PlayerWithMeta {
    uid: string;
    email: string | null;
    displayName: string | null;
    playerData: PlayerData;
    createdAt?: string;
}

export interface AggregateMetrics {
    totalUsers: number;
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    averageStreak: number;
    streakDistribution: {
        '1-3': number;
        '4-7': number;
        '8-14': number;
        '15+': number;
    };
    completionRates: {
        easy: { attempted: number; solved: number; perfect: number };
        hard: { attempted: number; solved: number; perfect: number };
        impossible: { attempted: number; solved: number; perfect: number };
    };
    totalPuzzlesPlayed: number;
    totalPuzzlesSolved: number;
    // Bonus Speed Round metrics
    bonusMetrics: {
        totalPlayed: number;
        totalSolved: number;
        participationRate: number; // % of users who've played at least one
        completionRate: number; // % solved
        averageTime: number; // seconds
        fastestTime: number | null; // seconds
        usersWithBonus: number;
    };
}

export type TimeRange = 'today' | '7days' | '14days' | '28days' | 'all';

export interface ConversionMetrics {
    totalSessions: number;
    uniqueVisitors: number;
    puzzlesStarted: number;
    puzzlesCompleted: number;
    signupPromptsShown: number;
    signupsCompleted: number;
    visitorToPlayerRate: number; // % of visitors who played
    playerToSignupRate: number; // % of players who signed up
    promptToSignupRate: number; // % of prompts that converted
    avgPuzzlesBeforeSignup: number;
    puzzlesBeforeSignupDistribution: Record<string, number>; // "1-2": 5, "3-5": 10, etc.
    // Share metrics
    shareClicks: number;
    shareCopies: number;
    shareClickRate: number; // % of completed puzzles that led to share click
    shareCopyRate: number; // % of share clicks that led to copy
}

// Anonymous visitor data from analytics events
export interface AnonymousVisitor {
    visitorId: string;
    puzzlesPlayed: number;
    puzzlesSolved: number;
    winRate: number;
    firstSeen: string;
    lastSeen: string;
    convertedToSignup: boolean;
}

export interface AnonymousMetrics {
    // Aggregate stats for UNCONVERTED anonymous visitors
    totalAnonymousVisitors: number;
    totalAnonymousPuzzlesPlayed: number;
    totalAnonymousPuzzlesSolved: number;
    anonymousWinRate: number;
    avgPuzzlesPerAnonymousVisitor: number;
    
    // Engagement breakdown (unconverted only)
    visitorsWithOnePuzzle: number;
    visitorsWith2to5Puzzles: number;
    visitorsWith6PlusPuzzles: number;
    
    // Conversion comparison
    avgPuzzlesBeforeSignup: number;
    avgPuzzlesForNonConverters: number; // Avg for those who played 3+ but didn't sign up
    
    // Power users (engaged but unconverted)
    powerUsers: AnonymousVisitor[]; // Visitors with 5+ puzzles who haven't signed up
    
    // All anonymous visitors for detailed view (unconverted only)
    allAnonymousVisitors: AnonymousVisitor[];
    
    // ALL ANONYMOUS ACTIVITY (including those who later signed up)
    allActivity: {
        totalVisitors: number;           // All visitors who played while anonymous
        totalPuzzlesPlayed: number;      // All puzzles played while anonymous
        totalPuzzlesSolved: number;
        winRate: number;
        avgPuzzlesPerVisitor: number;
        convertedCount: number;          // How many eventually signed up
        conversionRate: number;          // % who signed up
        visitors: AnonymousVisitor[];    // All visitors with anonymous activity
    };
}

export interface DailyDataPoint {
    date: string;
    displayDate: string;
    dau: number;
    puzzlesPlayed: number;
    puzzlesSolved: number;
    winRate: number;
    newSignups: number;
    cumulativeUsers: number;
    stickiness: number; // DAU / Total Users %
}

export const useAdminData = (user: any) => {
    const [players, setPlayers] = useState<PlayerWithMeta[]>([]);
    const [analyticsEvents, setAnalyticsEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if current user is admin
    useEffect(() => {
        if (user?.email) {
            setIsAdmin(user.email === ADMIN_EMAIL);
        } else {
            setIsAdmin(false);
        }
    }, [user]);

    // Fetch all players from Firebase
    const fetchPlayers = useCallback(async () => {
        if (!db || !isAdmin) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const usersCollection = collection(db, 'users');
            const snapshot = await getDocs(usersCollection);
            
            const playersList: PlayerWithMeta[] = [];
            
            snapshot.forEach((doc: any) => {
                const data = doc.data();
                playersList.push({
                    uid: doc.id,
                    email: data.email || null,
                    displayName: data.displayName || null,
                    playerData: data as PlayerData,
                    createdAt: data.createdAt || null,
                });
            });

            setPlayers(playersList);
        } catch (err) {
            console.error('Failed to fetch players:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch players');
        } finally {
            setLoading(false);
        }
    }, [isAdmin]);

    // Fetch analytics events from Firebase
    const fetchAnalytics = useCallback(async () => {
        if (!db || !isAdmin) return;
        
        try {
            const analyticsCollection = collection(db, 'analytics');
            const snapshot = await getDocs(analyticsCollection);
            
            const events: any[] = [];
            snapshot.forEach((doc: any) => {
                events.push({ id: doc.id, ...doc.data() });
            });
            
            setAnalyticsEvents(events);
        } catch (err) {
            console.warn('Failed to fetch analytics:', err);
            // Don't set error state - analytics is optional
        }
    }, [isAdmin]);

    // Fetch on mount and when admin status changes
    useEffect(() => {
        if (isAdmin) {
            fetchPlayers();
            fetchAnalytics();
        }
    }, [isAdmin, fetchPlayers, fetchAnalytics]);

    // Calculate conversion metrics from analytics events
    const calculateConversionMetrics = useCallback((timeRange: TimeRange = '28days'): ConversionMetrics => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Determine date cutoff
        let daysBack: number;
        switch (timeRange) {
            case 'today': daysBack = 1; break;
            case '7days': daysBack = 7; break;
            case '14days': daysBack = 14; break;
            case '28days': daysBack = 28; break;
            case 'all': daysBack = 3650; break; // 10 years
            default: daysBack = 28;
        }
        
        const cutoffDate = new Date(today);
        cutoffDate.setDate(cutoffDate.getDate() - daysBack);
        const cutoffStr = cutoffDate.toISOString().split('T')[0];
        
        // Filter events by date
        const filteredEvents = analyticsEvents.filter(e => e.date >= cutoffStr);
        
        // Count unique visitors and sessions
        const uniqueVisitors = new Set(filteredEvents.map(e => e.visitorId)).size;
        const uniqueSessions = new Set(filteredEvents.map(e => e.sessionId)).size;
        
        // Count events by type
        const sessionStarts = filteredEvents.filter(e => e.event === 'session_start').length;
        const puzzlesStarted = filteredEvents.filter(e => e.event === 'puzzle_started').length;
        const puzzlesCompleted = filteredEvents.filter(e => e.event === 'puzzle_completed').length;
        const signupPrompts = filteredEvents.filter(e => e.event === 'signup_prompt_shown').length;
        const signups = filteredEvents.filter(e => e.event === 'signup_completed');
        const shareClicks = filteredEvents.filter(e => e.event === 'share_clicked').length;
        const shareCopies = filteredEvents.filter(e => e.event === 'share_copied').length;
        
        // Calculate puzzles before signup
        const puzzlesBeforeSignupValues = signups
            .filter(e => e.puzzlesPlayedBefore != null)
            .map(e => e.puzzlesPlayedBefore);
        
        const avgPuzzlesBeforeSignup = puzzlesBeforeSignupValues.length > 0
            ? Math.round((puzzlesBeforeSignupValues.reduce((a, b) => a + b, 0) / puzzlesBeforeSignupValues.length) * 10) / 10
            : 0;
        
        // Distribution of puzzles played before signup
        const distribution: Record<string, number> = { '0': 0, '1-2': 0, '3-5': 0, '6-10': 0, '10+': 0 };
        puzzlesBeforeSignupValues.forEach(count => {
            if (count === 0) distribution['0']++;
            else if (count <= 2) distribution['1-2']++;
            else if (count <= 5) distribution['3-5']++;
            else if (count <= 10) distribution['6-10']++;
            else distribution['10+']++;
        });
        
        // Visitors who started at least one puzzle
        const playersWhoStarted = new Set(
            filteredEvents.filter(e => e.event === 'puzzle_started').map(e => e.visitorId)
        ).size;
        
        return {
            totalSessions: uniqueSessions,
            uniqueVisitors,
            puzzlesStarted,
            puzzlesCompleted,
            signupPromptsShown: signupPrompts,
            signupsCompleted: signups.length,
            visitorToPlayerRate: uniqueVisitors > 0 ? Math.round((playersWhoStarted / uniqueVisitors) * 100) : 0,
            playerToSignupRate: playersWhoStarted > 0 ? Math.round((signups.length / playersWhoStarted) * 100) : 0,
            promptToSignupRate: signupPrompts > 0 ? Math.round((signups.length / signupPrompts) * 100) : 0,
            avgPuzzlesBeforeSignup,
            puzzlesBeforeSignupDistribution: distribution,
            shareClicks,
            shareCopies,
            shareClickRate: puzzlesCompleted > 0 ? Math.round((shareClicks / puzzlesCompleted) * 100) : 0,
            shareCopyRate: shareClicks > 0 ? Math.round((shareCopies / shareClicks) * 100) : 0,
        };
    }, [analyticsEvents]);

    // Calculate aggregate metrics
    const calculateMetrics = useCallback((): AggregateMetrics => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().split('T')[0];
        
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekAgoStr = weekAgo.toISOString().split('T')[0];

        let dailyActive = 0;
        let weeklyActive = 0;
        let totalStreak = 0;
        const streakDist = { '1-3': 0, '4-7': 0, '8-14': 0, '15+': 0 };
        const completionRates = {
            easy: { attempted: 0, solved: 0, perfect: 0 },
            hard: { attempted: 0, solved: 0, perfect: 0 },
            impossible: { attempted: 0, solved: 0, perfect: 0 },
        };
        let totalPuzzlesPlayed = 0;
        let totalPuzzlesSolved = 0;
        
        // Bonus metrics
        let bonusPlayed = 0;
        let bonusSolved = 0;
        let bonusTotalTime = 0;
        let bonusTimeCount = 0;
        let bonusFastestTime: number | null = null;
        let usersWithBonus = 0;

        players.forEach(player => {
            const { playerData } = player;
            const dailyResults = playerData.dailyResults || {};
            
            // Check daily/weekly active based on actual activity in dailyResults
            // This is more accurate than relying on lastPlayedDate which may not be set
            let isActiveToday = false;
            let isActiveThisWeek = false;
            
            for (const dateKey of Object.keys(dailyResults)) {
                const dayResult = dailyResults[dateKey];
                const hasActivity = dayResult?.easy || dayResult?.hard || dayResult?.impossible || dayResult?.bonus;
                if (hasActivity) {
                    if (dateKey === todayStr) {
                        isActiveToday = true;
                        isActiveThisWeek = true;
                    } else if (dateKey >= weekAgoStr) {
                        isActiveThisWeek = true;
                    }
                }
            }
            
            if (isActiveToday) dailyActive++;
            if (isActiveThisWeek) weeklyActive++;

            // Streak distribution
            const streak = playerData.currentStreak || 0;
            totalStreak += streak;
            if (streak >= 15) streakDist['15+']++;
            else if (streak >= 8) streakDist['8-14']++;
            else if (streak >= 4) streakDist['4-7']++;
            else if (streak >= 1) streakDist['1-3']++;

            // Track if this player has played any bonus rounds
            let playerHasBonus = false;

            // Analyze daily results for completion rates
            Object.values(dailyResults).forEach((dayResult: any) => {
                if (dayResult.easy) {
                    completionRates.easy.attempted++;
                    totalPuzzlesPlayed++;
                    if (dayResult.easy.solved) {
                        completionRates.easy.solved++;
                        totalPuzzlesSolved++;
                        if (dayResult.easy.triesUsed === 1) completionRates.easy.perfect++;
                    }
                }
                if (dayResult.hard) {
                    completionRates.hard.attempted++;
                    totalPuzzlesPlayed++;
                    if (dayResult.hard.solved) {
                        completionRates.hard.solved++;
                        totalPuzzlesSolved++;
                        if (dayResult.hard.triesUsed === 1) completionRates.hard.perfect++;
                    }
                }
                if (dayResult.impossible) {
                    completionRates.impossible.attempted++;
                    totalPuzzlesPlayed++;
                    if (dayResult.impossible.solved) {
                        completionRates.impossible.solved++;
                        totalPuzzlesSolved++;
                        if (dayResult.impossible.triesUsed === 1) completionRates.impossible.perfect++;
                    }
                }
                
                // Bonus speed round metrics
                if (dayResult.bonus) {
                    playerHasBonus = true;
                    bonusPlayed++;
                    if (dayResult.bonus.solved) {
                        bonusSolved++;
                    }
                    if (dayResult.bonus.timeSeconds != null && dayResult.bonus.timeSeconds > 0) {
                        bonusTotalTime += dayResult.bonus.timeSeconds;
                        bonusTimeCount++;
                        if (bonusFastestTime === null || dayResult.bonus.timeSeconds < bonusFastestTime) {
                            bonusFastestTime = dayResult.bonus.timeSeconds;
                        }
                    }
                }
            });
            
            if (playerHasBonus) {
                usersWithBonus++;
            }
        });

        return {
            totalUsers: players.length,
            dailyActiveUsers: dailyActive,
            weeklyActiveUsers: weeklyActive,
            averageStreak: players.length > 0 ? Math.round((totalStreak / players.length) * 10) / 10 : 0,
            streakDistribution: streakDist,
            completionRates,
            totalPuzzlesPlayed,
            totalPuzzlesSolved,
            bonusMetrics: {
                totalPlayed: bonusPlayed,
                totalSolved: bonusSolved,
                participationRate: players.length > 0 ? Math.round((usersWithBonus / players.length) * 100) : 0,
                completionRate: bonusPlayed > 0 ? Math.round((bonusSolved / bonusPlayed) * 100) : 0,
                averageTime: bonusTimeCount > 0 ? Math.round(bonusTotalTime / bonusTimeCount) : 0,
                fastestTime: bonusFastestTime,
                usersWithBonus,
            },
        };
    }, [players]);

    // Get leaderboard (top players by score)
    const getLeaderboard = useCallback((limit: number = 25): PlayerWithMeta[] => {
        return [...players]
            .sort((a, b) => (b.playerData.totalScore || 0) - (a.playerData.totalScore || 0))
            .slice(0, limit);
    }, [players]);

    // Search players by name or email
    const searchPlayers = useCallback((query: string): PlayerWithMeta[] => {
        if (!query.trim()) return players;
        const lowerQuery = query.toLowerCase();
        return players.filter(p => 
            p.displayName?.toLowerCase().includes(lowerQuery) ||
            p.email?.toLowerCase().includes(lowerQuery) ||
            p.uid.toLowerCase().includes(lowerQuery)
        );
    }, [players]);

    // Calculate historical metrics for charts
    const calculateHistoricalMetrics = useCallback((timeRange: TimeRange): DailyDataPoint[] => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Determine date range
        let daysToShow: number;
        switch (timeRange) {
            case 'today': daysToShow = 1; break;
            case '7days': daysToShow = 7; break;
            case '14days': daysToShow = 14; break;
            case '28days': daysToShow = 28; break;
            case 'all': daysToShow = 365; break; // Max 1 year for "all"
            default: daysToShow = 7;
        }
        
        // Generate array of dates
        const dates: string[] = [];
        for (let i = daysToShow - 1; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            dates.push(d.toISOString().split('T')[0]);
        }
        
        // Initialize data for each date
        const dataByDate: Record<string, DailyDataPoint> = {};
        dates.forEach(date => {
            const d = new Date(date);
            dataByDate[date] = {
                date,
                displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                dau: 0,
                puzzlesPlayed: 0,
                puzzlesSolved: 0,
                winRate: 0,
                newSignups: 0,
                cumulativeUsers: 0,
                stickiness: 0,
            };
        });
        
        // Process each player
        const usersCreatedByDate: Record<string, number> = {};
        
        players.forEach(player => {
            const { playerData, createdAt } = player;
            const dailyResults = playerData.dailyResults || {};
            
            // Determine signup date: use createdAt if available, otherwise use first activity date
            let signupDate: string | null = null;
            
            if (createdAt) {
                signupDate = createdAt.split('T')[0];
            } else {
                // Infer signup date from earliest dailyResults entry
                const activityDates = Object.keys(dailyResults).sort();
                if (activityDates.length > 0) {
                    signupDate = activityDates[0];
                }
            }
            
            // Track new signups by date
            if (signupDate) {
                if (dataByDate[signupDate]) {
                    dataByDate[signupDate].newSignups++;
                }
                usersCreatedByDate[signupDate] = (usersCreatedByDate[signupDate] || 0) + 1;
            }
            
            // Process daily results
            Object.entries(dailyResults).forEach(([dateKey, dayResult]: [string, any]) => {
                if (!dataByDate[dateKey]) return; // Skip dates outside range
                
                // Count this player as active on this date
                const hasActivity = dayResult.easy || dayResult.hard || dayResult.impossible;
                if (hasActivity) {
                    dataByDate[dateKey].dau++;
                }
                
                // Count puzzles
                if (dayResult.easy) {
                    dataByDate[dateKey].puzzlesPlayed++;
                    if (dayResult.easy.solved) dataByDate[dateKey].puzzlesSolved++;
                }
                if (dayResult.hard) {
                    dataByDate[dateKey].puzzlesPlayed++;
                    if (dayResult.hard.solved) dataByDate[dateKey].puzzlesSolved++;
                }
                if (dayResult.impossible) {
                    dataByDate[dateKey].puzzlesPlayed++;
                    if (dayResult.impossible.solved) dataByDate[dateKey].puzzlesSolved++;
                }
            });
        });
        
        // Calculate cumulative users and win rates
        let cumulativeUsers = 0;
        
        // For cumulative, we need to count users created before the range too
        players.forEach(player => {
            const { playerData, createdAt } = player;
            const dailyResults = playerData.dailyResults || {};
            
            // Determine signup date: use createdAt if available, otherwise use first activity date
            let signupDate: string | null = null;
            if (createdAt) {
                signupDate = createdAt.split('T')[0];
            } else {
                const activityDates = Object.keys(dailyResults).sort();
                if (activityDates.length > 0) {
                    signupDate = activityDates[0];
                }
            }
            
            if (signupDate && signupDate < dates[0]) {
                cumulativeUsers++;
            }
        });
        
        dates.forEach(date => {
            // Add new signups to cumulative
            cumulativeUsers += dataByDate[date].newSignups;
            dataByDate[date].cumulativeUsers = cumulativeUsers;
            
            // Calculate win rate
            const played = dataByDate[date].puzzlesPlayed;
            const solved = dataByDate[date].puzzlesSolved;
            dataByDate[date].winRate = played > 0 ? Math.round((solved / played) * 100) : 0;
            
            // Calculate stickiness (DAU / Total Users %)
            const dau = dataByDate[date].dau;
            dataByDate[date].stickiness = cumulativeUsers > 0 ? Math.round((dau / cumulativeUsers) * 100) : 0;
        });
        
        // Return as sorted array
        return dates.map(date => dataByDate[date]);
    }, [players]);

    // Calculate anonymous visitor metrics from analytics events
    const calculateAnonymousMetrics = useCallback((): AnonymousMetrics => {
        // Group events by visitorId
        const visitorData: Record<string, {
            visitorId: string;
            puzzlesStarted: number;
            puzzlesCompleted: number;
            puzzlesSolved: number;
            firstSeen: string;
            lastSeen: string;
            signedUp: boolean;
        }> = {};
        
        // Get visitor IDs that eventually signed up
        const signedUpVisitorIds = new Set(
            analyticsEvents
                .filter(e => e.event === 'signup_completed')
                .map(e => e.visitorId)
        );
        
        // Process all puzzle events (focus on anonymous activity)
        analyticsEvents.forEach(event => {
            const vid = event.visitorId;
            if (!vid) return;
            
            if (!visitorData[vid]) {
                visitorData[vid] = {
                    visitorId: vid,
                    puzzlesStarted: 0,
                    puzzlesCompleted: 0,
                    puzzlesSolved: 0,
                    firstSeen: event.timestamp,
                    lastSeen: event.timestamp,
                    signedUp: signedUpVisitorIds.has(vid),
                };
            }
            
            const visitor = visitorData[vid];
            
            // Update timestamps
            if (event.timestamp < visitor.firstSeen) visitor.firstSeen = event.timestamp;
            if (event.timestamp > visitor.lastSeen) visitor.lastSeen = event.timestamp;
            
            // Count events (only when anonymous)
            if (event.isAnonymous) {
                if (event.event === 'puzzle_started') visitor.puzzlesStarted++;
                if (event.event === 'puzzle_completed') {
                    visitor.puzzlesCompleted++;
                    if (event.solved) visitor.puzzlesSolved++;
                }
            }
        });
        
        // Convert to array and filter to anonymous players only (those who played while anonymous)
        const allVisitors = Object.values(visitorData).filter(v => v.puzzlesCompleted > 0);
        const anonymousVisitors = allVisitors.filter(v => !v.signedUp);
        
        // Build AnonymousVisitor objects
        const buildVisitor = (v: typeof visitorData[string]): AnonymousVisitor => ({
            visitorId: v.visitorId,
            puzzlesPlayed: v.puzzlesCompleted,
            puzzlesSolved: v.puzzlesSolved,
            winRate: v.puzzlesCompleted > 0 ? Math.round((v.puzzlesSolved / v.puzzlesCompleted) * 100) : 0,
            firstSeen: v.firstSeen,
            lastSeen: v.lastSeen,
            convertedToSignup: v.signedUp,
        });
        
        const anonymousVisitorList = anonymousVisitors.map(buildVisitor);
        const allVisitorList = allVisitors.map(buildVisitor);
        
        // Aggregate stats for anonymous users
        const totalAnonymousPuzzlesPlayed = anonymousVisitors.reduce((sum, v) => sum + v.puzzlesCompleted, 0);
        const totalAnonymousPuzzlesSolved = anonymousVisitors.reduce((sum, v) => sum + v.puzzlesSolved, 0);
        
        // Engagement breakdown
        const visitorsWithOnePuzzle = anonymousVisitors.filter(v => v.puzzlesCompleted === 1).length;
        const visitorsWith2to5Puzzles = anonymousVisitors.filter(v => v.puzzlesCompleted >= 2 && v.puzzlesCompleted <= 5).length;
        const visitorsWith6PlusPuzzles = anonymousVisitors.filter(v => v.puzzlesCompleted >= 6).length;
        
        // Avg puzzles for converters (from signup events)
        const signupEvents = analyticsEvents.filter(e => e.event === 'signup_completed' && e.puzzlesPlayedBefore != null);
        const avgPuzzlesBeforeSignup = signupEvents.length > 0
            ? Math.round((signupEvents.reduce((sum, e) => sum + (e.puzzlesPlayedBefore || 0), 0) / signupEvents.length) * 10) / 10
            : 0;
        
        // Avg puzzles for non-converters who played 3+
        const nonConverters3Plus = anonymousVisitors.filter(v => v.puzzlesCompleted >= 3);
        const avgPuzzlesForNonConverters = nonConverters3Plus.length > 0
            ? Math.round((nonConverters3Plus.reduce((sum, v) => sum + v.puzzlesCompleted, 0) / nonConverters3Plus.length) * 10) / 10
            : 0;
        
        // Power users: 5+ puzzles, not signed up, sorted by puzzles played
        const powerUsers = anonymousVisitorList
            .filter(v => v.puzzlesPlayed >= 5 && !v.convertedToSignup)
            .sort((a, b) => b.puzzlesPlayed - a.puzzlesPlayed);
        
        // ALL ACTIVITY metrics (including converters)
        const allActivityTotalPuzzles = allVisitors.reduce((sum, v) => sum + v.puzzlesCompleted, 0);
        const allActivityTotalSolved = allVisitors.reduce((sum, v) => sum + v.puzzlesSolved, 0);
        const convertedCount = allVisitors.filter(v => v.signedUp).length;
        
        return {
            totalAnonymousVisitors: anonymousVisitors.length,
            totalAnonymousPuzzlesPlayed,
            totalAnonymousPuzzlesSolved,
            anonymousWinRate: totalAnonymousPuzzlesPlayed > 0 
                ? Math.round((totalAnonymousPuzzlesSolved / totalAnonymousPuzzlesPlayed) * 100) 
                : 0,
            avgPuzzlesPerAnonymousVisitor: anonymousVisitors.length > 0
                ? Math.round((totalAnonymousPuzzlesPlayed / anonymousVisitors.length) * 10) / 10
                : 0,
            visitorsWithOnePuzzle,
            visitorsWith2to5Puzzles,
            visitorsWith6PlusPuzzles,
            avgPuzzlesBeforeSignup,
            avgPuzzlesForNonConverters,
            powerUsers,
            allAnonymousVisitors: anonymousVisitorList.sort((a, b) => b.puzzlesPlayed - a.puzzlesPlayed),
            allActivity: {
                totalVisitors: allVisitors.length,
                totalPuzzlesPlayed: allActivityTotalPuzzles,
                totalPuzzlesSolved: allActivityTotalSolved,
                winRate: allActivityTotalPuzzles > 0 
                    ? Math.round((allActivityTotalSolved / allActivityTotalPuzzles) * 100) 
                    : 0,
                avgPuzzlesPerVisitor: allVisitors.length > 0
                    ? Math.round((allActivityTotalPuzzles / allVisitors.length) * 10) / 10
                    : 0,
                convertedCount,
                conversionRate: allVisitors.length > 0
                    ? Math.round((convertedCount / allVisitors.length) * 100)
                    : 0,
                visitors: allVisitorList.sort((a, b) => b.puzzlesPlayed - a.puzzlesPlayed),
            },
        };
    }, [analyticsEvents]);

    return {
        players,
        loading,
        error,
        isAdmin,
        fetchPlayers,
        calculateMetrics,
        calculateHistoricalMetrics,
        calculateConversionMetrics,
        calculateAnonymousMetrics,
        getLeaderboard,
        searchPlayers,
    };
};

