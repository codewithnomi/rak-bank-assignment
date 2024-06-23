import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Options from "./index";
import { Provider } from "react-redux";
import store from "../../store";

describe("Options component", () => {
  const mockHandleChange = jest.fn();
  const options = {
    A: { label: "Option A", icon: "A" },
    B: { label: "Option B", icon: "B" },
  };
  const selected = "A";
  const forceRender = 0;

  it("renders the correct number of options", () => {
    render(
      <Provider store={store}>
        <Options
          options={options}
          forceRender={forceRender}
          selected={selected}
          handleChange={mockHandleChange}
        />
      </Provider>
    );

    const toggleButtons = screen.getAllByRole("button");
    expect(toggleButtons.length).toBe(Object.keys(options).length);
  });

  it("calls handleChange with the correct key when an option is clicked", () => {
    render(
      <Provider store={store}>
        <Options
          options={options}
          forceRender={forceRender}
          selected={selected}
          handleChange={mockHandleChange}
        />
      </Provider>
    );

    const optionB = screen.getByText("B");
    fireEvent.click(optionB);
    expect(mockHandleChange).toHaveBeenCalledWith("B");
  });

  it("renders the selected option correctly", () => {
    render(
      <Provider store={store}>
        <Options
          options={options}
          forceRender={forceRender}
          selected={selected}
          handleChange={mockHandleChange}
        />
      </Provider>
    );

    const selectedOption = screen.getByText("A").closest("button");
    expect(selectedOption).toHaveAttribute("aria-pressed", "true");
  });
});
