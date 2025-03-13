import MagArticleContainer from "@/components/mag/magArticlePage/MagArticleContainer";
import React from "react";

export interface ArticlePageParamsType {
  params: {
    articleId: string[];
  };
}

const ArticlePage = ({ params }: ArticlePageParamsType) => {
  return (
    <>
      <MagArticleContainer params={params} />
    </>
  );
};

export default ArticlePage;
