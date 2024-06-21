import React from "react";
import { Slide, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Questions() {
  const { selectedQuestion, key: forceRender } = useSelector(
    (state: RootState) => state.question
  );

  return (
    <Slide
      key={forceRender}
      timeout={500}
      direction="up"
      in={true}
      mountOnEnter
      unmountOnExit
    >
      <Typography
        variant="h4"
        color={"white"}
        fontSize={"4rem"}
        p={10}
        fontWeight={"bold"}
      >
        {selectedQuestion?.question}
      </Typography>
    </Slide>
  );
}
