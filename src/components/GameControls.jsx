// GameControls.jsx

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Stack,
  Tooltip
} from '@mui/material';
import { useState } from 'react';
import { useGameData, useGameUpdate } from '../contexts/GameContext';

export default function GameControls({ onNewGame }) {
  const { fullResetGame, saveGame, loadGame } = useGameUpdate();
  const { players } = useGameData();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openLoadConfirm, setOpenLoadConfirm] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Confirm New Game Reset
  const handleNewGameClick = () => setOpenConfirm(true);
  const handleConfirmNewGame = () => {
    fullResetGame();
    onNewGame();
    setOpenConfirm(false);
  };

  // Save the current game
  const handleSaveGame = () => {
    saveGame();
    setSnackbarOpen(true);
  };

  // Load game logic — shows confirm if current players exist
  const handleLoadGame = () => {
    if (players.length > 0) {
      setOpenLoadConfirm(true); // Prompt user to confirm overwrite
    } else {
      attemptLoadGame();
    }
  };

  // Execute the load logic
  const attemptLoadGame = () => {
    const loaded = loadGame();
    if (!loaded) {
      alert('No saved game found.');
    }
    setOpenLoadConfirm(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent="center">

        {/* Tooltip: Save Game */}
        <Tooltip title="Saves your current game. Only one save slot is available.">
          <Button variant="contained" color="primary" onClick={handleSaveGame}>
            Save Game
          </Button>
        </Tooltip>

        {/* Tooltip: Load Game */}
        <Tooltip title="Loads your last saved game. This will replace current progress.">
          <Button variant="contained" color="primary" onClick={handleLoadGame}>
            Load Game
          </Button>
        </Tooltip>

        {/* New Game button */}
        <Button variant="contained" color="primary" onClick={handleNewGameClick}>
          New Game
        </Button>
      </Stack>

      {/* Confirm Dialog: New Game */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Start New Game?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will reset all players, scores, and progress. Continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleConfirmNewGame} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Dialog: Load Game Overwrite */}
      <Dialog open={openLoadConfirm} onClose={() => setOpenLoadConfirm(false)}>
        <DialogTitle>Overwrite Current Game?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will replace your current game with your most recent saved game.
            Only one save is kept at a time.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLoadConfirm(false)}>Cancel</Button>
          <Button onClick={attemptLoadGame} color="primary" variant="contained">
            Load Game
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar: Game Saved */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Game saved! Only the latest save is kept."
      />
    </Box>
  );
}
