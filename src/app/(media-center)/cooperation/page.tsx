import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import cooperationBanner from "../../../../public/assets/images/mediaCenter/cooperation-banner.svg";

const page = () => {
  const renderIntroduction = () => {
    return (
      <>
        <div className="flex flex-col items-start justify-start gap-3">
          <span className="text-text-main font-bold text-lg">
            آینده شغلی خود را در ایر پلاس بسازید!
          </span>
          <span className="text-text-main font-semibold text-sm opacity-40 text-justify">
            ما در ایر پلاس به دنبال افرادی باانگیزه، خلاق و مشتاق هستیم تا در
            کنار هم، دنیای بهتری بسازیم. اگر به دنبال محیطی هستید که بتوانید
            استعدادهای خود را شکوفا کنید، با چالش‌های هیجان‌انگیز روبرو شوید و
            در کنار تیمی پویا و حرفه‌ای کار کنید، جای شما اینجاست!
          </span>
        </div>
      </>
    );
  };

  const renderCollaborationFeatures = () => {
    const features = [
      {
        id: 1,
        title: "فرصت رشد و یادگیری",
        icon: "",
      },
      {
        id: 2,
        title: "محیط کاری دوستانه و پویا",
        icon: "",
      },
      {
        id: 3,
        title: "پروژه‌های نوآورانه",
        icon: "",
      },
      {
        id: 4,
        title: "مزایای رقابتی",
        icon: "",
      },
      {
        id: 5,
        title: "مزایای رقابتی",
        icon: "",
      },
    ];
    return (
      <>
        <div className="flex flex-col items-start justify-start gap-3">
          <span className="text-text-main font-bold text-lg">
            چرا ایر پلاس؟{" "}
          </span>{" "}
          <div className="w-full grid grid-cols-5 gap-2">
            {features.map((item) => {
              return (
                <>
                  <div
                    key={item.id}
                    className="flex items-center justify-center p-3 bg-paper rounded-xl border-2 border-primary-main"
                  >
                    <span className="text-text-main text-sm font-semibold">
                      {item.title}
                    </span>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  const renderJobOpportunities = () => {
    return (
      <>
        <div className="flex flex-col items-start justify-start gap-5">
          <span className="text-text-main font-bold text-lg">
            فرصت های شغلی ما{" "}
          </span>{" "}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col items-start justify-start gap-4">
              <div className="flex flex-col items-start justify-start gap-2">
                <span className="text-text-main text-xs font-semibold opacity-40">
                  به تیم ایر پلاس بپیوندید و در زمینه‌های مختلف از جمله:
                </span>
                <div className="flex flex-col items-start justify-start gap-3 pr-3">
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-text-main font-bold">•</span>
                    <span className="text-text-main font-semibold text-sm">
                      فناوری و توسعه نرم‌افزار
                    </span>
                  </div>{" "}
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-text-main font-bold">•</span>
                    <span className="text-text-main font-semibold text-sm">
                      بازاریابی و تبلیغات دیجیتال{" "}
                    </span>
                  </div>{" "}
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-text-main font-bold">•</span>
                    <span className="text-text-main font-semibold text-sm">
                      طراحی و گرافیک{" "}
                    </span>
                  </div>{" "}
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-text-main font-bold">•</span>
                    <span className="text-text-main font-semibold text-sm">
                      مدیریت پروژه{" "}
                    </span>
                  </div>{" "}
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-text-main font-bold">•</span>
                    <span className="text-text-main font-semibold text-sm">
                      پشتیبانی مشتریان{" "}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-text-main opacity-40 text-justify font-semibold text-xs leading-7">
                اگر جایگاه شغلی موردنظر شما در لیست ما نیست، همچنان رزومه خود را
                برای ما ارسال کنید. ما همیشه به دنبال افراد مستعد و توانمند
                هستیم
              </span>
              <div className="w-full flex items-center justify-center">
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className="px-12 py-2 rounded-lg"
                >
                  بارگذاری رزومه
                </Button>
              </div>
            </div>
            <div className="flex items-end justify-center relative aspect-video">
              <Image
                alt=""
                src={cooperationBanner}
                fill
                className="object-contain"
              />{" "}
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="grid grid-cols-1 gap-6">
      <div>{renderIntroduction()}</div>
      <div>{renderCollaborationFeatures()}</div>
      <div>{renderJobOpportunities()}</div>
    </div>
  );
};

export default page;
