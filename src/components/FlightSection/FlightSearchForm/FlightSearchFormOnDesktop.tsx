"use client";
import { Button, IconButton, TextField } from "@mui/material";
import React, { FC, useEffect } from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LoopIcon from "@mui/icons-material/Loop";
import DatePickerComponent from "@/components/BasUIComponents/datePickersComponents/DatePickerComponent";
import { useGlobalContext } from "@/context/store";
import { AirportDataType } from "@/DataTypes/flight/flightTicke";

const tab = "\xa0\xa0\xa0";

const FlightSearchFormOnDesktop = () => {
  // initial states
  const { fromDate, setFromDate, toDate, setToDate } =
    useGlobalContext().flightContext.searchContext;
  const renderDatePicker = () => {
    return (
      <>
        <DatePickerComponent
          showProgress={true}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          forcedReturn={false}
        />
      </>
    );
  };
  const renderConfirmButton = () => {
    return (
      <>
        <Button
          variant="contained"
          size="medium"
          className="w-full min-h-full rounded-lg"
        >
          جستجو
        </Button>
      </>
    );
  };
  return (
    <div className="bg-paper w-full rounded-xl p-5">
      <div className="flex items-center justify-center gap-5">
        <div className="flex-grow">
          <RoundWayInput />
        </div>
        <div className="min-w-[430px] max-w-[430px]">{renderDatePicker()}</div>
        <div className="min-w-40">{renderConfirmButton()}</div>
      </div>
    </div>
  );
};

export default FlightSearchFormOnDesktop;

const RoundWayInput = () => {
  return (
    <>
      {" "}
      <div className="flex item-center justify-center gap-3 relative">
        <TextField
          size="small"
          label="رفت"
          InputProps={{
            startAdornment: (
              <span>
                {/* {tab}{" "} */}
                <FlightTakeoffIcon
                  sx={{ color: "#c2c2c2", transform: "scaleX(-1)" }}
                />
              </span>
            ),
          }}
        />
        <div className="flex justify-center items-center absolute top-0 bottom-0 m-auto z-10">
          <IconButton
            size="small"
            color="primary"
            className="bg-main border border-primary-main hover:cursor-pointer"
            // onClick={handleConvertRoutes}
          >
            <LoopIcon fontSize="small" />
          </IconButton>
        </div>
        <TextField
          size="small"
          label="برگشت"
          InputProps={{
            startAdornment: (
              <span>
                {/* {tab}{" "} */}
                <FlightLandIcon
                  sx={{ color: "#c2c2c2", transform: "scaleX(-1)" }}
                />
              </span>
            ),
          }}
        />
      </div>
    </>
  );
};
