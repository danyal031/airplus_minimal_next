"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import moment from "jalali-moment";
import {
  applyMask,
  convertPersianToEnglishNumbers,
  formatInputWithCommas,
  removeMask,
} from "@/global-files/function";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ClearIcon from "@mui/icons-material/Clear";
import { TypeDropOffLocationType } from "@/DataTypes/flight/flightTicket";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "@/context/store";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface DatePickerPopoverDataType {
  open: boolean;
  setOpen: (value: boolean) => void;
  dropOffLocationType: TypeDropOffLocationType;
  setDropOffLocationType: (value: TypeDropOffLocationType) => void;
  setFromDate: (value: string | null) => void;
  setToDate: (value: string | null) => void;
  forcedReturn: boolean;
  anchorEl: any;
}

const DatePickerPopover: FC<DatePickerPopoverDataType> = ({
  open,
  setOpen,
  dropOffLocationType,
  setDropOffLocationType,
  setFromDate,
  setToDate,
  forcedReturn,
  anchorEl,
}) => {
  //  initial context
  const { toDate, fromDate } = useGlobalContext().flightContext.searchContext;
  const handleClose = () => {
    // setFirstSelectedDay(null);
    // setSecondSelectedDay(null);
    setOpen(false);
  };

  const handleConfirm = () => {
    firstSelectedDay && setFromDate(applyMask("date", firstSelectedDay));
    secondSelectedDay && setToDate(applyMask("date", secondSelectedDay));
    setOpen(false);
  };

  // handle clear selected date
  const clearSelectedDates = () => {
    setToDate(null);
    setFromDate(null);
    setFirstSelectedDay(null);
    setSecondSelectedDay(null);
  };

  const [fullCurrentDate, setFullCurrentDate] = useState<moment.Moment>(
    moment()
  );
  const [currentDate, setCurrentDate] = useState(
    removeMask(
      "date",
      convertPersianToEnglishNumbers(
        fullCurrentDate.toDate().toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      )
    )
  );

  const getMonth = (date: moment.Moment) => {
    const startOfMonth = moment
      .from(date.locale("fa").startOf("month"), "fa")
      .locale("en");
    const endOfMonth = date.locale("fa").endOf("month");
    const startDay = startOfMonth.locale("fa").weekday();
    const daysInMonth = endOfMonth.daysInMonth();
    return {
      year: startOfMonth.year(),
      month: startOfMonth.month() + 1,
      daysInMonth,
      startDay,
    };
  };

  const [currentMonths, setCurrentMonths] = useState([
    getMonth(fullCurrentDate),
    getMonth(fullCurrentDate.clone().add(1, "months")),
  ]);
  const [firstSelectedDay, setFirstSelectedDay] = useState<string | null>(null);
  const [secondSelectedDay, setSecondSelectedDay] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (firstSelectedDay) {
      setFromDate(applyMask("date", firstSelectedDay));
    }
    if (secondSelectedDay) {
      setToDate(applyMask("date", secondSelectedDay));
    } else {
      setToDate(null);
    }
  }, [firstSelectedDay, secondSelectedDay]);

  useEffect(() => {
    console.log("Selected days:", firstSelectedDay, secondSelectedDay);
  }, [firstSelectedDay, secondSelectedDay]);

  const changeMonth = (direction: string) => {
    setCurrentMonths(([first, second]) => {
      const newFirstDate = fullCurrentDate
        .clone()
        .year(first.year)
        .month(first.month - 1);

      const adjustedFirstDate =
        direction === "next"
          ? newFirstDate.add(1, "months")
          : newFirstDate.subtract(1, "months");

      const adjustedSecondDate = adjustedFirstDate.clone().add(1, "months");

      return [getMonth(adjustedFirstDate), getMonth(adjustedSecondDate)];
    });
  };

  const renderDays = (
    year: number,
    month: number,
    daysInMonth: number,
    startDay: number
  ) => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div className="w-full flex justify-center items-center">
          <div
            key={i}
            className={`flex flex-col items-center justify-center bg-purple-400`}
          ></div>
        </div>
      );
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dayId = `${year}${String(month).padStart(2, "0")}${String(
        i
      ).padStart(2, "0")}`;
      const isBetweenSelected =
        secondSelectedDay &&
        firstSelectedDay &&
        dayId > firstSelectedDay &&
        dayId < secondSelectedDay;
      const isFirstSelected = dayId === firstSelectedDay;
      const isSecondSelected = dayId === secondSelectedDay;

      days.push(
        <div className="w-full flex justify-center items-center">
          <div
            key={dayId}
            className={`aspect-square w-8 flex flex-col items-center justify-center rounded-xl border cursor-pointer transition-all duration-300 
              ${dayId < currentDate && "cursor-auto"} 
              ${
                dayId == currentDate &&
                " shadow-main-500 shadow-[inset_0_-2px_4px_rgba(162,20,65,1)]"
              } ${
              isFirstSelected
                ? "bg-primary-main text-paper"
                : isBetweenSelected
                ? "border border-primary-main text-primary-main"
                : isSecondSelected
                ? "bg-primary-main text-paper"
                : dayId < currentDate
                ? "opacity-50 border-main"
                : "bg-transparent hover:bg-primary-main hover:text-paper border-main"
            }`}
            onClick={() => {
              if (dayId >= currentDate) {
                if (!forcedReturn) {
                  if (
                    dropOffLocationType === "oneWay" ||
                    !firstSelectedDay ||
                    (firstSelectedDay && secondSelectedDay)
                  ) {
                    setFirstSelectedDay(dayId);
                    setSecondSelectedDay(null);
                  } else if (dayId > firstSelectedDay) {
                    setSecondSelectedDay(dayId);
                  }
                } else {
                  if (
                    !firstSelectedDay ||
                    (firstSelectedDay && secondSelectedDay)
                  ) {
                    setFirstSelectedDay(dayId);
                    setSecondSelectedDay(null);
                  } else if (dayId > firstSelectedDay) {
                    setSecondSelectedDay(dayId);
                  }
                }
              }
            }}
          >
            <span className="text-[10px] md:text-xs">{i}</span>
            {/* {i % 2 === 1 ? (
              <span
                className={`text-[6px] md:text-[10px] ${
                  isFirstSelected || isBetweenSelected || isSecondSelected
                    ? "text-white"
                    : "text-green-600"
                }`}
              >
                {formatInputWithCommas(Math.round(Math.random() * 10000))}
              </span>
            ) : i % 3 === 0 ? (
              <span
                className={`text-[6px] md:text-[10px] ${
                  isFirstSelected || isBetweenSelected || isSecondSelected
                    ? "text-white"
                    : "text-red-600"
                }`}
              >
                {formatInputWithCommas(Math.round(Math.random() * 10000))}
              </span>
            ) : (
              ""
            )} */}
          </div>
        </div>
      );
    }
    return days;
  };

  const renderInDesktop = () => {
    const popoverContent = (
      <>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center justify-center gap-2">
              <span className="text-primary-main font-semibold text-sm bg-main p-2 rounded-xl flex items-center justify-center gap-1">
                <CalendarMonthIcon fontSize="small" color="primary" />
                تقویم میلادی
              </span>
              <span className="text-primary-main font-semibold text-sm bg-main p-2 rounded-xl">
                امروز
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 min-w-[430px] max-w-[430px]">
              {" "}
              <TextField
                label={forcedReturn ? "تاریخ ورود" : "تاریخ رفت"}
                size="small"
                dir={fromDate ? "ltr" : "rtl"}
                className="w-full"
                id="outlined-basic"
                variant="outlined"
                value={fromDate ? fromDate : ""}
                // onClick={(e: any) => {
                // setOpenDatePickerPopover(true);
                // setAnchorEl(e.currentTarget);
                // }}
                InputProps={{
                  readOnly: true,
                }}
              />{" "}
              <TextField
                label={forcedReturn ? "تاریخ خروج" : "تاریخ برگشت"}
                size="small"
                dir={toDate ? "ltr" : "rtl"}
                className="w-full"
                id="outlined-basic"
                variant="outlined"
                value={toDate ? toDate : ""}
                // onClick={(e: any) => {
                //   if (forcedReturn) {
                //     setOpenDatePickerPopover(true);
                //     setAnchorEl(e.currentTarget);
                //   } else {
                //     if (dropOffLocationType === "oneWay") {
                //       setDropOffLocationType("roundTrip");
                //       setOpenDatePickerPopover(true);
                //       setAnchorEl(e.currentTarget);
                //     } else {
                //       setOpenDatePickerPopover(true);
                //       setAnchorEl(e.currentTarget);
                //     }
                //   }
                // }}
                InputProps={{
                  readOnly: true,
                  sx: {
                    backgroundColor: !forcedReturn
                      ? dropOffLocationType === "roundTrip"
                        ? "white"
                        : "#e0e0e0"
                      : "white",
                  },
                  ...(toDate && !forcedReturn
                    ? {
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ ml: "-0.6rem" }}
                          >
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                setDropOffLocationType("oneWay");
                                setSecondSelectedDay(null);
                              }}
                            >
                              <ClearIcon
                                fontSize="small"
                                className="text-gray-500"
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }
                    : !forcedReturn
                    ? {
                        endAdornment: (
                          <InputAdornment position="end" sx={{ mr: "-0.6rem" }}>
                            {dropOffLocationType === "roundTrip" ? (
                              <IconButton
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setDropOffLocationType("oneWay");
                                  setToDate(null);
                                }}
                              >
                                <ClearIcon
                                  fontSize="small"
                                  className="text-gray-500"
                                />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => {
                                  // setOpenDatePickerPopover(true);
                                  setDropOffLocationType("roundTrip");
                                  setSecondSelectedDay(null);
                                }}
                              >
                                <AddIcon
                                  fontSize="small"
                                  className="text-gray-500"
                                />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }
                    : {}),
                }}
              />
            </div>
          </div>
          <div className="p-1 grid grid-cols-2 gap-0 rounded-xl bg-main px-1">
            <div className="flex items-center justify-center relative">
              <div className="flex items-center justify-start absolute right-0">
                <IconButton size="small" onClick={() => changeMonth("prev")}>
                  <KeyboardArrowRightIcon color="primary" fontSize="small" />
                </IconButton>
              </div>
              <div className="w-full flex items-center justify-center">
                <span className="text-primary-main text-sm font-bold">
                  {monthNames[currentMonths[0].month - 1]}{" "}
                  {currentMonths[0].year}
                </span>
              </div>{" "}
            </div>
            <div className="flex items-center justify-center relative">
              <div className="w-full flex items-center justify-center">
                <span className="text-primary-main text-sm font-bold">
                  {monthNames[currentMonths[1].month - 1]}{" "}
                  {currentMonths[1].year}
                </span>
              </div>{" "}
              <div className="flex items-center justify-end justify-self-end absolute left-0">
                <IconButton size="small" onClick={() => changeMonth("next")}>
                  <KeyboardArrowLeftIcon color="primary" fontSize="small" />
                </IconButton>
              </div>{" "}
            </div>
          </div>
          {/* first month */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* first month */}
            <div className="">
              <div className="text-sm grid grid-cols-7 gap-1 text-center text-text-main font-bold">
                <div className="flex justify-center items-center">ش</div>
                <div className="flex justify-center items-center">ی</div>
                <div className="flex justify-center items-center">د</div>
                <div className="flex justify-center items-center">س</div>
                <div className="flex justify-center items-center">چ</div>
                <div className="flex justify-center items-center">پ</div>
                <div className="flex justify-center items-center">ج</div>
              </div>
              <div className="grid grid-cols-7 gap-2 mt-4">
                {renderDays(
                  currentMonths[0].year,
                  currentMonths[0].month,
                  currentMonths[0].daysInMonth,
                  currentMonths[0].startDay
                )}
              </div>
            </div>

            {/* second month */}
            <div className="">
              <div className="text-sm grid grid-cols-7 gap-1 text-center text-text-main font-bold">
                <div className="flex justify-center items-center">ش</div>
                <div className="flex justify-center items-center">ی</div>
                <div className="flex justify-center items-center">د</div>
                <div className="flex justify-center items-center">س</div>
                <div className="flex justify-center items-center">چ</div>
                <div className="flex justify-center items-center">پ</div>
                <div className="flex justify-center items-center">ج</div>
              </div>
              <div className="grid grid-cols-7 gap-2 mt-4">
                {renderDays(
                  currentMonths[1].year,
                  currentMonths[1].month,
                  currentMonths[1].daysInMonth,
                  currentMonths[1].startDay
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <span className="text-text-main font-semibold text-sm">
                {firstSelectedDay ? (
                  <>
                    رفت{" "}
                    <span className="text-primary-main font-bold">
                      {Number(firstSelectedDay.slice(6, 8))}
                    </span>{" "}
                    <span className="text-primary-main font-bold">
                      {monthNames[Number(firstSelectedDay.slice(4, 6)) - 1]}
                    </span>
                  </>
                ) : (
                  "تاریخی انتخاب نشده"
                )}
              </span>
              {secondSelectedDay && (
                <span className="text-text-main font-semibold text-sm">
                  برگشت{" "}
                  <span className="text-primary-main font-bold">
                    {Number(secondSelectedDay.slice(6, 8))}
                  </span>{" "}
                  <span className="text-primary-main font-bold">
                    {monthNames[Number(secondSelectedDay.slice(4, 6)) - 1]}
                  </span>
                </span>
              )}
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button
                onClick={clearSelectedDates}
                variant="contained"
                className="rounded-lg text-primary-main"
                color="inherit"
                size="small"
              >
                پاک کردن
              </Button>
              <Button
                disabled={
                  !forcedReturn
                    ? dropOffLocationType == "roundTrip"
                      ? secondSelectedDay
                        ? false
                        : true
                      : firstSelectedDay
                      ? false
                      : true
                    : secondSelectedDay
                    ? false
                    : true
                }
                onClick={handleConfirm}
                variant="contained"
                color="primary"
                size="small"
                className="rounded-lg"
              >
                تایید
              </Button>
            </div>
          </div>
        </div>
      </>
    );

    return (
      <>
        <Popover
          // disablePortal={true}
          anchorEl={anchorEl}
          onClose={handleClose}
          open={open}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            marginTop: "-4px",
          }}
          classes={{
            paper: "p-2 border-2 border-primary-main rounded-xl",
          }}
        >
          {popoverContent}
        </Popover>
      </>
    );
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const renderInMobile = () => (
    <Drawer
      anchor={"right"}
      PaperProps={{
        sx: { width: "100%" },
      }}
      open={open}
      onClose={toggleDrawer(false)}
    >
      <Box className="w-full" role="presentation">
        <Box className="flex justify-between items-center py-5 px-5">
          <span className="font-bold text-sm">انتخاب تاریخ</span>
          <IconButton onClick={toggleDrawer(false)}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider />

        <Box className="flex flex-col items-center justify-center py-5 px-5">
          <div className="w-full grid grid-cols-1 gap-2 mb-8">
            <div
              className={
                enableInputClass +
                "flex justify-between items-center gap-2 p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300"
              }
              style={{ boxShadow: "0 4px 15px rgba(173, 216, 230, 0.3)" }}
            >
              <span className="text-sm font-medium text-gray-700">
                {forcedReturn &&
                  (firstSelectedDay ? (
                    <span className="text-sm font-medium text-gray-700">
                      {applyMask("date", firstSelectedDay)}
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-gray-700">
                      تاریخ ورود
                    </span>
                  ))}
                {!forcedReturn &&
                  (firstSelectedDay ? (
                    <span className="text-sm font-medium text-gray-700">
                      {applyMask("date", firstSelectedDay)}
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-gray-700">
                      تاریخ رفت
                    </span>
                  ))}
              </span>
            </div>
            <div
              className={
                (dropOffLocationType == "roundTrip"
                  ? enableInputClass
                  : disableInputClass) +
                "flex justify-between items-center gap-2 p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300"
              }
              onClick={() => {
                setDropOffLocationType((preValue) => {
                  if (preValue == "roundTrip") return "oneWay";
                  return "roundTrip";
                });
                setSecondSelectedDay(null);
                setToDate(null);
              }}
              style={{ boxShadow: "0 4px 15px rgba(144, 238, 144, 0.3)" }}
            >
              {/* {secondSelectedDay ? (
                <span className="text-sm font-medium text-gray-700">
                  {applyMask("date", secondSelectedDay)}
                </span>
              ) : dropOffLocationType == "roundTrip" ? (
                <span className="text-sm font-medium text-gray-700">
                  تاریخ برگشت
                </span>
              ) : (
                <span className="text-sm font-medium text-gray-300">
                  تاریخ برگشت (کلیک کنید)
                </span>
              )} */}

              {forcedReturn &&
                (secondSelectedDay ? (
                  <span className="text-sm font-medium text-gray-700">
                    {applyMask("date", secondSelectedDay)}
                  </span>
                ) : (
                  <span className="text-sm font-medium text-gray-700">
                    تاریخ خروج
                  </span>
                ))}
              {!forcedReturn &&
                (secondSelectedDay ? (
                  <span className="text-sm font-medium text-gray-700">
                    {applyMask("date", secondSelectedDay)}
                  </span>
                ) : dropOffLocationType == "roundTrip" ? (
                  <span className="text-sm font-medium text-gray-700">
                    تاریخ برگشت
                  </span>
                ) : (
                  <span className="text-sm font-medium text-gray-300">
                    تاریخ برگشت (کلیک کنید)
                  </span>
                ))}
              {!forcedReturn &&
                (dropOffLocationType == "roundTrip" ? (
                  <HighlightOffIcon className="text-lg text-red-500" />
                ) : (
                  <AddCircleOutlineIcon className="text-lg text-green-500" />
                ))}
            </div>
          </div>
          <div className="flex justify-between items-center w-full  mb-8">
            <button
              onClick={() => changeMonth("prev")}
              className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300"
            >
              قبلی
            </button>

            <button
              onClick={() => changeMonth("next")}
              className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300"
            >
              بعدی
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            {/* first month */}
            <div className="w-full">
              <div className="flex justify-center items-center mb-4 text-xl font-bold">
                {monthNames[currentMonths[0].month - 1]} {currentMonths[0].year}
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-gray-700 font-semibold">
                <div className="flex justify-center items-center">ش</div>
                <div className="flex justify-center items-center">ی</div>
                <div className="flex justify-center items-center">د</div>
                <div className="flex justify-center items-center">س</div>
                <div className="flex justify-center items-center">چ</div>
                <div className="flex justify-center items-center">پ</div>
                <div className="flex justify-center items-center">ج</div>
              </div>
              <div className="grid grid-cols-7 gap-2 mt-4">
                {renderDays(
                  currentMonths[0].year,
                  currentMonths[0].month,
                  currentMonths[0].daysInMonth,
                  currentMonths[0].startDay
                )}
              </div>
            </div>

            {/* second month */}
            <div className="w-full">
              <div className="flex justify-center items-center mb-4 text-xl font-bold">
                {monthNames[currentMonths[1].month - 1]} {currentMonths[1].year}
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-gray-700 font-semibold">
                <div className="flex justify-center items-center">ش</div>
                <div className="flex justify-center items-center">ی</div>
                <div className="flex justify-center items-center">د</div>
                <div className="flex justify-center items-center">س</div>
                <div className="flex justify-center items-center">چ</div>
                <div className="flex justify-center items-center">پ</div>
                <div className="flex justify-center items-center">ج</div>
              </div>
              <div className="grid grid-cols-7 gap-2 mt-4">
                {renderDays(
                  currentMonths[1].year,
                  currentMonths[1].month,
                  currentMonths[1].daysInMonth,
                  currentMonths[1].startDay
                )}
              </div>
            </div>
          </div>
          <div
            className="w-full grid md:grid-cols-4 grid-cols-2 gap-2"
            dir="ltr"
          >
            <div>
              <Button
                disabled={
                  !forcedReturn
                    ? dropOffLocationType == "roundTrip"
                      ? secondSelectedDay
                        ? false
                        : true
                      : firstSelectedDay
                      ? false
                      : true
                    : secondSelectedDay
                    ? false
                    : true
                }
                className="w-full px-5 "
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleConfirm}
              >
                تایید
              </Button>
            </div>
            <div>
              <Button
                className="w-full px-5 "
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                انصراف
              </Button>
            </div>
          </div>
        </Box>
      </Box>
    </Drawer>
  );

  const isDesktop = useMediaQuery("(min-width:960px)");
  const isMobile = useMediaQuery("(max-width:959px)");

  return (
    <React.Fragment>
      {isDesktop && renderInDesktop()}
      {isMobile && renderInMobile()}
    </React.Fragment>
  );
};

export default DatePickerPopover;

const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const disableInputClass =
  "py-2 border flex justify-center items-center bg-gray-100 text-gray-500 cursor-pointer hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 md:rounded-l-md shadow-md hover:shadow-lg";
const enableInputClass = `py-2 border md:border-l-0 flex justify-center items-center bg-white text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors duration-200 md:rounded-r-md shadow-md hover:shadow-lg`;
