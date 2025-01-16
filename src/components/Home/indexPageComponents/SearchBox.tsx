"use client";
import Lottie from "lottie-react";
import React, { FC, useEffect, useState } from "react";
import comingSoonLottie from "../../../../public/assets/lottie/coming_soon_lottie.json";
import { Tab } from "@mui/material";
import { motion } from "framer-motion";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import FlightIcon from "@mui/icons-material/Flight";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VillaIcon from "@mui/icons-material/Villa";
import FlightSearchFormOnDesktop from "@/components/FlightSection/FlightSearchForm/FlightSearchFormOnDesktop";
import ResidenceSearchFormOnDesktop from "@/components/ResidenceSection/ResidenceSearchForm/ResidenceSearchFormOnDesktop";
import { useGlobalContext } from "@/context/store";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
interface SearchBoxProps {
  airports: AirportDataType[] | [];
}
const SearchBox: FC<SearchBoxProps> = ({ airports }) => {
  useEffect(() => {
    console.log("airports list: ", airports);
  }, [airports]);
  // initial states
  const { tabValueSearchBox, setTabValueSearchBox } = useGlobalContext().global;
  const handleChangeTab = (newValue: string) => {
    setTabValueSearchBox(newValue);
  };

  const renderComingSoon = () => {
    return (
      <div className="w-full relative rounded-xl bg-paper p-6 min-h-16 flex gap-5 items-center justify-center">
        <div className="w-28 flex justify-center items-center">
          <Lottie animationData={comingSoonLottie} loop={true} />
        </div>
        <span className="font-semibold text-lg">
          بازدید کننده عزیز، این بخش هنوز در حال توسعه است{" "}
        </span>
      </div>
    );
  };
  const getBgImage = () => {
    switch (tabValueSearchBox) {
      case "1":
        return "flight-pattern.svg";
      case "2":
        return "residence-pattern.svg";
      default:
        return "flight-pattern.svg";

      //   case "1":
      //     return "flight-pattern.png";
      //   case "2":
      //     return "train-pattern.png";
      //   case "3":
      //     return "bus-pattern.png";
      //   case "4":
      //     return "tour-pattern.png";
      //   case "5":
      //     return "hotel-pattern.png";
    }
  };
  const renderForm = () => {
    switch (tabValueSearchBox) {
      case "1":
        return <FlightSearchFormOnDesktop />;
      case "2":
        return <ResidenceSearchFormOnDesktop />;
      default:
        return renderComingSoon();
    }
  };
  const renderTab = () => {
    const tabs = [
      { id: "1", label: "پرواز" },
      { id: "2", label: "هتل و اقامتگاه" },
      { id: "3", label: "اتوبوس" },
      { id: "4", label: "تور" },
      { id: "5", label: "قطار" },
    ];

    return (
      <div
        className={`grid grid-cols-10 gap-0 bg-primary-main rounded-tab-down w-4/5 p-0 ${
          tabValueSearchBox === "1" ? "border-r-paper" : "border-r-primary-main"
        } ${
          tabValueSearchBox === "5" ? "border-l-paper" : "border-l-primary-main"
        }`}
      >
        {tabs.map((tab, index) => {
          // const isEven = index % 2 === 0;
          const isActive = tabValueSearchBox === tab.id;
          return (
            <span
              key={tab.id}
              onClick={() => handleChangeTab(tab.id)}
              className={`text-paper hover:cursor-pointer ${
                isActive ? "rounded-tab-down" : ""
              } col-span-2 flex items-center justify-center font-semibold h-12 ${
                tabValueSearchBox === "1"
                  ? "border-r-0 rounded-r-none"
                  : tabValueSearchBox === "5"
                  ? "border-l-0 rounded-l-none"
                  : ""
              }  ${
                tabValueSearchBox === tab.id ? "bg-paper text-primary-main" : ""
              }`}
            >
              {tab.label}
            </span>
          );
        })}
      </div>
    );
  };

  const renderReservationsBanner = () => {
    return (
      <>
        <div
          className="min-h-[220px] w-full"
          style={{
            position: "relative",
            width: "100%",
            backgroundImage: `url('/assets/images/reservationsBanner/${getBgImage()}')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            overflow: "hidden", // Hide overflowing content
            backgroundPosition: "bottom center",
          }}
        ></div>
      </>
    );
  };
  return (
    <div className="flex flex-col items-center justify-start gap-0">
      {renderReservationsBanner()}
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default SearchBox;
