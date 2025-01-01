"use client";
import React, { useRef, useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import { Divider, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Thumbs } from "swiper/modules";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
const PopularRoutes = () => {
  // initial states
  const [tabValue, setTabValue] = useState<string>("1");
  const ticketsRef = useRef<HTMLDivElement>(null);
  const handleScrollLeft = () => {
    if (ticketsRef.current) {
      ticketsRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (ticketsRef.current) {
      ticketsRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  // const swiperRef = useRef<any>(null);
  // const handlePrev = () => {
  //   swiperRef.current.swiper.slidePrev();
  // };

  // const handleNext = () => {
  //   swiperRef.current.swiper.slideNext();
  // };

  const handleChangeTab = (newValue: string) => {
    setTabValue(newValue);
  };
  const renderTypeOfRoutes = () => {
    const routes = [
      { label: "کیش", id: "1" },
      { label: "تهران", id: "2" },
      { label: "مشهد", id: "3" },
      { label: "تبریز", id: "4" },
      { label: "کیش", id: "5" },
    ];

    return (
      <>
        <div className="bg-paper px-2 w-2/5 pb-1 grid grid-cols-10 gap-0 rounded-lg">
          {routes.map((service) => {
            const isActive = tabValue === service.id;
            return (
              <span
                key={service.id}
                onClick={() => handleChangeTab(service.id)}
                className={`truncate col-span-2 text-primary-main text-sm hover:cursor-pointer flex items-center justify-center font-semibold h-9 rounded-tab-up-sm ${
                  isActive ? "bg-main" : "bg-paper"
                }`}
              >
                {service.label}
              </span>
            );
          })}
        </div>
      </>
    );
  };
  const renderKishTickets = () => {
    const tickets = [
      {
        id: 1,
        origin: "تهران",
        destination: "کیش",
        price: 1500000,
      },
      {
        id: 2,
        origin: "مشهد",
        destination: "کیش",
        price: 2500000,
      },
      {
        id: 3,
        origin: "تبریز",
        destination: "کیش",
        price: 2000000,
      },
      {
        id: 4,
        origin: "کیش",
        destination: "تهران",
        price: 1500000,
      },
      {
        id: 5,
        origin: "کیش",
        destination: "مشهد",
        price: 2500000,
      },
      {
        id: 6,
        origin: "کیش",
        destination: "تبریز",
        price: 2000000,
      },
      {
        id: 7,
        origin: "تهران",
        destination: "کیش",
        price: 1500000,
      },
      {
        id: 8,
        origin: "مشهد",
        destination: "کیش",
        price: 2500000,
      },
      {
        id: 9,
        origin: "تبریز",
        destination: "کیش",
        price: 2000000,
      },
      {
        id: 10,
        origin: "کیش",
        destination: "تهران",
        price: 1500000,
      },
    ];
    // const [thumbsSwiper, setThumbsSwiper] = useState<null>(null);

    return (
      <>
        <div className="relative">
          <IconButton
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-primary-main rounded-full p-1"
            onClick={handleScrollLeft}
          >
            <ChevronLeftOutlinedIcon fontSize="medium" className="text-paper" />
          </IconButton>
          <div
            ref={ticketsRef}
            className="flex items-center justify-start gap-3 overflow-x-auto"
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
          >
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                style={{ aspectRatio: 2.2 }}
                className="circle-cut flex flex-col justify-between bg-paper h-32 shadow-md p-4"
              >
                <div className="flex justify-between items-center text-sm font-bold text-text-main">
                  <span>{ticket.origin}</span>
                  <div className="flex items-center justify-center w-full">
                    <div className="w-full px-2">
                      <Divider variant="fullWidth" className="w-full">
                        <FlightIcon className="text-primary-main -rotate-90" />
                      </Divider>
                    </div>
                  </div>
                  <span>{ticket.destination}</span>
                </div>
                <div className="border-dashed border-t border-divider my-2 mx-4"></div>
                <div className="flex justify-between items-center text-sm font-semibold text-text-main">
                  <span>کمترین قیمت:</span>
                  <span>{ticket.price.toLocaleString()} تومان</span>
                </div>
              </div>
            ))}
          </div>
          <IconButton
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-primary-main rounded-full p-1"
            onClick={handleScrollRight}
          >
            <KeyboardArrowRightOutlinedIcon
              fontSize="medium"
              className="text-paper"
            />
          </IconButton>
        </div>
        {/* <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={1}
            slidesPerView={4}
            navigation={false}
            ref={swiperRef}
            className="pr-4"
          >
            {tickets.map((ticket) => (
              <SwiperSlide key={ticket.id}>
                <div
                  style={{ aspectRatio: 2.2 }}
                  className="circle-cut flex flex-col justify-between bg-paper h-28 shadow-md p-4"
                >
                  <div className="flex justify-between items-center text-sm font-bold text-text-main">
                    <span>{ticket.origin}</span>
                    <div className="flex items-center justify-center w-full">
                      <div className="w-full px-2">
                        <Divider variant="fullWidth" className="w-full">
                          <FlightIcon className="text-primary-main -rotate-90" />
                        </Divider>
                      </div>
                    </div>
                    <span>{ticket.destination}</span>
                  </div>
                  <div className="border-dashed border-t border-divider my-2 mx-4"></div>
                  <div className="flex justify-between items-center text-sm font-semibold text-text-main">
                    <span>کمترین قیمت:</span>
                    <span>{ticket.price.toLocaleString()} تومان</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 z-[2] bg-primary-main rounded-full flex items-center justify-center">
            <ChevronLeftOutlinedIcon
              fontSize="medium"
              className="hover:cursor-pointer text-paper"
              onClick={handleNext}
            />
          </div>
          <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-[2] bg-primary-main rounded-full flex items-center justify-center">
            <KeyboardArrowRightOutlinedIcon
              fontSize="medium"
              className="hover:cursor-pointer text-paper"
              onClick={handlePrev}
            />
          </div>
        </div> */}
      </>
    );
  };
  const renderRoutesTickets = () => {
    switch (tabValue) {
      case "1":
        return renderKishTickets();
      default:
        return renderKishTickets();
    }
  };
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 flex flex-col items-center justify-center gap-1">
        <span className="text-text-main text-lg font-bold">
          مسیرهای پرطرفدار
        </span>
        <span className="text-text-main text-sm font-semibold">
          مسیر خود را انتخاب کنید
        </span>
      </div>
      <div className="col-span-12 flex items-center justify-center">
        {renderTypeOfRoutes()}
      </div>
      <div className="col-span-12">{renderRoutesTickets()}</div>
    </div>
  );
};

export default PopularRoutes;
