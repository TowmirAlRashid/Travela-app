import Head from "next/head";
import axios from "axios";

import { countries } from "@/data";
import { useState } from "react";

import { useMediaQuery, useTheme } from "@mui/material";

export default function Home({ countries, primaryContact, otherContacts }) {
  const [passengers, setPassengers] = useState([
    primaryContact,
    ...otherContacts,
  ]); // gets all the passengers here
  const [passengerSelected, setPassengerSelected] = useState(primaryContact); // keeps the selected passenger object
  const [navElementSelected, setNavElementSelected] =
    useState("Personal Details"); // keeps the selected nav

  const theme = useTheme(); // used for theming
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDeletePassenger = (passenger) => {
    // deletes a passenger if priority not high
    if (passenger?.Full_Name !== primaryContact?.Full_Name) {
      setPassengers(
        passengers?.filter(
          (singlePassenger) => singlePassenger?.name !== passenger?.name
        )
      );
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

  const [currentOccasions, setCurrentOccasions] = useState(
    filterOccasions(passengerSelected || {})
  ); // keeps the current occasions

  const [openAddPassengerDialog, setOpenAddPassengerDialog] = useState(false);

  const handleOpenPassenger = () => {
    setOpenAddPassengerDialog(true);
  };

  const handleClosePassenger = () => {
    setOpenAddPassengerDialog(false);
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
        <h1>hi</h1>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let portalUser = {};
  let otherUsers = [];

  async function fetchData() {
    try {
      const response = await axios.get(process.env.ACCESSTOKEN_URL);
      const userFound = await axios.get(
        `https://www.zohoapis.com/crm/v3/Contacts/4295937000002194589`,
        {
          headers: {
            Authorization: response.data.access_token,
          },
        }
      );
      // console.log("Access Token ", response.data.access_token);

      const otherUsersResp = await axios.get(
        `https://www.zohoapis.com/crm/v4/Contacts/search?criteria=(Associated_with:equals:4295937000002194589)`,
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
