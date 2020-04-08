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
  let savedPayers =[] ;
  try {
    if(window.localStorage.players != undefined) 
    {
      savedPayers = JSON.parse(window.localStorage.players);
    }
  }catch (e){ 
    // eslint-disable-next-line no-console
    console.log(e);
  }

  const [gameId, setGameId] = useState(1);
  const [players, setPlayers] = useState(savedPayers);

  const updateledershipboard = (name, secondsLeft) => {
    let existingRecords = [];

    try{
      existingRecords = JSON.parse(window.localStorage.players)
        .filter((p) => p.name == name);
    }
    catch(e){
      // eslint-disable-next-line no-console
      console.log(e);
    }

    const newPlayer =
      existingRecords.length > 0
        ? new Player(
          name,
          Math.max(existingRecords[0].score, secondsLeft),
          existingRecords[0].tries + 1
        )
        : new Player(name, secondsLeft, 1);

    const newPayers = players
      .filter((p) => p.name != name)
      .concat(newPlayer)
      .sort((a, b) => b.score - a.score);

    window.localStorage.setItem('players',JSON.stringify(newPayers));
    return newPayers;
  };

  const resetGame = (name, secondsLeft) => {
    const newPlayers = updateledershipboard(name, secondsLeft);
    setPlayers(newPlayers);
    localStorage.setItem('players', JSON.stringify(newPlayers));
    setGameId(gameId + 1);
  };

  return <Game key={gameId} players={players} startNewGame={resetGame} />;
};

export function App() {
  return <StarMatch />;
}
