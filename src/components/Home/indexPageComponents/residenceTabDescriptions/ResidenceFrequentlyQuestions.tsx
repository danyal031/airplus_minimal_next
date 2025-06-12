"use client";
import { Collapse, useTheme } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useGlobalContext } from "@/context/store";
import accommodation_banner_1 from "../../../../../public/assets/images/test/aboutAccommodationBanner/accommodation_banner_1.webp";
import accommodation_banner_2 from "../../../../../public/assets/images/test/aboutAccommodationBanner/accommodation_banner_2.webp";
import accommodation_banner_3 from "../../../../../public/assets/images/test/aboutAccommodationBanner/accommodation_banner_3.webp";
import accommodation_banner_4 from "../../../../../public/assets/images/test/aboutAccommodationBanner/accommodation_banner_4.webp";
import accommodation_banner_5 from "../../../../../public/assets/images/test/aboutAccommodationBanner/accommodation_banner_5.webp";
import accommodation_banner_6 from "../../../../../public/assets/images/test/aboutAccommodationBanner/accommodation_banner_6.webp";
import Image from "next/image";

const ResidenceFrequentlyQuestions = () => {
  return (
    <>
      <ResidenceFrequentlyQuestionsOnDesktop />
      <ResidenceFrequentlyQuestionsOnMobile />
    </>
  );
};

export default ResidenceFrequentlyQuestions;

// for desktop
const ResidenceFrequentlyQuestionsOnDesktop = () => {
  // initial states
  const [openQuestionId, setOpenQuestionId] = useState<null | number>(null);
  const { config } = useGlobalContext().global;
  const theme = useTheme();
  const renderQuestions = () => {
    const questions = [
      {
        id: 1,
        question:
          "پیش از رزرو هتل، چگونه درباره هتل و فرآیند رزرو آن اطلاعات کسب کنم؟",
        answer: `فرایند انتخاب و رزرو اینترنتی هتل در ${config?.brand.fa} بسیار ساده است. به سادگی و با چند کلیک می توانید با انتخاب مقصد و تاریخ سفر خود، هتل مد نظر خود را با قیمت مناسب رزرو کنید. با این حال در صورت نیاز، مرکز پشتیبانی ${config?.brand.fa} به صورت 24 ساعته پاسخگوی شماست.`,
      },
      {
        id: 2,
        question:
          "هزینه هتل خارجی را چه طور بپردازیم؟ آیا استفاده از کارت‌های شتاب امکان‌پذیر است؟",
        answer: `زمانی که برای رزرو هتل خارجی به وب‌سایت یا اپلیکیشن ${config?.brand.fa} مراجعه می‌کنید، خیالتان از بابت نحوه پرداخت راحت باشد. شما می‌توانید هزینه رزرو هتل را با همین کارت‌های شتاب خودتان بپردازید. به هیچ وجه نیازی به استفاده از کارت‌های اعتباری خارجی نیست.`,
      },
      {
        id: 3,
        question:
          "چه ساعتی می‌توانیم اتاق‌مان را تحویل بگیریم و چه ساعتی باید اتاق را پس بدهیم؟",
        answer:
          "معمولا ورود مسافر به اتاق (چک‌این) در ساعت 14 و خروج مسافر (چک‌اوت) ساعت 12 ظهر است.",
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
        question: `راهنمای رزرو هتل از ${config?.brand.fa}`,
        answer: `یکی از مشکلات همیشگی برای من و شمایی که اهل سفر هستیم و می‌خواهیم در کمترین زمان ممکن همه چیز بر وفق مرادمان پیش برود، پروسه پیچیده رزرو اتاق و هتل است. گاهی شده به سایت‌های مختلف مراجعه کرده‌ایم و ساعت‌ها پشت خط منتظر مانده‌ایم. در آخر هم دست از پا درازتر مجبور شده‌ایم برویم سراغ همان روش‌های سنتی و مراجعه حضوری به آژانس‌ها. حالت دیگرش هم وجود دارد، اینکه رزرو را آنلاین انجام داده‌ایم ولی باز هم یک جای کار می‌لنگد و برای اطلاع از اینکه رزرومان قطعی شده یا نه باید باز هم منتظر بمانیم. حالا اسنپ‌تریپ قاعده را برهم زده است و در این آشفته بازار، رزرو هتل را به صورت قطعی انجام می‌دهد. ${config?.brand.fa} خوب می‌داند که دلتان می‌خواهد همه چیز آسان، بی‌دردسر و ارزان پیش‌ برود و دیگر نیاز نباشد برای رزرو هتل دچار سردرگمی شوید.`,
        cover: accommodation_banner_1,
      },
      {
        id: 2,
        question: "بهترین هتل‌های نزدیک حرم امام رضا (ع) به‌همراه جزئیات و عکس",
        answer: `هتل‌های نزدیک حرم بارگاه امام هشتم شیعیان همیشه از پرطرفدارترین‌ها هستند. هر وقت اراده کنید می‌توانید در حرم باشید و به علاوه متحمل هزینه‌های جانبی مثل هزینه رفت و آمد برای رسیدن به مرکز شهر نمی‌شوید. ما در این پست لیست هتل‌های نزدیک حرم امام رضا (ع) را نوشته‌ایم که انتخاب برایتان آسان‌تر باشد. این هتل‌ها از هتل‌های ۵ ستاره و مجلل تا هتل‌های ۱ ستاره و اقتصادی، که در فاصله چند متری تا یک کیلومتری حرم قرار دارند را شامل می‌شود. با ${config?.brand.fa} همراه باشید.`,
        cover: accommodation_banner_2,
      },
      {
        id: 3,
        question: "بهترین هتل‌های سنتی ایران را بشناسید!",
        answer:
          "گاهی وقت‌ها دلمان می‌خواهد مدل‌های مختلفی از سفر رفتن را امتحان کنیم؛ از تغییر دادن وسیله‌ی مسافرت و امتحان کردن مقاصد گوناگون گرفته، تا رفتن به هتل‌هایی که حس و حال مخصوص به خودشان را دارند. هتل‌های سنتی ایران در شهرهای زیادی پیدا می‌شوند و با قدم گذاشتن به یکی از آن‌ها، سبک زندگی قدیم و حس نوستالژی رفتن به خانه بزرگ‌ترها در فامیل برایتان یادآوری می‌شود. در این مطلب ۱۵ هتل و اقامتگاه سنتی و تاریخی ایران را برایتان لیست کرده‌ایم تا اگر قصد سفر دارید، اقامتی به‌یادماندنی را سپری کنید.",
        cover: accommodation_banner_3,
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
            همه چیز درباره رزرو اقامتگاه
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
    <div className="hidden md:grid grid-cols-12 gap-0">
      {/* <div className="col-span-12 flex items-center justify-center">
      <span className="text-text-main text-lg font-bold">سوالات متداول</span>
    </div> */}
      <div className="col-span-5">{renderAboutTicketsSection()}</div>
      <div className="col-span-7">{renderQuestions()}</div>
    </div>
  );
};

// for mobile
const ResidenceFrequentlyQuestionsOnMobile = () => {
  // initial states
  const [openQuestionId, setOpenQuestionId] = useState<null | number>(null);
  const { config } = useGlobalContext().global;
  const theme = useTheme();
  const renderQuestions = () => {
    const questions = [
      {
        id: 1,
        question:
          "پیش از رزرو هتل، چگونه درباره هتل و فرآیند رزرو آن اطلاعات کسب کنم؟",
        answer: `فرایند انتخاب و رزرو اینترنتی هتل در ${config?.brand.fa} بسیار ساده است. به سادگی و با چند کلیک می توانید با انتخاب مقصد و تاریخ سفر خود، هتل مد نظر خود را با قیمت مناسب رزرو کنید. با این حال در صورت نیاز، مرکز پشتیبانی ${config?.brand.fa} به صورت 24 ساعته پاسخگوی شماست.`,
      },
      {
        id: 2,
        question:
          "هزینه هتل خارجی را چه طور بپردازیم؟ آیا استفاده از کارت‌های شتاب امکان‌پذیر است؟",
        answer: `زمانی که برای رزرو هتل خارجی به وب‌سایت یا اپلیکیشن ${config?.brand.fa} مراجعه می‌کنید، خیالتان از بابت نحوه پرداخت راحت باشد. شما می‌توانید هزینه رزرو هتل را با همین کارت‌های شتاب خودتان بپردازید. به هیچ وجه نیازی به استفاده از کارت‌های اعتباری خارجی نیست.`,
      },
      {
        id: 3,
        question:
          "چه ساعتی می‌توانیم اتاق‌مان را تحویل بگیریم و چه ساعتی باید اتاق را پس بدهیم؟",
        answer:
          "معمولا ورود مسافر به اتاق (چک‌این) در ساعت 14 و خروج مسافر (چک‌اوت) ساعت 12 ظهر است.",
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
      <div className="border-2 border-paper border-r-0 rounded-xl h-auto p-5 pt-16 relative grid grid-cols-1 gap-3">
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
      </div>
    );
  };
  const renderAboutTicketsSection = () => {
    const questionsList = [
      {
        id: 1,
        question: `راهنمای رزرو هتل از ${config?.brand.fa}`,
        answer: `یکی از مشکلات همیشگی برای من و شمایی که اهل سفر هستیم و می‌خواهیم در کمترین زمان ممکن همه چیز بر وفق مرادمان پیش برود، پروسه پیچیده رزرو اتاق و هتل است. گاهی شده به سایت‌های مختلف مراجعه کرده‌ایم و ساعت‌ها پشت خط منتظر مانده‌ایم. در آخر هم دست از پا درازتر مجبور شده‌ایم برویم سراغ همان روش‌های سنتی و مراجعه حضوری به آژانس‌ها. حالت دیگرش هم وجود دارد، اینکه رزرو را آنلاین انجام داده‌ایم ولی باز هم یک جای کار می‌لنگد و برای اطلاع از اینکه رزرومان قطعی شده یا نه باید باز هم منتظر بمانیم. حالا اسنپ‌تریپ قاعده را برهم زده است و در این آشفته بازار، رزرو هتل را به صورت قطعی انجام می‌دهد. ${config?.brand.fa} خوب می‌داند که دلتان می‌خواهد همه چیز آسان، بی‌دردسر و ارزان پیش‌ برود و دیگر نیاز نباشد برای رزرو هتل دچار سردرگمی شوید.`,
        cover: accommodation_banner_1,
      },
      {
        id: 2,
        question: "بهترین هتل‌های نزدیک حرم امام رضا (ع) به‌همراه جزئیات و عکس",
        answer: `هتل‌های نزدیک حرم بارگاه امام هشتم شیعیان همیشه از پرطرفدارترین‌ها هستند. هر وقت اراده کنید می‌توانید در حرم باشید و به علاوه متحمل هزینه‌های جانبی مثل هزینه رفت و آمد برای رسیدن به مرکز شهر نمی‌شوید. ما در این پست لیست هتل‌های نزدیک حرم امام رضا (ع) را نوشته‌ایم که انتخاب برایتان آسان‌تر باشد. این هتل‌ها از هتل‌های ۵ ستاره و مجلل تا هتل‌های ۱ ستاره و اقتصادی، که در فاصله چند متری تا یک کیلومتری حرم قرار دارند را شامل می‌شود. با ${config?.brand.fa} همراه باشید.`,
        cover: accommodation_banner_2,
      },
      {
        id: 3,
        question: "بهترین هتل‌های سنتی ایران را بشناسید!",
        answer:
          "گاهی وقت‌ها دلمان می‌خواهد مدل‌های مختلفی از سفر رفتن را امتحان کنیم؛ از تغییر دادن وسیله‌ی مسافرت و امتحان کردن مقاصد گوناگون گرفته، تا رفتن به هتل‌هایی که حس و حال مخصوص به خودشان را دارند. هتل‌های سنتی ایران در شهرهای زیادی پیدا می‌شوند و با قدم گذاشتن به یکی از آن‌ها، سبک زندگی قدیم و حس نوستالژی رفتن به خانه بزرگ‌ترها در فامیل برایتان یادآوری می‌شود. در این مطلب ۱۵ هتل و اقامتگاه سنتی و تاریخی ایران را برایتان لیست کرده‌ایم تا اگر قصد سفر دارید، اقامتی به‌یادماندنی را سپری کنید.",
        cover: accommodation_banner_3,
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
      <div className="bg-paper rounded-xl border-2 border-primary-main p-5 pt-16 grid grid-cols-1 gap-3 relative">
        <span className="h-12 text-paper w-fit font-semibold text-base rounded-tab-up absolute top-0 left-1/2 -translate-x-1/2 bg-primary-main flex items-center justify-center truncate">
          همه چیز درباره رزرو اقامتگاه
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
    );
  };
  return (
    <div className="md:hidden grid grid-cols-1 gap-0">
      {renderAboutTicketsSection()}
      {renderQuestions()}
    </div>
  );
};
