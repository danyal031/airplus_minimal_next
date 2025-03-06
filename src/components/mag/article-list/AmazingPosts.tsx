"use client";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Image from "next/image";
import hormoz from "../../../../public/assets/images/mag/image_test.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import TitleDivider from "./TitleDivider";
import PublisherInformation from "./PublisherInformation";
import { getArticleList } from "@/global-files/axioses";
import { ArticleDataTypes } from "@/DataTypes/mag/articleListTypes";
import AmazingPostsProgress from "@/components/Skelton-Components/mag/amazingPosts/AmazingPostsProgress";

const AmazingPosts = () => {
  // initial states
  const [amazingPosts, setAmazingPosts] = useState<ArticleDataTypes[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(true);

  // Refs for navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // handle get amazing posts
  useEffect(() => {
    getArticleList(true, false)
      .then((res: any) => {
        if (res.status) {
          setAmazingPosts(res.data);
          setShowLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <Card>
        <CardHeader
          title={
            <TitleDivider
              icon={<AutoAwesomeIcon fontSize="small" />}
              label="جذاب ترین ها"
            />
          }
        />
        <CardContent className="relative">
          {/* Navigation buttons */}
          {showLoading ? (
            <AmazingPostsProgress />
          ) : (
            <>
              <div className="absolute top-[-20px] left-4 flex items-center gap-2 z-10">
                <IconButton
                  ref={prevRef}
                  className="bg-paper shadow-lg w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  {" "}
                  <NavigateNextIcon fontSize="small" />{" "}
                </IconButton>
                <IconButton
                  ref={nextRef}
                  className="bg-paper shadow-lg w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  <NavigateBeforeIcon fontSize="small" />
                </IconButton>
              </div>
              <Swiper
                spaceBetween={16}
                slidesPerView={2}
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper: any) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                className="mySwiper"
              >
                {amazingPosts.map((post) => (
                  <SwiperSlide
                    key={post.id}
                    className="rounded-lg overflow-hidden"
                  >
                    <div className="relative w-full h-56">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_MEDIA_URL_1 +
                          "/" +
                          post.thumbnail
                        }
                        alt=""
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-lg hover:cursor-pointer hover:scale-110"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end gap-3 p-4 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
                        <div className="flex items-center justify-start gap-2">
                          {post.tags.map((item) => (
                            <span className="bg-primary-main text-main text-xs font-semibold px-2 py-1 rounded-lg">
                              {item.title}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-white text-sm font-bold mt-2">
                          {post.title}
                        </h3>
                        <PublisherInformation
                          date="۵ فروردین ۱۴۰۲"
                          image={post.operator.avatar}
                          name={post.operator.fullname}
                          className="text-xs text-gray-300"
                        />
                      </div>
                    </div>{" "}
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AmazingPosts;
