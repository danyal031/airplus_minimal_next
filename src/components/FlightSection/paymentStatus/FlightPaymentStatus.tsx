import { ShoppingCardPaymentStatusParamsType } from "@/app/services/shopping/[shoppingCardId]/gateway/return/[refId]/page";
import {
  applyMask,
  convertToPersianShortDate,
  formatInputWithCommas,
} from "@/global-files/function";
import { Alert, AlertTitle, Button, Divider } from "@mui/material";
import React, { useState } from "react";

const FlightPaymentStatus = ({
  params,
}: ShoppingCardPaymentStatusParamsType) => {
  // initial states
  const [jsonData, setJsonData] = useState(
    JSON.parse(localStorage.getItem(params.shoppingCardId) as string)
  );
  console.log("jsonData", jsonData);

  return (
    <div className="grid grid-cols-1 gap-5 bg-paper rounded-2xl p-5">
      <Alert severity="success" className="rounded-2xl">
        <AlertTitle>وضعیت پرداخت</AlertTitle>
        <div className="flex flex-col items-start justify-center gap-2">
          خرید شما با موفقیت انجام شد،جزئیات خرید خود در لیست زیر قابل مشاهده
          میباشد.
          <div className="text-text-main flex items-center justify-start gap-1">
            <span className="text-sm">مبلغ پرداخت شده:</span>
            <span className="text-base font-bold">
              {formatInputWithCommas(jsonData.sum_sell_price / 10)} تومان
            </span>
          </div>
        </div>
      </Alert>
      <div className="grid grid-cols-1 gap-7">
        <div className="flex items-center justify-start">
          <span className="text-text-main text-base font-semibold">
            جزئیات بلیت ها
          </span>
        </div>
        {jsonData.data.map((item: any, index: number) => (
          <div key={index} className="grid grid-cols-5 gap-4">
            <div className="flex items-center justify-start gap-1">
              <span className="text-text-main text-sm">شماره پرواز:</span>
              <span className="text-text-main text-sm font-semibold">
                {item.online.FlightNumber}
              </span>
            </div>
            <div className="flex items-center justify-start gap-1">
              <span className="text-text-main text-sm">کلاس پرواز:</span>
              <span className="text-text-main text-sm font-semibold">
                {item.online.Classes.CabinType.title.fa}
              </span>
            </div>
            <div className="flex items-center justify-start gap-1">
              <span className="text-text-main text-sm">تاریخ پرواز:</span>
              <span className="text-text-main text-sm font-semibold">
                {convertToPersianShortDate(item.online.DepartureDateTime)}
              </span>
            </div>
            <div className="flex items-center justify-start gap-1">
              <span className="text-text-main text-sm">ساعت پرواز:</span>
              <span className="text-text-main text-sm font-semibold">
                {item.online.DepartureDateTime.split(" ")[1].split(":")[0] +
                  ":" +
                  item.online.DepartureDateTime.split(" ")[1].split(
                    ":"
                  )[1]}{" "}
              </span>
            </div>
            <div className="flex items-center justify-start gap-1">
              <span className="text-text-main text-sm">مبدا پرواز:</span>
              <span className="text-text-main text-sm font-semibold">
                {item.online.Origin.Iata.title_fa}
              </span>
            </div>
            <div className="flex items-center justify-start gap-1">
              <span className="text-text-main text-sm">مقصد پرواز:</span>
              <span className="text-text-main text-sm font-semibold">
                {item.online.Destination.Iata.title_fa}
              </span>
            </div>
            {index !== jsonData.data.length - 1 && (
              <div className="col-span-5 border border-dashed border-divider h-px"></div>
            )}{" "}
          </div>
        ))}
      </div>
      <Divider />
      <div className="grid grid-cols-1 gap-7">
        <div className="flex items-center justify-start">
          <span className="text-text-main text-base font-semibold">
            مسافران
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {jsonData.passengers.map((item: any, index: number) => (
            <div key={index} className="text-text-main grid grid-cols-5 gap-4">
              <div className="flex items-center justify-start gap-1">
                <span className="text-sm">نام:</span>
                <span className="text-sm font-semibold">{item.name_fa}</span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <span className="text-sm">نام خانوادگی:</span>
                <span className="text-sm font-semibold">
                  {item.lastname_fa}
                </span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <span className="text-sm">تاریخ تولد:</span>
                <span className="text-sm font-semibold">
                  {applyMask("date", item.birthday)}
                </span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <span className="text-sm">جنسیت:</span>
                <span className="text-sm font-semibold">
                  {item.sex === "male" ? "مرد" : "زن"}
                </span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <span className="text-sm">کد ملی:</span>
                <span className="text-sm font-semibold">
                  {item.national_code}
                </span>
              </div>{" "}
              <div className="flex items-center justify-start gap-1">
                <span className="text-sm">شماره موبایل:</span>
                <span className="text-sm font-semibold">{item.mobile}</span>
              </div>
              {index !== jsonData.passengers.length - 1 && (
                <div className="col-span-5 border border-dashed border-divider h-px"></div>
              )}{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightPaymentStatus;
