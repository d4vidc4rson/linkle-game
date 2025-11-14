#!/usr/bin/env node

/**
 * Puzzle Pair Verification Script
 * 
 * This script verifies that all word pairs in a puzzle solution are unique
 * across the entire puzzles.ts file, following the Rule of Uniqueness.
 * 
 * Usage (single puzzle):
 *   node verify-puzzle-pairs.js "WORD1" "WORD2" "WORD3" ...
 * 
 * Usage (batch mode - test multiple puzzles):
 *   node verify-puzzle-pairs.js --batch "WORD1" "WORD2" ... "|" "WORD1" "WORD2" ...
 *   (Use "|" as a separator between puzzles)
 * 
 * Examples:
 *   node verify-puzzle-pairs.js "ICE" "CREAM" "SANDWICH" "BOARD" "GAME"
 *   node verify-puzzle-pairs.js --batch "ICE" "CREAM" "SANDWICH" "|" "RAIN" "BOW" "STRING"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read puzzles.ts file
const puzzlesFilePath = path.join(__dirname, 'puzzles.ts');
const puzzlesContent = fs.readFileSync(puzzlesFilePath, 'utf-8');

// Extract all solution arrays from puzzles.ts
const solutionRegex = /solution:\s*\[(.*?)\]/gs;
const solutions = [];

let match;
while ((match = solutionRegex.exec(puzzlesContent)) !== null) {
    const solutionString = match[1];
    // Parse the solution array, handling quoted strings
    const words = solutionString
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(s => s.length > 0);
    if (words.length > 0) {
        solutions.push(words);
    }
}

// Get puzzle solution(s) from command line arguments
const args = process.argv.slice(2);
const isBatchMode = args[0] === '--batch';

let puzzleSolutions;

if (!isBatchMode) {
    // Single puzzle mode
    if (args.length < 2) {
        console.error('Error: Please provide at least 2 words for the puzzle solution.');
        console.error('Usage: node verify-puzzle-pairs.js "WORD1" "WORD2" "WORD3" ...');
        console.error('   or: node verify-puzzle-pairs.js --batch "WORD1" "WORD2" ... "|" "WORD1" "WORD2" ...');
        process.exit(1);
    }
    puzzleSolutions = [args];
} else {
    // Batch mode - split by "|" separator
    if (args.length < 3) {
        console.error('Error: Batch mode requires at least one puzzle and a separator.');
        console.error('Usage: node verify-puzzle-pairs.js --batch "WORD1" "WORD2" ... "|" "WORD1" "WORD2" ...');
        process.exit(1);
    }
    puzzleSolutions = [];
    let currentPuzzle = [];
    for (let i = 1; i < args.length; i++) {
        if (args[i] === '|') {
            if (currentPuzzle.length >= 2) {
                puzzleSolutions.push(currentPuzzle);
            }
            currentPuzzle = [];
        } else {
            currentPuzzle.push(args[i]);
        }
    }
    if (currentPuzzle.length >= 2) {
        puzzleSolutions.push(currentPuzzle);
    }
    if (puzzleSolutions.length === 0) {
        console.error('Error: No valid puzzles found in batch mode.');
        process.exit(1);
    }
}

// Function to verify a single puzzle
function verifyPuzzle(puzzleSolution, puzzleNumber = 1, totalPuzzles = 1) {
    // Extract all pairs from the puzzle solution
    const puzzlePairs = [];
    for (let i = 0; i < puzzleSolution.length - 1; i++) {
        const pair = [puzzleSolution[i].toUpperCase(), puzzleSolution[i + 1].toUpperCase()];
        puzzlePairs.push(pair);
    }

    // Check each pair against all existing solutions
    if (totalPuzzles > 1) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`🔍 Puzzle ${puzzleNumber}/${totalPuzzles}`);
    } else {
        console.log('\n🔍 Verifying puzzle pairs...\n');
    }
    console.log(`Puzzle Solution: [${puzzleSolution.map(w => `"${w}"`).join(', ')}]\n`);

    let allUnique = true;
    const conflicts = [];

    puzzlePairs.forEach((pair, index) => {
        const [word1, word2] = pair;
        const pairString = `${word1}-${word2}`;
        
        // Check if this pair exists in any existing solution
        let found = false;
        let foundInSolutions = [];
        
        solutions.forEach((solution, solutionIndex) => {
            for (let i = 0; i < solution.length - 1; i++) {
                const existingWord1 = solution[i].toUpperCase();
                const existingWord2 = solution[i + 1].toUpperCase();
                
                // Check both orders (A-B and B-A)
                if ((existingWord1 === word1 && existingWord2 === word2) ||
                    (existingWord1 === word2 && existingWord2 === word1)) {
                    found = true;
                    foundInSolutions.push({
                        index: solutionIndex + 1,
                        solution: solution,
                        position: i
                    });
                }
            }
        });
        
        if (found) {
            allUnique = false;
            conflicts.push({
                pair: pairString,
                index: index + 1,
                foundIn: foundInSolutions
            });
            console.log(`❌ Pair ${index + 1}: ${pairString} - CONFLICT FOUND`);
            foundInSolutions.forEach((foundIn, i) => {
                console.log(`   Found in puzzle #${foundIn.index} at position ${foundIn.position + 1}:`);
                console.log(`   ${foundIn.solution.map(w => `"${w}"`).join(' → ')}`);
            });
        } else {
            console.log(`✅ Pair ${index + 1}: ${pairString} - UNIQUE`);
        }
    });

    console.log('\n' + '='.repeat(60));

    if (allUnique) {
        console.log('\n✅ SUCCESS: All pairs are unique!');
        console.log('This puzzle can be added to puzzles.ts.\n');
        return true;
    } else {
        console.log(`\n❌ FAILURE: Found ${conflicts.length} conflicting pair(s).`);
        console.log('This puzzle cannot be added until all conflicts are resolved.\n');
        return false;
    }
}

// Verify all puzzles
let allPassed = true;
puzzleSolutions.forEach((puzzleSolution, index) => {
    const passed = verifyPuzzle(puzzleSolution, index + 1, puzzleSolutions.length);
    if (!passed) {
        allPassed = false;
    }
});

if (puzzleSolutions.length > 1) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 BATCH SUMMARY: ${puzzleSolutions.length} puzzle(s) tested`);
    if (allPassed) {
        console.log('✅ All puzzles passed verification!\n');
        process.exit(0);
    } else {
        console.log('❌ Some puzzles failed verification.\n');
        process.exit(1);
    }
} else {
    process.exit(allPassed ? 0 : 1);
}

