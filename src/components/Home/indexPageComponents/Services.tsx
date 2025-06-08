"use client";
import { useGlobalContext } from "@/context/store";
import { ConfigDataType } from "@/DataTypes/globalTypes";
import { Button, Card, Paper } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Services = () => {
  const { config } = useGlobalContext().global;
  return (
    <>
      {config?.design.advertisement && (
        <>
          <ServicesOnDesktop />
          <ServicesOnMobile />
        </>
      )}
    </>
  );
};

export default Services;

const ServicesOnDesktop = () => {
  // initial states
  const { config } = useGlobalContext().global;

  const renderTourismTourSection = () => {
    // const tourismTours = [
    //   {
    //     title: "تور گردشگری ترکیه",
    //     image: "test1.jpg",
    //     description: "تور گردشگری ترکیه",
    //   },
    //   {
    //     title: "پیشنهاد تور های کریسمس",
    //     image: "test2.jpg",
    //     description: "تور گردشگری ارمنستان",
    //   },
    // ];
    return (
      <>
        <div className="grid grid-cols-2 gap-7">
          {config?.design.advertisement.map((tourismTour) => (
            <Paper
              elevation={0}
              key={tourismTour.id}
              className="p-4 rounded-xl"
            >
              <div className="grid grid-cols-12 gap-0 relative">
                <div className="aspect-video relative col-span-9 overflow-hidden">
                  <Image
                    style={{
                      WebkitMaskImage: tourismTour.src,
                      WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskImage: `url('/assets/images/test/pic.png')`,
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                    }}
                    src={tourismTour.src}
                    alt={tourismTour.title}
                    className="object-right"
                    fill
                  />
                </div>

                <div className="col-span-3 flex flex-col items-end justify-between pb-10 z-[2]">
                  <div className="flex flex-col items-end justify-center gap-1">
                    <span className="text-base truncate font-semibold lg:max-w-40 xl:max-w-52 text-text-main">
                      {tourismTour.title}
                    </span>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="rounded-lg"
                  >
                    بیشتر{" "}
                  </Button>
                </div>
              </div>
            </Paper>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      {" "}
      <div className="hidden md:grid grid-cols-12 gap-6">
        <div className="col-span-12 flex items-center justify-center">
          <span className="text-text-main font-bold text-lg">
            خدمات {config?.brand.fa}
          </span>
        </div>
        <div className="col-span-12">{renderTourismTourSection()}</div>
      </div>
    </>
  );
};

const ServicesOnMobile = () => {
  // initial states
  const [config, setConfig] = React.useState<null | ConfigDataType>(null);
  // handle initial value
  useEffect(() => {
    setConfig(JSON.parse(localStorage.getItem("minimal_config") as string));
  }, []);

  // for render Service Content
  const renderServiceContent = () => {
    return (
      <>
        <Paper elevation={0} className="p-2 rounded-xl">
          <div className="grid grid-cols-12 gap-0 relative">
            <div className="aspect-video relative col-span-9 overflow-hidden">
              <Image
                style={{
                  WebkitMaskImage: `url('/assets/images/test/pic.png')`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: `url('/assets/images/test/pic.png')`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
                src={`/assets/images/test/test1.jpg`}
                alt={"تور گردشگری ترکیه"}
                className="object-cover"
                fill
              />
            </div>

            <div className="col-span-3 flex flex-col items-end justify-between pb-10 z-[2]">
              <div className="flex flex-col items-end justify-center gap-1">
                <span className="text-sm truncate font-semibold lg:max-w-40 xl:max-w-52 text-text-main">
                  تور گردشگری ترکیه
                </span>
                <p className="text-xs font-bold opacity-30 text-text-main truncate">
                  تور گردشگری ترکیه
                </p>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="rounded-lg"
              >
                خرید تور
              </Button>
            </div>
          </div>
        </Paper>
      </>
    );
  };

  return (
    <>
      <div className="md:hidden grid grid-cols-1 gap-5">
        <div className="flex items-center justify-center">
          <span className="text-text-main font-bold text-lg">
            خدمات {config?.brand.fa}
          </span>
        </div>
        <div className="">{renderServiceContent()}</div>
      </div>
    </>
  );
};
