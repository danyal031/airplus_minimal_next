"use client";
import FinancialListProgress from "@/components/Skelton-Components/profile/financialList/FinancialListProgress";
import { FinancialListDataType } from "@/DataTypes/financial/financialTypes";
import { getFinancialList } from "@/global-files/axioses";
import {
  formatInputWithCommas,
  formatSimpleDateWithSlash,
} from "@/global-files/function";
import { Chip } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import LuggageIcon from "@mui/icons-material/Luggage";
const TransactionsContainer = () => {
  // initial states
  const [financialList, setFinancialList] = useState<
    FinancialListDataType[] | []
  >([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const router = useRouter();

  // handle get financial list
  useEffect(() => {
    setShowLoading(true);
    getFinancialList()
      .then((res: any) => {
        if (res.status) {
          setShowLoading(false);
          setFinancialList(res.data);
        }
      })
      .catch((err) => {
        if (err.status === 511) {
          // handleLogout();
          // setOpenLoginDialog(true);
          setShowLoading(false);
          router.push("/");
        }
      });
  }, []);

  const renderFinancialStatistics = () => {
    return (
      <>
        {" "}
        <div className="border-2 border-main rounded-full grid grid-cols-3 min-h-14 overflow-hidden">
          <div className="col-span-1 grid grid-cols-12 gap-2">
            <div className="col-span-2 rounded-full border-l-4 border-main h-full w-full"></div>
            <div className="col-span-10 flex items-center justify-start">
              <span className="text-text-main text-sm font-bold">
                تحلیل سفر توسط Helpix
              </span>
            </div>
          </div>
          <div className="h-full col-span-2 bg-main rounded-r-full grid grid-cols-3 gap-2">
            <div className="flex items-center justify-start gap-2">
              <span className="h-14 w-14 rounded-full bg-paper border-2 border-main flex items-center justify-center">
                <LuggageIcon color="primary" />
              </span>
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-base text-text-main font-bold">15</span>
                <span className="text-sm font-semibold text-text-main">
                  تعداد سندها{" "}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <span className="h-14 w-14 rounded-full bg-paper flex items-center justify-center">
                <LuggageIcon color="primary" />
              </span>
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-base text-text-main font-bold">15</span>
                <span className="text-sm font-semibold text-text-main">
                  سندهای دریافتی
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <span className="h-14 w-14 rounded-full bg-paper flex items-center justify-center">
                <LuggageIcon color="primary" />
              </span>
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-base text-text-main font-bold">15</span>
                <span className="text-sm font-semibold text-text-main">
                  سندهای پرداختی{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // render Financial list
  const renderFinancialList = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-0 border border-divider rounded-2xl overflow-hidden">
          <div className="bg-main p-4 grid grid-cols-6 gap-2">
            <span className="flex items-center justify-center text-sm font-semibold">
              شماره سند
            </span>
            <span className="flex items-center justify-center text-sm font-semibold">
              مبلغ
            </span>
            <span className="flex items-center justify-center text-sm font-semibold">
              نحوه پرداخت
            </span>
            <span className="flex items-center justify-center text-sm font-semibold">
              تاریخ سند
            </span>
            <span className="flex items-center justify-center text-sm font-semibold">
              نوع سند
            </span>
            <span className="flex items-center justify-center text-sm font-semibold">
              کد پیگیری
            </span>
          </div>
          {showLoading ? (
            Array.from(Array(5)).map((item, index) => {
              return (
                <FinancialListProgress
                  key={index}
                  isLast={index === financialList.length - 1}
                />
              );
            })
          ) : financialList.length === 0 ? (
            <span className="text-text-main text-base">سندی وجود ندارد</span>
          ) : (
            financialList.map((financial, index) => (
              <FinancialCard
                isLast={index === financialList.length - 1}
                financial={financial}
                key={index}
              />
            ))
          )}
        </div>
      </>
    );
  };

  return (
    <div className="bg-paper p-8 rounded-2xl w-full grid grid-cols-1 gap-3">
      {/* render Financial statistics */}
      {renderFinancialStatistics()}

      {/* render Financial list */}
      {renderFinancialList()}
    </div>
  );
};

export default TransactionsContainer;

interface FinancialCardProps {
  financial: FinancialListDataType;
  isLast: boolean;
}
const FinancialCard: FC<FinancialCardProps> = ({ financial, isLast }) => {
  // for type pay options in fa
  const typePayOptions = {
    check: "چک",
    card: "کارت به کارت",
    reference: "حواله",
    coupon: "بن اعتباری",
    contract: "قراردادها",
    cash: "نقد",
    online: "آنلاین",
    gateway: "درگاه آنلاین",
    transfer: "انتقال داخلی",
    pos: "کارتخوان",
    paya: "پایا",
    satna: "ساتنا",
    bridge: "انتقال پل",
  };
  return (
    <>
      <div
        className={`p-4 grid grid-cols-6 gap-2 ${
          !isLast ? "border-b border-divider" : ""
        }`}
      >
        <span className="flex items-center justify-center text-sm font-bold">
          {financial.serial}
        </span>
        <span className="flex items-center justify-center text-sm font-bold">
          {!financial.currency || financial.currency === "IRR"
            ? formatInputWithCommas(
                (financial.amount * (financial.fee ? financial.fee : 1)) / 10
              )
            : formatInputWithCommas(
                financial.amount * (financial.fee ? financial.fee : 1)
              )}
        </span>
        <span className="flex items-center justify-center text-sm font-bold">
          <Chip
            color="primary"
            size="small"
            label={
              typePayOptions[financial.type_pay as keyof typeof typePayOptions]
            }
          />
        </span>
        <span className="flex items-center justify-center text-sm font-bold">
          {formatSimpleDateWithSlash(financial.deadline as string)}
        </span>
        <span className="flex items-center justify-center text-sm font-bold">
          {" "}
          <Chip
            variant="outlined"
            size="small"
            label={financial.type !== "receive" ? "دریافتی" : "پرداختی"}
            color={financial.type !== "receive" ? "success" : "error"}
          />
        </span>
        <span className="flex items-center justify-center text-sm font-bold">
          {financial.tracking_code}
        </span>
      </div>
    </>
  );
};
