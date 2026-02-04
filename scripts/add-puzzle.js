#!/usr/bin/env node

/**
 * Add Puzzle Script
 * 
 * Validates a new puzzle against the bigram index and adds it to puzzles.ts
 * if all pairs are unique. Also updates the bigram index.
 * 
 * Usage:
 *   node scripts/add-puzzle.js --solution "WORD1" "WORD2" ... --narrative "The narrative text" --difficulty EASY
 * 
 * Options:
 *   --solution     The 9 words of the puzzle solution (required)
 *   --narrative    The narrative explaining the connections (required)
 *   --difficulty   One of: EASY, HARD, IMPOSSIBLE (required)
 *   --dry-run      Validate only, don't add to puzzles.ts
 *   --json         Output result as JSON (for programmatic use)
 * 
 * Examples:
 *   node scripts/add-puzzle.js --solution "ICE" "CREAM" "SANDWICH" "BOARD" "GAME" "SHOW" "ROOM" "MATE" "CHECK" --narrative "..." --difficulty EASY
 *   node scripts/add-puzzle.js --dry-run --solution "ICE" "CREAM" ... (validate only)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Parse command line arguments
function parseArgs(args) {
    const result = {
        solution: [],
        narrative: '',
        difficulty: '',
        dryRun: false,
        json: false
    };
    
    let i = 0;
    while (i < args.length) {
        const arg = args[i];
        
        if (arg === '--dry-run') {
            result.dryRun = true;
            i++;
        } else if (arg === '--json') {
            result.json = true;
            i++;
        } else if (arg === '--solution') {
            i++;
            // Collect all words until we hit another flag or end
            while (i < args.length && !args[i].startsWith('--')) {
                result.solution.push(args[i].toUpperCase().trim());
                i++;
            }
        } else if (arg === '--narrative') {
            i++;
            // Collect narrative (might be quoted as single arg or multiple args)
            const narrativeParts = [];
            while (i < args.length && !args[i].startsWith('--')) {
                narrativeParts.push(args[i]);
                i++;
            }
            result.narrative = narrativeParts.join(' ');
        } else if (arg === '--difficulty') {
            i++;
            if (i < args.length) {
                result.difficulty = args[i].toUpperCase();
                i++;
            }
        } else {
            i++;
        }
    }
    
    return result;
}

// Load the bigram index
function loadBigramIndex() {
    const indexPath = path.join(projectRoot, 'bigram-index.txt');
    
    if (!fs.existsSync(indexPath)) {
        console.error('❌ Error: bigram-index.txt not found.');
        console.error('   Run: node scripts/build-bigram-index.js');
        process.exit(1);
    }
    
    const content = fs.readFileSync(indexPath, 'utf-8');
    const lines = content.split('\n')
        .filter(line => line.trim() && !line.startsWith('#'));
    
    return new Set(lines);
}

// Validate the puzzle
function validatePuzzle(solution, bigramIndex) {
    const errors = [];
    const conflicts = [];
    
    // Check solution length
    if (solution.length !== 9) {
        errors.push(`Expected 9 words, got ${solution.length}`);
    }
    
    // Check for duplicate words within the puzzle
    const wordSet = new Set(solution);
    if (wordSet.size !== solution.length) {
        errors.push('Puzzle contains duplicate words');
    }
    
    // Check each bigram for uniqueness
    for (let i = 0; i < solution.length - 1; i++) {
        const word1 = solution[i];
        const word2 = solution[i + 1];
        const bigram = `${word1}→${word2}`;
        const reverseBigram = `${word2}→${word1}`;
        
        if (bigramIndex.has(bigram)) {
            conflicts.push({
                position: i + 1,
                pair: `${word1}→${word2}`,
                type: 'exact'
            });
        }
        
        // Also check reverse order (per verify-puzzle-pairs.js behavior)
        if (bigramIndex.has(reverseBigram)) {
            conflicts.push({
                position: i + 1,
                pair: `${word1}→${word2}`,
                reversePair: `${word2}→${word1}`,
                type: 'reverse'
            });
        }
    }
    
    return { errors, conflicts };
}

// Add puzzle to puzzles.ts
function addPuzzleToPuzzlesFile(solution, narrative, difficulty) {
    const puzzlesPath = path.join(projectRoot, 'puzzles.ts');
    let content = fs.readFileSync(puzzlesPath, 'utf-8');
    
    // Find the closing bracket of the array
    const lastBracketIndex = content.lastIndexOf('];');
    
    if (lastBracketIndex === -1) {
        throw new Error('Could not find closing bracket of PREGENERATED_PUZZLES array');
    }
    
    // Format the new puzzle
    const solutionStr = solution.map(w => `"${w}"`).join(', ');
    const newPuzzle = `    {
        solution: [${solutionStr}],
        narrative: "${narrative.replace(/"/g, '\\"')}",
        difficulty: '${difficulty}'
    },\n`;
    
    // Insert before the closing bracket
    content = content.slice(0, lastBracketIndex) + newPuzzle + content.slice(lastBracketIndex);
    
    fs.writeFileSync(puzzlesPath, content, 'utf-8');
}

// Update the bigram index
function updateBigramIndex(solution) {
    const indexPath = path.join(projectRoot, 'bigram-index.txt');
    let content = fs.readFileSync(indexPath, 'utf-8');
    
    // Extract existing bigrams (excluding header)
    const lines = content.split('\n');
    const headerLines = lines.filter(line => line.startsWith('#') || line.trim() === '');
    const bigramLines = lines.filter(line => line.trim() && !line.startsWith('#'));
    
    // Add new bigrams
    const newBigrams = [];
    for (let i = 0; i < solution.length - 1; i++) {
        const bigram = `${solution[i]}→${solution[i + 1]}`;
        if (!bigramLines.includes(bigram)) {
            newBigrams.push(bigram);
        }
    }
    
    // Combine and sort
    const allBigrams = [...bigramLines, ...newBigrams].sort();
    
    // Update header with new count
    const puzzleCountMatch = headerLines.join('\n').match(/# Total puzzles: (\d+)/);
    const bigramCountMatch = headerLines.join('\n').match(/# Total unique bigrams: (\d+)/);
    
    let updatedHeader = headerLines.join('\n');
    if (puzzleCountMatch) {
        const newCount = parseInt(puzzleCountMatch[1]) + 1;
        updatedHeader = updatedHeader.replace(/# Total puzzles: \d+/, `# Total puzzles: ${newCount}`);
    }
    if (bigramCountMatch) {
        updatedHeader = updatedHeader.replace(/# Total unique bigrams: \d+/, `# Total unique bigrams: ${allBigrams.length}`);
    }
    updatedHeader = updatedHeader.replace(/# Generated: .*/, `# Generated: ${new Date().toISOString()}`);
    
    // Write updated index
    fs.writeFileSync(indexPath, updatedHeader + '\n' + allBigrams.join('\n') + '\n', 'utf-8');
}

// Main
const args = parseArgs(process.argv.slice(2));

// Validate required arguments
if (args.solution.length === 0) {
    console.error('❌ Error: --solution is required');
    console.error('Usage: node scripts/add-puzzle.js --solution "WORD1" "WORD2" ... --narrative "..." --difficulty EASY');
    process.exit(1);
}

if (!args.dryRun && !args.narrative) {
    console.error('❌ Error: --narrative is required (unless using --dry-run)');
    process.exit(1);
}

const validDifficulties = ['EASY', 'HARD', 'IMPOSSIBLE'];
if (!args.dryRun && !validDifficulties.includes(args.difficulty)) {
    console.error(`❌ Error: --difficulty must be one of: ${validDifficulties.join(', ')}`);
    process.exit(1);
}

// Load index and validate
const bigramIndex = loadBigramIndex();
const { errors, conflicts } = validatePuzzle(args.solution, bigramIndex);

// Output results
if (args.json) {
    const result = {
        valid: errors.length === 0 && conflicts.length === 0,
        solution: args.solution,
        errors,
        conflicts,
        dryRun: args.dryRun
    };
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.valid ? 0 : 1);
}

// Human-readable output
console.log('\n🔍 Validating puzzle...\n');
console.log(`Solution: [${args.solution.map(w => `"${w}"`).join(', ')}]\n`);

if (errors.length > 0) {
    console.log('❌ Validation errors:');
    errors.forEach(e => console.log(`   - ${e}`));
}

if (conflicts.length > 0) {
    console.log('❌ Bigram conflicts:');
    conflicts.forEach(c => {
        if (c.type === 'exact') {
            console.log(`   - Pair ${c.position}: ${c.pair} (already exists)`);
        } else {
            console.log(`   - Pair ${c.position}: ${c.pair} (reverse ${c.reversePair} exists)`);
        }
    });
}

if (errors.length === 0 && conflicts.length === 0) {
    console.log('✅ All 8 bigrams are unique!\n');
    
    if (args.dryRun) {
        console.log('🔸 Dry run mode - puzzle was NOT added');
        console.log('   Remove --dry-run to add the puzzle to puzzles.ts');
    } else {
        // Add the puzzle
        try {
            addPuzzleToPuzzlesFile(args.solution, args.narrative, args.difficulty);
            updateBigramIndex(args.solution);
            console.log('✅ Puzzle added to puzzles.ts');
            console.log('✅ Bigram index updated');
        } catch (err) {
            console.error(`❌ Error adding puzzle: ${err.message}`);
            process.exit(1);
        }
    }
} else {
    console.log('\n❌ Puzzle validation failed. Fix the conflicts above before adding.');
    process.exit(1);
}
