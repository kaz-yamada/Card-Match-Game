import React, { useState, useEffect, useCallback, useRef } from "react";
import { createUseStyles } from "react-jss";

import Card from "./Card";
import GameService from "../services/GameService";
import { CARD_STATUS, GAME_STATUS, DECK_SIZE } from "../constants";

const DELAY = 800;

const useStyles = createUseStyles({
  board: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    justifyItems: "center",
  },
});

const GameBoard = ({ gameStatus, onGameUpdate }) => {
  const [deck, setDeck] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [faceUpCounter, setFaceUpCounter] = useState(0);

  const flipCounter = useRef(0);
  const startTime = useRef(new Date());

  const classes = useStyles();

  /**
   * Check if the flipped cards match
   */
  const checkPair = useCallback(() => {
    if (firstCard && secondCard) {
      const first = { ...deck[firstCard.index] };
      const second = { ...deck[secondCard.index] };

      if (firstCard.id === secondCard.id) {
        first.status = CARD_STATUS.MATCHED;
        second.status = CARD_STATUS.MATCHED;
      } else {
        first.status = CARD_STATUS.HIDDEN;
        second.status = CARD_STATUS.HIDDEN;
      }

      const newDeck = {
        ...deck,
        [firstCard.index]: first,
        [secondCard.index]: second,
      };

      setTimeout(() => {
        setDeck(newDeck);
      }, DELAY);

      setTimeout(resetCards, DELAY);
    }
  }, [deck, firstCard, secondCard]);

  const resetCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    setIsChecking(false);
  };

  /**
   *
   * @param {*} index
   * @param {*} status
   */
  const toggleCard = (index, status) => {
    const newDeck = { ...deck };
    const newCard = { ...newDeck[index] };

    newCard.status = status;
    newDeck[index] = newCard;

    setDeck(newDeck);
  };

  /**
   *
   * @param {*} index
   * @param {*} id
   */
  const handleClick = (index, id) => {
    if (isChecking) return;

    flipCounter.current++;

    if (faceUpCounter < 2) {
      const newCount = faceUpCounter + 1;
      const newCard = { index, id };
      setFaceUpCounter(newCount);

      if (newCount === 1) {
        setFirstCard(newCard);
      } else {
        setSecondCard(newCard);
        setIsChecking(true);
      }

      toggleCard(index, CARD_STATUS.SELECTED);
    }
  };

  /**
   * Find odd card out and flip it
   */
  const flipAllCards = useCallback(() => {
    setDeck((prevDeck) => {
      const lastCard = Object.keys(deck).find(
        (key) => deck[key].status === CARD_STATUS.HIDDEN
      );

      if (lastCard) {
        const remainder = { ...deck[lastCard], status: CARD_STATUS.SELECTED };

        const newDeck = {
          ...deck,
          [lastCard]: remainder,
        };

        return newDeck;
      }

      return prevDeck;
    });
  }, [deck]);

  /**
   * Check if the all cards are matched and game is finished
   */
  const checkGameFinished = useCallback(() => {
    if (faceUpCounter === 0) {
      const matches = Object.keys(deck).filter(
        (key) => deck[key].status === CARD_STATUS.MATCHED
      );

      // Game is finished
      if (matches.length === DECK_SIZE - 1) {
        onGameUpdate(GAME_STATUS.FINISHED, {
          flips: flipCounter.current,
          time: `${(new Date() - startTime.current) / 1000} seconds`,
        });
      }
    } else if (faceUpCounter === 2) {
      setFaceUpCounter(0);
      checkPair();
    }
  }, [checkPair, deck, faceUpCounter, onGameUpdate, startTime]);

  const initialiseGame = useCallback(async () => {
    onGameUpdate(GAME_STATUS.LOADING);
    setDeck(await GameService());
    flipCounter.current = 0;
    onGameUpdate(GAME_STATUS.IN_PROGRESS);
  }, [onGameUpdate]);

  useEffect(() => {
    // Set up the game
    if (gameStatus === GAME_STATUS.CREATING) {
      initialiseGame();
    } else if (gameStatus === GAME_STATUS.IN_PROGRESS) {
      checkGameFinished();
    } else if (gameStatus === GAME_STATUS.FINISHED) {
      flipAllCards();
    }
  }, [checkGameFinished, initialiseGame, flipAllCards, gameStatus]);

  return (
    <div className={classes.board}>
      {gameStatus === GAME_STATUS.LOADING
        ? "Loading..."
        : Object.entries(deck).map(([key, value]) => {
            return (
              <Card
                key={key}
                index={key}
                data={value}
                handleClick={handleClick}
              />
            );
          })}
    </div>
  );
};

export default GameBoard;
