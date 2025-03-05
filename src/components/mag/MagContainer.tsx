import React from "react";
import CategoriesPosts from "./article-list/CategoriesPosts";
import AmazingPosts from "./article-list/AmazingPosts";
import RecentPosts from "./article-list/RecentPosts";
import MostViewedPosts from "./article-list/MostViewedPosts";

const MagContainer = () => {
  return (
    <div className="container my-24 flex flex-col items-center justify-start gap-20">
      {/* <MagHeader /> */}
      {/* <LatestPosts /> */}
      <CategoriesPosts />
      <div className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-8 flex flex-col items-stretch justify-start gap-4">
          <AmazingPosts />
          <RecentPosts />
        </div>
        <div className="col-span-4">
          <MostViewedPosts />
        </div>
      </div>
    </div>
  );
};

export default MagContainer;
