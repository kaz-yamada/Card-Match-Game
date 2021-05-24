import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Card from "../Card";
import { CARD_STATUS } from "../../constants";

const initialProps = {
  data: {
    id: 0,
    url: "https://picsum.photos/id/237/200/300",
    status: CARD_STATUS.HIDDEN,
  },
  index: 0,
  handleClick: jest.fn(),
};

describe("<Card />", () => {
  test("Loading message disappears once loaded", async () => {
    render(<Card {...initialProps} />);
    expect(screen.getByTestId("card-root").textContent).toContain("Loading");

    const img = screen.getByRole("img");
    fireEvent.load(img);
    expect(screen.getByTestId("card-root").textContent).not.toContain(
      "Loading"
    );
  });

  test("Updates on click", () => {
    render(<Card {...initialProps} />);
    userEvent.click(screen.getByTestId("card-root"));
    expect(initialProps.handleClick).toHaveBeenCalled();
  });

  test("Correct classes", () => {
    render(
      <Card
        {...{
          ...initialProps,
          data: {
            ...initialProps.data,
            status: CARD_STATUS.SELECTED,
          },
        }}
      />
    );

    expect(screen.getByTestId("card-root").classList.contains("selected-*"));
  });
});
