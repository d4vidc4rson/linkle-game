// @ts-nocheck
import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { PlayerData, DailyResult, Theme, DaySummary } from '../types';
import { formatDateKey, getPuzzlesForDateFromSchedule, SCHEDULE_EPOCH, calculatePuzzleIndicesForDate } from '../dailySchedule';
import { PREGENERATED_PUZZLES } from '../puzzles';
import { DayCarousel } from './DayCarousel';
import { ShareResults } from './ShareResults';
import { SignUpSheet } from './SignUpSheet';
import { AchievementIcon, ThemeToggleIcon, TitleGraphic, StreakIcon } from './Icons';
import { UserAvatar } from './GameUI';
import { useAnalytics } from '../hooks/useAnalytics';

interface AllDoneScreenProps {
    date: Date;
    playerData: PlayerData;
    puzzleResults: {
        easy?: DailyResult;
        hard?: DailyResult;
        impossible?: DailyResult;
    };
    puzzleIndices: { easy: number; hard: number; impossible: number } | null;
    schedule: any; // DailySchedule type
    theme: Theme;
    onPlayMissedPuzzles: () => void;
    onPlayDate?: (date: Date) => void;
    onResetToday?: () => void;
    onGenerateTestSchedule?: () => void;
    onThemeToggle?: () => void;
    onShowAchievements?: () => void;
    onShowAuth?: () => void;
    onShowLogout?: () => void;
    user?: any;
}

const allThreeSolvedMessages = [
    "Perfect!",
    "Flawless victory!",
    "You nailed all three!",
    "Three for three!",
    "You're a Linkle legend!",
    "Perfect score!",
    "Triple threat!",
    "You solved them all!",
    "Perfect run!",
    "Three out of three!",
    "Complete domination!",
    "All puzzles solved!",
];

const twoSolvedMessages = [
    "Two out of three ain't bad",
    "Two for three!",
    "Two out of three!",
    "Two thirds there!",
    "You got two!",
    "Two down!",
    "Two puzzles conquered!",
    "Two thirds complete!",
];

const oneSolvedMessages = [
    "One Down.",
    "One puzzle down!",
    "One for three! Keep pushing.",
    "You got one! Don't give up now!",
    "One solved! Huzzah.",
    "One puzzle conquered!",
    "You nailed one!",
    "One out of three!",
];

const noneSolvedMessages = [
    "Better luck tomorrow.",
    "Tough day.",
    "Keep your head up.",
    "Rough round.",
    "Tomorrow's a new day!",
    "Today wasn't your day.",
];

const getDynamicQuote = (results: { easy?: DailyResult; hard?: DailyResult; impossible?: DailyResult }): string => {
    const solvedCount = [results.easy, results.hard, results.impossible].filter(r => r?.solved).length;
    
    if (solvedCount === 3) {
        return allThreeSolvedMessages[Math.floor(Math.random() * allThreeSolvedMessages.length)];
    }
    if (solvedCount === 2) {
        return twoSolvedMessages[Math.floor(Math.random() * twoSolvedMessages.length)];
    }
    if (solvedCount === 1) {
        return oneSolvedMessages[Math.floor(Math.random() * oneSolvedMessages.length)];
    }
    return noneSolvedMessages[Math.floor(Math.random() * noneSolvedMessages.length)];
};

export const AllDoneScreen: React.FC<AllDoneScreenProps> = ({
    date,
    playerData,
    puzzleResults,
    puzzleIndices,
    schedule,
    theme,
    onPlayMissedPuzzles,
    onPlayDate,
    onResetToday,
    onGenerateTestSchedule,
    onThemeToggle,
    onShowAchievements,
    onShowAuth,
    onShowLogout,
    user,
}) => {
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareDate, setShareDate] = useState<Date>(date);
    const [showSignUpSheet, setShowSignUpSheet] = useState(false);
    const hasShownSignUpSheetRef = useRef(false);
    
    // Analytics tracking
    const { trackShareClicked, trackShareCopied } = useAnalytics(user);
    
    // Update shareDate when date prop changes (e.g., when viewing a different date's All Done screen)
    useEffect(() => {
        setShareDate(date);
    }, [date]);
    
    // Show sign-up sheet for non-logged-in users after a short delay (only once per session)
    useEffect(() => {
        if (!user && !hasShownSignUpSheetRef.current) {
            const timer = setTimeout(() => {
                setShowSignUpSheet(true);
                hasShownSignUpSheetRef.current = true;
            }, 1500); // 1.5 second delay
            return () => clearTimeout(timer);
        }
    }, [user]);
    
    const dateKey = formatDateKey(date);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    
    const easyPuzzle = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.easy] : null;
    const hardPuzzle = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.hard] : null;
    const impossiblePuzzle = puzzleIndices ? PREGENERATED_PUZZLES[puzzleIndices.impossible] : null;
    
    const quote = getDynamicQuote(puzzleResults);
    
    // Calculate stats - count total puzzles played and solved from dailyResults only
    const calculateDailyStats = (): { played: number; solved: number } => {
        if (!playerData.dailyResults) return { played: 0, solved: 0 };
        let played = 0;
        let solved = 0;
        Object.values(playerData.dailyResults).forEach(dayResults => {
            if (dayResults.easy) {
                played++;
                if (dayResults.easy.solved) solved++;
            }
            if (dayResults.hard) {
                played++;
                if (dayResults.hard.solved) solved++;
            }
            if (dayResults.impossible) {
                played++;
                if (dayResults.impossible.solved) solved++;
            }
        });
        return { played, solved };
    };
    
    const { played: totalPlayed, solved: totalSolved } = calculateDailyStats();
    const winPercentage = totalPlayed > 0 ? Math.round((totalSolved / totalPlayed) * 100) : 0;
    const maxStreak = playerData.maxStreak || 0;
    
    // Helper function to format puzzle results
    const formatPuzzleResult = (result: DailyResult | undefined): string => {
        if (!result || !result.solved) {
            return 'Nope';
        }
        
        if (result.triesUsed === 1) {
            return 'Perfect';
        }
        
        return `${result.triesUsed} Tries`;
    };
    
    // Convert dates to DaySummary format
    const days: DaySummary[] = useMemo(() => {
        // Use the actual current date for "today" comparison, not the date prop
        const actualToday = new Date();
        actualToday.setHours(0, 0, 0, 0); // Normalize to midnight for accurate comparison
        
        // Start from the date being viewed (could be today or a past date)
        const viewDate = new Date(date);
        viewDate.setHours(0, 0, 0, 0);
        
        // HARDCODED epoch date - November 9, 2025 - the first puzzle day
        const epochDate = new Date(2025, 10, 9); // Month is 0-indexed, so 10 = November
        epochDate.setHours(0, 0, 0, 0);
        
        const dates: Date[] = [];
        const currentDate = new Date(epochDate);
        
        // Safety limit: max 1000 days to prevent infinite loops
        const MAX_DAYS = 1000;
        let dayCount = 0;
        
        while (currentDate <= actualToday && dayCount < MAX_DAYS) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
            dayCount++;
        }
        
        // Reverse to show newest (today) first, oldest last
        const reversedDates = [...dates].reverse(); // Use spread to avoid mutating original
        
        const summaries: DaySummary[] = [];
        
        reversedDates.forEach((d) => {
            // Skip any dates before the epoch (November 9, 2025) - safety guard
            const epochDate = new Date(2025, 10, 9); // Hardcoded as backup for timezone/module issues
            epochDate.setHours(0, 0, 0, 0);
            if (d < epochDate) return;
            
            // Get puzzle indices - first try schedule, then fall back to dynamic calculation
            const dayPuzzleIndices = getPuzzlesForDateFromSchedule(schedule, d) || calculatePuzzleIndicesForDate(d);

            const dateKey = formatDateKey(d);
            // Compare against actual today, not the viewed date
            const isToday = d.toDateString() === actualToday.toDateString();
            const dayResults = playerData.dailyResults?.[dateKey];
            
            // Determine mode: 'summary' if all puzzles completed, 'playable' otherwise
            const allCompleted = dayResults?.easy && dayResults?.hard && dayResults?.impossible;
            const mode: 'summary' | 'playable' = allCompleted ? 'summary' : 'playable';
        
            // Format date label
            const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
            const dateStr = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            const dateLabel = isToday ? `Today, ${dateStr}` : `${dayName}, ${dateStr}`;
            
            // Get puzzle words
            const easyPuzzle = dayPuzzleIndices ? PREGENERATED_PUZZLES[dayPuzzleIndices.easy] : null;
            const hardPuzzle = dayPuzzleIndices ? PREGENERATED_PUZZLES[dayPuzzleIndices.hard] : null;
            const impossiblePuzzle = dayPuzzleIndices ? PREGENERATED_PUZZLES[dayPuzzleIndices.impossible] : null;
            
            const easyResult = formatPuzzleResult(dayResults?.easy);
            const hardResult = formatPuzzleResult(dayResults?.hard);
            const impossibleResult = formatPuzzleResult(dayResults?.impossible);
            
            // Add standard day summary
            summaries.push({
                id: dateKey,
                dateLabel,
                mode,
                easy: {
                    label: 'Easy',
                    result: easyResult,
                    words: easyPuzzle?.solution || [],
                },
                hard: {
                    label: 'Hard',
                    result: hardResult,
                    words: hardPuzzle?.solution || [],
                },
                impossible: {
                    label: 'Impossible',
                    result: impossibleResult,
                    words: impossiblePuzzle?.solution || [],
                },
                date: d,
                results: dayResults,
                puzzleIndices: isToday ? puzzleIndices : dayPuzzleIndices,
            });

            // Add Bonus card if solved (inserted immediately after standard card)
            if (dayResults?.bonus?.solved) {
                summaries.push({
                    id: `${dateKey}-bonus`,
                    dateLabel,
                    mode: 'bonus',
                    // Fill with placeholders as this card uses 'results' prop mostly
                    easy: { label: '', result: '', words: [] },
                    hard: { label: '', result: '', words: [] },
                    impossible: { label: '', result: '', words: [] },
                    date: d,
                    results: dayResults,
                    puzzleIndices: isToday ? puzzleIndices : dayPuzzleIndices,
                });
            }
        });
        
        return summaries;
    }, [date, playerData.dailyResults, schedule, puzzleIndices]);
    
    // Find the index of the viewed date in the days array for initial carousel position
    // Since dates are reversed (newest first), we need to find the index in the reversed order
    const initialCarouselIndex = useMemo(() => {
        const viewDate = new Date(date);
        viewDate.setHours(0, 0, 0, 0);
        // Find index in reversed order (newest to oldest)
        return days.findIndex(d => d.date.toDateString() === viewDate.toDateString());
    }, [days, date]);

    return (
        <div className={`app-wrapper daily-mode-wrapper theme-${theme}`}>
            <div className="top-bar-container">
                <header className="top-bar">
                    <div className="logo logo-is-graphic">
                        <TitleGraphic />
                    </div>
                    
                    <div className="score-display-group">
                        <div className="total-score">SCORE: {playerData.totalScore}</div>
                        <div className="streak-icon">
                            <StreakIcon />
                        </div>
                        <span className="streak-score-text">{playerData.currentStreak}</span>
                    </div>

                    <div className="utility-group">
                        <div className="theme-toggle" onClick={onThemeToggle}><ThemeToggleIcon theme={theme} /></div>
                        <div className="achievement-icon" onClick={onShowAchievements}><AchievementIcon /></div>
                        <div className="user-display">
                            {user ? (
                                <button className="avatar-button" onClick={onShowLogout} title="Profile & Logout">
                                    <UserAvatar displayName={user.displayName || 'Player'} theme={theme} />
                                </button>
                            ) : (
                                <button className="auth-button" onClick={onShowAuth}><span>Sign-Up / In</span></button>
                            )}
                        </div>
                    </div>
                </header>
            </div>

            <main className="main-content">
                <div className="all-done-screen">
                    <div className="all-done-content">
                        <div className="all-done-quote">{quote}</div>
                        
                        <div className="all-done-stats-row">
                            <div className="stat-item">
                                <span className="stat-value">{totalPlayed}</span>
                                <span className="stat-label">Played</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{winPercentage}</span>
                                <span className="stat-label">Win %</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{playerData.currentStreak || 0}</span>
                                <span className="stat-label">Current Streak</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{maxStreak}</span>
                                <span className="stat-label">Max Streak</span>
                            </div>
                        </div>
                    </div>

                    <section className="day-carousel-section">
                        <DayCarousel
                            days={days}
                            theme={theme}
                            initialIndex={initialCarouselIndex >= 0 ? initialCarouselIndex : 0}
                            onShare={(d) => {
                                setShareDate(d);
                                setShowShareModal(true);
                                trackShareClicked(d);
                            }}
                            onPlay={(d) => {
                                if (onPlayDate) {
                                    onPlayDate(d);
                                }
                            }}
                            onBonusShareClicked={(d) => trackShareClicked(d)}
                            onBonusShareCopied={(d) => trackShareCopied(d)}
                        />
                    </section>

                    <div className="all-done-content">
                        {/* Temporarily commented out - may revisit later */}
                        {/* <button className="play-missed-button" onClick={onPlayMissedPuzzles}>
                            PLAY ALL PUZZLES YOU MISSED
                        </button> */}
                
                {/* Temporarily commented out for testing */}
                {/* {onResetToday && (
                    <button 
                        className="reset-today-button" 
                        onClick={onResetToday}
                        style={{
                            marginTop: '10px',
                            padding: '8px 16px',
                            backgroundColor: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                        }}
                    >
                        🔄 Reset Today (Testing)
                    </button>
                )}
                
                {onGenerateTestSchedule && (
                    <button 
                        className="generate-test-schedule-button" 
                        onClick={onGenerateTestSchedule}
                        style={{
                            marginTop: '10px',
                            padding: '8px 16px',
                            backgroundColor: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'block',
                        }}
                    >
                        📅 Generate Test Schedule (5 days ago)
                    </button>
                )} */}
                    </div>
                </div>

                {showShareModal && (
                    <ShareResults
                        date={shareDate}
                        dailyResults={playerData.dailyResults}
                        puzzleIndices={getPuzzlesForDateFromSchedule(schedule, shareDate) || calculatePuzzleIndicesForDate(shareDate)}
                        schedule={schedule}
                        onClose={() => setShowShareModal(false)}
                        onCopy={() => trackShareCopied(shareDate)}
                    />
                )}
                
                {showSignUpSheet && (
                    <SignUpSheet
                        onSignUp={() => {
                            setShowSignUpSheet(false);
                            if (onShowAuth) onShowAuth();
                        }}
                        onClose={() => setShowSignUpSheet(false)}
                        currentStreak={playerData.currentStreak}
                        headline="Nice work!"
                    />
                )}

                <footer className="bottom-bar">
                    <div className="bottom-bar-content">
                        <div className="theme-toggle" onClick={onThemeToggle}><ThemeToggleIcon theme={theme} /></div>
                        <div className="achievement-icon" onClick={onShowAchievements}><AchievementIcon /></div>
                        <div className="user-display">
                            {user ? (
                                <button className="avatar-button" onClick={onShowLogout} title="Profile & Logout">
                                    <UserAvatar displayName={user.displayName || 'Player'} theme={theme} />
                                </button>
                            ) : (
                                <button className="auth-button" onClick={onShowAuth}><span>Sign-Up / In</span></button>
                            )}
                        </div>
                    </div>
                    {import.meta.env.DEV && (
                        <button 
                            className="dev-reset-button" 
                            onClick={() => {
                                if (confirm('Reset all game data? This will clear your progress and reload the page.')) {
                                    localStorage.removeItem('linklePlayerData');
                                    localStorage.removeItem('chainReactionPlayerData');
                                    window.location.reload();
                                }
                            }}
                            title="Reset Game Data (Dev Only)"
                        >
                            🔄 Reset
                        </button>
                    )}
                </footer>
            </main>
        </div>
    );
};

