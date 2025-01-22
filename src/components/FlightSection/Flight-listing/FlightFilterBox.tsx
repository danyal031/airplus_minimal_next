"use client";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { alpha, Checkbox, IconButton, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightModeIcon from "@mui/icons-material/LightMode";
import { styled } from "@mui/material/styles";

const FlightFilterBox = () => {
  // initial states
  const [openSummeryFilterData, setOpenSummeryFilterData] =
    useState<boolean>(false);
  const [openTimeToMove, setOpenTimeToMove] = useState<boolean>(false);
  const [openTicketType, setOpenTicketType] = useState<boolean>(false);
  const [openAirlines, setOpenAirlines] = useState<boolean>(false);
  const [openFlightClass, setOpenFlightClass] = useState<boolean>(false);
  const theme = useTheme();

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
            تعداد نتایج
          </span>
          <span className="text-primary-main font-semibold">حذف فیلتر</span>
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
      },
      {
        id: 2,
        label: "صبح",
        icon: <LightModeIcon fontSize="small" />,
        range: "6-12",
      },
      {
        id: 3,
        label: "ظهر",
        icon: <LightModeIcon fontSize="small" />,
        range: "12-18",
      },
      {
        id: 4,
        label: "شب",
        icon: <LightModeIcon fontSize="small" />,
        range: "18-24",
      },
    ];
    return (
      <>
        <div className="bg-paper p-2 rounded-xl w-full text-sm grid grid-cols-1 gap-3">
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
                  key={item.id}
                  className={`bg-main text-gray-400 p-1 rounded-2xl cursor-pointer flex flex-col items-center justify-center gap-px`}
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
        <div className="bg-paper p-2 rounded-xl w-full text-sm grid grid-cols-1 gap-3">
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
              <span className="border border-gray-400 p-1 px-2 rounded-xl text-gray-400 hover:border-primary-main hover:text-primary-main cursor-pointer">
                سیستمی
              </span>
              <span className="border border-gray-400 p-1 px-2 rounded-xl text-gray-400 hover:border-primary-main hover:text-primary-main cursor-pointer">
                چارتری
              </span>
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
    const airlines = [1, 2, 3, 4, 5];
    return (
      <>
        <div className="bg-paper p-2 rounded-xl w-full text-sm grid grid-cols-1 gap-3">
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
              {airlines.map((item) => {
                return (
                  <>
                    <div
                      key={item}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs text-black">logo</span>
                        <span className="text-sm text-gray-400">
                          هواپیمایی وارش
                        </span>
                      </div>
                      <Checkbox
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                      />
                    </div>
                  </>
                );
              })}
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
        <div className="bg-paper p-2 rounded-xl w-full text-sm grid grid-cols-1 gap-3">
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
              <span className="border border-gray-400 p-1 px-2 rounded-xl text-gray-400 hover:border-primary-main hover:text-primary-main cursor-pointer">
                پریمیوم اکونومی
              </span>
              <span className="border border-gray-400 p-1 px-2 rounded-xl text-gray-400 hover:border-primary-main hover:text-primary-main cursor-pointer">
                اکونومی
              </span>{" "}
              <span className="border border-gray-400 p-1 px-2 rounded-xl text-gray-400 hover:border-primary-main hover:text-primary-main cursor-pointer">
                سیستمی
              </span>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start gap-2">
      {renderSummeryFilterData()}
      {renderTimeToMove()}
      {renderTicketType()}
      {renderAirlines()}
      {renderFlightClass()}
    </div>
  );
};

export default FlightFilterBox;
