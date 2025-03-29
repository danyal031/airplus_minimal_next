import React from "react";
import SubCategoryList from "./common/SubCategoryList";
import InterestingArticlesCover from "./onDesktop/InterestingArticlesCover";
import Travelogue from "./onDesktop/Travelogue";
import MostViewedPosts from "./onDesktop/MostViewedPosts";
import LatestPosts from "./common/LatestPosts";
import TravelNews from "./common/TravelNews";
import Services from "./common/Services";
import InterestingArticlesCoverOnMobile from "./onMobile/InterestingArticlesCoverOnMobile";
import MainCategoryOnMobile from "./onMobile/MainCategoryOnMobile";
import MostViewedPostsOnMobile from "./onMobile/MostViewedPostsOnMobile";

const MagContainer = () => {
  // render on mobile
  const renderOnMobile = () => {
    return (
      <div className="md:hidden flex flex-col items-center justify-start gap-6">
        <MainCategoryOnMobile />
        <InterestingArticlesCoverOnMobile />
        <SubCategoryList />
        <MostViewedPostsOnMobile />
        <LatestPosts />
        <TravelNews />
        <Services />
        <Travelogue />
      </div>
    );
  };

  // render on desktop
  const renderOnDesktop = () => {
    return (
      <div className="hidden md:flex flex-col items-center justify-start gap-10">
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

  return (
    <>
      {renderOnDesktop()}
      {renderOnMobile()}
    </>
  );
};

export default MagContainer;
