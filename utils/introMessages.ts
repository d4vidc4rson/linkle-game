// @ts-nocheck
import type { PlayerData, DailyResults } from '../types';
import { formatDateKey } from '../dailySchedule';

// Message categories for logged-in users
interface IntroMessageContext {
    playerData: PlayerData;
    user: any;
    streakWasReset: boolean;
    allSolved: boolean;
}

interface IntroMessage {
    text: string;
    priority: number; // Higher = more important, will be shown first
}

// Get yesterday's date
const getYesterdayDate = (): Date => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    return yesterday;
};

// Get yesterday's results
const getYesterdayResults = (dailyResults: DailyResults | undefined): { easy: boolean; hard: boolean; impossible: boolean } | null => {
    if (!dailyResults) return null;
    const yesterday = getYesterdayDate();
    const yesterdayKey = formatDateKey(yesterday);
    const results = dailyResults[yesterdayKey];
    if (!results) return null;
    
    return {
        easy: results.easy?.solved ?? false,
        hard: results.hard?.solved ?? false,
        impossible: results.impossible?.solved ?? false,
    };
};

// Count yesterday's wins
const countYesterdayWins = (dailyResults: DailyResults | undefined): number => {
    const results = getYesterdayResults(dailyResults);
    if (!results) return 0;
    return [results.easy, results.hard, results.impossible].filter(Boolean).length;
};

// Streak messages
const getStreakMessages = (context: IntroMessageContext): IntroMessage[] => {
    const messages: IntroMessage[] = [];
    const { playerData, streakWasReset } = context;
    const streak = playerData.currentStreak || 0;
    const maxStreak = playerData.maxStreak || 0;
    
    // Fresh start after reset
    if (streakWasReset) {
        messages.push({
            text: "Fresh start today.\nLet's build a new streak.",
            priority: 90
        });
    }
    // Active streak
    else if (streak >= 3) {
        messages.push({
            text: `Day ${streak} of your streak —\ndon't break it!`,
            priority: 85
        });
    }
    // Close to beating max streak
    else if (streak > 0 && maxStreak > 0 && streak >= maxStreak - 2 && streak < maxStreak) {
        messages.push({
            text: `Your best streak is ${maxStreak}.\nThink you can beat it?`,
            priority: 88
        });
    }
    // About to beat max streak
    else if (streak > 0 && streak === maxStreak) {
        messages.push({
            text: `You're tied with your best\nstreak of ${maxStreak}. Beat it today!`,
            priority: 92
        });
    }
    // Small streak
    else if (streak > 0) {
        messages.push({
            text: `${streak} puzzle${streak > 1 ? 's' : ''} in a row.\nKeep it going!`,
            priority: 70
        });
    }
    // No streak, played before
    else if (playerData.totalSolved > 0) {
        messages.push({
            text: "Ready to start a new streak?",
            priority: 60
        });
    }
    
    return messages;
};

// Yesterday's performance messages
const getYesterdayMessages = (context: IntroMessageContext): IntroMessage[] => {
    const messages: IntroMessage[] = [];
    const { playerData } = context;
    const wins = countYesterdayWins(playerData.dailyResults);
    
    if (wins === 3) {
        messages.push({
            text: "You went 3/3 yesterday.\nCan you do it again?",
            priority: 65
        });
    } else if (wins === 2) {
        messages.push({
            text: "You got 2/3 yesterday —\ntoday's your redemption!",
            priority: 60
        });
    } else if (wins === 1) {
        messages.push({
            text: "One out of three yesterday.\nYou've got this today.",
            priority: 55
        });
    } else if (wins === 0 && getYesterdayResults(playerData.dailyResults) !== null) {
        messages.push({
            text: "Yesterday was rough.\nShake it off, today's fresh.",
            priority: 58
        });
    }
    
    return messages;
};

// Milestone messages
const getMilestoneMessages = (context: IntroMessageContext): IntroMessage[] => {
    const messages: IntroMessage[] = [];
    const { playerData } = context;
    const totalSolved = playerData.totalSolved || 0;
    const perfectScores = playerData.perfectScores || 0;
    
    // Close to puzzle milestones
    const puzzleMilestones = [10, 25, 50, 100, 150, 200];
    for (const milestone of puzzleMilestones) {
        const remaining = milestone - totalSolved;
        if (remaining > 0 && remaining <= 3) {
            messages.push({
                text: `${remaining} more win${remaining > 1 ? 's' : ''} and you hit\n${milestone} puzzles solved!`,
                priority: 75 + (milestone / 10) // Higher milestones = higher priority
            });
            break; // Only show the nearest milestone
        }
    }
    
    // Close to perfect score milestones
    const perfectMilestones = [5, 10, 25, 50];
    for (const milestone of perfectMilestones) {
        const remaining = milestone - perfectScores;
        if (remaining > 0 && remaining <= 2) {
            messages.push({
                text: `Win all 3 today and you'll have\n${perfectScores + 3} Perfect Linkles!`,
                priority: 70
            });
            break;
        }
    }
    
    return messages;
};

// Fun/random messages (always eligible)
const getFunMessages = (): IntroMessage[] => {
    const funMessages = [
        "Your brain called. It's ready.",
        "The puzzles aren't going\nto solve themselves.",
        "Another day, another Linkle.",
        "Time to make some\nword connections.",
        "Let's see what you've got.",
        "Ready to link some words?",
        "Your daily brain workout\nawaits.",
        "Words won't link themselves.",
        "Show these puzzles\nwho's boss.",
        "Linkle time. Let's go.",
    ];
    
    return funMessages.map((text, index) => ({
        text,
        priority: 30 + (index % 10) // Low priority, slight variation
    }));
};

// Get message for guest users
const getGuestMessage = (hasPlayedBefore: boolean, allSolved: boolean): string => {
    if (allSolved) {
        return "Looks like you've already\nsolved today's daily\nLinkle. Kudos.";
    }
    
    if (hasPlayedBefore) {
        return "Welcome back!\nReady for today's puzzles?";
    }
    
    return "Brace yourself — today's\nEasy, Hard and Impossible\npuzzles are ready.";
};

// Main function to get the intro message
export const getIntroMessage = (context: IntroMessageContext): string => {
    const { user, playerData, allSolved } = context;
    
    // All solved message takes precedence
    if (allSolved) {
        return "Looks like you've already\nsolved today's daily\nLinkle. Kudos.";
    }
    
    // Guest user
    if (!user) {
        const hasPlayedBefore = (playerData.totalSolved || 0) > 0;
        return getGuestMessage(hasPlayedBefore, allSolved);
    }
    
    // Logged-in user: gather all eligible messages
    const allMessages: IntroMessage[] = [
        ...getStreakMessages(context),
        ...getYesterdayMessages(context),
        ...getMilestoneMessages(context),
        ...getFunMessages(),
    ];
    
    // Sort by priority (highest first)
    allMessages.sort((a, b) => b.priority - a.priority);
    
    // Get top priority messages (within 10 points of highest)
    const topPriority = allMessages[0]?.priority || 0;
    const topMessages = allMessages.filter(m => m.priority >= topPriority - 10);
    
    // If there's a high-priority message (> 80), always show it
    if (topPriority > 80) {
        return allMessages[0].text;
    }
    
    // Otherwise, randomly pick from top messages for variety
    const randomIndex = Math.floor(Math.random() * Math.min(3, topMessages.length));
    return topMessages[randomIndex]?.text || "Brace yourself — today's\nEasy, Hard and Impossible\npuzzles are ready.";
};

// Get personalized message for start screen (logged-in users only)
export const getStartScreenMessage = (playerData: PlayerData, alreadyPlayedToday: boolean): string => {
    const streak = playerData.currentStreak || 0;
    const maxStreak = playerData.maxStreak || 0;
    const totalSolved = playerData.totalSolved || 0;
    
    // Already played today
    if (alreadyPlayedToday) {
        return "You've conquered today's\npuzzles. Nice work!";
    }
    
    // Active streak messages
    if (streak >= 7) {
        return `${streak}-day streak! 🔥\nYou're on fire.`;
    } else if (streak >= 3) {
        return `${streak}-day streak.\nKeep it going!`;
    } else if (streak > 0 && streak === maxStreak && maxStreak >= 3) {
        return `Tied with your best\nstreak of ${maxStreak}. Beat it!`;
    } else if (streak > 0 && maxStreak > streak && maxStreak >= 5 && streak >= maxStreak - 2) {
        return `${streak} days in. Your record\nis ${maxStreak}. Go for it!`;
    } else if (streak > 0) {
        return `${streak}-day streak.\nLet's keep it alive.`;
    }
    
    // No streak but has played before
    if (totalSolved > 0) {
        const wins = countYesterdayWins(playerData.dailyResults);
        if (wins === 3) {
            return "You crushed it yesterday.\nDo it again!";
        } else if (wins === 0 && getYesterdayResults(playerData.dailyResults) !== null) {
            return "Fresh start today.\nYou've got this.";
        }
        return "Welcome back!\nReady to play?";
    }
    
    // First time player (logged in but never played)
    return "Welcome to Linkle!\nLet's see what you've got.";
};

// Check if streak should be reset based on last played date
export const checkStreakReset = (lastPlayedDate: string | null): { shouldReset: boolean; wasYesterday: boolean } => {
    if (!lastPlayedDate) {
        return { shouldReset: false, wasYesterday: false };
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastPlayed = new Date(lastPlayedDate);
    lastPlayed.setHours(0, 0, 0, 0);
    
    const lastPlayedTime = lastPlayed.getTime();
    const todayTime = today.getTime();
    const yesterdayTime = yesterday.getTime();
    
    // If last played was today, no reset needed
    if (lastPlayedTime === todayTime) {
        return { shouldReset: false, wasYesterday: false };
    }
    
    // If last played was yesterday, streak continues
    if (lastPlayedTime === yesterdayTime) {
        return { shouldReset: false, wasYesterday: true };
    }
    
    // If last played was before yesterday, streak should reset
    return { shouldReset: true, wasYesterday: false };
};

