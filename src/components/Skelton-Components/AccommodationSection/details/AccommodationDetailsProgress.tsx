import { Skeleton, Typography } from "@mui/material";
import React from "react";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FilterOutlinedIcon from "@mui/icons-material/FilterOutlined";
const AccommodationDetailsProgress = () => {
  const renderOnDesktop = () => {
    const renderImages = (
      <div className="grid grid-cols-2 gap-2 min-h-64">
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <Typography className="relative flex items-center justify-center">
            <FilterOutlinedIcon fontSize="large" className="absolute" />
            <Skeleton
              animation="wave"
              width={"100%"}
              height={"100%"}
              className="col-span-1 flex items-center justify-center rounded-md"
              variant="rounded"
            />
          </Typography>
          <Typography className="relative flex items-center justify-center">
            <FilterOutlinedIcon fontSize="large" className="absolute" />
            <Skeleton
              animation="wave"
              width={"100%"}
              height={"100%"}
              className="col-span-1 flex items-center justify-center rounded-md"
              variant="rounded"
            />
          </Typography>
          <Typography className="relative flex items-center justify-center">
            <FilterOutlinedIcon fontSize="large" className="absolute" />
            <Skeleton
              animation="wave"
              width={"100%"}
              height={"100%"}
              className="col-span-1 flex items-center justify-center rounded-md"
              variant="rounded"
            />
          </Typography>
          <Typography className="relative flex items-center justify-center">
            <FilterOutlinedIcon fontSize="large" className="absolute" />
            <Skeleton
              animation="wave"
              width={"100%"}
              height={"100%"}
              className="col-span-1 flex items-center justify-center rounded-md"
              variant="rounded"
            />
          </Typography>
        </div>
        <Typography className="relative flex items-center justify-center">
          <FilterOutlinedIcon fontSize="large" className="absolute" />
          <Skeleton
            animation="wave"
            width={"100%"}
            height={"100%"}
            className="col-span-1 flex items-center justify-center rounded-md"
            variant="rounded"
          />
        </Typography>
      </div>
    );
    const renderHotelInfo = (
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between">
          <Skeleton
            animation="wave"
            width={120}
            height={23}
            className="rounded-md"
            variant="text"
          />
          <div className="flex items-center justify-center gap-1">
            {" "}
            <Skeleton
              animation="wave"
              width={75}
              height={23}
              className="rounded-md"
              variant="text"
            />{" "}
            <Skeleton
              animation="wave"
              width={20}
              height={20}
              variant="circular"
            />
          </div>
        </div>
        <div className="flex items-center justify-start">
          {" "}
          <Skeleton
            animation="wave"
            width={75}
            height={23}
            className="rounded-md"
            variant="text"
          />
        </div>
        <div className="flex items-center justify-start mt-7">
          <Skeleton
            animation="wave"
            width={95}
            height={23}
            className="rounded-md"
            variant="text"
          />{" "}
        </div>
        <div className="grid grid-cols-12 gap-3 bg-white border border-neutral-200 rounded-2xl p-3">
          {Array.from(Array(12)).map((item) => {
            return (
              <>
                <div
                  key={item}
                  className="col-span-3 flex items-center justify-start gap-1"
                >
                  <Skeleton
                    animation="wave"
                    width={20}
                    height={20}
                    variant="circular"
                  />
                  <Skeleton
                    animation="wave"
                    width={75}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
    const renderHotelRooms = (
      <div className="grid grid-cols-1 gap-3 mt-7">
        <div className="flex items-center justify-start">
          <Skeleton
            animation="wave"
            width={95}
            height={23}
            className="rounded-md"
            variant="text"
          />{" "}
        </div>
        {Array.from(Array(4)).map((item) => {
          return (
            <>
              <div
                key={item}
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
            </>
          );
        })}
      </div>
    );
    const renderMap = (
      <div className="grid grid-cols-1 gap-2 mt-7">
        <div className="flex items-center justify-start">
          <Skeleton
            animation="wave"
            width={95}
            height={23}
            className="rounded-md"
            variant="text"
          />{" "}
        </div>
        <div className="overflow-hidden flex flex-col items-start justify-center gap-1 bg-white border border-neutral-200 rounded-2xl">
          <div className="w-full min-h-60 flex items-center justify-start">
            <Typography className="h-full w-full relative flex items-center justify-center">
              <MapOutlinedIcon fontSize="large" className="absolute" />
              <Skeleton
                animation="wave"
                width={"100%"}
                height={"100%"}
                className="rounded-none"
                variant="rounded"
              />
            </Typography>
          </div>
          <div className="flex items-center justify-start gap-1 p-2">
            <LocationOnOutlinedIcon fontSize="small" />{" "}
            <Skeleton
              animation="wave"
              width={170}
              height={20}
              className="rounded-md"
              variant="text"
            />{" "}
          </div>
        </div>
      </div>
    );
    const renderAboutHotel = (
      <div className="grid grid-cols-1 gap-2 mt-7">
        {" "}
        <div className="flex items-center justify-start mt-7">
          <Skeleton
            animation="wave"
            width={95}
            height={23}
            className="rounded-md"
            variant="text"
          />{" "}
        </div>
        <div className="flex flex-col items-start justify-center gap-8 border border-neutral-200 bg-white rounded-2xl p-4">
          {" "}
          {Array.from(Array(3)).map((item) => {
            return (
              <>
                <div
                  key={item}
                  className="w-full flex flex-col items-start justify-center gap-1"
                >
                  <Skeleton
                    animation="wave"
                    width={100}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />{" "}
                  <Skeleton
                    animation="wave"
                    width={"40%"}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />
                  <Skeleton
                    animation="wave"
                    width={"80%"}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />
                  <Skeleton
                    animation="wave"
                    width={"60%"}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
    const renderHelpixBox = (
      <div className="w-full grid grid-cols-1 p-5 gap-2 bg-white border border-neutral-200 rounded-2xl">
        <div className="flex items-center justify-start gap-2">
          <Skeleton
            animation="wave"
            width={20}
            height={20}
            variant="circular"
          />
          <Skeleton
            animation="wave"
            width={"100%"}
            height={23}
            className="rounded-md"
            variant="text"
          />
        </div>{" "}
        <Skeleton
          animation="wave"
          width={"40%"}
          height={23}
          className="rounded-md"
          variant="text"
        />
      </div>
    );
    const renderSearchRooms = (
      <div className="w-full sticky top-24 p-3 bg-white border border-neutral-200 rounded-2xl grid grid-cols-1 gap-12">
        <div className="flex items-center justify-center gap-3">
          <Skeleton
            animation="wave"
            width={"100%"}
            height={25}
            className="rounded-md"
            variant="rounded"
          />{" "}
          <Skeleton
            animation="wave"
            width={"100%"}
            height={25}
            className="rounded-md"
            variant="rounded"
          />{" "}
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
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
            height={22}
            className="rounded-md"
            variant="rounded"
          />{" "}
        </div>
      </div>
    );
    return (
      <>
        <div className="hidden md:grid grid-cols-12 gap-4">
          <div className="col-span-9 grid grid-cols-1 gap-4">
            {renderImages}
            {renderHotelInfo}
            {renderHotelRooms}
            {renderMap}
            {renderAboutHotel}
          </div>
          <div className="relative col-span-3 flex flex-col items-center justify-start gap-4">
            {renderHelpixBox}
            {renderSearchRooms}
          </div>
        </div>
      </>
    );
  };
  const renderOnMobile = () => {
    const renderImages = (
      <div className="flex items-center justify-center gap-2 min-h-28">
        <div className="w-full h-full relative flex items-center justify-center">
          <FilterOutlinedIcon fontSize="large" className="absolute" />
          <Skeleton
            animation="wave"
            width={"100%"}
            height={"100%"}
            className="rounded-md"
            variant="rounded"
          />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <FilterOutlinedIcon fontSize="large" className="absolute" />
          <Skeleton
            animation="wave"
            width={"100%"}
            height={"100%"}
            className="rounded-md"
            variant="rounded"
          />
        </div>
        {/* <Skeleton
          animation="wave"
          width={"100%"}
          height={"100%"}
          className="rounded-md"
          variant="rounded"
        />{" "}
        <Skeleton
          animation="wave"
          width={"100%"}
          height={"100%"}
          className="rounded-md"
          variant="rounded"
        /> */}
        {/* <span>fsdfsdfsdf</span> */}
        {/* سیبسیبسیب */}
        {/* <div className=""></div> */}
      </div>
    );
    const renderHotelInfo = (
      <div className="grid grid-cols-1 gap-8 p-2">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="w-full flex items-center justify-between">
            <Skeleton
              animation="wave"
              width={110}
              height={23}
              className="rounded-md"
              variant="text"
            />{" "}
            <Skeleton
              animation="wave"
              width={60}
              height={23}
              className="rounded-md"
              variant="text"
            />{" "}
          </div>
          <div className="w-full flex items-center justify-start gap-1">
            <Skeleton
              animation="wave"
              width={20}
              height={20}
              variant="circular"
            />{" "}
            <Skeleton
              animation="wave"
              width={170}
              height={23}
              className="rounded-md"
              variant="text"
            />{" "}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1">
          <div className="flex items-center justify-start">
            <Skeleton
              animation="wave"
              width={95}
              height={23}
              className="rounded-md"
              variant="text"
            />
          </div>
          <div className="p-4 bg-white border border-neutral-200 rounded-2xl grid grid-cols-2 gap-3">
            {" "}
            {Array.from(Array(6)).map((item) => {
              return (
                <>
                  <div
                    key={item}
                    className="flex items-center justify-start gap-1 col-span-1"
                  >
                    <Skeleton
                      animation="wave"
                      width={20}
                      height={20}
                      variant="circular"
                    />{" "}
                    <Skeleton
                      animation="wave"
                      width={130}
                      height={23}
                      className="rounded-md"
                      variant="text"
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
    const renderHotelRooms = (
      <div className="grid grid-cols-1 gap-2 p-2">
        <div className="flex items-center justify-start">
          <Skeleton
            animation="wave"
            width={95}
            height={23}
            className="rounded-md"
            variant="text"
          />{" "}
        </div>
        {Array.from(Array(5)).map((item) => {
          return (
            <>
              <div
                key={item}
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
                  {Array.from(Array(3)).map((item) => {
                    return (
                      <>
                        <Skeleton
                          key={item}
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
            </>
          );
        })}
      </div>
    );
    const renderMap = (
      <div className="grid grid-cols-1 gap-2 p-2">
        <div className="overflow-hidden flex flex-col items-start justify-center gap-1 bg-white border border-neutral-200 rounded-2xl">
          <div className="w-full min-h-60 flex items-center justify-start">
            <Typography className="h-full w-full relative flex items-center justify-center">
              <MapOutlinedIcon fontSize="large" className="absolute" />
              <Skeleton
                animation="wave"
                width={"100%"}
                height={"100%"}
                className="rounded-none"
                variant="rounded"
              />
            </Typography>
          </div>
          <div className="flex items-center justify-start gap-1 p-2">
            <LocationOnOutlinedIcon fontSize="small" />{" "}
            <Skeleton
              animation="wave"
              width={170}
              height={20}
              className="rounded-md"
              variant="text"
            />{" "}
          </div>
        </div>
      </div>
    );
    const renderAboutHotel = (
      <div className="grid grid-cols-1 gap-2 p-2">
        <div className="flex flex-col items-start justify-center gap-8 border border-neutral-200 bg-white rounded-2xl p-4">
          {Array.from(Array(3)).map((item) => {
            return (
              <>
                <div
                  key={item}
                  className="w-full flex flex-col items-start justify-center gap-1"
                >
                  <Skeleton
                    animation="wave"
                    width={100}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />{" "}
                  <Skeleton
                    animation="wave"
                    width={"40%"}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />
                  <Skeleton
                    animation="wave"
                    width={"80%"}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />
                  <Skeleton
                    animation="wave"
                    width={"60%"}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
    return (
      <>
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {renderImages}
          {renderHotelInfo}
          {renderHotelRooms}
          {renderMap}
          {renderAboutHotel}
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

export default AccommodationDetailsProgress;
