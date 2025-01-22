import FlightListingContainer from "@/components/FlightSection/Flight-listing/FlightListingContainer";
// import ListingFlightHeader from "@/components/FlightSection/Flight-listing/ListingFlightHeader";
import SectionGridFilterCard from "@/components/FlightSection/Flight-listing/SectionGridFilterCard";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { getAirportsInServer } from "@/global-files/fetches";
import React from "react";

const page = async () => {
  const airports: AirportDataType[] = await getAirportsInServer();

  return (
    // <div className="container">
    //   <div className="fixed w-full left-0 right-0 container z-10">
    //     <ListingFlightHeader airports={airports} />
    //   </div>
    //   {/* <SectionGridFilterCard/> */}
    //   <div className="relative w-full py-24 pt-36">
    //     <SectionGridFilterCard />{" "}
    //   </div>
    // </div>
    <FlightListingContainer airports={airports} />
  );
};

export default page;
