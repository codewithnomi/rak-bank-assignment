import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import Options from "./index";
import questionReducer, {
  Question,
  setAllQuestions,
  setSelectedQuestion,
  setShowSummary,
  updateKey,
} from "../../slices/questionSlice";

describe("Options component", () => {
  let mockStore: EnhancedStore;

  beforeEach(() => {
    mockStore = configureStore({
      reducer: {
        question: questionReducer,
      },
    });

    const initialQuestion: Question = {
      id: 1,
      question: "Sample Question",
      options: {
        A: { icon: "iconA", label: "Option A" },
        B: { icon: "iconB", label: "Option B" },
      },
      selected: "A",
    };

    mockStore.dispatch(setAllQuestions([initialQuestion]));
    mockStore.dispatch(setSelectedQuestion(initialQuestion));
    mockStore.dispatch(setShowSummary(false));
    mockStore.dispatch(updateKey());
  });

  it("renders correctly", () => {
    const { container } = render(
      <Provider store={mockStore}>
        <Options />
      </Provider>
    );

    expect(container.querySelectorAll(".MuiToggleButton-root").length).toBe(2);
  });

  it("calls handleChange with the correct key when an option is clicked", () => {
    const { container } = render(
      <Provider store={mockStore}>
        <Options />
      </Provider>
    );

    const optionB = container.querySelectorAll(".MuiToggleButton-root")[1];
    fireEvent.click(optionB);
    const updatedState = mockStore.getState();
    console.log(updatedState);
    expect(updatedState.question.allQuestions[0]?.selected).toBe("B");
  });

  it("sets the selected style for the selected option", () => {
    const { container } = render(
      <Provider store={mockStore}>
        <Options />
      </Provider>
    );

    const optionA = container.querySelectorAll(".MuiToggleButton-root")[0];
    const optionB = container.querySelectorAll(".MuiToggleButton-root")[1];

    expect(optionA).toHaveAttribute("aria-pressed", "true");
    expect(optionB).toHaveAttribute("aria-pressed", "false");
  });
});
