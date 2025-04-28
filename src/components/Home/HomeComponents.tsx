"use client";
import React, { FC, lazy, useEffect } from "react";
import { motion } from "framer-motion";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { useGlobalContext } from "@/context/store";
import { getAirports } from "@/global-files/axioses";
import Link from "next/link";
// for lazy loading
const SearchBox = lazy(() => import("./indexPageComponents/SearchBox"));
const Services = lazy(() => import("./indexPageComponents/Services"));
const TabDescriptionsComponent = lazy(
  () => import("./indexPageComponents/TabDescriptionsComponent")
);

const HomeComponents = () => {
  // initial states
  const { setAirports } = useGlobalContext().flightContext.searchContext;

  // handle initial value
  useEffect(() => {
    getAirports()
      .then((res: any) => {
        console.log("res", res);
        if (res.status) {
          setAirports(res.data.titles);
          // setAirportsLoading(false);
        }
      })
      .catch((err) => {});
  }, []);

  // base animation for each component
  const itemAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  const renderOnDesktop = () => {
    return (
      <>
        <div className="container hidden md:block py-24">
          <div className="relative grid grid-cols-1 gap-14">
            {/* <div className="z-10 sticky top-[760px] -ml-24 flex flex-col items-center justify-center gap-2 justify-self-end">
              <span className="bg-paper h-12 w-12 rounded-full shadow-md shadow-primary-main flex items-center justify-center">
                H
              </span>
              <span className="bg-primary-main h-12 w-12 rounded-full flex items-center justify-center">
                <HeadsetMicIcon fontSize="small" className="text-paper" />
              </span>
            </div> */}
            <motion.div {...itemAnimation}>
              <SearchBox />
            </motion.div>{" "}
            <motion.div
              {...itemAnimation}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Services />
            </motion.div>{" "}
            <motion.div
              {...itemAnimation}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 gap-14"
            >
              <TabDescriptionsComponent />
            </motion.div>
          </div>
        </div>
      </>
    );
  };
  const renderOnMobile = () => {
    return (
      <>
        <div className="md:hidden grid grid-cols-1 gap-14 p-4">
          <SearchBox />
          <Services />
          <TabDescriptionsComponent />
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

export default HomeComponents;
