import { Skeleton } from "@mui/material";
import React from "react";

const ArticleCategoryList = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {Array.from(Array(5)).map((item, index) => (
        <div key={index} className="flex items-center justify-start gap-2">
          <Skeleton
            animation="wave"
            variant="rounded"
            width={"64px"}
            height={"56px"}
            className="rounded-lg"
          />
          <Skeleton variant="text" width={"100px"} height={"20px"} />
        </div>
      ))}
    </div>
  );
};

export default ArticleCategoryList;
