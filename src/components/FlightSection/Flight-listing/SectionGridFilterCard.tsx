"use client";
import React, { FC, Suspense, useEffect, useState } from "react";
import FlightFilterBox from "./FlightFilterBox";
import FlightsList from "./FlightsList";
import {
  Airline,
  AirportDataType,
  FilteredItemsDataDataType,
} from "@/DataTypes/flight/flightTicket";
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
    searchFlightResponseData,
    travelRoute,
    selectedWentFlight,
    ticketLoading,
  } = useGlobalContext().flightContext.searchContext;
  const {
    flightFilter,
    flightSelectedSortFiltered,
    flightFilteredItemsData,
    setFlightFilteredItemsData,
    setSelectedAirlineFiltered,
  } = useGlobalContext().flightContext.flightFilterContext;

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
        console.log("flight search response:", response);
        // const newData= response.data.map((item: any) => {
        //   return {

        // })
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

  // handle filters
  useEffect(() => {
    if (searchFlightResponseData) {
      let filteredData =
        searchFlightResponseData[
          travelRoute === "oneWay"
            ? "Went"
            : !selectedWentFlight
            ? "Went"
            : "Return"
        ];

      // handle cabin type
      if (flightFilter.cabinType.length > 0) {
        filteredData = filteredData.filter((item) =>
          flightFilter.cabinType.includes(item.Classes[0].CabinType.title.fa)
        );
      }

      // handle airline filter
      if (flightFilter.airline.length > 0) {
        filteredData = filteredData.filter((item) =>
          flightFilter.airline.some(
            (airline) => airline.iata === item.Airline.iata
          )
        );
      }

      // handle ticket type filter
      if (flightFilter.ticketType.length > 0) {
        filteredData = filteredData.filter((item) =>
          flightFilter.ticketType.includes(item.FlightType)
        );
      }

      // handle filter time range
      filteredData = filteredData.filter((flight) => {
        const timePart = flight.DepartureDateTime.split(" ")[1];
        const [hours, minutes] = timePart.split(":").map(Number);
        const departureTime = hours + minutes / 60;
        return (
          departureTime >= flightFilter.timeRange[0] &&
          departureTime <= flightFilter.timeRange[1]
        );
      });

      // handle sort filter
      if (flightSelectedSortFiltered === "4") {
        filteredData.sort(
          (a, b) =>
            new Date(a.DepartureDateTime).getTime() -
            new Date(b.DepartureDateTime).getTime()
        );
      } else if (flightSelectedSortFiltered === "5") {
        filteredData.sort(
          (a, b) =>
            new Date(b.DepartureDateTime).getTime() -
            new Date(a.DepartureDateTime).getTime()
        );
      } else if (flightSelectedSortFiltered === "2") {
        filteredData.sort(
          (a, b) =>
            new Date(a.Classes[0].Financial.Adult.Payable).getTime() -
            new Date(b.Classes[0].Financial.Adult.Payable).getTime()
        );
      } else if (flightSelectedSortFiltered === "3") {
        filteredData.sort(
          (a, b) =>
            new Date(b.Classes[0].Financial.Adult.Payable).getTime() -
            new Date(a.Classes[0].Financial.Adult.Payable).getTime()
        );
      }

      // handle set new filtered data
      travelRoute === "oneWay"
        ? setFilteredSearchFlightResponseData((pre) => ({
            ...pre,
            Went: filteredData ?? [],
            Return: pre?.Return ?? [],
          }))
        : !selectedWentFlight
        ? setFilteredSearchFlightResponseData((pre) => ({
            ...pre,
            Went: filteredData ?? [],
            Return: pre?.Return ?? [],
          }))
        : setFilteredSearchFlightResponseData((pre) => ({
            ...pre,
            Went: pre?.Went ?? [],
            Return: filteredData ?? [],
          }));
    }
  }, [
    flightFilter,
    flightSelectedSortFiltered,
    searchFlightResponseData,
    travelRoute,
    selectedWentFlight,
  ]);

  const handleResetFilteredItems = () => {
    setSelectedAirlineFiltered([]);
    setFilteredSearchFlightResponseData(searchFlightResponseData);
  };

  useEffect(() => {
    if (searchFlightResponseData) {
      handleResetFilteredItems();
      // for cabin type filter
      const cabinItemsFilterData: string[] = [];
      const ticketItemsFilterData: string[] = [];
      const airlineItemsFilterData: Airline[] = [];
      searchFlightResponseData[
        travelRoute == "oneWay"
          ? "Went"
          : !selectedWentFlight
          ? "Went"
          : "Return"
      ].forEach((item) => {
        if (
          !cabinItemsFilterData.includes(item.Classes[0].CabinType.title.fa)
        ) {
          cabinItemsFilterData.push(item.Classes[0].CabinType.title.fa);
        }
        if (!ticketItemsFilterData.includes(item.FlightType)) {
          ticketItemsFilterData.push(item.FlightType);
        }
        airlineItemsFilterData.push(item.Airline);
      });
      console.log(airlineItemsFilterData);
      setFlightFilteredItemsData({
        ...flightFilteredItemsData,
        cabinType: cabinItemsFilterData,
        ticketType: ticketItemsFilterData,
        airlineType: removeDuplicatesAirlines(airlineItemsFilterData),
      });
      console.log("exist cabin's type", cabinItemsFilterData);
    }
  }, [searchFlightResponseData, travelRoute, selectedWentFlight]);

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

function removeDuplicatesAirlines(arr: Airline[]): Airline[] {
  const uniqueMap = new Map();
  arr.forEach((item) => {
    const keyValue: string = item["iata"];
    if (!uniqueMap.has(keyValue)) {
      uniqueMap.set(keyValue, item);
    }
  });
  return Array.from(uniqueMap.values());
}

export default SectionGridFilterCard;
