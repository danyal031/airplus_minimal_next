"use client";
import { Button, TextField } from "@mui/material";
import React from "react";

const AccountContainer = () => {
  // render user account details
  const renderUserAccountDetails = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-start">
            <span className="text-primary-main font-bold text-sm">
              اطلاعات حساب کاربری
            </span>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <TextField
              label="نام و نام خانوادگی"
              size="small"
              autoComplete="off"
              className="col-span-4"
            />
            <TextField
              label="شماره تماس"
              size="small"
              autoComplete="off"
              className="col-span-4"
            />
            <TextField
              label="ایمیل"
              size="small"
              autoComplete="off"
              className="col-span-4"
            />
            <TextField
              label="آدرس"
              size="small"
              autoComplete="off"
              className="col-span-12"
            />
          </div>
        </div>
      </>
    );
  };

  //   render additional details
  const renderAdditionalDetails = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-start">
            <span className="text-primary-main font-bold text-sm">
              جزئیات تکمیلی
            </span>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <TextField
              label="کد ملی"
              size="small"
              autoComplete="off"
              className="col-span-4"
            />
            <TextField
              label="جنسیت"
              size="small"
              autoComplete="off"
              className="col-span-2"
            />
            <TextField
              label="تاریخ تولد"
              size="small"
              autoComplete="off"
              className="col-span-2"
            />
            <TextField
              label="شهر محل زندگی"
              size="small"
              autoComplete="off"
              className="col-span-4"
            />
          </div>
        </div>
      </>
    );
  };

  //  render passport details
  const renderPassportDetails = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-start">
            <span className="text-primary-main font-bold text-sm">
              گذرنامه و مدارک
            </span>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <TextField
              label="شماره گذرنامه"
              size="small"
              autoComplete="off"
              className="col-span-4"
            />
            <TextField
              label="ملیت"
              size="small"
              autoComplete="off"
              className="col-span-2"
            />
            <TextField
              label="کشور صادرکننده"
              size="small"
              autoComplete="off"
              className="col-span-2"
            />
            <TextField
              label="تاریخ انقضا گذرنامه"
              size="small"
              autoComplete="off"
              className="col-span-4"
            />
          </div>
        </div>
      </>
    );
  };

  // render renderFinancial details
  const renderFinancialDetails = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-start">
            <span className="text-primary-main font-bold text-sm">
              اطلاعات مالی
            </span>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <TextField
              label="شماره کارت"
              size="small"
              autoComplete="off"
              className="col-span-4"
            />
            <TextField
              label="شماره شبا"
              size="small"
              autoComplete="off"
              className="col-span-4"
            />
            <TextField
              label="شماره حساب"
              size="small"
              autoComplete="off"
              className="col-span-4"
            />
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="bg-paper p-8 rounded-2xl w-full grid grid-cols-1 gap-6">
      {/* render user account details */}
      {renderUserAccountDetails()}

      {/* render additional details */}
      {renderAdditionalDetails()}

      {/* render passport details */}
      {renderPassportDetails()}

      {/* render financial details */}
      {renderFinancialDetails()}

      {/* render submit button */}
      <div className="flex items-center justify-end">
        <Button
          variant="contained"
          color="primary"
          className="rounded-lg min-w-44"
        >
          ذخیره اطلاعات
        </Button>
      </div>
    </div>
  );
};

export default AccountContainer;
