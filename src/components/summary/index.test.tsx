import React from "react";
import { render } from "@testing-library/react";
import Summary from "./index";

describe("Summary component", () => {
  const mockQuestions = [
    {
      id: 1,
      question: "Question 1",
      options: {
        A: { label: "Option A", icon: "IconA" },
        B: { label: "Option B", icon: "IconB" },
      },
      selected: "A",
    },
    {
      id: 2,
      question: "Question 2",
      options: {
        A: { label: "Option A", icon: "IconA" },
        B: { label: "Option B", icon: "IconB" },
      },
      selected: "B",
    },
  ];

  it("renders correctly with mock data", () => {
    const { getByText, getAllByText } = render(
      <Summary allQuestions={mockQuestions} />
    );

    expect(getByText("Question 1")).toBeInTheDocument();
    expect(getByText("Question 2")).toBeInTheDocument();

    expect(getAllByText("IconA")).toHaveLength(1);
    expect(getAllByText("IconB")).toHaveLength(1);

    expect(getByText("Option A")).toBeInTheDocument();
    expect(getByText("Option B")).toBeInTheDocument();

    expect(getByText("Submit")).toBeInTheDocument();
  });
});
