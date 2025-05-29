// MUI icons and components
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useGameData, useGameUpdate } from '../contexts/GameContext';

const MAX_PLAYERS = 6;

export default function PlayerList({ forceSetup, clearForceSetup }) {
  const { players, dealerIndex } = useGameData();
  const {
    addPlayer,
    removePlayer,
    setDealer,
    updatePlayer,
    setAllPlayers,
  } = useGameUpdate();

  const [numPlayers, setNumPlayers] = useState('');
  const [names, setNames] = useState([]);
  const [dealerName, setDealerName] = useState('');
  const [setupComplete, setSetupComplete] = useState(players.length > 0);

  const [isEditing, setIsEditing] = useState(false);
  const [editedNames, setEditedNames] = useState([]);
  const [showValidationError, setShowValidationError] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmText, setConfirmText] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    if (forceSetup) {
      setSetupComplete(false);
      setIsEditing(false);
      setNumPlayers('');
      setNames([]);
      setDealerName('');
      clearForceSetup();
    }
  }, [forceSetup]);

  const hasDuplicateNames = (arr) => {
    const nameSet = new Set();
    for (const name of arr) {
      const trimmed = name.trim().toLowerCase();
      if (nameSet.has(trimmed)) return true;
      nameSet.add(trimmed);
    }
    return false;
  };

  const canStart =
    names.every((name) => name.trim()) &&
    dealerName &&
    !hasDuplicateNames(names);

  const handleStartGame = () => {
    if (!canStart) {
      setShowValidationError(true);
      return;
    }

    names.forEach((name) => addPlayer(name.trim()));
    const dealerIdx = names.findIndex((n) => n === dealerName);
    setDealer(dealerIdx);
    setSetupComplete(true);
  };

  const movePlayer = (fromIndex, direction) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= players.length) return;

    const reordered = [...players];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setAllPlayers(reordered);
  };

  const handleAddPlayer = () => {
    if (players.length < MAX_PLAYERS) {
      addPlayer(`Player ${players.length + 1}`);
    }
  };

  const toggleEditing = () => {
    if (!isEditing) {
      setEditedNames(players.map((p) => p.name));
    } else {
      players.forEach((player, idx) => {
        const newName = editedNames[idx].trim();
        if (newName && newName !== player.name) {
          updatePlayer(player.name, 'name', newName);
        }
      });
    }
    setIsEditing((prev) => !prev);
  };

  const handleDeletePlayer = (playerName) => {
    const currentDealer = players[dealerIndex]?.name;
    const nextDealer = players[(dealerIndex + 1) % players.length]?.name;

    const isCurrent = playerName === currentDealer;
    const isNext = playerName === nextDealer;

    const text = isCurrent || isNext
      ? `Warning: "${playerName}" is the ${isCurrent ? 'current' : 'next'} dealer. Continue deleting?`
      : `Delete player "${playerName}"?`;

    setConfirmText(text);
    setPendingDelete(() => () => removePlayer(playerName));
    setConfirmDelete(playerName);
  };

  // --- Setup screen ---
  if (!setupComplete) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Select Number of Players
        </Typography>

        <Select
          value={numPlayers}
          onChange={(e) => {
            const value = Number(e.target.value);
            setNumPlayers(value);
            setNames(Array(value).fill(''));
            setShowValidationError(false);
          }}
          fullWidth
          sx={{ mb: 2 }}
        >
          {[2, 3, 4, 5, 6].map((num) => (
            <MenuItem key={num} value={num}>
              {num} Players
            </MenuItem>
          ))}
        </Select>

        {names.map((name, i) => (
          <TextField
            key={i}
            label={`Player ${i + 1}`}
            value={name}
            onChange={(e) => {
              const updated = [...names];
              updated[i] = e.target.value;
              setNames(updated);
              setShowValidationError(false);
            }}
            fullWidth
            sx={{ mb: 1 }}
          />
        ))}

        {hasDuplicateNames(names) && (
          <Typography color="error" sx={{ mb: 1 }}>
            Duplicate player names found. Please enter unique names.
          </Typography>
        )}

        {names.every((name) => name.trim()) && (
          <>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Select Starting Dealer
            </Typography>
            <Select
              value={dealerName}
              onChange={(e) => {
                setDealerName(e.target.value);
                setShowValidationError(false);
              }}
              fullWidth
              sx={{ mb: 2 }}
            >
              {names.map((name, i) => (
                <MenuItem key={i} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </>
        )}

        {showValidationError && (
          <Typography color="error" sx={{ mb: 1 }}>
            Please fill all names, avoid duplicates, and select a dealer.
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleStartGame}
          disabled={!canStart}
        >
          Start Game
        </Button>
      </Box>
    );
  }

  // --- Edit/Review Players Screen ---
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Players
      </Typography>

      {isEditing && (
        <>
          <List dense>
            {players.map((player, index) => {
              const name = editedNames[index] || '';
              const trimmed = name.trim().toLowerCase();
              const isDuplicate =
                editedNames.filter(
                  (n, i) => i !== index && n.trim().toLowerCase() === trimmed
                ).length > 0;

              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Box>
                      <IconButton
                        onClick={() => movePlayer(index, -1)}
                        disabled={index === 0}
                      >
                        <ArrowUpwardIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => movePlayer(index, 1)}
                        disabled={index === players.length - 1}
                      >
                        <ArrowDownwardIcon fontSize="small" />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDeletePlayer(player.name)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <TextField
                    value={name}
                    onChange={(e) => {
                      const updated = [...editedNames];
                      updated[index] = e.target.value;
                      setEditedNames(updated);
                    }}
                    size="small"
                    fullWidth
                    error={isDuplicate}
                    helperText={isDuplicate ? 'Duplicate name' : ''}
                  />
                </ListItem>
              );
            })}
          </List>

          <Button
            variant="outlined"
            onClick={handleAddPlayer}
            disabled={players.length >= MAX_PLAYERS}
            sx={{ mt: 2 }}
          >
            Add Player
          </Button>

          {players.length >= MAX_PLAYERS && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Max player limit of {MAX_PLAYERS} reached.
            </Typography>
          )}
        </>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={toggleEditing}>
          {isEditing ? 'Done Editing' : 'Edit Players'}
        </Button>

        {isEditing && (
          <Select
            value={players[dealerIndex]?.name || ''}
            onChange={(e) => {
              const newDealer = players.findIndex(
                (p) => p.name === e.target.value
              );
              if (newDealer !== -1) setDealer(newDealer);
            }}
            size="small"
          >
            {players.map((p, i) => (
              <MenuItem key={i} value={p.name}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>

      {/* Confirm Delete Dialog */}
      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button
            onClick={() => {
              if (pendingDelete) pendingDelete();
              setConfirmDelete(null);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
