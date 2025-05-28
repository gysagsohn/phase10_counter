import { Box, Chip, Stack, Typography } from '@mui/material';
import { useGameData } from '../contexts/GameContext';

export default function DealerIndicator() {
  const { players, dealerIndex } = useGameData();

  if (players.length === 0) return null;

  const currentDealer = players[dealerIndex]?.name;
  const nextDealer = players[(dealerIndex + 1) % players.length]?.name;

  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Current Dealer
      </Typography>
      <Chip label={currentDealer} color="primary" variant="filled" />

      <Stack spacing={1} sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Next Dealer:
        </Typography>
        <Chip label={nextDealer} color="default" size="small" />
      </Stack>
    </Box>
  );
}
