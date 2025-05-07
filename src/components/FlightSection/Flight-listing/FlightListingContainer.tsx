"use client";
import React, { Suspense } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";

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
