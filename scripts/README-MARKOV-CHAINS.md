# Markov-style chain generation

This pipeline generates 9-word chain **candidates** from a phrase graph, validates them for uniqueness, and lets you add puzzles with a narrative (by hand or one AI call). The **existing workflow** (designing chains by hand or with AI + `add-puzzle.js`) is unchanged.

## Quick start

```bash
# 1. Build the phrase graph (run after changing phrase-corpus or first time)
node scripts/build-phrase-graph.js

# 2. Generate candidate chains (valid ones only; writes to stdout or --output)
node scripts/generate-chain-candidates.js --count 10
node scripts/generate-chain-candidates.js --count 20 --output scripts/data/candidates.json

# 3. For each candidate you like, add the puzzle with narrative + difficulty
node scripts/add-puzzle.js --solution "WORD1" "WORD2" ... "WORD9" \
  --narrative "Your narrative here." --difficulty EASY
```

## Seeding the corpus (quick & free)

To pull in ~8k two-part compounds from LanguageTool and merge them into the corpus:

```bash
node scripts/seed-corpus-from-languagetool.js          # fetch, merge, append
node scripts/seed-corpus-from-languagetool.js --dry-run  # preview only
node scripts/build-phrase-graph.js                     # rebuild graph after
```

After seeding, the **unused-edge** subgraph (pairs not yet in any puzzle) may still not contain a path of 9 words. If you get 0 unique chains, try `--find 1` to search for a 9-word path; if none exists, add more phrase sources (e.g. LADEC or WordNet compound lists) to get longer connected paths.

## Files

| File | Purpose |
|------|--------|
| `scripts/data/phrase-corpus.txt` | Valid bigrams `WORD1→WORD2`, one per line. Seeded from `bigram-index.txt`. **Add more lines** from external phrase lists to get unique candidates. |
| `scripts/data/phrase-graph.json` | Transition graph (word → list of allowed next words). Generated; do not edit. |
| `scripts/build-phrase-graph.js` | Reads corpus → writes phrase-graph.json. |
| `scripts/seed-corpus-from-languagetool.js` | Fetches LanguageTool compounds, parses two-part hyphenated words, appends new bigrams to the corpus. |
| `scripts/generate-chain-candidates.js` | Random-walks 9-word chains, validates against bigram index, outputs only unique chains. |

## Options (generate-chain-candidates.js)

- `--count N` — Try to output N valid chains (default: 10).
- `--output path` — Write JSON array of chains to file instead of stdout.
- `--no-unique-check` — Output all generated chains (for testing); do not filter by bigram index.
- `--find N` — Use DFS to find up to N valid chains (use when random walk finds none).
- `--allow-one-reuse` — Allow chains where at most one of the 8 bigrams is already in the index (7+ unique required). Use to get many more candidates from the full phrase graph.
- `--find-one-reuse N` — DFS to find up to N chains with at most one reused bigram (reliable way to get candidates when random walk finds none).

## Getting more unique chains

The corpus is initially a copy of `bigram-index.txt`, so every pair in any generated chain is already used → you get **0** fully unique chains until the corpus is larger. You can use **`--allow-one-reuse`** to allow at most one reused bigram per chain (rule change): this uses the full graph and typically yields many candidates.

To get fully unique candidates (or more variety with one reuse allowed):

1. **Add more valid bigrams** to `scripts/data/phrase-corpus.txt` (one per line, `WORD1→WORD2`). Use any source: compound-word lists, phrase lists, etc. Order must be the correct phrase order (e.g. `ESCAPE→ROOM` not `ROOM→ESCAPE`).
2. Rebuild the graph: `node scripts/build-phrase-graph.js`
3. Run the generator again.

## Old workflow (unchanged)

- Design a 9-word chain yourself or with AI.
- Run:  
  `node scripts/add-puzzle.js --solution "W1" "W2" ... "W9" --narrative "..." --difficulty EASY`
- Use `--dry-run` to validate without adding.

No scripts were removed or replaced; this pipeline is additive.
