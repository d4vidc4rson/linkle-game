// @ts-nocheck
import { useState, useRef, useCallback, useEffect } from 'react';
import { PREGENERATED_PUZZLES, Puzzle } from '../puzzles';
import type { GameState, SolvedStatus, PlayerData, Badge, Theme } from '../types';
import { TRIES_PER_DIFFICULTY, DEFAULT_TRIES } from '../constants';
import { 
    updateBadgeProgress, 
    checkSingleEventBadges, 
    checkProgressBadges, 
    checkPolymathBadge 
} from '../utils/badgeHelpers';

const shuffleArray = (array: string[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
};

/**
 * Detects if a locked slot pattern is "frustrating" for the user.
 * Frustrating patterns occur when:
 * 1. Middle column tiles (indices 1, 4, or 7) are locked - causes tiles before/after to shift a lot
 * 2. Non-contiguous locks exist (gaps in the lock pattern) - creates "islands"
 * 
 * Grid layout:
 * 0 | 1 | 2
 * ---------
 * 3 | 4 | 5
 * ---------
 * 6 | 7 | 8
 */
const isFrustratingLockPattern = (lockedSlots: boolean[]): boolean => {
    const lockedIndices = lockedSlots
        .map((locked, index) => locked ? index : -1)
        .filter(index => index !== -1);
    
    // No locked tiles or all tiles locked = not frustrating
    if (lockedIndices.length === 0 || lockedIndices.length === 9) {
        return false;
    }
    
    // Check for middle column locks (indices 1, 4, 7)
    const middleColumnIndices = [1, 4, 7];
    const hasMiddleColumnLock = lockedIndices.some(idx => middleColumnIndices.includes(idx));
    
    if (hasMiddleColumnLock) {
        return true;
    }
    
    // Check for non-contiguous locks (gaps in the sequence)
    // For a 3x3 grid read left-to-right, top-to-bottom, gaps create frustration
    if (lockedIndices.length >= 2) {
        const sortedIndices = [...lockedIndices].sort((a, b) => a - b);
        for (let i = 0; i < sortedIndices.length - 1; i++) {
            const gap = sortedIndices[i + 1] - sortedIndices[i];
            // If there's a gap > 1, there are unlocked tiles between locked ones
            if (gap > 1) {
                return true;
            }
        }
    }
    
    return false;
};

/**
 * Checks if we should show the power user hint based on localStorage flags.
 * Stop showing when ANY of these conditions are met:
 * - User has seen the hint modal AND used the double-tap lock feature
 * - User has seen the hint modal 5+ times without using the feature
 * - User has permanently dismissed the hint
 */
const shouldShowPowerUserHintCheck = (): boolean => {
    const hasDismissed = localStorage.getItem('linkleHasDismissedPowerUserHint') === 'true';
    if (hasDismissed) return false;
    
    const viewCount = parseInt(localStorage.getItem('linkleHintViewCount') || '0', 10);
    const hasUsedFeature = localStorage.getItem('linkleHasUsedUserLock') === 'true';
    
    // Stop showing if seen 5+ times without using the feature
    if (viewCount >= 5 && !hasUsedFeature) return false;
    
    // Stop showing if seen at least once AND used the feature
    if (viewCount > 0 && hasUsedFeature) return false;
    
    return true;
};

/**
 * Gets the current view count for the power user hint modal.
 */
const getHintViewCount = (): number => {
    return parseInt(localStorage.getItem('linkleHintViewCount') || '0', 10);
};

export const useGameLogic = (playerData: PlayerData, setPlayerData: (data: PlayerData) => void, saveGameState: (data: PlayerData) => Promise<void>, theme: Theme) => {
    const [gameState, setGameState] = useState<GameState>('loading');
    const [solvedStatus, setSolvedStatus] = useState<SolvedStatus>(null);
    const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
    const [boardState, setBoardState] = useState<string[]>([]);
    const [lockedSlots, setLockedSlots] = useState<boolean[]>(Array(9).fill(false));
    const [userLockedSlots, setUserLockedSlots] = useState<boolean[]>(Array(9).fill(false));
    const [triesLeft, setTriesLeft] = useState(4);
    const [feedback, setFeedback] = useState('');
    const [finalNarrative, setFinalNarrative] = useState('');
    const [animationClass, setAnimationClass] = useState('');
    const [winMessageBase, setWinMessageBase] = useState('');
    const [winMessageBonus, setWinMessageBonus] = useState('');
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);
    const [badgePendingOnModalClose, setBadgePendingOnModalClose] = useState<Badge | null>(null);
    const [animateFeedback, setAnimateFeedback] = useState(false);
    const [animateGridShake, setAnimateGridShake] = useState(false);
    
    // Power user hint modal state
    const [shouldShowPowerUserHint, setShouldShowPowerUserHint] = useState(false);
    const [showPowerUserHintModal, setShowPowerUserHintModal] = useState(false);
    const [hintViewCount, setHintViewCount] = useState(getHintViewCount);

    const puzzleStartTimeRef = useRef<number | null>(null);

    const winAnimationPropertiesRef = useRef<Array<any>>([]);
    const lossAnimationPropertiesRef = useRef<Array<any>>([]);

    useEffect(() => {
        if (gameState === 'playing') {
            setFeedback('Drag and drop into the best order.');
        }
    }, [gameState, puzzle]); // Rerun when a new puzzle starts

    // Effect to automatically reset the feedback animation state
    useEffect(() => {
        if (animateFeedback) {
            const timer = setTimeout(() => setAnimateFeedback(false), 300); // Duration should match CSS animation
            return () => clearTimeout(timer);
        }
    }, [animateFeedback]);
    
    // Effect to automatically reset the grid shake animation state
    useEffect(() => {
        if (animateGridShake) {
            const timer = setTimeout(() => setAnimateGridShake(false), 500); // Duration should match CSS animation
            return () => clearTimeout(timer);
        }
    }, [animateGridShake]);

    const resetToStart = useCallback(() => {
        setGameState('start');
        setSolvedStatus(null);
        setPuzzle(null);
        setBoardState([]);
        setLockedSlots(Array(9).fill(false));
        setTriesLeft(4);
        setFeedback('');
        setFinalNarrative('');
        setAnimationClass('');
        setWinMessageBase('');
        setWinMessageBonus('');
        setNewlyUnlockedBadge(null);
    }, []);

    const generateNewPuzzle = useCallback(() => {
        setGameState('generating');
    
        setTimeout(() => {
            const playedPuzzleIndices = new Set(playerData.playedPuzzleIndices || []);
            const allIndices = Array.from({ length: PREGENERATED_PUZZLES.length }, (_, i) => i);
            let availableIndices = allIndices.filter(index => !playedPuzzleIndices.has(index));
            
            let nextPlayedIndices = Array.from(playedPuzzleIndices);
    
            if (availableIndices.length === 0) {
                availableIndices = allIndices; 
                nextPlayedIndices = [];
            }
    
            const randomIndexInAvailable = Math.floor(Math.random() * availableIndices.length);
            const newPuzzleIndex = availableIndices[randomIndexInAvailable];
            const newPuzzle = PREGENERATED_PUZZLES[newPuzzleIndex];
            
            nextPlayedIndices.push(newPuzzleIndex);
            
            // --- Daily Play Streak Logic ---
            const today = new Date();
            const lastPlayed = playerData.lastPlayedDate ? new Date(playerData.lastPlayedDate) : null;
            let newConsecutiveDays = playerData.consecutiveDaysPlayed || 0;

            if (lastPlayed) {
                const yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);

                if (isSameDay(lastPlayed, yesterday)) {
                    newConsecutiveDays++;
                } else if (!isSameDay(lastPlayed, today)) {
                    newConsecutiveDays = 1;
                }
            } else {
                newConsecutiveDays = 1;
            }

            const updatedPlayerData = {
                ...playerData, 
                playedPuzzleIndices: nextPlayedIndices,
                consecutiveDaysPlayed: newConsecutiveDays,
                lastPlayedDate: today.toISOString()
            };

            // This is a temporary update, the final save happens on game end
            setPlayerData(updatedPlayerData); 
    
            const initialTries = TRIES_PER_DIFFICULTY[newPuzzle.difficulty] || DEFAULT_TRIES;
    
            let winCombos, lossCombos;
            if (theme === 'dark') {
                winCombos = [{ bgColor: '#eddec9', textColor: '#331922' }, { bgColor: '#f7f2ec', textColor: '#331922' }];
                lossCombos = [{ bgColor: '#c7a992', textColor: '#220f17' }, { bgColor: '#220f17', textColor: '#c7a992' }];
            } else { // light theme
                winCombos = [{ bgColor: '#331922', textColor: '#eddec9' }, { bgColor: '#f7f2ec', textColor: '#331922' }];
                lossCombos = [{ bgColor: '#7d6c63', textColor: '#f7f2ec' }, { bgColor: '#c7a992', textColor: '#f7f2ec' }];
            }
    
            winAnimationPropertiesRef.current = Array.from({ length: 9 }).map(() => {
                const startIndex = Math.floor(Math.random() * winCombos.length);
                return { tx: `${Math.random() * 250 - 125}px`, ty: `${Math.random() * 250 - 125}px`, rot: `${Math.random() * 540 - 270}deg`, startBgColor: winCombos[startIndex].bgColor, startTextColor: winCombos[startIndex].textColor, midBgColor: winCombos[(startIndex + 1) % winCombos.length].bgColor, midTextColor: winCombos[(startIndex + 1) % winCombos.length].textColor };
            });
    
            lossAnimationPropertiesRef.current = Array.from({ length: 9 }).map(() => {
                const startIndex = Math.floor(Math.random() * lossCombos.length);
                return { tx: `${Math.random() * 100 - 50}px`, ty: `${Math.random() * 100 - 50}px`, rot: `${Math.random() * 60 - 30}deg`, startBgColor: lossCombos[startIndex].bgColor, startTextColor: lossCombos[startIndex].textColor, midBgColor: lossCombos[(startIndex + 1) % lossCombos.length].bgColor, midTextColor: lossCombos[(startIndex + 1) % lossCombos.length].textColor };
            });
            
            puzzleStartTimeRef.current = Date.now();
            setPuzzle(newPuzzle);
            setBoardState(shuffleArray([...newPuzzle.solution]));
            setLockedSlots(Array(9).fill(false));
            setUserLockedSlots(Array(9).fill(false));
            setTriesLeft(initialTries);
            setFeedback('');
            setFinalNarrative('');
            setSolvedStatus(null);
            setAnimationClass('');
            setWinMessageBase('');
            setWinMessageBonus('');
            setNewlyUnlockedBadge(null);
            
            setTimeout(() => setGameState('playing'), 0);
    
        }, 500);
    
    }, [playerData, setPlayerData, theme]);

    // Handle reorder from SortableGameBoard (called when tiles are dragged and dropped)
    const handleReorder = useCallback((newBoardState: string[]) => {
        setBoardState(newBoardState);
    }, []);

    // Handle double-tap to toggle user-lock on a tile (only if not system-locked)
    const handleUserLockToggle = useCallback((index: number) => {
        if (lockedSlots[index]) return; // Can't user-lock a system-locked tile
        setUserLockedSlots(prev => {
            const newUserLocked = [...prev];
            const wasLocked = newUserLocked[index];
            newUserLocked[index] = !wasLocked;
            
            // Track when user locks a tile (not unlocks) - they've discovered the feature
            if (!wasLocked) {
                localStorage.setItem('linkleHasUsedUserLock', 'true');
            }
            
            return newUserLocked;
        });
    }, [lockedSlots]);
    
    const calculateScore = (difficulty: string, triesLeft: number, currentStreak: number) => {
        const points = { 'EASY': [0, 50, 75, 100, 125], 'HARD': [0, 150, 200, 250], 'IMPOSSIBLE': [0, 400, 500] };
        const baseScore = points[difficulty]?.[triesLeft] || 0;
        const streakBonus = Math.min(currentStreak * 10, 50);
        return { baseScore, streakBonus, total: baseScore + streakBonus };
    };

    const getWinMessage = (difficulty: string, triesLeft: number, baseScore: number) => {
        const successMessages = { 
            'EASY': { 4: "Perfect Linkle!", 3: "Great!", 2: "Solved!", 1: "Solved!" }, 
            'HARD': { 3: "Perfect Linkle!", 2: "Great!", 1: "Solved!" }, 
            'IMPOSSIBLE': { 2: "Perfect Linkle!", 1: "Solved!" } 
        };
        const successLevel = successMessages[difficulty]?.[triesLeft] || "Solved!";
        
        if (difficulty === 'HARD') return `${successLevel} +${baseScore} points!`;
        if (difficulty === 'IMPOSSIBLE') return `Impossible Feat! +${baseScore} points!`;
        return `${successLevel} +${baseScore} points!`;
    };

    const getFeedbackMessage = (totalLocked: number, triesLeft: number, madeProgress: boolean): string => {
        if (triesLeft === 1) {
            return 'Last try. Make it count!';
        }
        
        if (!madeProgress) {
            return 'No new connections. Try again.';
        }
        
        const messages: Record<number, string> = {
            1: 'One right word in place.',
            2: 'Two words in the right place!',
            3: 'Three words in the right place!',
            4: 'Incredible! Four words locked in!',
        };
        
        if (messages[totalLocked]) {
            return messages[totalLocked];
        }
        
        const numberWords: Record<number, string> = { 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight' };
        const wordCountText = numberWords[totalLocked] || totalLocked;
        return `Incredible! ${wordCountText} words locked in!`;
    };

    const handleWin = async (puzzle: Puzzle, solveTimeSeconds: number) => {
        const initialTries = TRIES_PER_DIFFICULTY[puzzle.difficulty] || DEFAULT_TRIES;
        const isPerfect = triesLeft === initialTries;
        
        // Update core stats
        const newStreak = playerData.currentStreak + 1;
        const newTotalSolvedCount = playerData.totalSolved + 1;
        const newPerfectCount = playerData.perfectScores + (isPerfect ? 1 : 0);
        const newConsecutivePerfects = isPerfect ? (playerData.consecutivePerfects || 0) + 1 : 0;
        const newImpossiblePerfects = (isPerfect && puzzle.difficulty === 'IMPOSSIBLE') 
            ? (playerData.impossiblePerfects || 0) + 1 
            : (playerData.impossiblePerfects || 0);
        
        // Difficulty-specific solve counts
        const difficultyCounts = {
            easy: puzzle.difficulty === 'EASY' ? (playerData.easySolved || 0) + 1 : (playerData.easySolved || 0),
            hard: puzzle.difficulty === 'HARD' ? (playerData.hardSolved || 0) + 1 : (playerData.hardSolved || 0),
            impossible: puzzle.difficulty === 'IMPOSSIBLE' ? (playerData.impossibleSolved || 0) + 1 : (playerData.impossibleSolved || 0),
        };
        
        // Calculate score
        const { baseScore, streakBonus, total: newTotalScore } = calculateScore(
            puzzle.difficulty, 
            triesLeft, 
            playerData.currentStreak
        );
        
        // Set win messages
        setWinMessageBase(getWinMessage(puzzle.difficulty, triesLeft, baseScore));
        setWinMessageBonus(streakBonus > 0 ? `🔥 Streak bonus: +${streakBonus} points` : '');
        
        // Calculate accumulated total score
        const accumulatedTotalScore = (playerData.totalScore || 0) + newTotalScore;
        
        // Update badges
        let newBadges = updateBadgeProgress(playerData.badges, {
            streak: newStreak,
            perfectCount: newPerfectCount,
            totalSolved: newTotalSolvedCount,
            hardSolved: difficultyCounts.hard,
            impossibleSolved: difficultyCounts.impossible,
            consecutiveDays: playerData.consecutiveDaysPlayed,
            impossiblePerfects: newImpossiblePerfects,
            consecutivePerfects: newConsecutivePerfects,
            totalScore: accumulatedTotalScore,
        });
        
        // Check single-event badges
        const singleEventResult = checkSingleEventBadges(newBadges, puzzle, triesLeft, solveTimeSeconds);
        newBadges = singleEventResult.badges;
        let newlyUnlocked = singleEventResult.newlyUnlocked;
        
        // Check progress-based badges
        const progressResult = checkProgressBadges(newBadges);
        newBadges = progressResult.badges;
        if (!newlyUnlocked && progressResult.newlyUnlocked) {
            newlyUnlocked = progressResult.newlyUnlocked;
        }
        
        // Check Polymath badge
        const polymathResult = checkPolymathBadge(
            newBadges, 
            difficultyCounts.easy, 
            difficultyCounts.hard, 
            difficultyCounts.impossible
        );
        newBadges = polymathResult.badges;
        if (!newlyUnlocked && polymathResult.newlyUnlocked) {
            newlyUnlocked = polymathResult.newlyUnlocked;
        }
        
        // Update player data
        const newPlayerData = {
            ...playerData,
            totalScore: accumulatedTotalScore,
            currentStreak: newStreak,
            totalSolved: newTotalSolvedCount,
            perfectScores: newPerfectCount,
            consecutivePerfects: newConsecutivePerfects,
            impossiblePerfects: newImpossiblePerfects,
            easySolved: difficultyCounts.easy,
            hardSolved: difficultyCounts.hard,
            impossibleSolved: difficultyCounts.impossible,
            badges: newBadges
        };
        
        setPlayerData(newPlayerData);
        await saveGameState(newPlayerData);
        
        if (newlyUnlocked) {
            setTimeout(() => setNewlyUnlockedBadge(newlyUnlocked), 2500);
        }
        
        setFinalNarrative(puzzle.narrative);
        setGameState('solved');
        setSolvedStatus('win');
        setAnimationClass('screen-shake-win');
    };

    const handleSubmit = async () => {
        if (!puzzle) return;
        
        const initialTries = TRIES_PER_DIFFICULTY[puzzle.difficulty] || DEFAULT_TRIES;
        const isCorrect = boardState.every((word, index) => word === puzzle.solution[index]);
        
        if (isCorrect) {
            const solveTimeSeconds = (Date.now() - puzzleStartTimeRef.current) / 1000;
            await handleWin(puzzle, solveTimeSeconds);
            return;
        }

        const newTriesLeft = triesLeft - 1;
        setTriesLeft(newTriesLeft);
        
        if (newTriesLeft <= 0) {
            const newBadges = playerData.badges.map(badge => {
                if (badge.id.startsWith('streak') || badge.id === 'perfectStreak3') {
                    return { ...badge, progress: 0 };
                }
                return badge;
            });
            const newPlayerData = {...playerData, currentStreak: 0, consecutivePerfects: 0, badges: newBadges};
            setPlayerData(newPlayerData);
            await saveGameState(newPlayerData);
            
            setBoardState(puzzle.solution);
            setFinalNarrative(puzzle.narrative);
            setGameState('solved');
            setSolvedStatus('loss');
            setAnimationClass('screen-shake-loss');
        } else {
            const currentLockedCount = lockedSlots.filter(Boolean).length;
            const newLockedSlots = boardState.map((word, index) => word === puzzle.solution[index] || lockedSlots[index]);
            const newTotalLockedCount = newLockedSlots.filter(Boolean).length;

            setLockedSlots(newLockedSlots);
            
            // Clear all user-locked tiles after submit validation
            // (correct ones are now system-locked, wrong ones go back to normal)
            setUserLockedSlots(Array(9).fill(false));

            const madeProgress = newTotalLockedCount > currentLockedCount;

            if (!madeProgress) {
                setAnimateGridShake(true);
            }
            
            // Check if the new locked pattern is frustrating and we should show the hint
            if (isFrustratingLockPattern(newLockedSlots) && shouldShowPowerUserHintCheck()) {
                setShouldShowPowerUserHint(true);
            }
            
            const newFeedback = getFeedbackMessage(newTotalLockedCount, newTriesLeft, madeProgress);
            setFeedback(newFeedback);
            setAnimateFeedback(true);
        }
    };

    const handleShowExplanation = () => {
        const newViews = (playerData.showLinkleViews || 0) + 1;
        const newBadges = playerData.badges.map(b => ({...b}));
        
        const curiousBadge = newBadges.find(b => b.id === 'curious');
        if (curiousBadge) {
            curiousBadge.progress = newViews;
            if (!curiousBadge.unlocked && curiousBadge.target && newViews >= curiousBadge.target) {
                curiousBadge.unlocked = true;
                curiousBadge.dateUnlocked = new Date().toISOString();
                setBadgePendingOnModalClose(curiousBadge);
            }
        }
        
        const newPlayerData = {
            ...playerData,
            showLinkleViews: newViews,
            badges: newBadges
        };

        setPlayerData(newPlayerData);
        saveGameState(newPlayerData); // Save this state immediately
        setShowExplanationModal(true);
    };

    const handleCloseExplanation = () => {
        setShowExplanationModal(false);
        if (badgePendingOnModalClose) {
            setNewlyUnlockedBadge(badgePendingOnModalClose);
            setBadgePendingOnModalClose(null);
        }
    };
    
    // Called when user starts dragging a tile - triggers power user hint if needed
    const handleDragStartForHint = useCallback(() => {
        if (shouldShowPowerUserHint) {
            setShowPowerUserHintModal(true);
            setShouldShowPowerUserHint(false); // Reset so we don't show again until next frustrating submit
        }
    }, [shouldShowPowerUserHint]);
    
    // Called when user closes the power user hint modal
    const handleClosePowerUserHint = useCallback(() => {
        setShowPowerUserHintModal(false);
        const newCount = hintViewCount + 1;
        setHintViewCount(newCount);
        localStorage.setItem('linkleHintViewCount', String(newCount));
    }, [hintViewCount]);
    
    // Called when user clicks "Don't show this again"
    const handleDismissPowerUserHintPermanently = useCallback(() => {
        setShowPowerUserHintModal(false);
        localStorage.setItem('linkleHasDismissedPowerUserHint', 'true');
    }, []);
    
    return {
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
    };
};