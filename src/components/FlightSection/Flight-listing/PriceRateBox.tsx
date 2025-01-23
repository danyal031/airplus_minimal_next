import { IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const PriceRateBox = () => {
  return (
    <div className="bg-paper rounded-xl grid grid-cols-2 gap-0">
      <div className="col-span-2">
        <DailyPrice />
      </div>{" "}
      <div className="col-span-1">
        <PriceRange />
      </div>
      <div className="col-span-1">
        <PriceFluctuations />
      </div>
    </div>
  );
};

export default PriceRateBox;

const DailyPrice = () => {
  const dates = [
    { id: 1, label: "یکشنبه", price: 1000 },
    { id: 2, label: "دوشنبه", price: 1200 },
    { id: 3, label: "سه‌شنبه", price: 1100 },
    { id: 4, label: "چهارشنبه", price: 1300 },
    { id: 5, label: "پنجشنبه", price: 1400 },
    { id: 6, label: "جمعه", price: 1500 },
    { id: 7, label: "شنبه", price: 1600 },
    // { id: 8, label: "پنجشنبه", price: 1600 },
    // { id: 9, label: "پنجشنبه", price: 1600 },
    // { id: 10, label: "شنبه", price: 1600 },
    // { id: 11, label: "شنبه", price: 1600 },
    // { id: 12, label: "پنجشنبه", price: 1600 },
    // { id: 13, label: "شنبه", price: 1600 },
    // { id: 14, label: "پنجشنبه", price: 1600 },
    // { id: 15, label: "شنبه", price: 1600 },
  ];

  return (
    <>
      <div className="border-b-2 border-main p-2 overflow-x-auto flex items-center justify-start gap-2">
        {dates.map((date) => (
          <div
            key={date.id}
            className="min-w-16 text-text-main hover:text-primary-main cursor-pointer rounded-lg border hover:border-primary-main border-divider p-1 flex flex-col items-center justify-center gap-1"
          >
            <span className="font-semibold text-sm">{date.label}</span>
            <span className="text-gray-400 text-xs">{date.price}</span>
          </div>
        ))}
      </div>
    </>
  );
};

const PriceFluctuations = () => {
  return (
    <>
      <div className="text-sm grid grid-cols-1 gap-3 p-2">
        {" "}
        <div
          className="flex items-center justify-between cursor-pointer"
          //   onClick={() => handleChangeFilterBoxSections("timeToMove")}
        >
          <span className="text-text-main font-semibold cursor-pointer">
            نوسانات قیمت{" "}
          </span>
          <IconButton size="small">
            {/* {openTimeToMove ? (
              <CloseIcon className="text-sm" />
            ) : (
              <KeyboardArrowDownIcon className="text-sm" />
            )} */}
            <KeyboardArrowDownIcon className="text-sm" />
          </IconButton>{" "}
        </div>
        {/* {openTimeToMove && (
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
        )} */}
      </div>
    </>
  );
};

const PriceRange = () => {
  return (
    <>
      <div className="text-sm grid grid-cols-1 gap-3 p-2 border-l-2 border-main">
        {" "}
        <div
          className="flex items-center justify-between cursor-pointer"
          //   onClick={() => handleChangeFilterBoxSections("timeToMove")}
        >
          <span className="text-text-main font-semibold cursor-pointer">
            بازه قیمت{" "}
          </span>
          <IconButton size="small">
            {/* {openTimeToMove ? (
              <CloseIcon className="text-sm" />
            ) : (
              <KeyboardArrowDownIcon className="text-sm" />
            )} */}
            <KeyboardArrowDownIcon className="text-sm" />
          </IconButton>{" "}
        </div>
        {/* {openTimeToMove && (
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
        )} */}
      </div>
    </>
  );
};
