"use client";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticleList } from "@/global-files/axioses";
import React, { FC, useEffect, useState } from "react";
import TitleDivider from "../TitleDivider";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import LatestArticlesProgress from "@/components/Skelton-Components/mag/indexPage/LatestArticlesProgress";

const LatestPosts = () => {
  // initial states
  const [latestArticles, setLatestArticles] = useState<ArticleDataTypes[]>([]);
  const [showLatestLoading, setShowLatestLoading] = useState<boolean>(true);

  // get latest articles
  useEffect(() => {
    getArticleList()
      .then((res: any) => {
        if (res.status) {
          setLatestArticles(res.data);
          setShowLatestLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="p-3 pb-0 grid grid-cols-1 gap-4 bg-paper rounded-2xl sticky top-20">
      <div>
        <TitleDivider label="آخرین مطالب" />
      </div>
      {showLatestLoading ? (
        <LatestArticlesProgress />
      ) : latestArticles.length === 0 ? (
        "موجود نیست"
      ) : (
        latestArticles.map((item, index) => (
          <Article article={item} key={item.id} />
        ))
      )}
      <div className="flex items-end justify-center">
        <span className="rounded-tab-down-sm bg-main flex items-center justify-center h-10 w-3/5 text-primary-main text-sm font-semibold cursor-pointer">
          مشاهده همه
        </span>
      </div>
    </div>
  );
};

export default LatestPosts;

interface ArticleProps {
  article: ArticleDataTypes;
}
const Article: FC<ArticleProps> = ({ article }) => {
  return (
    <>
      <div className="flex items-center justify-start gap-2">
        <div className="bg-gray-300 h-14 w-14 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden">
          <Image
            src={process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + article.thumbnail}
            alt={article.title}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-center justify-start gap-2 w-full overflow-hidden">
          <Link
            className="text-text-main font-semibold text-sm cursor-pointer hover:text-primary-main truncate w-full"
            href={"/mag/articles/" + article.id + "/" + article.slug}
            target="_blank"
          >
            {article.title}
          </Link>
          <Tooltip title={article.summary}>
            <span className="text-text-main text-xs truncate w-full">
              {article.summary}
            </span>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
