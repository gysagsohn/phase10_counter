import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useGameData, useGameUpdate } from '../contexts/GameContext';

export default function PhaseTracker() {
  const { players } = useGameData();
  const { applyRoundResults, nextDealer } = useGameUpdate();

  const [roundData, setRoundData] = useState(
    players.map((player) => ({
      name: player.name,
      score: '',
      passedPhase: false,
      scoreError: false,
    }))
  );
  const [showError, setShowError] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...roundData];

    if (field === 'score') {
      const valid = /^\d*$/.test(value); // Only digits allowed
      updated[index].score = value;
      updated[index].scoreError = !valid;
    } else {
      updated[index][field] = value;
    }

    setRoundData(updated);
    setShowError(false);
  };

  const isValidSubmission = () => {
    return roundData.some(
      (entry) =>
        (entry.score && parseInt(entry.score) > 0) || entry.passedPhase
    ) && roundData.every((entry) => !entry.scoreError);
  };

  const handleSubmit = () => {
    if (!isValidSubmission()) {
      setShowError(true);
      return;
    }

    const results = roundData.map((entry) => ({
      ...entry,
      score: parseInt(entry.score) || 0,
    }));

    applyRoundResults(results);
    nextDealer();

    // Reset round data
    setRoundData(
      players.map((player) => ({
        name: player.name,
        score: '',
        passedPhase: false,
        scoreError: false,
      }))
    );
    setShowError(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Phase Progress (This Round)
      </Typography>

      {showError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Please enter valid scores (0 or more) or passed phase before continuing.
        </Alert>
      )}

      <Stack spacing={2}>
        {players.map((player, index) => (
          <Stack
            key={player.name}
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Typography sx={{ width: 120 }}>{player.name}</Typography>
            <TextField
              label="Round Score"
              type="text"
              value={roundData[index].score}
              onChange={(e) =>
                handleChange(index, 'score', e.target.value)
              }
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              size="small"
              sx={{ width: 100 }}
              error={roundData[index].scoreError}
              helperText={
                roundData[index].scoreError
                  ? 'Score must be a whole number'
                  : ''
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={roundData[index].passedPhase}
                  onChange={(e) =>
                    handleChange(index, 'passedPhase', e.target.checked)
                  }
                />
              }
              label="Passed Phase"
            />
          </Stack>
        ))}
      </Stack>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Next Round
      </Button>
    </Box>
  );
}
