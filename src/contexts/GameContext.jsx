import { createContext, useContext, useEffect, useState } from 'react';

const GameDataContext = createContext();
const GameUpdateContext = createContext();

export function GameProvider({ children }) {
  // Load players from localStorage on init
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('phase10-players');
    return saved ? JSON.parse(saved) : [];
  });

  // Load dealer index from localStorage on init
  const [dealerIndex, setDealerIndex] = useState(() => {
    const saved = localStorage.getItem('phase10-dealerIndex');
    return saved ? JSON.parse(saved) : 0;
  });

  const [winner, setWinner] = useState(null); // Stores winner object or array for tie
  const [tieBreakerActive, setTieBreakerActive] = useState(false); // Controls tie-breaker state
  const [previousPlayers, setPreviousPlayers] = useState([]); // Stores previous round players (for undo)

  // Persist player and dealer data to localStorage
  useEffect(() => {
    localStorage.setItem('phase10-players', JSON.stringify(players));
    localStorage.setItem('phase10-dealerIndex', JSON.stringify(dealerIndex));
  }, [players, dealerIndex]);

  // Add a player if name doesn't already exist
  const addPlayer = (name) => {
    if (players.some((p) => p.name === name)) return;
    setPlayers((prev) => [...prev, { name, score: 0, phase: 1 }]);
  };

  const removePlayer = (nameToRemove) => {
    setPlayers((prev) => prev.filter((p) => p.name !== nameToRemove));
  };

  const updatePlayer = (oldName, field, value) => {
    setPlayers((prev) =>
      prev.map((p) => (p.name === oldName ? { ...p, [field]: value } : p))
    );
  };

  const setAllPlayers = (newList) => setPlayers(newList);

  const nextDealer = () => {
    if (players.length === 0) return;
    setDealerIndex((prev) => (prev + 1) % players.length);
  };

  const setDealer = (index) => setDealerIndex(index);

  const resetGame = () => {
    setPlayers([]);
    setDealerIndex(0);
    setWinner(null);
    setTieBreakerActive(false);
    setPreviousPlayers([]);
    localStorage.removeItem('phase10-players');
    localStorage.removeItem('phase10-dealerIndex');
  };

  const fullResetGame = () => {
    resetGame();
  };

  const applyRoundResults = (resultsArray) => {
    setPreviousPlayers(JSON.parse(JSON.stringify(players))); // Deep clone for undo

    const updatedPlayers = players.map((player) => {
      const result = resultsArray.find((r) => r.name === player.name);
      if (!result) return player;

      const passed = result.passedPhase;
      const updatedPhase = passed ? player.phase + 1 : player.phase;

      return {
        ...player,
        score: player.score + result.score,
        phase: updatedPhase,
        lastPhasePlayed: player.phase,
        lastPassedPhase: passed
      };
    });

    const completed = updatedPlayers.filter((p) => p.phase > 10);
    if (completed.length > 0) {
      const minScore = Math.min(...completed.map((p) => p.score));
      const potentialWinners = completed.filter((p) => p.score === minScore);

      if (potentialWinners.length === 1) {
        setWinner(potentialWinners[0]);
        setTieBreakerActive(false);
      } else {
        // Tie-breaker logic
        const tieBreakerNames = potentialWinners.map((p) => p.name);
        const tieBreakerPlayers = updatedPlayers.map((p) =>
          tieBreakerNames.includes(p.name)
            ? { ...p, phase: 10 }
            : { ...p, phase: 0 }
        );
        setPlayers(tieBreakerPlayers);
        setWinner(tieBreakerNames);
        setTieBreakerActive(true);
        return;
      }
    }

    setPlayers(updatedPlayers);
  };

  const undoLastRound = () => {
    if (previousPlayers.length > 0) {
      setPlayers(previousPlayers);
      setWinner(null);
      setTieBreakerActive(false);
      setPreviousPlayers([]);
    }
  };

  const getLeadingPlayerNames = () => {
    if (players.length === 0) return [];

    const allAtPhaseOne = players.every((p) => p.phase === 1);
    const allAtZeroScore = players.every((p) => (p.score ?? 0) === 0);

    if (allAtPhaseOne && allAtZeroScore) return [];

    const maxPhase = Math.max(...players.map((p) => p.phase));
    const inMaxPhase = players.filter((p) => p.phase === maxPhase);
    const minScore = Math.min(...inMaxPhase.map((p) => p.score));
    return inMaxPhase.filter((p) => p.score === minScore).map((p) => p.name);
  };

  // === SAVE GAME ===
  const saveGame = () => {
    const saveData = {
      players,
      dealerIndex,
      winner,
      tieBreakerActive
    };
    localStorage.setItem('phase10-savedGame', JSON.stringify(saveData));
  };

  // === LOAD GAME ===
  const loadGame = () => {
    const saved = localStorage.getItem('phase10-savedGame');
    if (!saved) return false;

    const { players, dealerIndex, winner, tieBreakerActive } = JSON.parse(saved);
    setPlayers(players);
    setDealerIndex(dealerIndex);
    setWinner(winner);
    setTieBreakerActive(tieBreakerActive);
    return true;
  };

  return (
    <GameDataContext.Provider
      value={{ players, dealerIndex, winner, tieBreakerActive, getLeadingPlayerNames }}
    >
      <GameUpdateContext.Provider
        value={{
          addPlayer,
          removePlayer,
          updatePlayer,
          setAllPlayers,
          setDealer,
          nextDealer,
          resetGame,
          fullResetGame,
          applyRoundResults,
          undoLastRound,
          saveGame,
          loadGame
        }}
      >
        {children}
      </GameUpdateContext.Provider>
    </GameDataContext.Provider>
  );
}

export const useGameData = () => useContext(GameDataContext);
export const useGameUpdate = () => useContext(GameUpdateContext);
