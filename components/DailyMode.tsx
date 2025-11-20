// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDailySchedule } from '../hooks/useDailySchedule';
import { useDailyGameLogic, type DailyPuzzleDifficulty } from '../hooks/useDailyGameLogic';
import { useBodyClasses } from '../hooks/useBodyClasses';
import type { Theme, GameState, DailyResult, AuthMode } from '../types';
import { AchievementIcon, ThemeToggleIcon, TitleGraphic, StreakIcon } from './Icons';
import { BadgeUnlockModal, AchievementShowcaseModal, ExplanationModal, AuthModal, LogoutModal } from './Modals';
import { MiniGrid, Confetti, LoserEmojis, UserAvatar, TriesDots } from './GameUI';
import { GameBoard } from './GameBoard';
import { DailyStartScreen } from './DailyStartScreen';
import { DailyIntroScreen } from './DailyIntroScreen';
import { DailyPuzzleSolved } from './DailyPuzzleSolved';
import { AllDoneScreen } from './AllDoneScreen';
import { ArchiveView } from './ArchiveView';
import { ErrorToast } from './ErrorToast';
import { TRIES_PER_DIFFICULTY, DEFAULT_TRIES } from '../constants';
import { formatDateKey, generateDailySchedule, getPuzzlesForDateFromSchedule } from '../dailySchedule';

type DailyModeView = 'start' | 'intro' | 'playing' | 'allDone' | 'archive';

export const DailyMode = () => {
    // Check if we're in development mode
    const isDev = import.meta.env.DEV;
    const [theme, setTheme] = useState<Theme>('light');
    const [showcaseVisible, setShowcaseVisible] = useState(false);
    const [view, setView] = useState<DailyModeView>('start');
    const [currentPuzzleType, setCurrentPuzzleType] = useState<DailyPuzzleDifficulty>('easy');
    const [targetDate, setTargetDate] = useState<Date>(new Date()); // Can be changed to play past dates
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [authModalMode, setAuthModalMode] = useState<AuthMode>('signup');

    const {
        user,
        playerData,
        setPlayerData,
        authLoading,
        showAuthModal,
        setShowAuthModal,
        showLogoutModal,
        setShowLogoutModal,
        handleLogout,
        saveGameState,
    } = useAuth();

    // Load existing results for today
    const dateKey = formatDateKey(targetDate);
    const existingResults = playerData.dailyResults?.[dateKey] || {};
    const [puzzleResults, setPuzzleResults] = useState<{
        easy?: DailyResult;
        hard?: DailyResult;
        impossible?: DailyResult;
    }>(existingResults);

    const { schedule, loading: scheduleLoading, getPuzzlesForDate, updateSchedule } = useDailySchedule();
    const puzzleIndices = getPuzzlesForDate(targetDate);

    const handlePuzzleComplete = (result: DailyResult, puzzleType: DailyPuzzleDifficulty) => {
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

    const {
        gameState,
        setGameState,
        solvedStatus,
        puzzle,
        boardState,
        lockedSlots,
        triesLeft,
        feedback,
        finalNarrative,
        animationClass,
        winMessageBase,
        winMessageBonus,
        showExplanationModal,
        newlyUnlockedBadge,
        setNewlyUnlockedBadge,
        dragState,
        dragItemRef,
        winAnimationPropertiesRef,
        lossAnimationPropertiesRef,
        animateFeedback,
        animateGridShake,
        handlePointerDown,
        handleSubmit,
        handleShowExplanation,
        handleCloseExplanation,
        setNavigatingToNextPuzzle,
    } = useDailyGameLogic(
        playerData,
        setPlayerData,
        saveGameState,
        theme,
        (error: string) => setErrorMessage(error),
        targetDate,
        currentPuzzleType,
        puzzleIndices,
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

    useBodyClasses(gameState, puzzle, solvedStatus, theme);

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.dataset.theme = newTheme;
        localStorage.setItem('linkleTheme', newTheme);
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
        setView('intro');
    };

    const handleShowAuth = (mode?: AuthMode) => {
        setAuthModalMode(mode || 'signup');
        setShowAuthModal(true);
    };

    const handleIntroContinue = () => {
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

    const handleShowStats = () => {
        setView('allDone');
    };

    const handlePlayMissedPuzzles = () => {
        setView('archive');
    };

    const handleArchiveDateSelect = (date: Date) => {
        // Check if this date has puzzles in the schedule
        const dateKey = formatDateKey(date);
        const puzzlesForDate = getPuzzlesForDateFromSchedule(schedule, date);
        
        if (!puzzlesForDate) {
            // No puzzles for this date - shouldn't happen if archive is working correctly, but handle gracefully
            setErrorMessage('No puzzles available for this date. Please try another date.');
            if (import.meta.env.DEV) {
                console.warn(`No puzzles found for date: ${dateKey}`);
            }
            return;
        }
        
        // Reset game state to ensure clean start (no solved animations)
        setGameState('loading');
        
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

    if (authLoading || scheduleLoading) {
        return null;
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
                {showcaseVisible && <AchievementShowcaseModal badges={playerData.badges} onClose={() => setShowcaseVisible(false)} />}
                {showAuthModal && <AuthModal initialMode={authModalMode} onClose={() => setShowAuthModal(false)} />}
                <DailyStartScreen 
                    onPlay={handleStartPlay} 
                    user={user}
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
                {showcaseVisible && <AchievementShowcaseModal badges={playerData.badges} onClose={() => setShowcaseVisible(false)} />}
                <DailyIntroScreen
                    date={targetDate}
                    theme={theme}
                    onContinue={handleIntroContinue}
                    allSolved={!!(existingResults.easy && existingResults.hard && existingResults.impossible)}
                />
            </>
        );
    }

    if (view === 'allDone') {
        return (
            <>
                {errorMessage && (
                    <ErrorToast 
                        message={errorMessage} 
                        onClose={() => setErrorMessage(null)} 
                    />
                )}
                {showcaseVisible && <AchievementShowcaseModal badges={playerData.badges} onClose={() => setShowcaseVisible(false)} />}
                {showAuthModal && <AuthModal initialMode={authModalMode} onClose={() => setShowAuthModal(false)} />}
                {showLogoutModal && <LogoutModal 
                    onLogout={async () => {
                        await handleLogout();
                        setShowLogoutModal(false);
                    }} 
                    onClose={() => setShowLogoutModal(false)} 
                />}
                <AllDoneScreen
                    date={targetDate}
                    playerData={playerData}
                    puzzleResults={puzzleResults}
                    puzzleIndices={puzzleIndices}
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
            </>
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
                {showcaseVisible && <AchievementShowcaseModal badges={playerData.badges} onClose={() => setShowcaseVisible(false)} />}
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

    const totalTries = puzzle ? TRIES_PER_DIFFICULTY[puzzle.difficulty] : DEFAULT_TRIES;
    const isLastPuzzle = currentPuzzleType === 'impossible';

    return (
        <>
            {errorMessage && (
                <ErrorToast 
                    message={errorMessage} 
                    onClose={() => setErrorMessage(null)} 
                />
            )}
            {gameState === 'solved' && solvedStatus === 'win' && <Confetti theme={theme} />}
            {gameState === 'solved' && solvedStatus === 'loss' && <LoserEmojis />}
            {newlyUnlockedBadge && <BadgeUnlockModal badge={newlyUnlockedBadge} onClose={() => setNewlyUnlockedBadge(null)} />}
            {showcaseVisible && <AchievementShowcaseModal badges={playerData.badges} onClose={() => setShowcaseVisible(false)} />}
            {showExplanationModal && puzzle && <ExplanationModal narrative={finalNarrative} solution={puzzle.solution} onClose={handleCloseExplanation} />}
            {showAuthModal && <AuthModal initialMode={authModalMode} onClose={() => setShowAuthModal(false)} />}
            {showLogoutModal && <LogoutModal 
                onLogout={async () => {
                    await handleLogout();
                    setShowLogoutModal(false);
                }} 
                onClose={() => setShowLogoutModal(false)} 
            />}

            <div className="app-wrapper daily-mode-wrapper">
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
                    <div className={`app-container state-${gameState} ${animationClass}`}>
                        {dragState.isDragging && (
                            <div className="ghost-tile word-card" style={{ position: 'fixed', left: dragState.clientX - dragState.offsetX, top: dragState.clientY - dragState.offsetY, width: dragState.ghostWidth, height: dragState.ghostHeight, pointerEvents: 'none', zIndex: 1000, opacity: 0.9, transform: 'scale(1.05)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)'}}>
                                <span>{boardState[dragState.index]}</span>
                            </div>
                        )}
                    
                        <div className="game-unit">
                            <div className="game-header-info" style={{ position: 'relative' }}>
                                <div className="tries-container">
                                    {puzzle && <span>{puzzle.difficulty}</span>}
                                    <TriesDots count={triesLeft} totalTries={totalTries} />
                                </div>
                                {targetDate && (() => {
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
                                    return null;
                                })()}
                            </div>
                            <div className="game-board-wrapper">
                                {puzzle && boardState.length > 0 ? (
                                    <GameBoard 
                                        boardState={boardState}
                                        lockedSlots={lockedSlots}
                                        gameState={gameState}
                                        solvedStatus={solvedStatus}
                                        dragState={dragState}
                                        dragItemRef={dragItemRef}
                                        winAnimationPropertiesRef={winAnimationPropertiesRef}
                                        lossAnimationPropertiesRef={lossAnimationPropertiesRef}
                                        animateGridShake={animateGridShake}
                                        onPointerDown={handlePointerDown}
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
                                            <div className="feedback-container">{feedback && <div className={`feedback-text ${animateFeedback ? 'animating' : ''}`}>{feedback}</div>}</div>
                                            <div className="button-group"><button className="button button-submit" onClick={handleSubmit} disabled={gameState === 'solved'}><span>Submit</span></button></div>
                                        </div>
                                    </div>
                                    <div className="solved-ui">
                                        {(gameState === 'solved' || (gameState === 'generating' && solvedStatus)) && (
                                            <div className={`solved-feedback-container ${solvedStatus}`}>
                                                <div className="solved-feedback-text">
                                                    {solvedStatus === 'win' ? (
                                                        <>
                                                            <div>{winMessageBase}</div>
                                                            {winMessageBonus && <div>{winMessageBonus}</div>}
                                                        </>
                                                    ) : (
                                                        winMessageBase || 'Linkle? More like Stinkle.'
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {puzzle && gameState === 'solved' && (
                                            <DailyPuzzleSolved
                                                isLastPuzzle={isLastPuzzle}
                                                onNextPuzzle={handleNextPuzzle}
                                                onShowStats={handleShowStats}
                                                onShowExplanation={handleShowExplanation}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            
            {view === 'playing' && puzzle && (
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
