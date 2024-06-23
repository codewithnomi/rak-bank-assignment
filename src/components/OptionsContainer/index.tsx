import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedQuestion,
  setAllQuestions,
  setShowSummary,
  updateKey,
} from "../../slices/questionSlice";
import { Question } from "../../slices/questionSlice";
import { RootState } from "../../store";
import Options from "../options";

export default function OptionsContainer() {
  const dispatch = useDispatch();
  const {
    selectedQuestion,
    allQuestions,
    key: forceRender,
  } = useSelector((state: RootState) => state.question);
  const { options, selected } = selectedQuestion || {};

  const currentIndex = allQuestions?.findIndex(
    (q: Question) => q?.id === selectedQuestion?.id
  );

  const handleChange = (key: string) => {
    const mappedObject = allQuestions.map((q: Question) => {
      if (q.id === selectedQuestion?.id) {
        return { ...q, selected: key };
      }
      return q;
    });
    dispatch(setAllQuestions(mappedObject));
    dispatch(updateKey());
    dispatch(setSelectedQuestion(allQuestions[currentIndex + 1]));

    if (currentIndex + 1 === allQuestions.length) {
      dispatch(setShowSummary(true));
    } else {
      dispatch(setShowSummary(false));
    }
  };

  return (
    <Options
      options={options}
      forceRender={forceRender}
      selected={selected}
      handleChange={handleChange}
    />
  );
}
