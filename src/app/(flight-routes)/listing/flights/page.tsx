import ListingFlightHeader from "@/components/FlightSection/Flight-listing/ListingFlightHeader";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { getAirportsInServer } from "@/global-files/fetches";
import React from "react";

const page = async () => {
  const airports: AirportDataType[] = await getAirportsInServer();

  return (
    <div className=" relative bg-pink-400">
      {/* ListingFlightHeader */}
      <ListingFlightHeader airports={airports} />
      {/* SectionGridFilterCard */}
      {/* <SectionGridFilterCard/> */}
      <div className="container">kkhhkj</div>
    </div>
  );
};

export default page;
