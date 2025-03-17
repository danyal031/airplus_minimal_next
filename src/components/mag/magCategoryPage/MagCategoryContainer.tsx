import React, { FC } from "react";
import MagHeader from "../MagHeader";
import SuggestedArticles from "./SuggestedArticles";
import ArticleList from "./ArticleList";

interface MagCategoryContainerProps {
  params: {
    categoryId: string[];
  };
}
const MagCategoryContainer: FC<MagCategoryContainerProps> = ({ params }) => {
  return (
    <div className="container my-24 flex flex-col items-center justify-start gap-16">
      <MagHeader navBarClassName="rounded-2xl" />
      <div className="grid grid-cols-12 gap-7 w-full">
        <div className="col-span-9">
          <ArticleList params={params} />
        </div>
        <div className="col-span-3">
          <SuggestedArticles />
        </div>
      </div>
    </div>
  );
};

export default MagCategoryContainer;
