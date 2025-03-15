import { Skeleton } from "@mui/material";
import React from "react";

const TravelogueProgress = () => {
  return (
    <div className="w-full flex items-center justify-start gap-3 overflow-x-auto">
      {Array.from(Array(5)).map((item, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          width={150}
          height={150}
          className="rounded-xl flex-shrink-0"
          animation="wave"
        />
      ))}
    </div>
  );
};

export default TravelogueProgress;
