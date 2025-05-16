"use client";
import { useGlobalContext } from "@/context/store";
import { Button, Drawer } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FlightSearchForm from "../FlightSearchForm/FlightSearchForm";
import AccommodationSearchForm from "@/components/AccommodationSection/AccommodationSearchForm/AccommodationSearchForm";
import { formatDateWithSlash } from "@/global-files/function";

const SearchHeaderReservation = () => {
  // initial states
  const { origin, destination, fromDate, toDate } =
    useGlobalContext().flightContext.searchContext;
  const [showSummarySearch, setShowSummarySearch] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState<string>("1");
  const searchParams = useSearchParams();
  const path = usePathname();
  const [openSearchDrawer, setOpenSearchDrawer] = useState<boolean>(false);

  // handle initial tab value state
  useEffect(() => {
    const pathName = path.split("/")[2];

    switch (pathName) {
      case "flights":
        setTabValue("1");
      case "accommodations":
        setTabValue("2");
    }
  }, [path]);

  // handle toggle open search drawer
  const toggleSearchDrawer = (newOpen: boolean) => () => {
    setOpenSearchDrawer(newOpen);
  };

  // handle change tab value
  const handleChangeTab = (newValue: string) => {
    setTabValue(newValue);
  };

  // handle render tab
  const renderTab = () => {
    const tabs = [
      { id: "1", label: "پرواز", active: true },
      { id: "2", label: "اقامتگاه", active: true },
      { id: "3", label: "پرواز و اقامتگاه", active: false },
      // { id: "3", label: "اتوبوس", active: false },
      // { id: "4", label: "تور", active: false },
      // { id: "5", label: "قطار", active: false },
    ];
    return (
      <>
        <div
          className={`grid grid-cols-3 gap-0 bg-transparent rounded-tab-down w-4/5 p-0 `}
        >
          {tabs.map((tab, index) => {
            // const isEven = index % 2 === 0;
            const isActive = tabValue === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => {
                  if (tab.active) {
                    handleChangeTab(tab.id);
                  }
                }}
                className={`text-paper hover:cursor-pointer ${
                  isActive
                    ? showSummarySearch
                      ? "bg-primary-main text-paper rounded-tab-down"
                      : "bg-paper text-primary-main rounded-tab-down"
                    : showSummarySearch
                    ? "bg-paper text-primary-main rounded-tab-down"
                    : ""
                } col-span-1 flex items-center justify-center font-semibold h-12`}
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
        return <FlightSearchForm />;
      case "2":
        return <AccommodationSearchForm />;
      default:
        return <FlightSearchForm />;
    }
  };

  // render types of summery search
  // for flight
  const flightSummerySearch = () => {
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
              رفت: {formatDateWithSlash(fromDate as string)}
            </span>{" "}
            {toDate && (
              <span className={`text-paper font-semibold`}>
                برگشت: {formatDateWithSlash(toDate as string)}
              </span>
            )}
          </div>
        </div>
      </>
    );
  };

  // for accommodations
  const accommodationSummerySearch = () => {
    return (
      <>
        {" "}
        <div className="bg-primary-main rounded-b-2xl grid grid-cols-12 p-2">
          <div className="col-span-4 flex items-center justify-center">
            <span className="font-semibold text-paper text-sm">
              <span>هتل های </span>
              <span>{searchParams.get("destination")}</span>
            </span>{" "}
          </div>
          <div className="col-span-8 flex items-center justify-center gap-6 text-sm">
            <span className={`text-paper font-semibold`}>
              تاریخ ورود: {searchParams.get("departing")}
            </span>{" "}
            <span className={`text-paper font-semibold`}>
              تاریخ خروج: {searchParams.get("returning")}
            </span>
          </div>
        </div>
      </>
    );
  };

  const renderSummerySearch = () => {
    switch (tabValue) {
      case "1":
        return origin && destination ? (
          flightSummerySearch()
        ) : (
          <div className="flex items-center justify-center text-paper bg-primary-main p-2 rounded-b-2xl text-sm">
            درحال بارگذاری...{" "}
          </div>
        );
      case "2":
        return accommodationSummerySearch();
      default:
        return "loading";
    }
  };

  // for render on desktop
  const renderOnDesktop = () => {
    return (
      <>
        <div
          className={`${
            showSummarySearch ? "bg-paper" : "bg-primary-main"
          } text-paper p-2 pt-px rounded-b-xl hidden md:grid grid-cols-1 gap-0`}
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
          {showSummarySearch
            ? // origin && destination ? (
              //   renderSummerySearch()
              // ) : (
              //   <div className="flex items-center justify-center text-black">
              //     loading...
              //   </div>
              // )
              renderSummerySearch()
            : renderForm()}
        </div>
      </>
    );
  };

  // for mobile
  const renderTabOnMobile = () => {
    const tabs = [
      { id: "1", label: "پرواز", active: true },
      { id: "2", label: "اقامتگاه", active: false },
      { id: "3", label: "پرواز و اقامتگاه", active: false },
      // { id: "3", label: "اتوبوس" },
      // { id: "4", label: "تور" },
      // { id: "5", label: "قطار" },
    ];
    return (
      <>
        {" "}
        <div
          className={`grid grid-cols-3 gap-0 bg-paper w-full p-0 ${
            tabValue === "1" ? "" : ""
          } ${tabValue === "5" ? "border-l-paper" : "border-l-primary-main"}`}
        >
          {tabs.map((tab, index) => {
            // const isEven = index % 2 === 0;
            const isActive = tabValue === tab.id;

            return (
              <span
                key={tab.id}
                onClick={() => {
                  if (tab.active) {
                    handleChangeTab(tab.id);
                  }
                }}
                className={`text-paper text-xs rounded-tab-down-sm hover:cursor-pointer px-5 truncate flex-shrink-0 ${
                  isActive ? "" : ""
                } flex items-center justify-center font-semibold h-10 ${
                  tabValue === "1"
                    ? "border-r-0 rounded-r-none"
                    : tabValue === "3"
                    ? "border-l-0 rounded-l-none"
                    : ""
                }  ${
                  tabValue === tab.id
                    ? "bg-primary-main text-paper"
                    : "text-primary-main"
                }`}
              >
                {tab.label}
              </span>
            );
          })}
        </div>
      </>
    );
  };

  const renderSummerySearchOnMobile = () => {
    const drawerContent = renderForm();
    return (
      <>
        <div className="bg-primary-main p-2 flex items-center justify-between">
          <div className="flex flex-col items-start justify-center gap-1">
            <span className="font-semibold text-paper text-xs">
              <span>بلیط هواپیما</span>
              <span> {origin?.title_fa} </span>
              <span> به </span>
              <span> {destination?.title_fa} </span>
            </span>{" "}
            <div className="flex items-center justify-center gap-3 text-xs">
              <span className={`text-paper font-light opacity-50`}>
                رفت: {formatDateWithSlash(fromDate as string)}
              </span>{" "}
              {toDate && (
                <span className={`text-paper font-light opacity-50`}>
                  برگشت: {formatDateWithSlash(toDate as string)}
                </span>
              )}
            </div>
          </div>
          <Button
            onClick={toggleSearchDrawer(true)}
            endIcon={<SearchIcon fontSize="small" />}
            size="small"
            variant="contained"
            className={`bg-paper text-primary-main rounded-lg`}
          >
            جستجو
          </Button>
        </div>
        <Drawer
          anchor={"bottom"}
          PaperProps={{
            sx: {
              padding: 2,
            },
          }}
          open={openSearchDrawer}
          onClose={toggleSearchDrawer(false)}
        >
          {drawerContent}
        </Drawer>{" "}
      </>
    );
  };
  // for render on mobile
  const renderOnMobile = () => {
    return (
      <>
        <div
          className={`text-paper overflow-hidden rounded-xl md:hidden grid grid-cols-1 gap-0`}
        >
          {renderTabOnMobile()}
          {origin && destination ? (
            renderSummerySearchOnMobile()
          ) : (
            <div className="flex items-center justify-center text-black">
              درحال بارگذاری...
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {renderOnDesktop()}
      {renderOnMobile()}
    </>
  );
};

export default SearchHeaderReservation;
