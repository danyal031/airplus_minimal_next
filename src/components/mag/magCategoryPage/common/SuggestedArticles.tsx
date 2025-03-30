"use client";
import MostViewedCategoryArticlesProgress from "@/components/Skelton-Components/mag/categoryPage/suggestedArticles/MostViewedCategoryArticlesProgress";
import OtherCategoryArticlesProgress from "@/components/Skelton-Components/mag/categoryPage/suggestedArticles/OtherCategoryArticlesProgress";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticleList } from "@/global-files/axioses";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import TitleDivider from "../../TitleDivider";

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

  // for render most viewed articles
  const renderMostViewedArticles = () => {
    return (
      <div className="bg-paper rounded-t-xl px-4 pt-4 hidden md:grid grid-cols-1 gap-3">
        <div className="mb-2">
          <TitleDivider label="پربازدیدترین" />
        </div>
        {mostViewedArticlesLoading ? (
          <MostViewedCategoryArticlesProgress />
        ) : mostViewedArticles.length === 0 ? (
          "موجود نیست"
        ) : (
          mostViewedArticles.map((item) => {
            return <MostViewedArticle key={item.id} article={item} />;
          })
        )}{" "}
        <div className="flex items-start justify-center">
          <span className="bg-gray-300 flex items-center justify-center text-sm text-primary-main font-bold px-5 rounded-tab-down-sm h-10">
            مشاهده همه{" "}
          </span>
        </div>
      </div>
    );
  };

  //   for render other articles
  const renderOtherArticles = () => {
    return (
      <>
        <div className="bg-paper md:bg-gray-300 rounded-2xl md:rounded-t-none px-4 pt-4 grid grid-cols-1 gap-3">
          <div className="mb-2">
            <TitleDivider label="راهنمای کشف زیبایی‌های ایران" />
          </div>
          {otherArticlesLoading ? (
            <OtherCategoryArticlesProgress />
          ) : otherArticles.length === 0 ? (
            "موجود نیست"
          ) : (
            otherArticles.map((item) => (
              <OtherArticle article={item} key={item.id} />
            ))
          )}
          <div className="flex items-start justify-center">
            <span className="bg-main flex items-center justify-center text-sm text-primary-main font-bold px-5 rounded-tab-down-sm h-10">
              مشاهده همه{" "}
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-0 sticky top-5">
      {renderMostViewedArticles()}
      {renderOtherArticles()}
    </div>
  );
};

export default SuggestedArticles;

interface MostViewedArticleProps {
  article: ArticleDataTypes;
}
const MostViewedArticle: FC<MostViewedArticleProps> = ({ article }) => {
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

interface OtherArticleProps {
  article: ArticleDataTypes;
}
const OtherArticle: FC<OtherArticleProps> = ({ article }) => {
  return (
    <>
      <div className="flex items-center justify-start gap-3">
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
        </div>
      </div>
    </>
  );
};
