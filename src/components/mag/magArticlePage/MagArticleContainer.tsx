"use client";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticle } from "@/global-files/axioses";
import { Button, Container, Toolbar } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RecommendedArticles from "./RecommendedArticles";
import PublisherInformation from "../PublisherInformation";

export interface MagArticleContainerProps {
  params: {
    articleId: string[];
  };
}
const MagArticleContainer: FC<MagArticleContainerProps> = ({ params }) => {
  //   initial states
  const [article, setArticle] = useState<ArticleDataTypes | null>(null);

  //  handle get article data
  useEffect(() => {
    const articleId = Number(params.articleId[0]);
    getArticle(articleId)
      .then((res: any) => {
        if (res.status) {
          setArticle(res.data);
        }
      })
      .catch((err) => {});
  }, []);

  //   handle  render nav bar
  const renderNavBar = () => {
    const navItems = [
      { label: "صفحه اصلی", id: "1" },
      { label: "ایران گردی", id: "2" },
      { label: "جهان گردی", id: "3" },
      { label: "راهنمای سفر", id: "4" },
      { label: "اخبار سفر", id: "5" },
      { label: "سفر نامه", id: "6" },
    ];
    return (
      <>
        <div className="w-full sticky top-0 bg-paper">
          <Container maxWidth="lg" className="bg-paper px-6 py-1">
            <Toolbar
              disableGutters
              className="flex items-center justify-between"
            >
              <div className="flex items-center justify-center gap-5">
                {navItems.map((item, index) => (
                  <span
                    key={index}
                    className="text-sm text-text-main font-semibold"
                  >
                    {item.label}
                  </span>
                ))}
              </div>{" "}
              <div className="flex items-center justify-center gap-2">
                <SearchIcon fontSize="medium" color="primary" />
                <Button className="rounded-lg" variant="contained" size="small">
                  بازگشت به ایرپلاس
                </Button>
              </div>{" "}
            </Toolbar>
          </Container>
        </div>
      </>
    );
  };

  // for render article details
  const renderArticleDetails = () => {
    return (
      <>
        {article ? (
          <div className="grid grid-cols-1 gap-3">
            <PublisherInformation
              avatar={article.operator.avatar}
              name={article.operator.fullname}
              // date={article.published_at}
              date="۱۹ آذر ۱۴۰۳"
            />
          </div>
        ) : (
          "loading"
        )}
      </>
    );
  };

  // for render other articles
  const renderOtherArticles = () => {
    return (
      <>
        <RecommendedArticles />
      </>
    );
  };

  return (
    <>
      {renderNavBar()}
      <div className="container my-24">
        <div className="col-span-12 grid grid-cols-12 gap-7 bg-paper rounded-2xl p-3">
          <div className="col-span-9">{renderArticleDetails()}</div>
          <div className="col-span-3">{renderOtherArticles()}</div>
        </div>
      </div>
    </>
  );
};

export default MagArticleContainer;
