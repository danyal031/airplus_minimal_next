import React, { FC } from "react";
import SuggestedArticles from "./SuggestedArticles";
import ArticleList from "./ArticleList";

interface MagCategoryContainerProps {
  params: {
    categoryId: string[];
  };
}
const MagCategoryContainer: FC<MagCategoryContainerProps> = ({ params }) => {
  return (
    <div className="grid grid-cols-12 gap-7 w-full">
      <div className="col-span-9">
        <ArticleList params={params} />
      </div>
      <div className="col-span-3 relative">
        <SuggestedArticles params={params} />
      </div>
    </div>
  );
};

export default MagCategoryContainer;
