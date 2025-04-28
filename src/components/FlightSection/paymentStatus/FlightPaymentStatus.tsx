"use client";
import { ShoppingCardPaymentStatusParamsType } from "@/app/services/shopping/[shoppingCardId]/gateway/return/[refId]/page";
import { getPaymentStatus } from "@/global-files/axioses";
import {
  applyMask,
  convertToPersianShortDate,
  formatInputWithCommas,
} from "@/global-files/function";
import { Alert, AlertTitle, Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const FlightPaymentStatus = ({
  params,
}: ShoppingCardPaymentStatusParamsType) => {
  // initial states
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [jsonData, setJsonData] = useState(
    JSON.parse(localStorage.getItem(params.shoppingCardId) as string)
  );
  const [helperText, setHelperText] = useState("درحال برسی...");
  const [statusCode, setStatusCode] = useState(0);
  const [slug, setSlug] = useState("");
  const [serial, setSerial] = useState("");
  const router = useRouter();
  // handle get payment status
  const handleGetPaymentStatus = async () => {
    try {
      const res: any = await getPaymentStatus(params.refId);

      if (res?.status === 202) {
        setStatusCode(1);
        setHelperText(res.data.error.message);
        timeoutRef.current = setTimeout(() => {
          handleGetPaymentStatus();
        }, 10000);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        console.log("Payment status updated:", res.data);
        if (res?.status === 200) {
          setStatusCode(3);
          setHelperText("خرید شما با موفقیت انجام شد.");
          setSlug(res.data.payload.reference.slug);
          setSerial(res.data.payload.reference.serial);
        }
      }
    } catch (error: any) {
      if (error.response.status === 400 || error.response.status === 404) {
        setHelperText(error.response.data.error.message);
        setStatusCode(2);
      }
    }
  };

  useEffect(() => {
    handleGetPaymentStatus();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 bg-paper rounded-2xl p-5">
      <Alert
        severity={
          statusCode === 0
            ? "info"
            : statusCode === 1
            ? "warning"
            : statusCode === 2
            ? "error"
            : "success"
        }
        className="rounded-2xl"
      >
        <AlertTitle>وضعیت پرداخت</AlertTitle>
        <div className="flex flex-col items-start justify-center gap-2">
          {helperText}{" "}
          {statusCode === 3 && (
            <div className="text-text-main flex items-center justify-start gap-1">
              <span className="text-sm">مبلغ پرداخت شده:</span>
              <span className="text-base font-bold">
                {formatInputWithCommas(jsonData.sum_sell_price / 10)} تومان
              </span>
            </div>
          )}
        </div>
      </Alert>
      <div className="grid grid-cols-1 gap-7">
        <div className="flex items-center justify-between">
          <span className="text-text-main text-base font-semibold">
            جزئیات بلیت ها
          </span>
          {statusCode === 3 && (
            <div className="flex items-center justify-center gap-1">
              <Button
                onClick={() => {
                  window.open(`https://mmah.ir/f/${slug}`);
                }}
                variant="outlined"
                size="medium"
              >
                جزئیات بلیت و واچر
              </Button>
              <Button
                onClick={() => {
                  window.open(
                    `https://erp.mehromah24.com/preview/contract/fa/${serial}`
                  );
                }}
                variant="outlined"
                size="medium"
              >
                مشاهده متن قرارداد{" "}
              </Button>
            </div>
          )}
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
