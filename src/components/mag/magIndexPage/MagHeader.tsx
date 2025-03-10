"use client";
import React, { useState } from "react";
import magBanner from "../../../../public/assets/images/mag/indexPage/indexPageBanner/mag-banner.svg";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import isfahan from "../../../../public/assets/images/mag/indexPage/postsCover/isfahan.png";
import mesr from "../../../../public/assets/images/mag/indexPage/postsCover/mesr.png";
import qatar from "../../../../public/assets/images/mag/indexPage/postsCover/qatar.png";

const posts: ArticleDataTypes[] = [
  {
    id: 1,
    title: "اصفهان گردی",
    summary: "اصفهان شهر زیبا و نشاط است",
    slug: "#",
    thumbnail: isfahan,
  },
  {
    id: 2,
    title: "مصر",
    summary: "مصری کشوری قدیمی است",
    slug: "#",
    thumbnail: mesr,
  },
  {
    id: 3,
    title: "قطر",
    summary: "قطری کشور با درآمد بالا است",
    slug: "#",
    thumbnail: qatar,
  },
];

const MagHeader = () => {
  // initial states
  const [firstPost, setFirstPost] = useState<ArticleDataTypes | null>(posts[0]);
  const [secondPost, setSecondPost] = useState<ArticleDataTypes | null>(
    posts[1]
  );
  const [thirdPost, setThirdPost] = useState<ArticleDataTypes | null>(posts[2]);

  //   handle click for posts
  const handleClickPost = (
    clickedPost: ArticleDataTypes,
    postType: "second" | "third"
  ) => {
    if (firstPost?.id !== clickedPost.id) {
      const temp = firstPost;
      setFirstPost(clickedPost);
      if (postType === "second") {
        setSecondPost(temp);
      } else if (postType === "third") {
        setThirdPost(temp);
      }
    }
  };

  //   for render banner
  const renderBanner = () => {
    return (
      <>
        <div className="relative w-full min-h-48">
          <Image src={magBanner} alt="" fill className="object-contain" />
        </div>
      </>
    );
  };

  //   for render nav bar
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
        <div className="w-full bg-paper p-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center justify-center gap-5">
            {navItems.map((item, index) => (
              <span
                key={index}
                className="text-sm text-text-main font-semibold"
              >
                {item.label}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <SearchIcon fontSize="medium" color="primary" />
            <Button className="rounded-lg" variant="contained" size="small">
              بازگشت به ایرپلاس
            </Button>
          </div>
        </div>
      </>
    );
  };

  //   for render posts cover
  const renderPostsCover = () => {
    return (
      <>
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="relative overflow-hidden rounded-b-2xl col-span-3 min-h-96">
            <Image
              style={{
                WebkitMaskImage: `url('/assets/images/mag/indexPage/postsCover/maskImage/mask-image-down-main.svg')`,
                WebkitMaskSize: "cover",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: `url('/assets/images/mag/indexPage/postsCover/maskImage/mask-image-down-main.svg')`,
                maskSize: "cover",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
              src={firstPost?.thumbnail as string}
              alt={""}
              className="object-cover"
              fill
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl min-h-48 aspect-video">
            <Image
              style={{
                WebkitMaskImage: `url('/assets/images/mag/indexPage/postsCover/maskImage/mask-image-down.svg')`,
                WebkitMaskSize: "cover",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: `url('/assets/images/mag/indexPage/postsCover/maskImage/mask-image-down.svg')`,
                maskSize: "cover",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
              src={secondPost?.thumbnail as string}
              alt={""}
              className="object-cover"
              fill
              onClick={() => {
                handleClickPost(secondPost as ArticleDataTypes, "second");
              }}
            />
            <span
              className={`h-5 w-20 absolute bottom-0 left-1/2 -translate-x-1/2  text-center font-bold text-base text-text-main truncate z-[3]`}
            >
              {secondPost?.title}
            </span>
          </div>
          <div className="h-full flex items-center justify-center bg-gray-300 rounded-2xl relative">
            <span className="rounded-tab-up-sm h-7 w-4/5 flex items-center justify-center absolute top-0 bg-main">
              <span className="font-bold text-base text-primary-main">
                {firstPost?.title}
              </span>
            </span>
            <span className="text-text-main text-sm font-semibold">
              {firstPost?.summary}
            </span>
            <span className="text-primary-main text-xs font-bold absolute bottom-5">
              بیشتر بخوانید...
            </span>
          </div>
          <div className="relative overflow-hidden rounded-2xl min-h-48 aspect-video">
            <Image
              style={{
                WebkitMaskImage: `url('/assets/images/mag/indexPage/postsCover/maskImage/mask-image-down.svg')`,
                WebkitMaskSize: "cover",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: `url('/assets/images/mag/indexPage/postsCover/maskImage/mask-image-down.svg')`,
                maskSize: "cover",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
              src={thirdPost?.thumbnail as string}
              alt={""}
              className="object-cover"
              fill
              onClick={() => {
                handleClickPost(thirdPost as ArticleDataTypes, "third");
              }}
            />
            <span
              className={`h-5 w-20 absolute bottom-0 left-1/2 -translate-x-1/2  text-center font-bold text-base text-text-main truncate z-[3]`}
            >
              {thirdPost?.title}
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-start gap-0">
      {renderBanner()}
      {renderNavBar()}
      {renderPostsCover()}
    </div>
  );
};

export default MagHeader;
