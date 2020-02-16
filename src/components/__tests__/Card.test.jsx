import React from "react";
import { shallow } from "enzyme";

import Card from "../Card";

const initialProps = {
  data: { id: 0, url: "https://picsum.photos/id/237/200/300", status: "" },
  index: 0,
  handleClick: jest.fn()
};

const setup = (props = initialProps) => shallow(<Card {...props} />);

describe("<Card />", () => {
  test("Renders without crashing", () => {
    setup();
  });

  test("Renders card correctly", () => {
    const wrapper = setup();
    const img = wrapper.find("img");
  });

  test("Renders without crashing", () => {
    const wrapper = setup();
    wrapper.simulate("click");
  });
});
