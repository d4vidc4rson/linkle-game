// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import type { PlayerData } from '../types';
import { formatDateKey } from '../dailySchedule';

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
    monthlyActiveUsers: number;
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
    
    // Active user counts (for engagement metrics toggle)
    dailyActiveAnonymous: number;   // Visitors who played today
    weeklyActiveAnonymous: number;  // Visitors who played within 7 days
    monthlyActiveAnonymous: number; // Visitors who played within 30 days
    
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

// Retention cohort data for a single week
export interface RetentionCohort {
    weekStart: string; // YYYY-MM-DD (Monday of the week)
    weekLabel: string; // "Dec 2-8" display format
    newPlayers: number; // Players who first played this week
    d1Retained: number; // % who returned day after first play
    d7Retained: number; // % who returned within 7 days
    d28Retained: number; // % who returned within 28 days
    d1Count: number; // Absolute count for D1
    d7Count: number; // Absolute count for D7
    d28Count: number; // Absolute count for D28
}

export interface RetentionMetrics {
    cohorts: RetentionCohort[];
    overallD1: number; // Overall D1 retention %
    overallD7: number; // Overall D7 retention %
    overallD28: number; // Overall D28 retention %
    totalNewPlayers: number;
    avgPuzzlesBeforeReturn: number; // Avg puzzles played before first return
    streakPlayers: number; // Players who played 3+ consecutive days
    streakPlayerPercent: number;
}

// Puzzle Quality metrics for Insights tab
export interface DifficultyStats {
    difficulty: string;
    totalPlays: number;
    solves: number;
    solveRate: number;
    avgMoves: number;
    avgTimeSeconds: number;
}

export interface PuzzleStats {
    puzzleId: number;
    difficulty: string;
    plays: number;
    solves: number;
    solveRate: number;
    avgMoves: number;
    avgTimeSeconds: number;
}

export interface PuzzleQualityMetrics {
    byDifficulty: DifficultyStats[];
    strugglePuzzles: PuzzleStats[]; // High moves + low solve rate
    satisfyingPuzzles: PuzzleStats[]; // Low moves + high solve rate
    totalPuzzlesAnalyzed: number;
}

// Engagement metrics for Insights tab
export interface BadgeEngagement {
    badgeId: string;
    views: number;
    unlocks: number;
    viewedWhileUnlocked: number; // Views where badge was already unlocked
}

export interface EngagementMetrics {
    explanationViewRate: number; // % of solves that viewed explanation
    explanationViews: number;
    totalSolves: number;
    badgeViewsPerPlayer: number;
    totalBadgeViews: number;
    topViewedBadges: BadgeEngagement[];
    bonusParticipationRate: number; // % of completed days that started bonus
    bonusStarts: number;
    completedDays: number;
}

// Feature usage metrics for Insights tab
export interface FeatureUsageMetrics {
    archivePlays: number;
    archivePlayersCount: number;
    avgArchivePlaysPerUser: number;
    daysAgoDistribution: Record<string, number>; // "1-7": 10, "8-14": 5, etc.
    lightModeUsers: number;
    darkModeUsers: number;
    themeToggleCount: number;
    themePreferencePercent: { light: number; dark: number };
}

// Win rate trend data point for Trends tab
export interface WinRateTrendPoint {
    date: string;
    displayDate: string;
    easyWinRate: number;
    hardWinRate: number;
    impossibleWinRate: number;
    easyPlayed: number;
    hardPlayed: number;
    impossiblePlayed: number;
}

// Engagement trend data point for Trends tab
export interface EngagementTrendPoint {
    date: string;
    displayDate: string;
    puzzlesStarted: number;
    puzzlesCompleted: number;
    shareClicks: number;
    completionRate: number;
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
        const todayStr = formatDateKey(today);
        
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekAgoStr = formatDateKey(weekAgo);

        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        const monthAgoStr = formatDateKey(monthAgo);

        let dailyActive = 0;
        let weeklyActive = 0;
        let monthlyActive = 0;
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
            
            // Check daily/weekly/monthly active based on actual activity in dailyResults
            // This is more accurate than relying on lastPlayedDate which may not be set
            let isActiveToday = false;
            let isActiveThisWeek = false;
            let isActiveThisMonth = false;
            
            for (const dateKey of Object.keys(dailyResults)) {
                const dayResult = dailyResults[dateKey];
                const hasActivity = dayResult?.easy || dayResult?.hard || dayResult?.impossible || dayResult?.bonus;
                if (hasActivity) {
                    if (dateKey === todayStr) {
                        isActiveToday = true;
                        isActiveThisWeek = true;
                        isActiveThisMonth = true;
                    } else if (dateKey >= weekAgoStr) {
                        isActiveThisWeek = true;
                        isActiveThisMonth = true;
                    } else if (dateKey >= monthAgoStr) {
                        isActiveThisMonth = true;
                    }
                }
            }
            
            if (isActiveToday) dailyActive++;
            if (isActiveThisWeek) weeklyActive++;
            if (isActiveThisMonth) monthlyActive++;

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
            monthlyActiveUsers: monthlyActive,
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
        
        // For "all", find the earliest date with player data
        let startDate: Date;
        if (timeRange === 'all') {
            // Find earliest date from player dailyResults
            let earliestDate: string | null = null;
            players.forEach(player => {
                const results = player.playerData.dailyResults;
                if (results) {
                    Object.keys(results).forEach(dateKey => {
                        if (!earliestDate || dateKey < earliestDate) {
                            earliestDate = dateKey;
                        }
                    });
                }
            });
            
            if (earliestDate) {
                startDate = new Date(earliestDate + 'T00:00:00');
            } else {
                startDate = new Date(today);
                startDate.setDate(startDate.getDate() - 7); // Default to 7 days if no data
            }
        } else if (timeRange === 'today') {
            startDate = new Date(today);
        } else {
            // Determine date range for fixed periods
            let daysToShow = 7;
            if (timeRange === '14days') daysToShow = 14;
            else if (timeRange === '28days') daysToShow = 28;
            startDate = new Date(today);
            startDate.setDate(startDate.getDate() - daysToShow + 1);
        }
        
        // Generate array of dates from start to today
        const dates: string[] = [];
        const currentDate = new Date(startDate);
        while (currentDate <= today) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
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

    // Calculate historical metrics for anonymous users from analytics events
    const calculateAnonymousHistoricalMetrics = useCallback((timeRange: TimeRange): DailyDataPoint[] => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // For "all", find the earliest date with analytics data
        let startDate: Date;
        if (timeRange === 'all') {
            const eventsWithDates = analyticsEvents.filter(e => e.date);
            if (eventsWithDates.length === 0) {
                startDate = new Date(today);
                startDate.setDate(startDate.getDate() - 7);
            } else {
                const earliestDate = eventsWithDates.reduce((min, e) => e.date < min ? e.date : min, eventsWithDates[0].date);
                startDate = new Date(earliestDate + 'T00:00:00');
            }
        } else if (timeRange === 'today') {
            startDate = new Date(today);
        } else {
            let daysToShow = 7;
            if (timeRange === '14days') daysToShow = 14;
            else if (timeRange === '28days') daysToShow = 28;
            startDate = new Date(today);
            startDate.setDate(startDate.getDate() - daysToShow + 1);
        }
        
        // Generate array of dates from start to today
        const dates: string[] = [];
        const currentDate = new Date(startDate);
        while (currentDate <= today) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
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
        
        // Get visitor IDs that eventually signed up (to exclude them)
        const signedUpVisitorIds = new Set(
            analyticsEvents
                .filter(e => e.event === 'signup_completed')
                .map(e => e.visitorId)
        );
        
        // Track unique visitors per date and cumulative visitors
        const visitorsPerDate: Record<string, Set<string>> = {};
        const allVisitorsByDate: Record<string, Set<string>> = {}; // Cumulative
        dates.forEach(date => {
            visitorsPerDate[date] = new Set();
            allVisitorsByDate[date] = new Set();
        });
        
        // Process analytics events for anonymous users only
        analyticsEvents.forEach(event => {
            const vid = event.visitorId;
            if (!vid || !event.isAnonymous) return;
            
            // Exclude visitors who later signed up
            if (signedUpVisitorIds.has(vid)) return;
            
            const eventDate = event.date || event.timestamp?.split('T')[0];
            if (!eventDate || !dataByDate[eventDate]) return;
            
            // Track active visitors per date
            if (event.event === 'puzzle_completed') {
                visitorsPerDate[eventDate].add(vid);
                dataByDate[eventDate].puzzlesPlayed++;
                if (event.solved) {
                    dataByDate[eventDate].puzzlesSolved++;
                }
            }
        });
        
        // Track first seen date for each anonymous visitor (for cumulative count)
        const visitorFirstSeen: Record<string, string> = {};
        analyticsEvents.forEach(event => {
            const vid = event.visitorId;
            if (!vid || !event.isAnonymous) return;
            if (signedUpVisitorIds.has(vid)) return;
            
            const eventDate = event.date || event.timestamp?.split('T')[0];
            if (!eventDate) return;
            
            if (event.event === 'puzzle_completed') {
                if (!visitorFirstSeen[vid] || eventDate < visitorFirstSeen[vid]) {
                    visitorFirstSeen[vid] = eventDate;
                }
            }
        });
        
        // Calculate cumulative visitors and new visitors per date
        let cumulativeVisitors = 0;
        
        // Count visitors who were first seen before the date range
        Object.entries(visitorFirstSeen).forEach(([vid, firstDate]) => {
            if (firstDate < dates[0]) {
                cumulativeVisitors++;
            }
        });
        
        dates.forEach(date => {
            // Count new visitors on this date
            const newVisitors = Object.entries(visitorFirstSeen)
                .filter(([vid, firstDate]) => firstDate === date)
                .length;
            
            dataByDate[date].newSignups = newVisitors; // Using newSignups field for "new visitors"
            cumulativeVisitors += newVisitors;
            dataByDate[date].cumulativeUsers = cumulativeVisitors;
            
            // DAU = unique visitors who completed puzzles on this date
            dataByDate[date].dau = visitorsPerDate[date].size;
            
            // Calculate win rate
            const played = dataByDate[date].puzzlesPlayed;
            const solved = dataByDate[date].puzzlesSolved;
            dataByDate[date].winRate = played > 0 ? Math.round((solved / played) * 100) : 0;
            
            // Calculate stickiness (DAU / Total Visitors %)
            const dau = dataByDate[date].dau;
            dataByDate[date].stickiness = cumulativeVisitors > 0 ? Math.round((dau / cumulativeVisitors) * 100) : 0;
        });
        
        return dates.map(date => dataByDate[date]);
    }, [analyticsEvents]);

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
        
        // Calculate DAU/WAU/MAU for anonymous users based on lastSeen
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().split('T')[0];
        
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekAgoStr = weekAgo.toISOString().split('T')[0];
        
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        const monthAgoStr = monthAgo.toISOString().split('T')[0];
        
        let dailyActiveAnonymous = 0;
        let weeklyActiveAnonymous = 0;
        let monthlyActiveAnonymous = 0;
        
        anonymousVisitors.forEach(v => {
            const lastSeenDate = v.lastSeen.split('T')[0];
            if (lastSeenDate >= todayStr) {
                dailyActiveAnonymous++;
                weeklyActiveAnonymous++;
                monthlyActiveAnonymous++;
            } else if (lastSeenDate >= weekAgoStr) {
                weeklyActiveAnonymous++;
                monthlyActiveAnonymous++;
            } else if (lastSeenDate >= monthAgoStr) {
                monthlyActiveAnonymous++;
            }
        });
        
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
            dailyActiveAnonymous,
            weeklyActiveAnonymous,
            monthlyActiveAnonymous,
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

    // Calculate retention cohort metrics from analytics events
    // userFilter: 'all' = everyone, 'signedUp' = only signed-up users, 'anonymous' = only never-signed-up users
    const calculateRetentionMetrics = useCallback((userFilter: 'all' | 'signedUp' | 'anonymous' = 'all'): RetentionMetrics => {
        // Get visitor IDs that signed up (have a signup_completed event)
        const signedUpVisitorIds = new Set(
            analyticsEvents
                .filter(e => e.event === 'signup_completed')
                .map(e => e.visitorId)
        );
        
        // Build visitor activity map: visitorId -> { firstSeen, allPlayDates }
        const visitorActivity: Record<string, { firstSeen: string; playDates: Set<string> }> = {};
        
        analyticsEvents
            .filter(e => e.event === 'puzzle_completed')
            .forEach(e => {
                const vid = e.visitorId;
                const date = e.date;
                
                // Apply user filter
                const isSignedUp = signedUpVisitorIds.has(vid);
                if (userFilter === 'signedUp' && !isSignedUp) return;
                if (userFilter === 'anonymous' && isSignedUp) return;
                
                if (!visitorActivity[vid]) {
                    visitorActivity[vid] = { firstSeen: date, playDates: new Set() };
                }
                
                visitorActivity[vid].playDates.add(date);
                
                // Update firstSeen if this date is earlier
                if (date < visitorActivity[vid].firstSeen) {
                    visitorActivity[vid].firstSeen = date;
                }
            });
        
        const visitors = Object.entries(visitorActivity);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().split('T')[0];
        
        // Helper to calculate days between dates
        const daysBetween = (d1: string, d2: string): number => {
            const date1 = new Date(d1);
            const date2 = new Date(d2);
            return Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
        };
        
        // Helper to get Monday of a week
        const getMonday = (dateStr: string): string => {
            const date = new Date(dateStr);
            const day = date.getDay();
            const diff = date.getDate() - day + (day === 0 ? -6 : 1);
            date.setDate(diff);
            return date.toISOString().split('T')[0];
        };
        
        // Helper to format week label
        const formatWeekLabel = (mondayStr: string): string => {
            const monday = new Date(mondayStr);
            const sunday = new Date(monday);
            sunday.setDate(sunday.getDate() + 6);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${monthNames[monday.getMonth()]} ${monday.getDate()}-${sunday.getDate()}`;
        };
        
        // Group visitors by week of first play
        const cohortsByWeek: Record<string, { 
            visitors: Array<{ firstSeen: string; playDates: Set<string> }>;
        }> = {};
        
        visitors.forEach(([vid, data]) => {
            const weekStart = getMonday(data.firstSeen);
            if (!cohortsByWeek[weekStart]) {
                cohortsByWeek[weekStart] = { visitors: [] };
            }
            cohortsByWeek[weekStart].visitors.push(data);
        });
        
        // Calculate retention for each cohort
        const cohorts: RetentionCohort[] = Object.entries(cohortsByWeek)
            .sort((a, b) => b[0].localeCompare(a[0])) // Newest first
            .slice(0, 8) // Last 8 weeks
            .map(([weekStart, { visitors: cohortVisitors }]) => {
                let d1Count = 0;
                let d7Count = 0;
                let d28Count = 0;
                
                cohortVisitors.forEach(visitor => {
                    const firstPlayDate = visitor.firstSeen;
                    const playDatesArr = Array.from(visitor.playDates);
                    
                    // Check D1: Did they play on day after first play?
                    const nextDay = new Date(firstPlayDate);
                    nextDay.setDate(nextDay.getDate() + 1);
                    const nextDayStr = nextDay.toISOString().split('T')[0];
                    if (visitor.playDates.has(nextDayStr)) {
                        d1Count++;
                    }
                    
                    // Check D7: Did they play any day between day 2-7 after first play?
                    const hasD7Return = playDatesArr.some(date => {
                        const daysAfter = daysBetween(firstPlayDate, date);
                        return daysAfter >= 2 && daysAfter <= 7;
                    });
                    if (hasD7Return) d7Count++;
                    
                    // Check D28: Did they play any day between day 8-28 after first play?
                    const hasD28Return = playDatesArr.some(date => {
                        const daysAfter = daysBetween(firstPlayDate, date);
                        return daysAfter >= 8 && daysAfter <= 28;
                    });
                    if (hasD28Return) d28Count++;
                });
                
                const newPlayers = cohortVisitors.length;
                
                return {
                    weekStart,
                    weekLabel: formatWeekLabel(weekStart),
                    newPlayers,
                    d1Retained: newPlayers > 0 ? Math.round((d1Count / newPlayers) * 100) : 0,
                    d7Retained: newPlayers > 0 ? Math.round((d7Count / newPlayers) * 100) : 0,
                    d28Retained: newPlayers > 0 ? Math.round((d28Count / newPlayers) * 100) : 0,
                    d1Count,
                    d7Count,
                    d28Count,
                };
            });
        
        // Calculate overall metrics
        let totalD1 = 0, totalD7 = 0, totalD28 = 0, totalNew = 0;
        let totalPuzzlesBeforeReturn = 0, returnVisitorCount = 0;
        let streakPlayers = 0;
        
        visitors.forEach(([vid, data]) => {
            totalNew++;
            const firstPlayDate = data.firstSeen;
            const playDatesArr = Array.from(data.playDates).sort();
            
            // D1
            const nextDay = new Date(firstPlayDate);
            nextDay.setDate(nextDay.getDate() + 1);
            if (data.playDates.has(nextDay.toISOString().split('T')[0])) totalD1++;
            
            // D7
            if (playDatesArr.some(d => { const days = daysBetween(firstPlayDate, d); return days >= 2 && days <= 7; })) totalD7++;
            
            // D28
            if (playDatesArr.some(d => { const days = daysBetween(firstPlayDate, d); return days >= 8 && days <= 28; })) totalD28++;
            
            // Calculate puzzles before first return
            if (playDatesArr.length > 1) {
                // Find puzzles played on first day
                const firstDayPuzzles = analyticsEvents.filter(e => 
                    e.visitorId === vid && 
                    e.event === 'puzzle_completed' && 
                    e.date === firstPlayDate
                ).length;
                totalPuzzlesBeforeReturn += firstDayPuzzles;
                returnVisitorCount++;
            }
            
            // Check for 3+ consecutive days (streak player)
            if (playDatesArr.length >= 3) {
                for (let i = 0; i < playDatesArr.length - 2; i++) {
                    const d1 = new Date(playDatesArr[i]);
                    const d2 = new Date(playDatesArr[i + 1]);
                    const d3 = new Date(playDatesArr[i + 2]);
                    
                    const diff1 = (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
                    const diff2 = (d3.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
                    
                    if (diff1 === 1 && diff2 === 1) {
                        streakPlayers++;
                        break;
                    }
                }
            }
        });
        
        return {
            cohorts,
            overallD1: totalNew > 0 ? Math.round((totalD1 / totalNew) * 100) : 0,
            overallD7: totalNew > 0 ? Math.round((totalD7 / totalNew) * 100) : 0,
            overallD28: totalNew > 0 ? Math.round((totalD28 / totalNew) * 100) : 0,
            totalNewPlayers: totalNew,
            avgPuzzlesBeforeReturn: returnVisitorCount > 0 
                ? Math.round((totalPuzzlesBeforeReturn / returnVisitorCount) * 10) / 10 
                : 0,
            streakPlayers,
            streakPlayerPercent: totalNew > 0 ? Math.round((streakPlayers / totalNew) * 100) : 0,
        };
    }, [analyticsEvents]);

    // Calculate Puzzle Quality metrics for Insights tab
    const calculatePuzzleQualityMetrics = useCallback((): PuzzleQualityMetrics => {
        const puzzleCompletions = analyticsEvents.filter(e => e.event === 'puzzle_completed');
        
        // Aggregate by difficulty
        const difficultyMap: Record<string, { plays: number; solves: number; totalMoves: number; totalTime: number; movesCount: number; timeCount: number }> = {};
        
        // Aggregate by puzzle ID
        const puzzleMap: Record<number, { difficulty: string; plays: number; solves: number; totalMoves: number; totalTime: number; movesCount: number; timeCount: number }> = {};
        
        puzzleCompletions.forEach(e => {
            const diff = e.difficulty || 'unknown';
            const puzzleId = e.puzzleId;
            const solved = e.solved === true;
            const moves = e.movesCount ?? 0;
            const time = e.timeSpentSeconds ?? 0;
            
            // By difficulty
            if (!difficultyMap[diff]) {
                difficultyMap[diff] = { plays: 0, solves: 0, totalMoves: 0, totalTime: 0, movesCount: 0, timeCount: 0 };
            }
            difficultyMap[diff].plays++;
            if (solved) difficultyMap[diff].solves++;
            if (moves > 0) {
                difficultyMap[diff].totalMoves += moves;
                difficultyMap[diff].movesCount++;
            }
            if (time > 0) {
                difficultyMap[diff].totalTime += time;
                difficultyMap[diff].timeCount++;
            }
            
            // By puzzle ID
            if (puzzleId !== undefined && puzzleId !== null) {
                if (!puzzleMap[puzzleId]) {
                    puzzleMap[puzzleId] = { difficulty: diff, plays: 0, solves: 0, totalMoves: 0, totalTime: 0, movesCount: 0, timeCount: 0 };
                }
                puzzleMap[puzzleId].plays++;
                if (solved) puzzleMap[puzzleId].solves++;
                if (moves > 0) {
                    puzzleMap[puzzleId].totalMoves += moves;
                    puzzleMap[puzzleId].movesCount++;
                }
                if (time > 0) {
                    puzzleMap[puzzleId].totalTime += time;
                    puzzleMap[puzzleId].timeCount++;
                }
            }
        });
        
        // Convert difficulty map to array
        const byDifficulty: DifficultyStats[] = ['easy', 'hard', 'impossible', 'bonus']
            .filter(d => difficultyMap[d])
            .map(d => {
                const stats = difficultyMap[d];
                return {
                    difficulty: d.charAt(0).toUpperCase() + d.slice(1),
                    totalPlays: stats.plays,
                    solves: stats.solves,
                    solveRate: stats.plays > 0 ? Math.round((stats.solves / stats.plays) * 100) : 0,
                    avgMoves: stats.movesCount > 0 ? Math.round((stats.totalMoves / stats.movesCount) * 10) / 10 : 0,
                    avgTimeSeconds: stats.timeCount > 0 ? Math.round(stats.totalTime / stats.timeCount) : 0,
                };
            });
        
        // Convert puzzle map to array with stats
        const puzzleStats: PuzzleStats[] = Object.entries(puzzleMap)
            .filter(([_, stats]) => stats.plays >= 3) // Only include puzzles with enough data
            .map(([id, stats]) => ({
                puzzleId: parseInt(id),
                difficulty: stats.difficulty,
                plays: stats.plays,
                solves: stats.solves,
                solveRate: stats.plays > 0 ? Math.round((stats.solves / stats.plays) * 100) : 0,
                avgMoves: stats.movesCount > 0 ? Math.round((stats.totalMoves / stats.movesCount) * 10) / 10 : 0,
                avgTimeSeconds: stats.timeCount > 0 ? Math.round(stats.totalTime / stats.timeCount) : 0,
            }));
        
        // Struggle puzzles: low solve rate + high moves (weighted score)
        const strugglePuzzles = [...puzzleStats]
            .filter(p => p.solveRate < 80) // Below 80% solve rate
            .sort((a, b) => {
                const scoreA = (100 - a.solveRate) + (a.avgMoves * 5);
                const scoreB = (100 - b.solveRate) + (b.avgMoves * 5);
                return scoreB - scoreA;
            })
            .slice(0, 5);
        
        // Satisfying puzzles: high solve rate + low moves
        const satisfyingPuzzles = [...puzzleStats]
            .filter(p => p.solveRate >= 70) // At least 70% solve rate
            .sort((a, b) => {
                const scoreA = a.solveRate - (a.avgMoves * 3);
                const scoreB = b.solveRate - (b.avgMoves * 3);
                return scoreB - scoreA;
            })
            .slice(0, 5);
        
        return {
            byDifficulty,
            strugglePuzzles,
            satisfyingPuzzles,
            totalPuzzlesAnalyzed: puzzleStats.length,
        };
    }, [analyticsEvents]);

    // Calculate Engagement metrics for Insights tab
    const calculateEngagementMetrics = useCallback((): EngagementMetrics => {
        const explanationViews = analyticsEvents.filter(e => e.event === 'explanation_viewed').length;
        const puzzleSolves = analyticsEvents.filter(e => e.event === 'puzzle_completed' && e.solved === true).length;
        
        const badgeViews = analyticsEvents.filter(e => e.event === 'badge_viewed');
        const badgeUnlocks = analyticsEvents.filter(e => e.event === 'badge_unlocked');
        const bonusStarts = analyticsEvents.filter(e => e.event === 'bonus_round_started').length;
        
        // Count unique visitors who viewed badges
        const badgeViewers = new Set(badgeViews.map(e => e.visitorId)).size;
        
        // Count completed days (all 3 puzzles done in a day)
        const completedDaysByVisitor: Record<string, Set<string>> = {};
        analyticsEvents
            .filter(e => e.event === 'puzzle_completed' && e.difficulty !== 'bonus')
            .forEach(e => {
                const vid = e.visitorId;
                const date = e.date;
                if (!completedDaysByVisitor[vid]) completedDaysByVisitor[vid] = new Set();
                completedDaysByVisitor[vid].add(`${date}_${e.difficulty}`);
            });
        
        // Count days where a visitor completed all 3 puzzles
        let completedDays = 0;
        Object.values(completedDaysByVisitor).forEach(dateSet => {
            const dateMap: Record<string, Set<string>> = {};
            dateSet.forEach(key => {
                const [date, diff] = key.split('_');
                if (!dateMap[date]) dateMap[date] = new Set();
                dateMap[date].add(diff);
            });
            Object.values(dateMap).forEach(diffs => {
                if (diffs.size >= 3) completedDays++;
            });
        });
        
        // Aggregate badge views by badge ID
        const badgeEngagementMap: Record<string, { views: number; unlocks: number; viewedWhileUnlocked: number }> = {};
        badgeViews.forEach(e => {
            const id = e.badgeId || 'unknown';
            if (!badgeEngagementMap[id]) badgeEngagementMap[id] = { views: 0, unlocks: 0, viewedWhileUnlocked: 0 };
            badgeEngagementMap[id].views++;
            if (e.wasUnlocked) badgeEngagementMap[id].viewedWhileUnlocked++;
        });
        badgeUnlocks.forEach(e => {
            const id = e.badgeId || 'unknown';
            if (!badgeEngagementMap[id]) badgeEngagementMap[id] = { views: 0, unlocks: 0, viewedWhileUnlocked: 0 };
            badgeEngagementMap[id].unlocks++;
        });
        
        const topViewedBadges: BadgeEngagement[] = Object.entries(badgeEngagementMap)
            .map(([id, stats]) => ({ badgeId: id, ...stats }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);
        
        return {
            explanationViewRate: puzzleSolves > 0 ? Math.round((explanationViews / puzzleSolves) * 100) : 0,
            explanationViews,
            totalSolves: puzzleSolves,
            badgeViewsPerPlayer: badgeViewers > 0 ? Math.round((badgeViews.length / badgeViewers) * 10) / 10 : 0,
            totalBadgeViews: badgeViews.length,
            topViewedBadges,
            bonusParticipationRate: completedDays > 0 ? Math.round((bonusStarts / completedDays) * 100) : 0,
            bonusStarts,
            completedDays,
        };
    }, [analyticsEvents]);

    // Calculate Feature Usage metrics for Insights tab
    const calculateFeatureUsageMetrics = useCallback((): FeatureUsageMetrics => {
        const archiveEvents = analyticsEvents.filter(e => e.event === 'archive_puzzle_started');
        const themeEvents = analyticsEvents.filter(e => e.event === 'theme_changed');
        
        // Archive stats
        const archivePlayers = new Set(archiveEvents.map(e => e.visitorId));
        
        // Days ago distribution
        const daysAgoDistribution: Record<string, number> = {
            '1-7': 0,
            '8-14': 0,
            '15-30': 0,
            '30+': 0,
        };
        archiveEvents.forEach(e => {
            const daysAgo = e.daysAgo || 0;
            if (daysAgo <= 7) daysAgoDistribution['1-7']++;
            else if (daysAgo <= 14) daysAgoDistribution['8-14']++;
            else if (daysAgo <= 30) daysAgoDistribution['15-30']++;
            else daysAgoDistribution['30+']++;
        });
        
        // Theme preference - get last theme change per user
        const userThemes: Record<string, string> = {};
        themeEvents.forEach(e => {
            userThemes[e.visitorId] = e.newTheme;
        });
        
        let lightUsers = 0;
        let darkUsers = 0;
        Object.values(userThemes).forEach(theme => {
            if (theme === 'light') lightUsers++;
            else if (theme === 'dark') darkUsers++;
        });
        
        const totalThemeUsers = lightUsers + darkUsers;
        
        return {
            archivePlays: archiveEvents.length,
            archivePlayersCount: archivePlayers.size,
            avgArchivePlaysPerUser: archivePlayers.size > 0 
                ? Math.round((archiveEvents.length / archivePlayers.size) * 10) / 10 
                : 0,
            daysAgoDistribution,
            lightModeUsers: lightUsers,
            darkModeUsers: darkUsers,
            themeToggleCount: themeEvents.length,
            themePreferencePercent: {
                light: totalThemeUsers > 0 ? Math.round((lightUsers / totalThemeUsers) * 100) : 50,
                dark: totalThemeUsers > 0 ? Math.round((darkUsers / totalThemeUsers) * 100) : 50,
            },
        };
    }, [analyticsEvents]);

    // Calculate win rate trend by difficulty over time for Trends tab
    // userFilter: 'all' = everyone, 'signedUp' = only signed-up users, 'anonymous' = only never-signed-up users
    const calculateWinRateTrend = useCallback((timeRange: TimeRange = '28days', userFilter: 'all' | 'signedUp' | 'anonymous' = 'all'): WinRateTrendPoint[] => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Get visitor IDs that signed up
        const signedUpVisitorIds = new Set(
            analyticsEvents
                .filter(e => e.event === 'signup_completed')
                .map(e => e.visitorId)
        );
        
        // Filter events based on user filter
        const filteredEvents = analyticsEvents.filter(e => {
            if (e.event !== 'puzzle_completed') return false;
            const isSignedUp = signedUpVisitorIds.has(e.visitorId);
            if (userFilter === 'signedUp' && !isSignedUp) return false;
            if (userFilter === 'anonymous' && isSignedUp) return false;
            return true;
        });
        
        // For "all", find the earliest date with data
        let startDate: Date;
        if (timeRange === 'all') {
            const puzzleEvents = filteredEvents.filter(e => e.date);
            if (puzzleEvents.length === 0) {
                startDate = new Date(today);
                startDate.setDate(startDate.getDate() - 7); // Default to 7 days if no data
            } else {
                const earliestDate = puzzleEvents.reduce((min, e) => e.date < min ? e.date : min, puzzleEvents[0].date);
                startDate = new Date(earliestDate + 'T00:00:00');
            }
        } else {
            // Determine date range for fixed periods
            let daysToShow = 28;
            if (timeRange === '7days') daysToShow = 7;
            else if (timeRange === '14days') daysToShow = 14;
            startDate = new Date(today);
            startDate.setDate(startDate.getDate() - daysToShow + 1);
        }
        
        // Generate array of all dates from start to today
        const dates: string[] = [];
        const currentDate = new Date(startDate);
        while (currentDate <= today) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        // Initialize data for each date
        const dailyStats: Record<string, {
            easy: { played: number; solved: number };
            hard: { played: number; solved: number };
            impossible: { played: number; solved: number };
        }> = {};
        
        dates.forEach(date => {
            dailyStats[date] = {
                easy: { played: 0, solved: 0 },
                hard: { played: 0, solved: 0 },
                impossible: { played: 0, solved: 0 },
            };
        });
        
        // Fill in actual data from filtered events
        filteredEvents
            .filter(e => dailyStats[e.date])
            .forEach(e => {
                const date = e.date;
                const diff = e.difficulty || 'easy';
                const solved = e.solved === true;
                
                if (diff === 'easy' || diff === 'hard' || diff === 'impossible') {
                    dailyStats[date][diff].played++;
                    if (solved) dailyStats[date][diff].solved++;
                }
            });
        
        // Convert to array sorted by date
        return dates.map(date => {
            const stats = dailyStats[date];
            const d = new Date(date + 'T00:00:00');
            return {
                date,
                displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                easyWinRate: stats.easy.played > 0 
                    ? Math.round((stats.easy.solved / stats.easy.played) * 100) : 0,
                hardWinRate: stats.hard.played > 0 
                    ? Math.round((stats.hard.solved / stats.hard.played) * 100) : 0,
                impossibleWinRate: stats.impossible.played > 0 
                    ? Math.round((stats.impossible.solved / stats.impossible.played) * 100) : 0,
                easyPlayed: stats.easy.played,
                hardPlayed: stats.hard.played,
                impossiblePlayed: stats.impossible.played,
            };
        });
    }, [analyticsEvents]);

    // Calculate engagement trend (started, completed, shared) for Trends tab
    // userFilter: 'all' = everyone, 'signedUp' = only signed-up users, 'anonymous' = only never-signed-up users
    const calculateEngagementTrend = useCallback((timeRange: TimeRange = '28days', userFilter: 'all' | 'signedUp' | 'anonymous' = 'all'): EngagementTrendPoint[] => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Get visitor IDs that signed up
        const signedUpVisitorIds = new Set(
            analyticsEvents
                .filter(e => e.event === 'signup_completed')
                .map(e => e.visitorId)
        );
        
        // Filter events based on user filter
        const filterByUser = (e: any) => {
            const isSignedUp = signedUpVisitorIds.has(e.visitorId);
            if (userFilter === 'signedUp' && !isSignedUp) return false;
            if (userFilter === 'anonymous' && isSignedUp) return false;
            return true;
        };
        
        // For "all", find the earliest date with data
        let startDate: Date;
        if (timeRange === 'all') {
            const relevantEvents = analyticsEvents.filter(e => 
                (e.event === 'puzzle_started' || e.event === 'puzzle_completed' || e.event === 'share_clicked') && 
                e.date && filterByUser(e)
            );
            if (relevantEvents.length === 0) {
                startDate = new Date(today);
                startDate.setDate(startDate.getDate() - 7); // Default to 7 days if no data
            } else {
                const earliestDate = relevantEvents.reduce((min, e) => e.date < min ? e.date : min, relevantEvents[0].date);
                startDate = new Date(earliestDate + 'T00:00:00');
            }
        } else {
            // Determine date range for fixed periods
            let daysToShow = 28;
            if (timeRange === '7days') daysToShow = 7;
            else if (timeRange === '14days') daysToShow = 14;
            startDate = new Date(today);
            startDate.setDate(startDate.getDate() - daysToShow + 1);
        }
        
        // Generate array of all dates from start to today
        const dates: string[] = [];
        const currentDate = new Date(startDate);
        while (currentDate <= today) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        // Initialize data for each date
        const dailyStats: Record<string, {
            started: number;
            completed: number;
            shares: number;
        }> = {};
        
        dates.forEach(date => {
            dailyStats[date] = { started: 0, completed: 0, shares: 0 };
        });
        
        // Fill in actual data from filtered events
        analyticsEvents
            .filter(e => dailyStats[e.date] && filterByUser(e))
            .forEach(e => {
                const date = e.date;
                
                if (e.event === 'puzzle_started') {
                    dailyStats[date].started++;
                } else if (e.event === 'puzzle_completed') {
                    dailyStats[date].completed++;
                } else if (e.event === 'share_clicked') {
                    dailyStats[date].shares++;
                }
            });
        
        // Convert to array sorted by date
        return dates.map(date => {
            const stats = dailyStats[date];
            const d = new Date(date + 'T00:00:00');
            return {
                date,
                displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                puzzlesStarted: stats.started,
                puzzlesCompleted: stats.completed,
                shareClicks: stats.shares,
                completionRate: stats.started > 0 
                    ? Math.round((stats.completed / stats.started) * 100) : 0,
            };
        });
    }, [analyticsEvents]);

    return {
        players,
        loading,
        error,
        isAdmin,
        fetchPlayers,
        calculateMetrics,
        calculateHistoricalMetrics,
        calculateAnonymousHistoricalMetrics,
        calculateConversionMetrics,
        calculateAnonymousMetrics,
        calculateRetentionMetrics,
        calculatePuzzleQualityMetrics,
        calculateEngagementMetrics,
        calculateFeatureUsageMetrics,
        calculateWinRateTrend,
        calculateEngagementTrend,
        getLeaderboard,
        searchPlayers,
    };
};

