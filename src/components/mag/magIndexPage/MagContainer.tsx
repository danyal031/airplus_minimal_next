import React from "react";
import MagHeader from "./MagHeader";

const MagContainer = () => {
  return (
    <div className="container my-24 flex flex-col items-center justify-start gap-24">
      <MagHeader />
      {/* <MagHeader /> */}
      {/* <LatestPosts /> */}
      {/* <CategoriesPosts />
      <div className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-8 flex flex-col items-stretch justify-start gap-4">
          <AmazingPosts />
          <RecentPosts />
        </div>
        <div className="col-span-4">
          <MostViewedPosts />
        </div>
      </div> */}
    </div>
  );
};

export default MagContainer;
