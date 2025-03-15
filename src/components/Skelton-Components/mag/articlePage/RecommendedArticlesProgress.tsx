import { Skeleton } from "@mui/material";
import React from "react";

const RecommendedArticlesProgress = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {Array.from(Array(5)).map((item, index) => (
        <div key={index} className="flex items-center justify-start gap-2">
          <Skeleton
            variant="rounded"
            width={"50px"}
            height={"50px"}
            className="rounded-xl flex-shrink-0"
            animation="wave"
          />
          <Skeleton
            variant="text"
            width={"60%"}
            height={"20px"}
            animation="wave"
          />
        </div>
      ))}
    </div>
  );
};

export default RecommendedArticlesProgress;
