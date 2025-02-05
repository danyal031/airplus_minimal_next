"use client";
import React, { Suspense } from "react";
import SearchHeaderReservation from "../../FlightSection/Flight-listing/SearchHeaderReservation";

const SearchHeaderReservationContainer = () => {
  return (
    <Suspense>
      <SearchHeaderReservation />
    </Suspense>
  );
};

export default SearchHeaderReservationContainer;
