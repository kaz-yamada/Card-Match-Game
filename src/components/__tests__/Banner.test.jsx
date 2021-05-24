import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Banner from "../Banner";

const initialProps = {
  onReset: jest.fn(),
  results: {
    flips: 10,
    time: "1 minute",
  },
};

describe("<Banner />", () => {
  test("Has the correct values", () => {
    render(<Banner {...initialProps} />);

    expect(screen.getByTestId("flips")).toHaveTextContent(
      `Cards flipped: 10 times`
    );
    expect(screen.getByTestId("time")).toHaveTextContent(
      `Time taken: 1 minute`
    );
  });

  test("onReset should trigger on button click", () => {
    render(<Banner {...initialProps} />);

    expect(initialProps.onReset).not.toHaveBeenCalled();
    
    userEvent.click(screen.getByRole("button"));

    expect(initialProps.onReset).toHaveBeenCalled();
  });
});
