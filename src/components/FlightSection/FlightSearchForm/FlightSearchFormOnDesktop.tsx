"use client";
import { Button, IconButton, TextField } from "@mui/material";
import React from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LoopIcon from "@mui/icons-material/Loop";
import DatePickerComponent from "@/components/BasUIComponents/datePickersComponents/DatePickerComponent";
import { useGlobalContext } from "@/context/store";

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
          size="small"
          className="w-full h-full rounded-lg"
        >
          جستجو
        </Button>
      </>
    );
  };
  return (
    <div className="bg-paper w-full rounded-xl p-5">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-5">
          <RoundWayInput />
        </div>
        <div className="col-span-5">{renderDatePicker()}</div>
        <div className="col-span-2">{renderConfirmButton()}</div>
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
