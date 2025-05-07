"use client";
import { useGlobalContext } from "@/context/store";
import { Paper, TextField } from "@mui/material";
import React from "react";

const page = () => {
  // initial states
  const { config } = useGlobalContext().global;

  // handle render Ways of communication
  const renderWaysCommunication = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-8">
          <div className="grid grid-cols-1 gap-3">
            <span className="flex items-center justify-start text-text-main font-bold text-lg">
              چگونه میتوانیم به شما کمک کنیم؟
            </span>
            <span className="flex items-center justify-start text-text-main font-semibold text-sm">
              با ما در ارتباط باشید;تیم ما آماده پاسخگویی به سوالات و نیاز های
              شماست
            </span>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <span className="flex items-center justify-start text-primary-main font-semibold text-base">
              راه های ارتباطی
            </span>
            <div className="flex flex-col items-start justify-start gap-2">
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-sm font-semibold text-text-main">
                  ایمیل پشتیبانی
                </span>
                <span className="text-text-main font-semibold opacity-40 text-sm">
                  <a
                    href={`mailto:${config?.communicational.email}`}
                    className="text-xs font-semibold"
                  >
                    {config?.communicational.email}
                  </a>{" "}
                </span>
              </div>{" "}
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-sm font-semibold text-text-main">
                  تلفن پشتیبانی
                </span>
                <span className="text-text-main font-semibold opacity-40 text-sm">
                  <a
                    href={`tel:${config?.communicational.phone}`}
                    className="text-xs font-semibold"
                  >
                    {config?.communicational.phone.slice(0, 3) +
                      "-" +
                      config?.communicational.phone.slice(3)}
                  </a>{" "}
                </span>
              </div>{" "}
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-sm font-semibold text-text-main">
                  آدرس
                </span>
                <span className="text-text-main font-semibold opacity-40 text-sm">
                  {config?.communicational.address.fa}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const renderForm = () => {
    return (
      <>
        <Paper
          elevation={0}
          className="p-4 rounded-xl bg-main grid grid-cols-12 gap-4"
        >
          <span className="col-span-12 text-text-main font-bold text-lg flex items-center justify-start">
            تماس با ایرپلاس
          </span>
          <TextField
            className="col-span-7"
            label="نام و نام خانوادگی"
            size="small"
          />
          <TextField className="col-span-5" label="موضوع" size="small" />
          <TextField className="col-span-12" label="ایمیل" size="small" />
          <TextField
            className="col-span-12"
            label="توضیحات"
            size="small"
            multiline
            minRows={7}
            maxRows={7}
          />
        </Paper>{" "}
      </>
    );
  };
  return (
    <div className="grid grid-cols-12 gap-14">
      <div className="col-span-7">{renderWaysCommunication()}</div>
      <div className="col-span-5">{renderForm()}</div>
    </div>
  );
};

export default page;
