import { Skeleton } from "@mui/material";
import React from "react";

const AccommodationRoomsProgress = () => {
  const renderOnDesktop = () => {
    return (
      <>
        {" "}
        <div className="hidden md:grid grid-cols-1 gap-3 mt-7">
          <div className="flex items-center justify-start">
            <Skeleton
              animation="wave"
              width={95}
              height={23}
              className="rounded-md"
              variant="text"
            />{" "}
          </div>
          {Array.from(Array(4)).map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-0 bg-white border border-neutral-200 rounded-xl px-2"
              >
                <div className="col-span-9 grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-start border-b border-neutral-200">
                    <Skeleton
                      animation="wave"
                      width={150}
                      height={23}
                      className="rounded-md"
                      variant="text"
                    />
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <Skeleton
                      animation="wave"
                      width={20}
                      height={20}
                      variant="circular"
                    />
                    <Skeleton
                      animation="wave"
                      width={70}
                      height={23}
                      className="rounded-md"
                      variant="text"
                    />
                  </div>
                </div>
                <div className="col-span-3 border-r border-neutral-200 flex flex-col items-center justify-center gap-1 py-2">
                  <Skeleton
                    animation="wave"
                    width={60}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />{" "}
                  <Skeleton
                    animation="wave"
                    width={150}
                    height={27}
                    className="rounded-md"
                    variant="rounded"
                  />{" "}
                  <Skeleton
                    animation="wave"
                    width={80}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />
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
        {" "}
        <div className="md:hidden grid grid-cols-1 gap-2 p-2">
          <div className="flex items-center justify-start">
            <Skeleton
              animation="wave"
              width={95}
              height={23}
              className="rounded-md"
              variant="text"
            />{" "}
          </div>
          {Array.from(Array(5)).map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-1 gap-3 p-3 bg-white border border-neutral-200 rounded-2xl"
              >
                <Skeleton
                  animation="wave"
                  width={110}
                  height={23}
                  className="rounded-md"
                  variant="text"
                />{" "}
                <div className="flex items-center justify-start gap-2">
                  {Array.from(Array(3)).map((item, index) => {
                    return (
                      <>
                        <Skeleton
                          key={index}
                          animation="wave"
                          width={60}
                          height={22}
                          className="rounded-lg"
                          variant="rounded"
                        />
                      </>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200 pt-2">
                  <Skeleton
                    animation="wave"
                    width={70}
                    height={24}
                    className="rounded-md"
                    variant="text"
                  />{" "}
                  <Skeleton
                    animation="wave"
                    width={110}
                    height={25}
                    className="rounded-md"
                    variant="rounded"
                  />{" "}
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

export default AccommodationRoomsProgress;
