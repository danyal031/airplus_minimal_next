import { Skeleton } from "@mui/material";
import React from "react";

const RoomTypesAccommodationCartProgress = () => {
  const renderOnDesktop = () => {
    return Array.from(Array(5)).map((item) => {
      return (
        <div className="hidden md:grid grid-cols-1 gap-1 p-4 border rounded-lg shadow-md min-w-[250px] bg-default">
          <div className="flex items-center justify-start">
            <Skeleton
              animation="wave"
              width={100}
              height={20}
              className="rounded-md"
              variant="text"
            />
          </div>{" "}
          <div className="flex items-center justify-start gap-2">
            {Array.from(Array(3)).map((el) => {
              return (
                <>
                  <Skeleton
                    animation="wave"
                    width={80}
                    height={30}
                    className="rounded-md"
                    variant="text"
                  />
                </>
              );
            })}
          </div>
          <div className="flex items-center justify-start gap-2">
            <Skeleton
              animation="wave"
              width={60}
              height={30}
              className="rounded-md"
              variant="text"
            />{" "}
            <Skeleton
              animation="wave"
              width={60}
              height={30}
              className="rounded-md"
              variant="text"
            />
          </div>
          <div className="flex items-center justify-start">
            <Skeleton
              animation="wave"
              width={"100%"}
              height={30}
              className="rounded-lg"
              variant="rounded"
            />
          </div>
        </div>
      );
    });
  };
  const renderOnMobile = () => {
    return (
      <>
        {Array.from(Array(5)).map((item) => {
          return (
            <>
              <div className="md:hidden grid grid-cols-1 gap-1 p-4 border rounded-lg shadow-md min-w-[220px] bg-default">
                <div className="flex items-center justify-start">
                  <Skeleton
                    animation="wave"
                    width={80}
                    height={20}
                    className="rounded-md"
                    variant="text"
                  />
                </div>{" "}
                <div className="flex items-center justify-start gap-2">
                  {Array.from(Array(3)).map((el) => {
                    return (
                      <>
                        <Skeleton
                          animation="wave"
                          width={70}
                          height={30}
                          className="rounded-md"
                          variant="text"
                        />
                      </>
                    );
                  })}
                </div>
                <div className="flex items-center justify-start gap-2">
                  <Skeleton
                    animation="wave"
                    width={50}
                    height={30}
                    className="rounded-md"
                    variant="text"
                  />{" "}
                  <Skeleton
                    animation="wave"
                    width={50}
                    height={30}
                    className="rounded-md"
                    variant="text"
                  />
                </div>
                <div className="flex items-center justify-start">
                  <Skeleton
                    animation="wave"
                    width={"100%"}
                    height={20}
                    className="rounded-lg"
                    variant="rounded"
                  />
                </div>
              </div>
            </>
          );
        })}
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

export default RoomTypesAccommodationCartProgress;
