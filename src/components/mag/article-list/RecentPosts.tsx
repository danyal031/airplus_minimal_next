"use client";
import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import TitleDivider from "./TitleDivider";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import hormoz from "../../../../public/assets/images/mag/image_test.webp";
import Image from "next/image";
import PublisherInformation from "./PublisherInformation";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { getArticleList } from "@/global-files/axioses";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import RecentPostsProgress from "@/components/Skelton-Components/mag/RecentPosts/RecentPostsProgress";
import { useRouter } from "next/navigation";
const RecentPosts = () => {
  // initial states
  const [resentPosts, setResentPosts] = useState<ArticleDataTypes[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(true);

  const router = useRouter();

  // handle get resent posts
  useEffect(() => {
    getArticleList()
      .then((res: any) => {
        if (res.status) {
          setResentPosts(res.data);
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
    <Card>
      <CardHeader
        title={
          <TitleDivider
            icon={<ScheduleOutlinedIcon fontSize="small" />}
            label="آخرین پست ها"
          />
        }
      />
      <CardContent className="divide-y-2">
        {showLoading ? (
          <RecentPostsProgress />
        ) : resentPosts.length !== 0 ? (
          resentPosts.map((item) => (
            <div
              onClick={() => moveToArticlePage(item.id)}
              key={item.id}
              className="grid grid-cols-12 gap-7 py-4 cursor-pointer"
            >
              <div className="rounded-xl col-span-5 aspect-video relative overflow-hidden">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + item.thumbnail
                  }
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  className="hover:scale-110 hover:cursor-pointer transition-transform duration-300"
                />
              </div>
              <div className="col-span-7 grid grid-cols-1 gap-2">
                <div className="flex items-center justify-start">
                  <PublisherInformation
                    className="text-text-main"
                    date=" ۱۹ آذر ۱۴۰۳"
                    image={item.operator.avatar}
                    name={item.operator.fullname}
                  />
                </div>
                <div className="flex items-center justify-start">
                  <h3 className="font-semibold text-text-main">{item.title}</h3>
                </div>
                <p className="text-xs font-light text-text-main">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between">
                  <ShareOutlinedIcon fontSize="small" />{" "}
                  <MoreHorizOutlinedIcon fontSize="small" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-text-main font-semibold text-sm">
              پستی جهت نمایش وجود ندارد
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentPosts;
