import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';
import DealerIndicator from '../components/DealerIndicator';
import GameControls from '../components/GameControls';
import PhaseTracker from '../components/PhaseTracker';
import PlayerList from '../components/PlayerList';
import ScoreTable from '../components/ScoreTable';
import { useGameData } from '../contexts/GameContext';

function HomePage() {
  const { winner, tieBreakerActive } = useGameData();
  const winnerRef = useRef(null);

  useEffect(() => {
    if (winner && !Array.isArray(winner) && winnerRef.current) {
      winnerRef.current.scrollIntoView({ behavior: 'smooth' });
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  }, [winner]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Phase 10 Tracker
      </Typography>

      <Box sx={{ my: 3 }}>
        <PlayerList />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ my: 3 }}>
        <ScoreTable />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ my: 3 }}>
        <PhaseTracker />
        <DealerIndicator />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ my: 3 }}>
        <GameControls />
      </Box>

      {winner && (
        <Box ref={winnerRef} sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="success.main">
            {Array.isArray(winner)
              ? `Tied! Replay Phase 10 between: ${winner.join(', ')}`
              : `${winner.name} wins Phase 10!`}
          </Typography>
          {tieBreakerActive && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              All other players have been removed. Replay Phase 10 to decide the winner.
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
}

export default HomePage;