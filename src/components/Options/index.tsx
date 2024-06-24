import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import { Box, Chip, Slide, Tooltip, Typography } from "@mui/material";

export default function Options(props: any) {
  const { options, forceRender, selected, handleChange } = props;

  return (
    <>
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
            <Box>
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
              {/* {selected === key && <Chip label={options[key].label} />} */}
            </Box>
          </Slide>
        ))}
    </>
  );
}
