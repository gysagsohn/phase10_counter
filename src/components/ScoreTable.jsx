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
              <TableCell align="center">Phase</TableCell>
              <TableCell align="center">Score</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {players.map((player) => {
              const isLeader = getLeadingPlayerNames().includes(player.name);
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
                        value={player.phase}
                        onChange={(e) => handleChange(player, 'phase', e.target.value)}
                        size="small"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    ) : (
                      player.phase
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {isEditing ? (
                      <TextField
                        type="number"
                        value={player.score}
                        onChange={(e) => handleChange(player, 'score', e.target.value)}
                        size="small"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    ) : (
                      player.score
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
