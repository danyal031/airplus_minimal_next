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

  //  handle click for posts
  const handleClickPost = (id: number) => {
    switch (id) {
      case 2:
        setSecondPost(firstPost);
        setFirstPost(secondPost);
        break;

      case 3:
        setThirdPost(firstPost);
        setFirstPost(thirdPost);
        break;
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
          <div className="relative overflow-hidden rounded-b-2xl col-span-3 min-h-72">
            <Image
              src={firstPost?.thumbnail as string}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl min-h-48">
            <Image
              src={secondPost?.thumbnail as string}
              alt=""
              fill
              className="object-cover"
              onClick={() => {
                handleClickPost(secondPost?.id as number);
              }}
            />
          </div>
          <div className="h-full flex items-center justify-center bg-gray-300 rounded-2xl">
            <span className="text-text-main text-sm">{firstPost?.summary}</span>
          </div>
          <div className="relative overflow-hidden rounded-2xl min-h-48">
            <Image
              src={thirdPost?.thumbnail as string}
              alt=""
              fill
              className="object-cover"
              onClick={() => {
                handleClickPost(thirdPost?.id as number);
              }}
            />
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
