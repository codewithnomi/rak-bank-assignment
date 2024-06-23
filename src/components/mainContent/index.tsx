import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import data from "../../constants/data.json";
import { Grid } from "@mui/material";

import OptionsContainer from "../../components/OptionsContainer";
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
    <Grid container>
      {!showSummary ? (
        <>
          <Grid
            item
            sm={6}
            xs={12}
            container
            direction="row"
            justifyContent="flex-start"
            alignContent="center"
            sx={{
              bgcolor: "#6b54fe",
              minHeight: { xs: "60vh", sm: "100vh" },
              maxHeight: { xs: "60vh" },
              overflowY: "hidden",
            }}
          >
            <Questions />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{
              minHeight: { xs: "40vh" },
              overflowY: "hidden",
            }}
          >
            <OptionsContainer />
          </Grid>
        </>
      ) : (
        <Grid
          item
          xs={12}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            p: { sm: "50px 100px", xs: "20px 20px" },
            maxHeight: "100vh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Summary allQuestions={allQuestions} />
        </Grid>
      )}
    </Grid>
  );
}
