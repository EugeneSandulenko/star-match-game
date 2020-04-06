import React, { useState } from 'react';
import Game from './Game';

class Player {
  constructor(name, score, tries) {
    this.name = name;
    this.score = score;
    this.tries = tries;
  }
}

const StarMatch = () => {
  const [gameId, setGameId] = useState(1);
  const [players, setPlayers] = useState([]);

  const updateledershipboard = (name, secondsLeft) => {
    const existingRecords = players.filter((p) => p.name == name);
    const newPlayer =
      existingRecords.length > 0
        ? new Player(
          name,
          Math.max(existingRecords[0].score, secondsLeft),
          existingRecords[0].tries + 1
        )
        : new Player(name, secondsLeft, 1);

    return players
      .filter((p) => p.name != name)
      .concat(newPlayer)
      .sort((a, b) => b.score - a.score);
  };

  const resetGame = (name, secondsLeft) => {
    setPlayers(updateledershipboard(name,secondsLeft));
    setGameId(gameId + 1);
  };

  return <Game key={gameId} players={players} startNewGame={resetGame} />;
};

export function App() {
  return <StarMatch />;
}
