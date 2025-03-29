"use client";
import React, { FC, useEffect, useState } from "react";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticleList } from "@/global-files/axioses";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import TravelogueProgress from "@/components/Skelton-Components/mag/indexPage/TravelogueProgress";
import TitleDivider from "../../TitleDivider";

const Travelogue = () => {
  // initial states
  const [travelogueArticles, setTravelogueArticles] = useState<
    ArticleDataTypes[]
  >([]);
  const [showTravelogueLoading, setShowTravelogueLoading] =
    useState<boolean>(true);

  // handle get travelogue articles
  useEffect(() => {
    getArticleList()
      .then((res: any) => {
        if (res.status) {
          setTravelogueArticles(res.data);
          setShowTravelogueLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 p-4 bg-paper rounded-2xl">
      <TitleDivider label="سفرنامه" />
      <div className="flex items-center justify-start gap-2 max-w-full overflow-x-auto">
        {showTravelogueLoading ? (
          <TravelogueProgress />
        ) : travelogueArticles.length === 0 ? (
          "موجود نیست"
        ) : (
          travelogueArticles.map((item, index) => (
            <TravelogueItem key={item.id} article={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default Travelogue;

interface TravelogueItemProps {
  article: ArticleDataTypes;
}
const TravelogueItem: FC<TravelogueItemProps> = ({ article }) => {
  return (
    <>
      <div className="w-40 h-36 rounded-2xl relative overflow-hidden flex-shrink-0">
        <Image
          src={process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + article.thumbnail}
          alt={article.title}
          fill
          className="object-cover object-center"
        />
        <Link
          href={"/mag/articles/" + article.id + "/" + article.slug}
          target="_blank"
          className="h-7 px-3 flex items-center justify-center absolute bottom-0 w-full backdrop-blur-sm"
        >
          <Tooltip title={article.title}>
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
              {article.title}
            </span>
          </Tooltip>
        </Link>
      </div>
    </>
  );
};
