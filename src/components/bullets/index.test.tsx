import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Bullets from "./index";
import { Provider } from "react-redux";
import store from "../../store";

describe("Bullets component", () => {
  const mockHandleBulletClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of bullets", () => {
    const { container } = render(
      <Provider store={store}>
        <Bullets
          count={5}
          selected={0}
          handleBulletClick={mockHandleBulletClick}
        />
      </Provider>
    );
    const bullets = container.querySelectorAll(".MuiBox-root");
    expect(bullets.length).toBe(6); // one extra bullet for summary
  });

  it("calls handleBulletClick with the correct index when a bullet is clicked", () => {
    const { container } = render(
      <Provider store={store}>
        <Bullets
          count={3}
          selected={0}
          handleBulletClick={mockHandleBulletClick}
        />
      </Provider>
    );
    const secondBullet = container.querySelectorAll(".MuiBox-root")[1];
    fireEvent.click(secondBullet);
    expect(mockHandleBulletClick).toHaveBeenCalledWith(1);
  });

  it("renders bullets with correct styling for selected and unselected states", () => {
    const { container } = render(
      <Provider store={store}>
        <Bullets
          count={4}
          selected={2}
          handleBulletClick={mockHandleBulletClick}
        />
      </Provider>
    );

    const bullets = container.querySelectorAll(".MuiBox-root");
    expect(bullets[0]).toHaveStyle('backgroundColor: "white"');
    expect(bullets[1]).toHaveStyle('backgroundColor: "white"');
    expect(bullets[2]).toHaveStyle('backgroundColor: ""');
    expect(bullets[3]).toHaveStyle('backgroundColor: "white"');
  });
});
