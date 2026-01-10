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
    estimatedScore: number; // Calculated from puzzle completions (base score only, no streak bonus)
}

// Score distribution buckets for anonymous visitors
export interface ScoreDistribution {
    '1000+': number;
    '2000+': number;
    '3000+': number;
    '4000+': number;
    '5000+': number;
    '6000+': number;
    '7000+': number;
    '8000+': number;
    '9000+': number;
    '10000+': number;
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
    
    // Estimated score distribution (unconverted anonymous visitors only)
    scoreDistribution: ScoreDistribution;
    totalEstimatedScore: number; // Sum of all anonymous visitor scores
    avgEstimatedScore: number;   // Average score per anonymous visitor
    highScoreVisitors: AnonymousVisitor[]; // Visitors with 1000+ points, sorted by score
    
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

// Growth Dashboard metrics
export interface GrowthMetrics {
    // Row 1 - North Star
    returningPlayersL7: number;        // Players with 2+ days in L7
    returningPlayersP7: number;
    totalPlayersL7: number;
    totalPlayersP7: number;
    returningPlayersPercentL7: number;
    returningPlayersPercentP7: number;
    
    // Row 2 - Growth Health  
    newVisitorsPerDayL7: number;
    newVisitorsPerDayP7: number;
    dauL7: number;
    dauP7: number;
    returningShareL7: number;          // (DAU - New) / DAU
    returningShareP7: number;
    
    // Row 3 - Activation (Day-0 metrics for L28 new visitors)
    day0StartRate: number;             // % new visitors who start 1+ puzzle
    day0SolveRate: number;             // % new visitors who solve 1+ puzzle
    day0DepthRate: number;             // % new visitors who start 3+ puzzles
    totalNewVisitorsL28: number;
    
    // Row 4 - Retention
    d1Overall: number;
    d7Overall: number;
    d1SignedIn: number;
    d7SignedIn: number;
    
    // Row 5 - Engagement
    sessionsPerDauL7: number;
    puzzlesPerDauL7: number;
    dauMauSignedIn: number;            // Signed-in DAU / MAU
    signedInDau: number;
    signedInMau: number;
    
    // Row 6 - Conversion + Sharing (L28)
    visitorToSignupL28: number;
    signupPromptCoverage: number;      // % visitors who see prompt
    promptToSignup: number;
    shareRateL28: number;
    totalVisitorsL28: number;
    totalSignupsL28: number;
    totalPromptsL28: number;
    totalSharersL28: number;
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
        // Scoring constants (simplified, no streak bonus)
        const TRIES_PER_DIFFICULTY: Record<string, number> = { 'easy': 4, 'hard': 3, 'impossible': 2 };
        const POINTS_BY_DIFFICULTY: Record<string, number[]> = {
            'easy': [0, 50, 75, 100, 125],      // triesLeft: 0→0, 1→50, 2→75, 3→100, 4→125
            'hard': [0, 150, 200, 250],          // triesLeft: 0→0, 1→150, 2→200, 3→250
            'impossible': [0, 400, 500],         // triesLeft: 0→0, 1→400, 2→500
        };
        
        // Calculate score for a single puzzle completion
        const calculatePuzzleScore = (difficulty: string, triesUsed: number | undefined, solved: boolean): number => {
            if (!solved) return 0;
            const diff = difficulty?.toLowerCase();
            if (!TRIES_PER_DIFFICULTY[diff]) return 0;
            
            // If triesUsed is not available, use average (2 tries for easy, 1.5 for hard, 1 for impossible)
            const actualTriesUsed = triesUsed ?? Math.ceil(TRIES_PER_DIFFICULTY[diff] / 2);
            const triesLeft = Math.max(0, TRIES_PER_DIFFICULTY[diff] - actualTriesUsed);
            const points = POINTS_BY_DIFFICULTY[diff];
            return points?.[triesLeft] ?? 0;
        };
        
        // Group events by visitorId
        const visitorData: Record<string, {
            visitorId: string;
            puzzlesStarted: number;
            puzzlesCompleted: number;
            puzzlesSolved: number;
            estimatedScore: number;
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
                    estimatedScore: 0,
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
                    if (event.solved) {
                        visitor.puzzlesSolved++;
                        // Calculate and add score for this puzzle
                        visitor.estimatedScore += calculatePuzzleScore(
                            event.difficulty,
                            event.triesUsed,
                            true
                        );
                    }
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
            estimatedScore: v.estimatedScore,
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
        
        // Calculate score distribution for unconverted anonymous visitors
        const scoreDistribution: ScoreDistribution = {
            '1000+': 0, '2000+': 0, '3000+': 0, '4000+': 0, '5000+': 0,
            '6000+': 0, '7000+': 0, '8000+': 0, '9000+': 0, '10000+': 0,
        };
        
        anonymousVisitorList.forEach(v => {
            const score = v.estimatedScore;
            if (score >= 10000) scoreDistribution['10000+']++;
            else if (score >= 9000) scoreDistribution['9000+']++;
            else if (score >= 8000) scoreDistribution['8000+']++;
            else if (score >= 7000) scoreDistribution['7000+']++;
            else if (score >= 6000) scoreDistribution['6000+']++;
            else if (score >= 5000) scoreDistribution['5000+']++;
            else if (score >= 4000) scoreDistribution['4000+']++;
            else if (score >= 3000) scoreDistribution['3000+']++;
            else if (score >= 2000) scoreDistribution['2000+']++;
            else if (score >= 1000) scoreDistribution['1000+']++;
        });
        
        // Calculate total and average estimated scores
        const totalEstimatedScore = anonymousVisitorList.reduce((sum, v) => sum + v.estimatedScore, 0);
        const avgEstimatedScore = anonymousVisitorList.length > 0
            ? Math.round(totalEstimatedScore / anonymousVisitorList.length)
            : 0;
        
        // High score visitors: 1000+ points, sorted by score
        const highScoreVisitors = anonymousVisitorList
            .filter(v => v.estimatedScore >= 1000)
            .sort((a, b) => b.estimatedScore - a.estimatedScore);
        
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
            scoreDistribution,
            totalEstimatedScore,
            avgEstimatedScore,
            highScoreVisitors,
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

    // Calculate Growth Dashboard metrics
    const calculateGrowthMetrics = useCallback((): GrowthMetrics => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().split('T')[0];
        
        // Define time windows
        const l7Start = new Date(today);
        l7Start.setDate(l7Start.getDate() - 6); // Last 7 days including today
        const l7StartStr = l7Start.toISOString().split('T')[0];
        
        const p7Start = new Date(today);
        p7Start.setDate(p7Start.getDate() - 13); // Previous 7 days
        const p7StartStr = p7Start.toISOString().split('T')[0];
        const p7EndStr = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const l28Start = new Date(today);
        l28Start.setDate(l28Start.getDate() - 27);
        const l28StartStr = l28Start.toISOString().split('T')[0];
        
        // Get visitor IDs that signed up
        const signedUpVisitorIds = new Set(
            analyticsEvents
                .filter(e => e.event === 'signup_completed')
                .map(e => e.visitorId)
        );
        
        // Build visitor activity map: visitorId -> { firstSeen, playDates, startedCount, solvedCount per date }
        const visitorActivity: Record<string, { 
            firstSeen: string; 
            playDates: Set<string>;
            dateStats: Record<string, { started: number; solved: number }>;
        }> = {};
        
        analyticsEvents.forEach(e => {
            const vid = e.visitorId;
            if (!vid) return;
            
            const date = e.date;
            if (!date) return;
            
            if (!visitorActivity[vid]) {
                visitorActivity[vid] = { firstSeen: date, playDates: new Set(), dateStats: {} };
            }
            
            if (date < visitorActivity[vid].firstSeen) {
                visitorActivity[vid].firstSeen = date;
            }
            
            if (!visitorActivity[vid].dateStats[date]) {
                visitorActivity[vid].dateStats[date] = { started: 0, solved: 0 };
            }
            
            if (e.event === 'puzzle_started') {
                visitorActivity[vid].dateStats[date].started++;
            }
            
            if (e.event === 'puzzle_completed') {
                visitorActivity[vid].playDates.add(date);
                if (e.solved) {
                    visitorActivity[vid].dateStats[date].solved++;
                }
            }
        });
        
        // --- ROW 1: North Star - Returning Players ---
        // Count visitors with 2+ distinct play days in L7/P7
        let returningPlayersL7 = 0;
        let totalPlayersL7 = 0;
        let returningPlayersP7 = 0;
        let totalPlayersP7 = 0;
        
        Object.values(visitorActivity).forEach(v => {
            // L7: count days within L7 window
            const l7Days = Array.from(v.playDates).filter(d => d >= l7StartStr && d <= todayStr);
            if (l7Days.length > 0) {
                totalPlayersL7++;
                if (l7Days.length >= 2) returningPlayersL7++;
            }
            
            // P7: count days within P7 window
            const p7Days = Array.from(v.playDates).filter(d => d >= p7StartStr && d <= p7EndStr);
            if (p7Days.length > 0) {
                totalPlayersP7++;
                if (p7Days.length >= 2) returningPlayersP7++;
            }
        });
        
        const returningPlayersPercentL7 = totalPlayersL7 > 0 
            ? Math.round((returningPlayersL7 / totalPlayersL7) * 1000) / 10 : 0;
        const returningPlayersPercentP7 = totalPlayersP7 > 0 
            ? Math.round((returningPlayersP7 / totalPlayersP7) * 1000) / 10 : 0;
        
        // --- ROW 2: Growth Health ---
        // Track daily visitors and new visitors
        const dailyVisitors: Record<string, Set<string>> = {};
        const newVisitorsByDate: Record<string, number> = {};
        
        // Initialize all dates in L7 and P7
        for (let i = 0; i < 14; i++) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            dailyVisitors[dateStr] = new Set();
            newVisitorsByDate[dateStr] = 0;
        }
        
        // Count daily active visitors and new visitors
        Object.entries(visitorActivity).forEach(([vid, v]) => {
            v.playDates.forEach(date => {
                if (dailyVisitors[date]) {
                    dailyVisitors[date].add(vid);
                }
            });
            
            // Count as new visitor on their first seen date
            if (newVisitorsByDate[v.firstSeen] !== undefined) {
                newVisitorsByDate[v.firstSeen]++;
            }
        });
        
        // Calculate L7 and P7 averages
        let l7DauSum = 0, l7NewSum = 0, l7Days = 0;
        let p7DauSum = 0, p7NewSum = 0, p7Days = 0;
        
        Object.entries(dailyVisitors).forEach(([date, visitors]) => {
            if (date >= l7StartStr && date <= todayStr) {
                l7DauSum += visitors.size;
                l7NewSum += newVisitorsByDate[date] || 0;
                l7Days++;
            } else if (date >= p7StartStr && date <= p7EndStr) {
                p7DauSum += visitors.size;
                p7NewSum += newVisitorsByDate[date] || 0;
                p7Days++;
            }
        });
        
        const dauL7 = l7Days > 0 ? Math.round((l7DauSum / l7Days) * 10) / 10 : 0;
        const dauP7 = p7Days > 0 ? Math.round((p7DauSum / p7Days) * 10) / 10 : 0;
        const newVisitorsPerDayL7 = l7Days > 0 ? Math.round((l7NewSum / l7Days) * 10) / 10 : 0;
        const newVisitorsPerDayP7 = p7Days > 0 ? Math.round((p7NewSum / p7Days) * 10) / 10 : 0;
        
        // Returning share = (DAU - New) / DAU
        const returningShareL7 = dauL7 > 0 
            ? Math.round(((dauL7 - newVisitorsPerDayL7) / dauL7) * 1000) / 10 : 0;
        const returningShareP7 = dauP7 > 0 
            ? Math.round(((dauP7 - newVisitorsPerDayP7) / dauP7) * 1000) / 10 : 0;
        
        // --- ROW 3: Activation (Day-0 metrics) ---
        // Find new visitors in L28 and check their Day-0 behavior
        let newVisitorsL28 = 0;
        let day0Started = 0;
        let day0Solved = 0;
        let day0Depth3Plus = 0;
        
        Object.values(visitorActivity).forEach(v => {
            // Only count visitors whose first day is within L28
            if (v.firstSeen >= l28StartStr && v.firstSeen <= todayStr) {
                newVisitorsL28++;
                
                const day0Stats = v.dateStats[v.firstSeen];
                if (day0Stats) {
                    if (day0Stats.started >= 1) day0Started++;
                    if (day0Stats.solved >= 1) day0Solved++;
                    if (day0Stats.started >= 3) day0Depth3Plus++;
                }
            }
        });
        
        const day0StartRate = newVisitorsL28 > 0 
            ? Math.round((day0Started / newVisitorsL28) * 1000) / 10 : 0;
        const day0SolveRate = newVisitorsL28 > 0 
            ? Math.round((day0Solved / newVisitorsL28) * 1000) / 10 : 0;
        const day0DepthRate = newVisitorsL28 > 0 
            ? Math.round((day0Depth3Plus / newVisitorsL28) * 1000) / 10 : 0;
        
        // --- ROW 4: Retention ---
        // D1 and D7 for overall and signed-in users
        let totalNewOverall = 0, d1ReturnedOverall = 0, d7ReturnedOverall = 0;
        let totalNewSignedIn = 0, d1ReturnedSignedIn = 0, d7ReturnedSignedIn = 0;
        
        Object.entries(visitorActivity).forEach(([vid, v]) => {
            // Skip if first seen is today (can't measure retention yet)
            if (v.firstSeen >= todayStr) return;
            
            const firstPlayDate = new Date(v.firstSeen + 'T00:00:00');
            const playDatesArr = Array.from(v.playDates);
            
            // Check D1: Did they play the day after first play?
            const nextDay = new Date(firstPlayDate);
            nextDay.setDate(nextDay.getDate() + 1);
            const nextDayStr = nextDay.toISOString().split('T')[0];
            const hasD1 = v.playDates.has(nextDayStr);
            
            // Check D7: Did they play exactly 7 days after first play?
            const day7 = new Date(firstPlayDate);
            day7.setDate(day7.getDate() + 7);
            const day7Str = day7.toISOString().split('T')[0];
            const hasD7 = v.playDates.has(day7Str);
            
            // Overall
            totalNewOverall++;
            if (hasD1) d1ReturnedOverall++;
            if (hasD7) d7ReturnedOverall++;
            
            // Signed-in only
            if (signedUpVisitorIds.has(vid)) {
                totalNewSignedIn++;
                if (hasD1) d1ReturnedSignedIn++;
                if (hasD7) d7ReturnedSignedIn++;
            }
        });
        
        const d1Overall = totalNewOverall > 0 
            ? Math.round((d1ReturnedOverall / totalNewOverall) * 1000) / 10 : 0;
        const d7Overall = totalNewOverall > 0 
            ? Math.round((d7ReturnedOverall / totalNewOverall) * 1000) / 10 : 0;
        const d1SignedIn = totalNewSignedIn > 0 
            ? Math.round((d1ReturnedSignedIn / totalNewSignedIn) * 1000) / 10 : 0;
        const d7SignedIn = totalNewSignedIn > 0 
            ? Math.round((d7ReturnedSignedIn / totalNewSignedIn) * 1000) / 10 : 0;
        
        // --- ROW 5: Engagement ---
        // Sessions per DAU (L7)
        const l7Sessions = analyticsEvents.filter(e => 
            e.event === 'session_start' && 
            e.date >= l7StartStr && e.date <= todayStr
        ).length;
        const sessionsPerDauL7 = l7DauSum > 0 
            ? Math.round((l7Sessions / l7DauSum) * 100) / 100 : 0;
        
        // Puzzles started per DAU (L7)
        const l7PuzzlesStarted = analyticsEvents.filter(e => 
            e.event === 'puzzle_started' && 
            e.date >= l7StartStr && e.date <= todayStr
        ).length;
        const puzzlesPerDauL7 = l7DauSum > 0 
            ? Math.round((l7PuzzlesStarted / l7DauSum) * 100) / 100 : 0;
        
        // DAU/MAU for signed-in users
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 29);
        const monthAgoStr = monthAgo.toISOString().split('T')[0];
        
        const signedInDauSet = new Set<string>();
        const signedInMauSet = new Set<string>();
        
        analyticsEvents
            .filter(e => e.event === 'puzzle_completed' && signedUpVisitorIds.has(e.visitorId))
            .forEach(e => {
                if (e.date === todayStr) {
                    signedInDauSet.add(e.visitorId);
                }
                if (e.date >= monthAgoStr && e.date <= todayStr) {
                    signedInMauSet.add(e.visitorId);
                }
            });
        
        const signedInDau = signedInDauSet.size;
        const signedInMau = signedInMauSet.size;
        const dauMauSignedIn = signedInMau > 0 
            ? Math.round((signedInDau / signedInMau) * 1000) / 10 : 0;
        
        // --- ROW 6: Conversion + Sharing (L28) ---
        const l28Events = analyticsEvents.filter(e => e.date >= l28StartStr && e.date <= todayStr);
        
        const visitorsL28 = new Set(l28Events.map(e => e.visitorId)).size;
        const signupsL28 = l28Events.filter(e => e.event === 'signup_completed').length;
        const promptsShownL28 = new Set(
            l28Events.filter(e => e.event === 'signup_prompt_shown').map(e => e.visitorId)
        ).size;
        const sharersL28 = new Set(
            l28Events.filter(e => e.event === 'share_clicked' || e.event === 'share_copied').map(e => e.visitorId)
        ).size;
        
        const visitorToSignupL28 = visitorsL28 > 0 
            ? Math.round((signupsL28 / visitorsL28) * 1000) / 10 : 0;
        const signupPromptCoverage = visitorsL28 > 0 
            ? Math.round((promptsShownL28 / visitorsL28) * 1000) / 10 : 0;
        const promptToSignup = promptsShownL28 > 0 
            ? Math.round((signupsL28 / promptsShownL28) * 1000) / 10 : 0;
        const shareRateL28 = visitorsL28 > 0 
            ? Math.round((sharersL28 / visitorsL28) * 1000) / 10 : 0;
        
        return {
            // Row 1
            returningPlayersL7,
            returningPlayersP7,
            totalPlayersL7,
            totalPlayersP7,
            returningPlayersPercentL7,
            returningPlayersPercentP7,
            // Row 2
            newVisitorsPerDayL7,
            newVisitorsPerDayP7,
            dauL7,
            dauP7,
            returningShareL7,
            returningShareP7,
            // Row 3
            day0StartRate,
            day0SolveRate,
            day0DepthRate,
            totalNewVisitorsL28: newVisitorsL28,
            // Row 4
            d1Overall,
            d7Overall,
            d1SignedIn,
            d7SignedIn,
            // Row 5
            sessionsPerDauL7,
            puzzlesPerDauL7,
            dauMauSignedIn,
            signedInDau,
            signedInMau,
            // Row 6
            visitorToSignupL28,
            signupPromptCoverage,
            promptToSignup,
            shareRateL28,
            totalVisitorsL28: visitorsL28,
            totalSignupsL28: signupsL28,
            totalPromptsL28: promptsShownL28,
            totalSharersL28: sharersL28,
        };
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
        calculateGrowthMetrics,
        getLeaderboard,
        searchPlayers,
        analyticsEvents, // Expose for CSV export
    };
};

