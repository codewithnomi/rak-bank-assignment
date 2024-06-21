import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Option {
  icon: string;
  label: string;
}

export interface Question {
  id: number;
  question: string;
  options: Record<string, Option>;
  selected: string;
}

interface QuestionState {
  allQuestions: Question[];
  selectedQuestion: Question | null;
  showSummary: boolean;
  key: number;
}

const initialState: QuestionState = {
  allQuestions: [],
  selectedQuestion: null,
  showSummary: false,
  key: 0,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setAllQuestions(state, action: PayloadAction<Question[]>) {
      state.allQuestions = action.payload;
    },
    setSelectedQuestion(state, action: PayloadAction<Question>) {
      state.selectedQuestion = action.payload;
    },
    setShowSummary(state, action: PayloadAction<boolean>) {
      state.showSummary = action.payload;
    },
    updateKey(state) {
      state.key = state.key + 1;
    },
  },
});

export const {
  setAllQuestions,
  setSelectedQuestion,
  setShowSummary,
  updateKey,
} = questionSlice.actions;
export default questionSlice.reducer;
