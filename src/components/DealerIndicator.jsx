import {
  Chip,
  MenuItem,
  Paper,
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
    <Paper elevation={3} sx={{ p: 2, backgroundColor: '#e3f2fd', borderLeft: '5px solid #1976d2',  mt: { xs: 2, sm: 4 } }}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}
      >
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
        fullWidth
        sx={{ mb: 2, backgroundColor: 'white' }}
      >
        {players.map((p, i) => (
          <MenuItem key={i} value={p.name}>
            {p.name}
          </MenuItem>
        ))}
      </Select>

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Next Dealer:
        </Typography>
        <Chip
          label={nextDealer}
          size="medium"
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            fontWeight: 'bold'
          }}
        />
      </Stack>
    </Paper>
  );
}
