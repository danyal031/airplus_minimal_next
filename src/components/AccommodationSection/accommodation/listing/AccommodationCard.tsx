"use client";
import { useGlobalContext } from "@/context/store";
import { AccommodationsListDataType } from "@/DataTypes/accommodation/accommodationsListTypes";
import { Rating, Tooltip } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";

interface AccommodationCardProps {
  data: AccommodationsListDataType;
}
const AccommodationCard: FC<AccommodationCardProps> = ({ data }) => {
  // initial states
  const { typeOfAccommodation } =
    useGlobalContext().accommodationContext.accommodationSearch;

  // for type of list
  const renderListCard = () => {
    return <div>list</div>;
  };

  // for type of grid
  const renderGridCard = () => {
    return (
      <div className="grid grid-cols-1 gap-2">
        <div className="h-48 relative rounded-xl overflow-hidden">
          {data.media ? (
            <>
              {/* <span className="bg-primary-main text-paper absolute top-7 left-0 px-2 rounded-r-2xl z-10 py-1 text-xs">
                پیشنهاد ویژه
              </span> */}
              <Image
                alt=""
                fill
                className="object-cover"
                src={
                  process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + data.media[0].path
                }
              />
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-semibold">No image</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-start">
          <Rating size="small" value={data.rate || 0} readOnly />
        </div>
        <div className="flex items-center justify-start">
          <span className="text-text-main font-semibold text-sm">
            {data.title.fa}
          </span>
        </div>
        <div className="flex items-center justify-start">
          <Tooltip placement="top" title={data.communicational.address}>
            <span className="truncate text-xs text-text-main">
              {data.communicational.address}
            </span>
          </Tooltip>
        </div>
        <div className="flex items-center justify-start">
          <span className="text-sm text-text-main font-semibold cursor-pointer">
            از {data.min_price} تومان
          </span>
        </div>
      </div>
    );
  };

  const renderTypeOfCard = () => {
    switch (typeOfAccommodation) {
      case "list":
        return renderListCard();
      case "grid":
        return renderGridCard();
    }
  };
  return <>{renderTypeOfCard()}</>;
};

export default AccommodationCard;
