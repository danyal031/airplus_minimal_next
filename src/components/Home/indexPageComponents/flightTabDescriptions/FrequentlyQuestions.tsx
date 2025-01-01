"use client";
import { useTheme } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const FrequentlyQuestions = () => {
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
    ];

    return (
      <>
        <div className="grid grid-cols-1 gap-3">
          {questions.map((question) => (
            <>
              <div
                key={question.id}
                className={`${
                  openQuestionId === question.id
                    ? "border border-primary-main"
                    : ""
                } grid grid-cols-1 gap-3 py-3 px-6 bg-paper rounded-xl w-3/4 justify-self-center`}
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
                </div>{" "}
                {openQuestionId === question.id && (
                  <div className="py-3 px-6 bg-main border border-primary-main text-text-main rounded-lg">
                    <span className="text-justify">{question.answer}</span>
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 flex items-center justify-center">
        <span className="text-text-main text-lg font-bold">سوالات متداول</span>
      </div>
      <div className="col-span-12">{renderQuestions()}</div>
    </div>
  );
};

export default FrequentlyQuestions;
