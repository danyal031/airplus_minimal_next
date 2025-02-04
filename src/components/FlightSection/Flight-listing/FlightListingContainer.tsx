import React, { useEffect } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";

const FlightListingContainer = () => {
  return (
    <>
      <div className="relative">
        <SectionGridFilterCard />{" "}
      </div>
    </>
  );
};

export default FlightListingContainer;
