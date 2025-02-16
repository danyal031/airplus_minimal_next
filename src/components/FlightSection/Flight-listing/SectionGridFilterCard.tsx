"use client";
import React, { FC, useEffect } from "react";
import FlightFilterBox from "./FlightFilterBox";
import FlightsList from "./FlightsList";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { useGlobalContext } from "@/context/store";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { getOnlineFlightSearch } from "@/global-files/axioses";
import {
  convertPersianToEnglishNumbers,
  formatDateWithSlash,
} from "@/global-files/function";
interface SectionGridFilterCardProps {
  airports: AirportDataType[] | [];
}
const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  airports,
}) => {
  // initial states
  const {
    setAirports,
    isInitialSearchDone,
    setFilteredSearchFlightResponseData,
    setOrigin,
    setDestination,
    setTravelRoute,
    setTicketLoading,
    setSearchFlightResponseData,
    setChangeStatusRequest,
    setIsInitialSearchDone,
    changeStatusRequest,
    origin,
    destination,
    fromDate,
    toDate,
    // airports,
  } = useGlobalContext().flightContext.searchContext;
  const searchParams = useSearchParams();
  const router = useRouter();

  // handle initial value
  useEffect(() => {
    setAirports(airports);
  }, []);

  const paramsValidation = (searchParams: ReadonlyURLSearchParams) => {
    console.log("airport listing: ", airports);
    let dateRegex: RegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/i;
    let departureCheck = dateRegex.test(
      convertPersianToEnglishNumbers(
        searchParams.get("departure_date") as string
      )
    );
    let returnCheck =
      dateRegex.test(
        convertPersianToEnglishNumbers(
          searchParams.get("returning_date") as string
        )
      ) || (searchParams.get("returning_date") as string) === "false";
    let originCheck = !!airports.find(
      (a) => a.iata === searchParams.get("origin")
    );
    let destinationCheck = !!airports.find(
      (a) => a.iata === searchParams.get("destination")
    );
    console.log({
      departureCheck,
      returnCheck,
      originCheck,
      destinationCheck,
    });
    return departureCheck && returnCheck && originCheck && destinationCheck;
  };

  // handle search
  const handleSearch = () => {
    setFilteredSearchFlightResponseData(null);
    setOrigin(airports.find((a) => a.iata === searchParams.get("origin")));
    setDestination(
      airports.find((a) => a.iata === searchParams.get("destination"))
    );
    if (
      searchParams.get("returning_date") !== "false" &&
      searchParams.get("returning_date")
    ) {
      setTravelRoute("roundTrip");
    } else {
      setTravelRoute("oneWay");
    }
    setTicketLoading(true);
    getOnlineFlightSearch({
      origin: searchParams.get("origin"),
      destination: searchParams.get("destination"),
      departure_date:
        searchParams.get("departure_date") !== "false"
          ? formatDateWithSlash(searchParams.get("departure_date") as string)
          : false,
      returning_date:
        searchParams.get("returning_date") !== "false"
          ? formatDateWithSlash(searchParams.get("returning_date") as string)
          : false,
    })
      .then((response: any) => {
        setSearchFlightResponseData(response.data);
        setFilteredSearchFlightResponseData(response.data);
        setIsInitialSearchDone(true);
        setChangeStatusRequest(false);
        setTicketLoading(false);
      })
      .catch(() => {
        setChangeStatusRequest(false);
      });
  };
  useEffect(() => {
    if (!isInitialSearchDone) {
      if (paramsValidation(searchParams)) {
        handleSearch();
      } else {
        router.push("/");
      }
    }
  }, [searchParams]);

  // handle search  by status request
  const handleSearchByStatusRequest = () => {
    const originMatch = searchParams.get("origin") === origin?.iata;
    const destinationMatch =
      searchParams.get("destination") === destination?.iata;
    const departureDateMatch =
      searchParams.get("departure_date") === fromDate?.toString();
    const returningDateMatch =
      searchParams.get("returning_date") === (toDate?.toString() || "false");
    if (
      !isInitialSearchDone &&
      originMatch &&
      destinationMatch &&
      departureDateMatch &&
      returningDateMatch
    ) {
      setFilteredSearchFlightResponseData(null);
      setOrigin(airports.find((a) => a.iata === searchParams.get("origin")));
      setDestination(
        airports.find((a) => a.iata === searchParams.get("destination"))
      );

      if (
        searchParams.get("returning_date") !== "false" &&
        searchParams.get("returning_date")
      ) {
        setTravelRoute("roundTrip");
      } else {
        setTravelRoute("oneWay");
      }
      getOnlineFlightSearch({
        origin: searchParams.get("origin"),
        destination: searchParams.get("destination"),
        departure_date:
          searchParams.get("departure_date") !== "false"
            ? formatDateWithSlash(searchParams.get("departure_date") as string)
            : false,
        returning_date:
          searchParams.get("returning_date") !== "false"
            ? formatDateWithSlash(searchParams.get("returning_date") as string)
            : false,
      })
        .then((response: any) => {
          setSearchFlightResponseData(response.data);
          setFilteredSearchFlightResponseData(response.data);
          setIsInitialSearchDone(true);
          setChangeStatusRequest(false);
          setTicketLoading(false);
        })
        .catch(() => {
          setChangeStatusRequest(false);
        });
    }
  };
  useEffect(() => {
    handleSearchByStatusRequest();
  }, [changeStatusRequest]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <FlightFilterBox />
      </div>
      <div className="col-span-12 md:col-span-9">
        <FlightsList />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
