"use client";
import { useGlobalContext } from "@/context/store";
import React from "react";
import PopularRoutes from "./flightTabDescriptions/PopularRoutes";
import FrequentlyQuestions from "./flightTabDescriptions/FrequentlyQuestions";
import FlightDescription from "./flightTabDescriptions/FlightDescription";
import TypesAccommodation from "./residenceTabDescriptions/TypesAccommodation";
import PopularDestinations from "./residenceTabDescriptions/PopularDestinations";
import PopularResidence from "./residenceTabDescriptions/PopularResidence";
import ResidenceFrequentlyQuestions from "./residenceTabDescriptions/ResidenceFrequentlyQuestions";
import FlightAccommodationFrequentlyQuestions from "./flightAccommodationTabDescription/FlightAccommodationFrequentlyQuestions";

const TabDescriptionsComponent = () => {
  // initial states
  const { tabValueSearchBox } = useGlobalContext().global;

  const renderTabDescriptionsComponents = () => {
    switch (tabValueSearchBox) {
      case "1":
        return (
          <>
            {/* <PopularRoutes /> */}
            <FrequentlyQuestions />
            <FlightDescription />
          </>
        );
      case "2":
        return (
          <>
            <TypesAccommodation />
            <PopularDestinations />
            <PopularResidence />
            <ResidenceFrequentlyQuestions />
          </>
        );
      case "3":
        return (
          <>
            <FlightAccommodationFrequentlyQuestions />
            <PopularDestinations />
          </>
        );
    }
  };
  return renderTabDescriptionsComponents();
};

export default TabDescriptionsComponent;
