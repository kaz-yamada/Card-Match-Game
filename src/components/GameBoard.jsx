/* eslint-disable no-unused-vars */
import React from "react";

import Card from "./Card";
import game from "../services/Game";
import { CARD_STATUS, GAME_STATUS, DECK_SIZE } from "../constants";

const DELAY = 800;
const initalState = {
  isLoading: true,
  isChecking: false,
  deck: {},
  count: 0,
  firstCard: null,
  secondCard: null
};

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initalState };
  }

  componentDidMount() {
    this.initgame();
    this.props.handleStart();
  }

  static getDerivedStateFromProps(props, newState) {
    if (props.gameStatus === GAME_STATUS.RESETTING) {
      newState = { ...initalState };
      newState.deck = game();
      newState.isLoading = false;
      props.handleStart();
    }

    return newState;
  }

  initgame = () => {
    this.setState({ deck: game(), isLoading: false });
  };

  toggleCard = (index, status) => {
    const newDeck = { ...this.state.deck };
    const newCard = { ...newDeck[index] };
    newCard.status = status;
    newDeck[index] = newCard;

    this.setState({ deck: newDeck });
  };

  checkSelectedCards = () => {
    const { deck, firstCard, secondCard } = this.state;
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
      this.setState({ deck: newDeck });
      this.checkGame();
    }, DELAY);

    setTimeout(this.resetCards, DELAY);
  };

  checkGame = () => {
    const { deck } = this.state;

    const matches = Object.keys(deck).filter(
      key => deck[key].status === CARD_STATUS.MATCHED
    );

    if (matches.length === DECK_SIZE - 1) {
      // if (true) {
      const key = Object.keys(deck).find(
        key => deck[key].status === CARD_STATUS.HIDDEN
      );

      this.setState({
        deck: {
          ...deck,
          [key]: { ...deck[key], status: CARD_STATUS.MATCHED }
        }
      });

      this.props.handleFinish();
    }
  };

  resetCards = () => {
    this.setState({
      firstCard: null,
      secondCard: null,
      isChecking: false
    });
  };

  flipCard = (index, id) => {
    const { count } = this.state;

    if (count < 2) {
      this.setState({ count: count + 1 }, () => {
        if (this.state.count === 1) {
          this.setState({ firstCard: { index, id } });
        } else {
          this.setState(
            {
              secondCard: { index, id },
              count: 0,
              isChecking: true
            },
            this.checkSelectedCards
          );
        }

        this.toggleCard(index, CARD_STATUS.SELECTED);
      });
    }
  };

  handleClick = (index, id) => {
    const { isChecking } = this.state;
    if (!isChecking) {
      this.flipCard(index, id);
    }
  };

  render() {
    const { deck, isLoading } = this.state;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          justifyItems: "center"
        }}
      >
        {isLoading
          ? "Loading..."
          : Object.entries(deck).map(([key, value]) => {
              return (
                <Card
                  key={key}
                  index={key}
                  data={value}
                  handleClick={this.handleClick}
                />
              );
            })}
      </div>
    );
  }
}

export default GameBoard;
