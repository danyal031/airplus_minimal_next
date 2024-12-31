import React from "react";
import SearchBox from "./indexPageComponents/SearchBox";
import Services from "./indexPageComponents/Services";
import PopularRoutes from "./indexPageComponents/PopularRoutes";
import FrequentlyQuestions from "./indexPageComponents/FrequentlyQuestions";
import FlightDescription from "./indexPageComponents/FlightDescription";

const HomeComponents = () => {
  return (
    <div className="container my-16 grid grid-cols-1 gap-14">
      <SearchBox />
      <Services />
      <PopularRoutes />
      <FrequentlyQuestions />
      <FlightDescription />
    </div>
  );
};

export default HomeComponents;
