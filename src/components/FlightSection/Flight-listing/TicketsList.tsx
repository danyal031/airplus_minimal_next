"use client";
import { Box, Button } from "@mui/material";
import React, { FC, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import leftArrow from "/public/assets/images/flightSection/left-arrow.svg";
import Image from "next/image";
import airplaneDownArrow from "../../../../public/assets/images/flightSection/airplane-down-arrow.svg";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useGlobalContext } from "@/context/store";
import { motion } from "framer-motion";
import { FlightTicketDataType } from "@/DataTypes/flight/flightTicket";
import {
  calculateTimeDistance,
  convertToPersianDate,
  formatInputWithCommas,
} from "@/global-files/function";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Route } from "next";

const TicketsList = () => {
  // initial states
  const [filterTabValue, setFilterTabValue] = useState<string>("1");
  const {
    travelRoute,
    filteredSearchFlightResponseData,
    selectedWentFlight,
    selectedReturnFlight,
  } = useGlobalContext().flightContext.searchContext;
  // handle change of filter tab
  const handleFilterTabChange = (newValue: string) => {
    setFilterTabValue(newValue);
  };

  const renderFilterTab = () => {
    const filtersOptions = [
      { id: "1", label: "پیشنهادی" },
      { id: "2", label: "ارزانترین" },
      { id: "3", label: "گرانترین" },
      { id: "4", label: "زودترین" },
      { id: "5", label: "دیرترین" },
    ];
    return (
      <>
        <div className="w-full grid grid-cols-10 gap-0">
          {filtersOptions.map((tab) => {
            const isActive = filterTabValue === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => handleFilterTabChange(tab.id)}
                className={`truncate col-span-2 text-sm hover:cursor-pointer flex items-center justify-center font-semibold h-9 rounded-tab-up-sm ${
                  isActive
                    ? "bg-main text-primary-main"
                    : "bg-paper text-gray-400"
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

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex items-center justify-start">
        <span className="text-text-main text-base font-semibold">
          لطفا بلیت خود را انتخاب کنید.
        </span>
      </div>
      <div className="bg-paper rounded-xl px-5 pb-3 grid grid-cols-1 gap-3">
        <div className="flex items-center justify-start gap-3">
          <div className="flex items-center justify-center gap-1">
            <span className="text-text-main text-sm truncate font-semibold">
              مرتب سازی
            </span>
          </div>
          {renderFilterTab()}
        </div>
        <div className="grid grid-cols-1 gap-3">
          {travelRoute === "oneWay"
            ? filteredSearchFlightResponseData?.Went.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0 }} // Initial position (below the viewport) and opacity
                  animate={{ y: 0, opacity: 1 }} // Animation to move from bottom to top and fade in
                  transition={{ duration: 0.5, delay: index * 0.1 }} // Animation duration and delay for each item
                >
                  <TicketCard key={index} data={item} index={index} />
                </motion.div>
              ))
            : !selectedWentFlight
            ? filteredSearchFlightResponseData?.Went.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0 }} // Initial position (below the viewport) and opacity
                  animate={{ y: 0, opacity: 1 }} // Animation to move from bottom to top and fade in
                  transition={{ duration: 0.5, delay: index * 0.1 }} // Animation duration and delay for each item
                >
                  <TicketCard key={index} data={item} index={index} />
                </motion.div>
              ))
            : filteredSearchFlightResponseData?.Return.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0 }} // Initial position (below the viewport) and opacity
                  animate={{ y: 0, opacity: 1 }} // Animation to move from bottom to top and fade in
                  transition={{ duration: 0.5, delay: index * 0.1 }} // Animation duration and delay for each item
                >
                  <TicketCard key={index} data={item} index={index} />
                </motion.div>
              ))}
          {/* {tickets.map((ticket) => {
            return (
              <>
                <TicketCard />
              </>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default TicketsList;

export interface TicketCardProps {
  data: FlightTicketDataType;
  index: number;
}
const TicketCard: FC<TicketCardProps> = ({ data, index }) => {
  // initial states
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [typeDetailsTab, setTypeDetailsTab] = useState<string>("1");
  const {
    selectedWentFlight,
    selectedReturnFlight,
    setSelectedWentFlight,
    setSelectedReturnFlight,
    travelRoute,
  } = useGlobalContext().flightContext.searchContext;
  const router = useRouter();
  // handle choose ticket
  const createSearchparams = (
    wentTicket: FlightTicketDataType,
    returnTicket: FlightTicketDataType | false
  ) => {
    return {
      wentTicket: wentTicket,
      returnTicket: returnTicket,
    };
  };
  const handleChooseTicket = (
    data: FlightTicketDataType,
    classIndex: number = 0
  ) => {
    if (travelRoute === "oneWay") {
      if (Array.isArray(data.Classes)) {
        setSelectedWentFlight({ ...data, Classes: data.Classes[classIndex] });
        const queryParams = createSearchparams(
          { ...data, Classes: data.Classes[classIndex] },
          false
        );
        const local_id = uuidv4().substr(0, 6);
        localStorage.setItem(local_id, JSON.stringify(queryParams));
        router.push(`/flight/checkout?factor=${local_id}` as Route);
      }
    } else {
      if (!selectedWentFlight) {
        if (Array.isArray(data.Classes)) {
          setSelectedWentFlight({ ...data, Classes: data.Classes[classIndex] });
          if (selectedReturnFlight) {
            const queryParams = createSearchparams(
              { ...data, Classes: data.Classes[classIndex] },
              selectedReturnFlight
            );
            const local_id = uuidv4().substr(0, 6);
            localStorage.setItem(local_id, JSON.stringify(queryParams));
            router.push(`/flight/checkout?factor=${local_id}` as Route);
          }
        }
      } else {
        if (Array.isArray(data.Classes)) {
          setSelectedReturnFlight({
            ...data,
            Classes: data.Classes[classIndex],
          });
          const queryParams = createSearchparams(selectedWentFlight, data);
          const local_id = uuidv4().substr(0, 6);
          localStorage.setItem(local_id, JSON.stringify(queryParams));
          router.push(`/flight/checkout?factor=${local_id}` as Route);
        }
      }
    }
  };

  // handle change show details
  const handleChangeShowDetails = () => {
    setShowDetails(!showDetails);
  };

  // handle change type details tab
  const handleChangeTypeDetailsTab = (newValue: string) => {
    setTypeDetailsTab(newValue);
  };

  const renderDetails = () => {
    const flightDetails = (
      <>
        <div className="grid grid-cols-3 gap-0 w-full">
          <div className="p-2 col-span-2 border-l-2 border-paper border-dashed grid grid-cols-4 gap-2">
            <div className=""></div>
            <div className="text-text-main text-sm font-semibold">بزرگسال</div>
            <div className="text-text-main text-sm font-semibold">کودک</div>
            <div className="text-text-main text-sm font-semibold">نوزاد</div>
            <div className="text-text-main text-sm font-semibold">بارمجاز</div>
            <div className="text-gray-400 text-xs">
              {data.Classes[0].Baggage.Adult.Trunk.TotalWeight &&
              data.Classes[0].Baggage.Adult.Trunk.Number ? (
                <Box className="flex gap-1">
                  <span>kg</span>
                  <span className="text-xs">
                    {`${data.Classes[0].Baggage.Adult.Trunk.TotalWeight}`}{" "}
                  </span>
                  <span>x</span>
                  <span>
                    {" "}
                    {`${data.Classes[0].Baggage.Adult.Trunk.Number}`}
                  </span>{" "}
                </Box>
              ) : (
                <span className="text-xs">نامشخص</span>
              )}
            </div>
            <div className="text-gray-400 text-xs">
              {data.Classes[0].Baggage.Child.Trunk.TotalWeight &&
              data.Classes[0].Baggage.Child.Trunk.Number ? (
                <Box className="flex gap-1">
                  <span>kg</span>
                  <span className="text-xs">
                    {`${data.Classes[0].Baggage.Child.Trunk.TotalWeight}`}{" "}
                  </span>
                  <span>x</span>
                  <span>
                    {" "}
                    {`${data.Classes[0].Baggage.Child.Trunk.Number}`}
                  </span>{" "}
                </Box>
              ) : (
                <span className="text-xs">نامشخص</span>
              )}
            </div>
            <div className="text-gray-400 text-xs">
              {" "}
              {data.Classes[0].Baggage.Infant.Trunk.TotalWeight &&
              data.Classes[0].Baggage.Infant.Trunk.Number ? (
                <Box className="flex gap-1">
                  <span>kg</span>
                  <span className="text-xs">
                    {`${data.Classes[0].Baggage.Infant.Trunk.TotalWeight}`}{" "}
                  </span>
                  <span>x</span>
                  <span>
                    {" "}
                    {`${data.Classes[0].Baggage.Infant.Trunk.Number}`}
                  </span>{" "}
                </Box>
              ) : (
                <span className="text-xs">نامشخص</span>
              )}
            </div>
            <div className="text-text-main text-sm font-semibold">قیمت</div>
            <div className="text-gray-400 text-xs">
              {" "}
              {` ${formatInputWithCommas(
                data.Classes[0].Financial.Adult.Payable / 10
              )}`}
            </div>
            <div className="text-gray-400 text-xs">
              {" "}
              {` ${formatInputWithCommas(
                data.Classes[0].Financial.Child.Payable / 10
              )}`}
            </div>
            <div className="text-gray-400 text-xs">
              {" "}
              {` ${formatInputWithCommas(
                data.Classes[0].Financial.Infant.Payable / 10
              )}`}
            </div>
          </div>
          <div className="p-2 col-span-1 grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between">
              <span className="text-text-main text-sm font-semibold">
                شماره پرواز
              </span>
              <span className="text-gray-400 text-sm">{data.FlightNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-main text-sm font-semibold">
                کلاس کابین{" "}
              </span>
              <span className="text-gray-400 text-sm">
                {data.Classes[0].CabinType.title.fa}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-main text-sm font-semibold">
                نوع پرواز{" "}
              </span>
              <span className="text-gray-400 text-sm">
                {data.FlightType == "Charter" ? "چارتری" : "سیستمی"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-main text-sm font-semibold">
                مدل هواپیما{" "}
              </span>
              <span className="text-gray-400 text-sm">
                {data.Aircraft.iata}
              </span>
            </div>
          </div>
        </div>
      </>
    );

    const rules = [
      {
        id: 1,
        title: "استرداد تا قبل از ساعت ۱۲:۰۰ هفت روز قبل از پرواز",
        penalty: "۳۰  درصد جریمه",
      },
      {
        id: 2,
        title: "استرداد تا قبل از ساعت ۱۲:۰۰ هفت روز قبل از پرواز",
        penalty: "۳۰  درصد جریمه",
      },
      {
        id: 3,
        title: "استرداد تا قبل از ساعت ۱۲:۰۰ هفت روز قبل از پرواز",
        penalty: "۳۰  درصد جریمه",
      },
      {
        id: 4,
        title: "استرداد تا قبل از ساعت ۱۲:۰۰ هفت روز قبل از پرواز",
        penalty: "۳۰  درصد جریمه",
      },
      {
        id: 5,
        title: "استرداد تا قبل از ساعت ۱۲:۰۰ هفت روز قبل از پرواز",
        penalty: "۳۰  درصد جریمه",
      },
      {
        id: 6,
        title: "استرداد تا قبل از ساعت ۱۲:۰۰ هفت روز قبل از پرواز",
        penalty: "۳۰  درصد جریمه",
      },
      {
        id: 7,
        title: "استرداد تا قبل از ساعت ۱۲:۰۰ هفت روز قبل از پرواز",
        penalty: "۳۰  درصد جریمه",
      },
    ];

    const refundsRules = (
      <>
        <div className="w-full overflow-x-auto flex items-center justify-start gap-2 p-2">
          {rules.map((rule) => {
            return (
              <>
                <div className="grid grid-cols-1 gap-3 border border-dashed border-primary-main rounded-2xl p-3 min-w-36">
                  <span className="text-text-main text-xs font-semibold text-justify">
                    {rule.title}
                  </span>
                  <span className="flex items-center justify-center text-primary-main text-xs font-semibold">
                    {rule.penalty}
                  </span>
                </div>
              </>
            );
          })}
        </div>
      </>
    );

    const TypeDetailsOptions = [
      {
        id: "1",
        label: "اطلاعات پرواز",
      },
      {
        id: "2",
        label: "قوانین استرداد",
      },
    ];

    return (
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4 grid grid-cols-1 gap-1">
          <span className="text-text-main text-sm truncate font-semibold">
            فرودگاه {data.Origin.Iata.title_fa} {`(${data.Origin.Iata.iata})`}
          </span>
          <div className="grid grid-cols-1">
            <span className="text-gray-400 text-xs font-semibold">
              {convertToPersianDate(data.DepartureDateTime)}
            </span>
            <div className="flex items-center justify-start gap-2">
              {/* <Image
                  alt="airplane-Down-Arrow"
                  src={airplaneDownArrow}
                  width={20}
                  height={350}
                /> */}
              <div className="min-h-20 border-2 border-main border-dashed"></div>
              {data.ArrivalDateTime && (
                <span className="text-xs text-gray-400 border border-divider rounded-full p-1 px-2 flex items-center justify-center gap-1">
                  <AccessAlarmIcon className="text-sm" />
                  {
                    calculateTimeDistance(
                      data.DepartureDateTime,
                      data.ArrivalDateTime
                    ).hours
                  }{" "}
                  ساعت و{" "}
                  {
                    calculateTimeDistance(
                      data.DepartureDateTime,
                      data.ArrivalDateTime
                    ).minutes
                  }{" "}
                  دقیقه
                </span>
                // <span className="text-xs text-neutral-500">
                //   زمان تقریبی سفر{" "}
                //   {
                //     calculateTimeDistance(
                //       data.DepartureDateTime,
                //       data.ArrivalDateTime
                //     ).hours
                //   }{" "}
                //   ساعت و{" "}
                //   {
                //     calculateTimeDistance(
                //       data.DepartureDateTime,
                //       data.ArrivalDateTime
                //     ).minutes
                //   }{" "}
                //   دقیقه
                // </span>
              )}
            </div>
            <span className="text-gray-400 text-xs font-semibold">
              {data.ArrivalDateTime &&
                convertToPersianDate(data.ArrivalDateTime)}{" "}
            </span>
          </div>
          <span className="text-text-main text-sm truncate font-semibold">
            فرودگاه {data.Destination.Iata.title_fa}{" "}
            {`(${data.Destination.Iata.iata})`}
          </span>
        </div>
        <div className="col-span-8 bg-main rounded-xl flex flex-col items-start justify-start gap-0">
          <div className="flex items-center justify-start gap-0">
            {TypeDetailsOptions.map((tab) => {
              const isActive = typeDetailsTab === tab.id;
              return (
                <span
                  key={tab.id}
                  onClick={() => handleChangeTypeDetailsTab(tab.id)}
                  className={`truncate text-primary-main text-sm hover:cursor-pointer flex items-center justify-center font-semibold h-9 rounded-tab-up-sm ${
                    isActive ? "bg-paper" : "bg-main"
                  }`}
                >
                  {tab.label}
                </span>
              );
            })}
          </div>
          {typeDetailsTab === "1" ? flightDetails : refundsRules}
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        className={`bg-main rounded-xl grid grid-cols-4 gap-0 overflow-hidden px-2 ${
          showDetails ? "pb-2" : ""
        }`}
      >
        <div className="col-span-3 grid grid-cols-12 gap-0">
          <div className="col-span-2 flex items-center justify-center">
            <div className="p-1 flex flex-col items-center justify-center gap-1">
              <span className="flex-shrink-0">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/airlines/${data.Airline.logo}`}
                  width={38}
                  height={40}
                  className="w-10"
                  alt="air-logo"
                  sizes="40px"
                />
              </span>
              <span className="text-xs truncate font-bold">
                {data.Airline.title_fa}
              </span>
            </div>
          </div>
          <div className="col-span-10 flex flex-col items-start justify-between">
            <div className="flex items-center justify-start gap-2 min-h-12 flex-1 flex-shrink-0 w-full">
              <span className="text-base text-text-main font-semibold">
                {data.Origin.Iata.title_fa} {`(${data.Origin.Iata.iata})`}{" "}
              </span>
              <span className="text-lg text-primary-main font-bold">
                {data.DepartureDateTime.split(" ")[1].split(":")[0] +
                  ":" +
                  data.DepartureDateTime.split(" ")[1].split(":")[1]}{" "}
              </span>
              <Image
                src={leftArrow}
                alt="left-arrow"
                width={90}
                height={7}
                className="object-cover"
              />{" "}
              <span className="text-base text-text-main font-semibold">
                {data.ArrivalDateTime &&
                  data.ArrivalDateTime.split(" ")[1].split(":")[0] +
                    ":" +
                    data.ArrivalDateTime.split(" ")[1].split(":")[1]}{" "}
              </span>{" "}
              <span className="text-base text-text-main font-semibold">
                {data.Destination.Iata.title_fa}{" "}
                {`(${data.Destination.Iata.iata})`}
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-full">
              <span
                onClick={handleChangeShowDetails}
                className={`text-gray-400 hover:cursor-pointer rounded-tab-down-sm bg-paper flex items-center justify-center gap-1 font-semibold h-9 text-xs px-5`}
              >
                جزئیات بلیت{" "}
                {showDetails ? (
                  <KeyboardArrowUpIcon className="text-sm" />
                ) : (
                  <KeyboardArrowDownIcon className="text-sm" />
                )}
              </span>
              <span className="p-[2px] px-2 border border-primary-main text-primary-main text-xs rounded-full">
                {data.Classes[0].CabinType.title.fa}
              </span>{" "}
              <span className="p-[2px] px-2 border border-primary-main text-primary-main text-xs rounded-full">
                {data.FlightType == "Charter" ? "چارتری" : "سیستمی"}
              </span>
            </div>
          </div>
        </div>
        <div className="p-2 col-span-1 border-dashed border-r-2 border-paper flex flex-col items-center justify-center gap-2">
          <Button
            onClick={() => {
              handleChooseTicket(data, 0);
            }}
            variant="contained"
            size="small"
            className="rounded-lg min-w-28"
          >
            {Array.isArray(data.Classes) &&
              formatInputWithCommas(
                data.Classes[0].Financial.Adult.Payable / 10
              )}
          </Button>
          <span className="text-xs font-semibold text-gray-400">
            {data.Classes[0].AvailableSeat} صندلی باقی مانده
          </span>
        </div>

        {showDetails && (
          <div className="bg-paper rounded-lg p-4 col-span-4">
            {renderDetails()}
          </div>
        )}
      </div>
    </>
  );
};
