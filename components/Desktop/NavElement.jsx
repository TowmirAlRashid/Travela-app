import { Box, Typography } from "@mui/material";
import React from "react";

const NavElement = ({ label, navElementSelected, setNavElementSelected }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "3rem",
        cursor: "pointer",
        borderLeft: `${
          navElementSelected === label ? "2px solid red" : "2px solid white"
        }`,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        pl: "1rem",
        backgroundColor: `${
          navElementSelected === label ? "#fafafb" : "transparent"
        }`,
      }}
      onClick={() => setNavElementSelected(label)}
    >
      <Typography
        sx={{
          color: `${navElementSelected === label ? "red" : "black"}`,
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default NavElement;
