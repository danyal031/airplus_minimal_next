"use client";
import AccommodationDetailsProgress from "@/components/Skelton-Components/AccommodationSection/details/AccommodationDetailsProgress";
import { useGlobalContext } from "@/context/store";
import React from "react";

const AccommodationDetailsContainer = () => {
  // initial states
  const { additionalDetailsAccommodation } =
    useGlobalContext().accommodationContext.accommodationSearch;
  const renderAccommodationComponents = () => {
    return (
      <>
        {/* for desktop */}
        <div className="hidden md:block">
          <AccommodationDetailsOnDesktop />
        </div>
        {/* for mobile */}
        <div className="md:hidden">
          <AccommodationDetailsOnMobile />
        </div>
      </>
    );
  };
  return (
    <>
      {" "}
      {additionalDetailsAccommodation ? (
        <>{renderAccommodationComponents()}</>
      ) : (
        <AccommodationDetailsProgress />
      )}
    </>
  );
};

export default AccommodationDetailsContainer;

// for desktop
const AccommodationDetailsOnDesktop = () => {
  return (
    <>
      {" "}
      <div className="container py-24 bg-rose-500 grid grid-cols-12 gap-4">
        <div className="col-span-3 bg-yellow-700">filters</div>
        <div className="col-span-9 bg-purple-700">accommodation</div>
      </div>
    </>
  );
};

// for mobile
const AccommodationDetailsOnMobile = () => {
  return <></>;
};
