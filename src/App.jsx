import React, { useState } from "react";
import { createUseStyles } from "react-jss";

import GameBoard from "./components/GameBoard";
import Banner from "./components/Banner";

import { GAME_STATUS } from "./constants";

const useStyles = createUseStyles({
  header: {
    textAlign: "center"
  },
  footer: {
    textAlign: "center"
  }
});

const App = () => {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.CREATING);
  const classes = useStyles();

  const gameFinished = () => {
    setGameStatus(GAME_STATUS.FINISHED);
  };

  const resetGame = () => {
    setGameStatus(GAME_STATUS.RESETTING);
  };

  const setGameToInProgress = () => {
    setGameStatus(GAME_STATUS.IN_PROGRESS);
  };

  return (
    <div>
      <header className={classes.header}>
        <h1>Card Match Game</h1>
      </header>
      <div>
        <GameBoard
          gameStatus={gameStatus}
          handleStart={setGameToInProgress}
          handleFinish={gameFinished}
        />
        {gameStatus === GAME_STATUS.FINISHED && (
          <Banner handleClick={resetGame} />
        )}
      </div>
      <footer className={classes.footer}>
        Created by <a href="https://www.kazyamada.com/">Kaz Yamada</a> |{" "}
        <a href="https://github.com/kaz-yamada/Card-Match-Game">Source</a>
      </footer>
    </div>
  );
};

export default App;
