import Head from "next/head";
import axios from "axios";

import { countries } from "@/data";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MobileRowCard from "@/components/Mobile/MobileRowCard";
import Row from "@/components/Desktop/Row";
import NavElement from "@/components/Desktop/NavElement";
import MainForm from "@/components/forms/MainForm";
import AddPassenger from "@/components/forms/AddPassenger";

export default function Home({ countries, primaryContact, otherContacts }) {
  const [passengers, setPassengers] = useState([
    primaryContact,
    ...otherContacts,
  ]); // gets all the passengers here
  const [passengerSelected, setPassengerSelected] = useState(primaryContact); // keeps the selected passenger object
  const [navElementSelected, setNavElementSelected] =
    useState("Personal Details"); // keeps the selected nav

  const [newPasasengerAddedMessage, setNewPassengerAddedMessage] = useState("");

  const theme = useTheme(); // used for theming
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDeletePassenger = async (passenger) => {
    // deletes a passenger if priority not high
    try {
      if (passenger?.Full_Name !== primaryContact?.Full_Name) {
        const recordObject = {
          id: passengerSelected?.id,
          moduleName: "Contacts",
        };

        const result = await axios.post(
          "/api/zoho/deletePassenger",
          recordObject
        );

        if (result?.data?.status === 200) {
          setPassengers(
            passengers?.filter(
              (singlePassenger) => singlePassenger?.id !== passenger?.id
            )
          );
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  function filterOccasions(data) {
    const filteredData = {};
    Object?.keys(data).forEach((key) => {
      if (key.includes("Occasion")) {
        filteredData[key] = data[key];
      }
    });

    const outputArray = [];
    for (let i = 1; i <= 5; i++) {
      const occasionKey = `Occasion_${i}`;
      const dateKey = `Occasion_${i}_Date`;
      if (
        filteredData[occasionKey] !== null ||
        filteredData[dateKey] !== null
      ) {
        const occasionObj = {
          [occasionKey]: filteredData[occasionKey] || "",
          [dateKey]: filteredData[dateKey] || "",
        };
        outputArray.push(occasionObj);
      }
    }

    return outputArray;
  }

  function filterPrograms(data) {
    const filteredData = {};
    Object?.keys(data).forEach((key) => {
      if (key.includes("Program")) {
        filteredData[key] = data[key];
      }
    });

    const outputArray = [];
    for (let i = 1; i <= 5; i++) {
      const nameKey = `Program_Name_${i}`;
      const NumberKey = `Program_Membership_Number_${i}`;
      if (filteredData[nameKey] !== null || filteredData[NumberKey] !== null) {
        const programObj = {
          [nameKey]: filteredData[nameKey] || "",
          [NumberKey]: filteredData[NumberKey] || "",
        };
        outputArray.push(programObj);
      }
    }

    return outputArray;
  }

  const [currentOccasions, setCurrentOccasions] = useState([]); // keeps the current occasions

  const [currentPrograms, setCurrentPrograms] = useState([]); // keeps the current occasions

  useEffect(() => {
    let filteredOccasions = filterOccasions(passengerSelected || {});
    let filteredPrograms = filterPrograms(passengerSelected || {});

    setCurrentOccasions(filteredOccasions);
    setCurrentPrograms(filteredPrograms);
  }, [passengerSelected]);

  const [openAddPassengerDialog, setOpenAddPassengerDialog] = useState(false);

  const handleOpenPassenger = () => {
    setOpenAddPassengerDialog(true);
  };

  const handleClosePassenger = () => {
    setOpenAddPassengerDialog(false);
    setNewPassengerAddedMessage("");
  };

  const navElements = [
    "Personal Details",
    "Vaccination",
    "Contact Information",
    "Address",
    "Emergency Contact",
    "Passport",
    "Occasions",
    "Loyality Program",
    "Special Request",
    // "Comment",
    "Upload",
  ];

  return (
    <>
      <Head>
        <title>Travela | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <Box
          sx={{
            width: "100%",
            height: {
              lg: "82vh",
              md: "82vh",
              sm: "100%",
              xs: "100%",
            },
            backgroundColor: "white",
            display: "flex",
            flexDirection: {
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            },
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {/* left side desktop / mobile view cards */}
          <Box
            sx={{
              width: {
                lg: "35%",
                md: "35%",
                sm: "100%",
                xs: "100%",
              },
              height: {
                lg: "83vh",
                md: "83vh",
                sm: "100%",
                xs: "100%",
              },
              borderRight: {
                lg: "2px solid #eee",
                md: "2px solid #eee",
                sm: "none",
                xs: "none",
              },
            }}
          >
            {/* add new passenger */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  lg: "flex-end",
                  md: "flex-end",
                  sm: "flex-start",
                  xs: "flex-start",
                },
                p: "1.4rem",
              }}
            >
              <Button
                sx={{
                  color: "red",
                  borderColor: "red",
                  "&.hover": { borderColor: "red !important" },
                  "& .MuiButton-root": {
                    borderColor: "red",
                    "&.hover": { borderColor: "red !important" },
                  },
                }}
                variant="outlined"
                onClick={() => handleOpenPassenger()}
              >
                Add Passenger
              </Button>

              <AddPassenger
                openAddPassengerDialog={openAddPassengerDialog}
                handleClosePassenger={handleClosePassenger}
                primaryContactId={primaryContact?.id}
                setPassengers={setPassengers}
                passengers={passengers}
                newPasasengerAddedMessage={newPasasengerAddedMessage}
                setNewPassengerAddedMessage={setNewPassengerAddedMessage}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                backgroundColor: {
                  lg: "#F8F9FAFF",
                  md: "#F8F9FAFF",
                  sm: "white",
                  xs: "white",
                },
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
                justifyContent: "space-between",
                alignItems: "center",
                p: "1rem",
              }}
            >
              {/* show the table header if not mobile view */}
              {!isMobile && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pl: "0.5rem",
                  }}
                >
                  <Typography sx={{ width: "40%", fontSize: "14px" }}>
                    Passenger Name
                  </Typography>
                  <Typography sx={{ width: "60%", fontSize: "14px" }}>
                    Type
                  </Typography>
                </Box>
              )}

              {/* show the passenger rows for desktop / the passenger cards for mobile */}
              {isMobile ? (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {passengers?.map((singleData) => {
                    return (
                      <MobileRowCard
                        data={singleData}
                        isMobile={isMobile}
                        key={singleData?.id}
                        navElementSelected={navElementSelected}
                        setNavElementSelected={setNavElementSelected}
                        handleDeletePassenger={handleDeletePassenger}
                        passengerSelected={passengerSelected}
                        setPassengerSelected={setPassengerSelected}
                        countries={countries}
                        currentOccasions={currentOccasions}
                        setCurrentOccasions={setCurrentOccasions}
                      />
                    );
                  })}
                </Box>
              ) : (
                <Box sx={{ width: "100%" }}>
                  {passengers?.map((singleData) => {
                    return (
                      <Row
                        data={singleData}
                        key={singleData?.id}
                        handleDeletePassenger={handleDeletePassenger}
                        passengerSelected={passengerSelected}
                        setPassengerSelected={setPassengerSelected}
                        setNavElementSelected={setNavElementSelected}
                      />
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>

          {/* right side view for desktop only */}
          <Box
            sx={{
              width: {
                lg: "65%",
                md: "65%",
                sm: "100%",
                xs: "100%",
              },
              height: {
                lg: "83vh",
                md: "83vh",
                sm: "100%",
                xs: "100%",
              },
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {/* passenger form nav sidebar for desktop */}
            {passengerSelected && !isMobile && (
              <Box
                sx={{
                  width: {
                    lg: "100%",
                    md: "100%",
                    sm: "100%",
                    xs: "100%",
                  },
                  height: {
                    lg: "83vh",
                    md: "83vh",
                    sm: "100%",
                    xs: "100%",
                  },
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                {/* passenger form nav sidebar */}
                <Box
                  sx={{
                    width: "24%",
                    height: "82vh",
                    borderRight: "2px solid #eee",
                    p: "1.5rem 1rem",
                  }}
                >
                  <Typography
                    textAlign="left"
                    sx={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    {passengerSelected?.Full_Name}
                  </Typography>

                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      mt: "2rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                    }}
                  >
                    {navElements.map((element, index) => {
                      return (
                        <NavElement
                          key={index}
                          label={element}
                          navElementSelected={navElementSelected}
                          setNavElementSelected={setNavElementSelected}
                        />
                      );
                    })}
                  </Box>
                </Box>

                {/* passenger form */}
                <Box sx={{ width: "75%" }}>
                  <MainForm
                    isMobile={isMobile}
                    navElementSelected={navElementSelected}
                    passengerSelected={passengerSelected}
                    setNavElementSelected={setNavElementSelected}
                    countries={countries}
                    setPassengerSelected={setPassengerSelected}
                    currentOccasions={currentOccasions}
                    setCurrentOccasions={setCurrentOccasions}
                    currentPrograms={currentPrograms}
                    setCurrentPrograms={setCurrentPrograms}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;

  let portalUser = {};
  let otherUsers = [];

  async function fetchData() {
    try {
      const response = await axios.get(process.env.ACCESSTOKEN_URL);
      const userFound = await axios.get(
        `https://www.zohoapis.com/crm/v3/Contacts/${id[0]}`,
        {
          headers: {
            Authorization: response.data.access_token,
          },
        }
      );
      // console.log("Access Token ", response.data.access_token);

      const otherUsersResp = await axios.get(
        `https://www.zohoapis.com/crm/v4/Contacts/search?criteria=(Associated_with:equals:${id[0]})`,
        {
          headers: {
            Authorization: response.data.access_token,
          },
        }
      );

      portalUser = userFound.data.data[0];
      otherUsers = otherUsersResp.data?.data;

      console.log(otherUsers);
    } catch (error) {
      console.log({ test: error });
    }
  }

  await fetchData();
  return {
    props: {
      countries: countries || [],
      primaryContact: portalUser || {},
      otherContacts: otherUsers || [],
    }, // will be passed to the page component as props
  };
}
