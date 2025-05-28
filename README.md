# Phase 10 Tracker

A single-page React app to track your Phase 10 games with friends.

## Overview

Track your Phase 10 games using a clean, responsive React + MUI interface.  
Built to help you manage players, scores, phases, and dealer rotation in real time.

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
- ✅ Game reset confirmation modal
- ✅ Fully responsive (mobile-friendly)
- ✅ LocalStorage save & restore

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

## Tech Stack

- React (Vite)
- Material UI (MUI)
- JavaScript (ES6)
- React Context / useState
- LocalStorage

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


# Made by Gy Sohn
Let me know when you're ready to start coding the `PlayerList.jsx` and I'll guide you step-by-step.
