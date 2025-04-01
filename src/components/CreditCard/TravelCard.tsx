"use client";
import { CreditCardDataTypes } from "@/DataTypes/creditCard/creditCardTypes";
import React, { FC } from "react";
import IconCreditCard from "../icons/IconCreditCard";
import IconPlus from "../icons/IconPlus";
import {
  convertMiladiToJalaliDate,
  formatDateWithSlash,
  formatInputWithCommas,
} from "@/global-files/function";
import { Alert, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface TravelCardProps {
  creditCard: CreditCardDataTypes | null;
  showLoadingCard: boolean;
  helperTextCard: string;
}
const TravelCard: FC<TravelCardProps> = ({
  creditCard,
  helperTextCard,
  showLoadingCard,
}) => {
  // initial states
  const router = useRouter();

  // for create new card
  const createCreditCard = () => {};

  // render card
  const renderCard = () => {
    const numberOfCard = creditCard?.card?.number
      ? creditCard.card.number.match(/.{1,4}/g)?.join(" ")
      : "****************".match(/.{1,4}/g)?.join(" ");

    return (
      <div
        className={`flex flex-col items-center ${
          helperTextCard ? "justify-center" : "justify-between"
        } relative rounded-2xl bg-white p-5 shadow h-60 w-[450px] overflow-hidden before:absolute before:-right-44 before:bottom-0 before:top-0 before:m-auto before:h-96 before:w-96 before:rounded-full before:bg-[#1937cc]`}
        style={{
          background: "linear-gradient(0deg,#00c6fb -227%,#005bea)",
        }}
      >
        {helperTextCard ? (
          <div className="w-full flex items-center justify-center z-[7]">
            {/* <span className="font-bold text-lg text-stone-100">
              {helperTextCard}
            </span> */}
            <Button variant="contained" className="rounded-2xl">
              درخواست صدور کارت اعتباری
            </Button>
          </div>
        ) : (
          <>
            <div className="w-full z-[7] flex items-start justify-between text-stone-100">
              <h5 className="text-xl font-semibold">اعتبار کل</h5>

              <div
                className="relative whitespace-nowrap text-xl"
                style={{ fontFamily: "monospace" }}
              >
                {formatInputWithCommas(50000000)}
              </div>
            </div>
            <div className="w-full z-[7] grid grid-cols-1 gap-1 px-3">
              <div className="flex items-center justify-start">
                <span className="text-stone-100 font-semibold ">
                  {showLoadingCard
                    ? "درحا دریافت اطلاعات"
                    : `${creditCard?.passenger.first_name} ${creditCard?.passenger.last_name}`}
                </span>
              </div>
              <div
                className="text-stone-100 font-semibold text-3xl text-center tracking-[3px]"
                dir="ltr"
                style={{ fontFamily: "monospace" }}
              >
                {numberOfCard}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-base font-semibold text-stone-100">
                    تاریخ انقضا:
                  </span>
                  <span
                    className="text-base font-semibold text-stone-100"
                    style={{ fontFamily: "monospace" }}
                  >
                    {showLoadingCard
                      ? "**/**"
                      : convertMiladiToJalaliDate(
                          formatDateWithSlash(
                            creditCard?.card.expire_date as string
                          )
                        )}
                  </span>
                </div>
                <div
                  className="flex items-center justify-center gap-1"
                  dir="ltr"
                >
                  <span
                    className="text-base font-semibold text-stone-100"
                    style={{ fontFamily: "monospace" }}
                  >
                    CVV2:
                  </span>
                  <span
                    className="text-base font-semibold text-stone-100"
                    style={{ fontFamily: "monospace" }}
                  >
                    {showLoadingCard ? "****" : creditCard?.card.cvv2}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full z-10 flex items-center justify-start">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="place-content-center rounded p-1 text-stone-100 shadow-[0_0_2px_0_#bfc9d4] hover:bg-[#1937cc] ltr:mr-2 rtl:ml-2"
                >
                  <IconPlus />
                </button>
                <button
                  type="button"
                  className="grid place-content-center rounded p-1 text-stone-100 shadow-[0_0_2px_0_#bfc9d4] hover:bg-[#1937cc]"
                >
                  <IconCreditCard />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // for show status card
  const showStatusCard = () => {
    switch (creditCard?.status) {
      case 1:
        return (
          <Alert severity="info">
            وضعیت فعلی کارت شما{" "}
            <span style={{ color: "#1565C0", fontWeight: "bold" }}>
              {" "}
              درحال بررسی
            </span>{" "}
            می‌باشد.
          </Alert>
        );
      case 2:
        return (
          <Alert severity="error">
            وضعیت فعلی کارت اعتباری شما
            <span style={{ color: "red", fontWeight: "bold" }}> غیرفعال </span>
            می‌باشد.
          </Alert>
        );
      case 3:
        return (
          <Alert severity="success">
            وضعیت فعلی کارت اعتباری شما
            <span style={{ color: "green", fontWeight: "bold" }}> فعال </span>
            می‌باشد.
          </Alert>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {showStatusCard()}
      {renderCard()}
    </div>
  );
};

export default TravelCard;
