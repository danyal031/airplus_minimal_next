"use client";
import React, { FC, Suspense, useEffect } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";

const FlightListingContainer = () => {
  return (
    <>
      <div className="relative">
        <Suspense>
          <SectionGridFilterCard />{" "}
        </Suspense>
      </div>
    </>
  );
};

export default FlightListingContainer;
