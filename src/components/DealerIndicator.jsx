import {
  Box,
  Chip,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { useGameData, useGameUpdate } from '../contexts/GameContext';

export default function DealerIndicator() {
  const { players, dealerIndex } = useGameData();
  const { setDealer } = useGameUpdate();

  if (players.length === 0) return null;

  const currentDealer = players[dealerIndex]?.name;
  const nextDealer = players[(dealerIndex + 1) % players.length]?.name;

  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Current Dealer
      </Typography>
      <Select
        value={currentDealer}
        onChange={(e) => {
          const newDealerIndex = players.findIndex(
            (p) => p.name === e.target.value
          );
          if (newDealerIndex !== -1) setDealer(newDealerIndex);
        }}
        size="small"
        sx={{ mb: 1 }}
      >
        {players.map((p, i) => (
          <MenuItem key={i} value={p.name}>
            {p.name}
          </MenuItem>
        ))}
      </Select>

      <Stack spacing={1} sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Next Dealer:
        </Typography>
        <Chip label={nextDealer} color="default" size="small" />
      </Stack>
    </Box>
  );
}
