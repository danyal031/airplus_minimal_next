"use client";
import React, { FC, Suspense, useEffect, useState } from "react";
import FlightFilterBox from "./FlightFilterBox";
import FlightsList from "./FlightsList";
import {
  Airline,
  Class,
  FlightTicketDataType,
} from "@/DataTypes/flight/flightTicket";
import { useGlobalContext } from "@/context/store";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { getAirports, getOnlineFlightSearch } from "@/global-files/axioses";
import {
  convertPersianToEnglishNumbers,
  formatDateWithSlash,
} from "@/global-files/function";
import moment from "jalali-moment";
import { useGlobalActions } from "@/context/actionStore";

export const groupActiveFlightsByKey = (
  flights: FlightTicketDataType[]
): FlightTicketDataType[][] => {
  const groupedMap: Record<string, FlightTicketDataType[]> = {};

  flights.forEach((item) => {
    const key = `${item.Origin.Iata.iata}|${item.Destination.Iata.iata}|${item.Airline.iata}|${item.FlightNumber}|${item.DepartureDateTime}`;
    if (!groupedMap[key]) {
      groupedMap[key] = [];
    }
    groupedMap[key].push(item);
  });

  return Object.values(groupedMap);
};

export const processFlights = (flights: any[]) => {
  const active: FlightTicketDataType[] = [];
  const inactiveMap = new Map<string, FlightTicketDataType>();

  flights.forEach((item) => {
    item.Classes.forEach((classItem: Class) => {
      const merged: FlightTicketDataType = {
        ...item,
        Classes: classItem,
      };
      const isAvailable = classItem.AvailableSeat;
      const isPayable = classItem.Financial.Adult.Payable !== 0;

      if (isAvailable && isPayable) {
        active.push(merged);
      } else {
        const key = `${item.Origin.Iata.iata}|${item.Destination.Iata.iata}|${item.Airline.iata}|${item.FlightNumber}|${item.DepartureDateTime}`;
        if (!inactiveMap.has(key)) {
          inactiveMap.set(key, merged);
        }
      }
    });
  });

  return {
    active,
    inactive: Array.from(inactiveMap.values()),
  };
};
interface SectionGridFilterCardProps {
  action: "flight" | "flight-accommodation";
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({ action }) => {
  // initial states
  const [airportsLoading, setAirportsLoading] = useState(true);
  const {
    setFilteredSearchFlightResponseData,
    searchFlightResponseData,
    travelRoute,
    setAirports,
    airports,
    flightTab,
    isFlightSearching,
  } = useGlobalContext().flightContext.searchContext;
  const {
    flightFilter,
    flightSelectedSortFiltered,
    flightFilteredItemsData,
    setFlightFilteredItemsData,
    setSelectedAirlineFiltered,
  } = useGlobalContext().flightContext.flightFilterContext;
  const { handleFlightSearch } = useGlobalActions().flightActions;
  const { searchType, setSearchType } = useGlobalContext().global;
  const searchParams = useSearchParams();
  const router = useRouter();

  // handle initial value
  useEffect(() => {
    // initial search type value
    setSearchType(action);

    getAirports()
      .then((res: any) => {
        console.log("res", res);
        if (res.status) {
          setAirports(res.data.titles);
          setAirportsLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  const paramsValidation = (searchParams: ReadonlyURLSearchParams) => {
    // let dateRegex: RegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/i;
    // let departureCheck = dateRegex.test(
    //   convertPersianToEnglishNumbers(
    //     searchParams.get("departing") as string
    //   )
    // );
    // let returnCheck =
    //   dateRegex.test(
    //     convertPersianToEnglishNumbers(
    //       searchParams.get("returning") as string
    //     )
    //   ) || (searchParams.get("returning") as string) === "false";

    let originCheck = !!airports.find(
      (a) => a.iata === searchParams.get("origin")
    );
    let destinationCheck = !!airports.find(
      (a) => a.iata === searchParams.get("destination")
    );
    console.log({
      // departureCheck,
      // returnCheck,
      originCheck,
      destinationCheck,
    });
    // return departureCheck && returnCheck && originCheck && destinationCheck;
    return originCheck && destinationCheck;
  };

  useEffect(() => {
    // if (paramsValidation(searchParams)) {
    const origin = searchParams.get("origin") as string;
    const destination = searchParams.get("destination") as string;

    const departureParam = searchParams.get("departing");
    const returningParam = searchParams.get("returning");

    const departure_date = departureParam
      ? formatDateWithSlash(departureParam)
      : moment().add(1, "day").format("jYYYY/jMM/jDD");

    const returning_date =
      departureParam && returningParam && returningParam !== "false"
        ? formatDateWithSlash(returningParam)
        : false;
    const flightOnlyCharter =
      searchParams.get("flightOnlyCharters") === "true" ? true : false;

    if (!isFlightSearching) {
      handleFlightSearch({
        origin,
        destination,
        departure_date,
        returning_date,
        only_charters: flightOnlyCharter,
      });
    }

    // } else {
    // router.push("/");
    // console.log("not valid");
    // }
  }, []);

  useEffect(() => {
    console.log("searchFlightResponseData", searchFlightResponseData);
  }, [searchFlightResponseData]);

  // handle filters
  useEffect(() => {
    if (searchFlightResponseData) {
      let filteredData =
        searchFlightResponseData[
          flightTab === 1 ? "activeWent" : "activeReturn"
        ];

      // handle cabin type
      if (flightFilter.cabinType.length > 0) {
        filteredData = filteredData.filter((item) =>
          flightFilter.cabinType.includes(item[0].Classes.CabinType.title.fa)
        );
      }

      // handle airline filter
      if (flightFilter.airline.length > 0) {
        filteredData = filteredData.filter((item) =>
          flightFilter.airline.some(
            (airline) => airline.iata === item[0].Airline.iata
          )
        );
      }

      // handle ticket type filter
      if (flightFilter.ticketType.length > 0) {
        filteredData = filteredData.filter((item) =>
          flightFilter.ticketType.includes(item[0].FlightType)
        );
      }

      // handle filter time range
      filteredData = filteredData.filter((flight) => {
        const timePart = flight[0].DepartureDateTime.split(" ")[1];
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
            new Date(a[0].DepartureDateTime).getTime() -
            new Date(b[0].DepartureDateTime).getTime()
        );
      } else if (flightSelectedSortFiltered === "5") {
        filteredData.sort(
          (a, b) =>
            new Date(b[0].DepartureDateTime).getTime() -
            new Date(a[0].DepartureDateTime).getTime()
        );
      } else if (flightSelectedSortFiltered === "2") {
        filteredData.sort(
          (a, b) =>
            new Date(a[0].Classes.Financial.Adult.Payable).getTime() -
            new Date(b[0].Classes.Financial.Adult.Payable).getTime()
        );
      } else if (flightSelectedSortFiltered === "3") {
        filteredData.sort(
          (a, b) =>
            new Date(b[0].Classes.Financial.Adult.Payable).getTime() -
            new Date(a[0].Classes.Financial.Adult.Payable).getTime()
        );
      }

      // handle set new filtered data
      flightTab === 1
        ? setFilteredSearchFlightResponseData((pre) => ({
            activeWent: filteredData ?? [],
            activeReturn: pre?.activeReturn ?? [],
            inactiveWent: pre?.inactiveWent ?? [],
            inactiveReturn: pre?.inactiveReturn ?? [],
          }))
        : setFilteredSearchFlightResponseData((pre) => ({
            activeWent: pre?.activeWent ?? [],
            activeReturn: filteredData ?? [],
            inactiveWent: pre?.inactiveWent ?? [],
            inactiveReturn: pre?.inactiveReturn ?? [],
          }));
    }
  }, [
    flightFilter,
    flightSelectedSortFiltered,
    searchFlightResponseData,
    travelRoute,
    flightTab,
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
        flightTab === 1 ? "activeWent" : "activeReturn"
      ].forEach((item) => {
        if (
          !cabinItemsFilterData.includes(item[0].Classes.CabinType.title.fa)
        ) {
          cabinItemsFilterData.push(item[0].Classes.CabinType.title.fa);
        }
        if (!ticketItemsFilterData.includes(item[0].FlightType)) {
          ticketItemsFilterData.push(item[0].FlightType);
        }
        airlineItemsFilterData.push(item[0].Airline);
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
  }, [searchFlightResponseData, travelRoute, flightTab]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3 relative">
        <FlightFilterBox />
      </div>
      <div className="col-span-12 md:col-span-9">
        <Suspense>
          <FlightsList action={action} />
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
