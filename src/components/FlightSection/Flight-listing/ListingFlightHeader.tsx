"use client";
import { useGlobalContext } from "@/context/store";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { getOnlineFlightSearch } from "@/global-files/axioses";
import {
  convertPersianToEnglishNumbers,
  formatDateWithSlash,
} from "@/global-files/function";
import { Button, useTheme } from "@mui/material";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FlightSearchFormOnDesktop from "../FlightSearchForm/FlightSearchFormOnDesktop";
import ResidenceSearchFormOnDesktop from "@/components/ResidenceSection/ResidenceSearchForm/ResidenceSearchFormOnDesktop";
import FlightSummarySearchSkelton from "@/components/Skelton-Components/FlightSection/FlightHeaderSearchForm/FlightSummarySearchSkelton";
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
    // airports,
    setTravelRoute,
    setDropOffLocationType,
    filteredSearchFlightResponseData,
  } = useGlobalContext().flightContext.searchContext;
  const [showSummarySearch, setShowSummarySearch] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState<string>("1");
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();

  // handle airports value
  useEffect(() => {
    setAirports(airports);
  }, []);

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

  // handle change tab value
  const handleChangeTab = (newValue: string) => {
    setTabValue(newValue);
  };

  // handle render tab
  const renderTab = () => {
    const tabs = [
      { id: "1", label: "پرواز" },
      { id: "2", label: "هتل و اقامتگاه" },
      { id: "3", label: "اتوبوس" },
      { id: "4", label: "تور" },
      { id: "5", label: "قطار" },
    ];

    return (
      <>
        <div
          className={`grid grid-cols-10 gap-0 bg-transparent rounded-tab-down w-4/5 p-0 `}
        >
          {" "}
          {tabs.map((tab, index) => {
            // const isEven = index % 2 === 0;
            const isActive = tabValue === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => handleChangeTab(tab.id)}
                className={`text-paper hover:cursor-pointer ${
                  isActive
                    ? showSummarySearch
                      ? "bg-primary-main text-paper rounded-tab-down"
                      : "bg-paper text-primary-main rounded-tab-down"
                    : showSummarySearch
                    ? "bg-paper text-primary-main rounded-tab-down"
                    : ""
                } col-span-2 flex items-center justify-center font-semibold h-12`}
              >
                {tab.label}
              </span>
            );
          })}
        </div>
      </>
    );
  };

  // handle render form
  const renderForm = () => {
    switch (tabValue) {
      case "1":
        return <FlightSearchFormOnDesktop />;
      case "2":
        return <ResidenceSearchFormOnDesktop />;
      default:
        return <FlightSearchFormOnDesktop />;
    }
  };

  const renderSummerySearch = () => {
    return (
      <>
        <div className="bg-primary-main rounded-b-2xl grid grid-cols-12 p-2">
          <div className="col-span-4 flex items-center justify-center">
            <span className="font-semibold text-paper text-sm">
              <span>بلیط هواپیما</span>
              <span> {origin?.title_fa} </span>
              <span> به </span>
              <span> {destination?.title_fa} </span>
            </span>{" "}
          </div>
          <div className="col-span-8 flex items-center justify-center gap-6 text-sm">
            <span className={`text-paper font-semibold`}>
              رفت: {searchParams.get("departure_date")}
            </span>{" "}
            <span className={`text-paper font-semibold`}>
              برگشت: {searchParams.get("returning_date")}
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className={`${
        showSummarySearch ? "bg-paper" : "bg-primary-main"
      } text-white p-2 pt-px rounded-b-xl grid grid-cols-1 gap-0`}
    >
      <div className="flex items-center justify-center relative">
        {renderTab()}
        <Button
          onClick={() => {
            setShowSummarySearch(!showSummarySearch);
          }}
          endIcon={
            showSummarySearch ? (
              <SearchIcon fontSize="small" />
            ) : (
              <CloseIcon fontSize="small" />
            )
          }
          size="small"
          variant="contained"
          className={`${
            showSummarySearch
              ? "bg-primary-main text-paper"
              : "text-primary-main bg-paper"
          } rounded-lg absolute left-0`}
        >
          {showSummarySearch ? "جستجو" : "بستن"}
        </Button>
      </div>
      {/* {showSummarySearch ? renderSummerySearch() : renderForm()}{" "} */}
      {showSummarySearch ? (
        origin && destination ? (
          renderSummerySearch()
        ) : (
          <div className="flex items-center justify-center text-black">
            loading...
          </div>
        )
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default ListingFlightHeader;
