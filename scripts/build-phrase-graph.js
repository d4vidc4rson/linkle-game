#!/usr/bin/env node

/**
 * Build Phrase Graph
 *
 * Reads the phrase corpus (WORD1→WORD2 lines) and builds a transition graph:
 * for each word, the list of words that can follow it in a valid phrase.
 * Used by generate-chain-candidates.js for Markov-style chain generation.
 *
 * Usage:
 *   node scripts/build-phrase-graph.js
 *
 * Input:  scripts/data/phrase-corpus.txt (or --corpus path)
 * Output: scripts/data/phrase-graph.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const dataDir = path.join(projectRoot, 'scripts', 'data');

const DEFAULT_CORPUS = path.join(dataDir, 'phrase-corpus.txt');
const DEFAULT_OUTPUT = path.join(dataDir, 'phrase-graph.json');

function parseArgs(args) {
    let corpus = DEFAULT_CORPUS;
    let output = DEFAULT_OUTPUT;
    let i = 0;
    while (i < args.length) {
        if (args[i] === '--corpus' && args[i + 1]) {
            corpus = args[++i];
            i++;
        } else if (args[i] === '--output' && args[i + 1]) {
            output = args[++i];
            i++;
        } else {
            i++;
        }
    }
    return { corpus, output };
}

function loadCorpus(corpusPath) {
    if (!fs.existsSync(corpusPath)) {
        console.error(`❌ Error: corpus not found at ${corpusPath}`);
        console.error('   Create scripts/data/phrase-corpus.txt (WORD1→WORD2 per line) or seed from bigram-index.');
        process.exit(1);
    }
    const content = fs.readFileSync(corpusPath, 'utf-8');
    const lines = content
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'));
    return lines;
}

function buildGraph(lines) {
    const transitions = new Map(); // word -> Set of next words
    const startWords = new Set();

    for (const line of lines) {
        const arrow = line.indexOf('→');
        if (arrow === -1) continue;
        const word1 = line.slice(0, arrow).trim().toUpperCase();
        const word2 = line.slice(arrow + 1).trim().toUpperCase();
        if (!word1 || !word2) continue;

        startWords.add(word1);
        if (!transitions.has(word1)) {
            transitions.set(word1, new Set());
        }
        transitions.get(word1).add(word2);
    }

    // Convert Sets to arrays for JSON
    const transitionsObj = {};
    for (const [word, nextSet] of transitions) {
        transitionsObj[word] = [...nextSet].sort();
    }

    return {
        transitions: transitionsObj,
        startWords: [...startWords].sort(),
        stats: {
            uniqueWords: transitions.size,
            startWordCount: startWords.size,
            bigramCount: lines.filter((l) => l.includes('→')).length,
        },
    };
}

// Main
const { corpus, output } = parseArgs(process.argv.slice(2));
const lines = loadCorpus(corpus);
const graph = buildGraph(lines);

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(graph, null, 2), 'utf-8');

console.log('✅ Phrase graph built successfully');
console.log(`   Corpus: ${corpus}`);
console.log(`   Output: ${output}`);
console.log(`   Stats: ${graph.stats.bigramCount} bigrams → ${graph.stats.uniqueWords} words, ${graph.stats.startWordCount} start words`);
