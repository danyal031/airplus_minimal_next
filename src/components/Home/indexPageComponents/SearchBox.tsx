"use client";
import Lottie from "lottie-react";
import React, { FC, useEffect, useState } from "react";
import comingSoonLottie from "../../../../public/assets/lottie/coming_soon_lottie.json";
import { Tab } from "@mui/material";
import { motion } from "framer-motion";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import FlightIcon from "@mui/icons-material/Flight";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VillaIcon from "@mui/icons-material/Villa";
import FlightSearchForm from "@/components/FlightSection/FlightSearchForm/FlightSearchForm";
import { useGlobalContext } from "@/context/store";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import AccommodationSearchForm from "@/components/AccommodationSection/AccommodationSearchForm/AccommodationSearchForm";
import { ConfigDataType } from "@/DataTypes/globalTypes";
import FlightAccommodationSearchForm from "@/components/FlightAccommodationSection/FlightAccommodationSearchForm/FlightAccommodationSearchForm";
// import { getAirports } from "@/global-files/axioses";

const SearchBox = () => {
  // initial states
  const { setAirports } = useGlobalContext().flightContext.searchContext;
  const { config } = useGlobalContext().global;

  // handle get airports
  // useEffect(() => {
  //   getAirports()
  //     .then((res: any) => {
  //       console.log("res", res);
  //       if (res.status) {
  //         setAirports(res.data.titles);
  //         // setAirportsLoading(false);
  //       }
  //     })
  //     .catch((err) => {});
  // }, []);

  return (
    <>
      <SearchBoxOnDesktop config={config} />
      <SearchBoxOnMobile config={config} />
    </>
  );
};

export default SearchBox;

interface SearchBoxOnDesktopProps {
  config: ConfigDataType | null;
}
const SearchBoxOnDesktop: FC<SearchBoxOnDesktopProps> = ({ config }) => {
  const { tabValueSearchBox, setTabValueSearchBox } = useGlobalContext().global;
  const handleChangeTab = (newValue: string) => {
    setTabValueSearchBox(newValue);
  };
  // render coming soon
  const renderComingSoon = () => {
    return (
      <div className="w-full relative rounded-xl bg-paper p-6 min-h-16 flex gap-5 items-center justify-center">
        <div className="w-28 flex justify-center items-center">
          <Lottie animationData={comingSoonLottie} loop={true} />
        </div>
        <span className="font-semibold text-lg">
          بازدید کننده عزیز، این بخش هنوز در حال توسعه است
        </span>
      </div>
    );
  };
  // handle get Bg Image
  const getBgImage = () => {
    switch (tabValueSearchBox) {
      case "1":
        return "flight-pattern.svg";
      case "2":
        return "residence-pattern.svg";
      case "3":
        return "accommodation-flight-pattern.svg";
      // default:
      //   return "flight-pattern.svg";
    }
  };

  // render tab
  const renderTab = () => {
    const tabs = [
      { id: "1", label: "پرواز", active: true },
      { id: "2", label: "اقامتگاه", active: true },
      { id: "3", label: "بلیت و اقامتگاه", active: true },
      // { id: "3", label: "اتوبوس", active: false },
      // { id: "4", label: "تور", active: false },
      // { id: "5", label: "قطار", active: false },
    ];

    return (
      <div
        className={`grid grid-cols-3 gap-0 bg-primary-main rounded-tab-down w-4/5 p-0 ${
          tabValueSearchBox === "1" ? "border-r-paper" : "border-r-primary-main"
        } ${
          tabValueSearchBox === "3" ? "border-l-paper" : "border-l-primary-main"
        }`}
      >
        {tabs.map((tab, index) => {
          // const isEven = index % 2 === 0;
          const isActive = tabValueSearchBox === tab.id;
          return (
            <span
              key={tab.id}
              onClick={() => {
                if (tab.active) {
                  handleChangeTab(tab.id);
                }
              }}
              className={`text-paper hover:cursor-pointer ${
                isActive ? "rounded-tab-down" : ""
              } col-span-1 flex items-center justify-center font-semibold h-12 ${
                tabValueSearchBox === "1"
                  ? "border-r-0 rounded-r-none"
                  : tabValueSearchBox === "3"
                  ? "border-l-0 rounded-l-none"
                  : ""
              }  ${
                tabValueSearchBox === tab.id ? "bg-paper text-primary-main" : ""
              }`}
            >
              {tab.label}
            </span>
          );
        })}
      </div>
    );
  };

  // render form
  const renderForm = () => {
    switch (tabValueSearchBox) {
      case "1":
        return <FlightSearchForm type="flight" />;
      case "2":
        return <AccommodationSearchForm />;
      case "3":
        return <FlightSearchForm type="flight-accommodation" />;
      default:
        return renderComingSoon();
    }
    // if (config?.office_id === 1001) {
    //   switch (tabValueSearchBox) {
    //     case "1":
    //       return <FlightSearchForm />;
    //     case "2":
    //       return <AccommodationSearchForm />;
    //     default:
    //       return renderComingSoon();
    //   }
    // } else {
    //   return renderComingSoon();
    // }
  };

  // handle render render Reservations Banner
  const renderReservationsBanner = () => {
    return (
      <>
        <div
          className="min-h-[220px] w-full"
          style={{
            position: "relative",
            width: "100%",
            backgroundImage: `url('/assets/images/reservationsBanner/${getBgImage()}')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            overflow: "hidden", // Hide overflowing content
            backgroundPosition: "bottom center",
          }}
        ></div>
      </>
    );
  };

  return (
    <div className="hidden md:flex flex-col items-center justify-start gap-0">
      {renderReservationsBanner()}
      {renderTab()}
      {renderForm()}
    </div>
  );
};

interface SearchBoxOnMobileProps {
  config: ConfigDataType | null;
}
const SearchBoxOnMobile: FC<SearchBoxOnMobileProps> = ({ config }) => {
  const { tabValueSearchBox, setTabValueSearchBox } = useGlobalContext().global;

  const handleChangeTab = (newValue: string) => {
    setTabValueSearchBox(newValue);
  };
  const renderTab = () => {
    const tabs = [
      { id: "1", label: "پرواز", active: true },
      { id: "2", label: "اقامتگاه", active: true },
      { id: "3", label: "بلیت و اقامتگاه", active: false },
      // { id: "3", label: "اتوبوس", active: false },
      // { id: "4", label: "تور", active: false },
      // { id: "5", label: "قطار", active: false },
    ];
    return (
      <>
        <div
          className={`grid grid-cols-3 gap-0 bg-primary-main w-full p-0 ${
            tabValueSearchBox === "1" ? "" : ""
          } ${
            tabValueSearchBox === "5"
              ? "border-l-paper"
              : "border-l-primary-main"
          }`}
        >
          {tabs.map((tab, index) => {
            // const isEven = index % 2 === 0;
            const isActive = tabValueSearchBox === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => {
                  if (tab.active) {
                    handleChangeTab(tab.id);
                  }
                }}
                className={`text-paper text-xs rounded-tab-down-sm hover:cursor-pointer px-5 truncate flex-shrink-0 ${
                  isActive ? "" : ""
                } flex items-center justify-center font-semibold h-10 ${
                  tabValueSearchBox === "1"
                    ? "border-r-0 rounded-r-none"
                    : tabValueSearchBox === "5"
                    ? "border-l-0 rounded-l-none"
                    : ""
                }  ${
                  tabValueSearchBox === tab.id
                    ? "bg-paper text-primary-main"
                    : ""
                }`}
              >
                {tab.label}
              </span>
            );
          })}
        </div>
      </>
    );
  };

  // redner comming soon
  const renderComingSoon = () => {
    return (
      <div className="w-full relative rounded-b-xl bg-paper p-6 min-h-16 flex gap-5 items-center justify-center">
        <div className="w-28 flex justify-center items-center">
          <Lottie animationData={comingSoonLottie} loop={true} />
        </div>
        <span className="font-semibold text-lg">
          بازدید کننده عزیز، این بخش هنوز در حال توسعه است{" "}
        </span>
      </div>
    );
  };
  // render form
  const renderForm = () => {
    switch (tabValueSearchBox) {
      case "1":
        return <FlightSearchForm type="flight" />;
      case "2":
        return <AccommodationSearchForm />;
      default:
        return renderComingSoon();
    }
    // if (config?.office_id === 1001) {
    //   switch (tabValueSearchBox) {
    //     case "1":
    //       return <FlightSearchForm />;
    //     // case "2":
    //     //   return <AccommodationSearchForm />;
    //     default:
    //       return renderComingSoon();
    //   }
    // } else {
    //   return renderComingSoon();
    // }
  };
  return (
    <>
      <div className="md:hidden rounded-xl flex flex-col items-center justify-start gap-0 overflow-hidden">
        {renderTab()}
        {renderForm()}
      </div>
    </>
  );
};
