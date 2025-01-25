"use client";
import React, { FC, Suspense, useEffect } from "react";
import ListingFlightHeader from "./ListingFlightHeader";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { useGlobalContext } from "@/context/store";

interface FlightListingContainerProps {
  airports: AirportDataType[] | [];
}
const FlightListingContainer: FC<FlightListingContainerProps> = ({
  airports,
}) => {
  // initial states
  const { setAirports } = useGlobalContext().flightContext.searchContext;
  // handle initial airports data
  // useEffect(() => {
  //   setAirports(airports);
  // }, []);
  return (
    <div className="container">
      <div className="fixed w-full left-1/2 -translate-x-1/2 container z-10">
        <Suspense>
          <ListingFlightHeader airports={airports} />
        </Suspense>
      </div>
      {/* <SectionGridFilterCard/> */}
      <div className="relative w-full py-24 pt-36">
        <SectionGridFilterCard />{" "}
      </div>
    </div>
  );
};

export default FlightListingContainer;
