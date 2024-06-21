import React from "react";
import "./App.css";
import { Grid } from "@mui/material";

import LeftNav from "./components/leftNav";
import MainContent from "./components/mainContent";

function App() {
  return (
    <div className="App">
      <Grid
        container
        direction="row"
        sx={{
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <LeftNav />
        <MainContent />
      </Grid>
    </div>
  );
}

export default App;
