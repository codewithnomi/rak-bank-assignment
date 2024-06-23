import React from "react";
import "./App.css";
import { Grid } from "@mui/material";

import LeftNav from "./components/leftNav";
import MainContent from "./components/mainContent";

function App() {
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={1}>
          <LeftNav />
        </Grid>
        <Grid item xs={11}>
          <MainContent />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
