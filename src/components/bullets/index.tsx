import React from "react";
import { Box } from "@mui/material";

interface BulletsProps {
  count: number;
  selected: number;
  handleBulletClick: (index: number) => void;
}

export default function Bullets({
  count,
  selected = 0,
  handleBulletClick,
}: BulletsProps) {
  return (
    <>
      {Array.from(Array(++count)).map((_, index) => (
        <Box
          data-testid={"bullets-component"}
          key={index}
          onClick={() => handleBulletClick(index)}
          sx={{
            m: "2px 5px",
            p: "5px",
            maxWidth: "7px",
            maxHeight: "7px",
            borderRadius: "50%",
            backgroundColor: index === selected ? "" : "white",
            border: "2px solid white",
            cursor: "pointer",
          }}
        ></Box>
      ))}
    </>
  );
}
