"use client";
import { CreditCardDataTypes } from "@/DataTypes/creditCard/creditCardTypes";
import React, { FC } from "react";
import IconPlus from "../icons/IconPlus";
import {
  convertMiladiToJalaliDate,
  formatDateWithSlash,
  formatInputWithCommas,
} from "@/global-files/function";
import { Alert, Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { createCreditCard } from "@/global-files/axioses";
import { useGlobalContext } from "@/context/store";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

const colorClasses: any = {
  purple: {
    gradient: "from-purple-500 to-purple-700",
    bg: "bg-purple-900",
  },
  blue: {
    gradient: "from-blue-500 to-blue-700",
    bg: "bg-blue-900",
  },
  red: {
    gradient: "from-red-500 to-red-700",
    bg: "bg-red-900",
  },
  green: {
    gradient: "from-green-500 to-green-700",
    bg: "bg-green-900",
  },
  yellow: {
    gradient: "from-yellow-500 to-yellow-700",
    bg: "bg-yellow-900",
  },
  orange: {
    gradient: "from-orange-500 to-orange-700",
    bg: "bg-orange-900",
  },
  teal: {
    gradient: "from-teal-500 to-teal-700",
    bg: "bg-teal-900",
  },
  cyan: {
    gradient: "from-cyan-500 to-cyan-700",
    bg: "bg-cyan-900",
  },
  pink: {
    gradient: "from-pink-500 to-pink-700",
    bg: "bg-pink-900",
  },
  rose: {
    gradient: "from-rose-500 to-rose-700",
    bg: "bg-rose-900",
  },
  indigo: {
    gradient: "from-indigo-500 to-indigo-700",
    bg: "bg-indigo-900",
  },
  lime: {
    gradient: "from-lime-500 to-lime-700",
    bg: "bg-lime-900",
  },
  amber: {
    gradient: "from-amber-500 to-amber-700",
    bg: "bg-amber-900",
  },
  emerald: {
    gradient: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-900",
  },
  violet: {
    gradient: "from-violet-500 to-violet-700",
    bg: "bg-violet-900",
  },
  fuchsia: {
    gradient: "from-fuchsia-500 to-fuchsia-700",
    bg: "bg-fuchsia-900",
  },
  sky: {
    gradient: "from-sky-500 to-sky-700",
    bg: "bg-sky-900",
  },
  stone: {
    gradient: "from-stone-500 to-stone-700",
    bg: "bg-stone-900",
  },
  neutral: {
    gradient: "from-neutral-500 to-neutral-700",
    bg: "bg-neutral-900",
  },
  gray: {
    gradient: "from-gray-500 to-gray-700",
    bg: "bg-gray-900",
  },
  slate: {
    gradient: "from-slate-500 to-slate-700",
    bg: "bg-slate-900",
  },
  zinc: {
    gradient: "from-zinc-500 to-zinc-700",
    bg: "bg-zinc-900",
  },
};

interface TravelCardProps {
  creditCard: CreditCardDataTypes | null;
  showLoadingCard: boolean;
  helperTextCard: string;
  // baseColor: keyof typeof colorClasses;
  baseColor: string;
}
const TravelCard: FC<TravelCardProps> = ({
  creditCard,
  helperTextCard,
  showLoadingCard,
  baseColor,
}) => {
  // initial states
  const router = useRouter();
  const { userData } = useGlobalContext().userContext;
  const { setShowAlertDetails, setShowProgress } = useGlobalContext().global;
  const { copyToClipboard } = useCopyToClipboard();
  const selectedColor = colorClasses[baseColor] || colorClasses.gray;

  // for create new card
  const createNewCreditCard = () => {
    if (
      userData?.data.first_name_fa &&
      userData?.data.last_name_fa &&
      userData?.data.mobile &&
      userData?.data.national_code
    ) {
      setShowProgress(true);
      createCreditCard(userData.uuid)
        .then((res) => {
          setShowProgress(false);
          setShowAlertDetails({
            alertMessage: "ایجاد کارت اعتباری با موفقیت انجام شد",
            showAlert: true,
            alertType: "success",
          });
        })
        .catch((err) => {
          setShowProgress(false);
          setShowAlertDetails({
            alertMessage: err.response.data.error.message,
            showAlert: true,
            alertType: "error",
          });
          router.refresh();
        });
    } else {
      setShowAlertDetails({
        alertMessage:
          "لطفا برای ایجاد کارت اعتباری با مراجعه به صفحه حساب کاربری خود نسبت به کامل کردن اطلاعات خود اقدام نمایید.",
        alertType: "warning",
        showAlert: true,
        alertDuration: 7000,
      });
    }
  };

  // render card
  const renderCard = () => {
    const numberOfCard = creditCard?.card?.number
      ? creditCard.card.number.match(/.{1,4}/g)?.join(" ")
      : "****************".match(/.{1,4}/g)?.join(" ");

    return (
      <div
        className={`flex flex-col items-center ${
          helperTextCard ? "justify-center" : "justify-between"
        } bg-gradient-to-r ${
          selectedColor.gradient
        } relative rounded-2xl p-5 shadow h-60 w-[450px] overflow-hidden`}
      >
        <div
          className={`absolute -top-8 -right-64 w-full bg-cover bg-center rounded-tl-[150px] rounded-bl-[150px] ${selectedColor.bg} !h-80`}
        ></div>
        {helperTextCard ? (
          <div className="w-full flex items-center justify-center z-[7]">
            <Button
              onClick={createNewCreditCard}
              variant="contained"
              className="rounded-2xl"
            >
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
            <div className="w-full z-10 flex items-center justify-between">
              <div className="text-stone-100 text-sm font-semibold flex items-center justify-center gap-1">
                <span>درصد تخفیف:</span>
                <span className="font-mono">0%</span>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="place-content-center rounded p-1 text-stone-100 shadow-[0_0_2px_0_#bfc9d4] ltr:mr-2 rtl:ml-2"
                >
                  <IconPlus />
                </button>
                <IconButton
                  onClick={() => {
                    if (creditCard) {
                      copyToClipboard(
                        creditCard.card.number,
                        "شماره حساب با موفقیت کپی شد"
                      );
                    }
                  }}
                >
                  <ContentCopyIcon fontSize="small" className="text-white" />
                </IconButton>
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
          <Alert className="w-full rounded-xl" severity="info">
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
          <Alert className="w-full rounded-xl" severity="error">
            وضعیت فعلی کارت اعتباری شما
            <span style={{ color: "red", fontWeight: "bold" }}> غیرفعال </span>
            می‌باشد.
          </Alert>
        );
      case 3:
        return (
          <Alert className="w-full rounded-xl" severity="success">
            وضعیت فعلی کارت اعتباری شما
            <span style={{ color: "green", fontWeight: "bold" }}> فعال </span>
            می‌باشد.
          </Alert>
        );
    }
  };

  // for details credit card
  const renderDetailsCreditCard = () => {
    return (
      <div
        className={`grid grid-cols-1 gap-1 p-2 rounded-md ${selectedColor.bg} bg-opacity-65`}
      >
        <div className="flex items-center justify-center">
          <span className="text-base font-bold text-text-main">
            راهنمای تراول کارت ایرپلاس
          </span>
        </div>
        <div className="grid grid-cols-1 gap-1">
          {guidance.map((item, index) => {
            return (
              <div
                key={index}
                className="rounded-sm bg-paper p-2 flex items-center justify-start"
              >
                <span className="text-xs font-semibold text-text-main truncate">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {showStatusCard()}
      <div className="flex items-center justify-between w-full">
        {renderDetailsCreditCard()}
        {renderCard()}
      </div>
    </div>
  );
};

const guidance = [
  "این کارت بعنوان کارت سفر با عنوان تراول کارت ایرپلاس عرضه میگردد.",
  "شما بعنوان شعبه صادر کننده اجازه دسترسی به موجودی کلی و اطلاعات محرمانه کارت نخواهید داشت.",
  "هزینه صدور و استعلام های ثبت احوال و... معادل 50.000 ریال می باشد.",
  "این کارت بزودی در شبکه وسیعی از خدمات گردشگری فعال خواهد شد.",
  "LendTech ایرپلاس با هدف آسان سازی فرایند خرید و خدمات گردشگری راه اندازی شده است.",
  "بزودی سرویس وام دهی و اعتباری کارت های اعتباری فراهم خواهد شد.",
];

export default TravelCard;
