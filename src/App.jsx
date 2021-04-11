import React, { useState } from "react";
import { createUseStyles } from "react-jss";

import GameBoard from "./components/GameBoard";
import Banner from "./components/Banner";

import { GAME_STATUS } from "./constants";

const useStyles = createUseStyles({
  header: {
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
  },
  root: {
    fontFamily: "arial",
  },
});

const App = () => {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.CREATING);

  const classes = useStyles();

  const handleStatusUpdate = (newStatus) => setGameStatus(newStatus);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1>Card Match Game</h1>
      </header>
      <div>
        <GameBoard gameStatus={gameStatus} onGameUpdate={handleStatusUpdate} />
        {gameStatus === GAME_STATUS.FINISHED && (
          <Banner onReset={handleStatusUpdate} />
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
