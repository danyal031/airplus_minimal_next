"use client";
import React from "react";
import PriceRateBox from "./PriceRateBox";
import TicketsList from "./TicketsList";
import SelectedFlightsPanel from "./SelectedFlightsPanel";
import { useGlobalContext } from "@/context/store";
import { useSearchParams } from "next/navigation";
import { FlightCardSkelton } from "@/components/Skelton-Components/FlightSection/FlightCard/FlightCardSkelton";

const FlightsList = () => {
  // initial states
  const { filteredSearchFlightResponseData, ticketLoading } =
    useGlobalContext().flightContext.searchContext;
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-col items-start justify-start gap-3">
      {searchParams.get("returning_date") !== "false" &&
        filteredSearchFlightResponseData &&
        filteredSearchFlightResponseData?.Return.length > 0 &&
        filteredSearchFlightResponseData?.Went.length > 0 && (
          <div className="w-full">
            <SelectedFlightsPanel />{" "}
          </div>
        )}
      {/* <div className="w-full">
        <PriceRateBox />
      </div> */}
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
