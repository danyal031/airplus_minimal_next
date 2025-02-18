"use client";
import React, { FC, Suspense, useEffect } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
interface FlightListingContainerProps {
  airports: AirportDataType[] | [];
}
const FlightListingContainer: FC<FlightListingContainerProps> = ({
  airports,
}) => {
  return (
    <>
      <div className="relative">
        <Suspense>
          <SectionGridFilterCard airports={airports} />{" "}
        </Suspense>
      </div>
    </>
  );
};

export default FlightListingContainer;
