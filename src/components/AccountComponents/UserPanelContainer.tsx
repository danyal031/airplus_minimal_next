"use client";
import { TextField } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const UserPanelContainer = () => {
  // initial states
  const [tabValue, setTabValue] = useState("1");

  // handle change tab
  const handleChangeTabValue = (id: string) => {
    setTabValue(id);
  };

  // handle render user panel banner
  const renderUserPanelBanner = () => {
    return (
      <>
        {" "}
        <div
          className="min-h-[220px] w-full"
          style={{
            position: "relative",
            width: "100%",
            backgroundImage: `url('/assets/images/userPanelBanner/user-panal-pattern.svg')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            overflow: "hidden", // Hide overflowing content
            backgroundPosition: "bottom center",
          }}
        ></div>
      </>
    );
  };

  // handle render tab
  const renderTab = () => {
    const tabs = [
      { id: "1", label: "کاربر ایرپلاس" },
      { id: "2", label: "سفر ها" },
      { id: "3", label: "نشان ها" },
      { id: "4", label: "پیام ها" },
      { id: "5", label: "مسافران" },
      { id: "6", label: "پشتیبانی" },
    ];

    return (
      <div
        className={`grid grid-cols-12 gap-0 bg-primary-main rounded-tab-down w-4/5 p-0 ${
          tabValue === "1" ? "border-r-paper" : "border-r-primary-main"
        } ${tabValue === "6" ? "border-l-paper" : "border-l-primary-main"}`}
      >
        {tabs.map((tab, index) => {
          // const isEven = index % 2 === 0;
          const isActive = tabValue === tab.id;
          return (
            <span
              key={tab.id}
              onClick={() => handleChangeTabValue(tab.id)}
              className={`text-paper hover:cursor-pointer truncate w-auto ${
                isActive ? "rounded-tab-down" : ""
              } col-span-2 flex items-center justify-center font-semibold h-12 ${
                tabValue === "1"
                  ? "border-r-0 rounded-r-none"
                  : tabValue === "6"
                  ? "border-l-0 rounded-l-none"
                  : ""
              }  ${tabValue === tab.id ? "bg-paper text-primary-main" : ""}`}
            >
              {tab.label}
            </span>
          );
        })}
      </div>
    );
  };

  //  handle render AdditionalDetails
  const renderAdditionalDetails = () => {
    return (
      <>
        <div className="bg-paper w-full rounded-xl p-5 grid grid-cols-1 gap-6">
          <div className="flex items-center justify-center">
            <span className="text-text-main font-semibold text-base">
              جزئیات تکمیلی
            </span>{" "}
          </div>
          <div className="grid grid-cols-12 gap-2">
            <TextField
              size="small"
              className="col-span-4"
              label="کد ملی"
              autoComplete="off"
            />
            <TextField
              size="small"
              className="col-span-2"
              label="جنسیت"
              autoComplete="off"
            />
            <TextField
              size="small"
              className="col-span-3"
              label="تاریخ تولد"
              autoComplete="off"
            />
            <TextField
              size="small"
              className="col-span-3"
              label="شهر محل تولد"
              autoComplete="off"
            />
          </div>
        </div>
      </>
    );
  };

  // handle render FinancialInformation
  const renderFinancialInformation = () => {
    return (
      <>
        <div className="bg-paper w-full rounded-xl p-5 grid grid-cols-1 gap-6">
          <div className="flex items-center justify-center">
            <span className="text-text-main font-semibold text-base">
              اطلاعات مالی{" "}
            </span>{" "}
          </div>
          <div className="grid grid-cols-12 gap-2">
            <TextField
              size="small"
              className="col-span-4"
              label="شماره شبا"
              autoComplete="off"
            />
            <TextField
              size="small"
              className="col-span-4"
              label="شماره کارت"
              autoComplete="off"
            />
            <TextField
              size="small"
              className="col-span-4"
              label="شماره حساب"
              autoComplete="off"
            />
          </div>
        </div>
      </>
    );
  };

  // handle render PassportDetails
  const renderPassportDetails = () => {
    return (
      <>
        <div className="bg-paper w-full rounded-xl p-5 grid grid-cols-1 gap-6">
          <div className="flex items-center justify-center">
            <span className="text-text-main font-semibold text-base">
              گذرنامه و مدارک{" "}
            </span>{" "}
          </div>
          <div className="grid grid-cols-12 gap-2">
            <TextField
              size="small"
              className="col-span-3"
              label="شماره گذرنامه"
              autoComplete="off"
            />
            <TextField
              size="small"
              className="col-span-3"
              label="ملیت"
              autoComplete="off"
            />
            <TextField
              size="small"
              className="col-span-3"
              label="کشور صادر کننده"
              autoComplete="off"
            />
            <TextField
              size="small"
              className="col-span-3"
              label="تاریخ انقضای گذرنامه"
              autoComplete="off"
            />
          </div>
        </div>
      </>
    );
  };

  // handle render UserAccountInformation
  const renderUserAccountInformation = () => {
    return (
      <>
        <div className="bg-paper w-full rounded-xl p-5 grid grid-cols-3 gap-6">
          <div className="relative col-span-3 bg-primary-main rounded-xl px-3 pt-px flex items-center justify-center gap-0">
            <Image
              alt=""
              src={"/assets/images/userPanelBanner/user-profile.svg"}
              width={70}
              height={70}
              className="absolute -right-4 object-cover rounded-full"
            />
            <div className="flex items-center justify-center flex-grow">
              <span className="text-paper text-sm font-semibold lg:-mr-6 xl:-mr-10">
                09138652899
              </span>
            </div>
            <div className="flex items-center justify-center flex-grow">
              <span className="text-text-main font-semibold text-base rounded-tab-down bg-paper h-10 px-10 flex items-center justify-center">
                اطلاعات حساب کاربری
              </span>
            </div>
            <div className="flex items-center justify-end flex-grow">
              <span className="text-paper text-sm font-semibold">
                ویرایش آواتار
              </span>
            </div>
          </div>
          <TextField
            label="نام و نام خانوادگی"
            size="small"
            autoComplete="off"
          />
          <TextField label="شماره تماس ضروری" size="small" autoComplete="off" />
          <TextField label="ایمیل" size="small" autoComplete="off" />
          <TextField
            size="small"
            label="آدرس محل زندگی"
            className="col-span-3"
            autoComplete="off"
          />
        </div>
      </>
    );
  };

  // handle render forms
  const renderForms = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-3 w-full">
          {renderUserAccountInformation()}
          {renderAdditionalDetails()}
          {renderPassportDetails()}
          {renderFinancialInformation()}
        </div>
      </>
    );
  };

  return (
    <div className="container flex flex-col items-center justify-start gap-0 w-4/5">
      {renderUserPanelBanner()}
      {renderTab()}
      {renderForms()}
      <span className="h-11 text-paper bg-primary-main rounded-tab-up flex items-center justify-center px-24">
        ذخیره
      </span>
    </div>
  );
};

export default UserPanelContainer;
