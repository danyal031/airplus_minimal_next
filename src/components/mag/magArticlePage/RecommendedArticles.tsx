"use client";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticleList } from "@/global-files/axioses";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";

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
    <div className="bg-main p-5 rounded-2xl grid grid-cols-1 gap-4">
      <span className="flex items-center justify-center text-text-main font-bold text-base">
        راهنمای کشف زیبایی های ایران
      </span>
      {showLoading ? (
        "loading"
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {articles.map((item, index) => (
            <Article key={item.id} article={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedArticles;

interface ArticleProps {
  article: ArticleDataTypes;
}
const Article: FC<ArticleProps> = ({ article }) => {
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
