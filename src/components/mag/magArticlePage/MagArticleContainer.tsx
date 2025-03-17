"use client";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticle } from "@/global-files/axioses";
import { Button, Container, Slider, Toolbar } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RecommendedArticles from "./RecommendedArticles";
import PublisherInformation from "../PublisherInformation";
import Image from "next/image";
import MessageIcon from "@mui/icons-material/Message";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ShareIcon from "@mui/icons-material/Share";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleDetailsProgress from "@/components/Skelton-Components/mag/articlePage/ArticleDetailsProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export interface MagArticleContainerProps {
  params: {
    articleId: string[];
  };
}
const MagArticleContainer: FC<MagArticleContainerProps> = ({ params }) => {
  //   initial states
  const [article, setArticle] = useState<ArticleDataTypes | null>(null);
  const [scrollValue, setScrollValue] = useState(0);

  // for change scroll value
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const newValue = (scrollTop / maxScroll) * 100;
      setScrollValue(newValue);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSliderClick = (_event: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const newScrollTop = (newValue / 100) * maxScroll;
      window.scrollTo({ top: newScrollTop, behavior: "smooth" });
    }
  };

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
        <div className="w-full sticky top-0 bg-paper z-50">
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
                <div className="flex items-center justify-center gap-1">
                  <span className="text-sm text-text-main font-semibold">
                    سایر
                  </span>
                  <ExpandMoreIcon fontSize="small" />
                </div>
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
          <div className="grid grid-cols-1 gap-5">
            <PublisherInformation
              avatar={article.operator.avatar}
              name={article.operator.fullname}
              // date={article.published_at}
              className="p-3"
              date="۱۹ آذر ۱۴۰۳"
            />
            <div className="relative flex items-start justify-center gap-3">
              <div className="vertical-rounded-tab sticky top-20 bg-main py-5 px-3 flex flex-col items-center justify-center gap-4">
                <MessageIcon fontSize="small" />
                <Diversity3Icon fontSize="small" />
                <ShareIcon fontSize="small" />
                <Slider
                  className="h-28"
                  size="small"
                  orientation="vertical"
                  valueLabelDisplay="off"
                  color="primary"
                  value={scrollValue}
                  onChangeCommitted={handleSliderClick}
                />
                <MenuIcon fontSize="small" />
              </div>
              <div className="flex-1 grid grid-cols-1 gap-5">
                <div className="relative overflow-hidden rounded-2xl min-h-96">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_MEDIA_URL_1 +
                      "/" +
                      article.thumbnail
                    }
                    alt={""}
                    className="object-cover"
                    fill
                  />
                  <div className="rounded-tab-down-sm absolute bottom-0 right-7 bg-paper h-9 w-80 px-6 overflow-hidden flex items-center justify-center">
                    <span className="block truncate text-text-main font-semibold">
                      {article.title}
                    </span>
                  </div>
                </div>
                <div
                  className="text-justify leading-8"
                  dangerouslySetInnerHTML={{ __html: article.body }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <ArticleDetailsProgress />
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
        <div className="col-span-12 grid grid-cols-12 gap-7 bg-paper rounded-2xl">
          <div className="col-span-9">{renderArticleDetails()}</div>
          <div className="col-span-3 relative p-3 pr-0">
            {renderOtherArticles()}
          </div>
        </div>
      </div>
    </>
  );
};

export default MagArticleContainer;
