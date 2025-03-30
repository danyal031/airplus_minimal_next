"use client";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticleList } from "@/global-files/axioses";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import InterestingArticlesProgress from "@/components/Skelton-Components/mag/categoryPage/articleList/InterestingArticlesProgress";
import CategoryArticlesProgress from "@/components/Skelton-Components/mag/categoryPage/articleList/CategoryArticlesProgress";
import { Tooltip, useMediaQuery, useTheme } from "@mui/material";
import ArticleComponent from "../../ArticleComponent";
import Link from "next/link";

interface ArticleListProps {
  params: {
    categoryId: string[];
  };
}
const ArticleList: FC<ArticleListProps> = ({ params }) => {
  // initial states
  const [interestingArticles, setInterestingArticles] = useState<
    ArticleDataTypes[]
  >([]);
  const [interestingArticlesLoading, setInterestingArticlesLoading] =
    useState<boolean>(true);
  const [categoryArticles, setCategoryArticles] = useState<ArticleDataTypes[]>(
    []
  );
  const [categoryArticlesLoading, setCategoryArticlesLoading] =
    useState<boolean>(true);

  // for responsive
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // handle get interesting articles and category articles
  useEffect(() => {
    const categoryId = Number(params.categoryId[0]);

    // get interesting articles
    getArticleList(true, false, categoryId)
      .then((res: any) => {
        if (res.status) {
          setInterestingArticles(res.data);
          setInterestingArticlesLoading(false);
        }
      })
      .catch((err) => {});
    // get category articles
    getArticleList(false, false, categoryId)
      .then((res: any) => {
        if (res.status) {
          setCategoryArticles(res.data);
          setCategoryArticlesLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  // for render Interesting articles
  const renderInterestingArticles = () => {
    return (
      <>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
          {interestingArticlesLoading ? (
            <div className="col-span-3">
              <InterestingArticlesProgress />
            </div>
          ) : (
            <>
              <div className="col-span-1 flex flex-col items-center justify-start gap-2 h-60 md:h-96 w-full">
                <Link
                  target="_blank"
                  href={
                    "/mag/articles/" +
                    interestingArticles[0].id +
                    "/" +
                    interestingArticles[0].slug
                  }
                  className="w-full h-full md:h-2/5 relative rounded-2xl overflow-hidden"
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_MEDIA_URL_1 +
                      "/" +
                      interestingArticles[0].thumbnail
                    }
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`py-2 px-3 h-1/3 flex flex-col items-center justify-end gap-0 absolute bottom-0 w-full bg-gradient-to-t from-black/80  to-transparent transition-all duration-500 ease-in-out`}
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
                      {interestingArticles[0].title}
                    </span>
                    <Tooltip title={interestingArticles[0].summary}>
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
                        {interestingArticles[0].summary}
                      </span>
                    </Tooltip>
                  </div>
                </Link>
                <Link
                  target="_blank"
                  href={
                    "/mag/articles/" +
                    interestingArticles[1].id +
                    "/" +
                    interestingArticles[1].slug
                  }
                  className="w-full h-full md:h-3/5 relative rounded-2xl overflow-hidden"
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_MEDIA_URL_1 +
                      "/" +
                      interestingArticles[1].thumbnail
                    }
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`py-2 px-3 h-1/3 flex flex-col items-center justify-end gap-0 absolute bottom-0 w-full bg-gradient-to-t from-black/80  to-transparent transition-all duration-500 ease-in-out`}
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
                      {interestingArticles[1].title}
                    </span>
                    <Tooltip title={interestingArticles[1].summary}>
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
                        {interestingArticles[1].summary}
                      </span>
                    </Tooltip>
                  </div>
                </Link>
              </div>
              <Link
                target="_blank"
                href={
                  "/mag/articles/" +
                  interestingArticles[2].id +
                  "/" +
                  interestingArticles[2].slug
                }
                className="col-span-1 md:col-span-2 relative rounded-2xl overflow-hidden"
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_MEDIA_URL_1 +
                    "/" +
                    interestingArticles[2].thumbnail
                  }
                  alt=""
                  fill
                  className="object-cover"
                />{" "}
                <div
                  className={`py-2 px-3 h-1/3 flex flex-col items-center justify-end gap-0 absolute bottom-0 w-full bg-gradient-to-t from-black/80  to-transparent transition-all duration-500 ease-in-out`}
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
                    {interestingArticles[2].title}
                  </span>
                  <Tooltip title={interestingArticles[2].summary}>
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
                      {interestingArticles[2].summary}
                    </span>
                  </Tooltip>
                </div>
              </Link>
            </>
          )}
        </div>
      </>
    );
  };

  //   for render category articles
  const renderCategoryArticles = () => {
    return (
      <>
        <div className="w-full grid grid-cols-1 gap-3">
          {categoryArticlesLoading ? (
            <CategoryArticlesProgress />
          ) : categoryArticles.length === 0 ? (
            "موجود نیست"
          ) : (
            categoryArticles.map((item, index) => (
              <ArticleComponent
                key={item.id}
                article={item}
                typeRendering={isMdUp ? "full-width" : "half-width"}
              />
            ))
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start gap-3">
      {renderInterestingArticles()}
      {renderCategoryArticles()}
    </div>
  );
};

export default ArticleList;
