# The Official Chain Reaction Puzzlemaker's Guide

## Guiding Philosophy
Our goal is to create puzzles that are **clever, not obscure**. A great puzzle respects the player's intelligence and provides a satisfying "aha!" moment. The primary challenge should be a test of wordplay and logic, not a test of trivia (unless explicitly designed as a 'HARD' puzzle).

---

## Part I: Universal Rules (Non-Negotiable)
These two rules apply to ALL puzzles, regardless of their intended difficulty. A puzzle that violates either of these rules is fundamentally flawed and must be rejected or redesigned.

### 1. The Rule of Uniqueness
- **Definition:** Each connected word pair (e.g., `KEY`-`BOARD`) must be unique across the entire puzzle library. A pair used in one puzzle can never be used in another.
- **Purpose:** Ensures every puzzle provides a fresh challenge and prevents the game from becoming repetitive. It guarantees that each solution is a genuine discovery for the player.
- **Verification Method:** Before adding any puzzle, you MUST check every single word pair individually against the entire `puzzles.ts` file. Use grep or search to verify each of the 8 pairs in your 9-word chain is unique.

### 2. The Rule of Dyadic Integrity (The "Two-Word" Rule)
- **Definition:** Every link in the chain (`B` -> `C`) must be a valid, standalone connection, independent of the preceding word (`A`). The phrase "B C" must make sense on its own.
- **Purpose:** Maintains the core logic and fairness of the game. It prevents frustrating, illogical leaps.
- **Common Violations:**
  - **Three-word dependencies:** In a chain `CLOSED` -> `MINDED` -> `READER`, the link `MINDED` -> `READER` is invalid because "minded reader" is not a standard phrase. This is an illegal three-word dependency.
  - **Incomplete phrases:** `HOLE` -> `IN` -> `ONE` violates the rule because "HOLE IN" is not a complete phrase on its own—it requires "ONE" to form "HOLE-IN-ONE". The pair `HOLE`-`IN` does not stand alone.
  - **Prepositional dependencies:** Avoid pairs where one word is a preposition that only makes sense with the following word (e.g., `IN` -> `ONE` only works as part of "HOLE-IN-ONE").
- **Valid Examples:**
  - `SNOW` -> `FLAKE` = "SNOWFLAKE" ✓
  - `FLAKE` -> `OFF` = "FLAKE OFF" (verb phrase) ✓
  - `KEY` -> `RING` = "KEYRING" ✓
- **Invalid Examples:**
  - `HOLE` -> `IN` = "HOLE IN" (incomplete, needs third word) ✗
  - `MINDED` -> `READER` = "MINDED READER" (not a standard phrase) ✗
  - `BEHIND` -> `CLOSED` = "BEHIND CLOSED" (incomplete, needs "DOORS") ✗

---

## Part II: Difficulty-Specific Guidelines
These guidelines define the "art" of puzzle creation and allow us to precisely tune the player experience.

### Category: EASY
**Goal:** Cleverness through familiarity. The player should feel smart for seeing the connections.

- **Connections:** Must primarily use common, everyday compound words (`CARPOOL`, `HEADSTART`, `BOOKSHELF`) or universally known two-word phrases (`ROOM SERVICE`, `QUESTION MARK`).
- **Knowledge Base:** Must NOT rely on specialized knowledge. This includes:
  - No brand names.
  - No specific historical figures or events (unless universally known, e.g., "World War").
  - No niche pop culture references (movies, songs, TV shows).
  - No technical jargon.
- **Word Meanings:** Must use words with their most common, primary meanings. A slight, playful twist on a double meaning is acceptable only if both meanings are very common (e.g., "ISSUE" as a problem vs. a publication).
- **Example:** `SNOW` -> `FLAKE` -> `OFF` -> `KEY` -> `RING` -> `FINGER` -> `PAINT` -> `BRUSH` -> `FIRE` uses only common compound words and phrases.

### Category: HARD
**Goal:** A rewarding challenge gated by a single, "gettable" leap of knowledge or logic.

- **Structure:** The puzzle must contain one, or at most two, "gatekeeper" links. The rest of the chain should consist of 'EASY'-level connections. A puzzle is defined by its hardest link.
- **Gatekeeper Links:** A "gatekeeper" is a connection that requires a piece of specific, but *fair*, knowledge. Acceptable gatekeeper categories include:
  - **Well-Known Brands:** `MAKERS MARK`, `CRACKER BARREL`, `RANGE ROVER`, `SHARK TANK`. The brand should be widely recognizable, at least within a large region (e.g., North America).
  - **Major Pop Culture:** Landmark films (`FIGHT CLUB`), widely famous songs (`BAD ROMANCE`), or iconic TV shows (`LAW AND ORDER`). Avoid deep cuts or cult classics.
  - **Significant Historical/Technical Terms:** `AGENT ORANGE`, `GRIDIRON`. The term should be something a person could reasonably be expected to have encountered or be able to look up easily.
- **Conceptual Leaps:** May require a significant mental shift, such as from a literal object to a metaphorical concept (e.g., `HORSE` to `HORSEPOWER`).
- **Example:** `BREAD` -> `CRUMB` -> `TRAIL` -> `BLAZER` -> `BUTTON` -> `HOLE` -> `CARD` -> `SHARK` -> `TANK` has one gatekeeper (`SHARK TANK` TV show), with the rest being common compound words.

### Category: IMPOSSIBLE
**Goal:** Intentionally unfair, obscure, or inappropriate for a general audience. *To be used very sparingly.*

- **Gatekeeper Links:** The gatekeeper link is *not fair* and cannot be solved through logic by the vast majority of players. These include:
  - **Niche or Harmful Slang:** `CANDYFLIP`, `BAN HAMMER` (internet slang).
  - **Cult/Obscure Trivia:** `TANK GIRL`, `BEAT GENERATION` (literary movement), `GENERATION X` (demographic term).
  - **Adult/Sensitive/NSFW Content:** `GOLDEN SHOWER`, `BALL GAG`.
  - **Obscure Brand References:** `RAY-BAN` (while well-known, using it as a gatekeeper requires brand recognition).
- **Player Experience:** These puzzles are designed to be a hard stop. They do not typically provide a satisfying "aha!" moment. These should be excluded from standard gameplay.
- **Example:** `DEAD` -> `BEAT` -> `GENERATION` -> `X` -> `RAY` -> `BAN` -> `HAMMER` -> `TIME` -> `LAPSE` contains multiple gatekeepers (BEAT GENERATION, GENERATION X, BAN HAMMER, HAMMER TIME).

#### Advanced Strategy: Creating IMPOSSIBLE Puzzles
When creating IMPOSSIBLE puzzles, use these techniques to build effective chains:

1. **Start with Uncommon Words:** Begin your chain with less common words (e.g., `CELESTIAL`, `TROPHY`, `GOAT`) rather than very common ones (`DEAD`, `END`, `STREET`). This:
   - Reduces conflicts with existing puzzles
   - Sets a specific tone/domain
   - Opens pathways to gatekeepers

2. **Cascade Gatekeepers:** Don't add one gatekeeper at the end—build a chain of them. Stack multiple obscure references in sequence:
   - Example: `CELESTIAL` -> `ARCHANGEL` -> `MICHAEL` -> `JACKSON` -> `FIVE` -> `STAR` -> `TREK` -> `BICYCLE` -> `SHOP`
   - Contains: ARCHANGEL MICHAEL (religious), MICHAEL JACKSON (pop culture), JACKSON FIVE (pop culture), STAR TREK (pop culture), TREK BICYCLE (brand)

3. **Strategic Domain Mixing:** Combine different knowledge domains (religious, pop culture, brand names, technical terms) to require broad, specialized knowledge.

4. **Leverage Name Recognition:** Use well-known names (people, bands, shows) that still require specific knowledge to connect. This balances recognizability with difficulty.

5. **Every Pair Must Stand Alone:** Even in IMPOSSIBLE puzzles, every pair must satisfy Dyadic Integrity. No weak pairs like "END STREET" or "SIZE BED"—each connection must be a real, standalone phrase.

---

## Part III: Puzzle Creation Workflow

### Step 1: Brainstorm the Chain
Start with a word and build forward, ensuring each new word creates a valid pair with the previous one. Write down your 9-word chain.

#### Alternative Brainstorming Method: The "Friends Game"

When you need fresh ideas or want to create absurdist IMPOSSIBLE-level puzzles, try this collaborative approach:

**The Setup:**
Imagine 9 friends playing a word association game. Each friend must:
1. Connect their word to the previous friend's word
2. Make the connection absurd and funny (while still being explainable)
3. Use only ONE word (no phrases)
4. Keep connections real and understandable (not obtuse)

**Why This Works:**
- Creates natural cascades of creative leaps
- Produces memorable, entertaining puzzles
- Generates IMPOSSIBLE-level chains organically
- Reduces writer's block by making creation playful
- Each "friend" focuses on one connection, not the whole chain

**Example Session:**
- Friend 1: "BURRITO!"
- Friend 2: "BABY! Because you swaddle a baby like a burrito!"
- Friend 3: "SHOWER! Baby shower!"
- Friend 4: "KARAOKE! We all sing in the shower!"
- Friend 5: "TORTURE! Have you heard you sing karaoke?!"
- Friend 6: "MEDIEVAL! Like medieval torture devices!"
- Friend 7: "TIMES! Medieval Times, the restaurant!"
- Friend 8: "SQUARE! Times Square in New York!"
- Friend 9: "PANTS! SpongeBob SquarePants!"

**Result:**
`BURRITO` -> `BABY` -> `SHOWER` -> `KARAOKE` -> `TORTURE` -> `MEDIEVAL` -> `TIMES` -> `SQUARE` -> `PANTS`

This chain naturally produced multiple gatekeepers (BURRITO BABY internet culture, MEDIEVAL TIMES brand, SQUARE PANTS pop culture) while maintaining explainable connections—a perfect IMPOSSIBLE puzzle.

**When to Use This Method:**
- Creating IMPOSSIBLE puzzles with cascading gatekeepers
- Breaking through creative blocks
- Making puzzle creation more enjoyable
- Generating absurdist but coherent chains

### Step 2: Verify Dyadic Integrity
For each of the 8 pairs in your chain, ask: **"Does this pair make sense on its own, without needing a third word?"**

- ✅ Valid: `SNOW`-`FLAKE` = "SNOWFLAKE" (complete compound word)
- ✅ Valid: `FLAKE`-`OFF` = "FLAKE OFF" (complete verb phrase)
- ❌ Invalid: `HOLE`-`IN` = "HOLE IN" (incomplete, needs "ONE" to be "HOLE-IN-ONE")
- ❌ Invalid: `BEHIND`-`CLOSED` = "BEHIND CLOSED" (incomplete, needs "DOORS")

If any pair fails this test, **redesign that section of the chain**.

### Step 3: Check Pair Uniqueness
For EACH of the 8 pairs in your chain, search the `puzzles.ts` file to verify it doesn't already exist. Use grep or search for both word orders:
- Search for: `"WORD1".*"WORD2"` and `"WORD2".*"WORD1"`
- Check in both `solution` arrays and `narrative` strings

**Example verification:**
```bash
# Check if SNOW-FLAKE exists
grep -i "SNOW.*FLAKE\|FLAKE.*SNOW" puzzles.ts

# Check if FLAKE-OFF exists  
grep -i "FLAKE.*OFF\|OFF.*FLAKE" puzzles.ts

# Repeat for all 8 pairs
```

If ANY pair is found, **you must replace it** with a unique pair.

### Step 4: Verify Difficulty Classification
- **EASY:** All connections are common compound words/phrases. No brands, pop culture, or specialized knowledge.
- **HARD:** Contains 1-2 gatekeeper links (brands, major pop culture, or significant terms). Rest are EASY-level.
- **IMPOSSIBLE:** Contains unfair/obscure gatekeepers (niche slang, cult references, internet slang, etc.).

### Step 5: Write the Narrative
The narrative should clearly explain each connection in the chain. Each sentence should connect one word to the next, making the logic transparent once solved.

**Format:** "A [WORD1][WORD2] is [definition]. A [WORD2][WORD3] is [definition]..."

### Step 6: Final Verification Checklist
Before submitting a puzzle, verify:
- [ ] All 8 word pairs are unique (checked against entire `puzzles.ts` file)
- [ ] All 8 word pairs satisfy Dyadic Integrity (each pair stands alone)
- [ ] Difficulty classification is appropriate
- [ ] Narrative clearly explains each connection
- [ ] No three-word dependencies
- [ ] No incomplete phrases requiring a third word

---

## Part IV: Common Pitfalls to Avoid

### Pitfall 1: Three-Word Dependencies
**Bad:** `CLOSED` -> `MINDED` -> `READER`
- `MINDED`-`READER` doesn't work alone; it needs "CLOSED" to form "CLOSED-MINDED READER"

**Good:** `CLOSED` -> `DOOR` -> `BELL`
- Each pair (`CLOSED DOOR`, `DOOR BELL`) works independently

### Pitfall 2: Incomplete Phrases
**Bad:** `HOLE` -> `IN` -> `ONE`
- `HOLE`-`IN` is incomplete; it requires "ONE" to form "HOLE-IN-ONE"

**Good:** `HOLE` -> `CARD` -> `TRICK`
- Each pair (`HOLE CARD`, `CARD TRICK`) is complete

### Pitfall 3: Prepositional Dependencies
**Bad:** `BEHIND` -> `CLOSED` -> `DOORS`
- `BEHIND`-`CLOSED` is incomplete; it needs "DOORS"

**Good:** `BEHIND` -> `THE` -> `SCENES`
- Wait, `BEHIND`-`THE` also doesn't work alone. Better: `BEHIND` -> `SCHEDULE` -> `MEETING`

### Pitfall 4: Assuming Uniqueness
**Never assume a pair is unique.** Always verify by searching the entire `puzzles.ts` file. Common words like `KEY`, `BOARD`, `GAME`, `SHOW`, `ROOM`, `SERVICE` appear frequently and many of their combinations are already used.

### Pitfall 5: Difficulty Misclassification
- **EASY** should have ZERO gatekeepers. If you're using a brand name, pop culture reference, or specialized term, it's at least HARD.
- **HARD** should have 1-2 gatekeepers maximum. If you have 3+ gatekeepers, it's likely IMPOSSIBLE.
- **IMPOSSIBLE** should be intentionally unfair. Don't use it just because a puzzle is challenging—use it when the knowledge required is genuinely obscure or niche.

### Pitfall 6: Starting with Overly Common Words
**Problem:** Beginning chains with very common words (`DEAD`, `END`, `STREET`, `GAME`, `ROOM`) increases the likelihood of conflicts with existing puzzles and makes it harder to build toward gatekeepers.

**Solution:** Start with less common words that set a specific tone or domain. This reduces conflicts and opens pathways to gatekeepers.

**Bad Approach:**
- Starting with `DEAD` -> `END` -> `STREET` (all very common, high conflict risk)
- Trying to add gatekeepers at the end

**Good Approach:**
- Starting with `CELESTIAL` -> `ARCHANGEL` (less common, sets religious domain)
- Building a cascade of gatekeepers throughout the chain

### Pitfall 7: Adding Gatekeepers at the End
**Problem:** Trying to add a single gatekeeper at the end of a chain of common words doesn't create a true IMPOSSIBLE puzzle and often results in weak pairs.

**Solution:** Build a cascade of gatekeepers throughout the chain. For IMPOSSIBLE puzzles, stack multiple obscure references in sequence.

**Bad Approach:**
- `DEAD` -> `END` -> `STREET` -> `SMART` -> `PHONE` -> `BOOTH` -> `COW` -> `BOY` -> `GENIUS`
- Only one gatekeeper (BOOTH COW), rest are common

**Good Approach:**
- `CELESTIAL` -> `ARCHANGEL` -> `MICHAEL` -> `JACKSON` -> `FIVE` -> `STAR` -> `TREK` -> `BICYCLE` -> `SHOP`
- Multiple gatekeepers cascading through the chain

---

## Part V: Quality Examples

### Excellent EASY Puzzle
```
Solution: ["SNOW", "FLAKE", "OFF", "KEY", "RING", "FINGER", "PAINT", "BRUSH", "FIRE"]
```
- All pairs are common compound words/phrases
- No specialized knowledge required
- Each pair stands alone perfectly
- All pairs verified unique

### Excellent HARD Puzzle
```
Solution: ["BREAD", "CRUMB", "TRAIL", "BLAZER", "BUTTON", "HOLE", "CARD", "SHARK", "TANK"]
```
- 7 EASY-level connections (common compound words)
- 1 gatekeeper: `SHARK TANK` (well-known TV show)
- Perfect balance of challenge and fairness
- All pairs verified unique

### Excellent IMPOSSIBLE Puzzle (Example 1)
```
Solution: ["DEAD", "BEAT", "GENERATION", "X", "RAY", "BAN", "HAMMER", "TIME", "LAPSE"]
```
- Multiple gatekeepers: `BEAT GENERATION`, `GENERATION X`, `BAN HAMMER`, `HAMMER TIME`
- Requires knowledge of literary movements, demographics, internet slang, and pop culture
- Intentionally unfair for general audience
- All pairs verified unique

### Excellent IMPOSSIBLE Puzzle (Example 2 - Advanced Strategy)
```
Solution: ["CELESTIAL", "ARCHANGEL", "MICHAEL", "JACKSON", "FIVE", "STAR", "TREK", "BICYCLE", "SHOP"]
```
**Why This Works:**
- **Starts uncommon:** `CELESTIAL` is less common than typical starting words, reducing conflicts
- **Cascades gatekeepers:** Multiple obscure references in sequence:
  - `ARCHANGEL MICHAEL` (religious/biblical knowledge)
  - `MICHAEL JACKSON` (pop culture)
  - `JACKSON FIVE` (pop culture)
  - `STAR TREK` (pop culture)
  - `TREK BICYCLE` (brand name)
- **Strategic domain mixing:** Combines religious, pop culture, and brand references
- **Leverages name recognition:** Uses well-known names that still require specific knowledge
- **Every pair stands alone:** All 8 pairs satisfy Dyadic Integrity
- All pairs verified unique

**Key Takeaway:** This puzzle demonstrates the advanced strategy of starting uncommon and cascading gatekeepers, rather than starting common and adding one gatekeeper at the end.

---

## Final Reminder
**Quality over quantity.** It's better to spend time verifying one perfect puzzle than to rush and create flawed ones. When in doubt, check the rules again, verify uniqueness, and test dyadic integrity. A great puzzle is worth the effort.
