"use client";
import {
  Box,
  Button,
  Drawer,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
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
import { useRouter, useSearchParams } from "next/navigation";
import { Route } from "next";
import ClearIcon from "@mui/icons-material/Clear";
const TicketsList = () => {
  // initial states
  const [filterTabValue, setFilterTabValue] = useState<string>("1");
  const {
    travelRoute,
    filteredSearchFlightResponseData,
    selectedWentFlight,
    selectedReturnFlight,
    setOpenFlightFilterDrawer,
  } = useGlobalContext().flightContext.searchContext;
  const {
    setFlightFilter,
    flightSelectedSortFiltered,
    setFlightSelectedSortFiltered,
  } = useGlobalContext().flightContext.flightFilterContext;
  const [openSortingDrawer, setOpenSortingDrawer] = useState<boolean>(false);

  // handle change open sorting drawer
  const toggleOpenSortingDrawer = (value: boolean) => {
    setOpenSortingDrawer(value);
  };

  // handle change of filter tab
  const handleFilterTabChange = (newValue: string) => {
    setFilterTabValue(newValue);
    if (newValue && newValue !== flightSelectedSortFiltered) {
      setFlightSelectedSortFiltered(newValue);
    }
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
                onClick={() => {
                  handleFilterTabChange(tab.id);
                }}
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

  // render on desktop
  const renderOnDesktop = () => {
    return (
      <>
        <div className="hidden md:grid grid-cols-1 gap-2">
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
                : filteredSearchFlightResponseData?.Return.map(
                    (item, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 100, opacity: 0 }} // Initial position (below the viewport) and opacity
                        animate={{ y: 0, opacity: 1 }} // Animation to move from bottom to top and fade in
                        transition={{ duration: 0.5, delay: index * 0.1 }} // Animation duration and delay for each item
                      >
                        <TicketCard key={index} data={item} index={index} />
                      </motion.div>
                    )
                  )}
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
      </>
    );
  };

  // render on mobile
  const renderOnMobile = () => {
    const drawerContent = (
      <>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-text-main text-base font-semibold">
              مرتب سازی
            </span>
            <IconButton
              size="small"
              onClick={() => toggleOpenSortingDrawer(false)}
            >
              <ClearIcon fontSize="small" className="text-text-main" />
            </IconButton>
          </div>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            className=""
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="پیشنهادی"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="ارزانترین"
            />
            <FormControlLabel
              value="fast"
              control={<Radio />}
              label="سریع ترین"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="دیرترین"
            />
          </RadioGroup>{" "}
        </div>
      </>
    );
    return (
      <>
        <div className="md:hidden grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between">
            <span className="text-text-main text-base font-semibold">
              لطفا بلیت خود را انتخاب کنید.
            </span>
            <div className="flex items-center justify-center gap-2">
              <span
                onClick={() => setOpenFlightFilterDrawer(true)}
                className="py-1 px-2 bg-paper text-primary-main rounded-lg"
              >
                فیلترها
              </span>
              <span
                onClick={() => toggleOpenSortingDrawer(true)}
                className="py-1 px-2 bg-paper text-primary-main rounded-lg"
              >
                مرتب سازی
              </span>
            </div>
          </div>
          <div className="bg-paper rounded-xl p-3">
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
                : filteredSearchFlightResponseData?.Return.map(
                    (item, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 100, opacity: 0 }} // Initial position (below the viewport) and opacity
                        animate={{ y: 0, opacity: 1 }} // Animation to move from bottom to top and fade in
                        transition={{ duration: 0.5, delay: index * 0.1 }} // Animation duration and delay for each item
                      >
                        <TicketCard key={index} data={item} index={index} />
                      </motion.div>
                    )
                  )}
            </div>
          </div>
        </div>
        <Drawer
          anchor={"bottom"}
          PaperProps={{
            sx: {
              padding: 2,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}
          open={openSortingDrawer}
          onClose={() => toggleOpenSortingDrawer(false)}
        >
          {drawerContent}
        </Drawer>{" "}
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

export default TicketsList;

export interface TicketCardProps {
  data: FlightTicketDataType;
  index: number;
}
const TicketCard: FC<TicketCardProps> = ({ data, index }) => {
  // initial states
  const [ticketTabValue, setTicketTabValue] = useState<"details" | "rules">(
    "details"
  );
  const [openDetailsDrawer, setOpenDetailsDrawer] = useState<boolean>(false);
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
  const searchParams = useSearchParams();

  // handle toggle ticket tab value
  const toggleTicketTabValue = (newValue: "details" | "rules") => {
    setTicketTabValue(newValue);
  };

  // handle toggle open details drawer
  const toggleOpenDetailsDrawer = (newValue: boolean) => {
    setOpenDetailsDrawer(newValue);
  };

  // handle choose ticket
  const createSearchparams = (
    wentTicket: FlightTicketDataType,
    returnTicket: FlightTicketDataType | false
  ) => {
    return {
      wentTicket: wentTicket,
      returnTicket: returnTicket,
      departureDate: searchParams.get("departure_date"),
      returningDate: searchParams.get("returning_date"),
    };
  };
  const handleChooseTicket = (
    data: FlightTicketDataType,
    classIndex: number = 0
  ) => {
    if (travelRoute === "oneWay") {
      setSelectedWentFlight(data);
      toggleOpenDetailsDrawer(false);
      const queryParams = createSearchparams(
        { ...data, Classes: data.Classes },
        false
      );
      const local_id = uuidv4().substr(0, 6);
      localStorage.setItem(local_id, JSON.stringify(queryParams));
      router.push(`/flight/checkout?factor=${local_id}` as Route);
    } else {
      if (!selectedWentFlight) {
        toggleOpenDetailsDrawer(false);
        setSelectedWentFlight(data);
        if (selectedReturnFlight) {
          const queryParams = createSearchparams(
            { ...data, Classes: data.Classes },
            selectedReturnFlight
          );
          const local_id = uuidv4().substr(0, 6);
          localStorage.setItem(local_id, JSON.stringify(queryParams));
          router.push(`/flight/checkout?factor=${local_id}` as Route);
        }
      } else {
        toggleOpenDetailsDrawer(false);
        setSelectedReturnFlight(data);
        const queryParams = createSearchparams(selectedWentFlight, {
          ...data,
          Classes: data.Classes,
        });
        const local_id = uuidv4().substr(0, 6);
        localStorage.setItem(local_id, JSON.stringify(queryParams));
        router.push(`/flight/checkout?factor=${local_id}` as Route);
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
              {data.Classes.Baggage.Adult.Trunk.TotalWeight &&
              data.Classes.Baggage.Adult.Trunk.Number ? (
                <Box className="flex gap-1">
                  <span>kg</span>
                  <span className="text-xs">
                    {`${data.Classes.Baggage.Adult.Trunk.TotalWeight}`}{" "}
                  </span>
                  <span>x</span>
                  <span>
                    {" "}
                    {`${data.Classes.Baggage.Adult.Trunk.Number}`}
                  </span>{" "}
                </Box>
              ) : (
                <span className="text-xs">نامشخص</span>
              )}
            </div>
            <div className="text-gray-400 text-xs">
              {data.Classes.Baggage.Child.Trunk.TotalWeight &&
              data.Classes.Baggage.Child.Trunk.Number ? (
                <Box className="flex gap-1">
                  <span>kg</span>
                  <span className="text-xs">
                    {`${data.Classes.Baggage.Child.Trunk.TotalWeight}`}{" "}
                  </span>
                  <span>x</span>
                  <span>
                    {" "}
                    {`${data.Classes.Baggage.Child.Trunk.Number}`}
                  </span>{" "}
                </Box>
              ) : (
                <span className="text-xs">نامشخص</span>
              )}
            </div>
            <div className="text-gray-400 text-xs">
              {" "}
              {data.Classes.Baggage.Infant.Trunk.TotalWeight &&
              data.Classes.Baggage.Infant.Trunk.Number ? (
                <Box className="flex gap-1">
                  <span>kg</span>
                  <span className="text-xs">
                    {`${data.Classes.Baggage.Infant.Trunk.TotalWeight}`}{" "}
                  </span>
                  <span>x</span>
                  <span>
                    {" "}
                    {`${data.Classes.Baggage.Infant.Trunk.Number}`}
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
                data.Classes.Financial.Adult.Payable / 10
              )}`}
            </div>
            <div className="text-gray-400 text-xs">
              {" "}
              {` ${formatInputWithCommas(
                data.Classes.Financial.Child.Payable / 10
              )}`}
            </div>
            <div className="text-gray-400 text-xs">
              {" "}
              {` ${formatInputWithCommas(
                data.Classes.Financial.Infant.Payable / 10
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
                {data.Classes.CabinType.title.fa}
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
              <div
                key={rule.id}
                className="grid grid-cols-1 gap-3 border border-dashed border-primary-main rounded-2xl p-3 min-w-36"
              >
                <span className="text-text-main text-xs font-semibold text-justify">
                  {rule.title}
                </span>
                <span className="flex items-center justify-center text-primary-main text-xs font-semibold">
                  {rule.penalty}
                </span>
              </div>
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

  // for desktop
  const renderOnDesktop = () => {
    return (
      <>
        <div
          className={`bg-main rounded-xl hidden md:grid grid-cols-4 gap-0 overflow-hidden px-2 ${
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
                  {data.Classes.CabinType.title.fa}
                </span>{" "}
                <span className="p-[2px] px-2 border border-primary-main text-primary-main text-xs rounded-full">
                  {data.FlightType == "Charter" ? "چارتری" : "سیستمی"}
                </span>
              </div>
            </div>
          </div>
          <div className="p-2 col-span-1 border-dashed border-r-2 border-paper flex flex-col items-center justify-center gap-2">
            <Button
              // disabled
              onClick={() => {
                handleChooseTicket(data, 0);
              }}
              variant="contained"
              size="small"
              className="rounded-lg min-w-28 text-sm"
            >
              {formatInputWithCommas(data.Classes.Financial.Adult.Payable / 10)}
              {/* امکان رزرو وجود ندارد */}
            </Button>
            <span className="text-xs font-semibold text-gray-400">
              {data.Classes.AvailableSeat} صندلی باقی مانده
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

  // for mobile
  // render info
  const renderTicketInfo = () => {
    return (
      <>
        {" "}
        <div className="w-full grid grid-cols-1 gap-2">
          {" "}
          <div className="p-4 py-6 border-b-2 border-paper border-dashed grid grid-cols-4 gap-5">
            <div className=""></div>
            <div className="text-text-main text-sm font-semibold flex justify-center">
              بزرگسال
            </div>
            <div className="text-text-main text-sm font-semibold flex justify-center">
              کودک
            </div>
            <div className="text-text-main text-sm font-semibold flex justify-center">
              نوزاد
            </div>
            <div className="text-text-main text-sm font-semibold flex justify-center">
              بارمجاز
            </div>
            <div className="text-gray-400 text-xs flex justify-center">
              {data.Classes.Baggage.Adult.Trunk.TotalWeight &&
              data.Classes.Baggage.Adult.Trunk.Number ? (
                <Box className="flex gap-1">
                  <span>kg</span>
                  <span className="text-xs">
                    {`${data.Classes.Baggage.Adult.Trunk.TotalWeight}`}{" "}
                  </span>
                  <span>x</span>
                  <span>
                    {" "}
                    {`${data.Classes.Baggage.Adult.Trunk.Number}`}
                  </span>{" "}
                </Box>
              ) : (
                <span className="text-xs">نامشخص</span>
              )}
            </div>
            <div className="text-gray-400 text-xs flex justify-center">
              {data.Classes.Baggage.Child.Trunk.TotalWeight &&
              data.Classes.Baggage.Child.Trunk.Number ? (
                <Box className="flex gap-1">
                  <span>kg</span>
                  <span className="text-xs">
                    {`${data.Classes.Baggage.Child.Trunk.TotalWeight}`}{" "}
                  </span>
                  <span>x</span>
                  <span>
                    {" "}
                    {`${data.Classes.Baggage.Child.Trunk.Number}`}
                  </span>{" "}
                </Box>
              ) : (
                <span className="text-xs">نامشخص</span>
              )}
            </div>
            <div className="text-gray-400 text-xs flex justify-center">
              {" "}
              {data.Classes.Baggage.Infant.Trunk.TotalWeight &&
              data.Classes.Baggage.Infant.Trunk.Number ? (
                <Box className="flex gap-1">
                  <span>kg</span>
                  <span className="text-xs">
                    {`${data.Classes.Baggage.Infant.Trunk.TotalWeight}`}{" "}
                  </span>
                  <span>x</span>
                  <span>
                    {" "}
                    {`${data.Classes.Baggage.Infant.Trunk.Number}`}
                  </span>{" "}
                </Box>
              ) : (
                <span className="text-xs">نامشخص</span>
              )}
            </div>
            <div className="text-text-main text-sm font-semibold flex justify-center">
              قیمت
            </div>
            <div className="text-gray-400 text-xs flex justify-center">
              {" "}
              {` ${formatInputWithCommas(
                data.Classes.Financial.Adult.Payable / 10
              )}`}
            </div>
            <div className="text-gray-400 text-xs flex justify-center">
              {" "}
              {` ${formatInputWithCommas(
                data.Classes.Financial.Child.Payable / 10
              )}`}
            </div>
            <div className="text-gray-400 text-xs flex justify-center">
              {" "}
              {` ${formatInputWithCommas(
                data.Classes.Financial.Infant.Payable / 10
              )}`}
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 gap-8">
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
                {data.Classes.CabinType.title.fa}
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
          </div>{" "}
        </div>
      </>
    );
  };

  // for render refund rules
  const renderRefundRules = () => {
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
    return (
      <>
        <div className="w-full overflow-y-auto flex flex-col items-center justify-start gap-3 px-2 py-5">
          {rules.map((rule) => {
            return (
              <div
                key={rule.id}
                className="flex items-center justify-between gap-5 border border-dashed border-primary-main rounded-2xl p-5 w-full"
              >
                <span className="text-text-main text-xs font-semibold text-justify truncate">
                  {rule.title}
                </span>
                <span className="flex items-center justify-center text-primary-main text-sm font-semibold">
                  {rule.penalty}
                </span>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  // for render ticket details
  const renderTicketDetails = () => {
    switch (ticketTabValue) {
      case "details":
        return renderTicketInfo();
      case "rules":
        return renderRefundRules();
    }
  };

  const renderOnMobile = () => {
    const drawerContent = (
      <>
        <div className="flex flex-col items-start justify-start gap-0 mb-24">
          <div className="grid grid-cols-1 gap-1 w-full p-5 pb-0 bg-paper">
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
            <div className="mt-1 grid grid-cols-2 gap-0">
              <span
                onClick={() => {
                  toggleTicketTabValue("details");
                }}
                className={`${
                  ticketTabValue === "details"
                    ? "bg-main text-primary-main"
                    : "bg-transparent text-text-main"
                } rounded-tab-down flex items-center justify-center text-sm font-semibold h-12`}
              >
                اطلاعات پرواز
              </span>
              <span
                onClick={() => {
                  toggleTicketTabValue("rules");
                }}
                className={`${
                  ticketTabValue === "rules"
                    ? "bg-main text-primary-main"
                    : "bg-transparent text-text-main"
                } rounded-tab-down flex items-center justify-center text-sm font-semibold h-12`}
              >
                قوانین استرداد
              </span>
            </div>
          </div>
          {renderTicketDetails()}
          <div className="py-4 px-3 bg-paper grid grid-cols-1 gap-4 fixed bottom-0 w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-main">مجموع قیمت</span>
              <span className="text-primary-main text-sm font-semibold">
                {formatInputWithCommas(
                  data.Classes.Financial.Adult.Payable / 10
                )}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                onClick={() => toggleOpenDetailsDrawer(false)}
                className="rounded-lg"
              >
                بازگشت
              </Button>
              <Button
                onClick={() => {
                  handleChooseTicket(data, 0);
                }}
                className="rounded-lg"
                variant="contained"
                size="medium"
                color="primary"
                // disabled
              >
                انتخاب بلیت وادامه
                {/* امکان رزرو وجود ندارد */}
              </Button>
            </div>
          </div>
        </div>
      </>
    );
    return (
      <>
        <div
          onClick={() => {
            toggleOpenDetailsDrawer(true);
          }}
          className={`bg-main rounded-xl md:hidden grid grid-cols-1 gap-0 overflow-hidden`}
        >
          <div className="p-2 border-b-2 border-paper grid grid-cols-4 gap-2">
            <div className="col-span-1 flex flex-col items-center justify-center gap-1">
              <span className="flex-shrink-0">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/airlines/${data.Airline.logo}`}
                  width={30}
                  height={30}
                  alt="air-logo"
                />
              </span>
              <span className="text-[10px] truncate font-bold">
                {data.Airline.title_fa}
              </span>
            </div>
            <div className="col-span-3 flex flex-col items-start justify-center gap-3">
              <div className="flex items-center justify-start gap-2">
                <span className="p-[2px] px-2 border border-text-main text-text-main text-xs rounded-full">
                  {data.Classes.CabinType.title.fa}
                </span>
                <span className="p-[2px] px-2 border border-text-main text-text-main text-xs rounded-full">
                  {data.FlightType == "Charter" ? "چارتری" : "سیستمی"}
                </span>
              </div>
              <div className="flex items-center justify-start gap-2 flex-1 flex-shrink-0 w-full">
                <span className="text-base text-primary-main font-bold flex-shrink-0">
                  {data.DepartureDateTime.split(" ")[1].split(":")[0] +
                    ":" +
                    data.DepartureDateTime.split(" ")[1].split(":")[1]}{" "}
                </span>
                <Image
                  src={leftArrow}
                  alt="left-arrow"
                  width={125}
                  height={1}
                  className="object-contain flex-shrink-0"
                />{" "}
                <span className="text-sm truncate text-text-main font-semibold">
                  {data.ArrivalDateTime
                    ? data.ArrivalDateTime.split(" ")[1].split(":")[0] +
                      ":" +
                      data.ArrivalDateTime.split(" ")[1].split(":")[1]
                    : "نامشخص"}{" "}
                </span>{" "}
              </div>
            </div>
          </div>
          <div className="p-2 flex items-center justify-between">
            <span className="text-gray-400 text-[10px] font-semibold">
              {data.Classes.AvailableSeat} صندلی باقی مانده
            </span>
            <span className="text-sm text-primary-main font-semibold">
              {formatInputWithCommas(data.Classes.Financial.Adult.Payable / 10)}
            </span>
          </div>
        </div>
        <Drawer
          anchor={"right"}
          PaperProps={{
            sx: {
              width: "100%",
              backgroundColor: "#EFEFEF",
              position: "relative",
            },
          }}
          open={openDetailsDrawer}
          onClose={() => {
            toggleOpenDetailsDrawer(false);
          }}
        >
          {drawerContent}
        </Drawer>{" "}
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
