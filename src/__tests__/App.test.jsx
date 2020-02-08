import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders the game board component", () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Card Match Game/i);
  expect(titleElement).toBeInTheDocument();
});
