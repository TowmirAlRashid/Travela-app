import { Box, Typography } from "@mui/material";
import Image from "next/image";
import AppContext from "@/AppContext";
import React, { useContext } from "react";

const TopLayout = ({ children }) => {
  const portalUser = useContext(AppContext);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          // height: {
          //   lg: "17vh",
          //   md: "17vh",
          //   sm: "28vh",
          //   xs: "28vh",
          // },
          p: {
            lg: "2rem 3rem",
            md: "2rem 3rem",
            sm: "2rem 1.5rem 3rem",
            xs: "1.5rem 1rem 2.5rem",
          },
          display: "flex",
          flexDirection: {
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          },
          alignItems: {
            lg: "center",
            md: "center",
            sm: "flex-start",
            xs: "flex-start",
          },
          justifyContent: "space-between",
          gap: {
            xs: "2rem",
            sm: "2rem",
          },
          backgroundColor: "#F8F9FAFF",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "0.5rem",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { lg: "32px", md: "32px", sm: "24px", xs: "24px" },
              fontWeight: "bold",
            }}
          >
            {portalUser?.Full_Name}
          </Typography>

          <Typography
            variant="p"
            sx={{
              fontSize: { lg: "18px", md: "18px", sm: "14px", xs: "14px" },
            }}
          >
            Email: {portalUser?.Email}
          </Typography>

          <Typography
            variant="p"
            sx={{
              fontSize: { lg: "18px", md: "18px", sm: "14px", xs: "14px" },
            }}
          >
            Phone: {portalUser?.Phone}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: {
              lg: "center",
              md: "center",
              sm: "flex-start",
              xs: "flex-start",
            },
            gap: "0.5rem",
          }}
        >
          <Image src="/logo.png" alt="company logo" width={150} height={41} />

          <Typography
            variant="p"
            sx={{
              fontSize: { lg: "18px", md: "18px", sm: "14px", xs: "14px" },
            }}
          >
            hello@travela.com.au
          </Typography>

          <Typography
            variant="p"
            sx={{
              fontSize: { lg: "18px", md: "18px", sm: "14px", xs: "14px" },
            }}
          >
            03 XXXX XXXX
          </Typography>
        </Box>
      </Box>

      {children}
    </Box>
  );
};

export default TopLayout;
