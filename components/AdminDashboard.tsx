// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAdminData, PlayerWithMeta, AggregateMetrics, TimeRange, DailyDataPoint, ConversionMetrics } from '../hooks/useAdminData';
import { MetricChart, MetricType } from './MetricChart';
import { formatDateKey } from '../dailySchedule';
import type { Theme } from '../types';

// Firebase services for Google sign-in
declare const window: any;
const { auth, GoogleAuthProvider, signInWithPopup } = window.firebase || {};

type AdminTab = 'metrics' | 'players' | 'leaderboard';

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

// Metrics Tab Component
const MetricsTab: React.FC<{ 
    metrics: AggregateMetrics;
    conversionMetrics: ConversionMetrics;
    players: PlayerWithMeta[];
    onMetricClick: (metricType: MetricType, title: string) => void;
}> = ({ metrics, conversionMetrics, players, onMetricClick }) => {
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

    return (
        <div className="admin-metrics-tab">
            <h2>Engagement Metrics</h2>
            <p className="admin-metrics-hint">Click any metric to view historical chart</p>
            
            <div className="admin-metrics-grid">
                <div 
                    className="admin-metric-card admin-metric-clickable"
                    onClick={() => onMetricClick('totalUsers', 'Total Users')}
                >
                    <div className="admin-metric-value">{metrics.totalUsers}</div>
                    <div className="admin-metric-label">Total Users</div>
                    <div className="admin-metric-chart-icon">📈</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-clickable"
                    onClick={() => onMetricClick('dau', 'Daily Active Users')}
                >
                    <div className="admin-metric-value">{metrics.dailyActiveUsers}</div>
                    <div className="admin-metric-label">Daily Active</div>
                    <div className="admin-metric-chart-icon">📊</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-clickable"
                    onClick={() => onMetricClick('puzzlesPlayed', 'Puzzles Played')}
                >
                    <div className="admin-metric-value">{metrics.totalPuzzlesPlayed}</div>
                    <div className="admin-metric-label">Puzzles Played</div>
                    <div className="admin-metric-chart-icon">📊</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-clickable"
                    onClick={() => onMetricClick('winRate', 'Win Rate')}
                >
                    <div className="admin-metric-value">
                        {metrics.totalPuzzlesPlayed > 0 
                            ? Math.round((metrics.totalPuzzlesSolved / metrics.totalPuzzlesPlayed) * 100) 
                            : 0}%
                    </div>
                    <div className="admin-metric-label">Win Rate</div>
                    <div className="admin-metric-chart-icon">📈</div>
                </div>
                <div 
                    className="admin-metric-card admin-metric-clickable admin-metric-stickiness"
                    onClick={() => onMetricClick('stickiness', 'Stickiness (Retention)')}
                >
                    <div className="admin-metric-value">
                        {metrics.totalUsers > 0 
                            ? Math.round((metrics.dailyActiveUsers / metrics.totalUsers) * 100) 
                            : 0}%
                    </div>
                    <div className="admin-metric-label">Stickiness</div>
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
    const [sortBy, setSortBy] = useState<PlayerSortBy>('score');
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

// Main Admin Dashboard Component
export const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('metrics');
    const [theme, setTheme] = useState<Theme>('light');
    const [selectedMetric, setSelectedMetric] = useState<{ type: MetricType; title: string } | null>(null);
    const [chartTimeRange, setChartTimeRange] = useState<TimeRange>('7days');
    
    const { user, authLoading } = useAuth();
    const { 
        players, 
        loading, 
        error, 
        isAdmin, 
        calculateMetrics,
        calculateHistoricalMetrics,
        calculateConversionMetrics,
        getLeaderboard,
        searchPlayers,
        fetchPlayers,
    } = useAdminData(user);

    const metrics = useMemo(() => calculateMetrics(), [calculateMetrics, players]);
    const historicalData = useMemo(
        () => calculateHistoricalMetrics(chartTimeRange), 
        [calculateHistoricalMetrics, chartTimeRange, players]
    );
    const conversionMetrics = useMemo(
        () => calculateConversionMetrics('28days'),
        [calculateConversionMetrics]
    );

    const handleMetricClick = (metricType: MetricType, title: string) => {
        setSelectedMetric({ type: metricType, title });
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
            </nav>

            <main className="admin-content">
                {loading ? (
                    <div className="admin-loading">Loading player data...</div>
                ) : (
                    <>
                        {activeTab === 'metrics' && (
                            <MetricsTab 
                                metrics={metrics}
                                conversionMetrics={conversionMetrics}
                                players={players}
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
                    </>
                )}
            </main>

            {/* Metric Chart Modal */}
            {selectedMetric && (
                <MetricChart
                    title={selectedMetric.title}
                    metricType={selectedMetric.type}
                    data={historicalData}
                    timeRange={chartTimeRange}
                    onTimeRangeChange={setChartTimeRange}
                    onClose={() => setSelectedMetric(null)}
                    theme={theme}
                />
            )}
        </div>
    );
};

