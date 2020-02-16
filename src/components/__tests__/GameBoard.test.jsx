import React from "react";
import { shallow } from "enzyme";

import { GAME_STATUS } from "../../constants";
import GameBoard from "../GameBoard";

const initialProps = {
  gameStatus: GAME_STATUS.CREATING,
  handleStart: jest.fn(),
  handleFinish: jest.fn()
};

const setup = (props = initialProps, state = null) => {
  const wrapper = shallow(<GameBoard {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe("<GameBoard />", () => {
  test("Renders the game board without crashing", () => {
    setup();
  });
});
