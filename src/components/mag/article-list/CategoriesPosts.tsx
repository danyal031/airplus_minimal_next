"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CategoryDataType } from "@/DataTypes/mag/categoryListTypes";
import { getCategoryList } from "@/global-files/axioses";
import CategoryListProgress from "@/components/Skelton-Components/mag/categoryList/CategoryListProgress";

const CategoriesPosts = () => {
  // initial states
  const [categories, setCategories] = useState<CategoryDataType[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(true);

  // handle get categories
  useEffect(() => {
    getCategoryList()
      .then((res: any) => {
        if (res.status) {
          setShowLoading(false);
          setCategories(res.data);
        }
      })
      .catch((err) => {});
  }, []);
  return showLoading ? (
    <CategoryListProgress />
  ) : (
    <div className="w-full grid grid-cols-10 gap-4">
      {categories.length !== 0 ? (
        categories.map((item) => {
          return (
            <div
              key={item.id}
              className="relative col-span-2 aspect-video min-h-14 flex flex-col"
            >
              <div className="relative w-full h-full rounded-t-lg overflow-hidden">
                <Image
                  src={process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + item.image}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  className="overflow-hidden"
                />
              </div>
              <div className="bg-primary-main text-paper text-center py-1 rounded-b-lg hover:cursor-pointer">
                <span className="text-sm font-semibold text-main">
                  {item.title}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-10 flex items-center justify-center">
          <span className="text-text-main font-semibold text-sm">
            دسته ای جهت نمایش وجود ندارد
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoriesPosts;
