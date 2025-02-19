"use client";
import { Box } from "@mui/material";
import React from "react";
import lottieProgress from "../../../public/assets/lottie/lottie-progress.json";
import dynamic from "next/dynamic";
const Lottie = dynamic( () => import( "lottie-react" ), { ssr: false } );
const ProgressLoading = () =>
{
  return (
    <Box
      sx={ {
        display: "flex",
        position: "fixed",
        zIndex: 99999999999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backdropFilter: "blur(2px)", // Adjust the blur value as needed
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      } }
    >
      <Lottie
        animationData={ lottieProgress }
        loop={ true }
        style={ { width: "500px" } }
      />
    </Box>
  );
};

export default ProgressLoading;
