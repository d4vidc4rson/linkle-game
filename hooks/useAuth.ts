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

    // Clean up dailyResults to remove any undefined values (Firestore corruption fix)
    const cleanedDailyResults: Record<string, any> = {};
    if (savedData.dailyResults) {
        for (const dateKey of Object.keys(savedData.dailyResults)) {
            const dayData = savedData.dailyResults[dateKey];
            if (dayData) {
                const cleanedDay: Record<string, any> = {};
                if (dayData.easy) cleanedDay.easy = dayData.easy;
                if (dayData.hard) cleanedDay.hard = dayData.hard;
                if (dayData.impossible) cleanedDay.impossible = dayData.impossible;
                if (dayData.bonus) cleanedDay.bonus = dayData.bonus;
                // Only include the day if it has at least one puzzle result
                if (Object.keys(cleanedDay).length > 0) {
                    cleanedDailyResults[dateKey] = cleanedDay;
                }
            }
        }
    }

    // Ensure all new PlayerData fields exist, using saved value or default
    return {
        ...defaultPlayerData, // Start with defaults for all fields
        ...savedData,         // Override with any saved data
        dailyResults: cleanedDailyResults, // Use cleaned daily results
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
                let existingCreatedAt: string | null = null;
                try {
                    const cloudDoc = await getDoc(doc(db, "users", user.uid));
                    if (cloudDoc.exists()) {
                        const cloudData = cloudDoc.data() as any;
                        existingCreatedAt = cloudData.createdAt || null;
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
                            // IMPORTANT: Only include fields that have actual values (Firestore rejects undefined)
                            const mergedDay: Record<string, any> = {};
                            if (cloudDay.easy || localDay.easy) mergedDay.easy = cloudDay.easy || localDay.easy;
                            if (cloudDay.hard || localDay.hard) mergedDay.hard = cloudDay.hard || localDay.hard;
                            if (cloudDay.impossible || localDay.impossible) mergedDay.impossible = cloudDay.impossible || localDay.impossible;
                            if (cloudDay.bonus || localDay.bonus) mergedDay.bonus = cloudDay.bonus || localDay.bonus;
                            
                            mergedDailyResults[dateKey] = mergedDay;
                        }
                        dataToSave.dailyResults = mergedDailyResults;
                    }
                } catch (fetchError) {
                    // If we can't fetch cloud data, proceed with save anyway
                    console.warn("Could not fetch cloud data for first-play-wins check:", fetchError);
                }
                
                // Include user profile info for admin dashboard visibility
                // DEBUG: Log user info to diagnose email not being saved
                console.log('[saveGameState] User object:', {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified,
                });
                
                if (user.email) {
                    (dataToSave as any).email = user.email;
                    console.log('[saveGameState] Email will be saved:', user.email);
                } else {
                    console.warn('[saveGameState] WARNING: user.email is falsy!', user.email);
                }
                if (user.displayName) {
                    (dataToSave as any).displayName = user.displayName;
                }
                
                // Add createdAt timestamp for new users (only if not already set)
                if (!existingCreatedAt) {
                    (dataToSave as any).createdAt = new Date().toISOString();
                }
                
                // Always update the updatedAt timestamp
                (dataToSave as any).updatedAt = new Date().toISOString();
                
                // DEBUG: Log what we're about to save
                console.log('[saveGameState] Saving to Firestore:', {
                    uid: user.uid,
                    hasEmail: !!(dataToSave as any).email,
                    email: (dataToSave as any).email,
                    hasDisplayName: !!(dataToSave as any).displayName,
                    updatedAt: (dataToSave as any).updatedAt,
                });
                
                await setDoc(doc(db, "users", user.uid), dataToSave, { merge: true });
                console.log('[saveGameState] Save successful for user:', user.uid);
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
            const isReturningUser = currentUid === lastUserUidRef.current;
            
            // Always update user state
            setUser(currentUser);
            
            // For returning users (same UID), still sync profile but skip full data merge
            if (isReturningUser) {
                // Sync profile info for returning users who already have their data loaded
                if (currentUser?.email) {
                    try {
                        await setDoc(doc(db, "users", currentUser.uid), { 
                            email: currentUser.email,
                            displayName: currentUser.displayName || null,
                            updatedAt: new Date().toISOString()
                        }, { merge: true });
                        console.log('[Auth] Profile synced for returning user:', currentUser.email);
                    } catch (err) {
                        console.warn('[Auth] Failed to sync profile for returning user:', err);
                    }
                }
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
                            // IMPORTANT: Only include fields that have actual values (Firestore rejects undefined)
                            const mergedDay: Record<string, any> = {};
                            if (cloudDay.easy || localDay.easy) mergedDay.easy = cloudDay.easy || localDay.easy;
                            if (cloudDay.hard || localDay.hard) mergedDay.hard = cloudDay.hard || localDay.hard;
                            if (cloudDay.impossible || localDay.impossible) mergedDay.impossible = cloudDay.impossible || localDay.impossible;
                            if (cloudDay.bonus || localDay.bonus) mergedDay.bonus = cloudDay.bonus || localDay.bonus;
                            
                            mergedDailyResults[dateKey] = mergedDay;
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
                        // New user - create their document with profile info
                        finalPlayerData = localData;
                    }

                    await saveGameState(finalPlayerData);
                    
                    // Always update profile info on login using currentUser directly
                    // This ensures email/displayName are saved even for existing users who logged in before this feature
                    try {
                        const profileUpdate: Record<string, any> = {};
                        if (currentUser.email) profileUpdate.email = currentUser.email;
                        if (currentUser.displayName) profileUpdate.displayName = currentUser.displayName;
                        if (Object.keys(profileUpdate).length > 0) {
                            await setDoc(doc(db, "users", currentUser.uid), profileUpdate, { merge: true });
                        }
                    } catch (profileError) {
                        console.warn("Could not update user profile info:", profileError);
                    }
                    
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