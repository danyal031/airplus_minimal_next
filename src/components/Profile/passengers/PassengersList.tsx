"use client";
import { TextField, useTheme } from "@mui/material";
import React from "react";
import noDataImage from "../../../../public/assets/images/global/no-data-banner.svg";
import Image from "next/image";

const PassengersList = () => {
  // render search passenger box
  const renderSearchPassengerBox = () => {
    return (
      <>
        <div className="p-5 grid grid-cols-1 gap-2 rounded-2xl bg-main">
          <div className="flex items-center justify-start">
            <span className="text-primary-main font-bold text-sm">
              جستجوی مسافران
            </span>
          </div>
          <TextField
            autoComplete="off"
            size="small"
            placeholder="جستجوی نام،نام خانوادگی،کد ملی و شماره پاسپورت"
          />
        </div>
      </>
    );
  };

  //  render passenger list
  const renderPassengerList = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-0 border border-divider rounded-2xl">
          <div className="flex items-center justify-between py-3 px-5 border-b border-divider">
            <span className="text-primary-main text-sm font-bold">
              لیست مسافران
            </span>
            <span className="text-text-main text-sm font-semibold">
              افزودن مسافر
            </span>
          </div>
          <div className="px-5 py-3 min-h-96 flex items-center justify-center">
            <div className="text-text-main flex flex-col items-center justify-center gap-1">
              <Image alt="" src={noDataImage} width={250} height={250} />
              <span className="font-bold text-sm">
                لیست مسافران شما خالی است
              </span>
              <span className="text-xs">
                برای دسترسی سریع‌تر به اطلاعات مسافران هنگام خرید، آن‌ها را به
                لیست خود اضافه کنید.
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="bg-paper p-8 rounded-2xl w-full grid grid-cols-1 gap-3">
      {/* search passenger box */}
      {renderSearchPassengerBox()}

      {/* passenger list */}
      {renderPassengerList()}
    </div>
  );
};

export default PassengersList;
