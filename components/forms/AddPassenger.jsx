import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const AddPassenger = ({
  openAddPassengerDialog,
  handleClosePassenger,
  primaryContactId,
  setPassengers,
  passengers,
  newPasasengerAddedMessage,
  setNewPassengerAddedMessage,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      First_Name: "",
      Last_Name: "",
      Type: "",
    },
  });

  const handleAddPassenger = async (data) => {
    setIsLoading(true);

    const submitData = {
      First_Name: data?.First_Name,
      Last_Name: data?.Last_Name,
      Type: data?.Type,
      Associated_with: primaryContactId,
    };
    // console.log(submitData);

    try {
      const recordObject = {
        moduleName: "Contacts",
        updatedField: submitData,
      };

      const result = await axios.post(
        "/api/zoho/addPassengerRecord",
        recordObject
      );
      console.log(result);

      if (result.status === 200) {
        // setPassengers([
        //   ...passengers,
        //   {
        //     ...submitData,
        //     Full_Name: data?.First_Name + " " + data?.Last_Name,
        //   },
        // ]);

        setMessage("New Passenger added! Please Refresh the page.");
      }
    } catch (error) {
      console.log(error);
    }

    // reset();
    setIsLoading(false);
    handleClosePassenger();
  };

  return (
    <Dialog
      open={openAddPassengerDialog}
      onClose={handleClosePassenger}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box component="form" onSubmit={handleSubmit(handleAddPassenger)}>
        <DialogTitle id="alert-dialog-title">
          <Typography fontWeight="bold" fontSize={22}>
            Add new Passenger?
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ mt: "1.4rem" }}>
          <Controller
            control={control}
            name="First_Name"
            // rules={{ required: true }}
            render={({ field }) => (
              <TextField
                inputProps={{
                  style: {
                    padding: "12px 8px",
                    margin: "2px 8px",
                  },
                }}
                id="first_name"
                variant="outlined"
                {...field}
                sx={{
                  mb: "1rem",
                  width: "100%",
                }}
                // error={errors["First_Name"]}
                label="First Name"
              />
            )}
          />

          <Controller
            control={control}
            name="Last_Name"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                inputProps={{
                  style: {
                    padding: "12px 8px",
                    margin: "2px 8px",
                  },
                }}
                id="last_name"
                variant="outlined"
                {...field}
                sx={{
                  mb: "1rem",
                  width: "100%",
                }}
                error={errors["Last_Name"]}
                label="Last Name*"
              />
            )}
          />

          <Controller
            name="Type"
            control={control}
            render={({ field }) => {
              return (
                <Autocomplete
                  {...field}
                  disablePortal
                  options={["Adult", "Children", "Infant"]}
                  getOptionLabel={(option) => option}
                  onChange={(_, data) => {
                    field.onChange(data);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      padding: "6px 14px",
                      mb: "1rem",
                      mt: "0.3rem",
                    },
                    width: "100%",
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Type" />
                  )}
                />
              );
            }}
          />

          <Typography>{newPasasengerAddedMessage}</Typography>
        </DialogContent>

        <DialogActions sx={{ mr: "1rem" }}>
          <Button onClick={handleClosePassenger}>Close</Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "red" },
              width: "10rem",
            }}
          >
            {!isLoading ? "Add Passenger" : <CircularProgress size={24} />}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddPassenger;
