"use client";
import React, { useEffect, useState } from "react";
import sightseeingPlaces from "../../../../public/assets/images/mag/categorie_posts/Sightseeing_places.webp";
import travelGuide from "../../../../public/assets/images/mag/categorie_posts/travel_guide.webp";
import tabiatGardi from "../../../../public/assets/images/mag/categorie_posts/tabiat-gardi.jpg";
import jazebeTarikhi from "../../../../public/assets/images/mag/categorie_posts/jazebe-tarikhi-jpg.webp";
import jahayeTafrihi from "../../../../public/assets/images/mag/categorie_posts/jahaye-tafrihi-jpg.webp";
import bazargardi from "../../../../public/assets/images/mag/categorie_posts/bazargardi.jpg";
import hotelVaEghamatgah from "../../../../public/assets/images/mag/categorie_posts/hotel-va-eghamatgah-jpg.webp";
import shekamGardi from "../../../../public/assets/images/mag/categorie_posts/shekam-gardi-jpg.webp";
import baghVaBoostan from "../../../../public/assets/images/mag/categorie_posts/bagh-va-boostan.jpg";
import soghat from "../../../../public/assets/images/mag/categorie_posts/soghat.jpg";
import Image from "next/image";
import { CategoryDataType } from "@/DataTypes/mag/categoryListTypes";
import { getCategoryList } from "@/global-files/axioses";
import CategoryListProgress from "@/components/Skelton-Components/mag/categoryList/CategoryListProgress";

const CategoriesPosts = () => {
  // initial states
  const [categories, setCategories] = useState<CategoryDataType[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  // const categories = [
  //   { id: 1, label: "جاهای دیدنی", cover: sightseeingPlaces, link: "#" },
  //   { id: 2, label: "راهنمای سفر", cover: travelGuide, link: "#" },
  //   { id: 3, label: "طبیعت گردی", cover: tabiatGardi, link: "#" },
  //   { id: 4, label: "جاذبه تاریخی", cover: jazebeTarikhi, link: "#" },
  //   { id: 5, label: "جاهای تفریحی", cover: jahayeTafrihi, link: "#" },
  //   { id: 6, label: "بازار گردی", cover: bazargardi, link: "#" },
  //   { id: 7, label: "هتل و اقامتگاه", cover: hotelVaEghamatgah, link: "#" },
  //   { id: 8, label: "شکم گردی", cover: shekamGardi, link: "#" },
  //   { id: 9, label: "باغ و بوستان", cover: baghVaBoostan, link: "#" },
  //   { id: 10, label: "سوغات", cover: soghat, link: "#" },
  // ];

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
      {categories.map((item) => {
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
            <div className="bg-primary-main text-default text-center py-1 rounded-b-lg hover:cursor-pointer">
              <span className="text-sm font-semibold text-main">
                {item.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesPosts;
