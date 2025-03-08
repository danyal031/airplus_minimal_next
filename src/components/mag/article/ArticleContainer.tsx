"use client";
import ArticleCategoryList from "@/components/Skelton-Components/mag/article/ArticleCategoryListProgress";
import ArticleProgress from "@/components/Skelton-Components/mag/article/ArticleProgress";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticle } from "@/global-files/axioses";
import { Divider, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import PublisherInformation from "../article-list/PublisherInformation";

export interface ArticlePageProps {
  params: {
    articleId: number;
  };
}
const ArticleContainer: FC<ArticlePageProps> = ({ params }) => {
  // initial states
  const [article, setArticle] = useState<ArticleDataTypes | null>(null);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const theme = useTheme();
  const router = useRouter();

  //  handle get article by id
  useEffect(() => {
    getArticle(params.articleId)
      .then((res: any) => {
        if (res.status) {
          setArticle(res.data);
          setShowLoading(false);
        }
      })
      .catch((err) => {});
  }, [params.articleId]);

  const renderArticle = () => {
    return (
      <>
        {showLoading ? (
          <ArticleProgress />
        ) : (
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">{article?.title}</span>
              <PublisherInformation
                className="text-text-main"
                date=" ۱۹ آذر ۱۴۰۳"
                image={article?.operator.avatar}
                name={article?.operator.fullname}
              />
            </div>
            <div className="col-span-1 overflow-hidden relative h-72 rounded-xl">
              <Image
                src={
                  process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + article?.thumbnail
                }
                alt=""
                fill
                objectFit="cover"
                //   className="object"
              />
            </div>
            <div
              className="text-justify leading-9"
              dangerouslySetInnerHTML={{ __html: article?.body }}
            ></div>
          </div>
        )}
      </>
    );
  };

  const renderCategories = () => {
    return (
      <>
        <div className="bg-gray-200 rounded-2xl p-3 grid grid-cols-1 gap-4 sticky top-24">
          <div className="flex items-center justify-start gap-1">
            <span className="text-text-main text-sm font-semibold flex-shrink-0">
              راهنمای کشف زیبایی ها
            </span>
            <div className="h-px w-full bg-primary-main"></div>
          </div>
          {showLoading ? (
            <ArticleCategoryList />
          ) : (
            article?.categories.map((item, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-start gap-2 text-text-main hover:text-primary-main"
                >
                  <div className="rounded-md aspect-video relative h-10 w-12 overflow-hidden">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + item.image
                      }
                      alt=""
                      fill
                      style={{ objectFit: "cover" }}
                      className="hover:scale-110 hover:cursor-pointer transition-transform duration-300"
                    />
                  </div>{" "}
                  <span className="text-sm font-semibold">{item.title}</span>
                </div>
              );
            })
          )}
        </div>
      </>
    );
  };

  return (
    <div className="container my-24 grid grid-cols-4 gap-7">
      <div className="col-span-3">{renderArticle()}</div>
      <div className="col-span-1">{renderCategories()}</div>
    </div>
  );
};

export default ArticleContainer;
