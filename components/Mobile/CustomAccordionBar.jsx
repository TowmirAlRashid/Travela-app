import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CustomAccordionBar = ({
  label,
  setNavElementSelected,
  navElementSelected,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderBottom: "2px solid #ddd",
        mb: "0.8rem",
      }}
    >
      <Typography sx={{ fontSize: "14px" }}>{label}</Typography>

      <IconButton
        onClick={() => {
          if (navElementSelected === label) {
            setNavElementSelected("");
          } else {
            setNavElementSelected(label);
          }
        }}
      >
        {navElementSelected === label ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </Box>
  );
};

export default CustomAccordionBar;
