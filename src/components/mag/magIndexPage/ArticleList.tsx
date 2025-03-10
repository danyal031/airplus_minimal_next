"use client";
import React, { useEffect, useState } from "react";
import TitleDivider from "../TitleDivider";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticleList } from "@/global-files/axioses";

const ArticleList = () => {
  // initial states
  const [latestArticles, setLatestArticles] = useState<ArticleDataTypes[]>([]);
  const [mostViewedArticles, setMostViewedArticles] = useState<
    ArticleDataTypes[]
  >([]);
  const [showLatestLoading, setShowLatestLoading] = useState<boolean>(true);
  const [showMostViewedLoading, setShowMostViewedLoading] =
    useState<boolean>(true);

  //   handle get latest articles & most viewed articles
  useEffect(() => {
    // get latest articles
    getArticleList()
      .then((res: any) => {
        if (res.status) {
          setLatestArticles(res.data);
          setShowLatestLoading(false);
        }
      })
      .catch((err) => {});

    // get most viewed articles
    getArticleList(false, true)
      .then((res: any) => {
        if (res.status) {
          setMostViewedArticles(res.data);
          setShowMostViewedLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  // for render most viewed
  const renderMostViewed = () => {
    return (
      <>
        <div className="flex flex-col items-center justify-start gap-4">
          <TitleDivider label="پربازدید ترین مقالات" />
          <div className="grid grid-cols-2 gap-2 w-full">
            {showMostViewedLoading
              ? "loading"
              : mostViewedArticles.length === 0
              ? "موجود نیست"
              : mostViewedArticles.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index === 0 || index === 3
                        ? "col-span-2 min-h-44"
                        : "col-span-1 min-h-56"
                    } flex items-center justify-center bg-main border-4 border-paper rounded-2xl`}
                  >
                    {item.title}
                  </div>
                ))}
          </div>
        </div>
      </>
    );
  };

  // for render latest posts
  const renderLatestPosts = () => {
    return (
      <>
        <div className="p-3 pb-0 grid grid-cols-1 gap-4 bg-paper rounded-2xl sticky top-20">
          <div>
            <TitleDivider label="آخرین مطالب" />
          </div>
          {showLatestLoading
            ? "loading"
            : latestArticles.length === 0
            ? "موجود نیست"
            : latestArticles.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
                  <div className="bg-gray-300 h-14 w-14 rounded-lg flex-shrink-0 flex items-center justify-center">
                    image
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <span className="flex items-center justify-start text-text-main font-semibold text-sm cursor-pointer hover:text-primary-main truncate">
                      title
                    </span>
                    <span className="flex items-center justify-start text-text-main text-xs truncate">
                      {item.summary}
                    </span>
                  </div>
                </div>
              ))}
          <div className="flex items-end justify-center">
            <span className="rounded-tab-down-sm bg-main flex items-center justify-center h-10 w-3/5 text-primary-main text-sm font-semibold cursor-pointer">
              مشاهده همه
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-full grid grid-cols-12 gap-7">
      <div className="col-span-9">{renderMostViewed()}</div>
      <div className="col-span-3">{renderLatestPosts()}</div>
    </div>
  );
};

export default ArticleList;
