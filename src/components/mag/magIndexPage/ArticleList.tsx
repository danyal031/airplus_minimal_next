"use client";
import React, { useEffect, useState } from "react";
import TitleDivider from "../TitleDivider";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";

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
  //   useEffect(() => {
  // get latest articles
  // get most viewed articles
  //   }, []);

  // for render most viewed
  const renderMostViewed = () => {
    return (
      <>
        <div className="flex flex-col items-center justify-start gap-4">
          <TitleDivider label="پربازدید ترین مقالات" />
          <div className="grid grid-cols-2 gap-2"></div>
        </div>
      </>
    );
  };

  // for render latest posts
  const renderLatestPosts = () => {
    return <></>;
  };

  return (
    <div className="w-full grid grid-cols-12 gap-7">
      <div className="col-span-9">{renderMostViewed()}</div>
      <div className="col-span-3">{renderLatestPosts()}</div>
    </div>
  );
};

export default ArticleList;
