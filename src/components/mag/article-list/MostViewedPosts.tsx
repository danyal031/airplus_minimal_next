"use client";
import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import TitleDivider from "./TitleDivider";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";
import hormoz from "../../../../public/assets/images/mag/image_test.webp";
import Image from "next/image";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import { formatInputWithCommas } from "@/global-files/function";
import { getArticleList } from "@/global-files/axioses";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import MostViewedPostsProgress from "@/components/Skelton-Components/mag/MostViewedPosts/MostViewedPostsProgress";
import { useRouter } from "next/navigation";
const MostViewedPosts = () => {
  // initial states
  const [mostViewedPosts, setMostViewedPosts] = useState<ArticleDataTypes[]>(
    []
  );
  const [showLoading, setShowLoading] = useState<boolean>(true);

  const router = useRouter();

  // handle get MostViewedPosts
  useEffect(() => {
    getArticleList()
      .then((res: any) => {
        if (res.status) {
          setMostViewedPosts(res.data);
          setShowLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  // handle move to article details page
  const moveToArticlePage = (id: number) => {
    router.push(`/mag/articles/${id}`);
  };

  return (
    <div className="sticky top-40">
      <Card>
        <CardHeader
          title={
            <TitleDivider
              icon={<ViewDayOutlinedIcon fontSize="small" />}
              label="پربازدیدترین ها"
            />
          }
        />
        <CardContent className="grid grid-cols-1 gap-4">
          {showLoading ? (
            <MostViewedPostsProgress />
          ) : mostViewedPosts.length !== 0 ? (
            mostViewedPosts.map((item) => {
              return (
                <>
                  <div
                    key={item.id}
                    className="flex items-center justify-start gap-2 cursor-pointer"
                    onClick={() => moveToArticlePage(item.id)}
                  >
                    <div className="rounded-md aspect-video relative h-16 w-20 overflow-hidden">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_MEDIA_URL_1 +
                          "/" +
                          item.thumbnail
                        }
                        alt=""
                        fill
                        style={{ objectFit: "cover" }}
                        className="hover:scale-110 hover:cursor-pointer transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <span className="text-sm font-semibold text-text-main">
                        {item.title}
                      </span>
                      <div className="flex items-center justify-center gap-1 text-secondary-main">
                        <WhatshotOutlinedIcon
                          fontSize="small"
                          className="text-xs"
                        />
                        <span className="text-xs text-text-main">
                          {formatInputWithCommas(item.views)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-text-main font-semibold text-sm">
                پستی جهت نمایش وجود ندارد
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MostViewedPosts;
