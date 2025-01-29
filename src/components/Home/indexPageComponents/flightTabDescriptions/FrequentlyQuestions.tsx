"use client";
import { Collapse, Fade, useTheme } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
  const theme = useTheme();
  const renderQuestions = () => {
    const questions = [
      {
        id: 1,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
      },
      {
        id: 2,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
      },
      {
        id: 3,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
      },
      {
        id: 4,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
      },
      {
        id: 5,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
      },
      {
        id: 6,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
      },
      {
        id: 7,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
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
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 2,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 3,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 4,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 5,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 6,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 1,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 7,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 8,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 9,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 10,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
    ];
    return (
      <>
        <div className="bg-paper rounded-xl border-2 border-primary-main p-5 pt-16 relative">
          <span className="h-12 text-paper w-fit font-semibold text-base rounded-tab-up absolute top-0 left-1/2 -translate-x-1/2 bg-primary-main flex items-center justify-center truncate">
            همه چیز درباره بلیت هواپیما
          </span>
          <div className="grid grid-cols-1 gap-6 max-h-[490px] overflow-y-auto p-5">
            {questionsList.map((item) => {
              return (
                <>
                  <div
                    key={item.id}
                    className="flex items-center justify-start gap-3"
                  >
                    <div className="h-20 w-20 p-4 rounded-lg bg-gray-200 flex items-center justify-center">
                      image
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
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {" "}
      <div className="hidden md:grid grid-cols-12 gap-0">
        <div className="col-span-5">{renderAboutTicketsSection()}</div>
        <div className="col-span-7">{renderQuestions()}</div>
      </div>
    </>
  );
};
const FrequentlyQuestionsOnMobile = () => {
  // initial states
  const [openQuestionId, setOpenQuestionId] = useState<null | number>(null);
  const theme = useTheme();
  const renderQuestions = () => {
    const questions = [
      {
        id: 1,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
      },
      {
        id: 2,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
      },
      {
        id: 3,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
      },
      {
        id: 4,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
      },
      {
        id: 5,
        question: "چطور میتوانم از خدمات شما استفاده کنم؟",
        answer:
          "برای استفاده از خدمات ما میتوانید از طریق سایت یا اپلیکیشن ما اقدام نمایید.",
      },
    ];
    return (
      <>
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
      </>
    );
  };

  const renderAboutTicketsSection = () => {
    const questionsList = [
      {
        id: 1,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 2,
        question: "تفاوت بلیط‌های چارتر و سیستمی چیست؟",
        answer:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
    ];
    return (
      <>
        <div className="bg-paper rounded-xl px-4 pb-4 grid grid-cols-1 gap-3">
          <div className="flex items-start justify-center">
            <span className="bg-main flex items-center justify-center text-sm text-text-main font-bold px-5 rounded-tab-up-sm h-14">
              همه چیز درباره بلیت هواپیما
            </span>
          </div>
          {questionsList.map((item) => {
            return (
              <>
                <div
                  key={item.id}
                  className="flex items-center justify-start gap-3"
                >
                  <div className="h-20 w-20 p-4 rounded-lg bg-gray-200 flex items-center justify-center">
                    image
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
              </>
            );
          })}
        </div>
      </>
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
