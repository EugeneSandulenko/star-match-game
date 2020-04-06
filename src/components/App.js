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
  const [players, setPlayers] = useState([new Player('Eugene', 5, 1)]);

  const resetGame = (name, secondsLeft) => {
    setPlayers(players.concat(new Player(name, secondsLeft, 1)));
    setGameId(gameId + 1);
    // eslint-disable-next-line no-console
    console.log(name, secondsLeft);
  };

  return <Game key={gameId} players={players} startNewGame={resetGame} />;
};

export function App() {
  return <StarMatch />;
}
