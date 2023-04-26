import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import MainForm from "../forms/MainForm";

const MobileRowCard = ({
  data,
  handleDeletePassenger,
  passengerSelected,
  setPassengerSelected,
  navElementSelected,
  setNavElementSelected,
  isMobile,
  countries,
  currentOccasions,
  setCurrentOccasions,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          mb: "1rem",
          backgroundColor: `${
            passengerSelected?.id === data?.id ? "red" : "white"
          }`,
          boxShadow: "0px 2px 5px #171a1f, 0px 0px 2px #171a1f",
          p: "1rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "1rem",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
              color: `${
                passengerSelected?.id === data?.id ? "white" : "black"
              }`,
            }}
          >
            {data?.Full_Name}
          </Typography>

          <IconButton
            onClick={() => {
              if (!passengerSelected) {
                setPassengerSelected(data);
              } else {
                if (passengerSelected?.id === data?.id) {
                  setPassengerSelected(null);
                } else {
                  setPassengerSelected(null);
                  setPassengerSelected(data);
                }
              }
            }}
          >
            {passengerSelected?.id === data?.id ? (
              <RemoveIcon
                sx={{
                  color: `${
                    passengerSelected?.id === data?.id ? "white" : "black"
                  }`,
                }}
              />
            ) : (
              <AddIcon
                sx={{
                  color: `${
                    passengerSelected?.id === data?.id ? "white" : "black"
                  }`,
                }}
              />
            )}
          </IconButton>
        </Box>

        <Typography
          variant="p"
          sx={{
            fontSize: "16px",
            color: `${passengerSelected?.id === data?.id ? "white" : "black"}`,
            mb: "1rem",
          }}
        >
          {data?.Type}
        </Typography>

        <Box
          sx={{
            mt: "1rem",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <IconButton onClick={() => handleDeletePassenger(data)}>
            <DeleteIcon
              sx={{
                color: `${
                  passengerSelected?.id === data?.id ? "white" : "black"
                }`,
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {passengerSelected && passengerSelected?.id === data?.id && (
        <Box
          sx={{
            widt: "100%",
            border: "1px solid #DEE1E6FF",
            borderRadius: "4px",
            p: "0.8rem",
          }}
        >
          <MainForm
            isMobile={isMobile}
            navElementSelected={navElementSelected}
            passengerSelected={passengerSelected}
            setNavElementSelected={setNavElementSelected}
            countries={countries}
            setPassengerSelected={setPassengerSelected}
            currentOccasions={currentOccasions}
            setCurrentOccasions={setCurrentOccasions}
          />
        </Box>
      )}
    </Box>
  );
};

export default MobileRowCard;
