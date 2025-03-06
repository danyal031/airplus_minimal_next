import { Skeleton } from "@mui/material";
import React from "react";

const CategoryListProgress = () => {
  return (
    <div className="grid grid-cols-5 gap-3 w-full">
      {Array.from(Array(10)).map((item, index) => {
        return (
          <Skeleton
            key={index}
            animation="wave"
            variant="rounded"
            width={"100%"}
            height={"90px"}
            className="rounded-xl"
          />
        );
      })}
    </div>
  );
};

export default CategoryListProgress;
