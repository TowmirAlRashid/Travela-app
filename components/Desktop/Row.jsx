import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";

const Row = ({
  data,
  handleDeletePassenger,
  passengerSelected,
  setPassengerSelected,
  setNavElementSelected,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  return (
    <Box
      sx={{
        width: "100%",
        height: "4rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        pl: "0.5rem",
        backgroundColor: `${
          passengerSelected?.id === data?.id
            ? "red"
            : hovered
            ? "white"
            : "transparent"
        }`,
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setPassengerSelected(null);
        setPassengerSelected(data);
        setNavElementSelected("Personal Details");
      }}
    >
      <Typography
        sx={{
          width: "60%",
          fontSize: "14px",
          color: `${passengerSelected?.id === data?.id ? "white" : "black"}`,
        }}
      >
        {data?.Full_Name}
      </Typography>

      <Typography
        sx={{
          width: "20%",
          fontSize: "14px",
          color: `${passengerSelected?.id === data?.id ? "white" : "black"}`,
        }}
      >
        {data?.Type}
      </Typography>

      {hovered && (
        <IconButton onClick={() => handleDeletePassenger(data)}>
          <DeleteIcon
            sx={{
              color: `${
                passengerSelected?.id === data?.id ? "white" : "black"
              }`,
            }}
          />
        </IconButton>
      )}
    </Box>
  );
};

export default Row;
