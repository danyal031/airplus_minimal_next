import { Button, TextField } from "@mui/material";
import React from "react";

const ResidenceSearchFormOnDesktop = () => {
  const renderRoundWayInput = () => {
    return (
      <>
        <TextField size="small" label="شهر یا هتل مقصد(داخلی و خارجی)" />
      </>
    );
  };
  const renderPassengerInput = () => {
    return (
      <>
        <TextField size="small" label="تعداد مسافر" />
      </>
    );
  };
  const renderDatePicker = () => {
    return (
      <>
        <div className="flex items-center justify-center gap-2">
          <TextField size="small" label="تاریخ ورود" />
          <TextField size="small" label="تاریخ خروج" />
        </div>
      </>
    );
  };
  const renderConfirmButton = () => {
    return (
      <>
        <Button
          variant="contained"
          size="small"
          className="w-full h-full rounded-lg"
        >
          جستجو
        </Button>
      </>
    );
  };
  return (
    <div className="bg-paper w-full rounded-xl p-5">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4">{renderRoundWayInput()}</div>
        <div className="col-span-2">{renderPassengerInput()}</div>
        <div className="col-span-4">{renderDatePicker()}</div>
        <div className="col-span-2">{renderConfirmButton()}</div>
      </div>
    </div>
  );
};

export default ResidenceSearchFormOnDesktop;
