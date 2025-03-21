import React from "react";
import SubCategoryList from "./SubCategoryList";
import MostViewedPosts from "./MostViewedPosts";
import LatestPosts from "./LatestPosts";
import TravelNews from "./TravelNews";
import Travelogue from "./Travelogue";
import Services from "./Services";
import InterestingArticlesCover from "./InterestingArticlesCover";

const MagContainer = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-10">
      <InterestingArticlesCover />
      <SubCategoryList />
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
    </div>
  );
};

export default MagContainer;
