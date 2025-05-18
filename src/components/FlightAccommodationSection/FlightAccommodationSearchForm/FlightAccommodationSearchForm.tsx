import DatePickerComponent from "@/components/BasUIComponents/datePickersComponents/DatePickerComponent";
import { RoundWayInput } from "@/components/FlightSection/FlightSearchForm/FlightSearchForm";
import { useGlobalContext } from "@/context/store";
import { Button } from "@mui/material";
import React from "react";

const FlightAccommodationSearchForm = () => {
  // initial states
  const { fromdate } = useGlobalContext().flightContext.searchContext;
  // for render flightAccommodation search form in desktop
  const renderDatePicker = () => {
    return (
      <>
        <DatePickerComponent
          showProgress={true}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          forcedReturn={true}
        />
      </>
    );
  };
  const renderConfirmButton = () => {
    return (
      <>
        <Button
          // disabled
          onClick={() => {
            // handleClickSubmit();
          }}
          variant="contained"
          size="small"
          className="w-full h-full rounded-lg"
        >
          جستجو
        </Button>
      </>
    );
  };

  const renderSearchFormOnDesktop = () => {
    return (
      <>
        <div className="bg-paper w-full rounded-xl p-5 hidden md:block">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-6">
              <RoundWayInput />
            </div>
            <div className="col-span-4">{renderDatePicker()}</div>
            <div className="col-span-2">{renderConfirmButton()}</div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {renderSearchFormOnDesktop()}
      {/* {renderSearchFormOnMobile()} */}
    </>
  );
};

export default FlightAccommodationSearchForm;
