// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAdminData, PlayerWithMeta, AggregateMetrics, TimeRange, DailyDataPoint, ConversionMetrics, AnonymousMetrics, AnonymousVisitor, RetentionMetrics, RetentionCohort, PuzzleQualityMetrics, EngagementMetrics, FeatureUsageMetrics, DifficultyStats, PuzzleStats, BadgeEngagement, WinRateTrendPoint, EngagementTrendPoint, GrowthMetrics, AnonymousDay0DataPoint, GrowthDay0DataPoint, CircleMetrics, CircleData } from '../hooks/useAdminData';
import { MetricChart, MetricType } from './MetricChart';
import { formatDateKey } from '../dailySchedule';
import { PREGENERATED_PUZZLES } from '../puzzles';
import type { Theme } from '../types';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    ComposedChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { auth, GoogleAuthProvider, signInWithPopup } from '../firebase';

type AdminTab = 'metrics' | 'players' | 'leaderboard' | 'anonymous' | 'retention' | 'insights' | 'trends' | 'growth' | 'circles';

// Helper to parse date key (YYYY-MM-DD) as local date, not UTC
const parseDateKeyAsLocal = (dateKey: string): Date => {
    const parts = dateKey.split('-');
    if (parts.length === 3) {
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
    return new Date(dateKey);
};

// Helper function to get the most recent play date
// Compares all available date sources and returns the most recent
const getLastPlayedFromResults = (playerData: PlayerData & { updatedAt?: string }): string | null => {
    const candidates: Date[] = [];
    
    // Check updatedAt timestamp
    if ((playerData as any).updatedAt) {
        const d = new Date((playerData as any).updatedAt);
        if (!isNaN(d.getTime())) candidates.push(d);
    }
    
    // Check lastPlayedDate
    if (playerData.lastPlayedDate) {
        const d = new Date(playerData.lastPlayedDate);
        if (!isNaN(d.getTime())) candidates.push(d);
    }
    
    // Check most recent dailyResults key - parse as LOCAL date
    const dailyResults = playerData.dailyResults;
    if (dailyResults && Object.keys(dailyResults).length > 0) {
        const dateKeys = Object.keys(dailyResults).sort((a, b) => {
            const dateA = parseDateKeyAsLocal(a);
            const dateB = parseDateKeyAsLocal(b);
            return dateB.getTime() - dateA.getTime();
        });
        if (dateKeys.length > 0) {
            const d = parseDateKeyAsLocal(dateKeys[0]);
            if (!isNaN(d.getTime())) candidates.push(d);
        }
    }
    
    if (candidates.length === 0) return null;
    
    // Return the most recent date
    const mostRecent = candidates.reduce((a, b) => a > b ? a : b);
    return mostRecent.toISOString();
};

// Helper function to format dates in a human-readable way with time
const formatLastPlayed = (dateString: string | null, hasTime: boolean = false): string => {
    if (!dateString) return 'Never';
    
    try {
        const date = new Date(dateString);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        
        // Format time if available
        const timeStr = hasTime ? date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        }) : '';
        
        // Check if it's today
        if (dateOnly.getTime() === today.getTime()) {
            return hasTime ? `Today, ${timeStr}` : 'Today';
        }
        
        // Check if it's yesterday
        if (dateOnly.getTime() === yesterday.getTime()) {
            return hasTime ? `Yesterday, ${timeStr}` : 'Yesterday';
        }
        
        // Check if it's within the last 7 days
        const daysAgo = Math.floor((today.getTime() - dateOnly.getTime()) / (1000 * 60 * 60 * 24));
        if (daysAgo < 7) {
            return hasTime ? `${daysAgo}d ago, ${timeStr}` : `${daysAgo} days ago`;
        }
        
        // Otherwise show the date with time
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        // Add year if it's not the current year
        if (date.getFullYear() !== now.getFullYear()) {
            options.year = 'numeric';
        }
        const dateStr = date.toLocaleDateString('en-US', options);
        return hasTime ? `${dateStr}, ${timeStr}` : dateStr;
    } catch {
        return 'Never';
    }
};

// Helper function to get hour from date string
const getHourFromDate = (dateString: string): number => {
    try {
        const date = new Date(dateString);
        return date.getHours();
    } catch {
        return -1;
    }
};

// Toggle type for Engagement Metrics
type EngagementUserType = 'signedUp' | 'anonymous';

// CSV Export Helper Functions
const downloadCSV = (data: string, filename: string) => {
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const escapeCSVField = (field: any): string => {
    if (field === null || field === undefined) return '';
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
};

const arrayToCSV = (headers: string[], rows: any[][]): string => {
    const headerLine = headers.map(escapeCSVField).join(',');
    const dataLines = rows.map(row => row.map(escapeCSVField).join(','));
    return [headerLine, ...dataLines].join('\n');
};

// Metrics Tab Component
const MetricsTab: React.FC<{ 
    metrics: AggregateMetrics;
    anonymousMetrics: AnonymousMetrics;
    conversionMetrics: ConversionMetrics;
    players: PlayerWithMeta[];
    analyticsEvents: any[];
    onMetricClick: (metricType: MetricType, title: string, isAnonymous?: boolean) => void;
}> = ({ metrics, anonymousMetrics, conversionMetrics, players, analyticsEvents, onMetricClick }) => {
    const [engagementUserType, setEngagementUserType] = useState<EngagementUserType>('signedUp');
    const [exporting, setExporting] = useState(false);
    
    // Export all data as CSV files
    const handleExportData = () => {
        setExporting(true);
        const timestamp = new Date().toISOString().split('T')[0];
        
        try {
            // 1. Export Player Data
            const playerHeaders = [
                'UID', 'Display Name', 'Email', 'Total Score', 'Current Streak', 'Max Streak',
                'Total Solved', 'Easy Solved', 'Hard Solved', 'Impossible Solved',
                'Perfect Scores', 'Badges Unlocked', 'Last Played', 'Days Played'
            ];
            const playerRows = players.map(p => [
                p.uid,
                p.displayName || '',
                p.email || '',
                p.playerData.totalScore || 0,
                p.playerData.currentStreak || 0,
                p.playerData.maxStreak || 0,
                p.playerData.totalSolved || 0,
                p.playerData.easySolved || 0,
                p.playerData.hardSolved || 0,
                p.playerData.impossibleSolved || 0,
                p.playerData.perfectScores || 0,
                p.playerData.badges?.filter(b => b.unlocked).length || 0,
                p.playerData.lastPlayedDate || '',
                Object.keys(p.playerData.dailyResults || {}).length,
            ]);
            downloadCSV(arrayToCSV(playerHeaders, playerRows), `linkle-players-${timestamp}.csv`);
            
            // 2. Export Analytics Events
            const eventHeaders = [
                'Timestamp', 'Date', 'Event', 'Visitor ID', 'Session ID', 'User ID',
                'Difficulty', 'Solved', 'Puzzle ID', 'Time Spent (s)', 'Moves Count'
            ];
            const eventRows = analyticsEvents.map(e => [
                e.timestamp || '',
                e.date || '',
                e.event || '',
                e.visitorId || '',
                e.sessionId || '',
                e.userId || '',
                e.difficulty || '',
                e.solved !== undefined ? e.solved : '',
                e.puzzleId !== undefined ? e.puzzleId : '',
                e.timeSpentSeconds || '',
                e.movesCount || '',
            ]);
            downloadCSV(arrayToCSV(eventHeaders, eventRows), `linkle-analytics-${timestamp}.csv`);
            
            // 3. Export Aggregate Metrics Summary
            const summaryHeaders = ['Metric', 'Value'];
            const summaryRows = [
                ['Export Date', timestamp],
                ['--- SIGNED UP USERS ---', ''],
                ['Total Users', metrics.totalUsers],
                ['Daily Active Users', metrics.dailyActiveUsers],
                ['Weekly Active Users', metrics.weeklyActiveUsers],
                ['Monthly Active Users', metrics.monthlyActiveUsers],
                ['Total Puzzles Played', metrics.totalPuzzlesPlayed],
                ['Total Puzzles Solved', metrics.totalPuzzlesSolved],
                ['Overall Win Rate %', metrics.totalPuzzlesPlayed > 0 ? Math.round((metrics.totalPuzzlesSolved / metrics.totalPuzzlesPlayed) * 100) : 0],
                ['Easy Win Rate %', metrics.completionRates.easy.attempted > 0 ? Math.round((metrics.completionRates.easy.solved / metrics.completionRates.easy.attempted) * 100) : 0],
                ['Hard Win Rate %', metrics.completionRates.hard.attempted > 0 ? Math.round((metrics.completionRates.hard.solved / metrics.completionRates.hard.attempted) * 100) : 0],
                ['Impossible Win Rate %', metrics.completionRates.impossible.attempted > 0 ? Math.round((metrics.completionRates.impossible.solved / metrics.completionRates.impossible.attempted) * 100) : 0],
                ['Bonus Rounds Played', metrics.bonusMetrics.totalPlayed],
                ['Bonus Completion Rate %', metrics.bonusMetrics.completionRate],
                ['--- ANONYMOUS USERS ---', ''],
                ['Anonymous Visitors', anonymousMetrics.totalAnonymousVisitors],
                ['Anonymous Puzzles Played', anonymousMetrics.totalAnonymousPuzzlesPlayed],
                ['Anonymous Win Rate %', anonymousMetrics.anonymousWinRate],
                ['Avg Puzzles Per Anonymous', anonymousMetrics.avgPuzzlesPerAnonymousVisitor],
                ['--- CONVERSION ---', ''],
                ['Unique Visitors', conversionMetrics.uniqueVisitors],
                ['Signups Completed', conversionMetrics.signupsCompleted],
                ['Avg Puzzles Before Signup', conversionMetrics.avgPuzzlesBeforeSignup],
                ['Share Click Rate %', conversionMetrics.shareClickRate],
            ];
            downloadCSV(arrayToCSV(summaryHeaders, summaryRows), `linkle-summary-${timestamp}.csv`);
            
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed. Check console for details.');
        } finally {
            setExporting(false);
        }
    };
    
    const easyWinRate = metrics.completionRates.easy.attempted > 0 
        ? Math.round((metrics.completionRates.easy.solved / metrics.completionRates.easy.attempted) * 100) 
        : 0;
    const hardWinRate = metrics.completionRates.hard.attempted > 0 
        ? Math.round((metrics.completionRates.hard.solved / metrics.completionRates.hard.attempted) * 100) 
        : 0;
    const impossibleWinRate = metrics.completionRates.impossible.attempted > 0 
        ? Math.round((metrics.completionRates.impossible.solved / metrics.completionRates.impossible.attempted) * 100) 
        : 0;

    const easyPerfectRate = metrics.completionRates.easy.solved > 0
        ? Math.round((metrics.completionRates.easy.perfect / metrics.completionRates.easy.solved) * 100)
        : 0;
    const hardPerfectRate = metrics.completionRates.hard.solved > 0
        ? Math.round((metrics.completionRates.hard.perfect / metrics.completionRates.hard.solved) * 100)
        : 0;
    const impossiblePerfectRate = metrics.completionRates.impossible.solved > 0
        ? Math.round((metrics.completionRates.impossible.perfect / metrics.completionRates.impossible.solved) * 100)
        : 0;

    // Compute values based on toggle
    const isAnonymous = engagementUserType === 'anonymous';
    
    const totalUsers = isAnonymous 
        ? anonymousMetrics.totalAnonymousVisitors 
        : metrics.totalUsers;
    const dailyActive = isAnonymous 
        ? anonymousMetrics.dailyActiveAnonymous 
        : metrics.dailyActiveUsers;
    const weeklyActive = isAnonymous 
        ? anonymousMetrics.weeklyActiveAnonymous 
        : metrics.weeklyActiveUsers;
    const monthlyActive = isAnonymous 
        ? anonymousMetrics.monthlyActiveAnonymous 
        : metrics.monthlyActiveUsers;
    const puzzlesPlayed = isAnonymous 
        ? anonymousMetrics.totalAnonymousPuzzlesPlayed 
        : metrics.totalPuzzlesPlayed;
    const puzzlesSolved = isAnonymous 
        ? anonymousMetrics.totalAnonymousPuzzlesSolved 
        : metrics.totalPuzzlesSolved;
    const winRate = isAnonymous 
        ? anonymousMetrics.anonymousWinRate 
        : (metrics.totalPuzzlesPlayed > 0 
            ? Math.round((metrics.totalPuzzlesSolved / metrics.totalPuzzlesPlayed) * 100) 
            : 0);
    
    const dailyStickiness = totalUsers > 0 ? Math.round((dailyActive / totalUsers) * 100) : 0;
    const weeklyStickiness = totalUsers > 0 ? Math.round((weeklyActive / totalUsers) * 100) : 0;
    const monthlyStickiness = totalUsers > 0 ? Math.round((monthlyActive / totalUsers) * 100) : 0;

    return (
        <div className="admin-metrics-tab">
            {/* Export Button */}
            <div className="admin-export-section">
                <button 
                    className="admin-export-btn"
                    onClick={handleExportData}
                    disabled={exporting}
                >
                    {exporting ? '⏳ Exporting...' : '📥 Export All Data (CSV)'}
                </button>
                <span className="admin-export-hint">
                    Downloads 3 files: Players, Analytics Events, Summary Metrics
                </span>
            </div>
            
            <div className="admin-engagement-header">
                <h2>Engagement Metrics</h2>
                <div className="admin-user-type-toggle">
                    <button 
                        className={`admin-toggle-option ${engagementUserType === 'signedUp' ? 'active' : ''}`}
                        onClick={() => setEngagementUserType('signedUp')}
                    >
                        Signed Up
                    </button>
                    <button 
                        className={`admin-toggle-option ${engagementUserType === 'anonymous' ? 'active' : ''}`}
                        onClick={() => setEngagementUserType('anonymous')}
                    >
                        Anonymous
                    </button>
                </div>
            </div>
            <p className="admin-metrics-hint">
                Click any metric to view historical chart
                {isAnonymous && ' • Showing anonymous visitors who haven\'t signed up yet'}
            </p>
            
            <div className="admin-metrics-grid">
                <div 
                    className="admin-metric-card admin-metric-clickable"
                    onClick={() => onMetricClick('totalUsers', isAnonymous ? 'Total Visitors' : 'Total Users', isAnonymous)}
                >
                    <div className="admin-metric-value">{totalUsers}</div>
                    <div className="admin-metric-label">{isAnonymous ? 'Visitors' : 'Total Users'}</div>
                    <div className="admin-metric-chart-icon">📈</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-clickable"
                    onClick={() => onMetricClick('dau', isAnonymous ? 'Daily Active Visitors' : 'Daily Active Users', isAnonymous)}
                >
                    <div className="admin-metric-value">{dailyActive}</div>
                    <div className="admin-metric-label">Daily Active</div>
                    <div className="admin-metric-chart-icon">📊</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-clickable"
                    onClick={() => onMetricClick('puzzlesPlayed', isAnonymous ? 'Puzzles Played (Anonymous)' : 'Puzzles Played', isAnonymous)}
                >
                    <div className="admin-metric-value">{puzzlesPlayed}</div>
                    <div className="admin-metric-label">Puzzles Played</div>
                    <div className="admin-metric-chart-icon">📊</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-clickable"
                    onClick={() => onMetricClick('winRate', isAnonymous ? 'Win Rate (Anonymous)' : 'Win Rate', isAnonymous)}
                >
                    <div className="admin-metric-value">{winRate}%</div>
                    <div className="admin-metric-label">Win Rate</div>
                    <div className="admin-metric-chart-icon">📈</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-stickiness admin-metric-clickable"
                    onClick={() => onMetricClick('stickiness', isAnonymous ? 'Stickiness (Anonymous)' : 'Stickiness (Retention)', isAnonymous)}
                >
                    <div className="admin-metric-value">{dailyStickiness}%</div>
                    <div className="admin-metric-label">Daily Stickiness</div>
                    <div className="admin-metric-chart-icon">📈</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-stickiness admin-metric-clickable"
                    onClick={() => onMetricClick('stickiness', isAnonymous ? 'Stickiness (Anonymous)' : 'Stickiness (Retention)', isAnonymous)}
                >
                    <div className="admin-metric-value">{weeklyStickiness}%</div>
                    <div className="admin-metric-label">Weekly Stickiness</div>
                    <div className="admin-metric-chart-icon">📈</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-stickiness admin-metric-clickable"
                    onClick={() => onMetricClick('stickiness', isAnonymous ? 'Stickiness (Anonymous)' : 'Stickiness (Retention)', isAnonymous)}
                >
                    <div className="admin-metric-value">{monthlyStickiness}%</div>
                    <div className="admin-metric-label">Monthly Stickiness</div>
                    <div className="admin-metric-chart-icon">📈</div>
                </div>
            </div>

            <h3>Streak Distribution</h3>
            <div className="admin-streak-distribution">
                <div className="admin-streak-bar">
                    <div className="admin-streak-bar-label">1-3 days</div>
                    <div className="admin-streak-bar-track">
                        <div 
                            className="admin-streak-bar-fill" 
                            style={{ width: `${metrics.totalUsers > 0 ? (metrics.streakDistribution['1-3'] / metrics.totalUsers) * 100 : 0}%` }}
                        />
                    </div>
                    <div className="admin-streak-bar-count">{metrics.streakDistribution['1-3']}</div>
                </div>
                <div className="admin-streak-bar">
                    <div className="admin-streak-bar-label">4-7 days</div>
                    <div className="admin-streak-bar-track">
                        <div 
                            className="admin-streak-bar-fill admin-streak-bar-fill-good" 
                            style={{ width: `${metrics.totalUsers > 0 ? (metrics.streakDistribution['4-7'] / metrics.totalUsers) * 100 : 0}%` }}
                        />
                    </div>
                    <div className="admin-streak-bar-count">{metrics.streakDistribution['4-7']}</div>
                </div>
                <div className="admin-streak-bar">
                    <div className="admin-streak-bar-label">8-14 days</div>
                    <div className="admin-streak-bar-track">
                        <div 
                            className="admin-streak-bar-fill admin-streak-bar-fill-great" 
                            style={{ width: `${metrics.totalUsers > 0 ? (metrics.streakDistribution['8-14'] / metrics.totalUsers) * 100 : 0}%` }}
                        />
                    </div>
                    <div className="admin-streak-bar-count">{metrics.streakDistribution['8-14']}</div>
                </div>
                <div className="admin-streak-bar">
                    <div className="admin-streak-bar-label">15+ days</div>
                    <div className="admin-streak-bar-track">
                        <div 
                            className="admin-streak-bar-fill admin-streak-bar-fill-legendary" 
                            style={{ width: `${metrics.totalUsers > 0 ? (metrics.streakDistribution['15+'] / metrics.totalUsers) * 100 : 0}%` }}
                        />
                    </div>
                    <div className="admin-streak-bar-count">{metrics.streakDistribution['15+']}</div>
                </div>
            </div>

            <h3>Performance by Difficulty</h3>
            <div className="admin-difficulty-stats">
                <div className="admin-difficulty-row">
                    <div className="admin-difficulty-name">Easy</div>
                    <div className="admin-difficulty-stat">
                        <span className="admin-stat-label">Win Rate:</span>
                        <span className="admin-stat-value">{easyWinRate}%</span>
                    </div>
                    <div className="admin-difficulty-stat">
                        <span className="admin-stat-label">Perfect:</span>
                        <span className="admin-stat-value">{easyPerfectRate}%</span>
                    </div>
                    <div className="admin-difficulty-stat">
                        <span className="admin-stat-label">Played:</span>
                        <span className="admin-stat-value">{metrics.completionRates.easy.attempted}</span>
                    </div>
                </div>
                <div className="admin-difficulty-row">
                    <div className="admin-difficulty-name">Hard</div>
                    <div className="admin-difficulty-stat">
                        <span className="admin-stat-label">Win Rate:</span>
                        <span className="admin-stat-value">{hardWinRate}%</span>
                    </div>
                    <div className="admin-difficulty-stat">
                        <span className="admin-stat-label">Perfect:</span>
                        <span className="admin-stat-value">{hardPerfectRate}%</span>
                    </div>
                    <div className="admin-difficulty-stat">
                        <span className="admin-stat-label">Played:</span>
                        <span className="admin-stat-value">{metrics.completionRates.hard.attempted}</span>
                    </div>
                </div>
                <div className="admin-difficulty-row">
                    <div className="admin-difficulty-name">Impossible</div>
                    <div className="admin-difficulty-stat">
                        <span className="admin-stat-label">Win Rate:</span>
                        <span className="admin-stat-value">{impossibleWinRate}%</span>
                    </div>
                    <div className="admin-difficulty-stat">
                        <span className="admin-stat-label">Perfect:</span>
                        <span className="admin-stat-value">{impossiblePerfectRate}%</span>
                    </div>
                    <div className="admin-difficulty-stat">
                        <span className="admin-stat-label">Played:</span>
                        <span className="admin-stat-value">{metrics.completionRates.impossible.attempted}</span>
                    </div>
                </div>
            </div>

            <div className="admin-totals">
                <div className="admin-total-item">
                    <span className="admin-total-label">Total Puzzles Played:</span>
                    <span className="admin-total-value">{metrics.totalPuzzlesPlayed}</span>
                </div>
                <div className="admin-total-item">
                    <span className="admin-total-label">Total Puzzles Solved:</span>
                    <span className="admin-total-value">{metrics.totalPuzzlesSolved}</span>
                </div>
                <div className="admin-total-item">
                    <span className="admin-total-label">Overall Win Rate:</span>
                    <span className="admin-total-value">
                        {metrics.totalPuzzlesPlayed > 0 
                            ? Math.round((metrics.totalPuzzlesSolved / metrics.totalPuzzlesPlayed) * 100) 
                            : 0}%
                    </span>
                </div>
            </div>

            <h3>⚡ Bonus Speed Round</h3>
            <div className="admin-bonus-metrics">
                <div className="admin-bonus-grid">
                    <div className="admin-bonus-card">
                        <div className="admin-bonus-value">{metrics.bonusMetrics.totalPlayed}</div>
                        <div className="admin-bonus-label">Total Played</div>
                    </div>
                    <div className="admin-bonus-card">
                        <div className="admin-bonus-value">{metrics.bonusMetrics.completionRate}%</div>
                        <div className="admin-bonus-label">Completion Rate</div>
                    </div>
                    <div className="admin-bonus-card">
                        <div className="admin-bonus-value">{metrics.bonusMetrics.participationRate}%</div>
                        <div className="admin-bonus-label">User Participation</div>
                    </div>
                    <div className="admin-bonus-card">
                        <div className="admin-bonus-value">{metrics.bonusMetrics.usersWithBonus}</div>
                        <div className="admin-bonus-label">Users Played</div>
                    </div>
                </div>
                <div className="admin-bonus-times">
                    <div className="admin-bonus-time-item">
                        <span className="admin-bonus-time-label">Average Time:</span>
                        <span className="admin-bonus-time-value">
                            {metrics.bonusMetrics.averageTime > 0 
                                ? `${Math.floor(metrics.bonusMetrics.averageTime / 60)}:${String(metrics.bonusMetrics.averageTime % 60).padStart(2, '0')}`
                                : '—'}
                        </span>
                    </div>
                    <div className="admin-bonus-time-item">
                        <span className="admin-bonus-time-label">Fastest Time:</span>
                        <span className="admin-bonus-time-value admin-bonus-fastest">
                            {metrics.bonusMetrics.fastestTime != null 
                                ? `${Math.floor(metrics.bonusMetrics.fastestTime / 60)}:${String(metrics.bonusMetrics.fastestTime % 60).padStart(2, '0')}`
                                : '—'}
                        </span>
                    </div>
                </div>
            </div>

            <h3>📊 Conversion Funnel</h3>
            <p className="admin-metrics-hint">Tracks anonymous + signed-up user journey (data starts collecting now)</p>
            
            <div className="admin-conversion-funnel">
                <div className="admin-funnel-stats">
                    <div className="admin-funnel-stat">
                        <div className="admin-funnel-value">{conversionMetrics.uniqueVisitors}</div>
                        <div className="admin-funnel-label">Visitors</div>
                    </div>
                    <div className="admin-funnel-arrow">→</div>
                    <div className="admin-funnel-stat">
                        <div className="admin-funnel-value">{conversionMetrics.puzzlesStarted}</div>
                        <div className="admin-funnel-label">Puzzles Started</div>
                        <div className="admin-funnel-rate">{conversionMetrics.visitorToPlayerRate}% play</div>
                    </div>
                    <div className="admin-funnel-arrow">→</div>
                    <div className="admin-funnel-stat">
                        <div className="admin-funnel-value">{conversionMetrics.signupPromptsShown}</div>
                        <div className="admin-funnel-label">Saw Signup</div>
                    </div>
                    <div className="admin-funnel-arrow">→</div>
                    <div className="admin-funnel-stat admin-funnel-stat-highlight">
                        <div className="admin-funnel-value">{conversionMetrics.signupsCompleted}</div>
                        <div className="admin-funnel-label">Signed Up</div>
                        <div className="admin-funnel-rate">{conversionMetrics.promptToSignupRate}% convert</div>
                    </div>
                </div>
                
                {conversionMetrics.signupsCompleted > 0 && (
                    <div className="admin-conversion-insight">
                        <div className="admin-insight-title">📈 Signup Insight</div>
                        <div className="admin-insight-stat">
                            Average <strong>{conversionMetrics.avgPuzzlesBeforeSignup}</strong> puzzles played before signup
                        </div>
                        <div className="admin-puzzles-distribution">
                            {Object.entries(conversionMetrics.puzzlesBeforeSignupDistribution).map(([range, count]) => (
                                count > 0 && (
                                    <span key={range} className="admin-dist-badge">
                                        {range}: {count}
                                    </span>
                                )
                            ))}
                        </div>
                    </div>
                )}
                
                {conversionMetrics.uniqueVisitors === 0 && (
                    <div className="admin-no-data">
                        No conversion data yet. Data will appear as users visit and play.
                    </div>
                )}
            </div>

            <h3>📤 Share Metrics</h3>
            <p className="admin-metrics-hint">Track how often players share their results</p>
            
            <div className="admin-share-metrics">
                <div className="admin-funnel-stats">
                    <div className="admin-funnel-stat">
                        <div className="admin-funnel-value">{conversionMetrics.puzzlesCompleted}</div>
                        <div className="admin-funnel-label">Puzzles Completed</div>
                    </div>
                    <div className="admin-funnel-arrow">→</div>
                    <div className="admin-funnel-stat">
                        <div className="admin-funnel-value">{conversionMetrics.shareClicks}</div>
                        <div className="admin-funnel-label">Share Clicked</div>
                        <div className="admin-funnel-rate">{conversionMetrics.shareClickRate}% share</div>
                    </div>
                    <div className="admin-funnel-arrow">→</div>
                    <div className="admin-funnel-stat admin-funnel-stat-highlight">
                        <div className="admin-funnel-value">{conversionMetrics.shareCopies}</div>
                        <div className="admin-funnel-label">Copied</div>
                        <div className="admin-funnel-rate">{conversionMetrics.shareCopyRate}% copy</div>
                    </div>
                </div>
                
                {conversionMetrics.shareClicks === 0 && conversionMetrics.puzzlesCompleted > 0 && (
                    <div className="admin-no-data">
                        No share data yet. Data will appear as users share their results.
                    </div>
                )}
            </div>

            <h3>🕐 Play Time Distribution</h3>
            <p className="admin-metrics-hint">When do players typically play? (based on last played times)</p>
            
            <PlayTimeDistribution players={players} />
        </div>
    );
};

// Play Time Distribution Component
const PlayTimeDistribution: React.FC<{ players: PlayerWithMeta[] }> = ({ players }) => {
    // Calculate hour distribution from lastPlayedDate timestamps where available
    // Note: dailyResults date keys don't have time info, so we use lastPlayedDate when it exists
    const hourCounts = useMemo(() => {
        const counts: number[] = Array(24).fill(0);
        
        players.forEach(player => {
            // Use lastPlayedDate if it has a valid timestamp
            const lastPlayed = player.playerData.lastPlayedDate;
            if (lastPlayed && lastPlayed.includes('T')) { // ISO format with time
                const hour = getHourFromDate(lastPlayed);
                if (hour >= 0 && hour < 24) {
                    counts[hour]++;
                }
            }
        });
        
        return counts;
    }, [players]);
    
    const maxCount = Math.max(...hourCounts, 1);
    const totalPlays = hourCounts.reduce((a, b) => a + b, 0);
    
    // Find peak hours
    const peakHour = hourCounts.indexOf(maxCount);
    const formatHour = (h: number) => {
        if (h === 0) return '12 AM';
        if (h === 12) return '12 PM';
        return h < 12 ? `${h} AM` : `${h - 12} PM`;
    };
    
    if (totalPlays === 0) {
        return (
            <div className="admin-no-data">
                No play time data available yet.
            </div>
        );
    }
    
    return (
        <div className="admin-playtime-distribution">
            <div className="admin-playtime-chart">
                {hourCounts.map((count, hour) => (
                    <div key={hour} className="admin-playtime-bar-container">
                        <div 
                            className={`admin-playtime-bar ${hour === peakHour ? 'peak' : ''}`}
                            style={{ height: `${(count / maxCount) * 100}%` }}
                            title={`${formatHour(hour)}: ${count} plays`}
                        />
                        <div className="admin-playtime-label">
                            {hour % 3 === 0 ? formatHour(hour) : ''}
                        </div>
                    </div>
                ))}
            </div>
            <div className="admin-playtime-insight">
                <span className="admin-playtime-peak">
                    📈 Peak: <strong>{formatHour(peakHour)}</strong> ({hourCounts[peakHour]} plays)
                </span>
                <span className="admin-playtime-total">
                    Total: {totalPlays} recorded sessions
                </span>
            </div>
        </div>
    );
};

// Player Detail Modal Component
const PlayerDetailModal: React.FC<{ 
    player: PlayerWithMeta; 
    onClose: () => void;
}> = ({ player, onClose }) => {
    const { playerData } = player;
    const dailyResults = playerData.dailyResults || {};
    
    // Calculate individual win rates
    const easyPlayed = playerData.easySolved || 0;
    const hardPlayed = playerData.hardSolved || 0;
    const impossiblePlayed = playerData.impossibleSolved || 0;
    
    // Get recent activity (last 14 days)
    const recentDays: { date: string; played: boolean; results: any }[] = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateKey = formatDateKey(d);
        const results = dailyResults[dateKey];
        recentDays.push({
            date: dateKey,
            played: !!results,
            results: results || null,
        });
    }

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
                <button className="admin-modal-close" onClick={onClose}>×</button>
                
                <h2>{player.displayName || 'Anonymous Player'}</h2>
                <p className="admin-player-email">{player.email || 'No email'}</p>
                <p className="admin-player-uid">UID: {player.uid}</p>
                
                <div className="admin-player-stats-grid">
                    <div className="admin-player-stat">
                        <div className="admin-player-stat-value">{playerData.totalScore || 0}</div>
                        <div className="admin-player-stat-label">Total Score</div>
                    </div>
                    <div className="admin-player-stat">
                        <div className="admin-player-stat-value">{playerData.currentStreak || 0}</div>
                        <div className="admin-player-stat-label">Current Streak</div>
                    </div>
                    <div className="admin-player-stat">
                        <div className="admin-player-stat-value">{playerData.maxStreak || 0}</div>
                        <div className="admin-player-stat-label">Max Streak</div>
                    </div>
                    <div className="admin-player-stat">
                        <div className="admin-player-stat-value">{playerData.totalSolved || 0}</div>
                        <div className="admin-player-stat-label">Total Solved</div>
                    </div>
                </div>

                <h3>Solved by Difficulty</h3>
                <div className="admin-player-difficulty-stats">
                    <div>Easy: {easyPlayed}</div>
                    <div>Hard: {hardPlayed}</div>
                    <div>Impossible: {impossiblePlayed}</div>
                </div>

                <h3>Last 14 Days Activity</h3>
                <div className="admin-activity-grid">
                    {recentDays.map(day => (
                        <div 
                            key={day.date}
                            className={`admin-activity-day ${day.played ? 'admin-activity-played' : 'admin-activity-missed'}`}
                            title={`${day.date}: ${day.played ? 'Played' : 'Missed'}`}
                        >
                            {day.played && day.results && (
                                <div className="admin-activity-detail">
                                    {day.results.easy?.solved && '🟢'}
                                    {day.results.hard?.solved && '🟡'}
                                    {day.results.impossible?.solved && '🔴'}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="admin-activity-legend">
                    <span>🟢 Easy</span>
                    <span>🟡 Hard</span>
                    <span>🔴 Impossible</span>
                </div>

                <h3>Badges ({playerData.badges?.filter(b => b.unlocked).length || 0} unlocked)</h3>
                <div className="admin-badges-list">
                    {playerData.badges?.filter(b => b.unlocked).map(badge => (
                        <span key={badge.id} className="admin-badge-item" title={badge.description}>
                            {badge.icon} {badge.name}
                        </span>
                    ))}
                    {(!playerData.badges || playerData.badges.filter(b => b.unlocked).length === 0) && (
                        <span className="admin-no-badges">No badges unlocked yet</span>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper function to calculate player stats from dailyResults
const calculatePlayerStats = (playerData: PlayerData): { played: number; solved: number; winRate: number } => {
    if (!playerData.dailyResults) return { played: 0, solved: 0, winRate: 0 };
    
    let played = 0;
    let solved = 0;
    
    Object.values(playerData.dailyResults).forEach((dayResult: any) => {
        if (dayResult?.easy) {
            played++;
            if (dayResult.easy.solved) solved++;
        }
        if (dayResult?.hard) {
            played++;
            if (dayResult.hard.solved) solved++;
        }
        if (dayResult?.impossible) {
            played++;
            if (dayResult.impossible.solved) solved++;
        }
    });
    
    const winRate = played > 0 ? Math.round((solved / played) * 100) : 0;
    return { played, solved, winRate };
};

// Sort type for Players tab
type PlayerSortBy = 'score' | 'currentStreak' | 'maxStreak' | 'solved' | 'played' | 'winRate' | 'lastPlayed' | 'name';

// Players Tab Component
const PlayersTab: React.FC<{ 
    players: PlayerWithMeta[];
    searchPlayers: (query: string) => PlayerWithMeta[];
}> = ({ players, searchPlayers }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<PlayerSortBy>('lastPlayed');
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerWithMeta | null>(null);

    const filteredPlayers = useMemo(() => {
        let result = searchQuery ? searchPlayers(searchQuery) : players;
        
        return [...result].sort((a, b) => {
            const statsA = calculatePlayerStats(a.playerData);
            const statsB = calculatePlayerStats(b.playerData);
            const lastPlayedA = getLastPlayedFromResults(a.playerData);
            const lastPlayedB = getLastPlayedFromResults(b.playerData);
            
            switch (sortBy) {
                case 'score':
                    return (b.playerData.totalScore || 0) - (a.playerData.totalScore || 0);
                case 'currentStreak':
                    return (b.playerData.currentStreak || 0) - (a.playerData.currentStreak || 0);
                case 'maxStreak':
                    return (b.playerData.maxStreak || 0) - (a.playerData.maxStreak || 0);
                case 'solved':
                    return (b.playerData.totalSolved || 0) - (a.playerData.totalSolved || 0);
                case 'played':
                    return statsB.played - statsA.played;
                case 'winRate':
                    return statsB.winRate - statsA.winRate;
                case 'lastPlayed':
                    const dateA = lastPlayedA ? new Date(lastPlayedA).getTime() : 0;
                    const dateB = lastPlayedB ? new Date(lastPlayedB).getTime() : 0;
                    return dateB - dateA;
                case 'name':
                default:
                    const nameA = a.displayName || a.email || '';
                    const nameB = b.displayName || b.email || '';
                    return nameA.localeCompare(nameB);
            }
        });
    }, [players, searchQuery, sortBy, searchPlayers]);

    return (
        <div className="admin-players-tab">
            <div className="admin-players-controls">
                <input
                    type="text"
                    placeholder="Search by name, email, or UID..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="admin-search-input"
                />
                <select 
                    value={sortBy} 
                    onChange={e => setSortBy(e.target.value as PlayerSortBy)}
                    className="admin-sort-select"
                >
                    <option value="score">Sort by Score</option>
                    <option value="played">Sort by Played</option>
                    <option value="winRate">Sort by Win %</option>
                    <option value="currentStreak">Sort by Current Streak</option>
                    <option value="maxStreak">Sort by Max Streak</option>
                    <option value="solved">Sort by Solved</option>
                    <option value="lastPlayed">Sort by Last Played</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>

            <div className="admin-players-count">
                Showing {filteredPlayers.length} of {players.length} players
            </div>

            <div className="admin-players-table admin-players-table-wide">
                <div className="admin-players-header">
                    <div className="admin-col-name">Player</div>
                    <div className="admin-col-score">Score</div>
                    <div className="admin-col-played">Played</div>
                    <div className="admin-col-winrate">Win %</div>
                    <div className="admin-col-streak">Current Streak</div>
                    <div className="admin-col-maxstreak">Max Streak</div>
                    <div className="admin-col-solved">Solved</div>
                    <div className="admin-col-last">Last Played</div>
                </div>
                {filteredPlayers.map(player => {
                    const stats = calculatePlayerStats(player.playerData);
                    return (
                        <div 
                            key={player.uid} 
                            className="admin-player-row"
                            onClick={() => setSelectedPlayer(player)}
                        >
                            <div className="admin-col-name">
                                <div className="admin-player-name">{player.displayName || player.email || 'Anonymous'}</div>
                                <div className="admin-player-email-small">{player.email || player.uid.slice(0, 8)}</div>
                            </div>
                            <div className="admin-col-score">{player.playerData.totalScore || 0}</div>
                            <div className="admin-col-played">{stats.played}</div>
                            <div className="admin-col-winrate">{stats.winRate}%</div>
                            <div className="admin-col-streak">{player.playerData.currentStreak || 0}</div>
                            <div className="admin-col-maxstreak">{player.playerData.maxStreak || 0}</div>
                            <div className="admin-col-solved">{player.playerData.totalSolved || 0}</div>
                            <div className="admin-col-last">{formatLastPlayed(getLastPlayedFromResults(player.playerData))}</div>
                        </div>
                    );
                })}
            </div>

            {selectedPlayer && (
                <PlayerDetailModal 
                    player={selectedPlayer} 
                    onClose={() => setSelectedPlayer(null)} 
                />
            )}
        </div>
    );
};

// Leaderboard Tab Component
const LeaderboardTab: React.FC<{ 
    getLeaderboard: (limit: number) => PlayerWithMeta[];
}> = ({ getLeaderboard }) => {
    const leaderboard = getLeaderboard(25);

    return (
        <div className="admin-leaderboard-tab">
            <h2>🏆 Top 25 Players</h2>
            
            <div className="admin-leaderboard-table admin-leaderboard-table-wide">
                <div className="admin-leaderboard-header">
                    <div className="admin-lb-col-rank">Rank</div>
                    <div className="admin-lb-col-name">Player</div>
                    <div className="admin-lb-col-score">Score</div>
                    <div className="admin-lb-col-played">Played</div>
                    <div className="admin-lb-col-streak">Current Streak</div>
                    <div className="admin-lb-col-maxstreak">Max Streak</div>
                    <div className="admin-lb-col-winrate">Win %</div>
                </div>
                {leaderboard.map((player, index) => {
                    const stats = calculatePlayerStats(player.playerData);
                    
                    return (
                        <div key={player.uid} className={`admin-leaderboard-row ${index < 3 ? 'admin-top-three' : ''}`}>
                            <div className="admin-lb-col-rank">
                                {index === 0 && '🥇'}
                                {index === 1 && '🥈'}
                                {index === 2 && '🥉'}
                                {index > 2 && `#${index + 1}`}
                            </div>
                            <div className="admin-lb-col-name">
                                {player.displayName || player.email || 'Anonymous'}
                            </div>
                            <div className="admin-lb-col-score">{player.playerData.totalScore || 0}</div>
                            <div className="admin-lb-col-played">{stats.played}</div>
                            <div className="admin-lb-col-streak">🔥 {player.playerData.currentStreak || 0}</div>
                            <div className="admin-lb-col-maxstreak">🏆 {player.playerData.maxStreak || 0}</div>
                            <div className="admin-lb-col-winrate">{stats.winRate}%</div>
                        </div>
                    );
                })}
                {leaderboard.length === 0 && (
                    <div className="admin-no-data">No players yet</div>
                )}
            </div>
        </div>
    );
};

// Helper function to format relative dates for anonymous visitors
const formatAnonymousDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
        return 'Unknown';
    }
};

// Anonymous Tab Component
const AnonymousTab: React.FC<{
    metrics: AnonymousMetrics;
    day0Data: AnonymousDay0DataPoint[];
    onMetricClick: (metricType: MetricType, title: string) => void;
}> = ({ metrics, day0Data, onMetricClick }) => {
    const [showAllVisitors, setShowAllVisitors] = useState(false);
    
    // Calculate aggregate Day-0 metrics from the historical data
    const day0Aggregates = useMemo(() => {
        const totalNewVisitors = day0Data.reduce((sum, d) => sum + d.newAnonymousVisitors, 0);
        const totalDay0Starts = day0Data.reduce((sum, d) => sum + d.day0Starts, 0);
        const totalDay0Solved = day0Data.reduce((sum, d) => sum + d.day0Solved, 0);
        const day0SolveRate = totalDay0Starts > 0 
            ? Math.round((totalDay0Solved / totalDay0Starts) * 100) : 0;
        return { totalNewVisitors, totalDay0Starts, totalDay0Solved, day0SolveRate };
    }, [day0Data]);
    
    return (
        <div className="admin-anonymous-tab">
            <h2>👻 Anonymous Player Insights</h2>
            <p className="admin-metrics-hint">Track engagement from players who haven't signed up yet</p>
            
            {/* Activation Section - Day-0 Metrics */}
            <h3>🚀 Activation (Day-0 Metrics)</h3>
            <p className="admin-metrics-hint">
                First-day engagement for anonymous visitors • Click any metric to view historical chart
            </p>
            <div className="admin-metrics-grid">
                <div 
                    className="admin-metric-card admin-metric-clickable"
                    onClick={() => onMetricClick('day0Starts', 'Anonymous Day-0 Starts')}
                >
                    <div className="admin-metric-value">{day0Aggregates.totalDay0Starts}</div>
                    <div className="admin-metric-label">Day-0 Starts</div>
                    <div className="admin-metric-sub">started ≥1 puzzle on first day</div>
                    <div className="admin-metric-chart-icon">📊</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-clickable"
                    onClick={() => onMetricClick('day0Solved', 'Anonymous Day-0 Solved')}
                >
                    <div className="admin-metric-value">{day0Aggregates.totalDay0Solved}</div>
                    <div className="admin-metric-label">Day-0 Solved</div>
                    <div className="admin-metric-sub">solved ≥1 puzzle on first day</div>
                    <div className="admin-metric-chart-icon">📊</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-clickable"
                    onClick={() => onMetricClick('day0SolveRate', 'Day-0 Solve Rate')}
                >
                    <div className="admin-metric-value">{day0Aggregates.day0SolveRate}%</div>
                    <div className="admin-metric-label">Day-0 Solve Rate</div>
                    <div className="admin-metric-sub">% of starters who solved</div>
                    <div className="admin-metric-chart-icon">📈</div>
                </div>
            </div>
            
            {/* Aggregate Stats - Unconverted Only */}
            <h3>🚫 Unconverted Anonymous Visitors</h3>
            <p className="admin-metrics-hint">Visitors who played but have NOT signed up yet</p>
            <div className="admin-metrics-grid">
                <div className="admin-metric-card">
                    <div className="admin-metric-value">{metrics.totalAnonymousVisitors}</div>
                    <div className="admin-metric-label">Anonymous Visitors</div>
                    <div className="admin-metric-sub">who played puzzles</div>
                </div>
                <div className="admin-metric-card">
                    <div className="admin-metric-value">{metrics.totalAnonymousPuzzlesPlayed}</div>
                    <div className="admin-metric-label">Puzzles Played</div>
                    <div className="admin-metric-sub">by anonymous users</div>
                </div>
                <div className="admin-metric-card">
                    <div className="admin-metric-value">{metrics.anonymousWinRate}%</div>
                    <div className="admin-metric-label">Win Rate</div>
                    <div className="admin-metric-sub">anonymous users</div>
                </div>
                <div className="admin-metric-card">
                    <div className="admin-metric-value">{metrics.avgPuzzlesPerAnonymousVisitor}</div>
                    <div className="admin-metric-label">Avg Puzzles</div>
                    <div className="admin-metric-sub">per anonymous visitor</div>
                </div>
            </div>
            
            {/* Engagement Breakdown */}
            <h3>📊 Engagement Breakdown</h3>
            <div className="admin-engagement-breakdown">
                <div className="admin-engagement-bar">
                    <div className="admin-engagement-segment one-puzzle" 
                         style={{ flex: metrics.visitorsWithOnePuzzle || 1 }}>
                        <span className="admin-engagement-count">{metrics.visitorsWithOnePuzzle}</span>
                        <span className="admin-engagement-label">1 puzzle</span>
                    </div>
                    <div className="admin-engagement-segment two-to-five" 
                         style={{ flex: metrics.visitorsWith2to5Puzzles || 1 }}>
                        <span className="admin-engagement-count">{metrics.visitorsWith2to5Puzzles}</span>
                        <span className="admin-engagement-label">2-5 puzzles</span>
                    </div>
                    <div className="admin-engagement-segment six-plus" 
                         style={{ flex: metrics.visitorsWith6PlusPuzzles || 1 }}>
                        <span className="admin-engagement-count">{metrics.visitorsWith6PlusPuzzles}</span>
                        <span className="admin-engagement-label">6+ puzzles</span>
                    </div>
                </div>
            </div>
            
            {/* Conversion Comparison */}
            <h3>🔄 Conversion Comparison</h3>
            <div className="admin-conversion-comparison">
                <div className="admin-comparison-card">
                    <div className="admin-comparison-value">{metrics.avgPuzzlesBeforeSignup}</div>
                    <div className="admin-comparison-label">Avg puzzles before signup</div>
                    <div className="admin-comparison-sub">for users who converted</div>
                </div>
                <div className="admin-comparison-vs">vs</div>
                <div className="admin-comparison-card">
                    <div className="admin-comparison-value">{metrics.avgPuzzlesForNonConverters}</div>
                    <div className="admin-comparison-label">Avg puzzles for non-converters</div>
                    <div className="admin-comparison-sub">who played 3+ puzzles</div>
                </div>
            </div>
            
            {/* Estimated Score Distribution */}
            <h3>🏆 Estimated Score Distribution</h3>
            <p className="admin-metrics-hint">
                Points accumulated by anonymous visitors (base scores only, no streak bonus). 
                Useful for evaluating a "milestone signup prompt" feature.
            </p>
            
            <div className="admin-score-summary">
                <div className="admin-metric-card">
                    <div className="admin-metric-value">{metrics.totalEstimatedScore.toLocaleString()}</div>
                    <div className="admin-metric-label">Total Points</div>
                    <div className="admin-metric-sub">all anonymous visitors</div>
                </div>
                <div className="admin-metric-card">
                    <div className="admin-metric-value">{metrics.avgEstimatedScore.toLocaleString()}</div>
                    <div className="admin-metric-label">Avg Points</div>
                    <div className="admin-metric-sub">per visitor</div>
                </div>
                <div className="admin-metric-card highlight-gold">
                    <div className="admin-metric-value">{metrics.highScoreVisitors.length}</div>
                    <div className="admin-metric-label">1,000+ Points</div>
                    <div className="admin-metric-sub">potential milestone targets</div>
                </div>
            </div>
            
            <div className="admin-score-distribution-table">
                <div className="admin-score-dist-header">
                    <div className="admin-score-dist-col-tier">Point Threshold</div>
                    <div className="admin-score-dist-col-count">Visitors</div>
                    <div className="admin-score-dist-col-bar">Distribution</div>
                </div>
                {[
                    { tier: '1,000+', key: '1000+' as const },
                    { tier: '2,000+', key: '2000+' as const },
                    { tier: '3,000+', key: '3000+' as const },
                    { tier: '4,000+', key: '4000+' as const },
                    { tier: '5,000+', key: '5000+' as const },
                    { tier: '6,000+', key: '6000+' as const },
                    { tier: '7,000+', key: '7000+' as const },
                    { tier: '8,000+', key: '8000+' as const },
                    { tier: '9,000+', key: '9000+' as const },
                    { tier: '10,000+', key: '10000+' as const },
                ].map(({ tier, key }) => {
                    const count = metrics.scoreDistribution[key];
                    const maxCount = Math.max(
                        metrics.scoreDistribution['1000+'],
                        metrics.scoreDistribution['2000+'],
                        metrics.scoreDistribution['3000+'],
                        1
                    );
                    const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
                    return (
                        <div key={key} className={`admin-score-dist-row ${count > 0 ? 'has-visitors' : ''}`}>
                            <div className="admin-score-dist-col-tier">{tier}</div>
                            <div className="admin-score-dist-col-count">{count}</div>
                            <div className="admin-score-dist-col-bar">
                                <div 
                                    className="admin-score-dist-bar-fill" 
                                    style={{ width: `${barWidth}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {metrics.highScoreVisitors.length > 0 && (
                <>
                    <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                        🎯 High Score Visitors ({metrics.highScoreVisitors.length})
                    </h4>
                    <p className="admin-metrics-hint">Anonymous visitors with 1,000+ estimated points</p>
                    <div className="admin-anonymous-table">
                        <div className="admin-anonymous-header">
                            <div className="admin-anon-col-id">Visitor ID</div>
                            <div className="admin-anon-col-score">Est. Score</div>
                            <div className="admin-anon-col-puzzles">Solved</div>
                            <div className="admin-anon-col-winrate">Win %</div>
                            <div className="admin-anon-col-last">Last Seen</div>
                        </div>
                        {metrics.highScoreVisitors.slice(0, 15).map(visitor => (
                            <div key={visitor.visitorId} className="admin-anonymous-row high-score">
                                <div className="admin-anon-col-id">{visitor.visitorId.slice(0, 12)}...</div>
                                <div className="admin-anon-col-score">{visitor.estimatedScore.toLocaleString()}</div>
                                <div className="admin-anon-col-puzzles">{visitor.puzzlesSolved}</div>
                                <div className="admin-anon-col-winrate">{visitor.winRate}%</div>
                                <div className="admin-anon-col-last">{formatAnonymousDate(visitor.lastSeen)}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            
            {/* Power Users */}
            <h3>⚡ Power Users (Engaged but Unconverted)</h3>
            <p className="admin-metrics-hint">Visitors who played 5+ puzzles but haven't signed up - potential converts!</p>
            
            {metrics.powerUsers.length > 0 ? (
                <div className="admin-anonymous-table">
                    <div className="admin-anonymous-header">
                        <div className="admin-anon-col-id">Visitor ID</div>
                        <div className="admin-anon-col-puzzles">Played</div>
                        <div className="admin-anon-col-winrate">Win %</div>
                        <div className="admin-anon-col-first">First Seen</div>
                        <div className="admin-anon-col-last">Last Seen</div>
                    </div>
                    {metrics.powerUsers.slice(0, 10).map(visitor => (
                        <div key={visitor.visitorId} className="admin-anonymous-row power-user">
                            <div className="admin-anon-col-id">{visitor.visitorId.slice(0, 12)}...</div>
                            <div className="admin-anon-col-puzzles">{visitor.puzzlesPlayed}</div>
                            <div className="admin-anon-col-winrate">{visitor.winRate}%</div>
                            <div className="admin-anon-col-first">{formatAnonymousDate(visitor.firstSeen)}</div>
                            <div className="admin-anon-col-last">{formatAnonymousDate(visitor.lastSeen)}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="admin-no-data">No power users yet. Check back as more people play!</div>
            )}
            
            {/* ALL Anonymous Activity (including converters) */}
            <h3>📈 All Anonymous Activity</h3>
            <p className="admin-metrics-hint">All puzzle activity from visitors while they were anonymous (includes those who later signed up)</p>
            
            <div className="admin-metrics-grid">
                <div className="admin-metric-card">
                    <div className="admin-metric-value">{metrics.allActivity.totalVisitors}</div>
                    <div className="admin-metric-label">Total Visitors</div>
                    <div className="admin-metric-sub">who played while anonymous</div>
                </div>
                <div className="admin-metric-card">
                    <div className="admin-metric-value">{metrics.allActivity.totalPuzzlesPlayed}</div>
                    <div className="admin-metric-label">Puzzles Played</div>
                    <div className="admin-metric-sub">while anonymous</div>
                </div>
                <div className="admin-metric-card">
                    <div className="admin-metric-value">{metrics.allActivity.winRate}%</div>
                    <div className="admin-metric-label">Win Rate</div>
                    <div className="admin-metric-sub">anonymous sessions</div>
                </div>
                <div className="admin-metric-card highlight-green">
                    <div className="admin-metric-value">{metrics.allActivity.convertedCount}</div>
                    <div className="admin-metric-label">Converted</div>
                    <div className="admin-metric-sub">{metrics.allActivity.conversionRate}% signed up</div>
                </div>
            </div>
            
            {/* All Visitors Table (including converters) */}
            <button 
                className="admin-toggle-btn"
                onClick={() => setShowAllVisitors(!showAllVisitors)}
                style={{ marginTop: '1rem' }}
            >
                {showAllVisitors ? 'Hide' : 'Show'} all {metrics.allActivity.visitors.length} visitors
            </button>
            
            {showAllVisitors && metrics.allActivity.visitors.length > 0 && (
                <div className="admin-anonymous-table" style={{ marginTop: '0.5rem' }}>
                    <div className="admin-anonymous-header">
                        <div className="admin-anon-col-id">Visitor ID</div>
                        <div className="admin-anon-col-puzzles">Played</div>
                        <div className="admin-anon-col-winrate">Win %</div>
                        <div className="admin-anon-col-first">First Seen</div>
                        <div className="admin-anon-col-last">Last Played</div>
                        <div className="admin-anon-col-converted">Converted?</div>
                    </div>
                    {metrics.allActivity.visitors.map(visitor => (
                        <div key={visitor.visitorId} className={`admin-anonymous-row ${visitor.convertedToSignup ? 'converted' : ''}`}>
                            <div className="admin-anon-col-id">{visitor.visitorId.slice(0, 12)}...</div>
                            <div className="admin-anon-col-puzzles">{visitor.puzzlesPlayed}</div>
                            <div className="admin-anon-col-winrate">{visitor.winRate}%</div>
                            <div className="admin-anon-col-first">{formatAnonymousDate(visitor.firstSeen)}</div>
                            <div className="admin-anon-col-last">{formatAnonymousDate(visitor.lastSeen)}</div>
                            <div className="admin-anon-col-converted">{visitor.convertedToSignup ? '✅ Yes' : '—'}</div>
                        </div>
                    ))}
                </div>
            )}
            
            {metrics.allActivity.totalVisitors === 0 && (
                <div className="admin-no-data">
                    No anonymous visitor data yet. Data will appear as people play without signing up.
                </div>
            )}
        </div>
    );
};

// Toggle type for Retention tab
type RetentionUserType = 'all' | 'signedUp' | 'anonymous';

// Retention Tab Component
const RetentionTab: React.FC<{
    calculateRetentionMetrics: (filter: 'all' | 'signedUp' | 'anonymous') => RetentionMetrics;
}> = ({ calculateRetentionMetrics }) => {
    const [userFilter, setUserFilter] = useState<RetentionUserType>('all');
    
    // Calculate metrics based on current filter
    const metrics = useMemo(() => calculateRetentionMetrics(userFilter), [calculateRetentionMetrics, userFilter]);
    
    // Color coding for retention percentages
    const getRetentionColor = (percent: number): string => {
        if (percent >= 40) return '#22c55e'; // Green - excellent
        if (percent >= 25) return '#84cc16'; // Lime - good
        if (percent >= 15) return '#eab308'; // Yellow - okay
        if (percent >= 5) return '#f97316'; // Orange - concerning
        return '#ef4444'; // Red - needs attention
    };
    
    const filterLabels: Record<RetentionUserType, string> = {
        'all': 'All Players',
        'signedUp': 'Signed Up',
        'anonymous': 'Anonymous',
    };
    
    const filterHints: Record<RetentionUserType, string> = {
        'all': 'Showing retention for all players (signed-up + anonymous)',
        'signedUp': 'Showing retention for users who have signed up',
        'anonymous': 'Showing retention for visitors who never signed up',
    };

    return (
        <div className="admin-tab-content">
            <div className="admin-retention-header">
                <h2>Player Retention Analysis</h2>
                <div className="admin-user-type-toggle admin-retention-toggle">
                    <button 
                        className={`admin-toggle-option ${userFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setUserFilter('all')}
                    >
                        All
                    </button>
                    <button 
                        className={`admin-toggle-option ${userFilter === 'signedUp' ? 'active' : ''}`}
                        onClick={() => setUserFilter('signedUp')}
                    >
                        Signed Up
                    </button>
                    <button 
                        className={`admin-toggle-option ${userFilter === 'anonymous' ? 'active' : ''}`}
                        onClick={() => setUserFilter('anonymous')}
                    >
                        Anonymous
                    </button>
                </div>
            </div>
            <p className="admin-section-subtitle">
                {filterHints[userFilter]}
            </p>

            {/* Overall Retention Summary */}
            <div className="admin-retention-summary">
                <div className="admin-retention-stat">
                    <div className="admin-retention-value" style={{ color: getRetentionColor(metrics.overallD1) }}>
                        {metrics.overallD1}%
                    </div>
                    <div className="admin-retention-label">D1 Retention</div>
                    <div className="admin-retention-sub">Next day return</div>
                </div>
                <div className="admin-retention-stat">
                    <div className="admin-retention-value" style={{ color: getRetentionColor(metrics.overallD7) }}>
                        {metrics.overallD7}%
                    </div>
                    <div className="admin-retention-label">D7 Retention</div>
                    <div className="admin-retention-sub">Week 1 return</div>
                </div>
                <div className="admin-retention-stat">
                    <div className="admin-retention-value" style={{ color: getRetentionColor(metrics.overallD28) }}>
                        {metrics.overallD28}%
                    </div>
                    <div className="admin-retention-label">D28 Retention</div>
                    <div className="admin-retention-sub">Month 1 return</div>
                </div>
                <div className="admin-retention-stat">
                    <div className="admin-retention-value">{metrics.totalNewPlayers}</div>
                    <div className="admin-retention-label">Total Players</div>
                    <div className="admin-retention-sub">All time</div>
                </div>
            </div>

            {/* Insights Row */}
            <div className="admin-retention-insights">
                <div className="admin-insight-card">
                    <div className="admin-insight-icon">🔥</div>
                    <div className="admin-insight-content">
                        <div className="admin-insight-value">{metrics.streakPlayers}</div>
                        <div className="admin-insight-label">Streak Players</div>
                        <div className="admin-insight-desc">
                            {metrics.streakPlayerPercent}% played 3+ consecutive days
                        </div>
                    </div>
                </div>
                <div className="admin-insight-card">
                    <div className="admin-insight-icon">🎯</div>
                    <div className="admin-insight-content">
                        <div className="admin-insight-value">{metrics.avgPuzzlesBeforeReturn}</div>
                        <div className="admin-insight-label">Avg Puzzles Before Return</div>
                        <div className="admin-insight-desc">
                            Puzzles played on first day by returners
                        </div>
                    </div>
                </div>
            </div>

            {/* Cohort Table */}
            <div className="admin-section">
                <h3>Weekly Cohort Analysis</h3>
                <p className="admin-section-desc">
                    Retention rates by week of first play. D1 = returned next day, D7 = returned within week 1, D28 = returned within month.
                </p>
                
                {metrics.cohorts.length > 0 ? (
                    <div className="admin-cohort-table">
                        <div className="admin-cohort-header">
                            <div className="admin-cohort-col-week">Week</div>
                            <div className="admin-cohort-col-new">New Players</div>
                            <div className="admin-cohort-col-d1">D1</div>
                            <div className="admin-cohort-col-d7">D7</div>
                            <div className="admin-cohort-col-d28">D28</div>
                        </div>
                        {metrics.cohorts.map((cohort) => (
                            <div key={cohort.weekStart} className="admin-cohort-row">
                                <div className="admin-cohort-col-week">{cohort.weekLabel}</div>
                                <div className="admin-cohort-col-new">{cohort.newPlayers}</div>
                                <div className="admin-cohort-col-d1">
                                    <span 
                                        className="admin-retention-badge"
                                        style={{ backgroundColor: getRetentionColor(cohort.d1Retained) }}
                                    >
                                        {cohort.d1Retained}%
                                    </span>
                                    <span className="admin-cohort-count">({cohort.d1Count})</span>
                                </div>
                                <div className="admin-cohort-col-d7">
                                    <span 
                                        className="admin-retention-badge"
                                        style={{ backgroundColor: getRetentionColor(cohort.d7Retained) }}
                                    >
                                        {cohort.d7Retained}%
                                    </span>
                                    <span className="admin-cohort-count">({cohort.d7Count})</span>
                                </div>
                                <div className="admin-cohort-col-d28">
                                    <span 
                                        className="admin-retention-badge"
                                        style={{ backgroundColor: getRetentionColor(cohort.d28Retained) }}
                                    >
                                        {cohort.d28Retained}%
                                    </span>
                                    <span className="admin-cohort-count">({cohort.d28Count})</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="admin-no-data">
                        No cohort data available yet. Data will appear as players complete puzzles.
                    </div>
                )}
            </div>

            {/* Interpretation Guide */}
            <div className="admin-retention-guide">
                <h4>How to Read This Data</h4>
                <ul>
                    <li><strong>D1 Retention:</strong> Did they come back the very next day? High D1 = strong initial hook.</li>
                    <li><strong>D7 Retention:</strong> Did they return within the first week? Shows habit formation potential.</li>
                    <li><strong>D28 Retention:</strong> Long-term stickiness. High D28 = truly engaged players.</li>
                    <li><strong>Streak Players:</strong> Players who played 3+ days in a row - your most engaged cohort.</li>
                </ul>
                <p className="admin-retention-benchmarks">
                    <strong>Benchmarks:</strong> Casual games typically see D1: 20-30%, D7: 10-20%, D28: 5-10%. 
                    Daily puzzle games like Wordle can see higher due to FOMO mechanics.
                </p>
            </div>
        </div>
    );
};

// Insights Tab Component - Puzzle Quality, Engagement, Feature Usage
const InsightsTab: React.FC<{
    puzzleQuality: PuzzleQualityMetrics;
    engagement: EngagementMetrics;
    featureUsage: FeatureUsageMetrics;
}> = ({ puzzleQuality, engagement, featureUsage }) => {
    // Format time in mm:ss
    const formatTime = (seconds: number): string => {
        if (seconds === 0) return '—';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${String(secs).padStart(2, '0')}`;
    };
    
    // Get puzzle words from puzzle index
    const getPuzzleWords = (puzzleId: number): string => {
        const puzzle = PREGENERATED_PUZZLES[puzzleId];
        if (!puzzle) return 'Unknown puzzle';
        return puzzle.solution.join(' → ');
    };

    return (
        <div className="admin-insights-tab">
            {/* Panel 1: Puzzle Quality */}
            <section className="admin-insights-panel">
                <h2>🧩 Puzzle Quality</h2>
                <p className="admin-metrics-hint">
                    Identify which puzzles are too hard/easy, cause frustration, or delight players.
                </p>

                <h3>Performance by Difficulty</h3>
                {puzzleQuality.byDifficulty.length > 0 ? (
                    <div className="admin-puzzle-quality-table">
                        <div className="admin-pq-header">
                            <div className="admin-pq-col-diff">Difficulty</div>
                            <div className="admin-pq-col-plays">Plays</div>
                            <div className="admin-pq-col-solve">Solve Rate</div>
                            <div className="admin-pq-col-moves">Avg Moves</div>
                            <div className="admin-pq-col-time">Avg Time</div>
                        </div>
                        {puzzleQuality.byDifficulty.map((stat) => (
                            <div key={stat.difficulty} className="admin-pq-row">
                                <div className="admin-pq-col-diff">
                                    <span className={`admin-diff-badge admin-diff-${stat.difficulty.toLowerCase()}`}>
                                        {stat.difficulty}
                                    </span>
                                </div>
                                <div className="admin-pq-col-plays">{stat.totalPlays}</div>
                                <div className="admin-pq-col-solve">
                                    <span className={`admin-rate-badge ${stat.solveRate >= 70 ? 'good' : stat.solveRate >= 50 ? 'ok' : 'low'}`}>
                                        {stat.solveRate}%
                                    </span>
                                </div>
                                <div className="admin-pq-col-moves">{stat.avgMoves || '—'}</div>
                                <div className="admin-pq-col-time">{formatTime(stat.avgTimeSeconds)}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="admin-no-data">No puzzle completion data yet.</div>
                )}

                <div className="admin-puzzle-lists">
                    <div className="admin-puzzle-list">
                        <h4>😤 Struggle Puzzles</h4>
                        <p className="admin-list-hint">High moves + low solve rate</p>
                        {puzzleQuality.strugglePuzzles.length > 0 ? (
                            <ul className="admin-puzzle-items">
                                {puzzleQuality.strugglePuzzles.map((p) => (
                                    <li key={p.puzzleId} className="admin-puzzle-item struggle">
                                        <div className="admin-puzzle-header">
                                            <span className="admin-puzzle-id">#{p.puzzleId}</span>
                                            <span className="admin-puzzle-diff">{p.difficulty}</span>
                                            <span className="admin-puzzle-stat">{p.solveRate}% solve</span>
                                            <span className="admin-puzzle-stat">{p.avgMoves} moves</span>
                                        </div>
                                        <div className="admin-puzzle-words">{getPuzzleWords(p.puzzleId)}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="admin-no-items">No struggle puzzles identified</p>
                        )}
                    </div>
                    <div className="admin-puzzle-list">
                        <h4>😊 Satisfying Puzzles</h4>
                        <p className="admin-list-hint">High solve rate + low moves</p>
                        {puzzleQuality.satisfyingPuzzles.length > 0 ? (
                            <ul className="admin-puzzle-items">
                                {puzzleQuality.satisfyingPuzzles.map((p) => (
                                    <li key={p.puzzleId} className="admin-puzzle-item satisfying">
                                        <div className="admin-puzzle-header">
                                            <span className="admin-puzzle-id">#{p.puzzleId}</span>
                                            <span className="admin-puzzle-diff">{p.difficulty}</span>
                                            <span className="admin-puzzle-stat">{p.solveRate}% solve</span>
                                            <span className="admin-puzzle-stat">{p.avgMoves} moves</span>
                                        </div>
                                        <div className="admin-puzzle-words">{getPuzzleWords(p.puzzleId)}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="admin-no-items">No satisfying puzzles identified</p>
                        )}
                    </div>
                </div>
                <p className="admin-analyzed-count">Analyzed {puzzleQuality.totalPuzzlesAnalyzed} puzzles with 3+ plays</p>
            </section>

            {/* Panel 2: Engagement Metrics */}
            <section className="admin-insights-panel">
                <h2>💡 Engagement Metrics</h2>
                <p className="admin-metrics-hint">
                    Measure player curiosity and feature discovery.
                </p>

                <div className="admin-engagement-grid">
                    <div className="admin-engagement-card">
                        <div className="admin-engagement-value">{engagement.explanationViewRate}%</div>
                        <div className="admin-engagement-label">Explanation View Rate</div>
                        <div className="admin-engagement-sub">
                            {engagement.explanationViews} of {engagement.totalSolves} solves
                        </div>
                    </div>
                    <div className="admin-engagement-card">
                        <div className="admin-engagement-value">{engagement.badgeViewsPerPlayer}</div>
                        <div className="admin-engagement-label">Badge Views per Player</div>
                        <div className="admin-engagement-sub">
                            {engagement.totalBadgeViews} total views
                        </div>
                    </div>
                    <div className="admin-engagement-card">
                        <div className="admin-engagement-value">{engagement.bonusParticipationRate}%</div>
                        <div className="admin-engagement-label">Bonus Round Participation</div>
                        <div className="admin-engagement-sub">
                            {engagement.bonusStarts} of {engagement.completedDays} completed days
                        </div>
                    </div>
                </div>

                <h3>Most Viewed Badges</h3>
                {engagement.topViewedBadges.length > 0 ? (
                    <div className="admin-badge-table">
                        <div className="admin-badge-header">
                            <div className="admin-badge-col-id">Badge</div>
                            <div className="admin-badge-col-views">Views</div>
                            <div className="admin-badge-col-unlocks">Unlocks</div>
                        </div>
                        {engagement.topViewedBadges.map((badge) => (
                            <div key={badge.badgeId} className="admin-badge-row">
                                <div className="admin-badge-col-id">{badge.badgeId}</div>
                                <div className="admin-badge-col-views">{badge.views}</div>
                                <div className="admin-badge-col-unlocks">{badge.unlocks}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="admin-no-data">No badge view data yet.</div>
                )}
            </section>

            {/* Panel 3: Feature Usage */}
            <section className="admin-insights-panel">
                <h2>🔧 Feature Usage</h2>
                <p className="admin-metrics-hint">
                    Understand how players use optional features.
                </p>

                <div className="admin-feature-grid">
                    {/* Archive Usage */}
                    <div className="admin-feature-section">
                        <h3>📅 Archive Plays</h3>
                        <div className="admin-feature-stats">
                            <div className="admin-feature-stat">
                                <div className="admin-feature-value">{featureUsage.archivePlays}</div>
                                <div className="admin-feature-label">Total Plays</div>
                            </div>
                            <div className="admin-feature-stat">
                                <div className="admin-feature-value">{featureUsage.archivePlayersCount}</div>
                                <div className="admin-feature-label">Players</div>
                            </div>
                            <div className="admin-feature-stat">
                                <div className="admin-feature-value">{featureUsage.avgArchivePlaysPerUser}</div>
                                <div className="admin-feature-label">Avg per User</div>
                            </div>
                        </div>

                        <h4>Days Ago Distribution</h4>
                        <div className="admin-days-ago-chart">
                            {Object.entries(featureUsage.daysAgoDistribution).map(([range, count]) => (
                                <div key={range} className="admin-days-ago-bar">
                                    <div className="admin-days-ago-label">{range} days</div>
                                    <div className="admin-days-ago-track">
                                        <div 
                                            className="admin-days-ago-fill"
                                            style={{ 
                                                width: `${featureUsage.archivePlays > 0 
                                                    ? (count / featureUsage.archivePlays) * 100 
                                                    : 0}%` 
                                            }}
                                        />
                                    </div>
                                    <div className="admin-days-ago-count">{count}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Theme Preference */}
                    <div className="admin-feature-section">
                        <h3>🎨 Theme Preference</h3>
                        <div className="admin-theme-stats">
                            <div className="admin-theme-bar">
                                <div 
                                    className="admin-theme-segment light"
                                    style={{ flex: featureUsage.themePreferencePercent.light }}
                                >
                                    ☀️ {featureUsage.themePreferencePercent.light}%
                                </div>
                                <div 
                                    className="admin-theme-segment dark"
                                    style={{ flex: featureUsage.themePreferencePercent.dark }}
                                >
                                    🌙 {featureUsage.themePreferencePercent.dark}%
                                </div>
                            </div>
                            <div className="admin-theme-counts">
                                <span>Light: {featureUsage.lightModeUsers} users</span>
                                <span>Dark: {featureUsage.darkModeUsers} users</span>
                                <span>Toggles: {featureUsage.themeToggleCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Trends Tab Component - Time-series charts for game health
type TrendsUserFilter = 'all' | 'signedUp' | 'anonymous';

const TrendsTab: React.FC<{
    historicalData: DailyDataPoint[];
    retentionData: RetentionMetrics;
    winRateData: WinRateTrendPoint[];
    engagementData: EngagementTrendPoint[];
    timeRange: TimeRange;
    onTimeRangeChange: (range: TimeRange) => void;
    userFilter: TrendsUserFilter;
    onUserFilterChange: (filter: TrendsUserFilter) => void;
    theme: 'light' | 'dark';
}> = ({ historicalData, retentionData, winRateData, engagementData, timeRange, onTimeRangeChange, userFilter, onUserFilterChange, theme }) => {
    const isDark = theme === 'dark';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const textColor = isDark ? '#f0f0f0' : '#331922';
    
    const TIME_RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
        { value: '7days', label: '7 Days' },
        { value: '14days', label: '14 Days' },
        { value: '28days', label: '28 Days' },
        { value: 'all', label: 'All Time' },
    ];
    
    const USER_FILTER_OPTIONS: { value: TrendsUserFilter; label: string }[] = [
        { value: 'all', label: 'All' },
        { value: 'signedUp', label: 'Signed Up' },
        { value: 'anonymous', label: 'Anonymous' },
    ];
    
    const filterHints: Record<TrendsUserFilter, string> = {
        'all': 'Showing all players (signed-up + anonymous)',
        'signedUp': 'Showing signed-up users only',
        'anonymous': 'Showing anonymous visitors only',
    };

    // Custom tooltip for multi-line charts
    const MultiLineTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="trends-tooltip">
                    <p className="trends-tooltip-label">{label}</p>
                    {payload.map((entry: any, idx: number) => (
                        <p key={idx} className="trends-tooltip-value" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}{entry.unit || ''}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="admin-trends-tab">
            <div className="admin-trends-header">
                <h2>📈 Trends Over Time</h2>
                <div className="admin-trends-controls">
                    <div className="admin-user-type-toggle">
                        {USER_FILTER_OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                className={`admin-toggle-option ${userFilter === opt.value ? 'active' : ''}`}
                                onClick={() => onUserFilterChange(opt.value)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                    <div className="admin-time-range-selector">
                        {TIME_RANGE_OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                className={`admin-time-btn ${timeRange === opt.value ? 'active' : ''}`}
                                onClick={() => onTimeRangeChange(opt.value)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <p className="admin-metrics-hint">
                {filterHints[userFilter]}
            </p>

            <div className="admin-trends-grid">
                {/* Chart 1: DAU + New Players */}
                <div className="admin-trend-panel">
                    <h3>👥 DAU + New Players</h3>
                    <div className="admin-trend-chart">
                        <ResponsiveContainer width="100%" height={250}>
                            <ComposedChart data={historicalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis 
                                    dataKey="displayDate" 
                                    tick={{ fill: textColor, fontSize: 11 }}
                                    tickLine={{ stroke: gridColor }}
                                />
                                <YAxis 
                                    yAxisId="left"
                                    tick={{ fill: textColor, fontSize: 11 }}
                                    tickLine={{ stroke: gridColor }}
                                />
                                <YAxis 
                                    yAxisId="right"
                                    orientation="right"
                                    tick={{ fill: textColor, fontSize: 11 }}
                                    tickLine={{ stroke: gridColor }}
                                />
                                <Tooltip content={<MultiLineTooltip />} />
                                <Legend />
                                <Line 
                                    yAxisId="left"
                                    type="monotone" 
                                    dataKey="dau" 
                                    name="DAU"
                                    stroke="#22c55e" 
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Bar 
                                    yAxisId="right"
                                    dataKey="newSignups" 
                                    name="New Players"
                                    fill="#6366f1" 
                                    radius={[2, 2, 0, 0]}
                                    opacity={0.7}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 2: Retention Trend */}
                <div className="admin-trend-panel">
                    <h3>🔄 Retention by Cohort</h3>
                    <div className="admin-trend-chart">
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart 
                                data={retentionData.cohorts.slice().reverse()} 
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis 
                                    dataKey="weekLabel" 
                                    tick={{ fill: textColor, fontSize: 11 }}
                                    tickLine={{ stroke: gridColor }}
                                />
                                <YAxis 
                                    tick={{ fill: textColor, fontSize: 11 }}
                                    tickLine={{ stroke: gridColor }}
                                    domain={[0, 100]}
                                    tickFormatter={(v) => `${v}%`}
                                />
                                <Tooltip content={<MultiLineTooltip />} />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="d1Retained" 
                                    name="D1 %"
                                    stroke="#22c55e" 
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    unit="%"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="d7Retained" 
                                    name="D7 %"
                                    stroke="#f59e0b" 
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    unit="%"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 3: Win Rate by Difficulty */}
                <div className="admin-trend-panel">
                    <h3>🎯 Win Rate by Difficulty</h3>
                    <div className="admin-trend-chart">
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={winRateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis 
                                    dataKey="displayDate" 
                                    tick={{ fill: textColor, fontSize: 11 }}
                                    tickLine={{ stroke: gridColor }}
                                />
                                <YAxis 
                                    tick={{ fill: textColor, fontSize: 11 }}
                                    tickLine={{ stroke: gridColor }}
                                    domain={[0, 100]}
                                    tickFormatter={(v) => `${v}%`}
                                />
                                <Tooltip content={<MultiLineTooltip />} />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="easyWinRate" 
                                    name="Easy"
                                    stroke="#22c55e" 
                                    strokeWidth={2}
                                    dot={false}
                                    unit="%"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="hardWinRate" 
                                    name="Hard"
                                    stroke="#f59e0b" 
                                    strokeWidth={2}
                                    dot={false}
                                    unit="%"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="impossibleWinRate" 
                                    name="Impossible"
                                    stroke="#ef4444" 
                                    strokeWidth={2}
                                    dot={false}
                                    unit="%"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 4: Engagement Funnel */}
                <div className="admin-trend-panel">
                    <h3>🎮 Engagement Funnel</h3>
                    <div className="admin-trend-chart">
                        <ResponsiveContainer width="100%" height={250}>
                            <ComposedChart data={engagementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis 
                                    dataKey="displayDate" 
                                    tick={{ fill: textColor, fontSize: 11 }}
                                    tickLine={{ stroke: gridColor }}
                                />
                                <YAxis 
                                    tick={{ fill: textColor, fontSize: 11 }}
                                    tickLine={{ stroke: gridColor }}
                                />
                                <Tooltip content={<MultiLineTooltip />} />
                                <Legend />
                                <Bar 
                                    dataKey="puzzlesStarted" 
                                    name="Started"
                                    fill="#94a3b8" 
                                    radius={[2, 2, 0, 0]}
                                />
                                <Bar 
                                    dataKey="puzzlesCompleted" 
                                    name="Completed"
                                    fill="#22c55e" 
                                    radius={[2, 2, 0, 0]}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="shareClicks" 
                                    name="Shares"
                                    stroke="#8b5cf6" 
                                    strokeWidth={2}
                                    dot={{ r: 3 }}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for metric cards in Growth tab
const GrowthMetricCard: React.FC<{
    label: string;
    value: number | string;
    suffix?: string;
    delta?: number;
    deltaType?: 'pp' | 'percent' | 'absolute';
    target?: number;
    targetLabel?: string;
    subline?: string;
    isNorthStar?: boolean;
    onClick?: () => void;
}> = ({ label, value, suffix = '', delta, deltaType = 'pp', target, targetLabel, subline, isNorthStar, onClick }) => {
    const formatDelta = (d: number, type: string) => {
        const sign = d >= 0 ? '+' : '';
        if (type === 'pp') return `${sign}${d.toFixed(1)}pp`;
        if (type === 'percent') return `${sign}${d.toFixed(1)}%`;
        return `${sign}${d.toFixed(1)}`;
    };
    
    const deltaClass = delta !== undefined 
        ? (delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'neutral') 
        : '';
    
    // Calculate progress towards target
    const numValue = typeof value === 'number' ? value : parseFloat(String(value));
    const progressPercent = target && target > 0 ? Math.min(100, (numValue / target) * 100) : 0;
    
    const isClickable = !!onClick;
    
    return (
        <div 
            className={`growth-metric-card ${isNorthStar ? 'north-star' : ''} ${isClickable ? 'clickable' : ''}`}
            onClick={onClick}
            style={isClickable ? { cursor: 'pointer' } : undefined}
        >
            <div className="metric-label">{label}</div>
            <div className="metric-value-row">
                <span className="metric-value">
                    {typeof value === 'number' ? value.toFixed(1) : value}{suffix}
                </span>
                {delta !== undefined && (
                    <span className={`metric-delta ${deltaClass}`}>
                        {formatDelta(delta, deltaType)}
                    </span>
                )}
                {isClickable && <span className="admin-metric-chart-icon">📈</span>}
            </div>
            {target !== undefined && (
                <div className="metric-target-container">
                    <div className="metric-target-bar">
                        <div 
                            className="metric-target-progress" 
                            style={{ width: `${progressPercent}%` }}
                        />
                        <div 
                            className="metric-target-line" 
                            style={{ left: '100%' }}
                        />
                    </div>
                    <div className="metric-target-label">
                        Target: {target}{suffix} {targetLabel || ''}
                    </div>
                </div>
            )}
            {subline && <div className="metric-subline">{subline}</div>}
        </div>
    );
};

// Verdict types and calculation for Growth tab
type VerdictStatus = 'healthy' | 'watch' | 'action';
interface Verdict {
    status: VerdictStatus;
    emoji: string;
    label: string;
    description: string;
}

// Calculate verdicts for each section based on metrics
const getVerdicts = (m: GrowthMetrics): Record<string, Verdict> => {
    const verdicts: Record<string, Verdict> = {};
    
    // Row 1 - North Star: Returning Players
    const northStarDelta = m.returningPlayersPercentL7 - m.returningPlayersPercentP7;
    if (m.returningPlayersPercentL7 >= 25) {
        verdicts.northStar = { status: 'healthy', emoji: '🟢', label: 'Healthy', description: 'On track! 25%+ players returning.' };
    } else if (northStarDelta > 0) {
        verdicts.northStar = { status: 'watch', emoji: '🟡', label: 'Watch', description: `${m.returningPlayersPercentL7.toFixed(0)}% returning (target: 25%), but trending up.` };
    } else {
        verdicts.northStar = { status: 'action', emoji: '🔴', label: 'Action Needed', description: `Only ${m.returningPlayersPercentL7.toFixed(0)}% returning and declining. Focus on retention.` };
    }
    
    // Row 2 - Growth Health: Expansion vs Recycling
    const newVisitorsDelta = ((m.newVisitorsPerDayL7 - m.newVisitorsPerDayP7) / Math.max(m.newVisitorsPerDayP7, 0.1)) * 100;
    const dauDelta = ((m.dauL7 - m.dauP7) / Math.max(m.dauP7, 0.1)) * 100;
    
    if (newVisitorsDelta > 5 && dauDelta > 0) {
        verdicts.growthHealth = { status: 'healthy', emoji: '🟢', label: 'Expanding', description: 'New visitors and DAU both growing. Healthy expansion.' };
    } else if (newVisitorsDelta < 0 && dauDelta > 0) {
        verdicts.growthHealth = { status: 'watch', emoji: '🟡', label: 'Retention-Led', description: 'DAU up but new visitors declining. Need acquisition boost.' };
    } else if (newVisitorsDelta > 0 && m.returningShareL7 < 50) {
        verdicts.growthHealth = { status: 'watch', emoji: '🟡', label: 'Leaky Bucket', description: 'Acquiring users but they\'re not coming back.' };
    } else if (newVisitorsDelta < -10 || dauDelta < -10) {
        verdicts.growthHealth = { status: 'action', emoji: '🔴', label: 'Declining', description: 'Both acquisition and activity are down. Investigate root cause.' };
    } else {
        verdicts.growthHealth = { status: 'watch', emoji: '🟡', label: 'Stable', description: 'Metrics are flat. Look for growth levers.' };
    }
    
    // Row 3 - Activation: Day-0 metrics
    const avgActivation = (m.day0StartRate + m.day0SolveRate) / 2;
    if (m.day0StartRate >= 70 && m.day0SolveRate >= 45) {
        verdicts.activation = { status: 'healthy', emoji: '🟢', label: 'Healthy', description: 'Day-0 experience is converting well.' };
    } else if (m.day0SolveRate < 35) {
        verdicts.activation = { status: 'action', emoji: '🔴', label: 'Biggest Leak', description: `Only ${m.day0SolveRate.toFixed(0)}% solve on Day-0 (target: 45%). Your biggest opportunity.` };
    } else if (m.day0StartRate < 60) {
        verdicts.activation = { status: 'action', emoji: '🔴', label: 'Low Starts', description: `Only ${m.day0StartRate.toFixed(0)}% start a puzzle on Day-0. Reduce friction.` };
    } else {
        verdicts.activation = { status: 'watch', emoji: '🟡', label: 'Room to Improve', description: `Day-0 metrics below target. Focus on first-time experience.` };
    }
    
    // Row 4 - Retention: D1/D7
    if (m.d1Overall >= 12 && m.d7Overall >= 6) {
        verdicts.retention = { status: 'healthy', emoji: '🟢', label: 'Healthy', description: 'Retention rates meeting targets.' };
    } else if (m.d1SignedIn >= 29 && m.d1Overall < 12) {
        verdicts.retention = { status: 'watch', emoji: '🟡', label: 'Signed-In Strong', description: `Overall D1 ${m.d1Overall.toFixed(0)}% (target: 12%), but signed-in at ${m.d1SignedIn.toFixed(0)}%. Push signups.` };
    } else if (m.d1Overall < 8) {
        verdicts.retention = { status: 'action', emoji: '🔴', label: 'Low Retention', description: `D1 at ${m.d1Overall.toFixed(0)}% is below healthy threshold. Improve Day-0 experience.` };
    } else {
        verdicts.retention = { status: 'watch', emoji: '🟡', label: 'Watch', description: `D1 ${m.d1Overall.toFixed(0)}% / D7 ${m.d7Overall.toFixed(0)}% — approaching targets.` };
    }
    
    // Row 5 - Engagement: Depth
    if (m.sessionsPerDauL7 >= 2.0 && m.puzzlesPerDauL7 >= 1.5) {
        verdicts.engagement = { status: 'healthy', emoji: '🟢', label: 'Healthy', description: 'Users engaging deeply with multiple sessions and puzzles.' };
    } else if (m.dauMauSignedIn >= 20) {
        verdicts.engagement = { status: 'healthy', emoji: '🟢', label: 'Daily Loop', description: `${m.dauMauSignedIn.toFixed(0)}% DAU/MAU indicates a healthy daily habit.` };
    } else if (m.sessionsPerDauL7 < 1.5) {
        verdicts.engagement = { status: 'watch', emoji: '🟡', label: 'One and Done', description: `Only ${m.sessionsPerDauL7.toFixed(1)} sessions/DAU. Users aren't returning same day.` };
    } else {
        verdicts.engagement = { status: 'watch', emoji: '🟡', label: 'Building', description: 'Engagement growing but not yet habitual.' };
    }
    
    // Row 6 - Conversion + Sharing
    if (m.visitorToSignupL28 >= 8 && m.shareRateL28 >= 3) {
        verdicts.conversion = { status: 'healthy', emoji: '🟢', label: 'Growth Engine', description: 'Conversion and sharing are fueling growth.' };
    } else if (m.signupPromptCoverage < 15) {
        verdicts.conversion = { status: 'action', emoji: '🔴', label: 'Under-Prompting', description: `Only ${m.signupPromptCoverage.toFixed(0)}% see signup prompt (target: 20%). Show it more!` };
    } else if (m.shareRateL28 < 2) {
        verdicts.conversion = { status: 'watch', emoji: '🟡', label: 'Low Sharing', description: `Only ${m.shareRateL28.toFixed(1)}% share (target: 3%). Make sharing more rewarding.` };
    } else if (m.visitorToSignupL28 < 5) {
        verdicts.conversion = { status: 'watch', emoji: '🟡', label: 'Low Conversion', description: `${m.visitorToSignupL28.toFixed(1)}% signup rate. Improve value prop clarity.` };
    } else {
        verdicts.conversion = { status: 'watch', emoji: '🟡', label: 'Progressing', description: 'Conversion metrics improving but not yet at target.' };
    }
    
    return verdicts;
};

// Verdict Badge Component
const VerdictBadge: React.FC<{ verdict: Verdict }> = ({ verdict }) => (
    <div className={`verdict-badge verdict-${verdict.status}`}>
        <span className="verdict-emoji">{verdict.emoji}</span>
        <span className="verdict-label">{verdict.label}</span>
        <span className="verdict-description">{verdict.description}</span>
    </div>
);

// Growth Dashboard Tab Component
const GrowthTab: React.FC<{
    metrics: GrowthMetrics;
    onMetricClick?: (metricType: MetricType, title: string) => void;
}> = ({ metrics, onMetricClick }) => {
    const verdicts = getVerdicts(metrics);
    
    return (
        <div className="admin-growth-tab">
            {/* Row 1 - North Star */}
            <div className="growth-row">
                <div className="growth-row-header">
                    <div className="growth-row-title-line">
                        <h3>⭐ North Star</h3>
                        <VerdictBadge verdict={verdicts.northStar} />
                    </div>
                    <p className="growth-row-description">
                        The single most important metric: are people coming back?
                    </p>
                </div>
                <div className="growth-metrics-grid north-star-grid">
                    <GrowthMetricCard
                        label="Returning Players (L7)"
                        value={metrics.returningPlayersPercentL7}
                        suffix="%"
                        delta={metrics.returningPlayersPercentL7 - metrics.returningPlayersPercentP7}
                        deltaType="pp"
                        target={25}
                        targetLabel="(4wk)"
                        subline={`${metrics.returningPlayersL7} of ${metrics.totalPlayersL7} players played 2+ days`}
                        isNorthStar
                    />
                </div>
            </div>

            {/* Row 2 - Growth Health */}
            <div className="growth-row">
                <div className="growth-row-header">
                    <div className="growth-row-title-line">
                        <h3>📈 Growth Health</h3>
                        <VerdictBadge verdict={verdicts.growthHealth} />
                    </div>
                    <p className="growth-row-description">
                        Are we expanding or just recycling the same users?
                    </p>
                </div>
                <div className="growth-metrics-grid">
                    <GrowthMetricCard
                        label="New Visitors / Day (L7)"
                        value={metrics.newVisitorsPerDayL7}
                        suffix=""
                        delta={((metrics.newVisitorsPerDayL7 - metrics.newVisitorsPerDayP7) / Math.max(metrics.newVisitorsPerDayP7, 0.1)) * 100}
                        deltaType="percent"
                        target={30}
                        subline={`L7: ${metrics.newVisitorsPerDayL7.toFixed(1)} vs P7: ${metrics.newVisitorsPerDayP7.toFixed(1)}`}
                    />
                    <GrowthMetricCard
                        label="DAU (Visitors) L7 avg"
                        value={metrics.dauL7}
                        suffix=""
                        delta={((metrics.dauL7 - metrics.dauP7) / Math.max(metrics.dauP7, 0.1)) * 100}
                        deltaType="percent"
                        subline={`L7: ${metrics.dauL7.toFixed(1)} vs P7: ${metrics.dauP7.toFixed(1)}`}
                    />
                    <GrowthMetricCard
                        label="Returning Share of DAU (L7)"
                        value={metrics.returningShareL7}
                        suffix="%"
                        delta={metrics.returningShareL7 - metrics.returningShareP7}
                        deltaType="pp"
                        target={65}
                        subline={`L7: ${metrics.returningShareL7.toFixed(1)}% vs P7: ${metrics.returningShareP7.toFixed(1)}%`}
                    />
                </div>
            </div>

            {/* Row 3 - Activation */}
            <div className="growth-row">
                <div className="growth-row-header">
                    <div className="growth-row-title-line">
                        <h3>🚀 Activation</h3>
                        <VerdictBadge verdict={verdicts.activation} />
                    </div>
                    <p className="growth-row-description">
                        Day-0 experience quality - your biggest leak to fix
                        {onMetricClick && ' • Click any metric to view historical chart'}
                    </p>
                </div>
                <div className="growth-metrics-grid">
                    <GrowthMetricCard
                        label="Day-0 Start Rate"
                        value={metrics.day0StartRate}
                        suffix="%"
                        target={70}
                        subline={`% of new visitors who start ≥1 puzzle`}
                        onClick={onMetricClick ? () => onMetricClick('day0StartRate', 'Day-0 Start Rate') : undefined}
                    />
                    <GrowthMetricCard
                        label="Day-0 Solve Rate"
                        value={metrics.day0SolveRate}
                        suffix="%"
                        target={45}
                        targetLabel="(near-term)"
                        subline={`% of new visitors who solve ≥1 puzzle`}
                        onClick={onMetricClick ? () => onMetricClick('day0SolveRate', 'Day-0 Solve Rate') : undefined}
                    />
                    <GrowthMetricCard
                        label="Day-0 Depth (3+ puzzles)"
                        value={metrics.day0DepthRate}
                        suffix="%"
                        target={12}
                        subline={`% of new visitors who start ≥3 puzzles`}
                        onClick={onMetricClick ? () => onMetricClick('day0DepthRate', 'Day-0 Depth Rate') : undefined}
                    />
                </div>
            </div>

            {/* Row 4 - Retention */}
            <div className="growth-row">
                <div className="growth-row-header">
                    <div className="growth-row-title-line">
                        <h3>🔄 Retention</h3>
                        <VerdictBadge verdict={verdicts.retention} />
                    </div>
                    <p className="growth-row-description">
                        The stickiness scoreboard - are players coming back?
                    </p>
                </div>
                <div className="growth-metrics-grid">
                    <GrowthMetricCard
                        label="D1 Retention (Overall)"
                        value={metrics.d1Overall}
                        suffix="%"
                        target={12}
                        targetLabel="(near-term)"
                        subline={`% of new visitors who return next day`}
                    />
                    <GrowthMetricCard
                        label="D7 Retention (Overall)"
                        value={metrics.d7Overall}
                        suffix="%"
                        target={6}
                        targetLabel="(near-term)"
                        subline={`% of new visitors who return 7 days later`}
                    />
                    <GrowthMetricCard
                        label="D1 Retention (Signed-In)"
                        value={metrics.d1SignedIn}
                        suffix="%"
                        target={35}
                        subline={`Signed-in users only`}
                    />
                    <GrowthMetricCard
                        label="D7 Retention (Signed-In)"
                        value={metrics.d7SignedIn}
                        suffix="%"
                        target={18}
                        subline={`Signed-in users only`}
                    />
                </div>
            </div>

            {/* Row 5 - Engagement */}
            <div className="growth-row">
                <div className="growth-row-header">
                    <div className="growth-row-title-line">
                        <h3>🎮 Engagement</h3>
                        <VerdictBadge verdict={verdicts.engagement} />
                    </div>
                    <p className="growth-row-description">
                        Are sessions "one and done" or deeper?
                    </p>
                </div>
                <div className="growth-metrics-grid">
                    <GrowthMetricCard
                        label="Sessions per DAU (L7)"
                        value={metrics.sessionsPerDauL7}
                        suffix=""
                        target={2.2}
                        subline={`Higher = users coming back same day`}
                    />
                    <GrowthMetricCard
                        label="Puzzles Started per DAU (L7)"
                        value={metrics.puzzlesPerDauL7}
                        suffix=""
                        target={1.6}
                        subline={`Higher = users exploring more content`}
                    />
                    <GrowthMetricCard
                        label="DAU/MAU (Signed-In)"
                        value={metrics.dauMauSignedIn}
                        suffix="%"
                        target={20}
                        targetLabel="(healthy daily loop)"
                        subline={`${metrics.signedInDau} DAU / ${metrics.signedInMau} MAU`}
                    />
                </div>
            </div>

            {/* Row 6 - Conversion + Sharing */}
            <div className="growth-row">
                <div className="growth-row-header">
                    <div className="growth-row-title-line">
                        <h3>📣 Conversion + Sharing</h3>
                        <VerdictBadge verdict={verdicts.conversion} />
                    </div>
                    <p className="growth-row-description">
                        Growth multiplier - turning visitors into advocates
                    </p>
                </div>
                <div className="growth-metrics-grid">
                    <GrowthMetricCard
                        label="Visitor → Signup (L28)"
                        value={metrics.visitorToSignupL28}
                        suffix="%"
                        target={8}
                        targetLabel="(near-term)"
                        subline={`${metrics.totalSignupsL28} signups / ${metrics.totalVisitorsL28} visitors`}
                    />
                    <GrowthMetricCard
                        label="Signup Prompt Coverage"
                        value={metrics.signupPromptCoverage}
                        suffix="%"
                        target={20}
                        subline={`% of visitors who see signup prompt`}
                    />
                    <GrowthMetricCard
                        label="Prompt → Signup"
                        value={metrics.promptToSignup}
                        suffix="%"
                        target={60}
                        subline={`Strong if above 50%`}
                    />
                    <GrowthMetricCard
                        label="Share Rate (L28)"
                        value={metrics.shareRateL28}
                        suffix="%"
                        target={3}
                        targetLabel="(near-term)"
                        subline={`${metrics.totalSharersL28} sharers / ${metrics.totalVisitorsL28} visitors`}
                    />
                </div>
            </div>
        </div>
    );
};

// Circles Tab Component - Friend circles analytics
const CirclesTab: React.FC<{
    metrics: CircleMetrics;
    circles: CircleData[];
}> = ({ metrics, circles }) => {
    // Prepare chart data for circles over time
    const circlesOverTimeData = useMemo(() => {
        const dates = Object.keys(metrics.circlesCreatedByDate).sort();
        let cumulative = 0;
        return dates.map(date => {
            cumulative += metrics.circlesCreatedByDate[date];
            const d = new Date(date + 'T00:00:00');
            return {
                date,
                displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                created: metrics.circlesCreatedByDate[date],
                cumulative,
            };
        });
    }, [metrics.circlesCreatedByDate]);

    return (
        <div className="admin-tab-content circles-tab">
            {/* Section 1: Circle Growth */}
            <div className="admin-section">
                <h2>📊 Circle Growth</h2>
                <div className="admin-metrics-grid">
                    <div className="admin-metric-card">
                        <div className="admin-metric-value">{metrics.totalCircles}</div>
                        <div className="admin-metric-label">Total Circles</div>
                    </div>
                    <div className="admin-metric-card">
                        <div className="admin-metric-value">{metrics.totalCircleMembers}</div>
                        <div className="admin-metric-label">Users in Circles</div>
                    </div>
                    <div className="admin-metric-card">
                        <div className="admin-metric-value">{metrics.percentUsersInCircles}%</div>
                        <div className="admin-metric-label">% of Users in Circles</div>
                    </div>
                    <div className="admin-metric-card">
                        <div className="admin-metric-value">{metrics.avgMembersPerCircle}</div>
                        <div className="admin-metric-label">Avg Members / Circle</div>
                    </div>
                </div>
                
                {/* Size Distribution */}
                <div className="admin-subsection">
                    <h3>Circle Size Distribution</h3>
                    <div className="circles-size-distribution">
                        {Object.entries(metrics.circleSizeDistribution).map(([range, count]) => (
                            <div key={range} className="size-distribution-bar">
                                <span className="size-label">{range} members</span>
                                <div className="size-bar-container">
                                    <div 
                                        className="size-bar-fill" 
                                        style={{ 
                                            width: `${metrics.totalCircles > 0 ? (count / metrics.totalCircles) * 100 : 0}%` 
                                        }}
                                    />
                                </div>
                                <span className="size-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Circles Over Time Chart */}
                {circlesOverTimeData.length > 0 && (
                    <div className="admin-subsection">
                        <h3>Circles Created Over Time</h3>
                        <div className="admin-chart-container" style={{ height: 200 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={circlesOverTimeData}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                    <XAxis dataKey="displayDate" fontSize={12} />
                                    <YAxis fontSize={12} />
                                    <Tooltip />
                                    <Bar dataKey="created" fill="#9eef80" name="Created" />
                                    <Line 
                                        type="monotone" 
                                        dataKey="cumulative" 
                                        stroke="#b0a4fb" 
                                        strokeWidth={2}
                                        name="Cumulative"
                                        dot={false}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>

            {/* Section 2: Circle Activity (from analytics events) */}
            <div className="admin-section">
                <h2>📈 Circle Activity</h2>
                <div className="admin-metrics-grid">
                    <div className="admin-metric-card">
                        <div className="admin-metric-value">{metrics.circleCreatedCount}</div>
                        <div className="admin-metric-label">Circles Created (events)</div>
                    </div>
                    <div className="admin-metric-card">
                        <div className="admin-metric-value">{metrics.circleJoinedCount}</div>
                        <div className="admin-metric-label">Circle Joins</div>
                    </div>
                    <div className="admin-metric-card">
                        <div className="admin-metric-value">{metrics.circleLeaderboardViewedCount}</div>
                        <div className="admin-metric-label">Leaderboard Views</div>
                    </div>
                </div>
            </div>

            {/* Section 3: Virality Funnel */}
            <div className="admin-section">
                <h2>🔗 Virality Funnel</h2>
                <div className="admin-metrics-grid">
                    <div className="admin-metric-card">
                        <div className="admin-metric-value">{metrics.circleInviteSharedCount}</div>
                        <div className="admin-metric-label">Invites Shared</div>
                    </div>
                    <div className="admin-metric-card">
                        <div className="admin-metric-value">{metrics.circleInviteVisitedCount}</div>
                        <div className="admin-metric-label">Invite Link Visits</div>
                    </div>
                    <div className="admin-metric-card">
                        <div className="admin-metric-value">{metrics.circleJoinedCount}</div>
                        <div className="admin-metric-label">Joins from Invites</div>
                    </div>
                </div>
                
                {/* Funnel Conversion Rates */}
                <div className="admin-subsection">
                    <h3>Conversion Rates</h3>
                    <div className="funnel-rates">
                        <div className="funnel-rate-item">
                            <span className="funnel-rate-label">Share → Visit</span>
                            <span className="funnel-rate-value">{metrics.inviteShareToVisitRate}%</span>
                        </div>
                        <div className="funnel-rate-item">
                            <span className="funnel-rate-label">Visit → Join</span>
                            <span className="funnel-rate-value">{metrics.visitToJoinRate}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Retention Impact */}
            <div className="admin-section">
                <h2>🏆 Circle Users vs Non-Circle Users</h2>
                <div className="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Circle Users ({metrics.circleUsersStats.count})</th>
                                <th>Non-Circle Users ({metrics.nonCircleUsersStats.count})</th>
                                <th>Difference</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Avg Streak</td>
                                <td>{metrics.circleUsersStats.avgStreak}</td>
                                <td>{metrics.nonCircleUsersStats.avgStreak}</td>
                                <td className={metrics.circleUsersStats.avgStreak > metrics.nonCircleUsersStats.avgStreak ? 'positive' : 'negative'}>
                                    {metrics.circleUsersStats.avgStreak > metrics.nonCircleUsersStats.avgStreak ? '+' : ''}
                                    {(metrics.circleUsersStats.avgStreak - metrics.nonCircleUsersStats.avgStreak).toFixed(1)}
                                </td>
                            </tr>
                            <tr>
                                <td>Avg Score</td>
                                <td>{metrics.circleUsersStats.avgScore.toLocaleString()}</td>
                                <td>{metrics.nonCircleUsersStats.avgScore.toLocaleString()}</td>
                                <td className={metrics.circleUsersStats.avgScore > metrics.nonCircleUsersStats.avgScore ? 'positive' : 'negative'}>
                                    {metrics.circleUsersStats.avgScore > metrics.nonCircleUsersStats.avgScore ? '+' : ''}
                                    {(metrics.circleUsersStats.avgScore - metrics.nonCircleUsersStats.avgScore).toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td>Win Rate</td>
                                <td>{metrics.circleUsersStats.avgWinRate}%</td>
                                <td>{metrics.nonCircleUsersStats.avgWinRate}%</td>
                                <td className={metrics.circleUsersStats.avgWinRate > metrics.nonCircleUsersStats.avgWinRate ? 'positive' : 'negative'}>
                                    {metrics.circleUsersStats.avgWinRate > metrics.nonCircleUsersStats.avgWinRate ? '+' : ''}
                                    {metrics.circleUsersStats.avgWinRate - metrics.nonCircleUsersStats.avgWinRate}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Section 5: Active Circles List */}
            {circles.length > 0 && (
                <div className="admin-section">
                    <h2>📋 Active Circles ({circles.length})</h2>
                    <div className="circles-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Members</th>
                                    <th>Created</th>
                                    <th>Invite Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {circles
                                    .sort((a, b) => b.memberCount - a.memberCount)
                                    .slice(0, 20)
                                    .map(circle => (
                                        <tr key={circle.id}>
                                            <td>{circle.name}</td>
                                            <td>{circle.memberCount}</td>
                                            <td>{circle.createdAt ? new Date(circle.createdAt).toLocaleDateString() : 'Unknown'}</td>
                                            <td><code>{circle.inviteCode}</code></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {circles.length > 20 && (
                            <p className="circles-list-note">Showing top 20 of {circles.length} circles</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Main Admin Dashboard Component
export const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('metrics');
    const [theme, setTheme] = useState<Theme>('light');
    const [selectedMetric, setSelectedMetric] = useState<{ type: MetricType; title: string; isAnonymous: boolean } | null>(null);
    const [chartTimeRange, setChartTimeRange] = useState<TimeRange>('7days');
    const [trendsUserFilter, setTrendsUserFilter] = useState<'all' | 'signedUp' | 'anonymous'>('all');
    
    const { user, authLoading } = useAuth();
    const { 
        players,
        circles,
        loading, 
        error, 
        isAdmin, 
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
        calculateAnonymousDay0HistoricalMetrics,
        calculateGrowthDay0HistoricalMetrics,
        calculateCircleMetrics,
        getLeaderboard,
        searchPlayers,
        fetchPlayers,
        analyticsEvents,
    } = useAdminData(user);

    const metrics = useMemo(() => calculateMetrics(), [calculateMetrics, players]);
    const historicalData = useMemo(
        () => calculateHistoricalMetrics(chartTimeRange), 
        [calculateHistoricalMetrics, chartTimeRange, players]
    );
    const anonymousHistoricalData = useMemo(
        () => calculateAnonymousHistoricalMetrics(chartTimeRange),
        [calculateAnonymousHistoricalMetrics, chartTimeRange]
    );
    const conversionMetrics = useMemo(
        () => calculateConversionMetrics('28days'),
        [calculateConversionMetrics]
    );
    const anonymousMetrics = useMemo(
        () => calculateAnonymousMetrics(),
        [calculateAnonymousMetrics]
    );
    const anonymousDay0Data = useMemo(
        () => calculateAnonymousDay0HistoricalMetrics(chartTimeRange),
        [calculateAnonymousDay0HistoricalMetrics, chartTimeRange]
    );
    const growthDay0Data = useMemo(
        () => calculateGrowthDay0HistoricalMetrics(chartTimeRange),
        [calculateGrowthDay0HistoricalMetrics, chartTimeRange]
    );
    const puzzleQualityMetrics = useMemo(
        () => calculatePuzzleQualityMetrics(),
        [calculatePuzzleQualityMetrics]
    );
    const engagementMetrics = useMemo(
        () => calculateEngagementMetrics(),
        [calculateEngagementMetrics]
    );
    const featureUsageMetrics = useMemo(
        () => calculateFeatureUsageMetrics(),
        [calculateFeatureUsageMetrics]
    );
    const winRateTrendData = useMemo(
        () => calculateWinRateTrend(chartTimeRange, trendsUserFilter),
        [calculateWinRateTrend, chartTimeRange, trendsUserFilter]
    );
    const engagementTrendData = useMemo(
        () => calculateEngagementTrend(chartTimeRange, trendsUserFilter),
        [calculateEngagementTrend, chartTimeRange, trendsUserFilter]
    );
    const growthMetrics = useMemo(
        () => calculateGrowthMetrics(),
        [calculateGrowthMetrics]
    );
    const circleMetrics = useMemo(
        () => calculateCircleMetrics(),
        [calculateCircleMetrics, circles, players]
    );
    
    // Historical data for trends based on user filter
    const trendsHistoricalData = useMemo(() => {
        if (trendsUserFilter === 'anonymous') {
            return calculateAnonymousHistoricalMetrics(chartTimeRange);
        } else if (trendsUserFilter === 'signedUp') {
            return calculateHistoricalMetrics(chartTimeRange);
        } else {
            // For 'all', combine both datasets
            const signedUp = calculateHistoricalMetrics(chartTimeRange);
            const anonymous = calculateAnonymousHistoricalMetrics(chartTimeRange);
            
            // Merge by date
            const merged: Record<string, DailyDataPoint> = {};
            signedUp.forEach(d => {
                merged[d.date] = { ...d };
            });
            anonymous.forEach(d => {
                if (merged[d.date]) {
                    merged[d.date].dau += d.dau;
                    merged[d.date].puzzlesPlayed += d.puzzlesPlayed;
                    merged[d.date].puzzlesSolved += d.puzzlesSolved;
                    merged[d.date].newSignups += d.newSignups;
                } else {
                    merged[d.date] = { ...d };
                }
            });
            
            // Recalculate win rate for merged data
            return Object.values(merged)
                .sort((a, b) => a.date.localeCompare(b.date))
                .map(d => ({
                    ...d,
                    winRate: d.puzzlesPlayed > 0 ? Math.round((d.puzzlesSolved / d.puzzlesPlayed) * 100) : 0,
                }));
        }
    }, [calculateHistoricalMetrics, calculateAnonymousHistoricalMetrics, chartTimeRange, trendsUserFilter]);
    
    const retentionMetricsForTrends = useMemo(
        () => calculateRetentionMetrics(trendsUserFilter),
        [calculateRetentionMetrics, trendsUserFilter]
    );
    
    // Limit cohorts based on time range for trends display
    const filteredRetentionData = useMemo(() => {
        const cohorts = retentionMetricsForTrends.cohorts;
        let maxCohorts = 8;
        if (chartTimeRange === '7days') maxCohorts = 2;
        else if (chartTimeRange === '14days') maxCohorts = 3;
        else if (chartTimeRange === '28days') maxCohorts = 5;
        
        return {
            ...retentionMetricsForTrends,
            cohorts: cohorts.slice(0, maxCohorts),
        };
    }, [retentionMetricsForTrends, chartTimeRange]);

    const handleMetricClick = (metricType: MetricType, title: string, isAnonymous: boolean = false) => {
        setSelectedMetric({ type: metricType, title, isAnonymous });
    };

    // Toggle theme
    const handleThemeToggle = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    if (authLoading) {
        return (
            <div className={`admin-dashboard theme-${theme}`}>
                <div className="admin-loading">Loading authentication...</div>
            </div>
        );
    }

    const handleGoogleSignIn = async () => {
        if (!auth || !GoogleAuthProvider || !signInWithPopup) {
            console.error('Firebase auth not available');
            return;
        }
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error('Sign in failed:', err);
        }
    };

    if (!user) {
        return (
            <div className={`admin-dashboard theme-${theme}`}>
                <div className="admin-access-denied">
                    <h1>🔒 Admin Access</h1>
                    <p>Please sign in to access the admin dashboard.</p>
                    <button onClick={handleGoogleSignIn} className="admin-google-signin-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '8px' }}>
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign in with Google
                    </button>
                    <a href="/" className="admin-back-link">← Back to Game</a>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className={`admin-dashboard theme-${theme}`}>
                <div className="admin-access-denied">
                    <h1>🔒 Access Denied</h1>
                    <p>You don't have permission to access this page.</p>
                    <p className="admin-user-info">Signed in as: {user.email}</p>
                    <a href="/" className="admin-back-link">← Back to Game</a>
                </div>
            </div>
        );
    }

    return (
        <div className={`admin-dashboard theme-${theme}`}>
            <header className="admin-header">
                <div className="admin-header-left">
                    <a href="/" className="admin-back-link">← Back to Game</a>
                    <h1>Linkle Admin Dashboard</h1>
                </div>
                <div className="admin-header-right">
                    <button onClick={fetchPlayers} className="admin-refresh-btn" disabled={loading}>
                        {loading ? '⏳' : '🔄'} Refresh
                    </button>
                    <button onClick={handleThemeToggle} className="admin-theme-toggle">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>
            </header>

            {error && (
                <div className="admin-error">
                    Error: {error}
                </div>
            )}

            <nav className="admin-tabs">
                <button 
                    className={`admin-tab ${activeTab === 'metrics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('metrics')}
                >
                    📊 Metrics
                </button>
                <button 
                    className={`admin-tab ${activeTab === 'players' ? 'active' : ''}`}
                    onClick={() => setActiveTab('players')}
                >
                    👥 Players ({players.length})
                </button>
                <button 
                    className={`admin-tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('leaderboard')}
                >
                    🏆 Leaderboard
                </button>
                <button 
                    className={`admin-tab ${activeTab === 'anonymous' ? 'active' : ''}`}
                    onClick={() => setActiveTab('anonymous')}
                >
                    👻 Anonymous
                </button>
                <button 
                    className={`admin-tab ${activeTab === 'retention' ? 'active' : ''}`}
                    onClick={() => setActiveTab('retention')}
                >
                    📈 Retention
                </button>
                <button 
                    className={`admin-tab ${activeTab === 'insights' ? 'active' : ''}`}
                    onClick={() => setActiveTab('insights')}
                >
                    🎯 Insights
                </button>
                <button 
                    className={`admin-tab ${activeTab === 'trends' ? 'active' : ''}`}
                    onClick={() => setActiveTab('trends')}
                >
                    📈 Trends
                </button>
                <button 
                    className={`admin-tab ${activeTab === 'growth' ? 'active' : ''}`}
                    onClick={() => setActiveTab('growth')}
                >
                    🌱 Growth
                </button>
                <button 
                    className={`admin-tab ${activeTab === 'circles' ? 'active' : ''}`}
                    onClick={() => setActiveTab('circles')}
                >
                    👥 Circles
                </button>
            </nav>

            <main className="admin-content">
                {loading ? (
                    <div className="admin-loading">Loading player data...</div>
                ) : (
                    <>
                        {activeTab === 'metrics' && (
                            <MetricsTab 
                                metrics={metrics}
                                anonymousMetrics={anonymousMetrics}
                                conversionMetrics={conversionMetrics}
                                players={players}
                                analyticsEvents={analyticsEvents}
                                onMetricClick={handleMetricClick}
                            />
                        )}
                        {activeTab === 'players' && (
                            <PlayersTab 
                                players={players} 
                                searchPlayers={searchPlayers}
                            />
                        )}
                        {activeTab === 'leaderboard' && (
                            <LeaderboardTab getLeaderboard={getLeaderboard} />
                        )}
                        {activeTab === 'anonymous' && (
                            <AnonymousTab 
                                metrics={anonymousMetrics} 
                                day0Data={anonymousDay0Data}
                                onMetricClick={(type, title) => handleMetricClick(type, title, true)}
                            />
                        )}
                        {activeTab === 'retention' && (
                            <RetentionTab calculateRetentionMetrics={calculateRetentionMetrics} />
                        )}
                        {activeTab === 'insights' && (
                            <InsightsTab 
                                puzzleQuality={puzzleQualityMetrics}
                                engagement={engagementMetrics}
                                featureUsage={featureUsageMetrics}
                            />
                        )}
                        {activeTab === 'trends' && (
                            <TrendsTab 
                                historicalData={trendsHistoricalData}
                                retentionData={filteredRetentionData}
                                winRateData={winRateTrendData}
                                engagementData={engagementTrendData}
                                timeRange={chartTimeRange}
                                onTimeRangeChange={setChartTimeRange}
                                userFilter={trendsUserFilter}
                                onUserFilterChange={setTrendsUserFilter}
                                theme={theme}
                            />
                        )}
                        {activeTab === 'growth' && (
                            <GrowthTab 
                                metrics={growthMetrics} 
                                onMetricClick={(type, title) => handleMetricClick(type, title, false)}
                            />
                        )}
                        {activeTab === 'circles' && (
                            <CirclesTab 
                                metrics={circleMetrics}
                                circles={circles}
                            />
                        )}
                    </>
                )}
            </main>

            {/* Metric Chart Modal */}
            {selectedMetric && (
                <MetricChart
                    title={selectedMetric.title}
                    metricType={selectedMetric.type}
                    data={
                        // Use appropriate data source based on metric type
                        // Anonymous tab Day-0 metrics (counts)
                        ['day0Starts', 'day0Solved', 'day0SolveRate'].includes(selectedMetric.type) && selectedMetric.isAnonymous
                            ? anonymousDay0Data
                            // Growth tab Day-0 metrics (rates)
                            : ['day0StartRate', 'day0SolveRate', 'day0DepthRate'].includes(selectedMetric.type)
                                ? growthDay0Data
                                : selectedMetric.isAnonymous 
                                    ? anonymousHistoricalData 
                                    : historicalData
                    }
                    timeRange={chartTimeRange}
                    onTimeRangeChange={setChartTimeRange}
                    onClose={() => setSelectedMetric(null)}
                    theme={theme}
                />
            )}
        </div>
    );
};

