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
      Middle_Name: "",
      Last_Name: "",
      Type: "",
    },
  });

  const handleAddPassenger = async (data) => {
    setIsLoading(true);

    const submitData = {
      First_Name: data?.First_Name,
      Middle_Name: data?.Middle_Name,
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
        setPassengers([
          ...passengers,
          {
            ...submitData,
            Full_Name: data?.First_Name + " " + data?.Last_Name,
            id: result?.data?.details?.data?.[0]?.details?.id,
            Gender: "",
            Date_of_Birth: "",
            Are_you_Vaccinated: "",
            How_Many_Vaccine_Doses_Taken: "",
            Email: "",
            Contact_has_no_email: "",
            Phone: "",
            Mailing_Street: "",
            Mailing_Street_2: "",
            Mailing_City: "",
            Mailing_City_2: "",
            Mailing_State: "",
            Mailing_State_2: "",
            Mailing_Country: "",
            Mailing_Country_2: "",
            Mailing_Zip: "",
            Mailing_Zip_2: "",
            First_Name_Emergency_Contact: "",
            Last_Name_Emergency_Contact: "",
            Relationship: "",
            Email_Emergency_Contact: "",
            Country_Code_Emergency_Contact: "",
            Phone_Emergency_Contact: "",
            First_Name_As_Shown_in_Passport_Document: "",
            Middle_Name_As_Shown_in_Passport_Document: "",
            Last_Name_As_Shown_in_Passport_Document: "",
            Nationality: "",
            Place_of_Birth: "",
            Place_of_Issue: "",
            Document_Type: "",
            Country: "",
            Gender_Document: "",
            Passport_No_Document_ID_No: "",
            Date_of_Expiry: "",
            Date_of_Birth_As_Shown_in_Passport_Document: "",
            Date_of_Issue: "",
            Occasion_1: "",
            Occasion_1_Date: "",
            Occasion_2: "",
            Occasion_2_Date: "",
            Occasion_3: "",
            Occasion_3_Date: "",
            Occasion_4: "",
            Occasion_4_Date: "",
            Occasion_5: "",
            Occasion_5_Date: "",
            Program_Name_1: "",
            Program_Membership_Number_1: "",
            Program_Name_2: "",
            Program_Membership_Number_2: "",
            Program_Name_3: "",
            Program_Membership_Number_3: "",
            Program_Name_4: "",
            Program_Membership_Number_4: "",
            Program_Name_5: "",
            Program_Membership_Number_5: "",
            Program_Name_6: "",
            Program_Membership_Number_6: "",
            Program_Name_7: "",
            Program_Membership_Number_7: "",
            Program_Name_8: "",
            Program_Membership_Number_8: "",
            Program_Name_9: "",
            Program_Membership_Number_9: "",
            Program_Name_10: "",
            Program_Membership_Number_10: "",
            Wheelchair: "",
            Extral_Legroom: "",
            Pet: "",
            Medical: "",
            Airport_Assistance: "",
            Comment: "",
          },
        ]);

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
            rules={{ required: true }}
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
                error={errors["First_Name"]}
                label="First Name"
                // InputLabelProps={{ shrink: true }}
              />
            )}
          />

          <Controller
            control={control}
            name="Middle_Name"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                inputProps={{
                  style: {
                    padding: "12px 8px",
                    margin: "2px 8px",
                  },
                }}
                id="Middle_Name"
                variant="outlined"
                {...field}
                sx={{
                  mb: "1rem",
                  width: "100%",
                }}
                error={errors["Middle_Name"]}
                label="Middle Name"
                // InputLabelProps={{ shrink: true }}
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
                // InputLabelProps={{ shrink: true }}
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
                    <TextField
                      {...params}
                      label="Type"
                      // InputLabelProps={{ shrink: true }}
                    />
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
