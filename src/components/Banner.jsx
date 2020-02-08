import React from "react";
import { createUseStyles } from "react-jss";

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
    alignItems: "center"
  },
  button: {
    background: "white",
    border: "solid 1px black",
    padding: "1em 2em"
  }
});

const Banner = ({ handleClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>Congratulations, you've won!</div>
      <button className={classes.button} onClick={handleClick}>
        Play Again
      </button>
    </div>
  );
};

export default Banner;
