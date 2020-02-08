import React from "react";
import { render } from "@testing-library/react";
import GameBoard from "../GameBoard";

test("renders the game board", () => {
  const { getByText } = render(<GameBoard />);
  const linkElement = getByText(/Game Board/i);
  expect(linkElement).toBeInTheDocument();
});
