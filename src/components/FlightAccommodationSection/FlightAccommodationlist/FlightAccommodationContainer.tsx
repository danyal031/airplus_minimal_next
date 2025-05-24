"use client";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SectionGridFilterCard from "@/components/FlightSection/Flight-listing/SectionGridFilterCard";
import AccommodationListContainer from "@/components/AccommodationSection/accommodation/listing/AccommodationListContainer";
import { useGlobalContext } from "@/context/store";
const FlightAccommodationContainer = () => {
  // initial states
  const { searchListTab, setSearchListTab } =
    useGlobalContext().flightAccommodationContext.flightAccommodationSearch;
  // handle change search list tab
  const handleChangeSearchListTab = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (newValue !== null) {
      setSearchListTab(newValue);
    }
  };

  const renderFlightAccommodationTab = () => {
    return (
      <div className="flex items-center justify-center h-14">
        <div className="p-1 rounded-lg overflow-hidden border-2 border-paper flex items-center justify-center h-full w-1/3">
          <div
            onClick={() => setSearchListTab("flight")}
            className={`${
              searchListTab === "flight"
                ? "bg-paper border-primary-main"
                : "bg-main border-main"
            } cursor-pointer w-full h-full flex items-center justify-center font-semibold rounded-md border`}
          >
            پرواز
          </div>
          <div
            onClick={() => setSearchListTab("accommodation")}
            className={`${
              searchListTab === "accommodation"
                ? "bg-paper border-primary-main"
                : "bg-main border-main"
            } cursor-pointer w-full h-full flex items-center justify-center font-semibold rounded-md border`}
          >
            اقامتگاه
          </div>
        </div>
      </div>

      // <div className="flex items-center justify-center">
      //   <ToggleButtonGroup
      //     value={searchListTab}
      //     exclusive
      //     onChange={handleChangeSearchListTab}
      //     size="small"
      //   >
      //     <ToggleButton size="small" value="flight">
      //       <FlightIcon />
      //     </ToggleButton>
      //     <ToggleButton size="small" value="accommodation">
      //       <ApartmentIcon />
      //     </ToggleButton>
      //   </ToggleButtonGroup>
      // </div>
    );
  };

  // render list
  const renderList = () => {
    switch (searchListTab) {
      case "flight":
        return <SectionGridFilterCard action="flight-accommodation" />;
      case "accommodation":
        return <AccommodationListContainer action="flight-accommodation" />;
    }
  };

  return (
    <div className="grid grid-col-1 gap-3">
      {renderFlightAccommodationTab()}
      {renderList()}
    </div>
  );
};

export default FlightAccommodationContainer;
