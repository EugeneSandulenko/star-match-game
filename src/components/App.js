import React, { useState } from 'react';
import Game from './Game';

const StarMatch = () => {
  const [gameId, setGameId] = useState(1);

  const resetGame = (name) => {
    setGameId(gameId + 1);
    // eslint-disable-next-line no-console
    console.log(name);
  };

  return <Game key={gameId} startNewGame={(name) =>resetGame(name)} />;
};

export function App() {
  return <StarMatch />;
}
