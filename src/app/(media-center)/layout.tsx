"use client";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
export interface CommonLayoutProps {
  children?: React.ReactNode;
}
const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  // initial states
  const router = useRouter();
  const [tabValue, setTabValue] = useState("1");
  const handleChangeTab = (newValue: string) => {
    setTabValue(newValue);
  };
  const renderTab = () => {
    const tabs = [
      { id: "1", label: "درباره ما", link: "/about-us" },
      { id: "2", label: "ارتباط با ما", link: "/contact" },
      { id: "3", label: "همکاری باما", link: "/cooperation" },
      { id: "4", label: "افتخارات", link: "/honors" },
    ];
    return (
      <>
        {" "}
        <div
          className={`grid grid-cols-8 gap-0 bg-primary-main rounded-tab-down w-[900px] p-0 ${
            tabValue === "1" ? "border-r-paper" : "border-r-primary-main"
          } ${tabValue === "4" ? "border-l-paper" : "border-l-primary-main"}`}
        >
          {tabs.map((tab, index) => {
            // const isEven = index % 2 === 0;
            const isActive = tabValue === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => {
                  handleChangeTab(tab.id);
                  router.push(tab.link as string);
                }}
                className={`text-paper hover:cursor-pointer ${
                  isActive ? "rounded-tab-down" : ""
                } col-span-2 flex items-center justify-center font-semibold h-12 ${
                  tabValue === "1"
                    ? "border-r-0 rounded-r-none"
                    : tabValue === "4"
                    ? "border-l-0 rounded-l-none"
                    : ""
                }  ${tabValue === tab.id ? "bg-paper text-primary-main" : ""}`}
              >
                {tab.label}
              </span>
            );
          })}
        </div>
      </>
    );
  };
  const renderMediaCenterListOption = () => {
    return (
      <>
        <div
          className="min-h-[220px] w-full"
          style={{
            position: "relative",
            width: "100%",
            backgroundImage: `url('/assets/images/mediaCenter/media-center.svg')`,
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
    <div className="grid grid-cols-1 gap-0 container">
      {renderMediaCenterListOption()}
      <div className="flex items-center justify-center">{renderTab()}</div>
      <div className="bg-paper rounded-xl p-8">{children}</div>
    </div>
  );
};

export default CommonLayout;
