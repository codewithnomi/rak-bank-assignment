import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import data from "../../constants/data.json";
import { Grid } from "@mui/material";

import Options from "../../components/Options";
import Summary from "../../components/summary";
import Questions from "../../components/questions";
import { RootState } from "../../store";

import {
  setAllQuestions,
  setSelectedQuestion,
} from "../../slices/questionSlice";

export default function MainContent() {
  const dispatch = useDispatch();
  const { allQuestions, showSummary } = useSelector(
    (state: RootState) => state.question
  );

  useEffect(() => {
    dispatch(setAllQuestions(data.questions || []));
    dispatch(setSelectedQuestion(data.questions[0] || {}));
  }, [dispatch]);

  return (
    <>
      {!showSummary ? (
        <>
          <Grid
            item
            xs={5}
            container
            direction="column"
            justifyContent="center"
            sx={{
              bgcolor: "#6b54fe",
              minHeight: "100vh",
            }}
          >
            <Questions />
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Options />
          </Grid>
        </>
      ) : (
        <Grid
          item
          xs={11}
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            p: "50px 100px",
            minHeight: "100vh",
            maxHeight: "100vh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Summary allQuestions={allQuestions} />
        </Grid>
      )}
    </>
  );
}
