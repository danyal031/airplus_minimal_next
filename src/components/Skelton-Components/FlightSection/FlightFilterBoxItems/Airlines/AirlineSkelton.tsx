import { Skeleton } from "@mui/material";
import React from "react";

const AirlineSkelton = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {Array.from(Array(5)).map((item, index) => {
        return (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <Skeleton variant="circular" width={"25px"} height={"25px"} />
              <Skeleton variant="text" width={"100px"} height={"20px"} />
            </div>
            <Skeleton variant="circular" width={"28px"} height={"28px"} />
          </div>
        );
      })}
    </div>
  );
};

export default AirlineSkelton;
