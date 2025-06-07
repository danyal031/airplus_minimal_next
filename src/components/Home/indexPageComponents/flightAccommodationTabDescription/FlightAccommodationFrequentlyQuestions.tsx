"use client";
import { useGlobalContext } from "@/context/store";
import React, { useState } from "react";
import { Collapse, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import accommodation_banner_4 from "../../../../../public/assets/images/test/aboutAccommodationBanner/accommodation_banner_4.webp";
import accommodation_banner_5 from "../../../../../public/assets/images/test/aboutAccommodationBanner/accommodation_banner_5.webp";
import banner_1 from "../../../../../public/assets/images/test/aboutFlightBanner/banner_1.webp";
import banner_2 from "../../../../../public/assets/images/test/aboutFlightBanner/banner_2.webp";
import banner_3 from "../../../../../public/assets/images/test/aboutFlightBanner/banner_3.webp";

const FlightAccommodationFrequentlyQuestions = () => {
  // initial states
  const [openQuestionId, setOpenQuestionId] = useState<null | number>(null);
  const { config } = useGlobalContext().global;
  const theme = useTheme();

  const renderQuestions = () => {
    const questions = [
      {
        id: 1,
        question: "چند روز قبل از پرواز، بلیط هواپیما را بخریم؟",
        answer:
          "امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات قیمت بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود. بنابراین در صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط هواپیما را به روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر در ایام پرسفر نظیر تعطیلات را دارید، باید هر چه زودتر رزرو بلیط هواپیما را انجام دهید.",
      },
      {
        id: 2,
        question: "در هر پرواز، میزان بار مجاز چقدر است؟",
        answer:
          "میزان مجاز بار به کلاس پرواز و کلاس نرخی بلیط بستگی دارد. هنگام خرید آنلاین بلیط هواپیما می‌توانید میزان بار مجاز را در اطلاعات بلیط ببینید. طبیعی است که اگر میزان بارتان بیش از حد مجاز باشد، باید جریمه پرداخت کنید.",
      },
      {
        id: 3,
        question:
          "نرخ بلیط هواپیما برای نوزادان و کودکان زیر ۱۲ سال چگونه است؟",
        answer:
          "نرخ بلیط کودکان و نوزادان به کلاس پرواز و کلاس نرخی بستگی دارد. به صورت کلی، قیمت بلیط مسافر کودک (2 الی 12 سال) معادل 50 الی 100 درصد بلیط بزرگسال، و قیمت بلیط مسافر نوزاد (تا دو سال) 10 درصد بلیط بزرگسال است. هنگام تهیه بلیط هواپیما به این نکته توجه داشته باشید.",
      },
      {
        id: 4,
        question: "نیم‌شارژ ورود و خروج چیست؟",
        answer:
          "ساعت ورود به هتل ساعت 14 و خروج 12 ظهر است؛ مسافرانی که ورود زودهنگام (حدود ساعت 8 صبح) یا خروج دیرهنگام (حدود ساعت 18 عصر) را دارند، از این گزینه استفاده می‌کنند؛ قیمت نیم‌شارژ معمولا نصف رزرو یک شب است. با این حال این هزینه توسط هتل تعیین می‌شود و از هتلی به هتل دیگر می‌تواند متفاوت باشد.",
      },
      {
        id: 5,
        question: "کودکان تا چه سنی رایگان پذیرش می‌شوند و تخت آنها چگونه است؟",
        answer:
          "شرایط سنی کودک برای پذیرش در هتل در قسمت «قوانین» اطلاع‌رسانی شده است.",
      },
      {
        id: 6,
        question:
          "تفاوت اتاق‌ها با هم مانند دبل یا توئین بودن یا جونیور یا امپریال یا حتی سوئیت چیست؟",
        answer:
          "اتاق دبل دو تخت چسبیده‌به‌هم دارد و مناسب زوج‌ها است. اتاق‌های تویین دو تخت سینگل یا جدا از هم دارند. اتاق‌هایی مثل جونیور یا امپریال از نظر متراژ، دیزاین و طبقات نسبت به اتاق‌های استاندارد اتاق‌های باکیفیت‌تری هستند. البته سرویس و خدمات هتل برای همه اتاق‌ها یکسان است.",
      },
      {
        id: 7,
        question: "واچر چیست؟",
        answer: `رسید پرداخت و تاییدیه رزرو اقامتگاه را «واچر» می‌گویند. واچر پس از انجام پرداخت توسط شما از طرف سیستم رزرواسیون ${config?.brand.fa} صادر می‌شود و در اختیار شما قرار می‌گیرد.`,
      },
    ];

    return (
      <>
        <div className="border-2 border-paper border-r-0 rounded-xl h-auto p-5 pt-16 relative">
          <span className="h-12 text-primary-main w-fit font-semibold text-base rounded-tab-up absolute top-0 left-1/2 -translate-x-1/2 bg-paper flex items-center justify-center truncate">
            سوالات متداول
          </span>
          <div className="max-h-[490px] overflow-y-auto grid grid-cols-1 gap-3 p-5">
            {questions.map((question) => (
              <div
                key={question.id}
                className={`${
                  openQuestionId === question.id
                    ? "border border-primary-main"
                    : ""
                } grid grid-cols-1 gap-3 py-4 ${
                  openQuestionId === question.id ? "pb-4" : "pb-1"
                } px-4 bg-paper rounded-xl w-full justify-self-center`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center justify-center gap-4">
                    <span
                      style={{
                        WebkitTextStrokeWidth: "1px",
                        WebkitTextStrokeColor: theme.palette.primary.main,
                      }}
                      className={`${
                        openQuestionId === question.id
                          ? "text-primary-main"
                          : "text-paper"
                      } text-3xl font-bold font-mono`}
                    >
                      {question.id < 10 ? `0${question.id}` : question.id}
                    </span>
                    <div className="flex items-center justify-start">
                      <span className="text-text-main font-bold text-sm">
                        {question.question}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`w-6 h-6 ${
                      openQuestionId === question.id
                        ? "bg-primary-main text-paper"
                        : "bg-paper text-primary-main"
                    } rounded-full flex items-center justify-center cursor-pointer border border-primary-main`}
                    onClick={() =>
                      setOpenQuestionId(
                        openQuestionId === question.id ? null : question.id
                      )
                    }
                  >
                    {openQuestionId === question.id ? (
                      <RemoveIcon fontSize="medium" className="text-paper" />
                    ) : (
                      <AddIcon fontSize="medium" color="primary" />
                    )}
                  </span>
                </div>

                <Collapse
                  in={openQuestionId === question.id}
                  timeout="auto"
                  // unmountOnExit
                >
                  <div className="py-3 px-6 bg-main border border-primary-main text-text-main rounded-lg">
                    <span className="text-justify">{question.answer}</span>
                  </div>
                </Collapse>
              </div>
            ))}
          </div>
        </div>{" "}
      </>
    );
  };

  const renderAboutTicketsSection = () => {
    const questionsList = [
      {
        id: 1,
        question: "چه مراحلی را باید قبل از سوار شدن به هواپیما طی کنیم؟",
        answer:
          "خیلی‌ها با هواپیما سفر کردن را به ساعت‌ها در جاده و قطار بودن ترجیح می‌دهند. ولی سوار هواپیما شدن برای آنهایی که تجربه‌اش را تا به حال نداشته‌اند ممکن است با نگرانی‌هایی همراه باشد. و ما در این نوشته سعی داریم با توضیح مراحل سوار شدن به هواپیما، این نگرانی را برطرف کنیم.",
        cover: banner_1,
      },
      {
        id: 2,
        question: "وزن بار مجاز هواپیما چقدر است؟",
        answer:
          "معمولا لذت سفر از وقتی شروع می‌شود که چمدان‌هایمان را می‌بندیم؛ اما جمع‌کردن بار سفر چندان هم ساده نیست. قوانین انجمن جهانی حمل‌ونقل هوایی می‌گوید که هر فرد یک بار مجاز دارد و نمی‌تواند بیشتر از آن را به داخل هواپیما ببرد. همین موضوع هم برای خیلی‌ها مسئله است و موقع بستن چمدان و جمع کردن وسایل سفرشان، معمولا مجبور به حذف یکی دو قلم می‌شوند. با ما همراه باشید تا نگاهی به قوانین شرکت‌های مختلف هواپیمایی در مورد وزن بار مجاز هواپیما بیاندازیم.",
        cover: banner_2,
      },
      {
        id: 3,
        question: "علت سنگینی سر و سردرد هواپیما چیست و چطور درمان می‌شود؟",
        answer:
          "وقتی قرار است سوار هواپیما بشوید با چه مشکلاتی دست به گریبانید؟ استرس دارید؟ از پرواز می‌ترسید؟ دچار سردرد و سنگینی سر در هواپیما می‌شوید؟ شاید تا پیش از این در نظرمان ترس از پرواز، یکی از شایع‌ترین مشکلات موقع سفر با هواپیما بود، اما تحقیقات جدید نشان داده از هر ۱۲ نفر، یک‌ نفر در هواپیما دچار سردرد و سنگینی سر می‌شود؛ مشکلی که محققان اسمش را «سردرد هواپیما» گذاشته‌اند.",
        cover: banner_3,
      },
      {
        id: 4,
        question: "بهترین هتل‌های ایران را بشناسید!",
        answer:
          "گوشه به گوشه ایران، از قلعه رودخان گیلان تا دخمه‌ باستانی سیراف در بوشهر، از شله مشهدی تا قطاب‌های معروف یزد، از خوابیدن زیر آسمان پرستاره کویر لوت تا ساحل خلیج فارس، همه و همه شور و شوق سفر را در دل مسافران بیدار می‌کند.",
        cover: accommodation_banner_4,
      },
      {
        id: 5,
        question: "اتاق‌های هتل چه فرقی باهم دارند؟",
        answer:
          "لپ‌تاپ را روشن می‌کنیم یا موبایل‌مان را برمی‌داریم. فکر می‌کنیم ۵ دقیقه‌ای هتل رزرو می‌کنیم و کار تمام می‌شود. اما بعد از چند دقیقه گشتن گیج می‌شویم. نمی‌دانیم چه اتاقی انتخاب کنیم و چه نوع اقامتگاهی به‌دردمان می‌خورد. و اصلا اتاق دابل و تویین چیست و چه فرقی با هم دارند. البته ماجرا می‌تواند خیلی ساده‌تر از این باشد.",
        cover: accommodation_banner_5,
      },
      // {
      //   id: 6,
      //   question: "اتاق‌های هتل چه فرقی باهم دارند؟",
      //   answer:
      //     "لپ‌تاپ را روشن می‌کنیم یا موبایل‌مان را برمی‌داریم. فکر می‌کنیم ۵ دقیقه‌ای هتل رزرو می‌کنیم و کار تمام می‌شود. اما بعد از چند دقیقه گشتن گیج می‌شویم. نمی‌دانیم چه اتاقی انتخاب کنیم و چه نوع اقامتگاهی به‌دردمان می‌خورد. و اصلا اتاق دابل و تویین چیست و چه فرقی با هم دارند. البته ماجرا می‌تواند خیلی ساده‌تر از این باشد.",
      //   cover: accommodation_banner_5,
      // },
    ];
    return (
      <>
        <div className="bg-paper rounded-xl border-2 border-primary-main p-5 pt-16 relative">
          <span className="h-12 text-paper w-fit font-semibold text-base rounded-tab-up absolute top-0 left-1/2 -translate-x-1/2 bg-primary-main flex items-center justify-center truncate">
            همه چیز درباره بلیت و اقامتگاه
          </span>
          <div className="grid grid-cols-1 gap-6 max-h-[490px] overflow-y-auto p-5">
            {questionsList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-start gap-3"
                >
                  <div className="relative flex-shrink-0 w-16 h-16 overflow-hidden rounded-xl">
                    <Image
                      src={item.cover}
                      alt=""
                      fill
                      objectFit="cover"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center gap-1">
                    <span className="text-primary-main font-bold text-sm">
                      {item.question}
                    </span>
                    <span className="text-text-main text-justify text-xs font-semibold line-clamp-2">
                      {/* <Tooltip placement="bottom">{item.answer}</Tooltip> */}
                      {item.answer}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-0">
      {/* <div className="col-span-12 flex items-center justify-center">
        <span className="text-text-main text-lg font-bold">سوالات متداول</span>
      </div> */}
      <div className="col-span-5">{renderAboutTicketsSection()}</div>
      <div className="col-span-7">{renderQuestions()}</div>
    </div>
  );
};

export default FlightAccommodationFrequentlyQuestions;
