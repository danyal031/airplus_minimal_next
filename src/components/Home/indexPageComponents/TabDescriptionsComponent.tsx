"use client";
import { useGlobalContext } from "@/context/store";
import React from "react";
import PopularRoutes from "./flightTabDescriptions/PopularRoutes";
import FrequentlyQuestions from "./flightTabDescriptions/FrequentlyQuestions";
import FlightDescription from "./flightTabDescriptions/FlightDescription";
import TypesAccommodation from "./residenceTabDescriptions/TypesAccommodation";
import PopularDestinations from "./residenceTabDescriptions/PopularDestinations";

const TabDescriptionsComponent = () => {
  // initial states
  const { tabValueSearchBox } = useGlobalContext().global;

  const renderTabDescriptionsComponents = () => {
    switch (tabValueSearchBox) {
      case "1":
        return (
          <>
            <PopularRoutes />
            <FrequentlyQuestions />
            <FlightDescription />
          </>
        );
      case "2":
        return (
          <>
            <TypesAccommodation />
            <PopularDestinations />
          </>
        );
    }
  };
  return renderTabDescriptionsComponents();
};

export default TabDescriptionsComponent;
