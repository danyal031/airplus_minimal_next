import MagCategoryContainer from "@/components/mag/magCategoryPage/MagCategoryContainer";
import React from "react";

export interface CategoryPageParamsType {
  params: {
    categoryId: string[];
  };
}
const CategoryPage = ({ params }: CategoryPageParamsType) => {
  return (
    <>
      <MagCategoryContainer params={params} />
    </>
  );
};

export default CategoryPage;
