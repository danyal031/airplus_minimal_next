"use client";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticleList } from "@/global-files/axioses";
import React, { useEffect, useState } from "react";
import ArticleComponent from "../ArticleComponent";
import TitleDivider from "../TitleDivider";

const MostViewedPosts = () => {
  // initial states
  const [mostViewedArticles, setMostViewedArticles] = useState<
    ArticleDataTypes[]
  >([]);
  const [showMostViewedLoading, setShowMostViewedLoading] =
    useState<boolean>(true);

  // handle get most viewed articles
  useEffect(() => {
    getArticleList(false, true)
      .then((res: any) => {
        if (res.status) {
          setMostViewedArticles(res.data);
          setShowMostViewedLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <TitleDivider label="پربازدید ترین مقالات" />
      <div className="grid grid-cols-2 gap-2 w-full">
        {showMostViewedLoading
          ? "loading"
          : mostViewedArticles.length === 0
          ? "موجود نیست"
          : mostViewedArticles.slice(0, 4).map((item, index) => (
              <div
                key={item.id}
                className={`${
                  index === 0 || index === 3 ? "col-span-2" : "col-span-1"
                } `}
              >
                <ArticleComponent
                  article={item}
                  typeRendering={
                    index === 0 || index === 3 ? "full-width" : "half-width"
                  }
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default MostViewedPosts;
