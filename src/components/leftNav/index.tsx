import React from "react";
import { Grid } from "@mui/material";
import Bullets from "../bullets";
import { useSelector, useDispatch } from "react-redux";
import {
  Question,
  setSelectedQuestion,
  setShowSummary,
  updateKey,
} from "../../slices/questionSlice";
import { RootState } from "../../store";
import logo from "../../assets/logos/main-logo.svg";

export default function LeftNav() {
  const { allQuestions, selectedQuestion } = useSelector(
    (state: RootState) => state.question
  );
  const dispatch = useDispatch();
  const currentIndex = allQuestions?.findIndex(
    (q: Question) => q?.id === selectedQuestion?.id
  );

  const handleBulletClick = (index: number) => {
    if (allQuestions.length === index) {
      dispatch(setShowSummary(true));
    } else {
      dispatch(setShowSummary(false));
    }
    dispatch(setSelectedQuestion(allQuestions[index]));
    dispatch(updateKey());
  };

  return (
    <Grid
      item
      xs={1}
      container
      sx={{
        bgcolor: "#6b54fe",
        minHeight: "100vh",
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        pt={5}
      >
        <img src={logo} width={30} />
      </Grid>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Bullets
          count={allQuestions.length}
          selected={currentIndex === -1 ? allQuestions.length : currentIndex}
          handleBulletClick={handleBulletClick}
        />
      </Grid>
    </Grid>
  );
}
