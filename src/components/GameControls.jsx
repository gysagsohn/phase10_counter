import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material';
import { useState } from 'react';
import { useGameUpdate } from '../contexts/GameContext';

export default function GameControls() {
  const { resetGame } = useGameUpdate();
  const [open, setOpen] = useState(false);

  const handleResetClick = () => {
    setOpen(true); // Open confirmation dialog
  };

  const handleConfirm = () => {
    resetGame();   // Proceed with reset
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false); // Close dialog
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" color="error" onClick={handleResetClick}>
          Reset Game
        </Button>
      </Stack>

      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Confirm Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset the game? All player progress and scores will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
