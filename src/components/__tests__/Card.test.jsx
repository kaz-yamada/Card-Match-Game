import React from "react";
import { mount } from "enzyme";

import Card from "../Card";

const initialProps = {
  data: { id: 0, url: "", status: "" },
  index: 0,
  handleClick: jest.fn()
};

const setup = () => mount(<Card {...initialProps} />);

describe("Card component", () => {
  test("Renders without crashing", () => {
    setup();
  });
});
