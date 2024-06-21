import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import { Grid, Slide, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedQuestion,
  setAllQuestions,
  setShowSummary,
  updateKey,
} from "../../slices/questionSlice";
import { Question } from "../../slices/questionSlice";
import { RootState } from "../../store";

export default function Options() {
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
    <Grid
      item
      xs={12}
      container
      flexDirection={"row"}
      justifyContent={"space-around"}
      alignItems={"center"}
    >
      {options &&
        Object.keys(options).map((key: string, index) => (
          <Slide
            key={`${key}-${forceRender}`}
            timeout={500}
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
          >
            <Tooltip
              arrow
              title={options[key].label}
              // open={selected === key}
              key={index}
            >
              <ToggleButton
                value={key}
                selected={selected === key}
                onChange={() => handleChange(key)}
                sx={{ border: "none", fontSize: "2rem", color: "black" }}
              >
                {options[key].icon}
              </ToggleButton>
            </Tooltip>
          </Slide>
        ))}
    </Grid>
  );
}
