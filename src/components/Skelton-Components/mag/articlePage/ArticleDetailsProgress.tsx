import { Skeleton } from "@mui/material";
import React from "react";

const ArticleDetailsProgress = () => {
  return (
    <div className="grid grid-cols-1 gap-3 p-3">
      <div className="flex items-center justify-start">
        <Skeleton variant="text" width={"100px"} height={"20px"} />
      </div>
      <Skeleton
        animation="wave"
        variant="rounded"
        width={"100%"}
        height={"200px"}
        className="rounded-lg"
      />
      <div className="flex flex-col items-start justify-start gap-2">
        <Skeleton variant="text" width={"400px"} height={"20px"} />
        <Skeleton variant="text" width={"360px"} height={"20px"} />
        <Skeleton variant="text" width={"350px"} height={"20px"} />
        <Skeleton variant="text" width={"420px"} height={"20px"} />
        <Skeleton variant="text" width={"400px"} height={"20px"} />
      </div>
    </div>
  );
};

export default ArticleDetailsProgress;
