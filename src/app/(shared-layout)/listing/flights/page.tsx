import FlightListingContainer from "@/components/FlightSection/Flight-listing/FlightListingContainer";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { getAirportsInServer } from "@/global-files/fetches";
import { assert } from "console";
import React from "react";

const page = async () => {
  const airports: AirportDataType[] = await getAirportsInServer();

  return <FlightListingContainer airports={airports} />;
};

export default page;
