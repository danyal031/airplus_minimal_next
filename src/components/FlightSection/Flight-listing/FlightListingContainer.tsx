import React, { FC, useEffect } from "react";
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
        <SectionGridFilterCard airports={airports} />{" "}
      </div>
    </>
  );
};

export default FlightListingContainer;
