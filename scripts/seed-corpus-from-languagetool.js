#!/usr/bin/env node

/**
 * Seed phrase corpus from LanguageTool compounds.txt
 *
 * Fetches the English compounds file, parses two-part hyphenated compounds
 * (e.g. snow-flake → SNOW→FLAKE), deduplicates against existing corpus,
 * and appends new bigrams. Run build-phrase-graph.js after.
 *
 * Usage:
 *   node scripts/seed-corpus-from-languagetool.js [--dry-run]
 *
 * Options:
 *   --dry-run   Only print what would be added; do not write phrase-corpus.txt
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const dataDir = path.join(projectRoot, 'scripts', 'data');

const LT_COMPOUNDS_URL =
  'https://raw.githubusercontent.com/languagetool-org/languagetool/master/languagetool-language-modules/en/src/main/resources/org/languagetool/resource/en/compounds.txt';
const CORPUS_PATH = path.join(dataDir, 'phrase-corpus.txt');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on('data', (ch) => chunks.push(ch));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      })
      .on('error', reject);
  });
}

function parseCompoundsLine(line) {
  line = line.trim();
  if (!line || line.startsWith('#')) return null;
  // Strip trailing + * ? $ and inline # comment
  line = line.replace(/\s*[+*?$].*$/, '').replace(/\s*#.*$/, '').trim();
  const parts = line.split('-');
  if (parts.length !== 2) return null;
  const a = parts[0].trim().toUpperCase().replace(/[^A-Z]/g, '');
  const b = parts[1].trim().toUpperCase().replace(/[^A-Z]/g, '');
  if (a.length < 2 || b.length < 2) return null;
  return `${a}→${b}`;
}

function loadExistingCorpus() {
  if (!fs.existsSync(CORPUS_PATH)) {
    return { header: [], bigrams: new Set() };
  }
  const content = fs.readFileSync(CORPUS_PATH, 'utf-8');
  const lines = content.split('\n');
  const header = [];
  const bigrams = new Set();
  let inHeader = true;
  for (const line of lines) {
    if (inHeader && (line.startsWith('#') || line.trim() === '')) {
      header.push(line);
      continue;
    }
    inHeader = false;
    const t = line.trim();
    if (t && t.includes('→')) bigrams.add(t);
  }
  return { header, bigrams };
}

function parseArgs(args) {
  return { dryRun: args.includes('--dry-run') };
}

async function main() {
  const { dryRun } = parseArgs(process.argv.slice(2));

  console.log('Fetching LanguageTool compounds.txt...');
  let text;
  try {
    text = await fetchText(LT_COMPOUNDS_URL);
  } catch (e) {
    console.error('❌ Fetch failed:', e.message);
    process.exit(1);
  }

  const lines = text.split(/\r?\n/);
  const extracted = new Set();
  for (const line of lines) {
    const bigram = parseCompoundsLine(line);
    if (bigram) extracted.add(bigram);
  }

  const { header, bigrams: existing } = loadExistingCorpus();
  const newBigrams = [...extracted].filter((b) => !existing.has(b)).sort();

  console.log(`   Parsed ${extracted.size} two-part compounds from LanguageTool`);
  console.log(`   Existing corpus: ${existing.size} bigrams`);
  console.log(`   New (not in corpus): ${newBigrams.length}`);

  if (newBigrams.length === 0) {
    console.log('\n✅ No new bigrams to add.');
    return;
  }

  if (dryRun) {
    console.log('\n🔸 Dry run — would add (first 20):');
    newBigrams.slice(0, 20).forEach((b) => console.log(`   ${b}`));
    if (newBigrams.length > 20) console.log(`   ... and ${newBigrams.length - 20} more`);
    return;
  }

  const allBigrams = [...existing, ...newBigrams].sort();
  const body = allBigrams.join('\n');
  const out = header.length ? header.join('\n') + '\n' + body + '\n' : body + '\n';
  fs.writeFileSync(CORPUS_PATH, out, 'utf-8');
  console.log(`\n✅ Appended ${newBigrams.length} bigrams to ${CORPUS_PATH}`);
  console.log('   Run: node scripts/build-phrase-graph.js');
}

main();
