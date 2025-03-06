import React from "react";
import { Divider } from "@mui/material";
import Image from "next/image";
import hormoz from "../../../public/assets/images/mag/image_test.webp";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PublisherInformation from "./PublisherInformation";
import TitleDivider from "./TitleDivider";

const LatestPosts = () => {
  const posts = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="w-full grid grid-cols-12 gap-7">
      <TitleDivider
        label="جدیدترین مطالب"
        icon={<TextSnippetIcon fontSize="small" />}
      />
      {posts.map((item) => {
        return (
          <div
            key={item}
            className="col-span-3 grid grid-cols-1 gap-4 p-2 border border-divider rounded-xl bg-paper"
          >
            <div className="aspect-video min-h-28 relative rounded-xl overflow-hidden">
              <Image
                src={hormoz}
                alt=""
                style={{ objectFit: "cover" }}
                fill
                className="hover:scale-105 hover:cursor-pointer transition-transform duration-300 transform-origin-center"
              />
              <div className="absolute top-1 right-1 w-14 h-5 bg-primary-main rounded-md shadow-lg flex items-center justify-center">
                <span className="text-paper text-[10px] font-semibold text-main">
                  شهر ها
                </span>
              </div>
            </div>
            <PublisherInformation
              className="text-text-main"
              image={hormoz}
              date="۱۶ بهمن ۱۴۰۱"
              name="دانیال هوشنگی"
            />
            <span className="text-sm font-semibold text-text-main">
              خرید پرسود-جمعه سیاه Black Friday(بلکفرایدی) متن تست
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default LatestPosts;
