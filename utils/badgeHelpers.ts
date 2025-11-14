// @ts-nocheck
import type { Badge, PlayerData, Puzzle } from '../types';

/**
 * Updates badge progress based on game stats
 */
export const updateBadgeProgress = (
    badges: Badge[],
    stats: {
        streak: number;
        perfectCount: number;
        totalSolved: number;
        hardSolved: number;
        impossibleSolved: number;
        consecutiveDays: number;
        impossiblePerfects: number;
        consecutivePerfects: number;
    }
): Badge[] => {
    return badges.map(badge => {
        const updated = { ...badge };
        
        if (badge.id.startsWith('streak')) {
            updated.progress = stats.streak;
        } else if (badge.id.startsWith('perfect') && !badge.id.startsWith('perfectStreak')) {
            updated.progress = stats.perfectCount;
        } else if (badge.id.startsWith('solve')) {
            updated.progress = stats.totalSolved;
        } else if (badge.id === 'hard10') {
            updated.progress = stats.hardSolved;
        } else if (badge.id === 'impossible5') {
            updated.progress = stats.impossibleSolved;
        } else if (badge.id === 'daily7') {
            updated.progress = stats.consecutiveDays;
        } else if (badge.id === 'impossiblePerfect') {
            updated.progress = stats.impossiblePerfects;
        } else if (badge.id === 'perfectStreak3') {
            updated.progress = stats.consecutivePerfects;
        }
        
        return updated;
    });
};

/**
 * Unlocks a badge if it's not already unlocked
 */
export const unlockBadge = (badges: Badge[], badgeId: string): { badges: Badge[]; newlyUnlocked: Badge | null } => {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge || badge.unlocked) {
        return { badges, newlyUnlocked: null };
    }
    
    const updated = badges.map(b => 
        b.id === badgeId 
            ? { ...b, unlocked: true, dateUnlocked: new Date().toISOString(), progress: b.target }
            : b
    );
    
    return { badges: updated, newlyUnlocked: badge };
};

/**
 * Checks and unlocks single-event badges
 */
export const checkSingleEventBadges = (
    badges: Badge[],
    puzzle: Puzzle,
    triesLeft: number,
    solveTimeSeconds: number
): { badges: Badge[]; newlyUnlocked: Badge | null } => {
    let updatedBadges = [...badges];
    let newlyUnlocked: Badge | null = null;
    
    // Hard puzzle badge
    if (puzzle.difficulty === 'HARD') {
        const result = unlockBadge(updatedBadges, 'hard1');
        updatedBadges = result.badges;
        if (result.newlyUnlocked && !newlyUnlocked) {
            newlyUnlocked = result.newlyUnlocked;
        }
    }
    
    // Impossible puzzle badge
    if (puzzle.difficulty === 'IMPOSSIBLE') {
        const result = unlockBadge(updatedBadges, 'impossible1');
        updatedBadges = result.badges;
        if (result.newlyUnlocked && !newlyUnlocked) {
            newlyUnlocked = result.newlyUnlocked;
        }
    }
    
    // Clutch badge (last try)
    if (triesLeft === 1) {
        const result = unlockBadge(updatedBadges, 'clutch');
        updatedBadges = result.badges;
        if (result.newlyUnlocked && !newlyUnlocked) {
            newlyUnlocked = result.newlyUnlocked;
        }
    }
    
    // Fast badge (easy puzzle in under 30 seconds)
    if (puzzle.difficulty === 'EASY' && solveTimeSeconds < 30) {
        const result = unlockBadge(updatedBadges, 'fast');
        updatedBadges = result.badges;
        if (result.newlyUnlocked && !newlyUnlocked) {
            newlyUnlocked = result.newlyUnlocked;
        }
    }
    
    return { badges: updatedBadges, newlyUnlocked };
};

/**
 * Checks progress-based badges and unlocks them if target is reached
 */
export const checkProgressBadges = (badges: Badge[]): { badges: Badge[]; newlyUnlocked: Badge | null } => {
    let updatedBadges = [...badges];
    let newlyUnlocked: Badge | null = null;
    
    updatedBadges.forEach(badge => {
        if (!badge.unlocked && badge.target && badge.progress >= badge.target) {
            const result = unlockBadge(updatedBadges, badge.id);
            updatedBadges = result.badges;
            if (result.newlyUnlocked && !newlyUnlocked) {
                newlyUnlocked = result.newlyUnlocked;
            }
        }
    });
    
    return { badges: updatedBadges, newlyUnlocked };
};

/**
 * Checks for Polymath badge (solved all difficulty levels)
 */
export const checkPolymathBadge = (
    badges: Badge[],
    easySolved: number,
    hardSolved: number,
    impossibleSolved: number
): { badges: Badge[]; newlyUnlocked: Badge | null } => {
    if (easySolved > 0 && hardSolved > 0 && impossibleSolved > 0) {
        const polymath = badges.find(b => b.id === 'polymath');
        if (polymath) {
            const updated = badges.map(b => 
                b.id === 'polymath' ? { ...b, progress: 3 } : b
            );
            const result = unlockBadge(updated, 'polymath');
            return result;
        }
    }
    return { badges, newlyUnlocked: null };
};

