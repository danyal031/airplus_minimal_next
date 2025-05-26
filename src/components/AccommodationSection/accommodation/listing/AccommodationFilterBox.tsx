"use client";
import {
  Checkbox,
  IconButton,
  Rating,
  Slider,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VillaIcon from "@mui/icons-material/Villa";
import HomeIcon from "@mui/icons-material/Home";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { Route } from "next";
const AccommodationFilterBox = () => {
  // initial states
  const [openName, setOpenName] = useState<boolean>(false);
  const [accommodationName, setAccommodationName] = useState<string>("");

  const [openStars, setOpenStars] = useState<boolean>(false);
  const [openRangePrice, setOpenRangePrice] = useState<boolean>(false);
  const [openFacilities, setOpenFacilities] = useState<boolean>(false);
  const [openType, setOpenType] = useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();
  // handle change filter box section
  const handleChangeFilterBoxSections = (section: string) => {
    switch (section) {
      case "name":
        return setOpenName(!openName);
      case "stars":
        return setOpenStars(!openStars);
      case "rangePrice":
        return setOpenRangePrice(!openRangePrice);
      case "facilities":
        return setOpenFacilities(!openFacilities);
      case "type":
        return setOpenType(!openType);
    }
  };

  // handle apply filter box
  const handleApplyFilter = () => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("name", accommodationName);

    const newPath = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPath as Route);
  };

  //   for summery filter
  const renderSummeryFilterData = () => {
    return (
      <>
        <div className="bg-paper p-2 rounded-xl flex items-center justify-between w-full text-sm">
          <span className="text-text-main font-semibold cursor-pointer">
            تعداد نتایج
          </span>
          <span className="text-primary-main font-semibold">حذف فیلتر</span>
        </div>
      </>
    );
  };

  //   for name filter
  const renderName = () => {
    return (
      <>
        {" "}
        <div className="bg-paper p-2 rounded-b-xl md:rounded-xl w-full text-sm grid grid-cols-1 gap-3">
          {" "}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleChangeFilterBoxSections("name")}
          >
            <span className="text-text-main font-semibold cursor-pointer">
              نام هتل
            </span>
            <IconButton size="small">
              {openName ? (
                <CloseIcon className="text-sm" />
              ) : (
                <KeyboardArrowDownIcon className="text-sm" />
              )}
            </IconButton>{" "}
          </div>
          {openName && (
            <div className="flex items-center justify-center gap-1">
              <TextField
                value={accommodationName}
                onChange={(e) => setAccommodationName(e.target.value)}
                className="flex-1"
                size="small"
                label="جستجوی نام هتل"
              />
              <IconButton
                onClick={handleApplyFilter}
                color="primary"
                size="small"
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            </div>
          )}
        </div>
      </>
    );
  };

  //   for stars filter
  const renderStars = () => {
    const BpIcon = styled("span")(({ theme }) => ({
      borderRadius: 6,
      width: 18,
      height: 18,
      boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
      backgroundColor: "#f5f8fa",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
      ".Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: "#ebf1f5",
        ...theme.applyStyles("dark", {
          backgroundColor: "#30404d",
        }),
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
        ...theme.applyStyles("dark", {
          background: "rgba(57,75,89,.5)",
        }),
      },
      ...theme.applyStyles("dark", {
        boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
        backgroundColor: "#394b59",
        backgroundImage:
          "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
      }),
    }));
    const BpCheckedIcon = styled(BpIcon)({
      backgroundColor: theme.palette.primary.main,
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&::before": {
        display: "block",
        width: 18,
        height: 18,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      "input:hover ~ &": {
        backgroundColor: theme.palette.primary.main,
      },
    });
    return (
      <>
        {" "}
        <div className="bg-paper p-2 rounded-b-xl md:rounded-xl w-full text-sm grid grid-cols-1 gap-3">
          <span className="flex items-center justify-center text-text-main font-semibold text-sm">
            به زودی...{" "}
          </span>
          {/* <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleChangeFilterBoxSections("stars")}
          >
            <span className="text-text-main font-semibold cursor-pointer">
              ستاره هتل
            </span>
            <IconButton size="small">
              {openStars ? (
                <CloseIcon className="text-sm" />
              ) : (
                <KeyboardArrowDownIcon className="text-sm" />
              )}
            </IconButton>{" "}
          </div>
          {openStars && (
            <div className="grid grid-cols-1 gap-1">
              <div className="grid grid-cols-8 gap-1">
                <div className="flex items-center justify-center">
                  <Checkbox checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} />
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <span className="text-sm text-text-main">پنج ستاره</span>
                </div>
                <div className="col-span-5 flex items-center justify-start">
                  <Rating dir="ltr" size="small" defaultValue={5} readOnly />
                </div>
              </div>{" "}
              <div className="grid grid-cols-8 gap-1">
                <div className="flex items-center justify-center">
                  <Checkbox checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} />
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <span className="text-sm text-text-main">چهار ستاره</span>
                </div>
                <div className="col-span-5 flex items-center justify-start">
                  <Rating dir="ltr" size="small" defaultValue={4} readOnly />
                </div>
              </div>{" "}
              <div className="grid grid-cols-8 gap-1">
                <div className="flex items-center justify-center">
                  <Checkbox checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} />
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <span className="text-sm text-text-main">سه ستاره</span>
                </div>
                <div className="col-span-5 flex items-center justify-start">
                  <Rating dir="ltr" size="small" defaultValue={3} readOnly />
                </div>
              </div>{" "}
              <div className="grid grid-cols-8 gap-1">
                <div className="flex items-center justify-center">
                  <Checkbox checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} />
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <span className="text-sm text-text-main">دو ستاره</span>
                </div>
                <div className="col-span-5 flex items-center justify-start">
                  <Rating dir="ltr" size="small" defaultValue={2} readOnly />
                </div>
              </div>{" "}
              <div className="grid grid-cols-8 gap-1">
                <div className="flex items-center justify-center">
                  <Checkbox checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} />
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <span className="text-sm text-text-main">یک ستاره</span>
                </div>
                <div className="col-span-5 flex items-center justify-start">
                  <Rating dir="ltr" size="small" defaultValue={1} readOnly />
                </div>
              </div>{" "}
            </div>
          )} */}
        </div>
      </>
    );
  };

  //   for range price
  const renderRangePrice = () => {
    return (
      <>
        {" "}
        <div className="bg-paper p-2 rounded-b-xl md:rounded-xl w-full text-sm grid grid-cols-1 gap-3">
          <span className="flex items-center justify-center text-text-main font-semibold text-sm">
            به زودی...{" "}
          </span>
          {/* <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleChangeFilterBoxSections("rangePrice")}
          >
            <span className="text-text-main font-semibold cursor-pointer">
              بازه قیمتی
            </span>
            <IconButton size="small">
              {openRangePrice ? (
                <CloseIcon className="text-sm" />
              ) : (
                <KeyboardArrowDownIcon className="text-sm" />
              )}
            </IconButton>{" "}
          </div>
          {openRangePrice && (
            <div className="grid grid-cols-1 gap-1">
              <Slider
                size="medium"
                // value={[20, 37]}
                // onChange={handleChange1}
                disableSwap
                min={0}
                max={100}
              />
            </div>
          )} */}
        </div>
      </>
    );
  };

  //   for facilities
  const renderFacilities = () => {
    const BpIcon = styled("span")(({ theme }) => ({
      borderRadius: 6,
      width: 18,
      height: 18,
      boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
      backgroundColor: "#f5f8fa",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
      ".Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: "#ebf1f5",
        ...theme.applyStyles("dark", {
          backgroundColor: "#30404d",
        }),
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
        ...theme.applyStyles("dark", {
          background: "rgba(57,75,89,.5)",
        }),
      },
      ...theme.applyStyles("dark", {
        boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
        backgroundColor: "#394b59",
        backgroundImage:
          "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
      }),
    }));
    const BpCheckedIcon = styled(BpIcon)({
      backgroundColor: theme.palette.primary.main,
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&::before": {
        display: "block",
        width: 18,
        height: 18,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      "input:hover ~ &": {
        backgroundColor: theme.palette.primary.main,
      },
    });
    const data = [
      "پارکنیگ",
      "پارکنیگ",
      "پارکنیگ",
      "پارکنیگ",
      "پارکنیگ",
      "پارکنیگ",
    ];
    return (
      <>
        {" "}
        <div className="bg-paper p-2 rounded-b-xl md:rounded-xl w-full text-sm grid grid-cols-1 gap-3">
          <span className="flex items-center justify-center text-text-main font-semibold text-sm">
            به زودی...{" "}
          </span>{" "}
          {/* <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleChangeFilterBoxSections("facilities")}
          >
            <span className="text-text-main font-semibold cursor-pointer">
              امکانات
            </span>
            <IconButton size="small">
              {openFacilities ? (
                <CloseIcon className="text-sm" />
              ) : (
                <KeyboardArrowDownIcon className="text-sm" />
              )}
            </IconButton>{" "}
          </div>
          {openFacilities && (
            <div className="grid grid-cols-1 gap-1">
              {data.map((item: string, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
                  <Checkbox checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} />
                  <span className="text-text-main text-sm font-semibold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )} */}
        </div>{" "}
      </>
    );
  };

  // for type of accommodation
  const renderType = () => {
    const accommodationType = [
      {
        id: 1,
        label: "هتل",
        icon: <ApartmentIcon fontSize="large" />,
      },
      {
        id: 2,
        label: "سوییت",
        icon: <VillaIcon fontSize="large" />,
      },
      {
        id: 3,
        label: "بوم گردی",
        icon: <HomeIcon fontSize="large" />,
      },
      {
        id: 4,
        label: "آپارتمان",
        icon: <MeetingRoomIcon fontSize="large" />,
      },
    ];
    return (
      <>
        <div className="bg-paper p-2 rounded-b-xl md:rounded-lg w-full text-sm grid grid-cols-1 gap-3">
          <span className="flex items-center justify-center text-text-main font-semibold text-sm">
            به زودی...{" "}
          </span>
          {/* <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleChangeFilterBoxSections("type")}
          >
            <span className="text-text-main font-semibold cursor-pointer">
              نوع اقامتگاه
            </span>
            <IconButton size="small">
              {openType ? (
                <CloseIcon className="text-sm" />
              ) : (
                <KeyboardArrowDownIcon className="text-sm" />
              )}
            </IconButton>{" "}
          </div>
          {openType && (
            <div className="grid grid-cols-4 gap-2">
              {accommodationType.map((item) => (
                <div
                  key={item.id}
                  className={`h-16 bg-main text-text-main p-1 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-px`}
                >
                  <span className="font-semibold text-xs">{item.label}</span>
                  {item.icon}
                </div>
              ))}
            </div>
          )} */}
        </div>
      </>
    );
  };
  // for render on desktop
  const renderFilterContainerOnDesktop = () => {
    return (
      <>
        <div className="hidden md:flex flex-col items-center justify-start gap-2">
          {renderSummeryFilterData()}
          {renderName()}
          {renderStars()}
          {renderRangePrice()}
          {renderFacilities()}
          {renderType()}
        </div>
      </>
    );
  };

  const renderFilterContainerOnMobile = () => {
    return <></>;
  };

  return (
    <>
      {renderFilterContainerOnDesktop()}
      {renderFilterContainerOnMobile()}
    </>
  );
};

export default AccommodationFilterBox;
