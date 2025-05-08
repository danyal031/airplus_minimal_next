"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { useGlobalContext } from "./store";
import { getOnlineFlightSearch } from "@/global-files/axioses";
import {
  groupActiveFlightsByKey,
  processFlights,
} from "@/components/FlightSection/Flight-listing/SectionGridFilterCard";
import { formatDateWithDash } from "@/global-files/function";
interface ContextProps {
  flightActions: {
    handleFlightSearch: ({
      origin,
      destination,
      departure_date,
      returning_date,
    }: {
      origin: string;
      destination: string;
      departure_date: string;
      returning_date: string | false;
    }) => void;
  };
}

// Create combined context
const ActionsContext = createContext<ContextProps | null>(null);

export const GlobalActionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // global context states
  const {
    setFilteredSearchFlightResponseData,
    setTicketLoading,
    setOrigin,
    setDestination,
    setFromDate,
    setToDate,
    setTravelRoute,
    setSearchFlightResponseData,
  } = useGlobalContext().flightContext.searchContext;
  //   initial states
  const [searching, setSearching] = useState<boolean>(false);

  const handleFlightSearch = ({
    origin,
    destination,
    departure_date,
    returning_date,
  }: {
    origin: string;
    destination: string;
    departure_date: string;
    returning_date: string | false;
  }) => {
    setFilteredSearchFlightResponseData(null);
    setTicketLoading(true);
    setSearching(true);
    getOnlineFlightSearch({
      origin,
      destination,
      departure_date,
      returning_date,
    })
      .then((response: any) => {
        console.log("flight search response:", response);

        setOrigin(response.search.origin);
        setDestination(response.search.destination);
        setFromDate(
          formatDateWithDash(response.search.departure_date) as string
        );
        if (
          response.search.returning_date &&
          response.search.returning_date !== "false"
        ) {
          setToDate(
            formatDateWithDash(response.search.returning_date) as string
          );
          setTravelRoute("roundTrip");
        } else {
          setToDate(null);
          setTravelRoute("oneWay");
        }

        const wentResult = processFlights(response.data.Went);
        const returnResult = processFlights(response.data.Return);

        const groupedWent = groupActiveFlightsByKey(wentResult.active);
        const groupedReturn = groupActiveFlightsByKey(returnResult.active);

        console.log("groupedWent", groupedWent);

        setSearchFlightResponseData({
          activeWent: groupedWent,
          activeReturn: groupedReturn,
          inactiveWent: wentResult.inactive,
          inactiveReturn: returnResult.inactive,
        });

        setFilteredSearchFlightResponseData({
          activeWent: groupedWent,
          activeReturn: groupedReturn,
          inactiveWent: wentResult.inactive,
          inactiveReturn: returnResult.inactive,
        });

        setTicketLoading(false);
      })
      .catch(() => {})
      .finally(() => {
        setSearching(false);
      });
  };

  return (
    <ActionsContext.Provider
      value={{
        flightActions: {
          handleFlightSearch,
        },
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};

export const useGlobalActions = () => {
  const context = useContext(ActionsContext);
  if (!context)
    throw new Error(
      "useFlightSearch must be used within a FlightSearchProvider"
    );
  return context;
};
