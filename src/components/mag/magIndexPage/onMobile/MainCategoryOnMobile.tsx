import React, { FC } from "react";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import LanguageIcon from "@mui/icons-material/Language";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ArticleIcon from "@mui/icons-material/Article";
import BorderAllIcon from "@mui/icons-material/BorderAll";

const MainCategoryOnMobile = () => {
  // for categories
  const categories = [
    {
      id: 1,
      title: "ایران",
      icon: (
        <AirplanemodeActiveIcon fontSize="small" className="text-text-main" />
      ),
    },
    {
      id: 2,
      title: "جهان",
      icon: <LanguageIcon fontSize="small" className="text-text-main" />,
    },
    {
      id: 3,
      title: "سفر",
      icon: <DirectionsBusIcon fontSize="small" className="text-text-main" />,
    },
    {
      id: 4,
      title: "اخبار",
      icon: <ArticleIcon fontSize="small" className="text-text-main" />,
    },
  ];
  return (
    <div className="w-full grid grid-cols-5 gap-3">
      {categories.map((category, index) => (
        <CategoryItem category={category} key={index} />
      ))}
      <div className="bg-paper rounded-2xl h-[68px] p-1 flex flex-col items-center justify-center gap-2">
        <BorderAllIcon fontSize="small" className="text-text-main" />
        <span className="text-text-main text-xs font-semibold ">همه</span>
      </div>
    </div>
  );
};

export default MainCategoryOnMobile;

interface CategoryItemProps {
  category: any;
}
const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  return (
    <>
      <div className="bg-paper rounded-2xl p-1 flex flex-col items-center justify-center gap-2">
        {category.icon}
        <span className="text-text-main text-sm font-semibold ">
          {category.title}
        </span>
      </div>
    </>
  );
};
