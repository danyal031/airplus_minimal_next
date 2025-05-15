import React from "react";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import { Skeleton } from "@mui/material";
const ListingAccommodationsProgress = () => {
  const progressLength = Array.from(Array(3));
  const renderOnDesktop = () => {
    return (
      <>
        <div className="hidden md:grid grid-cols-1 gap-3 w-full">
          {progressLength.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-white w-full grid grid-cols-12 gap-4 border border-neutral-200 rounded-2xl py-2"
              >
                <div className="flex items-center justify-center col-span-3 border-l border-neutral-200">
                  <PhotoLibraryOutlinedIcon fontSize="large" />
                </div>
                <div className="grid grid-cols-1 gap-2 col-span-6">
                  <div className="w-full flex items-center justify-start gap-4">
                    {" "}
                    <Skeleton
                      animation="wave"
                      width={55}
                      height={20}
                      className="rounded-lg"
                      variant="rounded"
                    />
                    <Skeleton
                      animation="wave"
                      width={55}
                      height={20}
                      className="rounded-lg"
                      variant="rounded"
                    />
                    <Skeleton
                      animation="wave"
                      width={55}
                      height={20}
                      className="rounded-lg"
                      variant="rounded"
                    />{" "}
                    <Skeleton
                      animation="wave"
                      width={55}
                      height={20}
                      className="rounded-lg"
                      variant="rounded"
                    />{" "}
                    <Skeleton
                      animation="wave"
                      width={55}
                      height={20}
                      className="rounded-lg"
                      variant="rounded"
                    />{" "}
                    <Skeleton
                      animation="wave"
                      width={55}
                      height={20}
                      className="rounded-lg"
                      variant="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-start">
                    <Skeleton
                      animation="wave"
                      width={60}
                      height={23}
                      className="rounded-md"
                      variant="text"
                    />
                  </div>
                  <div className="flex items-center justify-start">
                    <Skeleton
                      animation="wave"
                      width={75}
                      height={23}
                      className="rounded-md"
                      variant="text"
                    />
                  </div>
                  <div className="flex items-center justify-start">
                    <Skeleton
                      animation="wave"
                      width={170}
                      height={23}
                      className="rounded-md"
                      variant="text"
                    />
                  </div>{" "}
                </div>{" "}
                <div className="flex flex-col items-center justify-center gap-1 col-span-3 border-r border-neutral-200">
                  <div className="flex items-center justify-center">
                    <Skeleton
                      animation="wave"
                      width={120}
                      height={22}
                      className="rounded-md"
                      variant="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <Skeleton
                      animation="wave"
                      width={60}
                      height={22}
                      className="rounded-md"
                      variant="text"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  const renderOnMobile = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-3 md:hidden w-full">
          {progressLength.map((item, index) => {
            return (
              <div
                key={index}
                className="border border-neutral-200 rounded-2xl grid grid-cols-1 gap-3 bg-white overflow-hidden pb-2"
              >
                <div className="min-h-24 grid grid-cols-2 gap-1 border-b border-neutral-200">
                  <div className="flex items-center justify-center col-span-1 bg-gray-200">
                    <PhotoLibraryOutlinedIcon fontSize="large" />
                  </div>{" "}
                  <div className="flex items-center justify-center col-span-1 bg-gray-200">
                    <PhotoLibraryOutlinedIcon fontSize="large" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-1 border-b border-neutral-200 px-2">
                  <div className="flex items-center justify-start gap-2">
                    <Skeleton
                      animation="wave"
                      width={55}
                      height={20}
                      className="rounded-lg"
                      variant="rounded"
                    />
                    <Skeleton
                      animation="wave"
                      width={55}
                      height={20}
                      className="rounded-lg"
                      variant="rounded"
                    />{" "}
                    <Skeleton
                      animation="wave"
                      width={55}
                      height={20}
                      className="rounded-lg"
                      variant="rounded"
                    />
                    <Skeleton
                      animation="wave"
                      width={55}
                      height={20}
                      className="rounded-lg"
                      variant="rounded"
                    />{" "}
                  </div>
                  <div className="flex items-center justify-start">
                    <Skeleton
                      animation="wave"
                      width={60}
                      height={23}
                      className="rounded-md"
                      variant="text"
                    />
                  </div>{" "}
                  <div className="flex items-center justify-start">
                    <Skeleton
                      animation="wave"
                      width={75}
                      height={23}
                      className="rounded-md"
                      variant="text"
                    />
                  </div>
                  <div className="flex items-center justify-start">
                    <Skeleton
                      animation="wave"
                      width={170}
                      height={23}
                      className="rounded-md"
                      variant="text"
                    />
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center justify-between px-2">
                  {" "}
                  <Skeleton
                    animation="wave"
                    width={80}
                    height={25}
                    className="rounded-md"
                    variant="text"
                  />
                  <Skeleton
                    animation="wave"
                    width={100}
                    height={22}
                    className="rounded-md"
                    variant="rounded"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <>
      {renderOnDesktop()}
      {renderOnMobile()}
    </>
  );
};

export default ListingAccommodationsProgress;
