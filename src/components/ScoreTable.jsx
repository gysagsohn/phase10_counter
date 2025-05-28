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
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useGameData, useGameUpdate } from '../contexts/GameContext';

function getRankings(players) {
  return [...players].sort((a, b) => {
    if ((b.phase ?? 1) !== (a.phase ?? 1)) {
      return (b.phase ?? 1) - (a.phase ?? 1); // higher phase wins
    }
    return (a.score ?? 0) - (b.score ?? 0); // lower score wins
  });
}

function getMedal(index, total, playerName, leadingNames) {
  if (leadingNames.includes(playerName)) return '⭐';
  if (index === 0) return '🥇';
  if (index === 1) return '🥈';
  if (index === 2) return '🥉';
  if (index === total - 1) return '🥄';
  return null;
}


export default function ScoreTable() {
  const { players, getLeadingPlayerNames, winner } = useGameData();
  const { updatePlayer } = useGameUpdate();
  const [isEditing, setIsEditing] = useState(false);

  const rankedPlayers = getRankings(players);

  const handleChange = (player, field, value) => {
    const numericValue = parseInt(value, 10);
    updatePlayer(player.name, field, isNaN(numericValue) ? 0 : numericValue);
  };

  const handleToggleEdit = () => setIsEditing((prev) => !prev);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">Score Table</Typography>
        <Button variant="outlined" onClick={handleToggleEdit} size="small">
          {isEditing ? 'Done Editing' : 'Edit Score Table'}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="center">Current Phase</TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell align="center">Last Phase</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rankedPlayers.map((player, index) => {
              const isWinner = winner && !Array.isArray(winner) && player.name === winner.name;
              const phase = player.phase ?? 1;
              const score = player.score ?? 0;
              const lastPhase = player.lastPhasePlayed;
              const passed = player.lastPassedPhase;
              const leadingNames = getLeadingPlayerNames();
              const medal = getMedal(index, players.length, player.name, leadingNames);

              return (
                <TableRow
                  key={player.name}
                  sx={{
                    backgroundColor: isWinner ? '#fff9c4' : 'inherit',
                    fontWeight: isWinner ? 'bold' : 'normal'
                  }}
                >
                  <TableCell>
                    {player.name}{' '}
                    {medal && <span role="img" aria-label="medal">{medal}</span>}
                  </TableCell>

                  <TableCell align="center">
                    {isEditing ? (
                      <TextField
                        type="number"
                        value={phase}
                        onChange={(e) => handleChange(player, 'phase', e.target.value)}
                        size="small"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    ) : (
                      phase
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {isEditing ? (
                      <TextField
                        type="number"
                        value={score}
                        onChange={(e) => handleChange(player, 'score', e.target.value)}
                        size="small"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    ) : (
                      score
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {lastPhase ? (
                      <>
                        Phase {lastPhase}{' '}
                        {passed === true && (
                          <CheckCircleIcon sx={{ color: 'green', fontSize: '1.2rem', verticalAlign: 'middle' }} />
                        )}
                        {passed === false && (
                          <CancelIcon sx={{ color: 'red', fontSize: '1.2rem', verticalAlign: 'middle' }} />
                        )}
                      </>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
