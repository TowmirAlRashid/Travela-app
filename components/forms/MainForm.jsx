import React, { useEffect, useState } from "react";

import axios from "axios";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Controller, useForm } from "react-hook-form";

import countryCodes from "./CountryCodes";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import CustomAccordionBar from "../Mobile/CustomAccordionBar";
import FileInput from "./FileInput";

const MainForm = ({
  isMobile,
  passengerSelected,
  navElementSelected,
  setNavElementSelected,
  countries,
  setPassengerSelected,
  currentOccasions,
  setCurrentOccasions,
}) => {
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // submit loading
  const [open, setOpen] = useState(false); // dialog open
  const [message, setMessage] = useState(""); // message for the confirmation dialog

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: passengerSelected || {},
  });

  // console.log(passengerSelected);

  useEffect(() => {
    reset(passengerSelected);
  }, [passengerSelected, reset]);

  const onsubmit = async (data) => {
    setIsLoading(true);
    const submitData = {
      First_Name: data?.First_Name,
      Middle_Name: data?.Middle_Name,
      Last_Name: data?.Last_Name,
      Gender: data?.Gender,
      Date_of_Birth: data?.Date_of_Birth,
      Are_you_Vaccinated: data?.Are_you_Vaccinated,
      How_Many_Vaccine_Doses_Taken: data?.How_Many_Vaccine_Doses_Taken,
      Email: data?.Email,
      Contact_has_no_email: data?.no_email,
      Phone: data?.Phone,
      Mailing_Street: data?.Mailing_Street,
      Mailing_Street_2: data?.Mailing_Street_2,
      // Mailing_Street_3: data?.Mailing_Street_3,
      Mailing_City: data?.Mailing_City,
      Mailing_City_2: data?.Mailing_City_2,
      // Mailing_City_3: data?.Mailing_City_3,
      Mailing_State: data?.Mailing_State,
      Mailing_State_2: data?.Mailing_State_2,
      // Mailing_State_3: data?.Mailing_State_3,
      Mailing_Country: data?.Mailing_Country,
      Mailing_Country_2: data?.Mailing_Country_2,
      // Mailing_Country_3: data?.Mailing_Country_3,
      Mailing_Zip: data?.Mailing_Zip,
      Mailing_Zip_2: data?.Mailing_Zip_2,
      // Mailing_Zip_3: data?.Mailing_Zip_3,
      First_Name_Emergency_Contact: data?.First_Name_Emergency_Contact,
      Last_Name_Emergency_Contact: data?.Last_Name_Emergency_Contact,
      Relationship: data?.Relationship,
      Email_Emergency_Contact: data?.Email_Emergency_Contact,
      Country_Code_Emergency_Contact: data?.Country_Code_Emergency_Contact,
      Phone_Emergency_Contact: data?.Phone_Emergency_Contact,
      First_Name_As_Shown_in_Passport_Document:
        data?.First_Name_As_Shown_in_Passport_Document,
      Middle_Name_As_Shown_in_Passport_Document:
        data?.Middle_Name_As_Shown_in_Passport_Document,
      Last_Name_As_Shown_in_Passport_Document:
        data?.Last_Name_As_Shown_in_Passport_Document,
      Nationality: data?.Nationality,
      Place_of_Birth: data?.Place_of_Birth,
      Place_of_Issue: data?.Place_of_Issue,
      Document_Type: data?.Document_Type,
      Country: data?.Country,
      Gender_Document: data?.Gender_Document,
      Passport_No_Document_ID_No: data?.Passport_No_Document_ID_No,
      Date_of_Expiry: data?.Date_of_Expiry,
      Date_of_Birth_As_Shown_in_Passport_Document:
        data?.Date_of_Birth_As_Shown_in_Passport_Document,
      Date_of_Issue: data?.Date_of_Issue,
      Occasion_1: data?.Occasion_1,
      Occasion_1_Date: data?.Occasion_1_Date,
      Occasion_2: data?.Occasion_2,
      Occasion_2_Date: data?.Occasion_2_Date,
      Occasion_3: data?.Occasion_3,
      Occasion_3_Date: data?.Occasion_3_Date,
      Occasion_4: data?.Occasion_4,
      Occasion_4_Date: data?.Occasion_4_Date,
      Occasion_5: data?.Occasion_5,
      Occasion_5_Date: data?.Occasion_5_Date,
      Wheelchair: data?.Wheelchair,
      Extral_Legroom: data?.Extral_Legroom,
      Pet: data?.Pet,
      Medical: data?.Medical,
      Airport_Assistance: data?.Airport_Assistance,
      Comment: data?.Comment,
    };

    try {
      const recordObject = {
        id: passengerSelected?.id,
        moduleName: "Contacts",
        updatedField: submitData,
      };
      const result = await axios.post("/api/zoho/updateRecord", recordObject);
      console.log(result);

      if (result.data?.status === 200) {
        setMessage(result?.data?.message);
        handleClickOpen();
        setIsLoading(false);
      }
    } catch (error) {
      // setMessage(result.data?.message);
      handleClickOpen();
      setIsLoading(false);
    }

    console.log(submitData);
  };

  return (
    <Box
      sx={{
        width: `100%`,
        height: {
          lg: "82vh",
          md: "82vh",
        },
        p: {
          lg: "3.5rem 2rem 2rem",
          md: "3.5rem 2rem 2rem",
          sm: "0.5rem 0",
          xs: "0.5rem 0",
        },
      }}
      component="form"
      onSubmit={handleSubmit(onsubmit)}
    >
      {isMobile && (
        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
          {passengerSelected?.Full_Name}
        </Typography>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            mt: "1.5rem",
          }}
        >
          <CustomAccordionBar
            setNavElementSelected={setNavElementSelected}
            label="Personal Details"
            navElementSelected={navElementSelected}
          />
        </Box>
      )}

      {navElementSelected === "Personal Details" && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: {
                lg: "1.2rem",
                md: "1.2rem",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1rem",
                  md: "1rem",
                },
              }}
            >
              <Controller
                control={control}
                name="First_Name"
                defaultValue={passengerSelected?.First_Name}
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
                      width: {
                        lg: "46%",
                        md: "46%",
                        sm: "100%",
                        xs: "100%",
                      },
                    }}
                    error={errors["First_Name"]}
                    label="First Name*"
                  />
                )}
              />

              <Controller
                control={control}
                name="Middle_Name"
                defaultValue={passengerSelected?.Middle_Name}
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
                      width: {
                        lg: "46%",
                        md: "46%",
                        sm: "100%",
                        xs: "100%",
                      },
                    }}
                    // error={errors["First_Name"]}
                    label="Middle Name"
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1.2rem",
                  md: "1.2rem",
                },
              }}
            >
              <Controller
                control={control}
                name="Last_Name"
                defaultValue={passengerSelected?.Last_Name}
                // rules={{ required: true }}
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
                      width: {
                        lg: "46%",
                        md: "46%",
                        sm: "100%",
                        xs: "100%",
                      },
                      mb: {
                        lg: "1.2rem",
                        md: "1.2rem",
                        sm: "0.7rem",
                        xs: "0.7rem",
                      },
                    }}
                    // error={errors["first_name"]}
                    label="Last Name"
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1rem",
                  md: "1rem",
                },
                mt: {
                  lg: "-0.4rem",
                  md: "-0.4rem",
                },
              }}
            >
              <Controller
                name="Gender"
                control={control}
                defaultValue={passengerSelected.Gender}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      disablePortal
                      options={["Male", "Female", "Others"]}
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
                        width: {
                          lg: "46%",
                          md: "46%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Gender" />
                      )}
                    />
                  );
                }}
              />

              {/* <Controller
                name="Date_of_Birth"
                control={control}
                defaultValue={dayjs(passengerSelected?.Date_of_Birth)}
                render={({ field: { ref, ...field } }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        inputFormat="YYYY-MM-DD"
                        label="Date of Birth"
                        {...field}
                        defaultValue={dayjs(passengerSelected?.Date_of_Birth)}
                        onChange={(newValue) => {
                          const formattedDate =
                            dayjs(newValue).format("YYYY-MM-DD");
                          field.onChange(formattedDate);
                        }}
                        renderInput={(params) => (
                          <TextField
                            id="date_of_birth"
                            variant="outlined"
                            type="date"
                            sx={{
                              "& .MuiInputBase-input": {
                                padding: "14px 14px",
                              },
                              width: {
                                lg: "46%",
                                md: "46%",
                                sm: "100%",
                                xs: "100%",
                              },
                              mt: {
                                lg: "-0.7rem",
                                md: "-0.7rem",
                              },
                            }}
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  );
                }}
              /> */}
            </Box>

            <Box
              sx={{
                width: {
                  lg: "94%",
                  md: "94%",
                  sm: "100%",
                  xs: "100%",
                },
                mt: "1rem",
                backgroundColor: "#fff3cd",
                p: "0.8rem",
                borderRadius: "4px",
              }}
            >
              <Typography mb={2}>
                ◾ Please provide travelers details below using the secure and
                encrypted online form to help protect your private information.
              </Typography>
              <Typography>
                ◾ Names have to match government issued passport and IDs to
                avoid issues during travel.
              </Typography>
            </Box>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "red" },
                }}
                onClick={() => setNavElementSelected("Vaccination")}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            mt: "1rem",
          }}
        >
          <CustomAccordionBar
            setNavElementSelected={setNavElementSelected}
            label="Vaccination"
            navElementSelected={navElementSelected}
          />
        </Box>
      )}

      {navElementSelected === "Vaccination" && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: {
                lg: "1.2rem",
                md: "1.2rem",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1rem",
                  md: "1rem",
                },
              }}
            >
              <Controller
                name="Are_you_Vaccinated"
                control={control}
                defaultValue={passengerSelected.Are_you_Vaccinated}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      disablePortal
                      options={["Yes", "No"]}
                      getOptionLabel={(option) => option}
                      onChange={(_, data) => {
                        field.onChange(data);
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          padding: "6px 14px",
                          mb: "1rem",
                        },
                        width: {
                          lg: "46%",
                          md: "46%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Are you Vaccinated?" />
                      )}
                    />
                  );
                }}
              />

              <Controller
                control={control}
                name="How_Many_Vaccine_Doses_Taken"
                defaultValue={passengerSelected?.How_Many_Vaccine_Doses_Taken}
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="How_Many_Vaccine_Doses_Taken"
                    variant="outlined"
                    {...field}
                    sx={{
                      width: {
                        lg: "46%",
                        md: "46%",
                        sm: "100%",
                        xs: "100%",
                      },
                      mb: {
                        lg: "1.2rem",
                        md: "1.2rem",
                        sm: "0.7rem",
                        xs: "0.7rem",
                      },
                    }}
                    // error={errors["first_name"]}
                    label="How many vaccine doses taken?"
                  />
                )}
              />
            </Box>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "red" },
                }}
                onClick={() => setNavElementSelected("Contact Information")}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            mt: "1rem",
          }}
        >
          <CustomAccordionBar
            setNavElementSelected={setNavElementSelected}
            label="Contact Information"
            navElementSelected={navElementSelected}
          />
        </Box>
      )}

      {navElementSelected === "Contact Information" && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: {
                lg: "1.2rem",
                md: "1.2rem",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "column",
                  md: "column",
                  sm: "column",
                  xs: "column",
                },
                // gap: {
                //   lg: "1rem",
                //   md: "1rem",
                // },
              }}
            >
              <Controller
                control={control}
                name="Email"
                defaultValue={passengerSelected?.Email}
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="Email"
                    variant="outlined"
                    {...field}
                    sx={{
                      width: {
                        lg: "95%",
                        md: "95%",
                        sm: "100%",
                        xs: "100%",
                      },
                      mb: {
                        lg: "0.7rem",
                        md: "0.7rem",
                      },
                    }}
                    // error={errors["number_of_vaccine_doses"]}
                    label="Personal Email"
                  />
                )}
              />

              <FormControlLabel
                control={
                  <Controller
                    name="no_email"
                    control={control}
                    // defaultValue={passengerSelected?.}
                    render={({ field: props }) => (
                      <Checkbox
                        {...props}
                        checked={props.value}
                        onChange={(e) => props.onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label="Traveler has no email."
              />

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: {
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  },
                  gap: {
                    lg: "1rem",
                    md: "1rem",
                  },
                  mt: "1rem",
                }}
              >
                <Controller
                  control={control}
                  name="Phone"
                  defaultValue={passengerSelected?.Phone}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: {
                          padding: "12px 8px",
                          margin: "2px 8px",
                        },
                      }}
                      id="Phone"
                      variant="outlined"
                      {...field}
                      sx={{
                        mb: "0.7rem",
                        width: {
                          lg: "95%",
                          md: "95%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                      // error={errors["first_name"]}
                      label="Phone Number"
                    />
                  )}
                />
              </Box>

              {/* <FormControlLabel
                control={
                  <Controller
                    name="send_text_for_trip"
                    control={control}
                    // defaultValue={passengerSelected?.}
                    render={({ field: props }) => (
                      <Checkbox
                        {...props}
                        checked={props.value}
                        onChange={(e) => props.onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label="Send Text Messages with important information for my trip."
              /> */}
            </Box>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "red" },
                }}
                onClick={() => setNavElementSelected("Address")}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            mt: "1rem",
          }}
        >
          <CustomAccordionBar
            setNavElementSelected={setNavElementSelected}
            label="Address"
            navElementSelected={navElementSelected}
          />
        </Box>
      )}

      {navElementSelected === "Address" && (
        <Box
          sx={{
            width: "100%",
            // height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: {
                lg: "1.2rem",
                md: "1.2rem",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                border: "1px solid black",
                borderRadius: "4px",
                p: {
                  xs: "0.5rem",
                  sm: "0.5rem",
                  md: "1.5rem",
                  lg: "1.5rem",
                },
                mb: "0.7rem",
              }}
            >
              <Typography>Home Address</Typography>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: {
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  },
                  gap: {
                    lg: "1rem",
                    md: "1rem",
                  },
                  mt: "1rem",
                }}
              >
                <Controller
                  control={control}
                  name={`Mailing_Street`}
                  defaultValue={passengerSelected?.Mailing_Street}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: {
                          padding: "12px 8px",
                          margin: "2px 8px",
                        },
                      }}
                      id="street"
                      variant="outlined"
                      {...field}
                      sx={{
                        mb: "1rem",
                        width: {
                          lg: "95%",
                          md: "46%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                      // error={errors["first_name"]}
                      label="Street"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name={`Mailing_City`}
                  defaultValue={passengerSelected?.Mailing_City}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: {
                          padding: "12px 8px",
                          margin: "2px 8px",
                        },
                      }}
                      id="city"
                      variant="outlined"
                      {...field}
                      sx={{
                        mb: "1rem",
                        width: {
                          lg: "95%",
                          md: "46%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                      // error={errors["first_name"]}
                      label="City"
                    />
                  )}
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: {
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  },
                  gap: {
                    lg: "1rem",
                    md: "1rem",
                  },
                }}
              >
                <Controller
                  control={control}
                  name={`Mailing_State`}
                  defaultValue={passengerSelected?.Mailing_State}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: {
                          padding: "12px 8px",
                          margin: "2px 8px",
                        },
                      }}
                      id="street"
                      variant="outlined"
                      {...field}
                      sx={{ mb: "1rem", width: "100%" }}
                      // error={errors["first_name"]}
                      label="State"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name={`Mailing_Country`}
                  defaultValue={passengerSelected?.Mailing_Country}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: {
                          padding: "12px 8px",
                          margin: "2px 8px",
                        },
                      }}
                      id="country"
                      variant="outlined"
                      {...field}
                      sx={{ mb: "1rem", width: "100%" }}
                      // error={errors["first_name"]}
                      label="Country"
                    />
                  )}
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: {
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  },
                  gap: {
                    lg: "1rem",
                    md: "1rem",
                  },
                }}
              >
                <Controller
                  control={control}
                  name={`Mailing_Zip`}
                  defaultValue={passengerSelected?.Mailing_Zip}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: {
                          padding: "12px 8px",
                          margin: "2px 8px",
                        },
                      }}
                      id="zip"
                      variant="outlined"
                      {...field}
                      sx={{
                        mb: "1rem",
                        width: {
                          lg: "49%",
                          md: "49%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                      // error={errors["first_name"]}
                      label="Zip"
                    />
                  )}
                />
              </Box>
            </Box>

            <Box
              sx={{
                width: "100%",
                border: "1px solid black",
                borderRadius: "4px",
                p: {
                  xs: "0.5rem",
                  sm: "0.5rem",
                  md: "1.5rem",
                  lg: "1.5rem",
                },
                mb: "0.7rem",
              }}
            >
              <Typography>Work Address</Typography>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: {
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  },
                  gap: {
                    lg: "1rem",
                    md: "1rem",
                  },
                  mt: "1rem",
                }}
              >
                <Controller
                  control={control}
                  name={`Mailing_Street_2`}
                  defaultValue={passengerSelected?.Mailing_Street_2}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: {
                          padding: "12px 8px",
                          margin: "2px 8px",
                        },
                      }}
                      id="street"
                      variant="outlined"
                      {...field}
                      sx={{
                        mb: "1rem",
                        width: {
                          lg: "95%",
                          md: "46%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                      // error={errors["first_name"]}
                      label="Street"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name={`Mailing_City_2`}
                  defaultValue={passengerSelected?.Mailing_City_2}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: {
                          padding: "12px 8px",
                          margin: "2px 8px",
                        },
                      }}
                      id="city"
                      variant="outlined"
                      {...field}
                      sx={{
                        mb: "1rem",
                        width: {
                          lg: "95%",
                          md: "46%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                      // error={errors["first_name"]}
                      label="City"
                    />
                  )}
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: {
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  },
                  gap: {
                    lg: "1rem",
                    md: "1rem",
                  },
                }}
              >
                <Controller
                  control={control}
                  name={`Mailing_State_2`}
                  defaultValue={passengerSelected?.Mailing_State_2}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: {
                          padding: "12px 8px",
                          margin: "2px 8px",
                        },
                      }}
                      id="street"
                      variant="outlined"
                      {...field}
                      sx={{ mb: "1rem", width: "100%" }}
                      // error={errors["first_name"]}
                      label="State"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name={`Mailing_Country_2`}
                  defaultValue={passengerSelected?.Mailing_Country_2}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: {
                          padding: "12px 8px",
                          margin: "2px 8px",
                        },
                      }}
                      id="country"
                      variant="outlined"
                      {...field}
                      sx={{ mb: "1rem", width: "100%" }}
                      // error={errors["first_name"]}
                      label="Country"
                    />
                  )}
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: {
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  },
                  gap: {
                    lg: "1rem",
                    md: "1rem",
                  },
                }}
              >
                <Controller
                  control={control}
                  name={`Mailing_Zip_2`}
                  defaultValue={passengerSelected?.Mailing_Zip_2}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: {
                          padding: "12px 8px",
                          margin: "2px 8px",
                        },
                      }}
                      id="zip"
                      variant="outlined"
                      {...field}
                      sx={{
                        mb: "1rem",
                        width: {
                          lg: "49%",
                          md: "49%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                      // error={errors["first_name"]}
                      label="Zip"
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "red" },
                }}
                onClick={() => setNavElementSelected("Emergency Contact")}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            mt: "1rem",
          }}
        >
          <CustomAccordionBar
            setNavElementSelected={setNavElementSelected}
            label="Emergency Contact"
            navElementSelected={navElementSelected}
          />
        </Box>
      )}

      {navElementSelected === "Emergency Contact" && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: {
                lg: "1.2rem",
                md: "1.2rem",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1rem",
                  md: "1rem",
                },
              }}
            >
              <Controller
                control={control}
                name="First_Name_Emergency_Contact"
                defaultValue={passengerSelected?.First_Name_Emergency_Contact}
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="em_contact_first_name"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="First Name"
                  />
                )}
              />

              <Controller
                control={control}
                name="Last_Name_Emergency_Contact"
                defaultValue={passengerSelected?.Last_Name_Emergency_Contact}
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="em_contact_last_name"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="Last Name"
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1rem",
                  md: "1rem",
                },
              }}
            >
              <Controller
                control={control}
                name="Relationship"
                defaultValue={passengerSelected?.Relationship}
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="em_contact_relation"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="Relationship"
                  />
                )}
              />

              <Controller
                control={control}
                name="Email_Emergency_Contact"
                defaultValue={passengerSelected?.Email_Emergency_Contact}
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="em_contact_email"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="Email"
                    type="email"
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1rem",
                  md: "1rem",
                },
              }}
            >
              <Controller
                name="Country_Code_Emergency_Contact"
                control={control}
                defaultValue={passengerSelected.Country_Code_Emergency_Contact}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      disablePortal
                      options={countryCodes}
                      getOptionLabel={(option) => option}
                      onChange={(_, data) => {
                        field.onChange(data);
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          padding: "6px 14px",
                          mb: "0.7rem",
                        },
                        width: {
                          lg: "46%",
                          md: "46%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Country Code" />
                      )}
                    />
                  );
                }}
              />

              <Controller
                control={control}
                name="Phone_Emergency_Contact"
                defaultValue={passengerSelected?.Phone_Emergency_Contact}
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="em_contact_phone"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="Phone Number"
                  />
                )}
              />
            </Box>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "red" },
                }}
                onClick={() => setNavElementSelected("Passport")}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            mt: "1rem",
          }}
        >
          <CustomAccordionBar
            setNavElementSelected={setNavElementSelected}
            label="Passport"
            navElementSelected={navElementSelected}
          />
        </Box>
      )}

      {navElementSelected === "Passport" && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: {
                lg: "1.2rem",
                md: "1.2rem",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#E058580A",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: "0.8rem",
                mb: "1.5rem",
              }}
            >
              <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
                If providing a copy of your Passport or Government ID, please
                upload at the bottom of this form.
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1rem",
                  md: "1rem",
                },
              }}
            >
              <Controller
                control={control}
                name="First_Name_As_Shown_in_Passport_Document"
                defaultValue={
                  passengerSelected?.First_Name_As_Shown_in_Passport_Document
                }
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="passport_middle_name"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="First Name"
                  />
                )}
              />

              <Controller
                control={control}
                name="Middle_Name_As_Shown_in_Passport_Document"
                defaultValue={
                  passengerSelected?.Middle_Name_As_Shown_in_Passport_Document
                }
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="passport_middle_name"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="Middle Name"
                  />
                )}
              />

              <Controller
                control={control}
                name="Last_Name_As_Shown_in_Passport_Document"
                defaultValue={
                  passengerSelected?.Last_Name_As_Shown_in_Passport_Document
                }
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="passport_middle_name"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="Last Name"
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1rem",
                  md: "1rem",
                },
              }}
            >
              <Controller
                control={control}
                name="Nationality"
                defaultValue={passengerSelected?.Nationality}
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="passport_nationality"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="Nationality"
                  />
                )}
              />

              <Controller
                control={control}
                name="Place_of_Birth"
                defaultValue={passengerSelected?.Place_of_Birth}
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="passport_place_of_birth"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="Place of birth"
                  />
                )}
              />

              <Controller
                control={control}
                name="Place_of_Issue"
                defaultValue={passengerSelected?.Place_of_Issue}
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="passport_place_of_issue"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="Place of issue"
                  />
                )}
              />
            </Box>

            {/* {!isMobile && <Divider sx={{ m: "1rem 0" }} />} */}

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1rem",
                  md: "1rem",
                },
              }}
            >
              <Controller
                name="Document_Type"
                control={control}
                defaultValue={passengerSelected.Document_Type}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      disablePortal
                      options={["Diplomatic", "Official", "Regular"]}
                      getOptionLabel={(option) => option}
                      onChange={(_, data) => {
                        field.onChange(data);
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          padding: "8px 14px",
                        },
                        width: "100%",
                        mb: "0.7rem",
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Type" />
                      )}
                    />
                  );
                }}
              />

              <Controller
                name="Country"
                control={control}
                defaultValue={passengerSelected.Country}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      disablePortal
                      options={countries}
                      getOptionLabel={(option) => option}
                      onChange={(_, data) => {
                        field.onChange(data);
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          padding: "8px 14px",
                        },
                        width: "100%",
                        mb: "0.7rem",
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Country" />
                      )}
                    />
                  );
                }}
              />

              <Controller
                name="Gender_Document"
                control={control}
                defaultValue={passengerSelected.Gender_Document}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      disablePortal
                      options={["Male", "Female", "Others"]}
                      getOptionLabel={(option) => option}
                      onChange={(_, data) => {
                        field.onChange(data);
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          padding: "8px 14px",
                        },
                        width: "100%",
                        mb: "0.7rem",
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Gender" />
                      )}
                    />
                  );
                }}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1rem",
                  md: "1rem",
                },
              }}
            >
              <Controller
                control={control}
                name="Passport_No_Document_ID_No"
                defaultValue={passengerSelected?.Passport_No_Document_ID_No}
                // rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      style: {
                        padding: "12px 8px",
                        margin: "2px 8px",
                      },
                    }}
                    id="passport_id"
                    variant="outlined"
                    {...field}
                    sx={{ mb: "0.7rem", width: "100%" }}
                    // error={errors["first_name"]}
                    label="Passport Number"
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                gap: {
                  lg: "1rem",
                  md: "1rem",
                },
              }}
            >
              {/* <Controller
                name="Date_of_Expiry"
                control={control}
                defaultValue={dayjs(passengerSelected?.Date_of_Expiry)}
                render={({ field: { ref, ...field } }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        inputFormat="YYYY-MM-DD"
                        label="Expiration Date"
                        {...field}
                        // defaultValue={dayjs(passengerSelected?.Date_of_Birth)}
                        onChange={(newValue) => {
                          const formattedDate =
                            dayjs(newValue).format("YYYY-MM-DD");
                          field.onChange(formattedDate);
                        }}
                        renderInput={(params) => (
                          <TextField
                            id="date_of_expiration"
                            variant="outlined"
                            type="date"
                            sx={{
                              "& .MuiInputBase-input": {
                                // height: "2.3rem !important",
                                padding: "14px 14px",
                              },
                              width: {
                                // lg: "46%",
                                // md: "46%",
                                sm: "100%",
                                xs: "100%",
                              },
                              mt: {
                                lg: "-0.7rem",
                                md: "-0.7rem",
                              },
                            }}
                            {...params}
                            // error={errors["Due_Date"]}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  );
                }}
              /> */}

              {/* <Controller
                name="Date_of_Birth_As_Shown_in_Passport_Document"
                control={control}
                defaultValue={dayjs(
                  passengerSelected?.Date_of_Birth_As_Shown_in_Passport_Document
                )}
                render={({ field: { ref, ...field } }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        inputFormat="YYYY-MM-DD"
                        label="Date of Birth"
                        {...field}
                        // defaultValue={dayjs(passengerSelected?.Date_of_Birth)}
                        onChange={(newValue) => {
                          const formattedDate =
                            dayjs(newValue).format("YYYY-MM-DD");
                          field.onChange(formattedDate);
                        }}
                        renderInput={(params) => (
                          <TextField
                            id="date_of_birth"
                            variant="outlined"
                            type="date"
                            sx={{
                              "& .MuiInputBase-input": {
                                // height: "2.3rem !important",
                                padding: "14px 14px",
                              },
                              width: {
                                // lg: "46%",
                                // md: "46%",
                                sm: "100%",
                                xs: "100%",
                              },
                              mt: {
                                lg: "-0.7rem",
                                md: "-0.7rem",
                              },
                            }}
                            {...params}
                            // error={errors["Due_Date"]}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  );
                }}
              /> */}

              {/* <Controller
                name="Date_of_Issue"
                control={control}
                defaultValue={dayjs(passengerSelected?.Date_of_Issue)}
                render={({ field: { ref, ...field } }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        inputFormat="YYYY-MM-DD"
                        label="Date of Issue"
                        {...field}
                        // defaultValue={dayjs(passengerSelected?.Date_of_Birth)}
                        onChange={(newValue) => {
                          const formattedDate =
                            dayjs(newValue).format("YYYY-MM-DD");
                          field.onChange(formattedDate);
                        }}
                        renderInput={(params) => (
                          <TextField
                            id="date_of_issue"
                            variant="outlined"
                            type="date"
                            sx={{
                              "& .MuiInputBase-input": {
                                // height: "2.3rem !important",
                                padding: "14px 14px",
                              },
                              width: {
                                // lg: "46%",
                                // md: "46%",
                                sm: "100%",
                                xs: "100%",
                              },
                              mt: {
                                lg: "-0.7rem",
                                md: "-0.7rem",
                              },
                            }}
                            {...params}
                            // error={errors["Due_Date"]}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  );
                }}
              /> */}
            </Box>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "red" },
                }}
                onClick={() => setNavElementSelected("Occasions")}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            mt: "1rem",
          }}
        >
          <CustomAccordionBar
            setNavElementSelected={setNavElementSelected}
            label="Occasions"
            navElementSelected={navElementSelected}
          />
        </Box>
      )}

      {navElementSelected === "Occasions" && (
        <Box
          sx={{
            width: "100%",
            // height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },
              justifyContent: {
                lg: "space-between",
                md: "space-between",
                sm: "flex-start",
                xs: "flex-start",
              },
              alignItems: "flex-start",
              gap: {
                sm: "1rem",
                xs: "0.8rem",
              },
              mb: "1rem",
            }}
          >
            <Typography fontWeight="bold">
              Record your special occasion here
            </Typography>

            <Button
              sx={{ color: "red" }}
              onClick={() => {
                setCurrentOccasions([
                  ...currentOccasions,
                  {
                    [`Occasion_${currentOccasions?.length + 1}`]: "",
                    [`Occasion_${currentOccasions?.length + 1}_Date`]: "",
                  },
                ]);
              }}
            >
              +Add Occasion
            </Button>
          </Box>

          {currentOccasions?.map((occasion, index) => {
            return (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: {
                    lg: "1.2rem",
                    md: "1.2rem",
                  },
                }}
                key={index}
              >
                <Box
                  sx={{
                    width: "100%",
                    border: "1px solid black",
                    borderRadius: "4px",
                    p: "0.5rem",
                    mb: "0.7rem",
                  }}
                >
                  <Typography>Occasion {index + 1}</Typography>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: {
                        lg: "row",
                        md: "row",
                        sm: "column",
                        xs: "column",
                      },
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: {
                        lg: "1rem",
                        md: "1rem",
                      },
                      mt: "1rem",
                    }}
                  >
                    <Controller
                      name={`Occasion_${index + 1}`}
                      control={control}
                      defaultValue={`${occasion?.[`Occasion_${index + 1}`]}`}
                      render={({ field }) => {
                        return (
                          <Autocomplete
                            {...field}
                            disablePortal
                            options={[
                              "Birthday",
                              "Spouse's Birthday",
                              "Parent's Birthday",
                              "Child's Birthday",
                              "Anniversary",
                              "Parent's Anniversary",
                              "Child's Anniversary",
                            ]}
                            getOptionLabel={(option) => option}
                            onChange={(_, data) => {
                              field.onChange(data);
                            }}
                            sx={{
                              "& .MuiInputBase-root": {
                                padding: "6px 14px",
                              },
                              width: "100%",
                              mb: "1.2rem",
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label="Occasion" />
                            )}
                          />
                        );
                      }}
                    />

                    {/* {JSON.stringify(`Occasion_${index + 1}_Date`)} */}

                    {/* <Controller
                      name={`Occasion_${index + 1}_Date`}
                      control={control}
                      defaultValue={dayjs(
                        `${occasion?.[`Occasion_${index + 1}_Date`]}`
                      )}
                      render={({ field: { ref, ...field } }) => {
                        return (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              inputFormat="YYYY-MM-DD"
                              label="Occasion Date"
                              {...field}
                              // defaultValue={dayjs(passengerSelected?.Date_of_Birth)}
                              onChange={(newValue) => {
                                const formattedDate =
                                  dayjs(newValue).format("YYYY-MM-DD");
                                field.onChange(formattedDate);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  id="occasion_1_date"
                                  variant="outlined"
                                  type="date"
                                  sx={{
                                    "& .MuiInputBase-input": {
                                      // height: "2.3rem !important",
                                      padding: "14px 14px",
                                    },
                                    width: {
                                      // lg: "46%",
                                      // md: "46%",
                                      sm: "100%",
                                      xs: "100%",
                                    },
                                    mt: {
                                      lg: "-1.1rem",
                                      md: "-1.1rem",
                                    },
                                  }}
                                  {...params}
                                  // error={errors["Due_Date"]}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        );
                      }}
                    /> */}
                  </Box>
                </Box>
              </Box>
            );
          })}

          {!isMobile && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "red" },
                }}
                onClick={() => setNavElementSelected("Loyality Program")}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            mt: "1rem",
          }}
        >
          <CustomAccordionBar
            setNavElementSelected={setNavElementSelected}
            label="Loyality Program"
            navElementSelected={navElementSelected}
          />
        </Box>
      )}

      {navElementSelected === "Loyality Program" && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: {
                lg: "1.2rem",
                md: "1.2rem",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#E058580A",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: "0.8rem",
                mb: "1.5rem",
              }}
            >
              <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
                Add your reward points programs for flights, hotels, cruises
                etc.
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: {
                  lg: "flex-end",
                  md: "flex-end",
                  sm: "flex-start",
                  xs: "flex-start",
                },
                alignItems: "center",
                // mb: "1rem",
              }}
            >
              <Button
                sx={{ color: "red" }}
                onClick={() => {
                  setPassengerSelected({
                    ...passengerSelected,
                    loyality_programs: [
                      ...passengerSelected?.loyality_programs,
                      {
                        loyality_program_company: "",
                        loyality_program: "",
                        reward_number: "",
                      },
                    ],
                  });
                }}
              >
                + Add Program
              </Button>
            </Box>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "red" },
                }}
                onClick={() => setNavElementSelected("Special Request")}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            mt: "1rem",
          }}
        >
          <CustomAccordionBar
            setNavElementSelected={setNavElementSelected}
            label="Special Request"
            navElementSelected={navElementSelected}
          />
        </Box>
      )}

      {navElementSelected === "Special Request" && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: {
                lg: "1.2rem",
                md: "1.2rem",
              },
            }}
          >
            <FormControlLabel
              control={
                <Controller
                  name="Wheelchair"
                  control={control}
                  defaultValue={passengerSelected?.Wheelchair}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      value={passengerSelected?.Wheelchair}
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label="Wheelchair"
              value={passengerSelected?.Wheelchair}
              onChange={(e) =>
                setValue("Wheelchair", e.target.checked, {
                  shouldDirty: true,
                })
              }
            />

            <FormControlLabel
              control={
                <Controller
                  name="Extral_Legroom"
                  control={control}
                  defaultValue={passengerSelected?.Extral_Legroom}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      value={passengerSelected?.Extral_Legroom}
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label="Extral Legroom"
              value={passengerSelected?.Extral_Legroom}
              onChange={(e) =>
                setValue("Extral_Legroom", e.target.checked, {
                  shouldDirty: true,
                })
              }
            />

            <FormControlLabel
              control={
                <Controller
                  name="Pet"
                  control={control}
                  defaultValue={passengerSelected?.Pet}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      value={passengerSelected?.Pet}
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label="Pet"
              value={passengerSelected?.Pet}
              onChange={(e) =>
                setValue("Pet", e.target.checked, {
                  shouldDirty: true,
                })
              }
            />

            <FormControlLabel
              control={
                <Controller
                  name="Medical"
                  control={control}
                  defaultValue={passengerSelected?.Medical}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      value={passengerSelected?.Medical}
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label="Medical"
              value={passengerSelected?.Medical}
              onChange={(e) =>
                setValue("Medical", e.target.checked, {
                  shouldDirty: true,
                })
              }
            />

            <FormControlLabel
              control={
                <Controller
                  name="Airport_Assistance"
                  control={control}
                  defaultValue={passengerSelected?.Airport_Assistance}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      checked={value}
                      value={passengerSelected?.Airport_Assistance}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label="Airport Assistance"
              value={passengerSelected?.Airport_Assistance}
              onChange={(e) =>
                setValue("Airport_Assistance", e.target.checked, {
                  shouldDirty: true,
                })
              }
            />

            <Controller
              control={control}
              name="Comment"
              defaultValue={passengerSelected?.Comment}
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  inputProps={{
                    style: {
                      padding: "6px 8px",
                      margin: "2px 8px",
                    },
                  }}
                  id="comment"
                  variant="outlined"
                  {...field}
                  sx={{ mb: "0.7rem", width: "100%" }}
                  // error={errors["first_name"]}
                  multiline
                  minRows={3}
                  maxRows={6}
                  label="Enter Comments (Notes)"
                />
              )}
            />
          </Box>

          {!isMobile && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "red" },
                }}
                onClick={() => setNavElementSelected("Upload")}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            mt: "1rem",
          }}
        >
          <CustomAccordionBar
            setNavElementSelected={setNavElementSelected}
            label="Upload"
            navElementSelected={navElementSelected}
          />
        </Box>
      )}

      {navElementSelected === "Upload" && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: {
                lg: "1.2rem",
                md: "1.2rem",
              },
            }}
          >
            <FileInput
              name="file alt text"
              label="Upload Attachments"
              attachments={attachments}
              setAttachments={setAttachments}
            />
          </Box>

          {!isMobile && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "red" },
                  width: "10rem",
                }}
                // onClick={() => console.log("Upload")}
                type="submit"
              >
                {!isLoading ? "Submit" : <CircularProgress size={24} />}
              </Button>
            </Box>
          )}
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            mt: "2rem",
          }}
        >
          <Button
            sx={{
              width: "80%",
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "red" },
            }}
            type="submit"
          >
            {!isLoading ? "Submit" : <CircularProgress size={24} />}
          </Button>
        </Box>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography>{message}</Typography>
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MainForm;
