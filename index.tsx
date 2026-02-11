// @ts-nocheck
// Initialize Firebase first (must be imported before any hooks that use Firebase)
import './firebase';

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { useAuth } from './hooks/useAuth';
import { useGameLogic } from './hooks/useGameLogic';
import { useBodyClasses } from './hooks/useBodyClasses';
import type { Theme, GameState, AuthMode } from './types';
import { AchievementIcon, ThemeToggleIcon, TitleGraphic, StreakIcon } from './components/Icons';
import { BadgeUnlockModal, AchievementShowcaseModal, ExplanationModal, AuthModal, LogoutModal, PowerUserHintModal, WhatsNewSheet } from './components/Modals';
import { MiniGrid, Confetti, LoserEmojis, UserAvatar, TriesDots, DifficultyTag } from './components/GameUI';
import { SortableGameBoard } from './components/SortableGameBoard';
import { SandboxPage } from './components/SandboxPage';
import { BonusSpeedRoundMode } from './components/BonusSpeedRoundMode';
import { AdminDashboard } from './components/AdminDashboard';
import { TRIES_PER_DIFFICULTY, DEFAULT_TRIES } from './constants';

const App = () => {
    const [theme, setTheme] = useState<Theme>('light');
    const [showcaseVisible, setShowcaseVisible] = useState(false);
    const prevGameStateRef = useRef<GameState>();
    const [animateHeader, setAnimateHeader] = useState(false);
    const [authModalMode, setAuthModalMode] = useState<AuthMode>('signup');
    const [showWhatsNewSheet, setShowWhatsNewSheet] = useState(false);

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
        showPowerUserHintModal,
        hintViewCount,
        resetToStart,
        generateNewPuzzle,
        handleReorder,
        handleUserLockToggle,
        handleSubmit,
        handleShowExplanation,
        handleCloseExplanation,
        handleDragStartForHint,
        handleClosePowerUserHint,
        handleDismissPowerUserHintPermanently,
    } = useGameLogic(playerData, setPlayerData, saveGameState, theme);

    // --- Login State Reset ---
    const prevUserRef = useRef(user);
    useEffect(() => {
        // This effect detects when a user logs in (i.e., user goes from falsy to truthy).
        // It resets the game state to prevent showing a stale 'solved' screen from a guest session.
        if (!prevUserRef.current && user) {
            resetToStart();
        }
        prevUserRef.current = user;
    }, [user, resetToStart]);

    // --- Header Animation Trigger ---
    useEffect(() => {
        if (prevGameStateRef.current === 'start' && (gameState === 'generating' || gameState === 'playing')) {
            setAnimateHeader(true);
        } else if (prevGameStateRef.current === 'solved' && gameState === 'generating') {
            setAnimateHeader(false);
        }
        prevGameStateRef.current = gameState;
    }, [gameState]);


    // --- Theme Management ---
    useEffect(() => {
        // --- LocalStorage Migration: theme ---
        const oldTheme = localStorage.getItem('chainReactionTheme');
        if (oldTheme) {
            localStorage.setItem('linkleTheme', oldTheme);
            localStorage.removeItem('chainReactionTheme');
        }
        // --- End Migration ---

        const savedTheme = localStorage.getItem('linkleTheme') as Theme | null;
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.body.dataset.theme = initialTheme;
    }, []);

    // Show What's New sheet for returning players who haven't seen it yet
    useEffect(() => {
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
    }, [playerData.totalSolved]);

    // --- Body Class Management ---
    useBodyClasses(gameState, puzzle, solvedStatus, theme);
    
    // Once authentication is resolved, move from 'loading' to 'start' state.
    useEffect(() => {
        if (!authLoading && gameState === 'loading') {
            setGameState('start');
        }
    }, [authLoading, gameState, setGameState]);

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.dataset.theme = newTheme;
        localStorage.setItem('linkleTheme', newTheme);
    };

    const handlePlayClick = () => {
        generateNewPuzzle();
    };

    const handleShowAuth = (mode?: AuthMode) => {
        setAuthModalMode(mode || 'signup');
        setShowAuthModal(true);
    };

    const totalTries = puzzle ? TRIES_PER_DIFFICULTY[puzzle.difficulty] : DEFAULT_TRIES;
    
    if (authLoading || gameState === 'loading') {
        return null;
    }

    return (
        <>
            {gameState === 'solved' && solvedStatus === 'win' && <Confetti theme={theme} />}
            {gameState === 'solved' && solvedStatus === 'loss' && <LoserEmojis />}
            {newlyUnlockedBadge && <BadgeUnlockModal badge={newlyUnlockedBadge} onClose={() => setNewlyUnlockedBadge(null)} />}
            {showcaseVisible && <AchievementShowcaseModal badges={playerData.badges} onClose={() => setShowcaseVisible(false)} />}
            {showExplanationModal && puzzle && <ExplanationModal narrative={finalNarrative} solution={puzzle.solution} onClose={handleCloseExplanation} />}
            {showAuthModal && <AuthModal initialMode={authModalMode} onClose={() => setShowAuthModal(false)} />}
            {showLogoutModal && <LogoutModal 
                onLogout={async () => {
                    await handleLogout();
                    resetToStart();
                    setShowLogoutModal(false);
                }} 
                onClose={() => setShowLogoutModal(false)} 
            />}
            {showPowerUserHintModal && (
                <PowerUserHintModal 
                    onClose={handleClosePowerUserHint} 
                    viewCount={hintViewCount}
                    onDismissPermanently={handleDismissPowerUserHintPermanently}
                />
            )}
            {showWhatsNewSheet && (
                <WhatsNewSheet onClose={() => setShowWhatsNewSheet(false)} />
            )}

            <div className="app-wrapper">
                <div className="top-bar-container">
                    <header className={`top-bar ${gameState === 'start' ? 'start-screen-header' : ''}`}>
                        <div className={`logo ${gameState !== 'start' ? 'logo-is-graphic' : ''}`}>
                            {gameState !== 'start' ? (
                                <TitleGraphic />
                            ) : (
                                <><span className="logo-bold">dumbify</span><span className="logo-regular">games</span></>
                            )}
                        </div>
                        
                        {gameState !== 'start' && (
                            <div className="score-display-group">
                                <div className="total-score">SCORE: {playerData.totalScore}</div>
                                <div className="streak-icon">
                                    <StreakIcon />
                                </div>
                                <span className="streak-score-text">{playerData.currentStreak}</span>
                            </div>
                        )}

                        {gameState !== 'start' && (
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
                        )}
                    </header>
                </div>

                <main className="main-content">
                    {gameState === 'start' ? (
                        <div className="start-screen-container">
                            <div className="start-screen-content">
                                <div className="header">
                                    <MiniGrid />
                                    <TitleGraphic />
                                    <p className="tagline">One dumb thing<br />leads to another.</p>
                                </div>
                                <div className="start-screen-interaction">
                                    <div className="start-screen-buttons">
                                        <button className="button" onClick={handlePlayClick}><span>Play</span></button>
                                        {!user && (
                                            <>
                                                <button className="start-screen-login-link" onClick={() => handleShowAuth('login')}>- Login -</button>
                                                <button className="button button-signup" onClick={() => handleShowAuth('signup')}><span>Sign-Up</span></button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`app-container state-${gameState} ${animationClass}`}>
                            <div className={`game-unit ${animateHeader ? 'initial-play-animation' : ''}`}>
                                {/* 
                                <div className="header">
                                    <TitleGraphic />
                                </div>
                                <p className="tagline">One dumb thing<br />leads to another.</p>
                                */}
                                <div className="game-header-info">
                                    <div className="tries-container">
                                        {puzzle && <span>{puzzle.difficulty}</span>}
                                        <TriesDots count={triesLeft} totalTries={totalTries} />
                                    </div>
                                </div>
                                <div className="game-board-wrapper">
                                    <SortableGameBoard 
                                        boardState={boardState}
                                        lockedSlots={lockedSlots}
                                        userLockedSlots={userLockedSlots}
                                        gameState={gameState}
                                        solvedStatus={solvedStatus}
                                        winAnimationPropertiesRef={winAnimationPropertiesRef}
                                        lossAnimationPropertiesRef={lossAnimationPropertiesRef}
                                        animateGridShake={animateGridShake}
                                        onReorder={handleReorder}
                                        onUserLockToggle={handleUserLockToggle}
                                        onDragStartForHint={handleDragStartForHint}
                                    />
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
                                                        {solvedStatus === 'win' ? (<><div>{winMessageBase}</div>{winMessageBonus && <div>{winMessageBonus}</div>}</>) : ('Linkle? More like Stinkle.')}
                                                    </div>
                                                </div>
                                            )}
                                            {puzzle && (<div className="solved-buttons">
                                                <button className="button button-outline" onClick={handleShowExplanation}><span>Show Linkle</span></button>
                                                <button className="button button-secondary" onClick={generateNewPuzzle}><span>Play Again</span></button>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
            
            {gameState !== 'start' && (
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
                                <button className="auth-button" onClick={() => setShowAuthModal(true)}><span>Log In</span></button>
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
            )}
        </>
    );
};

const RegularMode = () => {
    return <App />;
};

const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BonusSpeedRoundMode />} />
                <Route path="/daily" element={<Navigate to="/" replace />} />
                <Route path="/c/:inviteCode" element={<BonusSpeedRoundMode />} /> {/* Circle invite links */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/sandbox" element={<SandboxPage />} />
                <Route path="/sandbox/infinite" element={<RegularMode />} />
                <Route path="/sandbox/bonusspeedround" element={<BonusSpeedRoundMode />} />
            </Routes>
            <Analytics />
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Root />);

// Dev utility: Reset game data
// Call this from the browser console: resetLinkleData()
if (typeof window !== 'undefined') {
    (window as any).resetLinkleData = () => {
        try {
            localStorage.removeItem('linklePlayerData');
            localStorage.removeItem('chainReactionPlayerData'); // Also clear old key if it exists
            console.log('✅ Game data cleared! Reloading page...');
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error('❌ Failed to reset game data:', error);
        }
    };
    console.log('💡 Dev utility available: Call resetLinkleData() in the console to reset your game data');
}