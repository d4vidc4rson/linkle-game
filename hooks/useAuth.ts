// @ts-nocheck
import { useState, useEffect, useCallback, useRef } from 'react';
import type { PlayerData, Badge } from '../types';
import { initialBadges, defaultPlayerData } from '../constants';

// Firebase services from window
declare const window: any;
const {
    auth, db, onAuthStateChanged, doc, getDoc, setDoc, signOut
} = window.firebase || {};

const upgradePlayerData = (savedData: Partial<PlayerData>): PlayerData => {
    const savedBadges = savedData.badges || [];
    
    const upgradedBadges = initialBadges.map(initialBadge => {
        const savedBadge = savedBadges.find(sb => sb.id === initialBadge.id);
        if (savedBadge) {
            // If we have a saved version, use its data but ensure all fields from the template are present
            return {
                ...initialBadge,
                unlocked: savedBadge.unlocked || false,
                dateUnlocked: savedBadge.dateUnlocked || null,
                progress: savedBadge.progress || (savedBadge.unlocked ? initialBadge.target : 0) || 0,
            };
        }
        // If the badge is new and not in saved data, use the initial template
        return { ...initialBadge, progress: 0 };
    });

    // Ensure all new PlayerData fields exist, using saved value or default
    return {
        ...defaultPlayerData, // Start with defaults for all fields
        ...savedData,         // Override with any saved data
        badges: upgradedBadges, // Use the carefully upgraded badges
    };
};

export const useAuth = () => {
    const [playerData, setPlayerData] = useState<PlayerData>(defaultPlayerData);
    const [user, setUser] = useState(undefined); // undefined: loading, null: logged out, User: logged in
    const [authLoading, setAuthLoading] = useState(true);
    const [dataReady, setDataReady] = useState(false); // True only after Firebase/localStorage data is loaded
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const lastUserUidRef = useRef<string | null | undefined>(undefined);

    const loadDataFromLocalStorage = useCallback((): PlayerData => {
        // --- LocalStorage Migration: player data ---
        try {
            const oldData = localStorage.getItem('chainReactionPlayerData');
            if (oldData) {
                localStorage.setItem('linklePlayerData', oldData);
                localStorage.removeItem('chainReactionPlayerData');
            }
        } catch (e) {
            console.error("Failed during player data migration", e);
        }
        // --- End Migration ---
        try {
            const savedData = localStorage.getItem('linklePlayerData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                return upgradePlayerData(parsedData);
            }
        } catch (e) {
            console.error("Failed to load game state from localStorage", e);
        }
        return defaultPlayerData;
    }, []);

    const saveGameState = useCallback(async (data: PlayerData): Promise<{ success: boolean; error?: string }> => {
        try {
            if (user) {
                // Create a clean copy to avoid saving Infinity to Firestore
                const dataToSave = { ...data };
                if (dataToSave.fastestEasySolve === Infinity) {
                    dataToSave.fastestEasySolve = null;
                }
                
                // "First Play Wins" logic: Merge per-puzzle, not per-day
                // This preserves local progress while respecting first play for each puzzle
                try {
                    const cloudDoc = await getDoc(doc(db, "users", user.uid));
                    if (cloudDoc.exists()) {
                        const cloudData = cloudDoc.data() as Partial<PlayerData>;
                        const cloudDailyResults = cloudData.dailyResults || {};
                        const localDailyResults = dataToSave.dailyResults || {};
                        
                        // Start with all local dates
                        const mergedDailyResults = { ...localDailyResults };
                        
                        // Merge each date from cloud, per-puzzle
                        for (const dateKey of Object.keys(cloudDailyResults)) {
                            const cloudDay = cloudDailyResults[dateKey] || {};
                            const localDay = mergedDailyResults[dateKey] || {};
                            
                            // Merge each puzzle type individually:
                            // - If cloud has a result, use cloud (first play wins)
                            // - If only local has a result, keep local (new progress)
                            mergedDailyResults[dateKey] = {
                                easy: cloudDay.easy || localDay.easy,
                                hard: cloudDay.hard || localDay.hard,
                                impossible: cloudDay.impossible || localDay.impossible,
                                bonus: cloudDay.bonus || localDay.bonus,
                            };
                        }
                        dataToSave.dailyResults = mergedDailyResults;
                    }
                } catch (fetchError) {
                    // If we can't fetch cloud data, proceed with save anyway
                    console.warn("Could not fetch cloud data for first-play-wins check:", fetchError);
                }
                
                await setDoc(doc(db, "users", user.uid), dataToSave, { merge: true });
            } else {
                localStorage.setItem('linklePlayerData', JSON.stringify(data));
            }
            return { success: true };
        } catch (error) {
            console.error("Failed to save game state:", error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to save progress';
            return { success: false, error: errorMessage };
        }
    }, [user]);

    useEffect(() => {
        if (!auth) {
            setUser(null);
            setAuthLoading(false);
            // For non-Firebase environments, load from localStorage and mark ready
            const localData = loadDataFromLocalStorage();
            setPlayerData(localData);
            setDataReady(true);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            const currentUid = currentUser ? currentUser.uid : null;
            if (currentUid === lastUserUidRef.current) {
                setUser(currentUser);
                setAuthLoading(false);
                return;
            }
            lastUserUidRef.current = currentUid;
            
            setAuthLoading(true);
            setDataReady(false); // Reset dataReady while fetching
            setUser(currentUser);

            try {
                if (currentUser) {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const localData = loadDataFromLocalStorage();
                    const userDoc = await getDoc(userDocRef);
                    let finalPlayerData: PlayerData;

                    if (userDoc.exists()) {
                        const remoteData = userDoc.data() as Partial<PlayerData>;
                        const saneRemoteData = upgradePlayerData(remoteData);
                        
                        const mergedBadges = initialBadges.map(ib => {
                            const localBadge = localData.badges.find(b => b.id === ib.id);
                            const remoteBadge = saneRemoteData.badges.find(b => b.id === ib.id);
                            
                            const unlocked = localBadge?.unlocked || remoteBadge?.unlocked || false;
                            const dateUnlocked = localBadge?.dateUnlocked || remoteBadge?.dateUnlocked || null;
                            
                            return {
                                ...ib,
                                unlocked,
                                dateUnlocked,
                                progress: Math.max(localBadge?.progress || 0, remoteBadge?.progress || 0),
                            };
                        });
                        
                        let fastestSolve = Math.min(localData.fastestEasySolve || Infinity, saneRemoteData.fastestEasySolve || Infinity);
                        if (fastestSolve === Infinity) {
                            fastestSolve = null;
                        }

                        // Merge dailyResults - "First Play Wins" logic (per-puzzle)
                        // For each puzzle type, prefer cloud if it has results, otherwise keep local
                        const mergedDailyResults = { ...(localData.dailyResults || {}) };
                        const cloudDailyResults = saneRemoteData.dailyResults || {};
                        
                        // Merge each date from cloud, per-puzzle
                        for (const dateKey of Object.keys(cloudDailyResults)) {
                            const cloudDay = cloudDailyResults[dateKey] || {};
                            const localDay = mergedDailyResults[dateKey] || {};
                            
                            // Merge each puzzle type individually:
                            // - If cloud has a result, use cloud (first play wins)
                            // - If only local has a result, keep local (new progress)
                            mergedDailyResults[dateKey] = {
                                easy: cloudDay.easy || localDay.easy,
                                hard: cloudDay.hard || localDay.hard,
                                impossible: cloudDay.impossible || localDay.impossible,
                                bonus: cloudDay.bonus || localDay.bonus,
                            };
                        }

                        finalPlayerData = {
                            ...defaultPlayerData,
                            totalScore: Math.max(localData.totalScore, saneRemoteData.totalScore),
                            currentStreak: Math.max(localData.currentStreak, saneRemoteData.currentStreak),
                            perfectScores: Math.max(localData.perfectScores, saneRemoteData.perfectScores),
                            totalSolved: Math.max(localData.totalSolved, saneRemoteData.totalSolved),
                            easySolved: Math.max(localData.easySolved || 0, saneRemoteData.easySolved || 0),
                            hardSolved: Math.max(localData.hardSolved || 0, saneRemoteData.hardSolved || 0),
                            impossibleSolved: Math.max(localData.impossibleSolved || 0, saneRemoteData.impossibleSolved || 0),
                            consecutiveDaysPlayed: Math.max(localData.consecutiveDaysPlayed || 0, saneRemoteData.consecutiveDaysPlayed || 0),
                            showLinkleViews: Math.max(localData.showLinkleViews || 0, saneRemoteData.showLinkleViews || 0),
                            lastPlayedDate: (localData.lastPlayedDate && remoteData.lastPlayedDate) ? (new Date(localData.lastPlayedDate) > new Date(remoteData.lastPlayedDate) ? localData.lastPlayedDate : remoteData.lastPlayedDate) : (localData.lastPlayedDate || remoteData.lastPlayedDate),
                            fastestEasySolve: fastestSolve,
                            impossiblePerfects: Math.max(localData.impossiblePerfects || 0, saneRemoteData.impossiblePerfects || 0),
                            consecutivePerfects: Math.max(localData.consecutivePerfects || 0, saneRemoteData.consecutivePerfects || 0),
                            playedPuzzleIndices: [...new Set([...(localData.playedPuzzleIndices || []), ...(saneRemoteData.playedPuzzleIndices || [])])],
                            badges: mergedBadges,
                            maxStreak: Math.max(localData.maxStreak || 0, saneRemoteData.maxStreak || 0),
                            dailyResults: mergedDailyResults,
                        };

                    } else {
                        finalPlayerData = localData;
                    }

                    await saveGameState(finalPlayerData);
                    localStorage.removeItem('linklePlayerData');
                    setPlayerData(finalPlayerData);
                } else {
                    // Logged out user - load from localStorage
                    const dataForPuzzle = loadDataFromLocalStorage();
                    setPlayerData(dataForPuzzle);
                }
            } catch (error) {
                console.error("Critical error during auth state change and data sync:", error);
                // Graceful fallback to prevent blank screen
                const localData = loadDataFromLocalStorage();
                setPlayerData(localData);
            } finally {
                // This guarantees the loading screen will always be dismissed.
                setAuthLoading(false);
                setDataReady(true); // Data is now ready (either from cloud or fallback)
            }
        });

        return () => unsubscribe();
    }, [loadDataFromLocalStorage, saveGameState]);

    const handleLogout = async () => {
        setPlayerData(defaultPlayerData);
        localStorage.removeItem('linklePlayerData');
        await signOut(auth);
    };

    return {
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
    };
};