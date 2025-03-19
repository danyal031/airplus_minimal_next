"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import isfahan from "../../../../public/assets/images/mag/indexPage/postsCover/isfahan.png";
import mesr from "../../../../public/assets/images/mag/indexPage/postsCover/mesr.png";
import qatar from "../../../../public/assets/images/mag/indexPage/postsCover/qatar.png";
import MagHeader from "../MagHeader";

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

const MagSubHeader = () => {
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

  //   for render posts cover
  const renderPostsCover = () => {
    return (
      <>
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="relative overflow-hidden rounded-b-2xl col-span-3 min-h-[430px]">
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
              className={`h-5 w-48 absolute bottom-0 left-1/2 -translate-x-1/2  text-center font-bold text-base text-text-main truncate z-[3]`}
            >
              {secondPost?.title}
            </span>
          </div>
          <div className="h-full flex items-center justify-center bg-gray-300 rounded-2xl relative">
            <span className="rounded-tab-up-sm h-7 w-4/5 flex items-center justify-center absolute top-0 bg-main">
              <span className="font-bold text-base text-primary-main truncate">
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
              className={`h-5 w-48 absolute bottom-0 left-1/2 -translate-x-1/2  text-center font-bold text-base text-text-main truncate z-[3]`}
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
      <MagHeader />
      {renderPostsCover()}
    </div>
  );
};

export default MagSubHeader;
