"use client";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import React, { FC, Suspense, useEffect } from "react";
import SearchHeaderReservation from "../FlightSection/Flight-listing/SearchHeaderReservation";
import { useGlobalContext } from "@/context/store";

interface SearchHeaderReservationContainerProps {
  airports: AirportDataType[] | [];
}
const SearchHeaderReservationContainer: FC<
  SearchHeaderReservationContainerProps
> = ({ airports }) => {
  const { setAirports } = useGlobalContext().flightContext.searchContext;
  useEffect(() => {
    setAirports(airports);
  }, []);
  return (
    <Suspense>
      <SearchHeaderReservation />
    </Suspense>
  );
};

export default SearchHeaderReservationContainer;
