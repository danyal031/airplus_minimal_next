import { Skeleton } from "@mui/material";
import React from "react";

const CabinTypesSkelton = () => {
  return (
    <div className="flex items-center justify-start gap-3">
      <Skeleton
        variant="rounded"
        width={"80px"}
        height={"22px"}
        className="rounded-xl"
      />{" "}
      <Skeleton
        variant="rounded"
        width={"80px"}
        height={"22px"}
        className="rounded-xl"
      />
    </div>
  );
};

export default CabinTypesSkelton;
