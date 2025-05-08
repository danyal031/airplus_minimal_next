"use client";
import { useGlobalContext } from "@/context/store";
import React from "react";
import { Button } from "@mui/material";
import {
  convertToPersianShortDate,
  formatInputWithCommas,
} from "@/global-files/function";
import Image from "next/image";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Toman } from "@/components/icons/IconToman";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-2xl border-2 border-paper p-1">
      <div
        onClick={() => handleToggleFlightTab(1)}
        className={`rounded-xl text-text-main p-3 flex flex-col items-start justify-center gap-4 border ${
          flightTab === 1 ? "bg-paper" : "bg-main"
        } ${flightTab === 1 ? "border-primary-main" : "border-main"}`}
      >
        {selectedWentFlight ? (
          <>
            <div className="text-primary-main w-full flex items-center justify-between">
              <div className="flex items-center justify-center gap-1">
                <CheckCircleOutlineIcon
                  fontSize="medium"
                  className="text-primary-main"
                />
                <span className="text-base font-semibold">بلیت رفت</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-base font-extrabold">
                  {formatInputWithCommas(
                    selectedWentFlight.Classes.BaseData.Financial.Adult.Markup
                      .final / 10
                  )}
                </span>
                <Toman className="text-primary-main" />
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-center gap-1 font-semibold">
                <span className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}${selectedWentFlight.Airline.media.logo.small}`}
                    width={28}
                    height={30}
                    className="w-7"
                    alt="air-logo"
                    sizes="40px"
                  />
                </span>
                <span className="text-xs">|</span>
                <span className="font-extrabold text-sm text-text-main">
                  {selectedWentFlight.DepartureDateTime.split(" ")[1].split(
                    ":"
                  )[0] +
                    ":" +
                    selectedWentFlight.DepartureDateTime.split(" ")[1].split(
                      ":"
                    )[1]}
                </span>
                <span className="text-xs">|</span>
                <span className="text-xs">
                  {convertToPersianShortDate(fromDate as string)} |{" "}
                  {origin?.title_fa} - {destination?.title_fa}
                </span>
              </div>
              <Button
                onClick={handleChangeWentTicket}
                variant="outlined"
                size="small"
                className="rounded-xl"
              >
                تغییر بلیت
              </Button>
            </div>
          </>
        ) : (
          <>
            <span className="text-base font-semibold">بلیت رفت</span>
            <span className="text-xs font-semibold">
              {convertToPersianShortDate(fromDate as string)} |{" "}
              {origin?.title_fa} - {destination?.title_fa}
            </span>
          </>
        )}
      </div>
      <div
        onClick={() => handleToggleFlightTab(2)}
        className={`rounded-xl text-text-main p-3 flex flex-col items-start justify-center gap-4 border ${
          flightTab === 2 ? "bg-paper" : "bg-main"
        } ${flightTab === 2 ? "border-primary-main" : "border-main"}`}
      >
        {selectedReturnFlight ? (
          <>
            <div className="text-primary-main w-full flex items-center justify-between">
              <div className="flex items-center justify-center gap-1">
                <CheckCircleOutlineIcon
                  fontSize="medium"
                  className="text-primary-main"
                />
                <span className="text-base font-semibold">بلیت برگشت</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-base font-extrabold">
                  {formatInputWithCommas(
                    selectedReturnFlight.Classes.BaseData.Financial.Adult.Markup
                      .final / 10
                  )}
                </span>
                <Toman className="text-primary-main" />
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-center gap-1 font-semibold">
                <span className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}${selectedReturnFlight.Airline.media.logo.small}`}
                    width={28}
                    height={30}
                    className="w-7"
                    alt="air-logo"
                    sizes="40px"
                  />
                </span>
                <span className="text-xs">|</span>
                <span className="font-extrabold text-sm text-text-main">
                  {selectedReturnFlight.DepartureDateTime.split(" ")[1].split(
                    ":"
                  )[0] +
                    ":" +
                    selectedReturnFlight.DepartureDateTime.split(" ")[1].split(
                      ":"
                    )[1]}
                </span>
                <span className="text-xs">|</span>
                <span className="text-xs">
                  {convertToPersianShortDate(toDate as string)} |{" "}
                  {destination?.title_fa} - {origin?.title_fa}
                </span>
              </div>
              <Button
                onClick={handleChangeReturnTicket}
                variant="outlined"
                size="small"
                className="rounded-xl"
              >
                تغییر بلیت
              </Button>
            </div>
          </>
        ) : (
          <>
            <span className="text-base font-semibold text-text-main">
              بلیت برگشت
            </span>
            <span className="text-xs font-semibold">
              {convertToPersianShortDate(toDate as string)} |{" "}
              {destination?.title_fa} - {origin?.title_fa}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectedFlightsPanel;
