import { Skeleton } from "@mui/material";
import React from "react";

const CategoriesListProgress = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {Array.from(Array(8)).map((item, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          width={"100%"}
          height={"192px"}
          animation="wave"
          className="rounded-2xl"
        />
      ))}
    </div>
  );
};

export default CategoriesListProgress;
