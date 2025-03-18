import { Skeleton } from "@mui/material";
import React from "react";

const CategoryArticlesProgress = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {Array.from(Array(5)).map((item, index) => (
        <div
          key={index}
          className="rounded-2xl bg-paper h-36 grid grid-cols-3 gap-3 overflow-hidden"
        >
          <div className="col-span-1 p-2">
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={"100%"}
              animation="wave"
              className="col-span-1 rounded-xl"
            />
          </div>
          <div className="grid grid-cols-1 gap-0 col-span-2 p-2">
            <Skeleton
              variant="text"
              width={"350px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"200px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"180px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"160px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"180px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"240px"}
              height={"20px"}
              animation="wave"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryArticlesProgress;
