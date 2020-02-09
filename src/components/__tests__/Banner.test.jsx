import React from "react";
import { mount } from "enzyme";

import Banner from "../Banner";

const setup = () => mount(<Banner />);

describe("Banner component", () => {
  test("Renders without crashing", () => {
    setup();
  });
});
