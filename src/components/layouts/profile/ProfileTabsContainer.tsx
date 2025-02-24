"use client";
import { Route } from "next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProfileTabsContainer = () => {
  // initial states
  const [tabValue, setTabValue] = useState("1");

  const router = useRouter();

  // handle change tab
  const handleChangeTabValue = (id: string) => {
    setTabValue(id);
  };

  //   handle render user panel banner
  const renderUserPanelBanner = () => {
    return (
      <>
        <div
          className="min-h-[220px] w-full"
          style={{
            position: "relative",
            width: "100%",
            backgroundImage: `url('/assets/images/userPanelBanner/user-panal-pattern.svg')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            overflow: "hidden", // Hide overflowing content
            backgroundPosition: "bottom center",
          }}
        ></div>
      </>
    );
  };

  // handle render tabs
  const renderTabs = () => {
    const tabs = [
      { id: "1", label: "حساب کاربری", path: "/profile/account" },
      { id: "2", label: "مسافران", path: "/profile/passengers" },
      { id: "3", label: "نشان ها", path: "/profile/bookmarks" },
      { id: "4", label: "تراکنش ها", path: "/profile/transactions" },
      { id: "5", label: "سفرها", path: "/profile/orders" },
      { id: "6", label: "پشتیبانی", path: "/profile/support" },
    ];

    return (
      <div
        className={`grid grid-cols-12 gap-0 bg-primary-main rounded-tab-down w-4/5 p-0 ${
          tabValue === "1" ? "border-r-paper" : "border-r-primary-main"
        } ${tabValue === "6" ? "border-l-paper" : "border-l-primary-main"}`}
      >
        {tabs.map((tab, index) => {
          // const isEven = index % 2 === 0;
          const isActive = tabValue === tab.id;
          return (
            <span
              key={tab.id}
              onClick={() => {
                handleChangeTabValue(tab.id);
                router.push(tab.path as Route);
              }}
              className={`text-paper hover:cursor-pointer truncate w-auto ${
                isActive ? "rounded-tab-down" : ""
              } col-span-2 flex items-center justify-center font-semibold h-12 ${
                tabValue === "1"
                  ? "border-r-0 rounded-r-none"
                  : tabValue === "6"
                  ? "border-l-0 rounded-l-none"
                  : ""
              }  ${tabValue === tab.id ? "bg-paper text-primary-main" : ""}`}
            >
              {tab.label}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start gap-0 w-4/5">
      {
        // render user panel banner
        renderUserPanelBanner()
      }

      {
        // render tabs
        renderTabs()
      }
    </div>
  );
};

export default ProfileTabsContainer;
