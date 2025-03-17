"use client";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticleList } from "@/global-files/axioses";
import React, { FC, useEffect, useState } from "react";

interface SuggestedArticlesProps {
  params: {
    categoryId: string[];
  };
}
const SuggestedArticles: FC<SuggestedArticlesProps> = ({ params }) => {
  // initial states
  const [mostViewedArticles, setMostViewedArticles] = useState<
    ArticleDataTypes[]
  >([]);
  const [mostViewedArticlesLoading, setMostViewedArticlesLoading] =
    useState<boolean>(true);
  const [otherArticles, setOtherArticles] = useState<ArticleDataTypes[]>([]);
  const [otherArticlesLoading, setOtherArticlesLoading] =
    useState<boolean>(true);

  // handle get mostViewed Articles and other Articles
  useEffect(() => {
    const categoryId = Number(params.categoryId[0]);

    // get mostViewed Articles
    getArticleList(false, true, categoryId)
      .then((res: any) => {
        if (res.status) {
          setMostViewedArticles(res.data);
          setMostViewedArticlesLoading(false);
        }
      })
      .catch((err) => {});
    // get other Articles
    getArticleList()
      .then((res: any) => {
        if (res.status) {
          setOtherArticles(res.data);
          setOtherArticlesLoading(false);
        }
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="md:hidden grid grid-cols-1 gap-0">
      {/* {renderAboutTicketsSection()}
      {renderQuestions()} */}
    </div>
  );
};

export default SuggestedArticles;
