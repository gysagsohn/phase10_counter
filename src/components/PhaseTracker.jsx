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
import { useEffect, useState } from 'react';
import { useGameData, useGameUpdate } from '../contexts/GameContext';

export default function PhaseTracker() {
  const { players } = useGameData();
  const { applyRoundResults, nextDealer } = useGameUpdate();

  const [roundData, setRoundData] = useState([]);

  const [showError, setShowError] = useState(false);

  // Sync round data when players change
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
      const valid = /^\d*$/.test(value); // Only digits
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

    // Reset round data
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
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <Typography sx={{ width: 120 }}>{player.name}</Typography>

              <TextField
                label="Round Score"
                type="text"
                value={data.score}
                onChange={(e) =>
                  handleChange(index, 'score', e.target.value)
                }
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                size="small"
                sx={{ width: 100 }}
                error={data.scoreError}
                helperText={
                  data.scoreError ? 'Score must be a whole number' : ''
                }
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
              />
            </Stack>
          );
        })}
      </Stack>

      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3 }}>
        Next Round
      </Button>
    </Box>
  );
}
