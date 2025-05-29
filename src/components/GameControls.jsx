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

  const [openConfirm, setOpenConfirm] = useState(false); // new game
  const [openLoadConfirm, setOpenLoadConfirm] = useState(false);
  const [openSaveConfirm, setOpenSaveConfirm] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleNewGameClick = () => setOpenConfirm(true);
  const handleConfirmNewGame = () => {
    fullResetGame();
    onNewGame();
    setOpenConfirm(false);
  };

  const alreadySaved = localStorage.getItem('phase10-savedGame');

  const handleSaveGame = () => {
    if (alreadySaved) {
      setOpenSaveConfirm(true); // prompt overwrite confirm
    } else {
      saveGame();
      setSnackbarOpen(true);
    }
  };

  const handleLoadGame = () => {
    if (players.length > 0) {
      setOpenLoadConfirm(true); // ask to overwrite current game
    } else {
      attemptLoadGame();
    }
  };

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
        <Tooltip title="Saves your current game. Only one save slot is available.">
          <Button variant="contained" color="primary" onClick={handleSaveGame}>
            Save Game
          </Button>
        </Tooltip>

        <Tooltip title="Loads your last saved game. This will replace current progress.">
          <Button variant="contained" color="primary" onClick={handleLoadGame}>
            Load Game
          </Button>
        </Tooltip>

        <Button variant="contained" color="primary" onClick={handleNewGameClick}>
          New Game
        </Button>
      </Stack>

      {/* New Game Dialog */}
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

      {/* Load Game Dialog */}
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

      {/* Save Game Dialog */}
      <Dialog open={openSaveConfirm} onClose={() => setOpenSaveConfirm(false)}>
        <DialogTitle>Overwrite Saved Game?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will overwrite your previous saved game. Only one save slot is available.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSaveConfirm(false)}>Cancel</Button>
          <Button
            onClick={() => {
              saveGame();
              setSnackbarOpen(true);
              setOpenSaveConfirm(false);
            }}
            color="primary"
            variant="contained"
          >
            Save Game
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for save feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Game saved! Only the latest save is kept."
      />
    </Box>
  );
}
