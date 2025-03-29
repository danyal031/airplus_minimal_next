"use client";
import React, { FC, useEffect, useState } from "react";
import TitleDivider from "../../TitleDivider";
import Link from "next/link";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import { getArticleList } from "@/global-files/axioses";
import Image from "next/image";

const MostViewedPostsOnMobile = () => {
  // initial states
  const [mostViewedArticles, setMostViewedArticles] = useState<
    ArticleDataTypes[]
  >([]);
  const [showMostViewedLoading, setShowMostViewedLoading] =
    useState<boolean>(true);

  // handle get most viewed articles
  useEffect(() => {
    getArticleList(false, true)
      .then((res: any) => {
        if (res.status) {
          setMostViewedArticles(res.data);
          setShowMostViewedLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4">
      <TitleDivider label="پربازدید ترین مقالات" />
      {showMostViewedLoading ? (
        <div className="w-full flex items-center justify-center">
          mobile loading
        </div>
      ) : mostViewedArticles.length === 0 ? (
        "موجود نیست"
      ) : (
        <div className="w-full flex flex-col items-start justify-center gap-3">
          <Link
            href={
              "/mag/articles/" +
              mostViewedArticles[0].id +
              "/" +
              mostViewedArticles[0].slug
            }
            target="_blank"
            className="w-full h-52 rounded-2xl border-2 relative overflow-hidden"
          >
            <Image
              src={
                process.env.NEXT_PUBLIC_MEDIA_URL_1 +
                "/" +
                mostViewedArticles[0].thumbnail
              }
              alt={mostViewedArticles[0].title}
              fill
              className="object-cover object-center"
            />
            <div
              className={`h-12 px-4 flex flex-col items-start justify-center gap-1 absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent transition-all duration-500 ease-in-out`}
            >
              <span
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
                className="text-paper text-sm font-semibold overflow-hidden"
              >
                {mostViewedArticles[0].title}
              </span>
            </div>
          </Link>
          <div className="w-full flex items-center justify-start gap-3 max-w-full overflow-x-auto">
            {mostViewedArticles.slice(1).map((item) => {
              return <PostItem post={item} key={item.id} />;
            })}
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default MostViewedPostsOnMobile;

interface PostItemProps {
  post: ArticleDataTypes;
}
const PostItem: FC<PostItemProps> = ({ post }) => {
  return (
    <Link
      href={"/mag/articles/" + post.id + "/" + post.slug}
      target="_blank"
      className="w-64 h-52 rounded-2xl border-2 relative overflow-hidden flex-shrink-0"
    >
      <Image
        src={process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + post.thumbnail}
        alt={post.title}
        fill
        className="object-cover object-center"
      />
      <div
        className={`h-12 px-4 flex flex-col items-center justify-center gap-1 absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent transition-all duration-500 ease-in-out`}
      >
        <span
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
          className="text-paper text-sm font-semibold overflow-hidden"
        >
          {post.title}
        </span>
      </div>
    </Link>
  );
};
