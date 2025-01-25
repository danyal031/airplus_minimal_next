import { Skeleton } from "@mui/material";
import React from "react";

const FlightSummarySearchSkelton = () => {
  return (
    <div className="fixed nc-header-bg z-10 cursor-pointer flex items-center justify-center gap-5 w-full border border-neutral-200 px-4 py-5 pr-11 shadow-lg">
      <div className="flex items-center gap-5">
        <span className="font-semibold text-sm text-slate-700">
          <Skeleton variant="text" width={"150px"} />
        </span>
      </div>
      <div className="flex items-center gap-5">
        <Skeleton variant="text" width={"75px"} />
      </div>
      <div className="flex items-center gap-5">
        <Skeleton variant="text" width={"75px"} />
        <div>
          <Skeleton variant="circular" width={"40px"} height={"40px"} />
        </div>
      </div>
    </div>
  );
};

export default FlightSummarySearchSkelton;
