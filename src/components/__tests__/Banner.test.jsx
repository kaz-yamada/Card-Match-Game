import React from "react";
import { shallow } from "enzyme";

import Banner from "../Banner";

const setup = () => shallow(<Banner />);

describe("<Banner />", () => {
  test("Renders without crashing", () => {
    setup();
  });
});
