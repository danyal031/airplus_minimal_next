"use client";
import { CategoryDataType } from "@/DataTypes/mag/categoryListTypes";
import { getCategoryList } from "@/global-files/axioses";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";

const MagCategoriesListContainer = () => {
  // initial states
  const [categoriesList, setCategoriesList] = useState<CategoryDataType[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(true);

  //   handle get categories list
  useEffect(() => {
    getCategoryList()
      .then((res: any) => {
        if (res.status) {
          setCategoriesList(res.data);
          setShowLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3">
      {showLoading ? (
        <div className="col-span-4 flex items-center justify-center">
          loading
        </div>
      ) : categoriesList.length === 0 ? (
        "موجود نیست"
      ) : (
        categoriesList.map((item, index) => (
          <CategoryComponent key={item.id} category={item} />
        ))
      )}
    </div>
  );
};

export default MagCategoriesListContainer;

interface CategoryComponentProps {
  category: CategoryDataType;
}
const CategoryComponent: FC<CategoryComponentProps> = ({ category }) => {
  const [hoverCategoryCover, setHoverCategoryCover] = useState<boolean>(false);

  return (
    <>
      <Link
        onMouseEnter={() => {
          setHoverCategoryCover(true);
        }}
        onMouseLeave={() => {
          setHoverCategoryCover(false);
        }}
        target="_blank"
        href={`/mag/category/${category.id}/${category.slug}`}
        className="relative h-48 rounded-2xl overflow-hidden cursor-pointer"
      >
        <Image
          src={process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + category.image}
          alt=""
          fill
          className="object-cover"
        />
        <div
          className={`flex items-center justify-center absolute w-full h-full bg-black/25 transition-opacity duration-300 ease-in-out ${
            hoverCategoryCover ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="text-paper text-xl font-extrabold">
            {category.title}
          </span>
        </div>
      </Link>
    </>
  );
};
