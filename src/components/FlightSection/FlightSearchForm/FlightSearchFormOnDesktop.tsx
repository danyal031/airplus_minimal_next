"use client";
import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import React, { FC, useEffect, useImperativeHandle, useState } from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LoopIcon from "@mui/icons-material/Loop";
import DatePickerComponent from "@/components/BasUIComponents/datePickersComponents/DatePickerComponent";
import { useGlobalContext } from "@/context/store";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  // initial states
  const { origin, setOrigin, destination, setDestination } =
    useGlobalContext().flightContext.searchContext;
  const [popOverState, setPopOverState] = useState<any>({
    value: null,
    setValue: () => {},
    type: "",
  });

  // for validation
  const schema = yup.object().shape({
    originValidation: yup.string().required(""),
    destinationValidation: yup.string().required(""),
  });
  const defaultValues = {
    originValidation: origin?.iata ? origin?.iata : "",
    destinationValidation: destination?.iata ? destination?.iata : "",
  };
  const { control, formState, trigger, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, errors } = formState;
  // useImperativeHandle(ref, () => ({
  //   handleTrigger() {
  //     trigger();
  //   },
  //   getIsValid() {
  //     // return isValid;
  //     return isValid;
  //   },
  // }));
  return (
    <>
      {" "}
      <div className="flex item-center justify-center gap-3 relative">
        <Controller
          control={control}
          name="originValidation"
          render={({ field }) => (
            <TextField
              {...field}
              label={"شهر مبدا"}
              value={origin?.title_fa}
              size="small"
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <span>
                    {/* {tab}{" "} */}
                    <FlightTakeoffIcon
                      sx={{ color: "#c2c2c2", transform: "scaleX(-1)" }}
                    />
                  </span>
                ),
              }}
              onClick={() => {
                setPopOverState({
                  value: origin,
                  setValue: setOrigin,
                  type: "origin",
                });
                // setOpenMobileDrawer(true);
              }}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!errors.originValidation}
            />
          )}
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
        <Controller
          control={control}
          name="destinationValidation"
          render={({ field }) => (
            <TextField
              {...field}
              label={"شهر مقصد"}
              value={destination?.title_fa}
              size="small"
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <span>
                    {/* {tab}{" "} */}
                    <FlightLandIcon
                      sx={{ color: "#c2c2c2", transform: "scaleX(-1)" }}
                    />
                  </span>
                ),
              }}
              onClick={() => {
                setPopOverState({
                  value: destination,
                  setValue: setDestination,
                  type: "destination",
                });
                // setOpenMobileDrawer(true);
              }}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!errors.destinationValidation}
            />
          )}
        />
      </div>
    </>
  );
};
