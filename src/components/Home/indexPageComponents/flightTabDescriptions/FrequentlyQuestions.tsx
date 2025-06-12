"use client";
import { Collapse, Fade, Tooltip, useTheme } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useGlobalContext } from "@/context/store";
import Image from "next/image";
import banner_1 from "../../../../../public/assets/images/test/aboutFlightBanner/banner_1.webp";
import banner_2 from "../../../../../public/assets/images/test/aboutFlightBanner/banner_2.webp";
import banner_3 from "../../../../../public/assets/images/test/aboutFlightBanner/banner_3.webp";
import banner_4 from "../../../../../public/assets/images/test/aboutFlightBanner/banner_4.webp";
import banner_5 from "../../../../../public/assets/images/test/aboutFlightBanner/banner_5.webp";
import banner_6 from "../../../../../public/assets/images/test/aboutFlightBanner/banner_6.webp";
import banner_7 from "../../../../../public/assets/images/test/aboutFlightBanner/banner_7.webp";

const FrequentlyQuestions = () => {
  return (
    <>
      <FrequentlyQuestionsOnDesktop />
      <FrequentlyQuestionsOnMobile />
    </>
  );
};

export default FrequentlyQuestions;

const FrequentlyQuestionsOnDesktop = () => {
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
        question: "رزرو آنلاین بلیط هواپیما هزینه بیشتری از خرید حضوری دارد؟",
        answer:
          "خیر؛ زمانی که از یک سایت معتبر خرید بلیط هواپیما، اقدام به خرید می‌کنید، نه تنها هزینه بیشتری پرداخت نمی‌کنید، حتی ممکن است تخفیف هم بگیرید. ضمنا با خرید آنلاین بلیط هواپیما از پشتیبانی نیز برخودار هستید.",
      },
      {
        id: 5,
        question:
          "آیا پس از خرید اینترنتی بلیط هواپیما امکان استرداد آن وجود دارد؟",
        answer: `وقتی از ${config?.brand.fa} یعنی بهترین سایت خرید بلیط هواپیما ، بلیطتان را رزرو می‌کنید، خیالتان آسوده است که امکان استرداد وجه در صورت کنسل کردن بلیط وجود دارد. میزان جریمه را هم هنگام رزرو آنلاین بلیط هواپیما در قسمت قوانین استرداد بخوانید. میزان جریمه به نوع بلیط، کلاس پروازی، کلاس نرخی و... بستگی دارد.`,
      },
      {
        id: 6,
        question:
          "آیا پس از خرید بلیط هواپیما، امکان تغییر نام یا نام خانوادگی وجود دارد؟",
        answer:
          "در پرواز داخلی یا خارجی، امکان تغییر نام و نام خانوادگی در بلیط سیستمی وجود ندارد. اما در بلیط چارتر، برخی از چارترکننده‌ها این تغییر را می‌پذیرند.",
      },
      {
        id: 7,
        question:
          "هنگامی که از سایت خرید بلیط هواپیما رزرو بلیط را انجام می‌دهیم، امکان انتخاب صندلی مورد نظرمان وجود دارد؟",
        answer:
          "خیر؛ هنگام رزرو بلیط هواپیما داخلی یا خارجی امکان انتخاب صندلی وجود ندارد. البته در زمان چک‌این انتخاب محدوده صندلی امکان‌پذیر است.",
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
        question: `براهنمای خرید بلیط هواپیما از ${config?.brand.fa}`,
        answer: ` یکی از مشکلات همیشگی برای کسانی که اهل سفر هستند فکر کردن به مقدمات سفر است. چمدان بستن، برنامه‌ریزی، فکر کردن به کارهایی که قرار است در طول سفر انجام دهند و چیزهایی مثل رزرو هتل یا خرید بلیط هواپیما. تقریبا همه‌ی ما دوست داریم از همان‌جایی که نشسته‌ایم و با چند کلیک همه اینها را در کسری از ثانیه انجام دهیم بدون اینکه مجبور باشیم زحمت زیادی بکشیم یا از این سر شهر به آن سر شهر برویم. خبر خوب اینکه خرید بلیط هواپیما ${config?.brand.fa} همان راه حل آسانی است که دنبالش هستیم.`,
        cover: banner_4,
      },
      {
        id: 5,
        question: "نکاتی که باید در اولین سفر با هواپیما بدانیم",
        answer:
          "اگر بخواهیم اولین سفر با هواپیما را تجربه کنیم، حتمالا سوال‌های زیادی در سرمان داریم. این سوال‌ها می‌تواند سوال‌هایی کلیدی باشند و وقتی جواب‌شان را فهمیدیم نفسی از سر راحتی بکشیم و بدون دغدغه پرواز کنیم.",
        cover: banner_5,
      },
      {
        id: 6,
        question: "بهترین ایرلاین ‌های ایران کدامند؟",
        answer:
          "برای مسافری که چمدانش را بسته و آماده سفر هوایی است، هیچ‌چیز مهم‌تر از کیفیت و امنیت هواپیما نیست. اصلی‌ترین معیار انتخاب ایرلاین‌ها برای هر مسافری که قصد سفر هوایی داشته باشد، ایمنی و کیفیت پرواز است. از سال ۱۳۴۰ تاکنون، در ناوگان هوایی ایران ۲۱ ایرلاین دولتی و خصوصی مشغول به فعالیت هستند و در مسیرهای پروازی داخلی و خارجی به مسافران خدمت‌رسانی می‌کنند.  بنابراین قبل از خرید بلیط، لازم است مسافران بهترین ایرلاین ‌های ایران را بشناسند. در ادامه این بلاگ درباره بهترین ایرلاین ‌های ایران می‌خوانید.",
        cover: banner_6,
      },
      {
        id: 7,
        question: "بلیط چارتر و همه چیز درباره آن",
        answer:
          "حتما شما هم بارها با اس ام اس پیشنهادهای لحظه آخری مواجه شده‌اید. پیشنهادهایی که وعده سفر و پروازی ارزان‌تر از همیشه‌ را می‌دهند و وسوسه سفر را به جان آدم می‌اندازند. دلیل این ارزانی نیز استفاده از پرواز چارتری است. در حقیقت چارتر اصطلاحی است رایج که موسم سفر که برسد، خیلی آن را می‌شنویم.  به عقیده خیلی‌ها اگر می‌خواهی بلیط هواپیما چارتر گیرت بیاید همیشه باید یک چمدان آماده گوشه خانه داشته باشی و همه چیزت آماده باشد. اما پرواز چارتر چیست و چرا بخش زیادی از پروازهای خطوط هوایی به آن اختصاص دارد؟",
        cover: banner_7,
      },
    ];
    return (
      <>
        <div className="bg-paper rounded-xl border-2 border-primary-main p-5 pt-16 relative">
          <span className="h-12 text-paper w-fit font-semibold text-base rounded-tab-up absolute top-0 left-1/2 -translate-x-1/2 bg-primary-main flex items-center justify-center truncate">
            همه چیز درباره بلیت هواپیما
          </span>
          <div className="grid grid-cols-1 gap-6 max-h-[490px] overflow-y-auto p-5">
            {questionsList.map((item: any) => {
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
      <div className="col-span-5">{renderAboutTicketsSection()}</div>
      <div className="col-span-7">{renderQuestions()}</div>
    </div>
  );
};
const FrequentlyQuestionsOnMobile = () => {
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
        question: "رزرو آنلاین بلیط هواپیما هزینه بیشتری از خرید حضوری دارد؟",
        answer:
          "خیر؛ زمانی که از یک سایت معتبر خرید بلیط هواپیما، اقدام به خرید می‌کنید، نه تنها هزینه بیشتری پرداخت نمی‌کنید، حتی ممکن است تخفیف هم بگیرید. ضمنا با خرید آنلاین بلیط هواپیما از پشتیبانی نیز برخودار هستید.",
      },
      {
        id: 5,
        question:
          "آیا پس از خرید اینترنتی بلیط هواپیما امکان استرداد آن وجود دارد؟",
        answer: `وقتی از ${config?.brand.fa} یعنی بهترین سایت خرید بلیط هواپیما ، بلیطتان را رزرو می‌کنید، خیالتان آسوده است که امکان استرداد وجه در صورت کنسل کردن بلیط وجود دارد. میزان جریمه را هم هنگام رزرو آنلاین بلیط هواپیما در قسمت قوانین استرداد بخوانید. میزان جریمه به نوع بلیط، کلاس پروازی، کلاس نرخی و... بستگی دارد.`,
      },
      {
        id: 6,
        question:
          "آیا پس از خرید بلیط هواپیما، امکان تغییر نام یا نام خانوادگی وجود دارد؟",
        answer:
          "در پرواز داخلی یا خارجی، امکان تغییر نام و نام خانوادگی در بلیط سیستمی وجود ندارد. اما در بلیط چارتر، برخی از چارترکننده‌ها این تغییر را می‌پذیرند.",
      },
      {
        id: 7,
        question:
          "هنگامی که از سایت خرید بلیط هواپیما رزرو بلیط را انجام می‌دهیم، امکان انتخاب صندلی مورد نظرمان وجود دارد؟",
        answer:
          "خیر؛ هنگام رزرو بلیط هواپیما داخلی یا خارجی امکان انتخاب صندلی وجود ندارد. البته در زمان چک‌این انتخاب محدوده صندلی امکان‌پذیر است.",
      },
    ];
    return (
      <div className="bg-main rounded-xl px-4 pb-4 border-4 border-paper grid grid-cols-1 gap-3">
        <div className="flex items-start justify-center">
          <span className="bg-paper flex items-center justify-center text-sm text-primary-main font-bold px-5 rounded-tab-up-sm h-14">
            سوالات متداول
          </span>
        </div>
        {questions.map((question) => (
          <div
            key={question.id}
            className={`${
              openQuestionId === question.id ? "border border-primary-main" : ""
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
        question: `براهنمای خرید بلیط هواپیما از ${config?.brand.fa}`,
        answer: ` یکی از مشکلات همیشگی برای کسانی که اهل سفر هستند فکر کردن به مقدمات سفر است. چمدان بستن، برنامه‌ریزی، فکر کردن به کارهایی که قرار است در طول سفر انجام دهند و چیزهایی مثل رزرو هتل یا خرید بلیط هواپیما. تقریبا همه‌ی ما دوست داریم از همان‌جایی که نشسته‌ایم و با چند کلیک همه اینها را در کسری از ثانیه انجام دهیم بدون اینکه مجبور باشیم زحمت زیادی بکشیم یا از این سر شهر به آن سر شهر برویم. خبر خوب اینکه خرید بلیط هواپیما ${config?.brand.fa} همان راه حل آسانی است که دنبالش هستیم.`,
        cover: banner_4,
      },
      {
        id: 5,
        question: "نکاتی که باید در اولین سفر با هواپیما بدانیم",
        answer:
          "اگر بخواهیم اولین سفر با هواپیما را تجربه کنیم، حتمالا سوال‌های زیادی در سرمان داریم. این سوال‌ها می‌تواند سوال‌هایی کلیدی باشند و وقتی جواب‌شان را فهمیدیم نفسی از سر راحتی بکشیم و بدون دغدغه پرواز کنیم.",
        cover: banner_5,
      },
      {
        id: 6,
        question: "بهترین ایرلاین ‌های ایران کدامند؟",
        answer:
          "برای مسافری که چمدانش را بسته و آماده سفر هوایی است، هیچ‌چیز مهم‌تر از کیفیت و امنیت هواپیما نیست. اصلی‌ترین معیار انتخاب ایرلاین‌ها برای هر مسافری که قصد سفر هوایی داشته باشد، ایمنی و کیفیت پرواز است. از سال ۱۳۴۰ تاکنون، در ناوگان هوایی ایران ۲۱ ایرلاین دولتی و خصوصی مشغول به فعالیت هستند و در مسیرهای پروازی داخلی و خارجی به مسافران خدمت‌رسانی می‌کنند.  بنابراین قبل از خرید بلیط، لازم است مسافران بهترین ایرلاین ‌های ایران را بشناسند. در ادامه این بلاگ درباره بهترین ایرلاین ‌های ایران می‌خوانید.",
        cover: banner_6,
      },
      {
        id: 7,
        question: "بلیط چارتر و همه چیز درباره آن",
        answer:
          "حتما شما هم بارها با اس ام اس پیشنهادهای لحظه آخری مواجه شده‌اید. پیشنهادهایی که وعده سفر و پروازی ارزان‌تر از همیشه‌ را می‌دهند و وسوسه سفر را به جان آدم می‌اندازند. دلیل این ارزانی نیز استفاده از پرواز چارتری است. در حقیقت چارتر اصطلاحی است رایج که موسم سفر که برسد، خیلی آن را می‌شنویم.  به عقیده خیلی‌ها اگر می‌خواهی بلیط هواپیما چارتر گیرت بیاید همیشه باید یک چمدان آماده گوشه خانه داشته باشی و همه چیزت آماده باشد. اما پرواز چارتر چیست و چرا بخش زیادی از پروازهای خطوط هوایی به آن اختصاص دارد؟",
        cover: banner_7,
      },
    ];
    return (
      <div className="bg-paper rounded-xl px-4 pb-4 grid grid-cols-1 gap-3">
        <div className="flex items-start justify-center">
          <span className="bg-main flex items-center justify-center text-sm text-text-main font-bold px-5 rounded-tab-up-sm h-14">
            همه چیز درباره بلیت هواپیما
          </span>
        </div>
        {questionsList.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-start gap-3"
            >
              <div className="h-20 w-20 relative aspect-video p-4 rounded-lg">
                <Image src={item.cover} alt="" fill objectFit="cover" />
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-primary-main font-bold text-sm">
                  {item.question}
                </span>
                <span className="text-text-main text-justify text-xs font-semibold">
                  {item.answer}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="md:hidden grid grid-cols-1 gap-0">
        {renderAboutTicketsSection()}
        {renderQuestions()}
      </div>
    </>
  );
};
