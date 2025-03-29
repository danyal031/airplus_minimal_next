import React from "react";
import isfahan from "../../../../../public/assets/images/mag/indexPage/postsCover/isfahan.png";
import mesr from "../../../../../public/assets/images/mag/indexPage/postsCover/mesr.png";
import qatar from "../../../../../public/assets/images/mag/indexPage/postsCover/qatar.png";
import Image from "next/image";

const posts: any = [
  {
    id: 1,
    title: "اصفهان گردی",
    summary: "اصفهان شهر زیبا و نشاط است",
    slug: "#",
    thumbnail: isfahan,
  },
];

const InterestingArticlesCoverOnMobile = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl min-h-48 w-full">
      <Image
        style={{
          WebkitMaskImage: `url('/assets/images/mag/indexPage/postsCover/maskImage/mask-image-down-mobile.svg')`,
          WebkitMaskSize: "cover",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskImage: `url('/assets/images/mag/indexPage/postsCover/maskImage/mask-image-down-mobile.svg')`,
          maskSize: "cover",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
        src={posts[0].thumbnail as string}
        alt={""}
        className="object-cover object-center"
        fill
      />
      <span
        className={`h-5 w-48 absolute bottom-0 left-1/2 -translate-x-1/2  text-center font-bold text-base text-primary-main truncate z-[3]`}
      >
        {posts[0].title}
      </span>
    </div>
  );
};

export default InterestingArticlesCoverOnMobile;
