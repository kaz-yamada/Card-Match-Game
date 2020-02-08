import React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";

import { CARD_STATUS, CARD_SIZES } from "../constants";

const useStyles = createUseStyles({
  card: {
    padding: 5,
    borderRadius: 5,
    height: CARD_SIZES.height,
    width: CARD_SIZES.width,
    border: "black 5px solid",
    position: "relative",
    transition: "all 0.4s linear",
    transformStyle: "preserve-3d",
    margin: "5px"
  },
  selected: {
    borderColor: "blue",
    transform: "rotateY(180deg)"
  },
  front: {
    transform: "rotateY(180deg)"
  },
  matched: {
    borderColor: "green",
    backgroundColor: "white",
    transform: "rotateY(180deg)"
  },
  inner: {
    position: "absolute",
    backfaceVisibility: "hidden"
  },
  back: {
    // transform: "rotateY(180deg)"
  }
});

const Card = ({ data, handleClick, index }) => {
  const { id, url, status } = data;
  const classes = useStyles();
  const isSelected = status === CARD_STATUS.SELECTED;
  const isMatched = status === CARD_STATUS.MATCHED;

  const onCardClick = () => {
    if (status === CARD_STATUS.HIDDEN) {
      handleClick(index, id);
    }
  };

  return (
    <div
      className={classnames(classes.card, {
        [classes.selected]: isSelected,
        [classes.matched]: isMatched
      })}
      onClick={onCardClick}
    >
      <div className={classnames(classes.inner, classes.front)}>
        <img src={url} alt="card" />
      </div>
      <div className={classnames(classes.inner, classes.back)}></div>
    </div>
  );
};

export default Card;
