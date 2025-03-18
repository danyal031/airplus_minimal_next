import { Skeleton } from "@mui/material";
import React from "react";

const InterestingArticlesProgress = () => {
  return (
    <div className="grid grid-cols-3 gap-2 h-96">
      <div className="grid grid-cols-1 gap-2">
        <Skeleton
          animation="wave"
          variant="rounded"
          width={"100%"}
          height={"100%"}
          className="rounded-lg"
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={"100%"}
          height={"100%"}
          className="rounded-lg"
        />
      </div>
      <Skeleton
        animation="wave"
        variant="rounded"
        width={"100%"}
        height={"100%"}
        className="rounded-lg col-span-2"
      />
    </div>
  );
};

export default InterestingArticlesProgress;
