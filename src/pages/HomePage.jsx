import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from 'react';
import DealerIndicator from '../components/DealerIndicator';
import GameControls from '../components/GameControls';
import PhaseTracker from '../components/PhaseTracker';
import PlayerList from '../components/PlayerList';
import ScoreTable from '../components/ScoreTable';
import { useGameData, useGameUpdate } from '../contexts/GameContext';

function HomePage() {
  const { winner, tieBreakerActive } = useGameData();
  const { fullResetGame } = useGameUpdate();

  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const winnerRef = useRef(null);
  const [forceSetup, setForceSetup] = useState(false);

  // Tie-breaker alert popup
  useEffect(() => {
    if (tieBreakerActive) {
      setTimeout(() => {
        alert('Tie-breaker mode activated! Only tied players will continue. Replay Phase 10 to determine the final winner.');
      }, 500);
    }
  }, [tieBreakerActive]);

  // Confetti and winner popup
  useEffect(() => {
    if (winner && !Array.isArray(winner)) {
      setShowWinnerPopup(true);
      if (winnerRef.current) {
        winnerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  }, [winner]);

    const handleNewGame = () => {
      fullResetGame();           
      setForceSetup(true);       
    };
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {/* Title */}
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

      {/* Players */}
      <Box sx={{ my: 3 }}>
        <PlayerList forceSetup={forceSetup} clearForceSetup={() => setForceSetup(false)} />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Scores */}
      <Box sx={{ my: 3 }}>
        <ScoreTable />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Round Input + Dealer */}
      <Stack
        spacing={{ xs: 2, sm: 4 }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          my: 3,
          alignItems: { xs: 'flex-start', sm: 'stretch' },
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

      {/* Controls */}
      <Box sx={{ my: 3 }}>
        <GameControls onNewGame={handleNewGame} />
      </Box>

      {/* Winner Box */}
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

      {/* Styled Winner Dialog */}
      <Dialog open={showWinnerPopup} onClose={() => setShowWinnerPopup(false)}>
        <DialogTitle>🎉 Game Over</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {winner?.name} wins Phase 10!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowWinnerPopup(false)}>Close</Button>
          <Button
            onClick={() => {
              setShowWinnerPopup(false); 
              handleNewGame();          
            }}
            variant="contained"
            color="primary"
          >
            New Game
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default HomePage;
