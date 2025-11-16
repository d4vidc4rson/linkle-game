

import type { Badge, PlayerData } from './types';

export const initialBadges: Badge[] = [
    // Feats of Skill
    { id: 'perfect1', name: 'Sharp Start', description: 'Get your first "Perfect Linkle!" score.', unlockMessage: 'You got your first "Perfect Linkle!" score. Nicely done!', unlocked: false, icon: '🔗', category: 'Feats of Skill', dateUnlocked: null, target: 1 },
    { id: 'perfect5', name: 'Perfectionist', description: 'Achieve 5 "Perfect Linkle!" scores.', unlockMessage: 'That\'s 5 "Perfect Linkle!" scores. Your logic is undeniable.', unlocked: false, icon: '🎯', category: 'Feats of Skill', dateUnlocked: null, target: 5 },
    { id: 'perfect10', name: 'Mastermind', description: 'Achieve 10 "Perfect Linkle!" scores.', unlockMessage: '10 "Perfect Linkle!" scores! You\'ve truly mastered the game.', unlocked: false, icon: '🧠', category: 'Feats of Skill', dateUnlocked: null, target: 10 },
    { id: 'streak3', name: 'Hot Streak', description: 'Win 3 games in a row.', unlockMessage: 'You won 3 games in a row and are now officially on a hot streak!', unlocked: false, icon: '🏁', category: 'Feats of Skill', dateUnlocked: null, target: 3 },
    { id: 'streak5', name: 'On Fire', description: 'Win 5 games in a row.', unlockMessage: 'A 5-game winning streak! You are absolutely on fire.', unlocked: false, icon: '🚀', category: 'Feats of Skill', dateUnlocked: null, target: 5 },
    { id: 'streak10', name: 'Unstoppable', description: 'Win 10 games in a row.', unlockMessage: 'A 10-game winning streak! You are an unstoppable force.', unlocked: false, icon: '👑', category: 'Feats of Skill', dateUnlocked: null, target: 10 },
    { id: 'clutch', name: 'Down to the Wire', description: 'Win a puzzle on your very last try.', unlockMessage: 'You won the puzzle on your very last try. Talk about a clutch performance!', unlocked: false, icon: '⏳', category: 'Feats of Skill', dateUnlocked: null, target: 1 },
    { id: 'fast', name: 'Lightning Linker', description: 'Solve an EASY puzzle in under 30 seconds.', unlockMessage: 'You solved an EASY puzzle in under 30 seconds. That was lightning fast!', unlocked: false, icon: '⚡', category: 'Feats of Skill', dateUnlocked: null, target: 1 },
    { id: 'perfectStreak3', name: 'Unbroken Mind', description: 'Achieve 3 "Perfect Linkle!" scores in a row.', unlockMessage: 'Three "Perfect Linkle!" scores in a row. Your mind is an unbroken chain of logic.', unlocked: false, icon: '∞', category: 'Feats of Skill', dateUnlocked: null, target: 3 },

    // Player Habits
    { id: 'solve10', name: 'Novice Solver', description: 'Solve 10 total puzzles.', unlockMessage: 'You\'ve solved 10 total puzzles. Welcome to the club!', unlocked: false, icon: '🪜', category: 'Player Habits', dateUnlocked: null, target: 10 },
    { id: 'solve25', name: 'Puzzle Pro', description: 'Solve 25 total puzzles.', unlockMessage: '25 puzzles solved! You\'re officially a puzzle pro.', unlocked: false, icon: '🧰', category: 'Player Habits', dateUnlocked: null, target: 25 },
    { id: 'solve50', name: 'Linkle Legend', description: 'Solve 50 total puzzles.', unlockMessage: '50 puzzles solved. Your name will be whispered in the halls of Linkle legend.', unlocked: false, icon: '⚡', category: 'Player Habits', dateUnlocked: null, target: 50 },
    { id: 'curious', name: 'The Curious Mind', description: 'View the "Show Linkle" explanation 10 times.', unlockMessage: 'You viewed the "Show Linkle" explanation 10 times. A curious mind is a powerful one.', unlocked: false, icon: '🧐', category: 'Player Habits', dateUnlocked: null, target: 10 },
    { id: 'daily7', name: 'Daily Dedication', description: 'Play a puzzle on 7 consecutive days.', unlockMessage: 'You\'ve played a puzzle on 7 consecutive days. That\'s true dedication!', unlocked: false, icon: '🗓️', category: 'Player Habits', dateUnlocked: null, target: 7 },
    
    // Difficulty Conquest
    { id: 'hard1', name: 'Challenge Accepted', description: 'Solve your first HARD puzzle.', unlockMessage: 'You solved your first HARD puzzle. You\'re not afraid of a challenge!', unlocked: false, icon: '🧗', category: 'Difficulty Conquest', dateUnlocked: null, target: 1 },
    { id: 'hard10', name: 'Giant Slayer', description: 'Solve 10 HARD puzzles.', unlockMessage: 'You\'ve conquered 10 HARD puzzles. No challenge is too great for you.', unlocked: false, icon: '⚔️', category: 'Difficulty Conquest', dateUnlocked: null, target: 10 },
    { id: 'impossible1', name: 'Myth Buster', description: 'Solve your first IMPOSSIBLE puzzle.', unlockMessage: 'You solved an IMPOSSIBLE puzzle. You\'ve busted the myth!', unlocked: false, icon: '🤯', category: 'Difficulty Conquest', dateUnlocked: null, target: 1 },
    { id: 'impossible5', name: 'Mind Melter', description: 'Solve 5 IMPOSSIBLE puzzles.', unlockMessage: '5 IMPOSSIBLE puzzles solved. Your brain is operating on another level.', unlocked: false, icon: '🌌', category: 'Difficulty Conquest', dateUnlocked: null, target: 5 },
    { id: 'impossiblePerfect', name: 'The Oracle', description: 'Get a "Perfect Linkle!" on an IMPOSSIBLE puzzle.', unlockMessage: 'A "Perfect Linkle!" on an IMPOSSIBLE puzzle. You can see the connections others can\'t.', unlocked: false, icon: '🔮', category: 'Difficulty Conquest', dateUnlocked: null, target: 1 },
    { id: 'polymath', name: 'Puzzle Polymath', description: 'Solve at least one puzzle of each difficulty.', unlockMessage: 'You\'ve solved a puzzle of every difficulty. A true polymath of puzzles!', unlocked: false, icon: '🎓', category: 'Difficulty Conquest', dateUnlocked: null, target: 3 },
];

export const defaultPlayerData: PlayerData = {
    totalScore: 0,
    currentStreak: 0,
    badges: initialBadges.map(b => ({...b, progress: 0 })),
    perfectScores: 0,
    totalSolved: 0,
    playedPuzzleIndices: [],
    easySolved: 0,
    hardSolved: 0,
    impossibleSolved: 0,
    consecutiveDaysPlayed: 0,
    lastPlayedDate: null,
    showLinkleViews: 0,
    fastestEasySolve: null,
    impossiblePerfects: 0,
    consecutivePerfects: 0,
    maxStreak: 0,
    dailyResults: {},
};

export const LOSER_EMOJIS = ['😡', '🥵'];

export const TRIES_PER_DIFFICULTY = {
    'EASY': 4,
    'HARD': 3,
    'IMPOSSIBLE': 2
};

export const DEFAULT_TRIES = TRIES_PER_DIFFICULTY['EASY'];