"use client";
import React, { FC, Fragment, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";

import { useGlobalContext } from "@/context/store";
import DatePickerPopover from "./DatePickerPopover";

export interface FlightDateRangeInputProps {
  className?: string;
  fieldClassName?: string;
  showProgress?: boolean;
  setFromDate: (value: string | null) => void;
  setToDate: (value: string | null) => void;
  fromDate: string | null;
  toDate: string | null;
  forcedReturn: boolean;
}
const DatePickerComponent: FC<FlightDateRangeInputProps> = ({
  className = "",
  fieldClassName = "[ nc-hero-field-padding ]",
  showProgress = false,
  fromDate = null,
  toDate = null,
  setFromDate,
  setToDate,
  forcedReturn = false,
}) => {
  const [openDatePickerPopover, setOpenDatePickerPopover] = useState(false);
  // context states
  const { dropOffLocationType, setDropOffLocationType } =
    useGlobalContext().flightContext.searchContext;
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const anchor = event.currentTarget;
    const rect = anchor.getBoundingClientRect();
    const popoverHeight = 365; // ارتفاع تقریبی Popover
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < popoverHeight) {
      const offset = 120;
      const scrollAmount = popoverHeight - spaceBelow;
      window.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }

    setAnchorEl(anchor);
    setOpenDatePickerPopover(true);
  };

  return (
    <>
      <div
        className="flex items-center justify-center gap-2 px-2"
        onClick={(e: any) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        {" "}
        <DatePickerPopover
          open={openDatePickerPopover}
          setOpen={setOpenDatePickerPopover}
          dropOffLocationType={dropOffLocationType}
          setDropOffLocationType={setDropOffLocationType}
          setFromDate={setFromDate}
          setToDate={setToDate}
          forcedReturn={forcedReturn}
          anchorEl={anchorEl}
        />
        <TextField
          label={forcedReturn ? "تاریخ ورود" : "تاریخ رفت"}
          size="small"
          dir={fromDate ? "ltr" : "rtl"}
          className="w-full"
          id="outlined-basic"
          variant="outlined"
          value={fromDate ? fromDate : ""}
          onClick={(e: any) => {
            handlePopoverOpen(e);
          }}
          InputProps={{
            readOnly: true,
          }}
        />{" "}
        <TextField
          label={forcedReturn ? "تاریخ خروج" : "تاریخ برگشت"}
          size="small"
          dir={toDate ? "ltr" : "rtl"}
          className="w-full"
          id="outlined-basic"
          variant="outlined"
          value={toDate ? toDate : ""}
          onClick={(e: any) => {
            handlePopoverOpen(e);

            if (forcedReturn) {
            } else {
              if (dropOffLocationType === "oneWay") {
                setDropOffLocationType("roundTrip");
              }
            }
          }}
          InputProps={{
            readOnly: true,
            sx: {
              backgroundColor: !forcedReturn
                ? dropOffLocationType === "roundTrip"
                  ? "white"
                  : "#e0e0e0"
                : "white",
            },
            ...(toDate && !forcedReturn
              ? {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ ml: "-0.6rem" }}>
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          setDropOffLocationType("oneWay");
                          setToDate(null);
                        }}
                      >
                        <ClearIcon fontSize="small" className="text-gray-500" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : !forcedReturn
              ? {
                  endAdornment: (
                    <InputAdornment position="end" sx={{ mr: "-0.6rem" }}>
                      {dropOffLocationType === "roundTrip" ? (
                        <IconButton
                          onClick={(event) => {
                            event.stopPropagation();
                            setDropOffLocationType("oneWay");
                            setToDate(null);
                          }}
                        >
                          <ClearIcon
                            fontSize="small"
                            className="text-gray-500"
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={(e) => {
                            handlePopoverOpen(e);
                            setDropOffLocationType("roundTrip");
                          }}
                        >
                          <AddIcon fontSize="small" className="text-gray-500" />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }
              : {}),
          }}
        />
      </div>
    </>
  );
};

export default DatePickerComponent;
