// @ts-nocheck
import type { PlayerData, DailyResults } from '../types';
import { formatDateKey } from '../dailySchedule';

// Message categories for logged-in users
interface IntroMessageContext {
    playerData: PlayerData;
    user: any;
    streakWasReset: boolean;
    dayStreakWasReset: boolean;
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

// Get today's date key
const getTodayDate = (): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
};

// Get today's completion status
interface DayCompletionStatus {
    played: boolean;        // Did they play any puzzle?
    easy: boolean | null;   // null = not attempted, true = solved, false = failed
    hard: boolean | null;
    impossible: boolean | null;
    solvedCount: number;
    attemptedCount: number;
    allSolved: boolean;
    remaining: ('Easy' | 'Hard' | 'Impossible')[];
}

const getDayCompletionStatus = (dailyResults: DailyResults | undefined, date: Date): DayCompletionStatus => {
    const dateKey = formatDateKey(date);
    const results = dailyResults?.[dateKey];
    
    if (!results) {
        return {
            played: false,
            easy: null,
            hard: null,
            impossible: null,
            solvedCount: 0,
            attemptedCount: 0,
            allSolved: false,
            remaining: ['Easy', 'Hard', 'Impossible'],
        };
    }
    
    const easy = results.easy ? results.easy.solved : null;
    const hard = results.hard ? results.hard.solved : null;
    const impossible = results.impossible ? results.impossible.solved : null;
    
    const solvedCount = [easy, hard, impossible].filter(x => x === true).length;
    const attemptedCount = [easy, hard, impossible].filter(x => x !== null).length;
    
    const remaining: ('Easy' | 'Hard' | 'Impossible')[] = [];
    if (easy !== true) remaining.push('Easy');
    if (hard !== true) remaining.push('Hard');
    if (impossible !== true) remaining.push('Impossible');
    
    return {
        played: attemptedCount > 0,
        easy,
        hard,
        impossible,
        solvedCount,
        attemptedCount,
        allSolved: solvedCount === 3,
        remaining,
    };
};

const getTodayCompletionStatus = (dailyResults: DailyResults | undefined): DayCompletionStatus => {
    return getDayCompletionStatus(dailyResults, getTodayDate());
};

const getYesterdayCompletionStatus = (dailyResults: DailyResults | undefined): DayCompletionStatus => {
    return getDayCompletionStatus(dailyResults, getYesterdayDate());
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

// ============================================
// CONTEXT-AWARE MESSAGE GENERATORS BY RECENCY
// ============================================

// Messages for players who played YESTERDAY (continuing streak)
const getYesterdayPlayerMessages = (context: IntroMessageContext): IntroMessage[] => {
    const messages: IntroMessage[] = [];
    const { playerData, dayStreakWasReset } = context;
    const dayStreak = playerData.dayStreak || 0;
    const maxStreak = playerData.maxStreak || 0;
    const lastSession = getLastSessionSummary(playerData.dailyResults, playerData.lastPlayedDate);
    
    // Day streak messages (using dayStreak, not puzzle streak)
    if (dayStreak >= 7) {
        messages.push({
            text: `Day ${dayStreak} of your streak! 🔥\nYou're on fire.`,
            priority: 95
        });
    } else if (dayStreak >= 3) {
        messages.push({
            text: `Day ${dayStreak} of your streak!\nKeep it alive.`,
            priority: 90
        });
    } else if (dayStreak > 0 && dayStreak === maxStreak && maxStreak >= 3) {
        messages.push({
            text: `Tied with your best\nstreak of ${maxStreak}. Beat it!`,
            priority: 92
        });
    } else if (dayStreak > 0 && maxStreak > dayStreak && maxStreak >= 5 && dayStreak >= maxStreak - 2) {
        messages.push({
            text: `${dayStreak} days in. Your record\nis ${maxStreak}. Go for it!`,
            priority: 88
        });
    } else if (dayStreak > 0) {
        messages.push({
            text: `Day ${dayStreak} streak.\nLet's keep it alive.`,
            priority: 85
        });
    }
    
    // Yesterday's performance messages
    if (lastSession) {
        if (lastSession.swept) {
            messages.push({
                text: "You crushed it yesterday.\nDo it again!",
                priority: 82
            });
        } else if (lastSession.wins === 2) {
            messages.push({
                text: "You got 2/3 yesterday —\ngo for the sweep today!",
                priority: 78
            });
        } else if (lastSession.wins === 1) {
            messages.push({
                text: "Back for more?\nLet's improve on yesterday.",
                priority: 75
            });
        } else if (lastSession.shutout) {
            messages.push({
                text: "Yesterday was rough.\nFresh start today!",
                priority: 76
            });
        }
    }
    
    return messages;
};

// Messages for players who played THIS WEEK (2-7 days ago)
const getThisWeekPlayerMessages = (context: IntroMessageContext): IntroMessage[] => {
    const messages: IntroMessage[] = [];
    const { playerData, dayStreakWasReset } = context;
    const dayStreak = playerData.dayStreak || 0;
    const daysSince = getDaysSinceLastPlayed(playerData.lastPlayedDate);
    const lastSession = getLastSessionSummary(playerData.dailyResults, playerData.lastPlayedDate);
    
    // They had a streak that ended
    if (dayStreakWasReset && dayStreak === 0 && (playerData.maxStreak || 0) >= 3) {
        messages.push({
            text: "Your streak ended.\nReady to start fresh?",
            priority: 85
        });
    }
    
    // General "been a few days" messages
    if (daysSince === 2) {
        messages.push({
            text: "Missed you yesterday!\nReady to jump back in?",
            priority: 80
        });
    } else if (daysSince <= 4) {
        messages.push({
            text: "It's been a few days —\nready to jump back in?",
            priority: 78
        });
    } else {
        messages.push({
            text: "Almost a week!\nThe puzzles missed you.",
            priority: 76
        });
    }
    
    // Reference last performance
    if (lastSession) {
        if (lastSession.swept) {
            messages.push({
                text: "Last time you went 3/3.\nLet's do it again!",
                priority: 82
            });
        } else if (lastSession.wins >= 2) {
            messages.push({
                text: `You won ${lastSession.wins}/3 last time.\nTime to beat that!`,
                priority: 75
            });
        }
    }
    
    return messages;
};

// Messages for players who played THIS MONTH (8-30 days ago)
const getThisMonthPlayerMessages = (context: IntroMessageContext): IntroMessage[] => {
    const messages: IntroMessage[] = [];
    const { playerData } = context;
    const totalScore = playerData.totalScore || 0;
    const totalSolved = playerData.totalSolved || 0;
    const daysSince = getDaysSinceLastPlayed(playerData.lastPlayedDate);
    
    // Warm welcome back messages
    if (daysSince <= 14) {
        messages.push({
            text: "Hey stranger!\nWe've missed you.",
            priority: 85
        });
    } else {
        messages.push({
            text: "It's been a while!\nWelcome back.",
            priority: 85
        });
    }
    
    // Reference their stats
    if (totalScore >= 10000) {
        messages.push({
            text: `Welcome back! You left\noff at ${totalScore.toLocaleString()} points.`,
            priority: 82
        });
    } else if (totalSolved >= 20) {
        messages.push({
            text: `${totalSolved} puzzles solved so far.\nLet's add to that!`,
            priority: 80
        });
    }
    
    // Encourage fresh start
    messages.push({
        text: "Fresh puzzles await.\nReady to dive back in?",
        priority: 75
    });
    
    return messages;
};

// Messages for players who haven't played in a LONG TIME (30+ days)
const getLongTimeAgoPlayerMessages = (context: IntroMessageContext): IntroMessage[] => {
    const messages: IntroMessage[] = [];
    const { playerData } = context;
    const totalScore = playerData.totalScore || 0;
    const totalSolved = playerData.totalSolved || 0;
    const maxStreak = playerData.maxStreak || 0;
    
    // Re-engagement messages
    messages.push({
        text: "Look who's back! 👀\nReady to dust off those skills?",
        priority: 90
    });
    
    messages.push({
        text: "The legend returns!\nWe've missed you.",
        priority: 88
    });
    
    // Reference their legacy stats
    if (totalScore >= 5000) {
        messages.push({
            text: `Your lifetime score: ${totalScore.toLocaleString()}\nLet's add to it!`,
            priority: 85
        });
    }
    
    if (totalSolved >= 10) {
        messages.push({
            text: `${totalSolved} puzzles solved.\nPick up where you left off!`,
            priority: 82
        });
    }
    
    if (maxStreak >= 5) {
        messages.push({
            text: `Your best streak was ${maxStreak} days.\nThink you can beat it?`,
            priority: 84
        });
    }
    
    return messages;
};

// Messages for NEW players (never played)
const getNewPlayerMessages = (context: IntroMessageContext): IntroMessage[] => {
    const { user } = context;
    const messages: IntroMessage[] = [];
    
    if (user) {
        messages.push({
            text: "Welcome to Linkle!\nLet's see what you've got.",
            priority: 95
        });
    } else {
        messages.push({
            text: "Brace yourself — today's\nEasy, Hard and Impossible\npuzzles are ready.",
            priority: 90
        });
    }
    
    return messages;
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

// Transition screen messages - action-oriented "let's go" messages
// These are shown AFTER the start screen, so they should be different and pump-up oriented
const getTransitionMessages = (): string[] => {
    return [
        // Classic pump-up
        "Let's do this.",
        "Here we go...",
        "Time to Linkle.",
        "Ready. Set. Linkle.",
        "Game on.",
        "Let's get it.",
        
        // Confident/cocky
        "You've got this.",
        "Easy money.",
        "Piece of cake.",
        "Child's play.",
        "Walk in the park.",
        "No sweat.",
        
        // Action
        "Loading your challenge...",
        "Preparing the puzzles...",
        "Warming up the words...",
        "Shuffling the letters...",
        
        // Encouraging
        "Trust your instincts.",
        "Think fast, link faster.",
        "Eyes on the prize.",
        "Focus. Breathe. Link.",
        "Channel your inner genius.",
        
        // Playful
        "Words won't link themselves.",
        "The puzzles are waiting...",
        "Your brain called. It's ready.",
        "Today's puzzles fear you.",
        "Show 'em who's boss.",
        "Time to make connections.",
        
        // Dramatic
        "The moment of truth.",
        "Destiny awaits.",
        "Your move.",
        "This is your moment.",
        "Glory awaits.",
        
        // Chill
        "Take a breath...",
        "Nice and easy.",
        "One word at a time.",
        "Stay calm. Stay sharp.",
        
        // Fun
        "It's Linkle time.",
        "Let the linking begin.",
        "May the links be with you.",
        "Linkle activated.",
        "Engaging brain mode...",
        "Puzzle mode: engaged.",
    ];
};

// Main function to get the intro message (transition screen after tapping Play)
export const getIntroMessage = (context: IntroMessageContext): string => {
    const { user, playerData, allSolved } = context;
    
    // All solved message takes precedence
    if (allSolved) {
        return "Looks like you've already\nsolved today's daily\nLinkle. Kudos.";
    }
    
    // Guest user - show a simple message
    if (!user) {
        const hasPlayedBefore = (playerData.totalSolved || 0) > 0;
        if (!hasPlayedBefore) {
            return "Brace yourself — today's\nEasy, Hard and Impossible\npuzzles are ready.";
        }
    }
    
    // For the transition screen, show action-oriented messages
    // The contextual/welcome messages were already shown on the start screen
    const transitionMessages = getTransitionMessages();
    const randomIndex = Math.floor(Math.random() * transitionMessages.length);
    return transitionMessages[randomIndex];
};

// Get personalized message for start screen (logged-in users only)
export const getStartScreenMessage = (playerData: PlayerData, alreadyPlayedToday: boolean): string => {
    const dayStreak = playerData.dayStreak || 0;
    const maxStreak = playerData.maxStreak || 0;
    const totalSolved = playerData.totalSolved || 0;
    const totalScore = playerData.totalScore || 0;
    const recency = getPlayerRecency(playerData.lastPlayedDate);
    const lastSession = getLastSessionSummary(playerData.dailyResults, playerData.lastPlayedDate);
    
    // Check for partial completion TODAY
    const todayStatus = getTodayCompletionStatus(playerData.dailyResults);
    
    // Already completed all 3 today
    if (alreadyPlayedToday && todayStatus.allSolved) {
        return "You've conquered today's\npuzzles. Nice work!";
    }
    
    // All 3 attempted but not all solved (some failed)
    if (todayStatus.attemptedCount === 3 && !todayStatus.allSolved) {
        const failedCount = todayStatus.attemptedCount - todayStatus.solvedCount;
        if (failedCount === 1) {
            return "You gave it your all today.\nTry again tomorrow!";
        } else if (failedCount === 2) {
            return "Tough puzzles today!\nCome back tomorrow.";
        } else {
            return "Better luck tomorrow!\nThose were tricky.";
        }
    }
    
    // Partial completion today - they started but have puzzles they haven't attempted yet
    if (todayStatus.played && todayStatus.attemptedCount < 3) {
        // Find puzzles they haven't attempted (not failed, just not tried)
        const unattempted: string[] = [];
        if (todayStatus.easy === null) unattempted.push('Easy');
        if (todayStatus.hard === null) unattempted.push('Hard');
        if (todayStatus.impossible === null) unattempted.push('Impossible');
        
        if (unattempted.length === 1) {
            return `Welcome back! Let's finish\ntoday's ${unattempted[0]} puzzle.`;
        } else if (unattempted.length === 2) {
            return `Welcome back! You've got\n${unattempted[0]} and ${unattempted[1]} left.`;
        }
        // Shouldn't hit this, but fallback
        return "Welcome back!\nLet's finish today's puzzles.";
    }
    
    // Handle by recency (haven't played today yet)
    switch (recency) {
        case 'today':
            // Played today but didn't solve any - rare edge case
            return "Ready for another try?";
            
        case 'yesterday':
            // Active day streak messages
            if (dayStreak >= 7) {
                return `Day ${dayStreak} of your streak! 🔥\nYou're on fire.`;
            } else if (dayStreak >= 3) {
                return `Day ${dayStreak} of your streak.\nKeep it going!`;
            } else if (dayStreak > 0 && dayStreak === maxStreak && maxStreak >= 3) {
                return `Tied with your best\nstreak of ${maxStreak}. Beat it!`;
            } else if (dayStreak > 0 && maxStreak > dayStreak && maxStreak >= 5 && dayStreak >= maxStreak - 2) {
                return `${dayStreak} days in. Your record\nis ${maxStreak}. Go for it!`;
            } else if (dayStreak > 0) {
                return `Day ${dayStreak} streak.\nLet's keep it alive.`;
            }
            // Yesterday performance
            if (lastSession?.swept) {
                return "You crushed it yesterday.\nDo it again!";
            } else if (lastSession?.shutout) {
                return "Fresh start today.\nYou've got this.";
            }
            return "Welcome back!\nReady to play?";
            
        case 'thisWeek':
            // Been a few days
            const daysSince = getDaysSinceLastPlayed(playerData.lastPlayedDate);
            if (daysSince === 2) {
                return "Missed you yesterday!\nReady to jump back in?";
            } else if (lastSession?.swept) {
                return "Last time you went 3/3.\nLet's do it again!";
            }
            return "It's been a few days —\nready to jump back in?";
            
        case 'thisMonth':
            // Been a while
            if (totalScore >= 10000) {
                return `Welcome back! You left\noff at ${totalScore.toLocaleString()} points.`;
            }
            return "Hey stranger!\nWe've missed you.";
            
        case 'longTimeAgo':
            // Long time ago
            if (totalScore >= 5000) {
                return `The legend returns!\nScore: ${totalScore.toLocaleString()}`;
            }
            return "Look who's back! 👀\nReady to dust off those skills?";
            
        case 'never':
        default:
            // First time player
            return "Welcome to Linkle!\nLet's see what you've got.";
    }
};

// Check if streaks should be reset based on last played date
// Returns info for both dayStreak (consecutive days) and currentStreak (puzzle wins)
export interface StreakResetInfo {
    shouldResetDayStreak: boolean;      // Day streak resets if missed a day
    shouldResetPuzzleStreak: boolean;   // Puzzle streak resets if missed a day
    wasYesterday: boolean;              // Did they play yesterday?
    wasToday: boolean;                  // Did they play today?
}

export const checkStreakReset = (lastPlayedDate: string | null): StreakResetInfo => {
    if (!lastPlayedDate) {
        return { 
            shouldResetDayStreak: false, 
            shouldResetPuzzleStreak: false, 
            wasYesterday: false,
            wasToday: false 
        };
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
        return { 
            shouldResetDayStreak: false, 
            shouldResetPuzzleStreak: false, 
            wasYesterday: false,
            wasToday: true 
        };
    }
    
    // If last played was yesterday, streaks continue
    if (lastPlayedTime === yesterdayTime) {
        return { 
            shouldResetDayStreak: false, 
            shouldResetPuzzleStreak: false, 
            wasYesterday: true,
            wasToday: false 
        };
    }
    
    // If last played was before yesterday, both streaks should reset
    return { 
        shouldResetDayStreak: true, 
        shouldResetPuzzleStreak: true, 
        wasYesterday: false,
        wasToday: false 
    };
};

// Player recency categories
export type PlayerRecency = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'longTimeAgo' | 'never';

// Get player recency based on last played date
export const getPlayerRecency = (lastPlayedDate: string | null): PlayerRecency => {
    if (!lastPlayedDate) {
        return 'never';
    }
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastPlayed = new Date(lastPlayedDate);
    const lastPlayedDay = new Date(lastPlayed.getFullYear(), lastPlayed.getMonth(), lastPlayed.getDate());
    
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysDiff = Math.floor((today.getTime() - lastPlayedDay.getTime()) / msPerDay);
    
    if (daysDiff === 0) return 'today';
    if (daysDiff === 1) return 'yesterday';
    if (daysDiff <= 7) return 'thisWeek';
    if (daysDiff <= 30) return 'thisMonth';
    return 'longTimeAgo';
};

// Get days since last played (for messaging)
export const getDaysSinceLastPlayed = (lastPlayedDate: string | null): number => {
    if (!lastPlayedDate) return -1;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastPlayed = new Date(lastPlayedDate);
    const lastPlayedDay = new Date(lastPlayed.getFullYear(), lastPlayed.getMonth(), lastPlayed.getDate());
    
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((today.getTime() - lastPlayedDay.getTime()) / msPerDay);
};

// Get last session summary from daily results
export interface LastSessionSummary {
    date: string;
    wins: number;
    losses: number;
    total: number;
    swept: boolean; // Won all 3
    shutout: boolean; // Lost all attempted
}

export const getLastSessionSummary = (dailyResults: DailyResults | undefined, lastPlayedDate: string | null): LastSessionSummary | null => {
    if (!dailyResults || !lastPlayedDate) return null;
    
    // Find the last played date key
    const lastPlayed = new Date(lastPlayedDate);
    const dateKey = formatDateKey(lastPlayed);
    const results = dailyResults[dateKey];
    
    if (!results) {
        // Try to find the most recent entry in dailyResults
        const sortedKeys = Object.keys(dailyResults).sort().reverse();
        if (sortedKeys.length === 0) return null;
        
        const mostRecentKey = sortedKeys[0];
        const mostRecentResults = dailyResults[mostRecentKey];
        if (!mostRecentResults) return null;
        
        let wins = 0;
        let total = 0;
        
        if (mostRecentResults.easy) { total++; if (mostRecentResults.easy.solved) wins++; }
        if (mostRecentResults.hard) { total++; if (mostRecentResults.hard.solved) wins++; }
        if (mostRecentResults.impossible) { total++; if (mostRecentResults.impossible.solved) wins++; }
        
        return {
            date: mostRecentKey,
            wins,
            losses: total - wins,
            total,
            swept: wins === 3,
            shutout: wins === 0 && total > 0,
        };
    }
    
    let wins = 0;
    let total = 0;
    
    if (results.easy) { total++; if (results.easy.solved) wins++; }
    if (results.hard) { total++; if (results.hard.solved) wins++; }
    if (results.impossible) { total++; if (results.impossible.solved) wins++; }
    
    return {
        date: dateKey,
        wins,
        losses: total - wins,
        total,
        swept: wins === 3,
        shutout: wins === 0 && total > 0,
    };
};

