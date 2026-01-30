// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAnalytics } from '../hooks/useAnalytics';
import { useDailySchedule } from '../hooks/useDailySchedule';
import { useDailyGameLogic, type DailyPuzzleDifficulty } from '../hooks/useDailyGameLogic';
import { useBodyClasses } from '../hooks/useBodyClasses';
import type { Theme, GameState, DailyResult, AuthMode } from '../types';
import { AchievementIcon, ThemeToggleIcon, TitleGraphic, StreakIcon } from './Icons';
import { BadgeUnlockModal, AchievementShowcaseModal, ExplanationModal, AuthModal, LogoutModal, NewPlayerModal, PowerUserHintModal, WhatsNewSheet } from './Modals';
import { MiniGrid, Confetti, LoserEmojis, UserAvatar, TriesDots } from './GameUI';
import { SortableGameBoard } from './SortableGameBoard';
import { DailyStartScreen } from './DailyStartScreen';
import { DailyIntroScreen } from './DailyIntroScreen';
import { DailyPuzzleSolved } from './DailyPuzzleSolved';
import { BonusTimer } from './BonusTimer';
import { BonusSplashScreen } from './BonusSplashScreen';
import { PREGENERATED_PUZZLES } from '../puzzles';
import { AllDoneScreen } from './AllDoneScreen';
import { ArchiveView } from './ArchiveView';
import { ErrorToast } from './ErrorToast';
import { TRIES_PER_DIFFICULTY, DEFAULT_TRIES } from '../constants';
import { formatDateKey, generateDailySchedule, getPuzzlesForDateFromSchedule, calculatePuzzleIndicesForDate } from '../dailySchedule';
import { checkStreakReset } from '../utils/introMessages';

type DailyModeView = 'start' | 'intro' | 'playing' | 'bonusSplash' | 'allDone' | 'archive';
type IntroMode = 'play' | 'stats';

// Helper function to calculate overlay color based on time remaining
const getOverlayColor = (timeRemaining: number): string => {
  const opacity = 0.4;
  
  // 53-60s (0-8s remaining): Solid Red
  if (timeRemaining <= 8) {
    return `rgba(255, 80, 120, ${opacity})`;
  }
  
  // 41-52s (8-20s remaining): Orange to Red
  if (timeRemaining <= 20) {
    const progress = (20 - timeRemaining) / 12; // 0 to 1
    const r = 255;
    const g = Math.round(140 - (60 * progress)); // 140 to 80
    const b = Math.round(60 - (60 * progress)); // 60 to 0
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  // 21-40s (20-40s remaining): Purple to Orange
  if (timeRemaining <= 40) {
    const progress = (40 - timeRemaining) / 20; // 0 to 1
    const r = Math.round(147 + (108 * progress)); // 147 to 255
    const g = Math.round(51 + (89 * progress)); // 51 to 140
    const b = Math.round(230 - (170 * progress)); // 230 to 60
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  // 0-20s (40-60s remaining): Blue to Purple
  const progress = (60 - timeRemaining) / 20; // 0 to 1
  const r = Math.round(41 + (106 * progress)); // 41 to 147
  const g = Math.round(98 - (47 * progress)); // 98 to 51
  const b = Math.round(255 - (25 * progress)); // 255 to 230
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const BonusSpeedRoundMode = () => {
    // Check if we're in development mode
    const isDev = import.meta.env.DEV;
    const [theme, setTheme] = useState<Theme>('light');
    const [showcaseVisible, setShowcaseVisible] = useState(false);
    const [view, setView] = useState<DailyModeView>('start');
    const [currentPuzzleType, setCurrentPuzzleType] = useState<DailyPuzzleDifficulty>('easy');
    const [targetDate, setTargetDate] = useState<Date>(new Date()); // Can be changed to play past dates
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [authModalMode, setAuthModalMode] = useState<AuthMode>('signup');
    const [isBonusRound, setIsBonusRound] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [bonusStartTime, setBonusStartTime] = useState<number | null>(null);
    const [overlayHeight, setOverlayHeight] = useState(0);
    const [overlayColor, setOverlayColor] = useState('rgba(41, 98, 255, 0.4)');
    const [bonusPuzzle, setBonusPuzzle] = useState<any>(null);
    const [bonusWinMessage, setBonusWinMessage] = useState<string>('');
    const [bonusSolvedStatus, setBonusSolvedStatus] = useState<'win' | 'loss' | null>(null);
    const [bonusAnimationClass, setBonusAnimationClass] = useState<string>('');
    const [bonusBoardState, setBonusBoardState] = useState<string[]>([]);
    const [bonusLockedSlots, setBonusLockedSlots] = useState<boolean[]>(Array(9).fill(false));
    const [bonusUserLockedSlots, setBonusUserLockedSlots] = useState<boolean[]>(Array(9).fill(false));
    const [bonusTriesLeft, setBonusTriesLeft] = useState(1);
    const [bonusFeedback, setBonusFeedback] = useState('');
    const [bonusMoveCount, setBonusMoveCount] = useState(0); // Track tile swaps for bonus round analytics
    const [streakWasReset, setStreakWasReset] = useState(false);
    const [dayStreakWasReset, setDayStreakWasReset] = useState(false);
    const [introMode, setIntroMode] = useState<IntroMode>('play');
    const [showNewPlayerModal, setShowNewPlayerModal] = useState(false);
    const [showWhatsNewSheet, setShowWhatsNewSheet] = useState(false);

    // Track previous user for login detection
    const prevUserRef = useRef<any>(undefined);

    const {
        user,
        playerData,
        setPlayerData,
        authLoading,
        dataReady,
        showAuthModal,
        setShowAuthModal,
        showLogoutModal,
        setShowLogoutModal,
        handleLogout,
        saveGameState,
    } = useAuth();

    // Analytics tracking
    const {
        trackPuzzleStarted,
        trackPuzzleCompleted,
        trackSignupPromptShown,
        trackSignupCompleted,
        trackExplanationViewed,
        trackBadgeViewed,
        trackBadgeUnlocked,
        trackArchivePuzzleStarted,
        trackBonusRoundStarted,
        trackThemeChanged,
    } = useAnalytics();

    // Load existing results for today
    const dateKey = formatDateKey(targetDate);
    const existingResults = playerData.dailyResults?.[dateKey] || {};
    const [puzzleResults, setPuzzleResults] = useState<{
        easy?: DailyResult;
        hard?: DailyResult;
        impossible?: DailyResult;
        bonus?: DailyResult;
    }>(existingResults);

    const { schedule, loading: scheduleLoading, getPuzzlesForDate, updateSchedule } = useDailySchedule();
    const puzzleIndices = getPuzzlesForDate(targetDate);
    
    // For bonus speed round, generate a default schedule if none exists
    // This ensures puzzleIndices is never null
    const safePuzzleIndices = puzzleIndices || {
        easy: 0,
        hard: 0,
        impossible: 0
    };

    const handlePuzzleComplete = (result: DailyResult, puzzleType: DailyPuzzleDifficulty, puzzleMoveCount: number) => {
        // Track puzzle completion for analytics with enhanced data
        const puzzleDate = formatDateKey(targetDate);
        const puzzleId = safePuzzleIndices[puzzleType];
        trackPuzzleCompleted(puzzleType, result.solved, {
            puzzleId,
            puzzleDate,
            triesUsed: result.triesUsed,
            movesCount: puzzleMoveCount,
        });
        
        setPuzzleResults(prev => ({
            ...prev,
            [puzzleType]: result,
        }));
    };

    // Update puzzleResults when playerData changes
    useEffect(() => {
        const dateKey = formatDateKey(targetDate);
        const dayResults = playerData.dailyResults?.[dateKey];
        // Update puzzleResults if dayResults exists (including empty object {} after reset)
        if (dayResults !== undefined) {
            setPuzzleResults(dayResults);
        } else {
            // If dayResults is undefined, clear puzzleResults
            setPuzzleResults({});
        }
    }, [playerData.dailyResults, targetDate]);

    const handleAllPuzzlesComplete = () => {
        setView('allDone');
    };

    // Track puzzle started when entering playing view
    const prevViewRef = useRef<DailyModeView>('start');
    useEffect(() => {
        if (view === 'playing' && prevViewRef.current !== 'playing') {
            // Track that a puzzle was started with enhanced data
            const difficulty = isBonusRound ? 'bonus' : currentPuzzleType;
            const puzzleDate = formatDateKey(targetDate);
            const puzzleId = isBonusRound ? undefined : safePuzzleIndices[currentPuzzleType];
            trackPuzzleStarted(difficulty, puzzleId, puzzleDate);
        }
        prevViewRef.current = view;
    }, [view, currentPuzzleType, isBonusRound, trackPuzzleStarted, targetDate, safePuzzleIndices]);

    const {
        gameState,
        setGameState,
        solvedStatus,
        puzzle,
        boardState,
        lockedSlots,
        userLockedSlots,
        triesLeft,
        feedback,
        finalNarrative,
        animationClass,
        winMessageBase,
        winMessageBonus,
        showExplanationModal,
        newlyUnlockedBadge,
        setNewlyUnlockedBadge,
        winAnimationPropertiesRef,
        lossAnimationPropertiesRef,
        animateFeedback,
        animateGridShake,
        moveCount,
        showPowerUserHintModal,
        hintViewCount,
        handleReorder,
        handleUserLockToggle,
        handleSubmit,
        handleShowExplanation,
        handleCloseExplanation,
        setNavigatingToNextPuzzle,
        resetBoardForNewSession,
        handleDragStartForHint,
        handleClosePowerUserHint,
        handleDismissPowerUserHintPermanently,
    } = useDailyGameLogic(
        playerData,
        setPlayerData,
        saveGameState,
        theme,
        (error: string) => setErrorMessage(error),
        targetDate,
        currentPuzzleType,
        safePuzzleIndices,
        handlePuzzleComplete,
        handleAllPuzzlesComplete
    );

    // Theme management
    useEffect(() => {
        const savedTheme = localStorage.getItem('linkleTheme') as Theme | null;
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.body.dataset.theme = initialTheme;
    }, []);

    // Show What's New sheet for returning players who haven't seen it yet
    useEffect(() => {
        if (!dataReady) return;
        
        const hasSeenWhatsNew = localStorage.getItem('linkleHasSeenWhatsNew_v1') === 'true';
        
        // New players (0 puzzles solved) should never see this - pre-exempt them
        if (playerData.totalSolved === 0 && !hasSeenWhatsNew) {
            localStorage.setItem('linkleHasSeenWhatsNew_v1', 'true');
            return;
        }
        
        // Returning players with 3+ solved who haven't seen it
        if (playerData.totalSolved >= 3 && !hasSeenWhatsNew) {
            setShowWhatsNewSheet(true);
        }
    }, [dataReady, playerData.totalSolved]);

    const handleCloseNewPlayerModal = () => {
        setShowNewPlayerModal(false);
    };

    // Phase 0: Wordle-style streak reset check on entering daily mode
    // Check if both day streak and puzzle streak should be reset due to missed days
    useEffect(() => {
        if (authLoading) return; // Wait for auth to load
        
        const resetInfo = checkStreakReset(playerData.lastPlayedDate);
        
        // Check if any streaks need to be reset
        const needsPuzzleStreakReset = resetInfo.shouldResetPuzzleStreak && playerData.currentStreak > 0;
        const needsDayStreakReset = resetInfo.shouldResetDayStreak && (playerData.dayStreak || 0) > 0;
        
        if (needsPuzzleStreakReset || needsDayStreakReset) {
            // Reset streaks due to missed day
            const updatedPlayerData = {
                ...playerData,
                currentStreak: needsPuzzleStreakReset ? 0 : playerData.currentStreak,
                dayStreak: needsDayStreakReset ? 0 : (playerData.dayStreak || 0),
            };
            setPlayerData(updatedPlayerData);
            saveGameState(updatedPlayerData);
            setStreakWasReset(needsPuzzleStreakReset);
            setDayStreakWasReset(needsDayStreakReset);
        } else {
            setStreakWasReset(false);
            setDayStreakWasReset(false);
        }
    }, [authLoading]); // Only run once when auth loads

    // Login state detection: When user logs in, redirect to start screen
    // The start screen will show appropriate button (PLAY or VIEW STATS) based on puzzle state
    useEffect(() => {
        // Skip on initial mount (prevUserRef is undefined)
        if (prevUserRef.current === undefined) {
            prevUserRef.current = user;
            return;
        }
        
        // Detect login: user went from null/falsy to truthy
        // IMPORTANT: Wait for dataReady before making routing decisions
        // This ensures Firebase data has been fetched and merged
        if (!prevUserRef.current && user && dataReady) {
            // Track signup completion for analytics
            trackSignupCompleted();
            // Always go to start screen on login - it will show the right button
            // (PLAY if not played, VIEW STATS if already played)
            setView('start');
        }
        
        // Only update prevUserRef when dataReady is true (or user is null)
        if (dataReady || !user) {
            prevUserRef.current = user;
        }
    }, [user, dataReady, playerData.dailyResults, targetDate, view, trackSignupCompleted]);

    // Note: We no longer auto-redirect to allDone when puzzles are solved.
    // Instead, the start screen shows "VIEW STATS" button for users who have already played,
    // giving them a consistent experience with the transition screen.

    useBodyClasses(gameState, puzzle, solvedStatus, theme);

    const handleBonusSubmit = useCallback(async () => {
        if (!bonusPuzzle || !bonusBoardState.length) {
            console.warn('Bonus submit called but puzzle or board state is missing');
            return;
        }
        
        try {
            // Capture current timeRemaining value
            const currentTimeRemaining = timeRemaining;
            const isCorrect = JSON.stringify(bonusBoardState) === JSON.stringify(bonusPuzzle.solution);
            const puzzleDate = formatDateKey(targetDate);
            
            // Track bonus puzzle completion for analytics with enhanced data
            trackPuzzleCompleted('bonus', isCorrect, {
                puzzleDate,
                triesUsed: 1, // Bonus round is single attempt
                movesCount: bonusMoveCount,
            });
            // Calculate time used: timer is 60 seconds, so timeUsed = 60 - timeRemaining
            // Or use actual elapsed time if bonusStartTime is available (more accurate)
            const timeUsed = bonusStartTime 
                ? Math.round((Date.now() - bonusStartTime) / 1000)
                : (60 - currentTimeRemaining);
            const dateKey = formatDateKey(targetDate);
            let finalPlayerData;
        
        if (isCorrect) {
            // Win: Add 1000 points, keep streak
            const updatedPlayerData = {
                ...playerData,
                totalScore: playerData.totalScore + 1000,
                lastPlayedDate: new Date().toISOString(),
            };
            
            // Save bonus result
            const updatedResults = {
                ...playerData.dailyResults,
                [dateKey]: {
                    ...(playerData.dailyResults?.[dateKey] || {}),
                    bonus: {
                        solved: true,
                        triesUsed: 1,
                        timeSeconds: timeUsed,
                        boardState: [...bonusBoardState],
                    },
                },
            };
            finalPlayerData = {
                ...updatedPlayerData,
                dailyResults: updatedResults,
            };
            setPlayerData(finalPlayerData);
            await saveGameState(finalPlayerData);
            
            setBonusSolvedStatus('win');
            setBonusWinMessage('ABSOLUTE BONUS LEGEND!!');
            setBonusAnimationClass('screen-shake-win');
            setGameState('solved');
        } else {
            // Loss: No points, reset streak to 0
            const updatedPlayerData = {
                ...playerData,
                currentStreak: 0,
                lastPlayedDate: new Date().toISOString(),
            };
            
            // Save bonus result
            const updatedResults = {
                ...playerData.dailyResults,
                [dateKey]: {
                    ...(playerData.dailyResults?.[dateKey] || {}),
                    bonus: {
                        solved: false,
                        triesUsed: 1,
                        timeSeconds: timeUsed,
                        boardState: [...bonusBoardState],
                    },
                },
            };
            finalPlayerData = {
                ...updatedPlayerData,
                dailyResults: updatedResults,
            };
            setPlayerData(finalPlayerData);
            await saveGameState(finalPlayerData);
            
            // For loss, show the correct solution
            setBonusBoardState([...bonusPuzzle.solution]);
            setBonusLockedSlots(Array(9).fill(true)); // Lock all slots to show solution
            setBonusUserLockedSlots(Array(9).fill(false)); // Clear user locks
            setBonusSolvedStatus('loss');
            setBonusWinMessage('NO BONUS FOR YOU!');
            setBonusAnimationClass('screen-shake-loss');
            setGameState('solved');
        }
        
            // Update puzzleResults state
            const dayResults = finalPlayerData.dailyResults?.[dateKey];
            setPuzzleResults(dayResults || {});
        } catch (error) {
            console.error('Error in handleBonusSubmit:', error);
            setErrorMessage('An error occurred while submitting the bonus puzzle.');
        }
    }, [bonusPuzzle, bonusBoardState, timeRemaining, bonusStartTime, targetDate, playerData, setPlayerData, saveGameState, setGameState, setPuzzleResults, setBonusSolvedStatus, setBonusWinMessage, setErrorMessage, trackPuzzleCompleted]);

    // Timer logic for bonus round - updates every 100ms for smooth overlay animation
    useEffect(() => {
        if (!isBonusRound || gameState !== 'playing') {
            setBonusStartTime(null);
            setOverlayHeight(0);
            return;
        }
        
        // Set start time when bonus round begins
        if (bonusStartTime === null) {
            setBonusStartTime(Date.now());
        }
        
        const timer = setInterval(() => {
            if (bonusStartTime === null) return;
            
            const elapsed = (Date.now() - bonusStartTime) / 1000; // elapsed time in seconds
            const remaining = Math.max(0, 60 - elapsed);
            
            // Update overlay height smoothly (every 100ms)
            const heightPercent = Math.min(100, (elapsed / 60) * 100);
            setOverlayHeight(heightPercent);
            
            // Update overlay color based on remaining time
            const newColor = getOverlayColor(remaining);
            setOverlayColor(newColor);
            
            // Update time remaining (for display purposes, round to nearest second)
            setTimeRemaining(Math.ceil(remaining));
            
            if (remaining <= 0) {
                // Auto-submit when timer hits 0
                handleBonusSubmit();
                setBonusStartTime(null);
                setOverlayHeight(100);
            }
        }, 100); // Update every 100ms for smooth animation
        
        return () => clearInterval(timer);
    }, [isBonusRound, gameState, handleBonusSubmit, bonusStartTime]);

    // Handle reorder for bonus round (called when tiles are dragged and dropped)
    const handleBonusReorder = useCallback((newBoardState: string[]) => {
        setBonusBoardState(newBoardState);
        setBonusMoveCount(prev => prev + 1);
    }, []);

    // Handle double-tap to toggle user-lock on a tile (only if not system-locked)
    const handleBonusUserLockToggle = useCallback((index: number) => {
        if (bonusLockedSlots[index]) return; // Can't user-lock a system-locked tile
        setBonusUserLockedSlots(prev => {
            const newUserLocked = [...prev];
            const wasLocked = newUserLocked[index];
            newUserLocked[index] = !wasLocked;
            
            // Track when user locks a tile (not unlocks) - they've discovered the feature
            if (!wasLocked) {
                localStorage.setItem('linkleHasUsedUserLock', 'true');
            }
            
            return newUserLocked;
        });
    }, [bonusLockedSlots]);

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.dataset.theme = newTheme;
        localStorage.setItem('linkleTheme', newTheme);
        trackThemeChanged(newTheme);
    };

    const handleResetToday = () => {
        // Reset to today's date
        const today = new Date();
        setTargetDate(today);
        
        const dateKey = formatDateKey(today);
        const updatedPlayerData = {
            ...playerData,
            dailyResults: {
                ...(playerData.dailyResults || {}),
                [dateKey]: {}, // Clear today's results
            },
        };
        setPlayerData(updatedPlayerData);
        saveGameState(updatedPlayerData);
        // Clear puzzleResults state for today
        setPuzzleResults({});
        setCurrentPuzzleType('easy');
        setGameState('loading'); // Reset game state
        setView('start'); // Go back to start screen
    };

    const handleStartPlay = () => {
        setIntroMode('play');
        setView('intro');
    };

    const handleViewStats = () => {
        setIntroMode('stats');
        setView('intro');
    };

    const handleShowAuth = (mode?: AuthMode) => {
        setAuthModalMode(mode || 'signup');
        setShowAuthModal(true);
        // Track signup prompt shown for analytics
        trackSignupPromptShown();
    };

    // Wrapper for handleShowExplanation to add analytics tracking
    const handleShowExplanationWithTracking = () => {
        const difficulty = isBonusRound ? 'bonus' : currentPuzzleType;
        const puzzleDate = formatDateKey(targetDate);
        trackExplanationViewed(difficulty, puzzleDate);
        handleShowExplanation();
    };

    const handleIntroContinue = () => {
        // If in stats mode, go directly to allDone
        if (introMode === 'stats') {
            setView('allDone');
            return;
        }

        // Clear any stale tiles/solved state from previous session
        resetBoardForNewSession();

        // Set flag to indicate we're starting fresh from intro (ignore existing results)
        setNavigatingToNextPuzzle();
        
        // Check if all puzzles for today are already completed
        const dateKey = formatDateKey(targetDate);
        const dayResults = playerData.dailyResults?.[dateKey];
        if (dayResults?.easy && dayResults?.hard && dayResults?.impossible) {
            // All puzzles completed, go to stats screen
            setView('allDone');
        } else {
            // Start with the first incomplete puzzle (or easy if all cleared)
            let nextPuzzleType: DailyPuzzleDifficulty = 'easy';
            if (!dayResults?.easy) {
                nextPuzzleType = 'easy';
            } else if (!dayResults?.hard) {
                nextPuzzleType = 'hard';
            } else if (!dayResults?.impossible) {
                nextPuzzleType = 'impossible';
            }
            
            // Set puzzle type first, then view - this ensures the puzzle loading effect runs
            setCurrentPuzzleType(nextPuzzleType);
            // Don't set gameState to 'loading' here - let the puzzle loading effect handle it
            setView('playing');
        }
    };

    const handleNextPuzzle = () => {
        // Set flag to indicate we're navigating to next puzzle (ignore existing results)
        setNavigatingToNextPuzzle();
        // Clear any solved state before navigating to next puzzle
        setGameState('loading');
        // Small delay to ensure state is cleared before changing puzzle type
        setTimeout(() => {
            if (currentPuzzleType === 'easy') {
                setCurrentPuzzleType('hard');
            } else if (currentPuzzleType === 'hard') {
                setCurrentPuzzleType('impossible');
            }
        }, 0);
    };

    const handleBonusPuzzle = () => {
        // Exclude today's puzzles from bonus selection to avoid duplicates
        const excludedIndices = new Set([
            safePuzzleIndices.easy,
            safePuzzleIndices.hard,
            safePuzzleIndices.impossible
        ]);
        
        // Build array of valid indices (excluding today's puzzles)
        const validIndices = PREGENERATED_PUZZLES
            .map((_, index) => index)
            .filter(index => !excludedIndices.has(index));
        
        // Select random puzzle from valid indices
        const randomValidIndex = validIndices[Math.floor(Math.random() * validIndices.length)];
        const selectedPuzzle = PREGENERATED_PUZZLES[randomValidIndex];
        
        setBonusPuzzle(selectedPuzzle);
            setIsBonusRound(true);
            setTimeRemaining(60);
            setBonusStartTime(null); // Will be set when gameState becomes 'playing'
            setOverlayHeight(0);
            setOverlayColor('rgba(41, 98, 255, 0.4)'); // Reset to blue
            setGameState('loading');
            setBonusMoveCount(0); // Reset move count for bonus round
            // Track bonus round started
            trackBonusRoundStarted(formatDateKey(targetDate));
        
        // Load bonus puzzle
        setTimeout(() => {
            // NOTE: Bonus round intentionally uses full shuffle with NO pre-locked tiles,
            // regardless of the underlying puzzle difficulty. This keeps the bonus round
            // consistently challenging as a timed speed challenge.
            const shuffleArray = (array: string[]) => {
                let currentIndex = array.length, randomIndex;
                while (currentIndex !== 0) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
                }
                return array;
            };
            
            // Use local state for bonus round instead of hook's state
            setBonusBoardState(shuffleArray([...selectedPuzzle.solution]));
            setBonusLockedSlots(Array(9).fill(false));
            setBonusUserLockedSlots(Array(9).fill(false));
            setBonusTriesLeft(1); // Only 1 try for bonus round
            setBonusFeedback('60 seconds! Solve it fast!');
                    // Note: finalNarrative is handled in ExplanationModal rendering using bonusPuzzle?.narrative
                    setBonusSolvedStatus(null); // Reset bonus status
                    setBonusWinMessage(''); // Reset bonus message
                    setBonusAnimationClass(''); // Reset animation class
                    setGameState('playing');
        }, 500);
    };

    const handleShowStats = () => {
        // Check if bonus round hasn't been played yet AND all 3 puzzles were won
        const allThreeWon = puzzleResults.easy?.solved && 
                            puzzleResults.hard?.solved && 
                            puzzleResults.impossible?.solved;
        
        if (!isBonusRound && !bonusSolvedStatus && allThreeWon) {
            // Show bonus splash screen instead of stats
            setView('bonusSplash');
        } else {
            // Regular flow: reset bonus state and show stats
            setIsBonusRound(false);
            setBonusPuzzle(null);
            setTimeRemaining(60);
            setBonusSolvedStatus(null);
            setBonusWinMessage('');
            setOverlayColor('rgba(41, 98, 255, 0.4)');
            setView('allDone');
        }
    };

    const handlePlayBonusFromSplash = () => {
        setView('playing'); // Move to playing view
        handleBonusPuzzle(); // Start the bonus round (existing function)
    };

    const handlePlayMissedPuzzles = () => {
        setView('archive');
    };

    const handleArchiveDateSelect = (date: Date) => {
        // Check if this date has puzzles - first try schedule, then fallback to dynamic calculation
        const dateKey = formatDateKey(date);
        const scheduledPuzzles = getPuzzlesForDateFromSchedule(schedule, date);
        const puzzlesForDate = scheduledPuzzles || calculatePuzzleIndicesForDate(date);
        
        // Track archive puzzle started (for non-today dates)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);
        if (selectedDate.getTime() !== today.getTime()) {
            // Find first incomplete puzzle or default to easy
            const dayResults = playerData.dailyResults?.[dateKey];
            let difficulty: 'easy' | 'hard' | 'impossible' = 'easy';
            if (!dayResults?.easy) difficulty = 'easy';
            else if (!dayResults?.hard) difficulty = 'hard';
            else if (!dayResults?.impossible) difficulty = 'impossible';
            
            trackArchivePuzzleStarted(difficulty, dateKey, puzzlesForDate[difficulty]);
        }
        
        // Clear stale tiles/solved state from previous session (fixes flash of old puzzle)
        resetBoardForNewSession();
        setNavigatingToNextPuzzle();
        
        // Set target date and start playing that date's puzzles
        setTargetDate(date);
        
        // Always allow playing (even if completed - for replay)
        const dayResults = playerData.dailyResults?.[dateKey];
        
        // Start with the first incomplete puzzle, or easy if all completed (for replay)
        if (!dayResults?.easy) {
            setCurrentPuzzleType('easy');
        } else if (!dayResults?.hard) {
            setCurrentPuzzleType('hard');
        } else if (!dayResults?.impossible) {
            setCurrentPuzzleType('impossible');
        } else {
            // All completed - start from easy for replay
            setCurrentPuzzleType('easy');
        }
        
        setView('playing');
    };

    const handlePlayDate = (date: Date) => {
        // Same logic as handleArchiveDateSelect - navigate to play a specific date's puzzles
        handleArchiveDateSelect(date);
    };

    const handleArchiveBack = () => {
        // Reset to today's date when going back from archive
        setTargetDate(new Date());
        setView('allDone');
    };

    const handleGenerateTestSchedule = async () => {
        // Generate a schedule starting 5 days ago for testing
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 5); // 5 days ago
        const testSchedule = generateDailySchedule(startDate); // Uses dynamic day count
        await updateSchedule(testSchedule);
        if (import.meta.env.DEV) {
            console.log('Test schedule generated! Starting from 5 days ago. Refresh to see past dates in archive.');
        }
    };

    // Show loading state until auth is complete AND data is ready from Firebase
    // This prevents users from starting gameplay before cloud data is synced
    if (authLoading || !dataReady) {
        return (
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh',
                color: '#000',
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px'
            }}>
                {user ? 'Syncing...' : 'Loading...'}
            </div>
        );
    }

    if (view === 'start') {
        return (
            <>
                {errorMessage && (
                    <ErrorToast 
                        message={errorMessage} 
                        onClose={() => setErrorMessage(null)} 
                    />
                )}
                {showcaseVisible && <AchievementShowcaseModal badges={playerData.badges} onClose={() => setShowcaseVisible(false)} user={user} onShowAuth={handleShowAuth} />}
                {showAuthModal && <AuthModal initialMode={authModalMode} onClose={() => setShowAuthModal(false)} />}
                <DailyStartScreen 
                    onPlay={handleStartPlay}
                    onViewStats={handleViewStats}
                    user={user}
                    playerData={playerData}
                    alreadyPlayedToday={!!(puzzleResults.easy && puzzleResults.hard && puzzleResults.impossible)}
                    onShowAuth={handleShowAuth}
                />
            </>
        );
    }

    if (view === 'intro') {
        return (
            <>
                {errorMessage && (
                    <ErrorToast 
                        message={errorMessage} 
                        onClose={() => setErrorMessage(null)} 
                    />
                )}
                {showcaseVisible && <AchievementShowcaseModal badges={playerData.badges} onClose={() => setShowcaseVisible(false)} user={user} onShowAuth={handleShowAuth} />}
                <DailyIntroScreen
                    date={targetDate}
                    theme={theme}
                    onContinue={handleIntroContinue}
                    allSolved={!!(puzzleResults.easy?.solved && puzzleResults.hard?.solved && puzzleResults.impossible?.solved)}
                    mode={introMode}
                    user={user}
                    playerData={playerData}
                    streakWasReset={streakWasReset}
                    dayStreakWasReset={dayStreakWasReset}
                />
            </>
        );
    }

    if (view === 'bonusSplash') {
        return (
            <>
                {errorMessage && (
                    <ErrorToast 
                        message={errorMessage} 
                        onClose={() => setErrorMessage(null)} 
                    />
                )}
                <BonusSplashScreen onPlay={handlePlayBonusFromSplash} />
            </>
        );
    }

    if (view === 'allDone') {
        return (
            <div className="bonus-speed-round-mode">
                {errorMessage && (
                    <ErrorToast 
                        message={errorMessage} 
                        onClose={() => setErrorMessage(null)} 
                    />
                )}
                {showcaseVisible && <AchievementShowcaseModal badges={playerData.badges} onClose={() => setShowcaseVisible(false)} user={user} onShowAuth={handleShowAuth} />}
                {showAuthModal && <AuthModal initialMode={authModalMode} onClose={() => setShowAuthModal(false)} />}
                {showLogoutModal && <LogoutModal 
                    onLogout={async () => {
                        await handleLogout();
                        setTargetDate(new Date()); // Reset to today on logout
                        setView('start');
                        setShowLogoutModal(false);
                    }} 
                    onClose={() => setShowLogoutModal(false)} 
                />}
                <AllDoneScreen
                    date={targetDate}
                    playerData={playerData}
                    puzzleResults={puzzleResults}
                    puzzleIndices={safePuzzleIndices}
                    schedule={schedule}
                    theme={theme}
                    onPlayMissedPuzzles={handlePlayMissedPuzzles}
                    onPlayDate={handlePlayDate}
                    onResetToday={isDev ? handleResetToday : undefined}
                    onGenerateTestSchedule={isDev ? handleGenerateTestSchedule : undefined}
                    onThemeToggle={handleThemeToggle}
                    onShowAchievements={() => setShowcaseVisible(true)}
                    onShowAuth={handleShowAuth}
                    onShowLogout={() => setShowLogoutModal(true)}
                    user={user}
                />
            </div>
        );
    }

    if (view === 'archive') {
        return (
            <>
                {errorMessage && (
                    <ErrorToast 
                        message={errorMessage} 
                        onClose={() => setErrorMessage(null)} 
                    />
                )}
                {showcaseVisible && <AchievementShowcaseModal badges={playerData.badges} onClose={() => setShowcaseVisible(false)} user={user} onShowAuth={handleShowAuth} />}
                <ArchiveView
                    playerData={playerData}
                    schedule={schedule}
                    theme={theme}
                    onSelectDate={handleArchiveDateSelect}
                    onBack={handleArchiveBack}
                />
            </>
        );
    }

    const currentPuzzle = isBonusRound ? bonusPuzzle : puzzle;
    const totalTries = currentPuzzle ? TRIES_PER_DIFFICULTY[currentPuzzle.difficulty] : DEFAULT_TRIES;
    const isLastPuzzle = currentPuzzleType === 'impossible';
    const shouldShowBoard = isBonusRound
        ? bonusPuzzle &&
          bonusBoardState.length > 0 &&
          (gameState === 'playing' ||
            gameState === 'solved' ||
            (gameState === 'generating' && bonusSolvedStatus))
        : currentPuzzle &&
          boardState.length > 0 &&
          (gameState === 'playing' ||
            gameState === 'solved' ||
            (gameState === 'generating' && solvedStatus));

    return (
        <>
            {errorMessage && (
                <ErrorToast 
                    message={errorMessage} 
                    onClose={() => setErrorMessage(null)} 
                />
            )}
            {gameState === 'solved' && (isBonusRound ? bonusSolvedStatus === 'win' : solvedStatus === 'win') && <Confetti theme={theme} />}
            {gameState === 'solved' && (isBonusRound ? bonusSolvedStatus === 'loss' : solvedStatus === 'loss') && <LoserEmojis />}
            {newlyUnlockedBadge && <BadgeUnlockModal badge={newlyUnlockedBadge} onClose={() => setNewlyUnlockedBadge(null)} user={user} onShowAuth={handleShowAuth} />}
            {showcaseVisible && <AchievementShowcaseModal badges={playerData.badges} onClose={() => setShowcaseVisible(false)} user={user} onShowAuth={handleShowAuth} />}
            {showExplanationModal && currentPuzzle && <ExplanationModal narrative={isBonusRound ? bonusPuzzle?.narrative || '' : finalNarrative} solution={currentPuzzle.solution} onClose={handleCloseExplanation} />}
            {showAuthModal && <AuthModal initialMode={authModalMode} onClose={() => setShowAuthModal(false)} />}
            {showLogoutModal && <LogoutModal 
                onLogout={async () => {
                    await handleLogout();
                    setTargetDate(new Date()); // Reset to today on logout
                    setView('start');
                    setShowLogoutModal(false);
                }} 
                onClose={() => setShowLogoutModal(false)} 
            />}
            {showNewPlayerModal && <NewPlayerModal onClose={handleCloseNewPlayerModal} />}
            {showPowerUserHintModal && !isBonusRound && (
                <PowerUserHintModal 
                    onClose={handleClosePowerUserHint}
                    viewCount={hintViewCount}
                    onDismissPermanently={handleDismissPowerUserHintPermanently}
                />
            )}
            {showWhatsNewSheet && (
                <WhatsNewSheet onClose={() => setShowWhatsNewSheet(false)} />
            )}

            <div className="app-wrapper daily-mode-wrapper bonus-speed-round-mode">
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
                            <div className="theme-toggle" onClick={handleThemeToggle}><ThemeToggleIcon theme={theme} /></div>
                            <div className="achievement-icon" onClick={() => setShowcaseVisible(true)}><AchievementIcon /></div>
                            <div className="user-display">
                                {user ? (
                                    <button className="avatar-button" onClick={() => setShowLogoutModal(true)} title="Profile & Logout">
                                        <UserAvatar displayName={user.displayName || 'Player'} theme={theme} />
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={() => handleShowAuth()}><span>Sign-Up / In</span></button>
                                )}
                            </div>
                        </div>
                    </header>
                </div>

                <main className="main-content">
                    {/* Time pressure overlay for bonus round */}
                    {isBonusRound && gameState === 'playing' && (
                        <div 
                            className="bonus-time-pressure-overlay"
                            style={{
                                height: `${overlayHeight}%`,
                                backgroundColor: overlayColor
                            }}
                        />
                    )}
                    <div className={`app-container state-${gameState} ${isBonusRound ? bonusAnimationClass : animationClass}`}>
                    
                        <div className={`game-unit ${isBonusRound ? 'bonus-mode' : ''}`}>
                            <div className="game-header-info" style={{ position: 'relative' }}>
                                {/* Only show header content when board is ready to prevent stale difficulty/help button flash */}
                                {shouldShowBoard && (
                                    <>
                                        <div className="tries-container">
                                            {isBonusRound ? (
                                                <>
                                                    <span>BONUS SPEED ROUND</span>
                                                    <BonusTimer timeRemaining={timeRemaining} />
                                                </>
                                            ) : (
                                                <>
                                                    {puzzle && <span>{puzzle.difficulty}</span>}
                                                    <TriesDots count={triesLeft} totalTries={totalTries} />
                                                </>
                                            )}
                                        </div>
                                        {!isBonusRound && targetDate && (() => {
                                            const today = new Date();
                                            const todayKey = formatDateKey(today);
                                            const dateKey = formatDateKey(targetDate);
                                            if (dateKey !== todayKey) {
                                                const dateStr = targetDate.toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                });
                                                return (
                                                    <span style={{ 
                                                        position: 'absolute',
                                                        right: 0,
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        fontSize: '1.1rem',
                                                        fontWeight: '500',
                                                        color: 'var(--header-text)',
                                                        fontFamily: 'var(--font-ui)'
                                                    }}>
                                                        {dateStr}
                                                    </span>
                                                );
                                            }
                                            // Show help button for today's puzzle + new players (< 9 daily completions)
                                            if ((playerData.gamesPlayed || 0) < 9) {
                                                return (
                                                    <button className="help-trigger" onClick={() => setShowNewPlayerModal(true)}>
                                                        <span className="help-icon">?</span>
                                                        <span>How to play</span>
                                                    </button>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </>
                                )}
                            </div>
                            <div className="game-board-wrapper">
                                {shouldShowBoard ? (
                                    <SortableGameBoard 
                                        boardState={isBonusRound ? bonusBoardState : boardState}
                                        lockedSlots={isBonusRound ? bonusLockedSlots : lockedSlots}
                                        userLockedSlots={isBonusRound ? bonusUserLockedSlots : userLockedSlots}
                                        gameState={gameState}
                                        solvedStatus={isBonusRound ? bonusSolvedStatus : solvedStatus}
                                        winAnimationPropertiesRef={winAnimationPropertiesRef}
                                        lossAnimationPropertiesRef={lossAnimationPropertiesRef}
                                        animateGridShake={animateGridShake}
                                        onReorder={isBonusRound ? handleBonusReorder : handleReorder}
                                        onUserLockToggle={isBonusRound ? handleBonusUserLockToggle : handleUserLockToggle}
                                        onDragStartForHint={isBonusRound ? undefined : handleDragStartForHint}
                                        isBonusMode={isBonusRound}
                                    />
                                ) : (
                                    <div className="loading-puzzle" style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        minHeight: '400px',
                                        color: 'var(--primary-text)',
                                        fontFamily: 'var(--font-ui)'
                                    }}>
                                        Loading puzzle...
                                    </div>
                                )}
                                <div className="bottom-content-container">
                                    <div className="gameplay-ui">
                                        <div className="footer-controls">
                                            <div className="feedback-container">{(isBonusRound ? bonusFeedback : feedback) && <div className={`feedback-text ${animateFeedback ? 'animating' : ''}`}>{isBonusRound ? bonusFeedback : feedback}</div>}</div>
                                            <div className="button-group"><button className="button button-submit" onClick={isBonusRound ? handleBonusSubmit : handleSubmit} disabled={gameState === 'solved'}><span>Submit</span></button></div>
                                        </div>
                                    </div>
                                    <div className="solved-ui">
                                        {(gameState === 'solved' || (gameState === 'generating' && (isBonusRound ? bonusSolvedStatus : solvedStatus))) && (
                                            <div className={`solved-feedback-container ${isBonusRound ? bonusSolvedStatus : solvedStatus}`}>
                                                <div className="solved-feedback-text">
                                                    {isBonusRound ? (
                                                        bonusWinMessage
                                                    ) : (
                                                        solvedStatus === 'win' ? (
                                                            <>
                                                                <div>{winMessageBase}</div>
                                                                {winMessageBonus && <div>{winMessageBonus}</div>}
                                                            </>
                                                        ) : (
                                                            winMessageBase || 'Linkle? More like Stinkle.'
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {currentPuzzle && gameState === 'solved' && (
                                            isBonusRound ? (
                                                <div className="solved-buttons daily-solved-buttons">
                                                    <button className="button button-outline" onClick={handleShowExplanationWithTracking}>
                                                        <span>Show Linkle</span>
                                                    </button>
                                                    <button className="button button-bonus" onClick={handleShowStats}>
                                                        <span>SHOW STATS</span>
                                                    </button>
                                                </div>
                                            ) : (
                                                <DailyPuzzleSolved
                                                    isLastPuzzle={isLastPuzzle}
                                                    onNextPuzzle={handleNextPuzzle}
                                                    onShowStats={handleShowStats}
                                                    onShowExplanation={handleShowExplanationWithTracking}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            
            {view === 'playing' && currentPuzzle && (
                <footer className="bottom-bar">
                    <div className="bottom-bar-content">
                        <div className="theme-toggle" onClick={handleThemeToggle}><ThemeToggleIcon theme={theme} /></div>
                        <div className="achievement-icon" onClick={() => setShowcaseVisible(true)}><AchievementIcon /></div>
                        <div className="user-display">
                            {user ? (
                                <button className="avatar-button" onClick={() => setShowLogoutModal(true)} title="Profile & Logout">
                                    <UserAvatar displayName={user.displayName || 'Player'} theme={theme} />
                                </button>
                            ) : (
                                <button className="auth-button" onClick={() => handleShowAuth()}><span>Sign-Up / In</span></button>
                            )}
                        </div>
                    </div>
                    {isDev && (
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
            )}
            {isDev && view !== 'playing' && (
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
        </>
    );
};
