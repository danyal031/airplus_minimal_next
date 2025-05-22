"use client";
import React, { FC } from "react";
import PriceRateBox from "./PriceRateBox";
import TicketsList from "./TicketsList";
import SelectedFlightsPanel from "./SelectedFlightsPanel";
import { useGlobalContext } from "@/context/store";
import { FlightCardSkelton } from "@/components/Skelton-Components/FlightSection/FlightCard/FlightCardSkelton";

interface FlightsListProps {
  action: "flight" | "flight-accommodation";
}

const FlightsList: FC<FlightsListProps> = ({ action }) => {
  // initial states
  const { ticketLoading, travelRoute } =
    useGlobalContext().flightContext.searchContext;
  return (
    <div className="flex flex-col items-start justify-start gap-3">
      {action === "flight" && (
        <div className="w-full">
          <PriceRateBox />
        </div>
      )}
      {travelRoute === "roundTrip" && (
        <div className="w-full">
          <SelectedFlightsPanel />{" "}
        </div>
      )}
      {ticketLoading ? (
        <div className="flex flex-col gap-y-2 w-full">
          {Array.from({ length: 10 }).map((_, index) => (
            <FlightCardSkelton key={index} />
          ))}
        </div>
      ) : (
        <div className="w-full">
          <TicketsList />
        </div>
      )}
    </div>
  );
};

export default FlightsList;
