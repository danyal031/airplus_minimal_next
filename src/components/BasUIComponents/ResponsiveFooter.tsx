"use client";
import {
  BottomNavigation,
  Box,
  Divider,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TtyIcon from "@mui/icons-material/Tty";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AttachmentIcon from "@mui/icons-material/Attachment";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import warrantyLottie from "../../../public/assets/lottie/warranty.json";
import Lottie from "lottie-react";
import { ConfigDataType } from "@/DataTypes/globalTypes";
const ResponsiveFooter = () => {
  // initial states
  const [config, setConfig] = React.useState<null | null | ConfigDataType>(
    null
  );
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  // handle initial value
  useEffect(() => {
    setConfig(JSON.parse(localStorage.getItem("minimal_config") as string));
  }, []);
  const renderSlogans = () => {
    const slogans = [
      {
        id: 1,
        cover: warrantyLottie,
        label: "رزرو 100 درصد آنلاین",
      },
      {
        id: 2,
        cover: warrantyLottie,
        label: "گارانتی کمترین قیمت",
      },
      {
        id: 3,
        cover: warrantyLottie,
        label: "پشتیبانی 7/24",
      },
      {
        id: 4,
        cover: warrantyLottie,
        label: "هوش مصنوعی Helpix",
      },
    ];
    return (
      <div className="justify-self-center w-3/4 grid grid-cols-12 gap-5 bg-paper rounded-xl p-3 absolute -top-9">
        {slogans.map((item, index) => {
          const isLastItem = index === slogans?.length - 1;
          return (
            <React.Fragment key={item.id}>
              <div className="col-span-3 grid grid-cols-12 gap-2">
                <div className="col-span-4 flex items-center justify-end">
                  <div className="w-12 h-12 flex items-center justify-end overflow-hidden relative aspect-video">
                    <Lottie animationData={item.cover} loop={true} />
                  </div>
                </div>
                <div className="col-span-8 flex flex-col items-start justify-center gap-1">
                  <span className="text-sm font-semibold text-text-main">
                    {item.label}
                  </span>
                </div>
              </div>
              {/* {!isLastItem && (
                <Divider orientation="vertical" className="col-span-1" />
              )} */}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const customerServicesOptions = [
    {
      id: 1,
      label: "مرکز پشتیبانی آنلاین",
      link: "#",
    },
    {
      id: 2,
      label: "راهنمای خرید",
      link: "#",
    },
    {
      id: 3,
      label: "راهنمای استرداد",
      link: "#",
    },
    {
      id: 4,
      label: "قوانین و مقررات",
      link: "#",
    },
    {
      id: 5,
      label: "پرسش و پاسخ",
      link: "#",
    },
    {
      id: 6,
      label: `مجله ${config?.title.fa}`,
      link: "#",
    },
  ];
  const complementaryInfoOptions = [
    {
      id: 1,
      label: "فروش سازمانی",
      link: "#",
    },
    {
      id: 2,
      label: "همکاری با آژانس‌ها",
      link: "#",
    },
    {
      id: 3,
      label: "فرصت های شغلی",
      link: "#",
    },
    {
      id: 4,
      label: "سنجش رضایتمندی",
      link: "#",
    },
    {
      id: 5,
      label: "درباره ما",
      link: "#",
    },
    {
      id: 5,
      label: "تماس با ما",
      link: "#",
    },
  ];
  const renderAboutAgency = () => {
    return (
      <>
        <div className="text-text-main col-span-4 flex flex-col items-start justify-start gap-4 w-full h-full">
          <div className="flex items-center self-start justify-center w-full">
            {" "}
            <Image
              src={
                (process.env.NEXT_PUBLIC_MEDIA_URL_1 as string) +
                "/media/branches/" +
                config?.design.logo
              }
              alt="logo"
              width={100}
              height={100}
              className="cursor-pointer"
            />
          </div>{" "}
          <div className="flex items-start self-start justify-start gap-1">
            <span className="text-xs font-semibold text-justify leading-7">
              آدرس: {config?.communicational.address.fa}
            </span>
            {/* <span className="text-sm font-semibold">آدرس:</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                config?.communicational.address.fa
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-justify leading-7"
            >
              {config?.communicational.address.fa}
            </a> */}
          </div>
          <div className="flex items-center justify-start gap-1">
            <span className="text-sm font-semibold">تلفن پشتیبانی:</span>
            <a
              href={`tel:${config?.communicational.phone}`}
              className="text-xs font-semibold"
            >
              {config?.communicational.phone.slice(0, 3) +
                "-" +
                config?.communicational.phone.slice(3)}
            </a>
          </div>
          <div className="flex items-center justify-start gap-1">
            <span className="text-sm font-semibold">ایمیل:</span>
            <a
              href={`mailto:${config?.communicational.email}`}
              className="text-xs font-semibold"
            >
              {config?.communicational.email}
            </a>
          </div>
        </div>
      </>
    );
  };
  const renderCustomerServicesSection = () => {
    return (
      <>
        <div className="col-span-2 flex flex-col items-start justify-start gap-5">
          <span className="text-base font-bold text-text-main">
            خدمات مشتریان
          </span>
          <div className="flex flex-col items-center justify-start gap-3">
            {customerServicesOptions.map((item) => {
              return (
                <>
                  <Link
                    href={item.link}
                    key={item.id}
                    className="text-xs text-text-main font-semibold hover:text-primary-main transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  const renderComplementaryInfo = () => {
    return (
      <>
        {" "}
        <div className="col-span-2 flex flex-col items-start justify-start gap-5">
          <span className="text-base font-bold text-text-main">
            اطلاعات تکمیلی
          </span>
          <div className="flex flex-col items-center justify-start gap-3">
            {complementaryInfoOptions.map((item) => {
              return (
                <>
                  <Link
                    href={item.link}
                    key={item.id}
                    className="text-xs text-text-main font-semibold hover:text-primary-main transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  const renderFooterOnDesktop = () => {
    return (
      <>
        {" "}
        <div className="relative hidden md:flex flex-col items-stretch justify-between pt-12 min-w-full min-h-96 border-t-2 border-paper bg-main">
          <div className="grid grid-cols-1 gap-10 container my-7">
            {renderSlogans()}
            <div className="grid grid-cols-12 gap-6 w-full justify-self-center">
              {renderAboutAgency()}
              {renderCustomerServicesSection()}
              {renderComplementaryInfo()}
              <div className="col-span-4 flex flex-col items-stretch justify-between gap-7">
                <div className="w-full flex flex-col items-center justify-start gap-2">
                  <span className="text-text-main text-sm">
                    ایمیل یا شماره موبایل خود را وارد کنید
                  </span>{" "}
                  <TextField
                    className="h-fit w-5/6"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        paddingRight: 0.5,
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          className="mx-0"
                          sx={{
                            padding: 1,
                            margin: 0,
                          }}
                        >
                          <TaskAltIcon className="opacity-70 text-primary-main" />
                        </IconButton>
                      ),
                    }}
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-text-main font-semibold text-sm">
                    به خانواده بزرگ ما بپیوندید
                  </span>{" "}
                  <div className="flex items-center justify-center gap-1">
                    <TelegramIcon
                      fontSize="medium"
                      className="hover:cursor-pointer text-primary-main transition-colors duration-300"
                    />
                    <InstagramIcon
                      fontSize="medium"
                      className="hover:cursor-pointer text-primary-main transition-colors duration-300"
                    />
                  </div>
                </div>
                {config?.communicational?.certificates !== false && (
                  <div
                    dir="ltr"
                    className="col-span-12 grid grid-cols-12 gap-1"
                  >
                    {config?.communicational?.certificates?.map(
                      (item, index) => {
                        return (
                          <>
                            <div
                              dangerouslySetInnerHTML={{ __html: item.content }}
                              className="bg-paper col-span-2 h-14 w-14 border border-divider rounded-lg p-1 flex items-center justify-center"
                            ></div>
                          </>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </div>{" "}
          </div>{" "}
          <div className="flex items-center justify-center w-full bg-primary-main p-2 text-paper">
            <p className="text-xs font-light">
              سوپر اپلیکیشن {config?.title.fa} قدرت گرفته از [{" "}
              <VerifiedIcon fontSize="small" className="text-xs" />{" "}
              <Link href={"https://airplus.app"} target="_blank">
                ایرپلاس
              </Link>{" "}
              ] - © 1403
            </p>
          </div>
        </div>
      </>
    );
  };
  const renderFooterOnMobile = () => {
    return (
      <>
        {" "}
        <Box sx={{ width: "100%" }} className="md:hidden">
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <div
              className="w-full grid grid-cols-1 md:grid-cols-3 px-2 md:px-52"
              style={{
                backgroundImage: `url('/assets/images/footerBanner/footer-poster.png')`,
                backgroundRepeat: "no-repeat",
                overflow: "hidden",
              }}
            >
              <div className="flex flex-col justify-center items-start gap-5">
                <div className="flex items-center justify-center gap-2">
                  <LocationOnIcon fontSize="small" />
                  <span className="text-sm">
                    ایران، اصفهان، بلوار کشاورز، ابتدای کنارگذر شهید میثمی،
                    تعاونی مصرف کارکنان ذوب آهن اصفهان، آژانس مهروماه آسمان
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <TtyIcon fontSize="small" />
                  <span className="text-sm">
                    اصفهان{" "}
                    <a href="tel:03132110" dir="ltr">
                      031-32110
                    </a>
                  </span>
                  <TtyIcon fontSize="small" />
                  <span className="text-sm">
                    تهران{" "}
                    <a href="tel:02191016838" dir="ltr">
                      021-91016838
                    </a>
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <AlternateEmailIcon fontSize="small" />
                  <span className="text-sm">
                    <a href="mail:info@mehromah24.com" dir="ltr">
                      info [at] mehromah24 [dot] com
                    </a>
                  </span>
                </div>
              </div>
              <div className="flex-col justify-center items-start text-xs gap-5 px-10 hidden md:flex">
                <div className="flex gap-1 items-center">
                  <AttachmentIcon />
                  <Link
                    href="https://farasa.cao.ir/sysworkflow/fa/modern/3810212626028ab03488017019616799/6464336316028ab04e3c618028352200.php"
                    target="_blank"
                  >
                    حقوق مسافران
                  </Link>
                </div>
                <div className="flex gap-1 items-center">
                  <AttachmentIcon />{" "}
                  <Link href="http://caa.gov.ir/" target="_blank">
                    سازمان هواپیمایی کشور
                  </Link>
                </div>
                <div className="flex gap-1 items-center">
                  <AttachmentIcon />{" "}
                  <Link
                    href="https://logo.samandehi.ir/Verify.aspx?id=301458&p=xlaoobpdrfthaodsdshwmcsi"
                    target="_blank"
                  >
                    نماد سازماندهی
                  </Link>
                </div>
                <div className="flex gap-1 items-center">
                  <AttachmentIcon />{" "}
                  <Link
                    href="https://mehromah24.ir/api/DeepLink/Refund/V1?language=fa"
                    target="_blank"
                  >
                    سامانه استردادی
                  </Link>
                </div>
              </div>
              <div className="justify-center items-center hidden md:flex">
                <span>
                  <div>
                    <Link href="https://enamad.ir" target="_blank">
                      {/* <Image
                        src={enamad}
                        alt="Enamad Logo"
                        width={100}
                        height={100}
                      /> */}
                      enamad
                    </Link>
                  </div>
                </span>
              </div>
            </div>
          </BottomNavigation>
        </Box>
      </>
    );
  };
  return (
    <>
      {renderFooterOnDesktop()}
      {renderFooterOnMobile()}
    </>
  );
};

export default ResponsiveFooter;
