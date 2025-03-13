import React from "react";
import MagHeader from "./MagHeader";
import SubCategoryList from "./SubCategoryList";
import MostViewedPosts from "./MostViewedPosts";
import LatestPosts from "./LatestPosts";
import TravelNews from "./TravelNews";
import Travelogue from "./Travelogue";
import Services from "./Services";

const MagContainer = () => {
  return (
    <div className="container my-24 flex flex-col items-center justify-start gap-24">
      <MagHeader />
      <SubCategoryList />
      {/* <ArticleList /> */}
      <div className="w-full grid grid-cols-12 gap-7">
        <div className="col-span-9">
          <MostViewedPosts />
        </div>
        <div className="col-span-3">
          <LatestPosts />
        </div>
      </div>
      <TravelNews />
      <div className="w-full grid grid-cols-12 gap-7">
        <div className="col-span-9">
          <Travelogue />
        </div>
        <div className="col-span-3">
          <Services />
        </div>
      </div>
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
