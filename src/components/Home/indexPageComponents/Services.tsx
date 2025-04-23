"use client";
import { useGlobalContext } from "@/context/store";
import { ConfigDataType } from "@/DataTypes/globalTypes";
import { Button, Card, Paper } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Services = () => {
  return (
    <>
      <ServicesOnDesktop />
      <ServicesOnMobile />
    </>
  );
};

export default Services;

const ServicesOnDesktop = () => {
  // initial states
  const [tabValue, setTabValue] = useState<string>("1");
  const { config } = useGlobalContext().global;

  const renderTourismTourSection = () => {
    const tourismTours = [
      {
        title: "تور گردشگری ترکیه",
        image: "test1.jpg",
        description: "تور گردشگری ترکیه",
      },
      {
        title: "پیشنهاد تور های کریسمس",
        image: "test2.jpg",
        description: "تور گردشگری ارمنستان",
      },
    ];
    return (
      <>
        <div className="grid grid-cols-2 gap-7">
          {tourismTours.map((tourismTour) => (
            <Paper
              elevation={0}
              key={tourismTour.title}
              className="p-4 rounded-xl"
            >
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
                    src={`/assets/images/test/${tourismTour.image}`}
                    alt={tourismTour.title}
                    className="object-cover"
                    fill
                  />
                </div>

                <div className="col-span-3 flex flex-col items-end justify-between pb-10 z-[2]">
                  <div className="flex flex-col items-end justify-center gap-1">
                    <span className="text-base truncate font-semibold lg:max-w-40 xl:max-w-52 text-text-main">
                      {tourismTour.title}
                    </span>
                    <p className="text-sm font-bold opacity-30 text-text-main">
                      {tourismTour.description}
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
          ))}
        </div>
      </>
    );
  };
  const renderServiceContent = () => {
    switch (tabValue) {
      case "1":
        return renderTourismTourSection();
      default:
        return renderTourismTourSection();
    }
  };

  const renderTypeOfServices = () => {
    const services = [
      { label: "ویزای سفر", id: "1" },
      { label: "ویزای سفر", id: "2" },
      { label: "تور گردشگری", id: "3" },
      { label: "خدمات CIP", id: "4" },
      { label: "بیمه سفر", id: "5" },
      { label: "بیمه سفر", id: "6" },
    ];

    return (
      <>
        <div className="bg-paper px-2 border-[3px] border-primary-main pb-2 grid grid-cols-12 gap-0 rounded-xl">
          {services.map((service) => {
            const isActive = tabValue === service.id;
            return (
              <span
                key={service.id}
                className={`col-span-2 w-full hover:cursor-pointer flex items-center justify-center font-semibold h-12 rounded-tab-up text-text-main hover:bg-primary-main hover:text-paper`}
              >
                {service.label}
              </span>
            );
          })}
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
        {/* <div className="col-span-12">{renderTypeOfServices()}</div> */}
        <div className="col-span-12">{renderServiceContent()}</div>
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

  // for render Type Of Services
  const renderTypeOfServices = () => {
    const services = [
      { label: "ویزای سفر", id: "1" },
      { label: "ویزای سفر", id: "2" },
      { label: "تور گردشگری", id: "3" },
      { label: "خدمات CIP", id: "4" },
      { label: "بیمه", id: "5" },
    ];
    return (
      <>
        {" "}
        <div className="bg-paper px-2 border-2 border-primary-main flex items-center justify-start gap-8 max-w-full overflow-x-auto rounded-xl">
          {services.map((service) => {
            return (
              <span
                key={service.id}
                className={`truncate hover:cursor-pointer flex items-center justify-center font-semibold h-12 flex-shrink-0`}
              >
                {service.label}
              </span>
            );
          })}
        </div>
      </>
    );
  };

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
        {/* <div className="">{renderTypeOfServices()}</div> */}
        <div className="">{renderServiceContent()}</div>
      </div>
    </>
  );
};
