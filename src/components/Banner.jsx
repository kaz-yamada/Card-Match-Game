import React from "react";
import { createUseStyles } from "react-jss";
import { GAME_STATUS } from "../constants";

const useStyles = createUseStyles({
  root: {
    position: "fixed",
    display: "grid",
    top: "30%",
    left: "25%",
    width: "50%",
    height: 200,
    background: "aliceblue",
    justifyItems: "center",
    alignItems: "center",
  },
  button: {
    background: "white",
    border: "solid 1px black",
    padding: "1em 2em",
  },
});

const Banner = ({ onReset, results }) => {
  const classes = useStyles();

  const handleReset = () => {
    onReset(GAME_STATUS.CREATING);
  };

  return (
    <div className={classes.root}>
      <div>Congratulations, you've won!</div>
      <div>
        <div>
          <b>Cards flipped:</b>
          {results.flips} times
        </div>
        <div>
          <b>Time taken:</b> {results.time}
        </div>
      </div>
      <button className={classes.button} onClick={handleReset}>
        Play Again
      </button>
    </div>
  );
};

export default Banner;
