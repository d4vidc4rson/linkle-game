#!/usr/bin/env node

/**
 * Generate Chain Candidates
 *
 * Uses the phrase graph to randomly walk 9-word chains, then validates
 * against the bigram index (uniqueness). Outputs only chains that pass.
 * Use these with add-puzzle.js (supply narrative + difficulty) to add puzzles.
 *
 * Usage:
 *   node scripts/generate-chain-candidates.js [--count N] [--output file.json] [--no-unique-check]
 *
 * Options:
 *   --count N           Try to output N valid chains (default: 10)
 *   --output path       Write chains to JSON file (default: stdout)
 *   --no-unique-check   Output all generated chains (for testing); ignore bigram index
 *   --find N            Use DFS to find up to N valid chains (slower but finds chains when random walk fails)
 *   --allow-one-reuse   Allow chains with at most one bigram already in the index (7+ unique required)
 *   --find-one-reuse N  DFS to find up to N chains with at most one used bigram (reliable way to get candidates)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const dataDir = path.join(projectRoot, 'scripts', 'data');

const PHRASE_GRAPH_PATH = path.join(dataDir, 'phrase-graph.json');
const BIGRAM_INDEX_PATH = path.join(projectRoot, 'bigram-index.txt');

function parseArgs(args) {
    let count = 10;
    let outputPath = null;
    let noUniqueCheck = false;
    let find = 0;
    let allowOneReuse = false;
    let findOneReuse = 0;
    let i = 0;
    while (i < args.length) {
        if (args[i] === '--count' && args[i + 1] != null) {
            count = Math.max(1, parseInt(args[++i], 10) || 10);
            i++;
        } else if (args[i] === '--output' && args[i + 1]) {
            outputPath = args[++i];
            i++;
        } else if (args[i] === '--no-unique-check') {
            noUniqueCheck = true;
            i++;
        } else if (args[i] === '--find' && args[i + 1] != null) {
            find = Math.max(1, parseInt(args[++i], 10) || 1);
            i++;
        } else if (args[i] === '--allow-one-reuse') {
            allowOneReuse = true;
            i++;
        } else if (args[i] === '--find-one-reuse' && args[i + 1] != null) {
            findOneReuse = Math.max(1, parseInt(args[++i], 10) || 1);
            i++;
        } else {
            i++;
        }
    }
    return { count, outputPath, noUniqueCheck, find, allowOneReuse, findOneReuse };
}

function loadPhraseGraph() {
    if (!fs.existsSync(PHRASE_GRAPH_PATH)) {
        console.error('❌ Error: phrase-graph.json not found.');
        console.error('   Run: node scripts/build-phrase-graph.js');
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(PHRASE_GRAPH_PATH, 'utf-8'));
}

function loadBigramIndex() {
    if (!fs.existsSync(BIGRAM_INDEX_PATH)) {
        console.error('❌ Error: bigram-index.txt not found.');
        console.error('   Run: node scripts/build-bigram-index.js');
        process.exit(1);
    }
    const content = fs.readFileSync(BIGRAM_INDEX_PATH, 'utf-8');
    const lines = content
        .split('\n')
        .filter((line) => line.trim() && !line.startsWith('#'));
    return new Set(lines);
}

function validateChain(chain, bigramIndex) {
    if (chain.length !== 9) return { valid: false, reason: 'length' };
    const wordSet = new Set(chain);
    if (wordSet.size !== 9) return { valid: false, reason: 'duplicate word' };
    for (let i = 0; i < chain.length - 1; i++) {
        const a = chain[i];
        const b = chain[i + 1];
        if (bigramIndex.has(`${a}→${b}`)) return { valid: false, reason: 'bigram used', pair: `${a}→${b}` };
        if (bigramIndex.has(`${b}→${a}`)) return { valid: false, reason: 'reverse bigram used', pair: `${b}→${a}` };
    }
    return { valid: true };
}

/** Allow at most one exact match; no reverse pairs allowed. */
function validateChainAllowOneReuse(chain, bigramIndex) {
    if (chain.length !== 9) return { valid: false };
    const wordSet = new Set(chain);
    if (wordSet.size !== 9) return { valid: false };
    let exactCount = 0;
    for (let i = 0; i < chain.length - 1; i++) {
        const a = chain[i];
        const b = chain[i + 1];
        if (bigramIndex.has(`${b}→${a}`)) return { valid: false };
        if (bigramIndex.has(`${a}→${b}`)) exactCount++;
    }
    return { valid: exactCount <= 1 };
}

function buildUnusedNext(graph, bigramIndex) {
    const { transitions } = graph;
    const unusedNext = {};
    for (const [w, nexts] of Object.entries(transitions)) {
        const valid = nexts.filter(
            (n) => !bigramIndex.has(`${w}→${n}`) && !bigramIndex.has(`${n}→${w}`)
        );
        if (valid.length) unusedNext[w] = valid;
    }
    return unusedNext;
}

function findChainsDFS(unusedNext, startPool, limit) {
    const found = [];
    const seen = new Set();

    function dfs(word, path) {
        if (path.length === 9) {
            found.push([...path]);
            return found.length >= limit;
        }
        const nexts = unusedNext[word];
        if (!nexts) return false;
        for (const n of nexts) {
            if (seen.has(n)) continue;
            seen.add(n);
            path.push(n);
            if (dfs(n, path)) return true;
            path.pop();
            seen.delete(n);
        }
        return false;
    }

    for (const start of startPool) {
        if (found.length >= limit) break;
        seen.clear();
        seen.add(start);
        if (dfs(start, [start])) break;
    }
    return found;
}

/** DFS on full graph allowing at most one "used" bigram; no reverse pairs. */
function findChainsDFSAllowOneReuse(graph, bigramIndex, limit) {
    const { transitions, startWords } = graph;
    const found = [];

    function dfs(word, path, usedBudget) {
        if (path.length === 9) {
            found.push([...path]);
            return found.length >= limit;
        }
        const nexts = transitions[word];
        if (!nexts) return false;
        for (const n of nexts) {
            if (path.includes(n)) continue;
            const reverse = `${n}→${word}`;
            if (bigramIndex.has(reverse)) continue;
            const edgeUsed = bigramIndex.has(`${word}→${n}`);
            if (edgeUsed && usedBudget <= 0) continue;
            const newBudget = edgeUsed ? usedBudget - 1 : usedBudget;
            path.push(n);
            if (dfs(n, path, newBudget)) return true;
            path.pop();
        }
        return false;
    }

    for (const start of startWords) {
        if (found.length >= limit) break;
        if (dfs(start, [start], 1)) break;
    }
    return found;
}

function getStartWordsWithUnusedEdge(graph, bigramIndex) {
    const { transitions, startWords } = graph;
    return startWords.filter((word) => {
        const nexts = transitions[word];
        if (!nexts || nexts.length === 0) return false;
        return nexts.some(
            (next) => !bigramIndex.has(`${word}→${next}`) && !bigramIndex.has(`${next}→${word}`)
        );
    });
}

function generateOneChain(graph, bigramIndex, requireUnique, startPool) {
    const { transitions, startWords } = graph;
    const pool = startPool && startPool.length ? startPool : startWords;
    if (!pool.length) return null;

    const chain = [];
    const used = new Set();
    const start = pool[Math.floor(Math.random() * pool.length)];
    chain.push(start);
    used.add(start);

    let current = start;
    for (let step = 0; step < 8; step++) {
        const nextOptions = transitions[current];
        if (!nextOptions || nextOptions.length === 0) return null;

        const candidates = nextOptions.filter((w) => !used.has(w));
        if (candidates.length === 0) return null;

        if (requireUnique) {
            const validCandidates = candidates.filter((next) => {
                const bigram = `${current}→${next}`;
                const rev = `${next}→${current}`;
                return !bigramIndex.has(bigram) && !bigramIndex.has(rev);
            });
            if (validCandidates.length === 0) return null;
            current = validCandidates[Math.floor(Math.random() * validCandidates.length)];
        } else {
            current = candidates[Math.floor(Math.random() * candidates.length)];
        }
        chain.push(current);
        used.add(current);
    }

    return chain;
}

function main() {
    const { count, outputPath, noUniqueCheck, find, allowOneReuse, findOneReuse } = parseArgs(process.argv.slice(2));

    const graph = loadPhraseGraph();
    const bigramIndex = noUniqueCheck && !allowOneReuse && findOneReuse === 0 ? new Set() : loadBigramIndex();

    let output;

    if (findOneReuse > 0) {
        output = findChainsDFSAllowOneReuse(graph, bigramIndex, findOneReuse);
        if (output.length === 0) {
            console.error('❌ No chain found with at most one reused bigram.');
            process.exit(1);
        }
    } else if (find > 0 && !noUniqueCheck && !allowOneReuse) {
        const unusedNext = buildUnusedNext(graph, bigramIndex);
        const startPool = getStartWordsWithUnusedEdge(graph, bigramIndex);
        if (startPool.length === 0) {
            console.error('❌ No start words have an unused outgoing edge.');
            process.exit(1);
        }
        output = findChainsDFS(unusedNext, startPool, find);
        if (output.length === 0) {
            console.error('❌ No path of length 9 found in unused-edge subgraph.');
            process.exit(1);
        }
    } else {
        const requireUnique = !noUniqueCheck && !allowOneReuse;
        const startPool = requireUnique ? getStartWordsWithUnusedEdge(graph, bigramIndex) : null;
        if (requireUnique && startPool && startPool.length === 0) {
            console.error('❌ No start words have an unused outgoing edge. Add more phrases to the corpus.');
            process.exit(1);
        }

        const maxAttempts = allowOneReuse ? count * 50000 : count * 5000;
        const validChains = [];
        let attempts = 0;
        const validator = allowOneReuse ? (c) => validateChainAllowOneReuse(c, bigramIndex) : (c) => validateChain(c, bigramIndex);

        while (validChains.length < count && attempts < maxAttempts) {
            attempts++;
            const chain = generateOneChain(graph, bigramIndex, requireUnique, startPool);
            if (!chain) continue;

            const result = validator(chain);
            if (!result.valid) continue;

            const key = chain.join('→');
            if (validChains.some((c) => c.join('→') === key)) continue;
            validChains.push(chain);
        }

        output = validChains.map((chain) => chain);

    }

    if (outputPath) {
        fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
        console.log(`✅ Wrote ${output.length} chain(s) to ${outputPath}`);
    } else {
        console.log(JSON.stringify(output, null, 2));
    }

    if (!noUniqueCheck && find === 0 && findOneReuse === 0 && output.length < count) {
        const hint = allowOneReuse
            ? `\n⚠️  Only ${output.length}/${count} chains found (allow-one-reuse).`
            : `\n⚠️  Only ${output.length}/${count} unique chains found. Try: --allow-one-reuse or --find 1`;
        console.error(hint);
    }
}

main();
