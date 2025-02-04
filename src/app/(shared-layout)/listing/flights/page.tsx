import FlightListingContainer from "@/components/FlightSection/Flight-listing/FlightListingContainer";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { getAirportsInServer } from "@/global-files/fetches";
import React from "react";

const page = () => {
  return <FlightListingContainer />;
};

export default page;
