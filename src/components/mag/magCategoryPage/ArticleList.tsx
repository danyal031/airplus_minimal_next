"use client";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticleList } from "@/global-files/axioses";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import ArticleComponent from "../ArticleComponent";

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
        <div className="w-full grid grid-cols-3 gap-2">
          <div className="col-span-1 flex flex-col items-center justify-start gap-2 h-96 w-full">
            {interestingArticlesLoading ? (
              "loading"
            ) : (
              <>
                <div className="w-full h-2/5 relative rounded-2xl overflow-hidden">
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
                    className={`h-1/3 flex flex-col items-start justify-center gap-1 absolute bottom-0 w-full bg-gradient-to-t from-black/80  to-transparent transition-all duration-500 ease-in-out`}
                  ></div>
                </div>
                <div className="w-full h-3/5 relative rounded-2xl overflow-hidden">
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
                    className={`h-1/3 flex flex-col items-start justify-center gap-1 absolute bottom-0 w-full bg-gradient-to-t from-black/80  to-transparent transition-all duration-500 ease-in-out`}
                  ></div>
                </div>
              </>
            )}
          </div>
          {interestingArticlesLoading ? (
            <div className="col-span-2 flex items-center justify-center">
              loading
            </div>
          ) : (
            <div className="col-span-2 relative rounded-2xl overflow-hidden">
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
                className={`h-1/3 flex flex-col items-start justify-center gap-1 absolute bottom-0 w-full bg-gradient-to-t from-black/80  to-transparent transition-all duration-500 ease-in-out`}
              ></div>
            </div>
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
          {categoryArticlesLoading
            ? "loading"
            : categoryArticles.length === 0
            ? "موجود نیست"
            : categoryArticles.map((item, index) => (
                <ArticleComponent
                  key={item.id}
                  article={item}
                  typeRendering={"full-width"}
                />
              ))}
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

interface InterestingArticleComponentPops {
  article: ArticleDataTypes;
}

const InterestingArticleComponent: FC<InterestingArticleComponentPops> = ({
  article,
}) => {
  return <></>;
};
