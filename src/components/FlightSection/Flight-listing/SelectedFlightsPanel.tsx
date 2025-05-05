"use client";
import { useGlobalContext } from "@/context/store";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import {
  convertToPersianDate,
  convertToPersianShortDate,
  formatInputWithCommas,
} from "@/global-files/function";
import Image from "next/image";
import leftArrow from "/public/assets/images/flightSection/left-arrow.svg";

const SelectedFlightsPanel = () => {
  const {
    selectedWentFlight,
    selectedReturnFlight,
    setSelectedWentFlight,
    setSelectedReturnFlight,
    flightTab,
    setFlightTab,
    fromDate,
    toDate,
    origin,
    destination,
  } = useGlobalContext().flightContext.searchContext;

  // handle toggle flight list tab
  const handleToggleFlightTab = (newValue: number) => {
    setFlightTab(newValue);
  };
  const handleChangeWentTicket = () => {
    setSelectedWentFlight(null);
  };
  const handleChangeReturnTicket = () => {
    setSelectedReturnFlight(null);
  };
  console.log("todate", toDate);

  return (
    <div className="grid grid-cols-2 gap-2 rounded-2xl border-2 border-paper p-1">
      <div
        onClick={() => handleToggleFlightTab(1)}
        className={`rounded-xl text-text-main p-3 flex flex-col items-start justify-center gap-4 border ${
          flightTab === 1 ? "bg-paper" : "bg-main"
        } ${flightTab === 1 ? "border-primary-main" : "border-main"}`}
      >
        <span className="text-base font-semibold">بلیت رفت</span>
        <span className="text-xs font-semibold">
          {convertToPersianShortDate(fromDate as string)} | {origin?.title_fa} -{" "}
          {destination?.title_fa}
        </span>
      </div>
      <div
        onClick={() => handleToggleFlightTab(2)}
        className={`rounded-xl text-text-main p-3 flex flex-col items-start justify-center gap-4 border ${
          flightTab === 2 ? "bg-paper" : "bg-main"
        } ${flightTab === 2 ? "border-primary-main" : "border-main"}`}
      >
        <span className="text-base font-semibold text-text-main">
          بلیت برگشت
        </span>
        <span className="text-xs font-semibold">
          {convertToPersianShortDate(toDate as string)} |{" "}
          {destination?.title_fa} - {origin?.title_fa}
        </span>
      </div>
      {/* {selectedWentFlight && (
        <motion.div
          className="col-span-2 md:col-span-1 h-32 md:h-36 border-2 border-primary-main rounded-xl bg-paper grid grid-cols-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="col-span-3 border-l border-dashed border-divider flex flex-col items-center justify-start gap-3 px-2">
            <div className="flex items-center justify-center gap-0">
              <span className="rounded-tab-up-sm h-9 text-xs md:text-sm flex items-center justify-center text-paper truncate bg-primary-main">
                بلیت رفت
              </span>
              <span className="text-xs text-text-main font-semibold">
                {convertToPersianShortDate(
                  selectedWentFlight.DepartureDateTime
                )}
              </span>{" "}
            </div>
            <div className="w-full flex items-center justify-start gap-1 md:gap-2">
              <div className="p-1 flex flex-col items-center justify-center gap-1">
                <span className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/airlines/${selectedWentFlight.Airline.logo}`}
                    width={38}
                    height={40}
                    className="w-10"
                    alt="air-logo"
                    sizes="40px"
                  />
                </span>
              </div>
              <span className="text-base text-primary-main font-bold">
                {selectedWentFlight.DepartureDateTime.split(" ")[1].split(
                  ":"
                )[0] +
                  ":" +
                  selectedWentFlight.DepartureDateTime.split(" ")[1].split(
                    ":"
                  )[1]}{" "}
              </span>{" "}
              <div className="flex items-center justify-start gap-2 min-h-12 flex-1 flex-shrink-0 w-full">
                <span className="md:text-sm text-xs text-text-main font-semibold truncate">
                  {selectedWentFlight.Origin.Iata.title_fa}
                </span>
                <Image
                  src={leftArrow}
                  alt="left-arrow"
                  width={35}
                  height={10}
                  className="object-cover"
                />{" "}
                <span className="md:text-sm text-xs text-text-main font-semibold truncate">
                  {selectedWentFlight.Destination.Iata.title_fa}
                </span>
              </div>{" "}
            </div>
          </div>
          <div className="col-span-1 p-2 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              <Button
                onClick={handleChangeWentTicket}
                className="rounded-lg"
                variant="outlined"
                size="small"
                color="primary"
              >
                تغییر بلیت
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-text-main font-semibold md:text-sm text-xs">
                {!Array.isArray(selectedWentFlight.Classes) &&
                  formatInputWithCommas(
                    selectedWentFlight.Classes.Financial.Adult.Payable / 10
                  )}
              </span>
            </div>
          </div>
        </motion.div>
      )}
      {!selectedWentFlight && (
        <motion.div
          className="col-span-2 md:col-span-1 h-36 border-dashed border border-primary-main rounded-xl p-2 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-text-main text-base font-semibold">
            بلیت رفت
          </span>{" "}
        </motion.div>
      )}
      {selectedReturnFlight && (
        <motion.div
          className="col-span-2 md:col-span-1 h-32 md:h-36 border-2 border-primary-main rounded-xl bg-paper grid grid-cols-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="col-span-3 border-l border-dashed border-divider flex flex-col items-center justify-start gap-3 px-2">
            {" "}
            <div className="flex items-center justify-center gap-0">
              <span className="rounded-tab-up-sm h-9 text-xs md:text-sm flex items-center justify-center text-paper truncate bg-primary-main">
                بلیت برگشت
              </span>
              <span className="text-xs text-text-main font-semibold">
                {convertToPersianShortDate(
                  selectedReturnFlight.DepartureDateTime
                )}
              </span>{" "}
            </div>
            <div className="w-full flex items-center justify-start gap-1 md:gap-2">
              <div className="p-1 flex flex-col items-center justify-center gap-1">
                <span className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/airlines/${selectedReturnFlight.Airline.logo}`}
                    width={38}
                    height={40}
                    className="w-10"
                    alt="air-logo"
                    sizes="40px"
                  />
                </span>
              </div>
              <span className="text-base text-primary-main font-bold">
                {selectedReturnFlight.DepartureDateTime.split(" ")[1].split(
                  ":"
                )[0] +
                  ":" +
                  selectedReturnFlight.DepartureDateTime.split(" ")[1].split(
                    ":"
                  )[1]}{" "}
              </span>{" "}
              <div className="flex items-center justify-start gap-2 min-h-12 flex-1 flex-shrink-0 w-full">
                <span className="text-xs md:text-sm text-text-main font-semibold truncate">
                  {selectedReturnFlight.Origin.Iata.title_fa}
                </span>
                <Image
                  src={leftArrow}
                  alt="left-arrow"
                  width={40}
                  height={10}
                  className="object-cover"
                />
                <span className="text-text-main font-semibold md:text-sm text-xs">
                  {selectedReturnFlight.Destination.Iata.title_fa}
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-1 p-2 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              <Button
                onClick={handleChangeReturnTicket}
                className="rounded-lg"
                variant="outlined"
                size="small"
                color="primary"
              >
                تغییر بلیت
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-text-main font-semibold text-sm">
                {!Array.isArray(selectedReturnFlight.Classes) &&
                  formatInputWithCommas(
                    selectedReturnFlight.Classes.Financial.Adult.Payable / 10
                  )}
              </span>
            </div>
          </div>
        </motion.div>
      )}
      {!selectedReturnFlight && (
        <motion.div
          className="col-span-2 md:col-span-1 h-36 border-dashed border border-primary-main rounded-xl p-2 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-text-main text-base font-semibold">
            بلیت برگشت{" "}
          </span>{" "}
        </motion.div>
      )} */}
    </div>
  );
};

export default SelectedFlightsPanel;
