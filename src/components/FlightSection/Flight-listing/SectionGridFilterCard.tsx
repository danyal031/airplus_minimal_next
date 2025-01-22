import React from "react";
import FlightFilterBox from "./FlightFilterBox";
import FlightsList from "./FlightsList";

const SectionGridFilterCard = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <FlightFilterBox />
      </div>
      <div className="col-span-9">
        <FlightsList />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
