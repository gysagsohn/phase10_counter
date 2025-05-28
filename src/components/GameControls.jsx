import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack
} from '@mui/material';
import { useState } from 'react';
import { useGameUpdate } from '../contexts/GameContext';

export default function GameControls({ onNewGame }) {
  const { fullResetGame } = useGameUpdate();
  const [open, setOpen] = useState(false);

  const handleNewGameClick = () => {
    setOpen(true); // Show confirmation dialog
  };

  const handleConfirm = () => {
    fullResetGame();    // Clear game data
    onNewGame();        // Tell HomePage to show setup screen
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" color="error" onClick={handleNewGameClick}>
          New Game
        </Button>
      </Stack>

      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Start New Game?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will reset all players, scores, and progress. Are you sure you want to start a new game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Start New Game
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
