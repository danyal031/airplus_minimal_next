import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface ArticleComponentProps {
  article: ArticleDataTypes;
  typeRendering: "full-width" | "half-width";
}
const ArticleComponent: FC<ArticleComponentProps> = ({
  article,
  typeRendering,
}) => {
  // initial states
  const router = useRouter();

  // handle render full width
  const renderFullWidthCard = () => {
    return (
      <>
        <div className="min-h-48 border-4 border-paper bg-main rounded-2xl grid grid-cols-5 gap-1">
          <div className="p-2 col-span-2">
            <div className="relative overflow-hidden rounded-xl h-full">
              <Image
                src={
                  process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + article.thumbnail
                }
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="p-3 pt-0 col-span-3 relative flex flex-col items-start justify-start gap-4">
            <span className="rounded-tab-up-sm self-center h-9 w-3/4 bg-paper text-primary-main font-bold text-sm truncate flex items-center justify-center">
              {article.title}
            </span>
            <div className="h-full w-full flex flex-col items-start justify-between">
              <p
                className="text-text-main text-xs font-semibold overflow-hidden w-full text-justify"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 4,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {article.summary}
              </p>
              <div className="w-full flex items-center justify-end">
                <Link
                  className="text-primary-main text-xs font-bold"
                  href={"/mag/articles/" + article.id + "/" + article.slug}
                  target="_blank"
                >
                  بیشتر بخوانید...
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  //   handle render half width
  const renderHalfWidthCard = () => {
    return (
      <>
        <div className="pb-2 min-h-72 border-4 border-paper bg-main rounded-2xl flex flex-col items-center justify-start gap-0 overflow-hidden">
          <div className="w-full h-40 relative">
            <span className="rounded-tab-up-sm absolute top-0 left-1/2 -translate-x-1/2 self-center h-9 w-3/4 bg-paper text-primary-main font-bold text-sm truncate flex items-center justify-center z-10">
              {article.title}
            </span>
            <Image
              src={
                process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + article.thumbnail
              }
              alt=""
              fill
              className="object-cover"
            />
          </div>{" "}
          <div className="p-3 text-justify flex flex-col items-start justify-between flex-grow">
            <p
              className="text-text-main text-xs font-semibold overflow-hidden w-full text-justify"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 4,
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {article.summary}
            </p>
            <div className="w-full flex items-center justify-end">
              <Link
                className="text-primary-main text-xs font-bold"
                href={"/mag/articles/" + article.id + "/" + article.slug}
                target="_blank"
              >
                بیشتر بخوانید...
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  // handle render article
  const renderArticle = () => {
    switch (typeRendering) {
      case "full-width":
        return renderFullWidthCard();
      case "half-width":
        return renderHalfWidthCard();
    }
  };

  return renderArticle();
};

export default ArticleComponent;
