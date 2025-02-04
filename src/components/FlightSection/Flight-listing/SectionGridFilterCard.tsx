"use client";
import React, { Suspense, useEffect } from "react";
import FlightFilterBox from "./FlightFilterBox";
import FlightsList from "./FlightsList";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  convertPersianToEnglishNumbers,
  formatDateWithSlash,
} from "@/global-files/function";
import { useGlobalContext } from "@/context/store";
import { getOnlineFlightSearch } from "@/global-files/axioses";

const SectionGridFilterCard = () => {
  // initial states
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    airports,
    isInitialSearchDone,
    setOrigin,
    setDestination,
    setSearchFlightResponseData,
    setFilteredSearchFlightResponseData,
    setTravelRoute,
    setTicketLoading,
    setIsInitialSearchDone,
    destination,
    fromDate,
    toDate,
    origin,
    setChangeStatusRequest,
    filteredSearchFlightResponseData,
    changeStatusRequest,
  } = useGlobalContext().flightContext.searchContext;
  const searchParamsValidation = (searchParams: ReadonlyURLSearchParams) => {
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
    // return true;
  };

  //   handle search
  useEffect(() => {
    if (!isInitialSearchDone) {
      if (searchParamsValidation(searchParams)) {
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
              ? formatDateWithSlash(
                  searchParams.get("departure_date") as string
                )
              : false,
          returning_date:
            searchParams.get("returning_date") !== "false"
              ? formatDateWithSlash(
                  searchParams.get("returning_date") as string
                )
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
      } else {
        router.push("/");
      }
    }
  }, [searchParams]);

  useEffect(() => {
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
      returningDateMatch &&
      searchParamsValidation(searchParams)
    ) {
      if (searchParamsValidation(searchParams)) {
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
              ? formatDateWithSlash(
                  searchParams.get("departure_date") as string
                )
              : false,
          returning_date:
            searchParams.get("returning_date") !== "false"
              ? formatDateWithSlash(
                  searchParams.get("returning_date") as string
                )
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
      } else {
        router.push("/");
      }
    }
  }, [changeStatusRequest]);

  useEffect(() => {
    console.log(
      "filteredSearchFlightResponseData",
      filteredSearchFlightResponseData
    );
  }, [filteredSearchFlightResponseData]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <FlightFilterBox />
      </div>
      <div className="col-span-12 md:col-span-9">
        <Suspense>
          <FlightsList />
        </Suspense>
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
