import { Skeleton } from "@mui/material";
import React from "react";

const MostViewedPostsProgress = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from(Array(4)).map((item, index) => (
        <>
          <div className="flex items-center justify-start gap-2" key={index}>
            <Skeleton
              animation="wave"
              variant="rounded"
              className="rounded-lg"
              width={50}
              height={50}
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <Skeleton
                animation="wave"
                variant="text"
                width={"70px"}
                height={"20px"}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={"110px"}
                height={"20px"}
              />
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default MostViewedPostsProgress;
