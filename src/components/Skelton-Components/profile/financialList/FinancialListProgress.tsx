import { Skeleton } from "@mui/material";
import React from "react";

interface FinancialListProgressProps {
  isLast: boolean;
}
const FinancialListProgress: React.FC<FinancialListProgressProps> = ({
  isLast,
}) => {
  return (
    <div
      className={`p-4 grid grid-cols-6 gap-2 ${
        !isLast ? "border-b border-divider" : ""
      }`}
    >
      <div className="flex items-center justify-center">
        <Skeleton
          animation="wave"
          width={90}
          height={26}
          className="rounded-lg"
          variant="text"
        />
      </div>
      <div className="flex items-center justify-center">
        <Skeleton
          animation="wave"
          width={90}
          height={26}
          className="rounded-lg"
          variant="text"
        />{" "}
      </div>
      <div className="flex items-center justify-center">
        <Skeleton
          animation="wave"
          width={95}
          height={47}
          className="rounded-xl"
          variant="text"
        />{" "}
      </div>
      <div className="flex items-center justify-center">
        <Skeleton
          animation="wave"
          width={90}
          height={26}
          className="rounded-lg"
          variant="text"
        />{" "}
      </div>
      <div className="flex items-center justify-center">
        <Skeleton
          animation="wave"
          width={95}
          height={47}
          variant="text"
          className="rounded-2xl"
        />{" "}
      </div>
      <div className="flex items-center justify-center">
        <Skeleton
          animation="wave"
          width={90}
          height={26}
          className="rounded-lg"
          variant="text"
        />{" "}
      </div>
    </div>
  );
};

export default FinancialListProgress;
