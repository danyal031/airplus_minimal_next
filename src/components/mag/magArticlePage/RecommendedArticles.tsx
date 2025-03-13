"use client";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticleList } from "@/global-files/axioses";
import React, { useEffect, useState } from "react";

const RecommendedArticles = () => {
  // initial states
  const [articles, setArticles] = useState<ArticleDataTypes[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(true);

  //   handle get articles
  useEffect(() => {
    getArticleList()
      .then((res: any) => {
        if (res.status) {
          setArticles(res.data);
          setShowLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="bg-main p-3 rounded-2xl grid grid-cols-1 gap-4">
      <span className="flex items-center justify-center text-text-main font-bold text-base">
        راهنمای کشف زیبایی های ایران
      </span>
    </div>
  );
};

export default RecommendedArticles;
