import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from 'react';
import DealerIndicator from '../components/DealerIndicator';
import GameControls from '../components/GameControls';
import PhaseTracker from '../components/PhaseTracker';
import PlayerList from '../components/PlayerList';
import ScoreTable from '../components/ScoreTable';
import { useGameData } from '../contexts/GameContext';

function HomePage() {
  const { winner, tieBreakerActive } = useGameData();
  const winnerRef = useRef(null);
  const [forceSetup, setForceSetup] = useState(false);

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

  const handleNewGame = () => {
    setForceSetup(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: '900',
            color: '#1976d2',
            letterSpacing: '0.1rem',
            textTransform: 'uppercase',
            fontFamily: 'Arial Black, sans-serif',
          }}
        >
          Phase 10 Tracker
        </Typography>
        <Box sx={{ display: 'flex', height: '6px', mt: 2 }}>
          <Box sx={{ flex: 1, backgroundColor: '#e53935' }} />
          <Box sx={{ flex: 1, backgroundColor: '#1e88e5' }} />
          <Box sx={{ flex: 1, backgroundColor: '#43a047' }} />
          <Box sx={{ flex: 1, backgroundColor: '#fdd835' }} />
        </Box>
      </Box>

      <Box sx={{ my: 3 }}>
        <PlayerList forceSetup={forceSetup} clearForceSetup={() => setForceSetup(false)} />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ my: 3 }}>
        <ScoreTable />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Stack
        spacing={2}
        sx={{
          my: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' }
        }}
      >
        <Box sx={{ width: '100%' }}>
          <PhaseTracker />
        </Box>
        <Box sx={{ width: '100%' }}>
          <DealerIndicator />
        </Box>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ my: 3 }}>
        <GameControls onNewGame={handleNewGame} />
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
