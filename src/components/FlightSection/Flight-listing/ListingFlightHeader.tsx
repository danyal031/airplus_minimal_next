"use client";
import { useGlobalContext } from "@/context/store";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { getOnlineFlightSearch } from "@/global-files/axioses";
import { formatDateWithSlash } from "@/global-files/function";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { FC, useEffect } from "react";

interface ListingFlightHeaderProps {
  airports?: AirportDataType[] | [];
}
const ListingFlightHeader: FC<ListingFlightHeaderProps> = ({
  airports = [],
}) => {
  // initial states
  const {
    setAirports,
    isInitialSearchDone,
    origin,
    destination,
    setOrigin,
    setDestination,
    setTicketLoading,
    setChangeStatusRequest,
    setIsInitialSearchDone,
    setSearchFlightResponseData,
    setFilteredSearchFlightResponseData,
    changeStatusRequest,
    fromDate,
    toDate,
  } = useGlobalContext().flightContext.searchContext;
  const router = useRouter();
  const searchParams = useSearchParams();

  // handle airports value
  useEffect(() => {
    setAirports(airports);
  }, []);

  const searchParamsValidation = (searchParams: ReadonlyURLSearchParams) => {
    // console.log("airport listing: ", airports);
    // let dateRegex: RegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/i;
    // let departureCheck = dateRegex.test(
    //   testConvertPersianToEnglishNumbers(
    //     searchParams.get("departure_date") as string
    //   )
    // );
    // let returnCheck =
    //   dateRegex.test(
    //     testConvertPersianToEnglishNumbers(
    //       searchParams.get("returning_date") as string
    //     )
    //   ) || (searchParams.get("returning_date") as string) === "false";
    // let originCheck = !!airports.find(
    //   (a) => a.iata === searchParams.get("origin")
    // );
    // let destinationCheck = !!airports.find(
    //   (a) => a.iata === searchParams.get("destination")
    // );
    // console.log({ departureCheck, returnCheck, originCheck, destinationCheck });
    // return departureCheck && returnCheck && originCheck && destinationCheck;
    return true;
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

  return (
    <div className="bg-purple-700 text-white fixed top-20 w-full">
      ListingFlightHeader
    </div>
  );
};

export default ListingFlightHeader;
