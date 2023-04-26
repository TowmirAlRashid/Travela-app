import { Box, Typography } from "@mui/material";
import React from "react";

const CustomPreferButton = ({
  passengerSelected,
  type,
  label,
  setPassengerSelected,
}) => {
  return (
    <Box
      sx={{
        border: `${
          passengerSelected?.preference?.[type] === false
            ? "1px solid black"
            : "1px solid red"
        }`,
        p: "0.75rem 1rem",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: `${
          passengerSelected?.preference?.[type] === false
            ? "transparent"
            : "red"
        }`,
      }}
      onClick={() =>
        setPassengerSelected({
          ...passengerSelected,
          preference: {
            ...passengerSelected?.preference,
            [type]: !passengerSelected?.preference?.[type],
          },
        })
      }
    >
      <Typography
        sx={{
          fontWeight: "bold",
          color: `${
            passengerSelected?.preference?.[type] === false ? "black" : "white"
          }`,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default CustomPreferButton;
