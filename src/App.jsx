import React, { useState } from "react";

import GameBoard from "./components/GameBoard";
import Banner from "./components/Banner";

import { GAME_STATUS } from "./constants";

const App = () => {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.CREATING);

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
      <header>
        <h1>Card Match Game</h1>
      </header>
      <div>
        <GameBoard
          gameStatus={gameStatus}
          startGame={setGameToInProgress}
          handleFinish={gameFinished}
        />
        {gameStatus === GAME_STATUS.FINISHED && (
          <Banner handleClick={resetGame} />
        )}
      </div>
      <footer>
        Created by <a href="https://www.kazyamada.com/">Kaz Yamada</a>
        <a href="https://github.com/kaz-yamada/Card-Match-Game">Source</a>
      </footer>
    </div>
  );
};

export default App;
