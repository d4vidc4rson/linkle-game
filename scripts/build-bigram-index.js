#!/usr/bin/env node

/**
 * Build Bigram Index Script
 * 
 * Generates a compact bigram-index.txt file from puzzles.ts
 * This index is used for O(1) uniqueness lookups during puzzle generation.
 * 
 * Usage:
 *   node scripts/build-bigram-index.js
 * 
 * Output:
 *   Creates/overwrites bigram-index.txt in the project root
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Read puzzles.ts file
const puzzlesFilePath = path.join(projectRoot, 'puzzles.ts');
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

// Build the set of all bigrams
const bigrams = new Set();

for (const solution of solutions) {
    for (let i = 0; i < solution.length - 1; i++) {
        const word1 = solution[i].toUpperCase().trim();
        const word2 = solution[i + 1].toUpperCase().trim();
        const bigram = `${word1}→${word2}`;
        bigrams.add(bigram);
    }
}

// Sort bigrams alphabetically for easier scanning
const sortedBigrams = [...bigrams].sort();

// Write to bigram-index.txt
const indexPath = path.join(projectRoot, 'bigram-index.txt');
const header = `# Bigram Index for Linkle Puzzles
# Generated: ${new Date().toISOString()}
# Total puzzles: ${solutions.length}
# Total unique bigrams: ${bigrams.size}
#
# Format: WORD1→WORD2 (one per line, sorted alphabetically)
# This file is auto-generated from puzzles.ts - do not edit manually.
# To regenerate: node scripts/build-bigram-index.js
#
`;

fs.writeFileSync(indexPath, header + sortedBigrams.join('\n') + '\n', 'utf-8');

console.log('✅ Bigram index built successfully!');
console.log(`   Puzzles processed: ${solutions.length}`);
console.log(`   Unique bigrams: ${bigrams.size}`);
console.log(`   Output: ${indexPath}`);

// Also output file size for comparison
const puzzlesSize = fs.statSync(puzzlesFilePath).size;
const indexSize = fs.statSync(indexPath).size;
const savings = ((1 - indexSize / puzzlesSize) * 100).toFixed(1);

console.log(`\n📊 Size comparison:`);
console.log(`   puzzles.ts: ${(puzzlesSize / 1024).toFixed(1)} KB`);
console.log(`   bigram-index.txt: ${(indexSize / 1024).toFixed(1)} KB`);
console.log(`   Token savings: ~${savings}%`);
