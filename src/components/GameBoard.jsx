import React, { useState, useEffect, useCallback } from "react";
import { createUseStyles } from "react-jss";

import Card from "./Card";
import GameService from "../services/GameService";
import { CARD_STATUS, GAME_STATUS, DECK_SIZE } from "../constants";

const DELAY = 800;

const useStyles = createUseStyles({
  board: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    justifyItems: "center"
  }
});

export default props => {
  const [deck, setDeck] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [count, setCount] = useState(0);
  const classes = useStyles();

  /**
   * Check if the all cards are matched and game is finished
   * @param {*} newDeck
   */
  const checkGameFinished = useCallback(() => {
    const matches = Object.keys(deck).filter(
      key => deck[key].status === CARD_STATUS.MATCHED
    );

    if (matches.length === DECK_SIZE - 1) {
      props.handleFinish();
    }
  }, [deck, props]);

  /**
   * Find odd card out and flip it
   */
  const flipAllCards = useCallback(() => {
    setDeck(prevDeck => {
      const key = Object.keys(deck).find(
        key => deck[key].status === CARD_STATUS.HIDDEN
      );

      if (key) {
        const remainder = { ...deck[key], status: CARD_STATUS.SELECTED };

        const newDeck = {
          ...deck,
          [key]: remainder
        };

        return newDeck;
      }

      return prevDeck;
    });
  }, [deck]);

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
        [secondCard.index]: second
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

  const handleClick = (index, id) => {
    if (!isChecking && count < 2) {
      const newCount = count + 1;
      const newCard = { index, id };
      setCount(newCount);

      if (newCount === 1) {
        setFirstCard(newCard);
      } else {
        setSecondCard(newCard);
        setIsChecking(true);
      }

      toggleCard(index, CARD_STATUS.SELECTED);
    }
  };

  useEffect(() => {
    if (count === 2) {
      setCount(0);
      checkPair();
    }
  }, [count, checkPair]);

  useEffect(() => {
    const { gameStatus } = props;

    // Initialise game
    if (
      gameStatus === GAME_STATUS.CREATING ||
      gameStatus === GAME_STATUS.RESETTING
    ) {
      setIsLoading(true);
      setDeck(GameService());
      setIsLoading(false);
      props.handleStart();
    } else if (gameStatus === GAME_STATUS.IN_PROGRESS) {
      checkGameFinished();
    } else if (gameStatus === GAME_STATUS.FINISHED) {
      flipAllCards();
    }
  }, [checkGameFinished, flipAllCards, props]);

  return (
    <div className={classes.board}>
      {isLoading
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
