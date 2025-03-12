"use client";
import React, { FC, useEffect, useState } from "react";
import TitleDivider from "../TitleDivider";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import Image from "next/image";
import { getArticleList } from "@/global-files/axioses";
import { Tooltip } from "@mui/material";

const TravelNews = () => {
  // initial states
  const [newsArticles, setNewsArticles] = useState<ArticleDataTypes[]>([]);
  const [showNewsLoading, setShowNewsLoading] = useState<boolean>(true);

  // get latest articles
  useEffect(() => {
    getArticleList()
      .then((res: any) => {
        if (res.status) {
          setNewsArticles(res.data);
          setShowNewsLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4">
      <TitleDivider label="اخبار سفر" />
      <div className="w-full flex items-center justify-start gap-2 overflow-x-hidden">
        {showNewsLoading
          ? "loading"
          : newsArticles.length === 0
          ? "موجود نیست"
          : newsArticles.map((item, index) => (
              <NewsArticle key={item.id} article={item} />
            ))}
      </div>
    </div>
  );
};

export default TravelNews;

interface NewsArticleProps {
  article: ArticleDataTypes;
}
const NewsArticle: FC<NewsArticleProps> = ({ article }) => {
  return (
    <>
      <div className="w-44 h-40 rounded-2xl border-2 hover:border-primary-main relative overflow-hidden">
        <Image
          src={process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + article.thumbnail}
          alt={article.title}
          fill
          className="object-cover object-center"
        />
        {/* <div className="px-2 pb-1 flex flex-col items-start justify-center gap-1 absolute bottom-0 bg-rose-500"> */}
        <div
          className="px-2 pb-3 flex flex-col items-start justify-center gap-1 absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/70 to-transparent  hover:from-primary-main hover:via-primary-main hover:to-transparent 
      transition-all duration-300"
        >
          <span
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
            className="text-paper text-[10px] font-semibold overflow-hidden w-full"
          >
            {article.title}
          </span>
          <Tooltip title={article.summary}>
            <span
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
              className="text-paper text-[10px] font-semibold overflow-hidden w-full"
            >
              {article.summary}
            </span>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
