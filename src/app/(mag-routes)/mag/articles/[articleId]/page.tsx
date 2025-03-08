import ArticleContainer from "@/components/mag/article/ArticleContainer";
import React from "react";

export interface ArticlePageParamsType {
  params: {
    articleId: number;
  };
}

const ArticlePage = ({ params }: ArticlePageParamsType) => {
  return <ArticleContainer params={params} />;
};

export default ArticlePage;
