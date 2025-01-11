import Image from "next/image";
import React from "react";
import notFoundBanner from "../../../public/assets/images/global/404-banner.svg";

const NotFoundPage = () => {
  // render 404 banner
  const render404Banner = () => {
    return (
      <>
        {/* <div
          className="min-h-[220px] w-full"
          style={{
            position: "relative",
            width: "100%",
            backgroundImage: `url('/assets/images/global/404-banner.svg')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            overflow: "hidden", // Hide overflowing content
            backgroundPosition: "bottom center",
          }}
        ></div> */}
        <div className="aspect-video h-[400px] w-full relative">
          <Image alt="" src={notFoundBanner} fill className="object-cover" />
        </div>
      </>
    );
  };

  const renderSuggestedArticles = () => {
    const Articles = [
      {
        id: 1,
        title: "راهنمای خرید ارزان‌ترین بلیط هواپیما",
        description:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 2,
        title: "راهنمای خرید ارزان‌ترین بلیط هواپیما",
        description:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 3,
        title: "راهنمای خرید ارزان‌ترین بلیط هواپیما",
        description:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 4,
        title: "راهنمای خرید ارزان‌ترین بلیط هواپیما",
        description:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
      {
        id: 5,
        title: "راهنمای خرید ارزان‌ترین بلیط هواپیما",
        description:
          "با استفاده از نکات حرفه‌ای، هزینه‌های پرواز خود را کاهش دهید و بهترین زمان برای خرید بلیط را بشناسید.",
        cover: "",
      },
    ];
    return (
      <>
        <div className="w-full bg-paper rounded-xl grid grid-cols-12 gap-14 p-3">
          <div className="col-span-9 grid grid-cols-2 gap-4">
            <div className="relative text-lg font-bold text-primary-main">
              <span className="absolute -top-3 rounded-tab-up bg-main h-[70px] flex items-center justify-center truncate left-1/2 -translate-x-1/2 px-14">
                مقالات پیشنهادی
              </span>
            </div>
            {Articles.map((item) => {
              return (
                <>
                  <div
                    key={item.id}
                    className="col-span-1 flex items-center justify-start gap-2"
                  >
                    <div className="text-text-main text-sm font-semibold flex items-center justify-center h-20 w-28 rounded-xl bg-gray-200">
                      image
                    </div>
                    <div className="flex flex-col items-start justify-center gap-2">
                      <span className="text-text-main font-bold text-sm">
                        {item.title}
                      </span>
                      <span className="text-text-main font-semibold text-xs text-justify">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="col-span-3">
            <div className="bg-primary-main rounded-xl p-4 flex flex-col items-center justify-start gap-3 h-full">
              <div className="w-full flex items-center justify-center p-3 rounded-md bg-paper">
                <span className="text-primary-main text-base font-semibold">
                  برگشتن به صفحه اصلی
                </span>
              </div>
              <div className="w-full flex items-center justify-center">
                <p className="text-sm text-paper font-semibold">
                  لینک های مشابه آنچه جستجو کردید
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-3 container">
      {render404Banner()}
      <div className="flex items-center justify-center">
        <span className="text-primary-main font-bold text-2xl">
          این صفحه پیدا نشد
        </span>
      </div>
      {renderSuggestedArticles()}
    </div>
  );
};

export default NotFoundPage;
