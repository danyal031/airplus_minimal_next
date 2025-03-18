"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import magBanner from "../../../public/assets/images/mag/indexPage/indexPageBanner/mag-banner.svg";
import { Button, Popover } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
interface MagHeaderProps {
  navBarClassName?: string;
  bannerClassName?: string;
}
const MagHeader: FC<MagHeaderProps> = ({
  bannerClassName,
  navBarClassName,
}) => {
  // initial states
  const [moreCategory, setMoreCategory] = useState(null);

  const userMenuClose = () => {
    setMoreCategory(null);
  };

  //   for render banner
  const renderBanner = () => {
    return (
      <>
        <div className="relative w-full min-h-48">
          <Image src={magBanner} alt="" fill className="object-contain" />
        </div>
      </>
    );
  };

  //   for render nav bar
  const renderNavBar = () => {
    const navItems = [
      { label: "صفحه اصلی", id: "1" },
      { label: "ایران گردی", id: "2" },
      { label: "جهان گردی", id: "3" },
      { label: "راهنمای سفر", id: "4" },
      { label: "اخبار سفر", id: "5" },
      { label: "سفر نامه", id: "6" },
    ];
    return (
      <>
        <div
          className={`${navBarClassName} w-full bg-paper p-4 flex items-center justify-between rounded-t-2xl`}
        >
          <div className="flex items-center justify-center gap-5">
            {navItems.map((item, index) => (
              <span
                key={index}
                className="text-sm text-text-main font-semibold"
              >
                {item.label}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <SearchIcon fontSize="medium" color="primary" />
            <Button className="rounded-lg" variant="contained" size="small">
              بازگشت به ایرپلاس
            </Button>
          </div>
          <Popover
            open={Boolean(moreCategory)}
            anchorEl={moreCategory}
            onClose={userMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            classes={{
              paper: "py-8",
            }}
          ></Popover>
        </div>
      </>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-0">
      {renderBanner()}
      {renderNavBar()}
    </div>
  );
};

export default MagHeader;
