import { Skeleton } from "@mui/material";
import React from "react";

const FinancialListProgress = () => {
  const progressLength = Array.from(Array(7));
  return (
    <div className="w-full h-full grid grid-cols-12 gap-4 overflow-hidden overflow-y-auto">
      {progressLength.map((item) => (
        <>
          <div
            className="w-full h-16 rounded-2xl grid grid-cols-12 col-span-12 gap-4 bg-gray-200 px-7"
            key={item}
          >
            {" "}
            <Skeleton
              animation="wave"
              width={"100%"}
              height={28}
              className="col-span-2 md:col-span-1 rounded-lg self-center justify-self-center"
              variant="text"
            />{" "}
            <Skeleton
              animation="wave"
              width={"100%"}
              height={28}
              className="rounded-full col-span-4 md:col-span-2 self-center justify-self-center"
              variant="rectangular"
            />{" "}
            <Skeleton
              animation="wave"
              width={"100%"}
              height={28}
              className="rounded-full hidden col-span-1 md:flex self-center justify-self-center"
              variant="rectangular"
            />{" "}
            <Skeleton
              animation="wave"
              width={"100%"}
              height={28}
              className="col-span-4 rounded-lg self-center justify-self-center"
              variant="text"
            />{" "}
            <Skeleton
              animation="wave"
              width={"100%"}
              height={28}
              className="rounded-full md:flex col-span-1 self-center justify-self-center hidden"
              variant="rectangular"
            />{" "}
            <Skeleton
              animation="wave"
              width={"100%"}
              height={28}
              className="hidden md:flex col-span-2 rounded-lg self-center justify-self-center"
              variant="text"
            />{" "}
            <Skeleton
              animation="wave"
              width={"100%"}
              height={28}
              className="hidden md:flex col-span-1 rounded-lg self-center justify-self-center"
              variant="text"
            />{" "}
            <Skeleton
              animation="wave"
              width={28}
              height={28}
              className="col-span-2 md:hidden self-center justify-self-end"
              variant="circular"
            />{" "}
          </div>
        </>
      ))}
    </div>
  );
};

export default FinancialListProgress;
