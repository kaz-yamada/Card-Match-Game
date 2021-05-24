import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GameBoard from "../GameBoard";
import { GAME_STATUS } from "../../constants";

const initialProps = {
  gameStatus: GAME_STATUS.CREATING,
  onGameUpdate: jest.fn(),
};

describe("<GameBoard />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
  });

  test("renders correct number of cards", async () => {
    render(<GameBoard {...initialProps} />);

    const cards = await waitFor(() => screen.getAllByTestId("card-root"));

    expect(cards.length).toBe(15);
  });

  test("click counter is working", async () => {
    render(<GameBoard {...initialProps} />);

    const cards = await waitFor(() => screen.getAllByTestId("card-root"));
    expect(screen.getByTestId("flip-counter").textContent).toBe("Flips: 0");
    userEvent.click(cards[0]);
    expect(screen.getByTestId("flip-counter").textContent).toBe("Flips: 1");
    userEvent.click(cards[1]);
    expect(screen.getByTestId("flip-counter").textContent).toBe("Flips: 2");
  });
});
