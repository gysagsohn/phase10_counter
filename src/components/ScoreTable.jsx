import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useState } from 'react';
import { useGameData, useGameUpdate } from '../contexts/GameContext';

// Sort players by highest phase, then lowest score
function getRankings(players) {
  return [...players].sort((a, b) => {
    if ((b.phase ?? 1) !== (a.phase ?? 1)) {
      return (b.phase ?? 1) - (a.phase ?? 1); // Higher phase wins
    }
    return (a.score ?? 0) - (b.score ?? 0); // Lower score wins
  });
}

// Assign medals based on final rankings if winner is declared
function assignMedals(rankedPlayers, winnerDeclared) {
  const medals = Array(rankedPlayers.length).fill(null);
  if (!winnerDeclared) return medals;

  let rank = 1;
  for (let i = 0; i < rankedPlayers.length; i++) {
    if (i > 0) {
      const prev = rankedPlayers[i - 1];
      const curr = rankedPlayers[i];
      if (curr.phase !== prev.phase || curr.score !== prev.score) {
        rank = i + 1;
      }
    }

    if (rank === 1) medals[i] = '🥇';
    else if (rank === 2) medals[i] = '🥈';
    else if (rank === 3) medals[i] = '🥉';
  }

  // Wooden spoon = lowest phase + highest score
  const lowestPhase = Math.min(...rankedPlayers.map((p) => p.phase));
  const spoonCandidates = rankedPlayers.filter(p => p.phase === lowestPhase);
  const worstScore = Math.max(...spoonCandidates.map(p => p.score));
  spoonCandidates.forEach(player => {
    if (player.score === worstScore) {
      const i = rankedPlayers.findIndex(p => p.name === player.name);
      medals[i] = '🥄';
    }
  });

  return medals;
}

// Determine current star leader(s) — highest phase + lowest score
function getStarLeaders(players) {
  if (players.length === 0) return [];
  const maxPhase = Math.max(...players.map((p) => p.phase));
  const inMaxPhase = players.filter((p) => p.phase === maxPhase);
  const minScore = Math.min(...inMaxPhase.map((p) => p.score));
  return inMaxPhase.filter((p) => p.score === minScore).map((p) => p.name);
}

export default function ScoreTable() {
  const { players, winner } = useGameData();
  const { updatePlayer } = useGameUpdate();
  const [isEditing, setIsEditing] = useState(false);

  const isTinyScreen = useMediaQuery('(max-width:350px)');
  const rankedPlayers = getRankings(players);
  const winnerDeclared = !!winner && !Array.isArray(winner);
  const medals = assignMedals(rankedPlayers, winnerDeclared);

  // Only show ⭐ once game has actually started
  const showStars = players.some(p => p.phase > 1 || p.score > 0);
  const starLeaders = showStars ? getStarLeaders(players) : [];

  const handleChange = (player, field, value) => {
    const numericValue = parseInt(value, 10);
    updatePlayer(player.name, field, isNaN(numericValue) ? 0 : numericValue);
  };

  const handleToggleEdit = () => setIsEditing((prev) => !prev);

  return (
    <Box>
      {/* Header and Edit toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">Score Table</Typography>
        <Button variant="outlined" onClick={handleToggleEdit} size="small">
          {isEditing ? 'Done Editing' : 'Edit Score Table'}
        </Button>
      </Box>

      {/* Score Table */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: isTinyScreen ? '0.7rem' : '0.875rem', p: isTinyScreen ? 0.5 : 1 }}>Player</TableCell>
              <TableCell align="center" sx={{ fontSize: isTinyScreen ? '0.7rem' : '0.875rem', p: isTinyScreen ? 0.5 : 1 }}>Current Phase</TableCell>
              <TableCell align="center" sx={{ fontSize: isTinyScreen ? '0.7rem' : '0.875rem', p: isTinyScreen ? 0.5 : 1 }}>Score</TableCell>
              {!isTinyScreen && (
                <TableCell align="center" sx={{ fontSize: '0.875rem' }}>Last Phase</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {rankedPlayers.map((player, index) => {
              const phase = player.phase ?? 1;
              const score = player.score ?? 0;
              const lastPhase = player.lastPhasePlayed;
              const passed = player.lastPassedPhase;

              // Display medal or star based on game state
              const medal = winnerDeclared
                ? medals[index]
                : (starLeaders.includes(player.name) ? '⭐' : null);

              return (
                <TableRow
                  key={player.name}
                  sx={{
                    backgroundColor: medal === '🥇' ? '#fff9c4' : 'inherit',
                    fontWeight: medal === '🥇' ? 'bold' : 'normal'
                  }}
                >
                  {/* Player name + medal/star */}
                  <TableCell sx={{ fontSize: isTinyScreen ? '0.7rem' : '0.875rem', p: isTinyScreen ? 0.5 : 1 }}>
                    {player.name} {medal && <span role="img" aria-label="medal">{medal}</span>}
                  </TableCell>

                  {/* Phase (editable if in edit mode) */}
                  <TableCell align="center" sx={{ p: isTinyScreen ? 0.5 : 1 }}>
                    {isEditing ? (
                      <TextField
                        type="number"
                        value={phase}
                        onChange={(e) => handleChange(player, 'phase', e.target.value)}
                        size="small"
                        sx={{ width: isTinyScreen ? 60 : 100 }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    ) : (
                      <Typography sx={{ fontSize: isTinyScreen ? '0.7rem' : '0.875rem' }}>{phase}</Typography>
                    )}
                  </TableCell>

                  {/* Score (editable if in edit mode) */}
                  <TableCell align="center" sx={{ p: isTinyScreen ? 0.5 : 1 }}>
                    {isEditing ? (
                      <TextField
                        type="number"
                        value={score}
                        onChange={(e) => handleChange(player, 'score', e.target.value)}
                        size="small"
                        sx={{ width: isTinyScreen ? 60 : 100 }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    ) : (
                      <Typography sx={{ fontSize: isTinyScreen ? '0.7rem' : '0.875rem' }}>{score}</Typography>
                    )}
                  </TableCell>

                  {/* Last phase played + outcome icon (✓ or ✗) */}
                  {!isTinyScreen && (
                    <TableCell align="center">
                      {lastPhase ? (
                        <>
                          Phase {lastPhase}{' '}
                          {passed === true && <CheckCircleIcon sx={{ color: 'green', fontSize: '1rem' }} />}
                          {passed === false && <CancelIcon sx={{ color: 'red', fontSize: '1rem' }} />}
                        </>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
