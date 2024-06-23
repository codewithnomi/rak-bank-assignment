import React, { useState } from "react";
import { Badge, Box, Button, Grid, Slide, Typography } from "@mui/material";
import { Question } from "../../slices/questionSlice";
import SendIcon from "@mui/icons-material/Send";

interface SummaryProps {
  allQuestions: Question[];
}

export default function Summary({ allQuestions }: SummaryProps) {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const data = allQuestions;

    try {
      setSubmitLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setSubmitLoading(false);
      if (response.ok) {
        const result = await response.json();
        console.log("result", result);
        if (window.confirm("Thanks for submission")) {
          window.location.reload();
        }
      } else {
        console.error("Error submitting:", response.status);
      }
    } catch (error) {
      setSubmitLoading(false);
      console.error("Error submitting:", error);
    }
  };
  return (
    <>
      {allQuestions.map((q: Question, i: number) => (
        <React.Fragment key={i}>
          <Grid item container sm={6} xs={9} p={3}>
            <Slide
              timeout={{ enter: 500, exit: 0 }}
              direction="right"
              in={true}
              mountOnEnter
              unmountOnExit
            >
              <Typography variant="h5">{q.question}</Typography>
            </Slide>
          </Grid>

          <Grid
            item
            container
            sm={6}
            xs={3}
            direction="column"
            justifyContent="center"
            alignItems={"center"}
          >
            <Slide
              timeout={{ enter: 500, exit: 0 }}
              direction="left"
              in={true}
              mountOnEnter
              unmountOnExit
            >
              <Badge
                color="primary"
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={q.options[q.selected]?.label || ""}
              >
                <Box sx={{ border: "none", fontSize: "3rem", color: "black" }}>
                  {q.options[q.selected]?.icon || ""}
                </Box>
              </Badge>
            </Slide>
          </Grid>
        </React.Fragment>
      ))}
      <Slide
        timeout={{ enter: 500, exit: 0 }}
        direction="up"
        in={true}
        mountOnEnter
        unmountOnExit
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          endIcon={!submitLoading && <SendIcon />}
          disabled={submitLoading}
        >
          {submitLoading ? "Loading..." : "Submit"}
        </Button>
      </Slide>
    </>
  );
}
