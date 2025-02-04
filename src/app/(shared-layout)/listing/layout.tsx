import SearchHeaderReservationContainer from "@/components/global/SearchHeaderReservationContainer";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { getAirportsInServer } from "@/global-files/fetches";
import React, { FC } from "react";

export interface ListingLayoutProps {
  children?: React.ReactNode;
}
const listingLayout: FC<ListingLayoutProps> = async ({ children }) => {
  const airports: AirportDataType[] = await getAirportsInServer();

  return (
    <div className="md:container max-md:px-4">
      <div className="fixed w-full left-1/2 -translate-x-1/2 md:container max-md:px-4 z-10">
        <SearchHeaderReservationContainer airports={airports} />
      </div>
      <div className="relative w-full max-md:pb-6 max-md: pt-24 md:pb-24 md:pt-36">
        {children}
      </div>
    </div>
  );
};

export default listingLayout;
