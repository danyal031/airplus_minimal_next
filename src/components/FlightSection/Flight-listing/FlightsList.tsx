import React from "react";
import PriceRateBox from "./PriceRateBox";
import TicketsList from "./TicketsList";

const FlightsList = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-3">
      <div className="w-full">
        <PriceRateBox />
      </div>
      <div className="w-full">
        <TicketsList />
      </div>
    </div>
  );
};

export default FlightsList;
