import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useGameData, useGameUpdate } from '../contexts/GameContext';

export default function PhaseTracker() {
  const { players } = useGameData();
  const { applyRoundResults, nextDealer, undoLastRound } = useGameUpdate();

  const [roundData, setRoundData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [showUndoConfirm, setShowUndoConfirm] = useState(false);

  useEffect(() => {
    if (players && players.length > 0) {
      setRoundData(
        players.map((player) => ({
          name: player?.name ?? '',
          score: '',
          passedPhase: false,
          scoreError: false,
        }))
      );
    }
  }, [players]);

  const handleChange = (index, field, value) => {
    const updated = [...roundData];
    if (!updated[index]) return;

    if (field === 'score') {
      const valid = /^\d*$/.test(value);
      updated[index].score = value;
      updated[index].scoreError = !valid;
    } else {
      updated[index][field] = value;
    }

    setRoundData(updated);
    setShowError(false);
  };

  const isValidSubmission = () => {
    const atLeastOnePassed = roundData.some((entry) => entry.passedPhase);
    const atLeastOneScored = roundData.some(
      (entry) => entry.score && parseInt(entry.score) > 0
    );
    const allScoresValid = roundData.every((entry) => !entry.scoreError);
    return (atLeastOnePassed || atLeastOneScored) && allScoresValid;
  };

  const handleSubmit = () => {
    if (!isValidSubmission()) {
      setShowError(true);
      return;
    }

    const results = roundData.map((entry) => ({
      name: entry.name,
      score: parseInt(entry.score) || 0,
      passedPhase: entry.passedPhase,
    }));

    applyRoundResults(results);
    nextDealer();

    setRoundData(
      players.map((player) => ({
        name: player?.name ?? '',
        score: '',
        passedPhase: false,
        scoreError: false,
      }))
    );
    setShowError(false);
  };

  const handleUndoConfirm = () => {
    undoLastRound();
    setShowUndoConfirm(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Phase Progress (This Round)
      </Typography>

      {showError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Please ensure at least one player entered a score or passed their phase, and that all scores are whole numbers.
        </Alert>
      )}

      <Stack spacing={2}>
        {players.map((player, index) => {
          const data = roundData[index];
          if (!player || !data) return null;

          return (
            <Stack
              key={player.name}
              direction={{ xs: 'column', sm: 'row' }}
              alignItems="flex-start"
              spacing={1}
              sx={{
                borderBottom: '1px solid #ccc',
                pb: 1,
                mb: 1
              }}
            >
              <Typography sx={{ minWidth: 100 }}>{player.name}</Typography>

              <TextField
                label="Round Score"
                type="text"
                value={data.score}
                onChange={(e) => handleChange(index, 'score', e.target.value)}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                size="small"
                sx={{ width: 100 }}
                error={data.scoreError}
                helperText={data.scoreError ? 'Score must be a whole number' : ''}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.passedPhase}
                    onChange={(e) =>
                      handleChange(index, 'passedPhase', e.target.checked)
                    }
                  />
                }
                label="Passed Phase"
                sx={{
                  ml: { sm: 2 },
                  mt: { xs: -1, sm: 0 }
                }}
              />
            </Stack>
          );
        })}
      </Stack>

      {/* Action Buttons */}
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Next Round
        </Button>

        <Tooltip title="Undo the most recent round and restore previous scores/phases">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowUndoConfirm(true)}
          >
            Undo Last Round
          </Button>
        </Tooltip>
      </Stack>

      {/* Undo Confirmation Dialog */}
      <Dialog open={showUndoConfirm} onClose={() => setShowUndoConfirm(false)}>
        <DialogTitle>Undo Last Round?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will revert all score and phase updates from the most recent round.
            Are you sure you want to undo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUndoConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUndoConfirm} color="error" variant="contained">
            Undo Round
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
