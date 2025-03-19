import { Divider, Skeleton } from "@mui/material";
import React from "react";

const OrderListProgress = () => {
  const progressLength = Array.from(Array(9));

  return (
    <div className="w-full h-full grid grid-cols-12 gap-4 overflow-hidden overflow-y-auto">
      {progressLength.map((item, index) => (
        <div
          key={index}
          className="col-span-4 border border-divider rounded-2xl p-2 grid grid-cols-1 gap-3"
        >
          <div className="flex items-center justify-between">
            <Skeleton
              animation="wave"
              width={50}
              height={25}
              className="rounded-lg"
              variant="text"
            />{" "}
            <Skeleton
              variant="rounded"
              width={"80px"}
              height={"22px"}
              className="rounded-xl"
            />
          </div>
          <Divider variant="fullWidth" />
          <div className="flex items-center justify-between">
            <Skeleton
              animation="wave"
              width={70}
              height={25}
              className="rounded-lg"
              variant="text"
            />{" "}
            <Skeleton
              animation="wave"
              width={90}
              height={25}
              className="rounded-lg"
              variant="text"
            />
          </div>{" "}
          <div className="flex items-center justify-between">
            <Skeleton
              animation="wave"
              width={110}
              height={25}
              className="rounded-lg"
              variant="text"
            />{" "}
            <Skeleton
              animation="wave"
              width={50}
              height={25}
              className="rounded-lg"
              variant="text"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderListProgress;
