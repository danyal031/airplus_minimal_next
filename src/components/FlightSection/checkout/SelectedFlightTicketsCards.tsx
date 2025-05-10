"use client";
import { useGlobalContext } from "@/context/store";
import { FlightTicketDataType } from "@/DataTypes/flight/flightTicket";
import {
  applyMask,
  calculateAgeCategory,
  convertPersianToEnglishNumbers,
  convertToPersianShortDate,
  formatInputWithCommas,
} from "@/global-files/function";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import leftArrow from "/public/assets/images/flightSection/left-arrow.svg";
import { motion } from "framer-motion";
import { Route } from "next";
import { Toman } from "@/components/icons/IconToman";

const SelectedFlightTicketsCards = () => {
  // initial states
  const {
    setSelectedWentFlight,
    setSelectedReturnFlight,
    selectedWentFlight,
    selectedReturnFlight,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    flightPassengers,
  } = useGlobalContext().flightContext.searchContext;
  const searchParams = useSearchParams();
  const router = useRouter();
  const factorNumber = searchParams.get("factor");
  //   handle initial selection of selected tickets
  useEffect(() => {
    setSelectedWentFlight(
      JSON.parse(localStorage.getItem(factorNumber as string) as string)
        .wentTicket as FlightTicketDataType
    );
    setSelectedReturnFlight(
      JSON.parse(
        localStorage.getItem(searchParams.get("factor") as string) as string
      ).returnTicket as FlightTicketDataType
    );
    setFromDate(
      JSON.parse(
        localStorage.getItem(searchParams.get("factor") as string) as string
      ).departureDate
    );
    setToDate(
      JSON.parse(
        localStorage.getItem(searchParams.get("factor") as string) as string
      ).returningDate
    );
    console.log(localStorage.getItem(factorNumber as string));
  }, [searchParams]);

  // handle handle Change Ticket
  const handleChangeTicket = () => {
    setSelectedReturnFlight(null);
    setSelectedWentFlight(null);
    const originIata = selectedWentFlight?.Origin.Iata.iata;
    const destinationIata = selectedWentFlight?.Destination.Iata.iata;
    const departureDate = fromDate as string;
    const returnDate = toDate as string;

    router.push(
      `/search/flights?origin=${originIata}&destination=${destinationIata}&departure_date=${convertPersianToEnglishNumbers(
        departureDate
      )}&returning_date=${
        returnDate
          ? convertPersianToEnglishNumbers(returnDate as string)
          : false
      }` as Route
    );
  };

  //   render went ticket
  const renderWentTicket = () => {
    const adultsWentTicketsPrice =
      selectedWentFlight && !Array.isArray(selectedWentFlight.Classes)
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "ADU"
          ).length *
            (selectedWentFlight.Classes.BaseData.Financial.Adult.Markup.final ??
              0)) /
          10
        : 0;
    const childWentTicketsPrice =
      selectedWentFlight && !Array.isArray(selectedWentFlight.Classes)
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "CHI"
          ).length *
            (selectedWentFlight.Classes.BaseData.Financial.Child.Markup.final ??
              0)) /
          10
        : 0;
    const infantWentTicketsPrice =
      selectedWentFlight && !Array.isArray(selectedWentFlight.Classes)
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "INF"
          ).length *
            (selectedWentFlight.Classes.BaseData.Financial.Infant.Markup
              .final ?? 0)) /
          10
        : 0;

    return (
      <>
        {selectedWentFlight && !Array.isArray(selectedWentFlight.Classes) && (
          <motion.div
            className="h-40 border-2 border-primary-main rounded-xl bg-paper grid grid-cols-3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="col-span-2 border-l border-dashed border-divider px-2 flex flex-col items-center justify-start gap-3">
              <div className="flex items-center justify-center gap-0">
                <span className="rounded-tab-up-sm h-9 flex items-center justify-center text-paper truncate bg-primary-main">
                  بلیت رفت
                </span>
                <span className="text-xs text-text-main font-semibold">
                  {convertToPersianShortDate(
                    selectedWentFlight.DepartureDateTime
                  )}
                </span>{" "}
              </div>
              <div className="flex items-center justify-start gap-2">
                <div className="p-1 flex flex-col items-center justify-center gap-1">
                  <span className="flex-shrink-0">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/airlines/${selectedWentFlight.Airline.logo}`}
                      width={38}
                      height={40}
                      className="w-10"
                      alt="air-logo"
                      sizes="40px"
                    />
                  </span>
                  <span className="text-xs truncate font-bold">
                    {selectedWentFlight.Airline.title_fa}
                  </span>
                </div>
                <span className="text-base text-primary-main font-bold">
                  {selectedWentFlight.DepartureDateTime.split(" ")[1].split(
                    ":"
                  )[0] +
                    ":" +
                    selectedWentFlight.DepartureDateTime.split(" ")[1].split(
                      ":"
                    )[1]}{" "}
                </span>{" "}
                <div className="flex items-center justify-start gap-2 min-h-12 flex-1 flex-shrink-0 w-full">
                  <span className="text-xs text-text-main font-semibold truncate">
                    {selectedWentFlight.Origin.Iata.title_fa}{" "}
                    {`(${selectedWentFlight.Origin.Iata.iata})`}{" "}
                  </span>
                  <Image
                    src={leftArrow}
                    alt="left-arrow"
                    width={40}
                    height={10}
                    className="object-cover"
                  />{" "}
                  <span className="text-xs text-text-main font-semibold truncate">
                    {selectedWentFlight.Destination.Iata.title_fa}{" "}
                    {`(${selectedWentFlight.Destination.Iata.iata})`}
                  </span>
                </div>{" "}
              </div>
            </div>
            <div className="col-span-1 p-2 grid grid-cols-1 gap-2">
              <div className="flex items-center justify-center">
                <Button
                  onClick={handleChangeTicket}
                  className="rounded-lg"
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  تغییر بلیت
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {flightPassengers.find(
                  (item) =>
                    calculateAgeCategory(
                      applyMask("date", item.birthday?.toString() as string)
                    ) === "ADU"
                ) && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 font-semibold">
                      بزرگسال(
                      {
                        flightPassengers.filter(
                          (element) =>
                            calculateAgeCategory(
                              applyMask(
                                "date",
                                element.birthday?.toString() as string
                              )
                            ) === "ADU"
                        ).length
                      }
                      )
                    </span>
                    <span className="text-xs text-gray-400 font-semibold flex items-center justify-center">
                      {formatInputWithCommas(adultsWentTicketsPrice)}{" "}
                      <Toman height={14} width={14} className="text-gray-400" />
                    </span>
                  </div>
                )}
                {flightPassengers.find(
                  (item) =>
                    calculateAgeCategory(
                      applyMask("date", item.birthday?.toString() as string)
                    ) === "CHI"
                ) && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 font-semibold">
                      کودک(
                      {
                        flightPassengers.filter(
                          (element) =>
                            calculateAgeCategory(
                              applyMask(
                                "date",
                                element.birthday?.toString() as string
                              )
                            ) === "CHI"
                        ).length
                      }
                      )
                    </span>
                    <span className="text-xs text-gray-400 font-semibold flex items-center justify-center">
                      {formatInputWithCommas(childWentTicketsPrice)}{" "}
                      <Toman height={14} width={14} className="text-gray-400" />
                    </span>
                  </div>
                )}
                {flightPassengers.find(
                  (item) =>
                    calculateAgeCategory(
                      applyMask("date", item.birthday?.toString() as string)
                    ) === "INF"
                ) && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 font-semibold">
                      نوزاد(
                      {
                        flightPassengers.filter(
                          (element) =>
                            calculateAgeCategory(
                              applyMask(
                                "date",
                                element.birthday?.toString() as string
                              )
                            ) === "INF"
                        ).length
                      }
                      )
                    </span>
                    <span className="text-xs text-gray-400 font-semibold flex items-center justify-center">
                      {formatInputWithCommas(infantWentTicketsPrice)}
                      <Toman height={14} width={14} className="text-gray-400" />
                    </span>
                  </div>
                )}
                <div className="text-primary-main font-semibold text-xs flex items-center justify-between">
                  <span className="">مجموع</span>
                  <span className="flex items-center justify-center">
                    {formatInputWithCommas(
                      adultsWentTicketsPrice +
                        childWentTicketsPrice +
                        infantWentTicketsPrice
                    )}{" "}
                    <Toman height={14} width={14} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </>
    );
  };
  //   render return ticket
  const renderReturnTicket = () => {
    const adultsReturnTicketsPrice =
      selectedReturnFlight && !Array.isArray(selectedReturnFlight.Classes)
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "ADU"
          ).length *
            (selectedReturnFlight.Classes.BaseData.Financial.Adult.Markup
              .final ?? 0)) /
          10
        : 0;
    const childReturnTicketsPrice =
      selectedReturnFlight && !Array.isArray(selectedReturnFlight.Classes)
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "CHI"
          ).length *
            (selectedReturnFlight.Classes.BaseData.Financial.Child.Markup
              .final ?? 0)) /
          10
        : 0;
    const infantReturnTicketsPrice =
      selectedReturnFlight && !Array.isArray(selectedReturnFlight.Classes)
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "INF"
          ).length *
            (selectedReturnFlight.Classes.BaseData.Financial.Infant.Markup
              .final ?? 0)) /
          10
        : 0;

    return (
      <>
        {selectedReturnFlight &&
          !Array.isArray(selectedReturnFlight.Classes) && (
            <motion.div
              className="h-40 border-2 border-primary-main rounded-xl bg-paper grid grid-cols-3"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="col-span-2 border-l border-dashed border-divider px-2 flex flex-col items-center justify-start gap-3">
                <div className="flex items-center justify-center gap-0">
                  <span className="rounded-tab-up-sm h-9 flex items-center justify-center text-paper truncate bg-primary-main">
                    بلیت برگشت
                  </span>
                  <span className="text-xs text-text-main font-semibold">
                    {convertToPersianShortDate(
                      selectedReturnFlight.DepartureDateTime
                    )}
                  </span>{" "}
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="p-1 flex flex-col items-center justify-center gap-1">
                    <span className="flex-shrink-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/airlines/${selectedReturnFlight.Airline.logo}`}
                        width={38}
                        height={40}
                        className="w-10"
                        alt="air-logo"
                        sizes="40px"
                      />
                    </span>
                    <span className="text-xs truncate font-bold">
                      {selectedReturnFlight.Airline.title_fa}
                    </span>
                  </div>
                  <span className="text-base text-primary-main font-bold">
                    {selectedReturnFlight.DepartureDateTime.split(" ")[1].split(
                      ":"
                    )[0] +
                      ":" +
                      selectedReturnFlight.DepartureDateTime.split(
                        " "
                      )[1].split(":")[1]}{" "}
                  </span>{" "}
                  <div className="flex items-center justify-start gap-2 min-h-12 flex-1 flex-shrink-0 w-full">
                    <span className="text-xs text-text-main font-semibold truncate">
                      {selectedReturnFlight.Origin.Iata.title_fa}{" "}
                      {`(${selectedReturnFlight.Origin.Iata.iata})`}{" "}
                    </span>
                    <Image
                      src={leftArrow}
                      alt="left-arrow"
                      width={40}
                      height={10}
                      className="object-cover"
                    />{" "}
                    <span className="text-xs text-text-main font-semibold truncate">
                      {selectedReturnFlight.Destination.Iata.title_fa}{" "}
                      {`(${selectedReturnFlight.Destination.Iata.iata})`}
                    </span>
                  </div>{" "}
                </div>
              </div>
              <div className="col-span-1 p-2 grid grid-cols-1 gap-2">
                <div className="flex items-center justify-center">
                  <Button
                    onClick={handleChangeTicket}
                    className="rounded-lg"
                    variant="outlined"
                    size="small"
                    color="primary"
                  >
                    تغییر بلیت
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {flightPassengers.find(
                    (item) =>
                      calculateAgeCategory(
                        applyMask("date", item.birthday?.toString() as string)
                      ) === "ADU"
                  ) && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 font-semibold">
                        بزرگسال(
                        {
                          flightPassengers.filter(
                            (element) =>
                              calculateAgeCategory(
                                applyMask(
                                  "date",
                                  element.birthday?.toString() as string
                                )
                              ) === "ADU"
                          ).length
                        }
                        )
                      </span>
                      <span className="text-xs text-gray-400 font-semibold flex items-center justify-center">
                        {formatInputWithCommas(adultsReturnTicketsPrice)}
                        <Toman
                          height={14}
                          width={14}
                          className="text-gray-400"
                        />
                      </span>
                    </div>
                  )}
                  {flightPassengers.find(
                    (item) =>
                      calculateAgeCategory(
                        applyMask("date", item.birthday?.toString() as string)
                      ) === "CHI"
                  ) && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 font-semibold">
                        کودک(
                        {
                          flightPassengers.filter(
                            (element) =>
                              calculateAgeCategory(
                                applyMask(
                                  "date",
                                  element.birthday?.toString() as string
                                )
                              ) === "CHI"
                          ).length
                        }
                        )
                      </span>
                      <span className="text-xs text-gray-400 font-semibold flex items-center justify-center">
                        {formatInputWithCommas(childReturnTicketsPrice)}
                        <Toman
                          height={14}
                          width={14}
                          className="text-gray-400"
                        />
                      </span>
                    </div>
                  )}
                  {flightPassengers.find(
                    (item) =>
                      calculateAgeCategory(
                        applyMask("date", item.birthday?.toString() as string)
                      ) === "INF"
                  ) && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 font-semibold">
                        نوزاد(
                        {
                          flightPassengers.filter(
                            (element) =>
                              calculateAgeCategory(
                                applyMask(
                                  "date",
                                  element.birthday?.toString() as string
                                )
                              ) === "INF"
                          ).length
                        }
                        )
                      </span>
                      <span className="text-xs text-gray-400 font-semibold flex items-center justify-center">
                        {formatInputWithCommas(infantReturnTicketsPrice)}
                        <Toman
                          height={14}
                          width={14}
                          className="text-gray-400"
                        />
                      </span>
                    </div>
                  )}
                  <div className="text-primary-main font-semibold text-xs flex items-center justify-between">
                    <span className="">مجموع</span>
                    <span className="flex items-center justify-center">
                      {formatInputWithCommas(
                        adultsReturnTicketsPrice +
                          childReturnTicketsPrice +
                          infantReturnTicketsPrice
                      )}{" "}
                      <Toman height={14} width={14} className="text-gray-400" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
      </>
    );
  };

  // for mobile
  const renderReturnTicketOnMobile = () => {
    return (
      <>
        {selectedReturnFlight &&
          !Array.isArray(selectedReturnFlight.Classes) && (
            <motion.div
              className="h-24 border-2 overflow-hidden border-primary-main rounded-xl bg-paper grid grid-cols-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {" "}
              <div className="col-span-3 px-2 flex flex-col items-center justify-start gap-1">
                <div className="flex items-center justify-center gap-0">
                  <span className="rounded-tab-up-sm text-xs px-3 h-8 flex items-center justify-center text-paper truncate bg-primary-main">
                    بلیت برگشت
                  </span>
                  <span className="text-xs text-text-main font-semibold">
                    {convertToPersianShortDate(
                      selectedReturnFlight.DepartureDateTime
                    )}
                  </span>{" "}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span className="flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/airlines/${selectedReturnFlight.Airline.logo}`}
                      width={38}
                      height={38}
                      className="w-8"
                      alt="air-logo"
                      // sizes="30px"
                    />
                  </span>
                  {/* <span className="text-xs truncate font-bold">
                      {selectedReturnFlight.Airline.title_fa}
                    </span> */}
                  <div className="col-span-3 flex items-center justify-start gap-2">
                    <span className="text-base text-primary-main font-bold">
                      {selectedReturnFlight.DepartureDateTime.split(
                        " "
                      )[1].split(":")[0] +
                        ":" +
                        selectedReturnFlight.DepartureDateTime.split(
                          " "
                        )[1].split(":")[1]}{" "}
                    </span>{" "}
                    <div className="flex items-center justify-start gap-2 min-h-12 flex-1 flex-shrink-0 w-full">
                      <span className="text-xs text-text-main font-semibold truncate">
                        {selectedReturnFlight.Origin.Iata.title_fa}
                      </span>
                      <Image
                        src={leftArrow}
                        alt="left-arrow"
                        width={40}
                        height={10}
                        className="object-cover"
                      />
                      <span className="text-xs text-text-main font-semibold truncate">
                        {selectedReturnFlight.Destination.Iata.title_fa}
                      </span>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="p-4 flex items-start justify-center">
                <Button
                  onClick={handleChangeTicket}
                  className="rounded-lg truncate"
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  تغییر بلیت
                </Button>
              </div>
            </motion.div>
          )}
      </>
    );
  };

  const renderWentTicketOnMobile = () => {
    return (
      <>
        {selectedWentFlight && !Array.isArray(selectedWentFlight.Classes) && (
          <motion.div
            className="h-24 border-2 overflow-hidden border-primary-main rounded-xl bg-paper grid grid-cols-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {" "}
            <div className="col-span-3 px-2 flex flex-col items-center justify-start gap-1">
              <div className="flex items-center justify-center gap-0">
                <span className="rounded-tab-up-sm h-8 px-3 flex items-center justify-center text-paper truncate bg-primary-main text-xs">
                  بلیت رفت
                </span>
                <span className="text-xs text-text-main font-semibold">
                  {convertToPersianShortDate(
                    selectedWentFlight.DepartureDateTime
                  )}
                </span>{" "}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span className="flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/airlines/${selectedWentFlight.Airline.logo}`}
                    width={38}
                    height={38}
                    className="w-8"
                    alt="air-logo"
                    // sizes="30px"
                  />
                </span>
                {/* <span className="text-[10px] truncate font-bold">
                    {selectedWentFlight.Airline.title_fa}
                  </span> */}
                <div className="col-span-3 flex items-center justify-start gap-2">
                  <span className="text-base text-primary-main font-bold">
                    {selectedWentFlight.DepartureDateTime.split(" ")[1].split(
                      ":"
                    )[0] +
                      ":" +
                      selectedWentFlight.DepartureDateTime.split(" ")[1].split(
                        ":"
                      )[1]}{" "}
                  </span>{" "}
                  <div className="flex items-center justify-start gap-2 min-h-12 flex-1 flex-shrink-0 w-full">
                    <span className="text-xs text-text-main font-semibold truncate">
                      {selectedWentFlight.Origin.Iata.title_fa}
                    </span>
                    <Image
                      src={leftArrow}
                      alt="left-arrow"
                      width={40}
                      height={10}
                      className="object-cover"
                    />{" "}
                    <span className="text-xs text-text-main font-semibold truncate">
                      {selectedWentFlight.Destination.Iata.title_fa}
                    </span>
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="p-4 flex items-start justify-center">
              <Button
                onClick={handleChangeTicket}
                className="rounded-lg truncate"
                variant="outlined"
                size="small"
                color="primary"
              >
                تغییر بلیت
              </Button>
            </div>
          </motion.div>
        )}
      </>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 md:px-0">
      <div className="md:block hidden">{renderWentTicket()}</div>
      <div className="md:block hidden">{renderReturnTicket()}</div>
      <div className="md:hidden">{renderWentTicketOnMobile()}</div>
      <div className="md:hidden">{renderReturnTicketOnMobile()}</div>
    </div>
  );
};

export default SelectedFlightTicketsCards;
