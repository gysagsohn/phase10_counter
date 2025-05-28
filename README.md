# Phase 10 Tracker

A single-page React app to track your Phase 10 games with friends.

## Overview

Track your Phase 10 games using a clean, responsive React + MUI interface.  
Built to help you manage players, scores, phases, and dealer rotation in real time.

## Deployed
**Live Demo**: [phase10tracker.netlify.app](https://phase10tracker.netlify.app/)

## 🧩 Features

- ✅ Add/edit/remove/reorder players (2–6)
- ✅ Prevent duplicate player names (setup & edit mode)
- ✅ Set initial dealer
- ✅ Round-based score & phase tracking
- ✅ Only one player must pass phase per round to proceed
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
  - [x] Validates scores as positive integers

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
- [ ] Can select player count (2–6 only)
- [ ] All player name inputs:
  - [ ] Cannot be empty or whitespace-only
  - [ ] Must be unique (duplicate names show error)
- [ ] Dealer dropdown:
  - [ ] Only shows valid player names
  - [ ] Must be selected to proceed
- [ ] “Start Game” button:
  - [ ] Only enabled when all validation passes

### Editing Players
- [ ] Can toggle edit mode on/off
- [ ] Can edit player names:
  - [ ] Duplicate names show input error
  - [ ] Whitespace-only names are rejected or trimmed
- [ ] Can reorder players (Up/Down icons)
- [ ] Can delete players
- [ ] Dealer selection updates correctly

### Phase Tracker (Round Entry)
- [ ] Score input:
  - [ ] Accepts only positive integers
  - [ ] Rejects negatives, decimals, non-numbers
  - [ ] Empty inputs default to 0
- [ ] “Passed Phase” checkboxes:
  - [ ] At least one player must pass phase
- [ ] Round submission is blocked unless:
  - [ ] A score is entered **or**
  - [ ] At least one phase is passed
- [ ] Inputs reset between rounds

### ScoreTable
- [ ] Displays player name, total score, current phase
- [ ] Edit toggle allows inline changes
- [ ] All values remain synced with game state

### Dealer Logic
- [ ] Dealer rotates each round (wraps at end)
- [ ] Dealer is correctly highlighted in UI

### Winner Detection & Tie-Breaker
- [ ] Phase 10 + lowest score triggers winner
- [ ] Confetti triggers on winner
- [ ] Tie (multiple players finish Phase 10 with same score):
  - [ ] Enters tie-breaker mode
  - [ ] Only tied players continue at Phase 10
  - [ ] Declares winner when one wins tie-breaker

### LocalStorage Persistence
- [ ] Reload restores:
  - [ ] Players, scores, phases
  - [ ] Dealer and tie-breaker state
- [ ] Reset button clears all saved data

### New Game Functionality
- [ ] Clicking “New Game” opens confirmation dialog
- [ ] “Cancel” dismisses with no change
- [ ] “Start New Game”:
  - [ ] Clears all scores, phases, and players
  - [ ] Returns to setup screen with:
    - [ ] Select number of players
    - [ ] Enter unique player names
    - [ ] Choose starting dealer

### Responsive Design
- [ ] Layout adapts to mobile (e.g., 375px width)
- [ ] Buttons and inputs remain accessible
- [ ] No layout overflow or cut-off content

###  Accessibility & Usability
- [ ] All buttons/inputs have labels
- [ ] Color contrast is readable
- [ ] Tab/keyboard navigation works correctly
- [ ] Focus states are visible and helpful

###  Additional Manual Testing
- [ ] Play full game with:
  - [ ] 2 players
  - [ ] 4 players
  - [ ] 6 players
- [ ] Mid-game score edits work
- [ ] Tie-breaker works with reload
- [ ] Dealer change works mid-game (in edit mode)
- [ ] All error handling works as expected

### Save/Load Game
- [ ] “Save Game”:
  - [ ] Saves current player list, phases, scores, and dealer
  - [ ] Tooltip explains only one save slot
  - [ ] Snackbar confirms save
- [ ] “Load Game”:
  - [ ] Prompts confirmation if a game is already in progress
  - [ ] Loads saved game into state
  - [ ] Shows alert if no save exists


# Made by Gy Sohn
Let me know when you're ready to start coding the `PlayerList.jsx` and I'll guide you step-by-step.
