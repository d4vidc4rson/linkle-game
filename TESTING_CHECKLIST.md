# Daily Puzzle Mode - Testing Checklist

## Test 1: Play Through Full Day's Puzzles

### Steps:
1. **Reset today's puzzles** (if needed):
   - Go to All Done screen
   - Click "🔄 Reset Today (Testing)" button
   - Should return to intro screen

2. **Start daily mode**:
   - Navigate to `/` route (daily mode is now the default)
   - Should see "Brace yourself..." intro screen
   - Click "PLAY" button

3. **Play Easy puzzle**:
   - Should see Easy puzzle with 4 tries
   - Complete the puzzle (win or lose)
   - Should see win/loss message
   - Should see "NEXT PUZZLE" button (not "SHOW STATS")
   - Click "NEXT PUZZLE"

4. **Play Hard puzzle**:
   - Should see Hard puzzle with 3 tries
   - Complete the puzzle
   - Should see "NEXT PUZZLE" button
   - Click "NEXT PUZZLE"

5. **Play Impossible puzzle**:
   - Should see Impossible puzzle with 2 tries
   - Complete the puzzle
   - Should see "SHOW STATS" button (not "NEXT PUZZLE")
   - Click "SHOW STATS"

6. **Verify All Done screen**:
   - Should see stats screen with all three puzzle results
   - Should show correct win percentage
   - Should show correct score (accumulated from all three puzzles)
   - Should show correct streak

### Expected Results:
- ✅ Score accumulates correctly (e.g., Easy: 100 + Hard: 200 + Impossible: 500 = 800 total)
- ✅ Win percentage calculates correctly
- ✅ All three puzzles show in results
- ✅ "NEXT PUZZLE" appears for Easy and Hard
- ✅ "SHOW STATS" appears for Impossible

---

## Test 2: Archive/Replay Functionality

### Steps:
1. **Generate test schedule** (if needed):
   - Complete today's puzzles to get to All Done screen
   - Click "📅 Generate Test Schedule (5 days ago)" button
   - Refresh the page

2. **Access archive**:
   - From All Done screen, click "PLAY PUZZLES YOU MISSED"
   - Should see list of past dates

3. **Test first-time play of old date**:
   - Click "Play" on a date you haven't played before
   - Should see date displayed on right side of difficulty/tries line
   - Play through puzzles (can do just one to test)
   - **Verify**: Should get points, badges, and streaks
   - **Verify**: Score should accumulate

4. **Test replay of completed date**:
   - Go back to archive
   - Find a date where you completed all 3 puzzles
   - Should show "Replay" button (not "Play")
   - Click "Replay"
   - Play through a puzzle
   - **Verify**: Should see custom message ("You did it! Good replay" or "You still Stinkle...")
   - **Verify**: Should NOT get points or badges
   - **Verify**: Score should NOT change

5. **Verify archive updates**:
   - After completing all 3 puzzles for an old date, go back to archive
   - That date should now show "Replay" instead of "Play"
   - Should show "✓" and "3/3 puzzles completed"

### Expected Results:
- ✅ First-time plays of old dates award points/badges
- ✅ Replays show custom messages and don't award points
- ✅ Archive correctly shows "Play" vs "Replay" based on completion
- ✅ Date displays correctly on old puzzles

---

## Test 3: Share Functionality

### Steps:
1. **Complete all three puzzles** for today (or any date)

2. **Open share modal**:
   - On All Done screen, click "SHARE" button
   - Should see share modal with text preview

3. **Verify share text format**:
   - Should show "Linkle Daily #X - [Date]"
   - Should show status for each puzzle (✅ or ❌)
   - Should show three separate 3x3 grids with spacing between them
   - **For solved puzzles**: All purple squares (🟪)
   - **For lost puzzles**: Purple squares for correct positions, white for incorrect

4. **Test copy to clipboard**:
   - Click "Copy to Clipboard" button
   - Should show "Copied!" message
   - Paste somewhere to verify format
   - **Verify**: Grids are formatted as 3x3 (not single line)
   - **Verify**: Day number is correct

5. **Test share for different scenarios**:
   - Share with all 3 solved
   - Share with 2 solved, 1 lost
   - Share with all 3 lost (if possible)

### Expected Results:
- ✅ Share text formats correctly
- ✅ Grids show as 3x3 with spacing
- ✅ Purple squares for correct positions in lost puzzles
- ✅ Day number calculates from schedule start date
- ✅ Copy to clipboard works

---

## Edge Cases to Test

1. **Theme toggle**:
   - Toggle dark/light mode during gameplay
   - Puzzle should NOT reload
   - Colors should change

2. **Browser refresh**:
   - Play a puzzle, refresh browser
   - Should resume at correct puzzle
   - Should not lose progress

3. **Multiple days**:
   - Play puzzles from multiple different dates
   - Verify scores accumulate correctly
   - Verify archive shows all dates correctly

4. **Partial completion**:
   - Complete Easy and Hard, but not Impossible
   - Refresh page
   - Should resume at Impossible puzzle

---

## Known Issues to Watch For

- Score accumulation (should add, not replace)
- Win percentage calculation (should use daily puzzles only)
- Replay detection (should check if result exists, not just date)
- Archive date parsing (should handle timezones correctly)

