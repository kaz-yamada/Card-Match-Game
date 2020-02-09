import React from "react";
import { shallow } from "enzyme";

import GameBoard from "../GameBoard";

const initialProps = {
  handleStart: jest.fn(),
  handleFinish: jest.fn()
};

const setup = (props = initialProps, state = null) => {
  const wrapper = shallow(<GameBoard {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe("GameBoard component", () => {
  test("Renders the game board without crashing", () => {
    setup();
  });
});
