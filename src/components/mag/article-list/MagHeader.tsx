import { Divider, IconButton, Tooltip } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
const MagHeader = () => {
  const headerLinks = [
    { id: 1, label: "خانه", icon: null },
    {
      id: 2,
      label: "ایران گردی",
      icon: (
        <KeyboardArrowDownIcon
          fontSize="medium"
          className="hover:cursor-pointer"
        />
      ),
    },
    {
      id: 3,
      label: "جهان گردی",
      icon: (
        <KeyboardArrowDownIcon
          fontSize="medium"
          className="hover:cursor-pointer"
        />
      ),
    },
    { id: 4, label: "کتاب سفر", icon: null },
    { id: 5, label: "پادکست سفر", icon: null },
    {
      id: 6,
      label: "بیشتر",
      icon: (
        <KeyboardArrowDownIcon
          fontSize="medium"
          className="hover:cursor-pointer"
        />
      ),
    },
  ];
  return (
    <div
      className={`z-[9999] left-0 right-0 min-h-16 fixed top-20 py-2 flex items-stretch justify-center border-b border-divider bg-paper`}
    >
      <div className="w-3/5 min-h-full flex items-center justify-between">
        <div className="h-full flex items-center justify-start gap-10">
          <span className="font-bold text-base">Airplus Mag</span>
          <div className="h-full flex items-center justify-center gap-3">
            {headerLinks.map((item, index) => (
              <>
                <div
                  className="flex items-center justify-center gap-1"
                  key={item.id}
                >
                  {item.icon}
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                {index !== headerLinks.length - 1 && (
                  <div className="w-px min-h-full bg-divider"></div>
                )}{" "}
              </>
            ))}{" "}
          </div>
        </div>
        <Tooltip title="جستجو کنید" placement="right">
          <IconButton>
            <SearchIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default MagHeader;
