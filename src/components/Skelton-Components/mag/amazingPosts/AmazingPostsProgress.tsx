import { Skeleton } from "@mui/material";
import React from "react";

const AmazingPostsProgress = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from(Array(2)).map((item, index) => (
        <div
          key={index}
          className="min-h-44 flex items-end justify-start bg-gray-200 p-3 rounded-lg"
        >
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-start gap-2">
              <Skeleton
                animation="wave"
                variant="rounded"
                width={"70px"}
                height={"16px"}
              />{" "}
              <Skeleton
                animation="wave"
                variant="rounded"
                width={"55px"}
                height={"16px"}
              />
            </div>
            <div className="flex items-center justify-start">
              <Skeleton
                animation="wave"
                variant="text"
                width={"45px"}
                height={"20px"}
              />
            </div>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default AmazingPostsProgress;
