import React, { useState, useEffect } from 'react';
import StarsDisplay from './StarsDisplay';
import PlayNumber from './PlayNumber';
import utils from '../math-utils';
import PlayAgain from './PlayAgain';

const Leadership = (props) => {
  return (
    <>
      Leadership board:
      <div className="divTable blueTable">
        <div className="divTableHeading">
          <div className="divTableRow">
            <div className="divTableHead">Name</div>
            <div className="divTableHead">Score</div>
            <div className="divTableHead">Tries</div>
          </div>
          <div className="divTableBody">
            {props.players.map((p) => (
              <div key={'main' + p.name}>
                <div className="leftDiv" key={'name' + p.name}>
                  {p.name}
                </div>
                <div className="leftDiv" key={'score' + p.name}>
                  {p.score}
                </div>
                <div className="leftDiv" key={'tries' + p.name}>
                  {p.tries}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

const Game = (props) => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus =
    availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || secondsLeft === 0) {
      return;
    }

    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);

    setGameState(newCandidateNums);
  };

  const playAgain = (name) => {
    props.startNewGame(name, secondsLeft);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={playAgain} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={'number' + number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
      <Leadership players={props.players} />
    </div>
  );
};

export default Game;
