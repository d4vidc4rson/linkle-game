// @ts-nocheck
import { useState, useRef, useCallback, useEffect } from 'react';
import { PREGENERATED_PUZZLES, Puzzle } from '../puzzles';
import type { GameState, SolvedStatus, PlayerData, Badge, Theme, DailyResult } from '../types';
import { TRIES_PER_DIFFICULTY, DEFAULT_TRIES } from '../constants';
import { formatDateKey } from '../dailySchedule';
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

/**
 * Detects if a locked slot pattern is "frustrating" for the user.
 * Frustrating patterns occur when:
 * 1. Middle column tiles (indices 1, 4, or 7) are locked - causes tiles before/after to shift a lot
 * 2. Non-contiguous locks exist (gaps in the lock pattern) - creates "islands"
 */
const isFrustratingLockPattern = (lockedSlots: boolean[]): boolean => {
    const lockedIndices = lockedSlots
        .map((locked, index) => locked ? index : -1)
        .filter(index => index !== -1);
    
    if (lockedIndices.length === 0 || lockedIndices.length === 9) {
        return false;
    }
    
    const middleColumnIndices = [1, 4, 7];
    const hasMiddleColumnLock = lockedIndices.some(idx => middleColumnIndices.includes(idx));
    
    if (hasMiddleColumnLock) {
        return true;
    }
    
    if (lockedIndices.length >= 2) {
        const sortedIndices = [...lockedIndices].sort((a, b) => a - b);
        for (let i = 0; i < sortedIndices.length - 1; i++) {
            const gap = sortedIndices[i + 1] - sortedIndices[i];
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
    
    if (viewCount >= 5 && !hasUsedFeature) return false;
    if (viewCount > 0 && hasUsedFeature) return false;
    
    return true;
};

/**
 * Gets the current view count for the power user hint modal.
 */
const getHintViewCount = (): number => {
    return parseInt(localStorage.getItem('linkleHintViewCount') || '0', 10);
};

export type DailyPuzzleDifficulty = 'easy' | 'hard' | 'impossible';

export const useDailyGameLogic = (
    playerData: PlayerData,
    setPlayerData: (data: PlayerData) => void,
    saveGameState: (data: PlayerData) => Promise<{ success: boolean; error?: string }>,
    theme: Theme,
    onSaveError?: (error: string) => void,
    targetDate: Date,
    currentPuzzleType: DailyPuzzleDifficulty,
    puzzleIndices: { easy: number; hard: number; impossible: number } | null,
    onPuzzleComplete: (result: DailyResult, puzzleType: DailyPuzzleDifficulty, moveCount: number) => void,
    onAllPuzzlesComplete: () => void
) => {
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
    const [moveCount, setMoveCount] = useState(0); // Track tile reorders for analytics
    
    // Power user hint modal state
    const [shouldShowPowerUserHint, setShouldShowPowerUserHint] = useState(false);
    const [showPowerUserHintModal, setShowPowerUserHintModal] = useState(false);
    const [hintViewCount, setHintViewCount] = useState(getHintViewCount);

    const puzzleStartTimeRef = useRef<number | null>(null);
    const loadedPuzzleRef = useRef<string | null>(null); // Track which puzzle we've loaded to prevent reloads
    const navigatingToNextPuzzleRef = useRef<boolean>(false); // Track if we're actively navigating to next puzzle
    const isSolvedRef = useRef<boolean>(false); // Track if we're currently in solved state to prevent reloads
    const gameStateRef = useRef<GameState>(gameState); // Track current gameState in a ref for reliable checking
    const puzzleLoadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Track puzzle load timeout to cancel duplicates

    const winAnimationPropertiesRef = useRef<Array<any>>([]);
    const lossAnimationPropertiesRef = useRef<Array<any>>([]);

    useEffect(() => {
        if (gameState === 'playing') {
            setFeedback('Drag and drop into the best order.');
        }
    }, [gameState, puzzle]);

    useEffect(() => {
        if (animateFeedback) {
            const timer = setTimeout(() => setAnimateFeedback(false), 300);
            return () => clearTimeout(timer);
        }
    }, [animateFeedback]);
    
    useEffect(() => {
        if (animateGridShake) {
            const timer = setTimeout(() => setAnimateGridShake(false), 500);
            return () => clearTimeout(timer);
        }
    }, [animateGridShake]);

    // Update gameStateRef whenever gameState changes
    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    // Detect logout: when dailyResults for today becomes empty/undefined, clear refs to allow fresh puzzle load
    // This fixes the bug where logging out while on a solved puzzle keeps showing it as solved
    useEffect(() => {
        const dateKey = formatDateKey(targetDate);
        const dayResults = playerData.dailyResults?.[dateKey];
        
        // If today's results are empty or undefined, and we have a loaded puzzle ref,
        // this likely means the user logged out - clear the refs to allow fresh load
        if ((!dayResults || Object.keys(dayResults).length === 0) && loadedPuzzleRef.current) {
            loadedPuzzleRef.current = null;
            isSolvedRef.current = false;
            gameStateRef.current = 'loading';
            setGameState('loading');
        }
    }, [playerData.dailyResults, targetDate]);

    // Load puzzle when puzzleIndices or currentPuzzleType changes
    useEffect(() => {
        if (!puzzleIndices) {
            gameStateRef.current = 'loading';
            setGameState('loading');
            return;
        }

        const puzzleIndex = puzzleIndices[currentPuzzleType];
        if (puzzleIndex === undefined || puzzleIndex >= PREGENERATED_PUZZLES.length) {
            gameStateRef.current = 'loading';
            setGameState('loading');
            return;
        }

        const newPuzzle = PREGENERATED_PUZZLES[puzzleIndex];
        if (!newPuzzle) {
            gameStateRef.current = 'loading';
            setGameState('loading');
            return;
        }

        // Create a unique key for this puzzle (do this early for comparison)
        const dateKey = formatDateKey(targetDate);
        const puzzleKey = `${dateKey}-${currentPuzzleType}-${puzzleIndex}`;
        
        // CRITICAL FIRST CHECK: If we're currently solved for this exact puzzle, don't reload AT ALL
        // This prevents the reload that happens when playerData.dailyResults updates after completion
        // Check the ref first (most reliable) and also check if we have the puzzle loaded
        // Also check gameStateRef to catch cases where state hasn't updated yet
        if ((isSolvedRef.current || gameStateRef.current === 'solved') && loadedPuzzleRef.current === puzzleKey && puzzle) {
            // We're showing a solved puzzle - don't reload even if playerData changes
            return;
        }

        // Check if puzzle already completed
        // For replay mode: check if this is a past date (not today) - if so, ignore existing results and allow replay
        const today = new Date();
        const todayKey = formatDateKey(today);
        const isPastDate = dateKey !== todayKey;
        
        const dailyResults = playerData.dailyResults || {};
        const dayResults = dailyResults[dateKey];
        // Only use existing result if it's today's puzzle (not for replay) and we're not actively navigating to next puzzle
        const existingResult = (isPastDate || navigatingToNextPuzzleRef.current) 
            ? null 
            : dayResults?.[currentPuzzleType];
        
        // If we're navigating to next puzzle, clear the loaded puzzle ref to ensure fresh load
        if (navigatingToNextPuzzleRef.current) {
            loadedPuzzleRef.current = null;
            isSolvedRef.current = false; // Clear solved flag when navigating
        }
        
        // Reset navigation flag after checking
        navigatingToNextPuzzleRef.current = false;
        
        // Note: existingResult is only used for today's puzzles (not replays) and when not actively navigating

        // Additional safety check: if existingResult exists and we're marked as solved, don't reload
        if (existingResult && isSolvedRef.current && loadedPuzzleRef.current === puzzleKey) {
            return; // Don't reload - we're showing the solved state for this puzzle
        }
        
        // Don't reload if we've already loaded this exact puzzle and it's still the same
        if (loadedPuzzleRef.current === puzzleKey && puzzle) {
            // If we're already solved for this puzzle, don't reload
            if (isSolvedRef.current) {
                return;
            }
            // Otherwise, only skip if we're not in a state transition
            if (gameState !== 'generating' && gameState !== 'loading') {
                return;
            }
        }

        loadedPuzzleRef.current = puzzleKey;
        
        // Clear animation class before loading new puzzle (but preserve solvedStatus until new boardState is set)
        if (!existingResult) {
            // DON'T clear solvedStatus here - keep tiles "revealed" until new boardState is set
            // This prevents flash of un-styled old tiles during transition
            setAnimationClass('');
            isSolvedRef.current = false; // Clear solved flag when starting new puzzle
        }
        
        gameStateRef.current = 'generating';
        setGameState('generating');
        
        // Cancel any previous puzzle load timeout to prevent duplicate/stale callbacks (fixes React StrictMode double-render issue)
        if (puzzleLoadTimeoutRef.current) {
            clearTimeout(puzzleLoadTimeoutRef.current);
        }
        
        puzzleLoadTimeoutRef.current = setTimeout(() => {
            const initialTries = TRIES_PER_DIFFICULTY[newPuzzle.difficulty] || DEFAULT_TRIES;
            
            let winCombos, lossCombos;
            if (theme === 'dark') {
                winCombos = [{ bgColor: '#eddec9', textColor: '#331922' }, { bgColor: '#f7f2ec', textColor: '#331922' }];
                lossCombos = [{ bgColor: '#c7a992', textColor: '#220f17' }, { bgColor: '#220f17', textColor: '#c7a992' }];
            } else {
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
            setTriesLeft(existingResult ? existingResult.triesUsed : initialTries);
            setMoveCount(0); // Reset move count for new puzzle
            setFeedback('');
            // Don't clear finalNarrative, winMessageBase, winMessageBonus, or solvedStatus if we're reloading an already-solved puzzle
            if (!existingResult) {
                setFinalNarrative('');
                setSolvedStatus(null);
                setWinMessageBase('');
                setWinMessageBonus('');
            } else {
                // Keep the solved status and messages for already-completed puzzles
                setSolvedStatus(existingResult.solved ? 'win' : 'loss');
                if (existingResult.solved) {
                    setFinalNarrative(newPuzzle.narrative);
                    // Set win messages for completed puzzles
                    const { baseScore } = calculateScore(newPuzzle.difficulty, existingResult.triesUsed, 0);
                    setWinMessageBase(getWinMessage(newPuzzle.difficulty, existingResult.triesUsed, baseScore));
                    setWinMessageBonus('');
                } else {
                    // For losses, still set the narrative so it can be shown in the modal
                    setFinalNarrative(newPuzzle.narrative);
                }
            }
            // Don't clear animation if we're already in solved state (preserves win/loss animation)
            if (gameState !== 'solved') {
                setAnimationClass('');
            }
            setNewlyUnlockedBadge(null);
            
            if (existingResult) {
                gameStateRef.current = 'solved';
                setGameState('solved');
                isSolvedRef.current = true; // Mark as solved for already-completed puzzles
            } else {
                isSolvedRef.current = false; // Clear solved flag when starting new puzzle
                setTimeout(() => {
                    gameStateRef.current = 'playing';
                    setGameState('playing');
                }, 0);
            }
        }, 500);
        
        // Cleanup: cancel timeout if effect re-runs or component unmounts
        return () => {
            if (puzzleLoadTimeoutRef.current) {
                clearTimeout(puzzleLoadTimeoutRef.current);
                puzzleLoadTimeoutRef.current = null;
            }
        };
    }, [puzzleIndices, currentPuzzleType, targetDate, playerData.dailyResults]); // Removed theme from dependencies to prevent reload on theme change

    // Handle reorder from SortableGameBoard (called when tiles are dragged and dropped)
    const handleReorder = useCallback((newBoardState: string[]) => {
        setBoardState(newBoardState);
        setMoveCount(prev => prev + 1);
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
        
        // Check if this is a replay (already has results for this puzzle type)
        const dateKey = formatDateKey(targetDate);
        const dailyResults = { ...(playerData.dailyResults || {}) };
        
        // Check if this is the first puzzle of TODAY (for day streak tracking)
        const today = new Date();
        const todayKey = formatDateKey(today);
        const isToday = dateKey === todayKey;
        const hadResultsForToday = dailyResults[todayKey] && Object.keys(dailyResults[todayKey]).length > 0;
        const isFirstPuzzleOfDay = isToday && !hadResultsForToday;
        
        if (!dailyResults[dateKey]) {
            dailyResults[dateKey] = {};
        }
        
        // Check if this puzzle was already completed (replay)
        const existingResult = dailyResults[dateKey][currentPuzzleType];
        const isReplay = existingResult !== undefined;
        
        if (isReplay) {
            // Replay mode: don't save results, no scoring, no badges, custom message
            // Keep original results intact for share grids
            setWinMessageBase("You did it! Good replay");
            setWinMessageBonus('');
            setFinalNarrative(puzzle.narrative);
            gameStateRef.current = 'solved';
            setGameState('solved');
            setSolvedStatus('win');
            isSolvedRef.current = true; // Mark as solved to prevent reloads
            if (gameState !== 'solved') {
                setAnimationClass('screen-shake-win');
            }
            return;
        }
        
        // First-time play: save results normally
        const dailyResult: DailyResult = {
            solved: true,
            triesUsed: initialTries - triesLeft + 1, // Calculate actual tries used (current try counts as used)
            timeSeconds: solveTimeSeconds,
        };
        
        dailyResults[dateKey][currentPuzzleType] = dailyResult;
        onPuzzleComplete(dailyResult, currentPuzzleType, moveCount);
        
        // Regular mode: update stats and badges
        const newStreak = playerData.currentStreak + 1;
        const newMaxStreak = Math.max(newStreak, playerData.maxStreak || 0);
        
        // Day streak: only increment on first puzzle of today
        const currentDayStreak = playerData.dayStreak || 0;
        const newDayStreak = isFirstPuzzleOfDay ? currentDayStreak + 1 : currentDayStreak;
        const newMaxDayStreak = Math.max(newDayStreak, newMaxStreak); // Use same maxStreak field for simplicity
        
        // Also update consecutiveDaysPlayed for badge tracking
        const currentConsecutiveDays = playerData.consecutiveDaysPlayed || 0;
        const newConsecutiveDaysPlayed = isFirstPuzzleOfDay ? currentConsecutiveDays + 1 : currentConsecutiveDays;
        const newTotalSolvedCount = playerData.totalSolved + 1;
        const newPerfectCount = playerData.perfectScores + (isPerfect ? 1 : 0);
        const newConsecutivePerfects = isPerfect ? (playerData.consecutivePerfects || 0) + 1 : 0;
        const newImpossiblePerfects = (isPerfect && puzzle.difficulty === 'IMPOSSIBLE') 
            ? (playerData.impossiblePerfects || 0) + 1 
            : (playerData.impossiblePerfects || 0);
        
        const difficultyCounts = {
            easy: puzzle.difficulty === 'EASY' ? (playerData.easySolved || 0) + 1 : (playerData.easySolved || 0),
            hard: puzzle.difficulty === 'HARD' ? (playerData.hardSolved || 0) + 1 : (playerData.hardSolved || 0),
            impossible: puzzle.difficulty === 'IMPOSSIBLE' ? (playerData.impossibleSolved || 0) + 1 : (playerData.impossibleSolved || 0),
        };
        
        const { baseScore, streakBonus, total: puzzleScore } = calculateScore(
            puzzle.difficulty, 
            triesLeft, 
            playerData.currentStreak
        );
        
        // Add puzzle score to existing total score
        const newTotalScore = (playerData.totalScore || 0) + puzzleScore;
        
        setWinMessageBase(getWinMessage(puzzle.difficulty, triesLeft, baseScore));
        setWinMessageBonus(streakBonus > 0 ? `🔥 Streak bonus: +${streakBonus} points` : '');
        
        // Update badges
        let newBadges = updateBadgeProgress(playerData.badges, {
            streak: newStreak,
            perfectCount: newPerfectCount,
            totalSolved: newTotalSolvedCount,
            hardSolved: difficultyCounts.hard,
            impossibleSolved: difficultyCounts.impossible,
            consecutiveDays: newConsecutiveDaysPlayed,
            impossiblePerfects: newImpossiblePerfects,
            consecutivePerfects: newConsecutivePerfects,
            totalScore: newTotalScore,
        });
        
        const singleEventResult = checkSingleEventBadges(newBadges, puzzle, triesLeft, solveTimeSeconds);
        newBadges = singleEventResult.badges;
        let newlyUnlocked = singleEventResult.newlyUnlocked;
        
        const progressResult = checkProgressBadges(newBadges);
        newBadges = progressResult.badges;
        if (!newlyUnlocked && progressResult.newlyUnlocked) {
            newlyUnlocked = progressResult.newlyUnlocked;
        }
        
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
        
        const newPlayerData = {
            ...playerData,
            totalScore: newTotalScore,
            currentStreak: newStreak,
            maxStreak: newMaxDayStreak, // Track max of day streaks
            dayStreak: newDayStreak,
            consecutiveDaysPlayed: newConsecutiveDaysPlayed,
            totalSolved: newTotalSolvedCount,
            perfectScores: newPerfectCount,
            consecutivePerfects: newConsecutivePerfects,
            impossiblePerfects: newImpossiblePerfects,
            easySolved: difficultyCounts.easy,
            hardSolved: difficultyCounts.hard,
            impossibleSolved: difficultyCounts.impossible,
            badges: newBadges,
            dailyResults,
            lastPlayedDate: new Date().toISOString(),
        };
        
        // Set solved flag BEFORE updating playerData to prevent reload when useEffect runs
        isSolvedRef.current = true;
        gameStateRef.current = 'solved';
        setFinalNarrative(puzzle.narrative);
        setGameState('solved');
        setSolvedStatus('win');
        
        setPlayerData(newPlayerData);
        const saveResult = await saveGameState(newPlayerData);
        if (!saveResult.success && onSaveError) {
            onSaveError(saveResult.error || 'Failed to save progress');
        }
        
        if (newlyUnlocked) {
            setTimeout(() => setNewlyUnlockedBadge(newlyUnlocked), 2500);
        }
        // Only set animation if we're not already in solved state (prevents restart)
        if (gameState !== 'solved') {
            setAnimationClass('screen-shake-win');
        }
        
        // Don't auto-transition - let user click "SHOW STATS" button instead
        // The DailyPuzzleSolved component will handle the transition when user clicks
    };

    const handleSubmit = async () => {
        if (!puzzle) return;
        
        const initialTries = TRIES_PER_DIFFICULTY[puzzle.difficulty] || DEFAULT_TRIES;
        const isCorrect = boardState.every((word, index) => word === puzzle.solution[index]);
        
        if (isCorrect) {
            const solveTimeSeconds = (Date.now() - (puzzleStartTimeRef.current || Date.now())) / 1000;
            await handleWin(puzzle, solveTimeSeconds);
            return;
        }

        const newTriesLeft = triesLeft - 1;
        setTriesLeft(newTriesLeft);
        
        if (newTriesLeft <= 0) {
            // Check if this is a replay (already has results for this puzzle type)
            const dateKey = formatDateKey(targetDate);
            const dailyResults = { ...(playerData.dailyResults || {}) };
            
            // Check if this is the first puzzle of TODAY (for day streak tracking)
            const today = new Date();
            const todayKey = formatDateKey(today);
            const isToday = dateKey === todayKey;
            const hadResultsForToday = dailyResults[todayKey] && Object.keys(dailyResults[todayKey]).length > 0;
            const isFirstPuzzleOfDay = isToday && !hadResultsForToday;
            
            if (!dailyResults[dateKey]) {
                dailyResults[dateKey] = {};
            }
            
            // Check if this puzzle was already completed (replay)
            const existingResult = dailyResults[dateKey][currentPuzzleType];
            const isReplay = existingResult !== undefined;
            
            if (isReplay) {
                // Replay mode: don't save results, no scoring, no badges, custom message
                // Keep original results intact for share grids
                setWinMessageBase("You still Stinkle at Linkle. I kid. I kid.");
                setWinMessageBonus('');
                setBoardState(puzzle.solution);
                setFinalNarrative(puzzle.narrative);
                gameStateRef.current = 'solved';
                setGameState('solved');
                setSolvedStatus('loss');
                isSolvedRef.current = true; // Mark as solved to prevent reloads
                if (gameState !== 'solved') {
                    setAnimationClass('screen-shake-loss');
                }
                return;
            }
            
            // First-time play: save results normally
            // Store board state to show which positions were correct in share grid
            const dailyResult: DailyResult = {
                solved: false,
                triesUsed: initialTries,
                boardState: boardState, // Store final board state for share grid
            };
            
            dailyResults[dateKey][currentPuzzleType] = dailyResult;
            onPuzzleComplete(dailyResult, currentPuzzleType, moveCount);
            
            // Day streak: increment on first puzzle of today (even on loss - they still played!)
            const currentDayStreak = playerData.dayStreak || 0;
            const newDayStreak = isFirstPuzzleOfDay ? currentDayStreak + 1 : currentDayStreak;
            const newMaxStreak = Math.max(newDayStreak, playerData.maxStreak || 0);
            
            // Also update consecutiveDaysPlayed for badge tracking (even on loss - they still played!)
            const currentConsecutiveDays = playerData.consecutiveDaysPlayed || 0;
            const newConsecutiveDaysPlayed = isFirstPuzzleOfDay ? currentConsecutiveDays + 1 : currentConsecutiveDays;
            
            // Regular mode: update badges (reset puzzle streak, but keep day streak)
            // First update the daily7 badge progress with the new consecutive days count
            let newBadges = updateBadgeProgress(playerData.badges, {
                streak: 0, // Reset streak on loss
                perfectCount: playerData.perfectScores,
                totalSolved: playerData.totalSolved,
                hardSolved: playerData.hardSolved,
                impossibleSolved: playerData.impossibleSolved,
                consecutiveDays: newConsecutiveDaysPlayed,
                impossiblePerfects: playerData.impossiblePerfects,
                consecutivePerfects: 0, // Reset on loss
                totalScore: playerData.totalScore || 0, // Keep existing score (no points on loss)
            });
            
            // Reset streak-related badges
            newBadges = newBadges.map(badge => {
                if (badge.id.startsWith('streak') || badge.id === 'perfectStreak3') {
                    return { ...badge, progress: 0 };
                }
                return badge;
            });
            
            // Check if daily7 badge should be unlocked
            const progressResult = checkProgressBadges(newBadges);
            newBadges = progressResult.badges;
            
            const newPlayerData = {
                ...playerData,
                currentStreak: 0, // Reset puzzle win streak
                dayStreak: newDayStreak, // Keep day streak (they played today!)
                consecutiveDaysPlayed: newConsecutiveDaysPlayed, // Update for badge tracking
                maxStreak: newMaxStreak,
                consecutivePerfects: 0,
                badges: newBadges,
                dailyResults,
                lastPlayedDate: new Date().toISOString(),
            };
            
            // Set solved flag BEFORE updating playerData to prevent reload when useEffect runs
            isSolvedRef.current = true;
            gameStateRef.current = 'solved';
            setBoardState(puzzle.solution);
            setFinalNarrative(puzzle.narrative);
            setGameState('solved');
            setSolvedStatus('loss');
            
            setPlayerData(newPlayerData);
            const saveResult = await saveGameState(newPlayerData);
            if (!saveResult.success && onSaveError) {
                onSaveError(saveResult.error || 'Failed to save progress');
            }
            // Only set animation if we're not already in solved state (prevents restart)
            if (gameState !== 'solved') {
                setAnimationClass('screen-shake-loss');
            }
            
            // Don't auto-transition - let user click "SHOW STATS" button instead
            // The DailyPuzzleSolved component will handle the transition when user clicks
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
        saveGameState(newPlayerData).then(result => {
            if (!result.success && onSaveError) {
                onSaveError(result.error || 'Failed to save progress');
            }
        });
        setShowExplanationModal(true);
    };

    const handleCloseExplanation = () => {
        setShowExplanationModal(false);
        if (badgePendingOnModalClose) {
            setNewlyUnlockedBadge(badgePendingOnModalClose);
            setBadgePendingOnModalClose(null);
        }
    };
    
    const setNavigatingToNextPuzzle = useCallback(() => {
        navigatingToNextPuzzleRef.current = true;
    }, []);

    const resetBoardForNewSession = useCallback(() => {
        gameStateRef.current = 'loading';
        setGameState('loading');
        loadedPuzzleRef.current = null;
        isSolvedRef.current = false;
        setBoardState([]);
        setLockedSlots(Array(9).fill(false));
        setUserLockedSlots(Array(9).fill(false));
        setSolvedStatus(null);
        setAnimationClass('');
        setFeedback('');
        setFinalNarrative('');
        setWinMessageBase('');
        setWinMessageBonus('');
        setNewlyUnlockedBadge(null);
    }, []);
    
    // Called when user starts dragging a tile - triggers power user hint if needed
    const handleDragStartForHint = useCallback(() => {
        if (shouldShowPowerUserHint) {
            setShowPowerUserHintModal(true);
            setShouldShowPowerUserHint(false);
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
    };
};

