# Phase 10 Tracker

A single-page React app to track your Phase 10 games with friends.

## Overview

Track your Phase 10 games using a clean, responsive React + MUI interface.  
Built to help you manage players, scores, phases, and dealer rotation in real time.

## Deployed
**Live Demo**: [phase10tracker.netlify.app](https://phase10tracker.netlify.app/)

**Git Hub Repo**: https://github.com/gysagsohn/phase10_counter

## 🧩 Features

- ✅ Add/edit/remove/reorder players (2–6)
- ✅ Prevent duplicate player names (setup & edit mode)
- ✅ Set initial dealer
- ✅ Round-based score & phase tracking
- ✅ Score OR phase pass required per round (warning shown if not met)
- ✅ Scores must be positive integers
- ✅ Dealer rotates automatically each round
- ✅ Editable score table (toggle edit mode)
- ✅ Winner detection (Phase 10 + lowest score wins)
- ✅ Tie-breaker logic (replay Phase 10 if tied)
- ✅ Confetti celebration 🎉
- ✅ Auto-scroll to winner announcement
- ✅ "New Game" button resets app to setup screen (player count, names, dealer)
- ✅ Game reset confirmation modal
- ✅ Fully responsive (mobile-friendly)
- ✅ LocalStorage save & restore
- ✅ Undo last round with confirmation dialog and tooltip
- ✅ Save game to localStorage (only one save slot)
- ✅ Load saved game with overwrite warning
- ✅ Tooltips for Save/Load/New Game actions
- ✅ Prevent deleting current/next dealer without confirmation  
- ✅ Winner popup with confetti + “New Game” reset  
- ✅ Tie-breaker mode popup + auto-player filtering  
- ✅ Save game warns before overwriting (styled popup)  

---

## Project Progress

### ✅ Phase 1 — UI + Structure Setup

- [x] Vite + MUI project initialized
- [x] Folder structure created
- [x] `PlayerList.jsx`: Add/edit/reorder/remove players
- [x] Limit 2–6 players
- [x] Prevent duplicate names
- [x] Disable "Start Game" if fewer than 2 players
- [x] Display players with edit/delete/reorder
- [x] Dealer selection at setup & editable later

- [x] `ScoreTable.jsx`: Displays:
  - [x] Player name
  - [x] Current phase
  - [x] Running total
  - [x] Editable scores (via "Edit Scores" toggle)

- [x] `PhaseTracker.jsx`: 
  - [x] Round-based score entry
  - [x] "Passed phase?" toggle
  - [x] Requires one player to pass per round
  - [x]Scores must be whole numbers (no negatives or decimals)

- [x] `HomePage.jsx`: Combined layout and components


---

### ✅ Phase 2 — Game Logic + Flow

- [x] State: `players`, `dealerIndex`, `winner`, `tieBreakerActive`
- [x] Dealer auto-rotation logic
- [x] Round progression through `PhaseTracker`
- [x] Score & phase updates per round
- [x] Winner detection (must complete Phase 10 + lowest score)
- [x] Tie-breaker replay logic for tied winners
- [x] Reset game button + confirmation modal

---

### ✅ Phase 3 — Polish & Extras

- [x] LocalStorage saving (auto on change)
- [x] Restore session on reload
- [x] Confetti animation for winner 🎉
- [x] Auto-scroll to winner message
- [x] Responsive design with MUI layout
- [x] Mobile input optimizations for numbers
- [x] Toggle edit mode for ScoreTable
- [x] Validations:
  - [x] Duplicate name prevention
  - [x] Positive score inputs only
  - [x] One player must pass per round
- [x] Styled dialog for dealer deletion confirmation
- [x] Save game confirmation matches load game dialog style
- [x] Winner dialog with “New Game” button that resets game and closes popup

---

## Future Features (Optional v2)

- [ ] Export game as JSON/text
- [ ] Round history view
- [ ] Animate score updates
- [ ] Game sounds (deal, confirm, etc.)

---

## File structure

```
phase10-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── PlayerList.jsx
│   │   ├── ScoreTable.jsx
│   │   ├── PhaseTracker.jsx
│   │   ├── DealerIndicator.jsx
│   │   └── GameControls.jsx
│   ├
│   ├── pages/
│   │   └── HomePage.jsx
│   ├── App.jsx
│   └── main.jsx (Vite)
```

## Tech Stack

- React (Vite)
- Material UI (MUI)
- JavaScript (ES6)
- React Context / useState
- LocalStorage (manual JSON saving/loading)

## Getting Started

```bash
# Clone the repo
git clone https://github.com/gysagsohn/phase10_counter.git
cd phase10_counter

# Install dependencies
npm install

# Start dev server
npm run dev
```

## 🧪 Testing Checklist

### Setup Screen
- [X] Can select player count (2–6 only)
- [X] All player name inputs:
  - [X] Cannot be empty or whitespace-only
  - [X] Must be unique (duplicate names show error)
- [X] Dealer dropdown:
  - [X] Only shows valid player names
  - [X] Must be selected to proceed - no as they might not be chaning this
- [X] “Start Game” button:
  - [X] Only enabled when all validation passes

### Editing Players
- [X] Can toggle edit mode on/off
- [X] Can edit player names:
  - [X] Duplicate names show input error
  - [X] Whitespace-only names are rejected or trimmed
- [X] Can reorder players (Up/Down icons)
- [X] Can delete players
- [X] Dealer selection updates correctly

### Phase Tracker (Round Entry)
- [X] Score input:
  - [X] Accepts only positive integers
  - [X] Rejects negatives, decimals, non-numbers
  - [X] Empty inputs default to 0
- [X] “Passed Phase” checkboxes:
  - [X] At least one player must pass phase
- [X] Round submission is blocked unless:
  - [X] A score is entered **or**
  - [X] At least one phase is passed
- [X] Inputs reset between rounds

### ScoreTable
- [X] Displays player name, total score, current phase
- [X] Edit toggle allows inline changes
- [X] All values remain synced with game state

### Dealer Logic
- [X] Dealer rotates each round (wraps at end)
- [X] Dealer is correctly highlighted in UI

### Winner Detection & Tie-Breaker
- [X] Phase 10 + lowest score triggers winner
- [X] Confetti triggers on winner
- [X] Tie (multiple players finish Phase 10 with same score):
  - [X] Enters tie-breaker mode
  - [X] Only tied players continue at Phase 10
  - [X] Declares winner when one wins tie-breaker (with styled popup)

### LocalStorage Persistence
- [X] Reload restores:
  - [X] Players, scores, phases
  - [X] Dealer and tie-breaker state
- [X] Reset button clears all saved data

### New Game Functionality
- [X] Clicking “New Game” opens confirmation dialog
- [X] “Cancel” dismisses with no change
- [X] “Start New Game”:
  - [X] Clears all scores, phases, and players
  - [X] Returns to setup screen with:
    - [X] Select number of players
    - [X] Enter unique player names
    - [X] Choose starting dealer
[X] “New Game” in winner dialog:
  [X] Resets game cleanly
  [X] Closes dialog automatically

### Responsive Design
- [X] Layout adapts to mobile (e.g., 375px width)
- [X] Buttons and inputs remain accessible
- [X] No layout overflow or cut-off content

###  Accessibility & Usability
- [X] All buttons/inputs have labels
- [X] Color contrast is readable
- [X] Tab/keyboard navigation works correctly
- [X] Focus states are visible and helpful

###  Additional Manual Testing
- [X] Play full game with:
  - [X] 2 players
  - [X] 4 players
  - [X] 6 players
- [X] Mid-game score edits work
- [X] Tie-breaker works with reload
- [X] Dealer change works mid-game (in edit mode)
- [X] All error handling works as expected

### Save/Load Game
- [X]“Save Game”:
  - [X] Saves current player list, phases, scores, and dealer
  - [X] Tooltip explains only one save slot
  - [X] Snackbar confirms save
- [X]“Load Game”:
  - [X] Prompts confirmation if a game is already in progress
  - [X] Loads saved game into state



# Made by Gy Sohn
Let me know when you're ready to start coding the `PlayerList.jsx` and I'll guide you step-by-step.

> **Update Note (29 May 2025)**  
> Latest version adds improved tie-breaker logic, styled popups for save/load/winner actions, dealer delete warnings, and bug fixes for score/phase validation!