"use client";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Checkbox, Drawer, IconButton, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightModeIcon from "@mui/icons-material/LightMode";
import { styled } from "@mui/material/styles";
import { useGlobalContext } from "@/context/store";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import { Airline } from "@/DataTypes/flight/flightTicket";
import AirlineSkelton from "@/components/Skelton-Components/FlightSection/FlightFilterBoxItems/Airlines/AirlineSkelton";
import TicketTypesSkelton from "@/components/Skelton-Components/FlightSection/FlightFilterBoxItems/TicketTypes/TicketTypesSkelton";
import CabinTypesSkelton from "@/components/Skelton-Components/FlightSection/FlightFilterBoxItems/CabinTypes/CabinTypesSkelton";

const FlightFilterBox = () => {
  // initial states
  const {
    openFlightFilterDrawer,
    setOpenFlightFilterDrawer,
    filteredSearchFlightResponseData,
    travelRoute,
    selectedWentFlight,
    flightTab,
  } = useGlobalContext().flightContext.searchContext;
  const { setFlightFilter, flightFilteredItemsData } =
    useGlobalContext().flightContext.flightFilterContext;

  const [openTimeToMove, setOpenTimeToMove] = useState<boolean>(true);
  const [openTicketType, setOpenTicketType] = useState<boolean>(true);
  const [openAirlines, setOpenAirlines] = useState<boolean>(true);
  const [openFlightClass, setOpenFlightClass] = useState<boolean>(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<number | null>(
    null
  );
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(
    null
  );
  const [selectedAirline, setSelectedAirline] = useState<Airline[]>([]);

  const [selectedCabinType, setSelectedCabinType] = useState<string | null>([]);

  const theme = useTheme();

  // handle reset filter
  const resetFilters = () => {
    setSelectedTimeRange(null);
    setSelectedTicketType(null);
    setSelectedAirline([]);
    setSelectedCabinType(null);

    setFlightFilter({
      timeRange: [0, 24],
      ticketType: [],
      airline: [],
      cabinType: [],
    });
  };

  useEffect(() => {
    resetFilters();
  }, [flightTab]);

  // handle change cabin type
  const handleChangeCabinType = (newValue: string) => {
    setSelectedCabinType((prev) => (prev === newValue ? null : newValue));
    setFlightFilter((prevFilters: any) => ({
      ...prevFilters,
      cabinType: prevFilters.cabinType === newValue ? [] : newValue,
    }));
  };

  // handle change airline value
  const handleChangeAirline = (airline: Airline) => {
    setSelectedAirline((prev: any) => {
      const isSelected = prev.some((a) => a.id === airline.id);
      return isSelected
        ? prev.filter((a) => a.id !== airline.id)
        : [...prev, airline];
    });

    setFlightFilter((prevFilter: any) => ({
      ...prevFilter,
      airline: selectedAirline.some((a) => a.id === airline.id)
        ? selectedAirline.filter((a) => a.id !== airline.id)
        : [...selectedAirline, airline],
    }));
  };

  // handle change ticket type value
  const handleChangeTicketType = (value: string) => {
    setSelectedTicketType((prev) => (prev === value ? null : value));
    setFlightFilter((prevFilter: any) => ({
      ...prevFilter,
      ticketType: prevFilter.ticketType === value ? [] : value,
    }));
  };

  // handle change time range value
  const handleChangeTimeRange = (value: number, range: number[]) => {
    setSelectedTimeRange((prev) => (prev === value ? null : value));
    setFlightFilter((prevFilter: any) => ({
      ...prevFilter,
      timeRange:
        prevFilter.timeRange?.toString() === range.toString() ? [0, 24] : range,
    }));
  };

  // for toggle drawer
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenFlightFilterDrawer(newOpen);
  };

  // handle onchange filter box sections
  const handleChangeFilterBoxSections = (section: string) => {
    switch (section) {
      case "timeToMove":
        setOpenTimeToMove(!openTimeToMove);
        break;
      case "ticketType":
        setOpenTicketType(!openTicketType);
        break;
      case "airlines":
        setOpenAirlines(!openAirlines);
        break;
      case "flightClass":
        setOpenFlightClass(!openFlightClass);
        break;
      default:
        break;
    }
  };

  // handle render summery filter data
  const renderSummeryFilterData = () => {
    return (
      <>
        <div className="bg-paper p-2 rounded-xl flex items-center justify-between w-full text-sm">
          <span className="text-text-main font-semibold cursor-pointer">
            تعداد نتایج:{" "}
            {flightTab === 1
              ? filteredSearchFlightResponseData?.activeWent.length
              : filteredSearchFlightResponseData?.activeReturn.length}{" "}
          </span>
          <span
            onClick={resetFilters}
            className="text-primary-main font-semibold cursor-pointer"
          >
            حذف فیلتر
          </span>
        </div>
      </>
    );
  };

  // handle render time to move
  const renderTimeToMove = () => {
    const timeRange = [
      {
        id: 1,
        label: "بامداد",
        icon: <LightModeIcon fontSize="small" />,
        range: "0-6",
        value: [0, 6],
      },
      {
        id: 2,
        label: "صبح",
        icon: <LightModeIcon fontSize="small" />,
        range: "6-12",
        value: [6, 12],
      },
      {
        id: 3,
        label: "ظهر",
        icon: <LightModeIcon fontSize="small" />,
        range: "12-18",
        value: [12, 18],
      },
      {
        id: 4,
        label: "شب",
        icon: <LightModeIcon fontSize="small" />,
        range: "18-24",
        value: [18, 24],
      },
    ];
    return (
      <>
        <div className="bg-paper p-2 rounded-t-xl md:rounded-xl w-full text-sm grid grid-cols-1 gap-3">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleChangeFilterBoxSections("timeToMove")}
          >
            <span className="text-text-main font-semibold cursor-pointer">
              زمان حرکت
            </span>
            <IconButton size="small">
              {openTimeToMove ? (
                <CloseIcon className="text-sm" />
              ) : (
                <KeyboardArrowDownIcon className="text-sm" />
              )}
            </IconButton>{" "}
          </div>
          {openTimeToMove && (
            <div className="grid grid-cols-4 gap-2">
              {timeRange.map((item) => (
                <div
                  onClick={() => {
                    handleChangeTimeRange(item.id, item.value);
                  }}
                  key={item.id}
                  className={`${
                    selectedTimeRange === item.id &&
                    "bg-primary-main text-paper"
                  } bg-main text-text-subText p-1 rounded-2xl cursor-pointer flex flex-col items-center justify-center gap-px`}
                >
                  {item.icon}
                  <span className="font-semibold text-xs">{item.label}</span>
                  <span className="font-semibold text-xs">{item.range}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

  //   handle render Ticket type
  const renderTicketType = () => {
    return (
      <>
        {" "}
        <div className="bg-paper p-2 md:rounded-xl w-full text-sm grid grid-cols-1 gap-3">
          {" "}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleChangeFilterBoxSections("ticketType")}
          >
            <span className="text-text-main font-semibold cursor-pointer">
              نوع بلیت{" "}
            </span>
            <IconButton size="small">
              {openTicketType ? (
                <CloseIcon className="text-sm" />
              ) : (
                <KeyboardArrowDownIcon className="text-sm" />
              )}
            </IconButton>{" "}
          </div>
          {openTicketType && (
            <div className="flex items-center justify-start gap-2">
              {flightFilteredItemsData ? (
                flightFilteredItemsData.ticketType.map((item: any) => (
                  <span
                    onClick={() => {
                      handleChangeTicketType(item);
                    }}
                    key={item.id}
                    className={`${
                      selectedTicketType === item
                        ? "border-primary-main text-primary-main"
                        : "text-text-main"
                    } p-1 border-divider border px-2 rounded-xl hover:border-primary-main hover:text-primary-main cursor-pointer`}
                  >
                    {item === "Charter" ? "چارتری" : "سیستمی"}
                  </span>
                ))
              ) : (
                <TicketTypesSkelton />
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  // handle render Airlines
  const renderAirlines = () => {
    const BpIcon = styled("span")(({ theme }) => ({
      borderRadius: 6,
      width: 18,
      height: 18,
      boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
      backgroundColor: "#f5f8fa",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
      ".Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: "#ebf1f5",
        ...theme.applyStyles("dark", {
          backgroundColor: "#30404d",
        }),
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
        ...theme.applyStyles("dark", {
          background: "rgba(57,75,89,.5)",
        }),
      },
      ...theme.applyStyles("dark", {
        boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
        backgroundColor: "#394b59",
        backgroundImage:
          "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
      }),
    }));
    const BpCheckedIcon = styled(BpIcon)({
      backgroundColor: theme.palette.primary.main,
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&::before": {
        display: "block",
        width: 18,
        height: 18,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      "input:hover ~ &": {
        backgroundColor: theme.palette.primary.main,
      },
    });
    return (
      <>
        <div className="bg-paper p-2 md:rounded-xl w-full text-sm grid grid-cols-1 gap-3">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleChangeFilterBoxSections("airlines")}
          >
            <span className="text-text-main font-semibold cursor-pointer">
              شرکت های هواپیمایی{" "}
            </span>
            <IconButton size="small">
              {openAirlines ? (
                <CloseIcon className="text-sm" />
              ) : (
                <KeyboardArrowDownIcon className="text-sm" />
              )}
            </IconButton>{" "}
          </div>
          {openAirlines && (
            <div className="grid grid-cols-1 gap-2">
              {flightFilteredItemsData ? (
                flightFilteredItemsData.airlineType.map(
                  (item: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/airlines/${item.logo}`}
                            alt={item.title_fa}
                            width={30}
                            height={30}
                          />
                          <span className="text-sm text-text-subText">
                            {item.title_fa}
                          </span>
                        </div>
                        <Checkbox
                          checked={selectedAirline.some(
                            (a) => a.id === item.id
                          )}
                          onChange={() => handleChangeAirline(item)}
                          checkedIcon={<BpCheckedIcon />}
                          icon={<BpIcon />}
                        />
                      </div>
                    );
                  }
                )
              ) : (
                <AirlineSkelton />
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  // handle render flight class
  const renderFlightClass = () => {
    return (
      <>
        {" "}
        <div className="bg-paper p-2 rounded-b-xl md:rounded-xl w-full text-sm grid grid-cols-1 gap-3">
          {" "}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleChangeFilterBoxSections("flightClass")}
          >
            <span className="text-text-main font-semibold cursor-pointer">
              کلاس پروازی{" "}
            </span>
            <IconButton size="small">
              {openFlightClass ? (
                <CloseIcon className="text-sm" />
              ) : (
                <KeyboardArrowDownIcon className="text-sm" />
              )}
            </IconButton>{" "}
          </div>
          {openFlightClass && (
            <div className="flex items-center justify-start gap-2">
              {flightFilteredItemsData ? (
                flightFilteredItemsData?.cabinType.map((item: string) => (
                  <span
                    onClick={() => {
                      handleChangeCabinType(item);
                    }}
                    key={item}
                    className={`${
                      selectedCabinType === item
                        ? "border-primary-main text-primary-main"
                        : "text-text-main"
                    } border border-divider p-1 px-2 rounded-xl hover:border-primary-main hover:text-primary-main cursor-pointer`}
                  >
                    {item}
                  </span>
                ))
              ) : (
                <CabinTypesSkelton />
              )}
            </div>
          )}
        </div>
      </>
    );
  };
  // for render on desktop
  const renderFilterContainerOnDesktop = () => {
    return (
      <>
        <div className="hidden md:flex flex-col items-center justify-start gap-2 sticky top-44">
          {renderSummeryFilterData()}
          {renderTimeToMove()}
          {renderAirlines()}
          {renderFlightClass()}
          {renderTicketType()}
        </div>
      </>
    );
  };
  const renderFilterContainerOnMobile = () => {
    const drawerContent = (
      <>
        <div className="text-paper sticky top-0 py-3 px-4 flex items-center justify-between bg-primary-main">
          <span className="font-semibold cursor-pointer">فیلتر ها</span>
          <IconButton size="small" onClick={toggleDrawer(false)}>
            <ClearIcon className="text-paper" fontSize="small" />
          </IconButton>
        </div>
        <div className="p-4 flex flex-col items-center justify-start gap-1">
          <span className="text-text-main font-semibold text-sm self-start mb-1">
            تعداد نتایج: 53
          </span>
          {renderTimeToMove()}
          {renderTicketType()}
          {renderAirlines()}
          {renderFlightClass()}
        </div>
        <div className="absolute bottom-0 w-full p-2 h-14 grid grid-cols-2 gap-2">
          <Button
            variant="contained"
            className="rounded-lg text-primary-main"
            color="inherit"
            size="small"
          >
            پاک کردن
          </Button>{" "}
          <Button
            onClick={toggleDrawer(false)}
            variant="contained"
            color="primary"
            size="small"
            className="rounded-lg"
          >
            تایید
          </Button>
        </div>
      </>
    );
    return (
      <>
        <Drawer
          anchor={"right"}
          PaperProps={{
            sx: {
              width: "100%",
              backgroundColor: "#EFEFEF",
              position: "relative",
            },
          }}
          open={openFlightFilterDrawer}
          onClose={toggleDrawer(false)}
        >
          {drawerContent}
        </Drawer>{" "}
      </>
    );
  };
  return (
    <>
      {renderFilterContainerOnDesktop()}
      {renderFilterContainerOnMobile()}
    </>
  );
};

export default FlightFilterBox;
