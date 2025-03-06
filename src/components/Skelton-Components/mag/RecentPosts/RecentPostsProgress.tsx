import { Skeleton } from "@mui/material";
import React from "react";

const RecentPostsProgress = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {Array.from(Array(2)).map((item, index) => (
        <div
          key={index}
          className="min-h-44 grid grid-cols-3 gap-3 overflow-hidden"
        >
          <Skeleton
            animation="wave"
            variant="rounded"
            width={"100%"}
            height={"100%"}
            className="rounded-lg"
          />
          <div className="col-span-2 flex flex-col items-start justify-between px-2 py-5">
            <div className="flex items-center justify-start gap-3">
              <Skeleton
                animation="wave"
                variant="circular"
                width={"25px"}
                height={"25px"}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={"70px"}
                height={"20px"}
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <Skeleton
                animation="wave"
                variant="text"
                width={150}
                height={"20px"}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={280}
                height={"20px"}
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <Skeleton
                animation="wave"
                variant="circular"
                width={"25px"}
                height={"25px"}
              />
              <Skeleton
                animation="wave"
                variant="circular"
                width={"25px"}
                height={"25px"}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentPostsProgress;
