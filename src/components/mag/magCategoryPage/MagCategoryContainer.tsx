import React, { FC } from "react";
import ArticleList from "./common/ArticleList";
import SuggestedArticles from "./common/SuggestedArticles";

interface MagCategoryContainerProps {
  params: {
    categoryId: string[];
  };
}
const MagCategoryContainer: FC<MagCategoryContainerProps> = ({ params }) => {
  //  render on mobile
  const renderOnMobile = () => {
    return (
      <div className="md:hidden grid grid-cols-1 gap-3">
        <ArticleList params={params} />
        <SuggestedArticles params={params} />
      </div>
    );
  };

  // render on desktop
  const renderOnDesktop = () => {
    return (
      <div className="hidden md:grid grid-cols-12 gap-7 w-full">
        <div className="col-span-9">
          <ArticleList params={params} />
        </div>
        <div className="col-span-3 relative">
          <SuggestedArticles params={params} />
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

export default MagCategoryContainer;
