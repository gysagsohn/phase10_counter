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

export default function ScoreTable() {
  const { players, getLeadingPlayerNames } = useGameData();
  const { updatePlayer } = useGameUpdate();

  const [isEditing, setIsEditing] = useState(false);

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
            {players.map((player) => {
              const isLeader = getLeadingPlayerNames().includes(player.name);
              const phase = player.phase ?? 1;
              const score = player.score ?? 0;
              const lastPhase = player.lastPhasePlayed;
              const passed = player.lastPassedPhase;

              return (
                <TableRow key={player.name}>
                  <TableCell>
                    {player.name}
                    {isLeader && (
                      <span role="img" aria-label="Leader" style={{ marginLeft: '0.5rem' }}>
                        🥇
                      </span>
                    )}
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
                          <CheckCircleIcon
                            sx={{ color: 'green', fontSize: '1.2rem', verticalAlign: 'middle' }}
                          />
                        )}
                        {passed === false && (
                          <CancelIcon
                            sx={{ color: 'red', fontSize: '1.2rem', verticalAlign: 'middle' }}
                          />
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
