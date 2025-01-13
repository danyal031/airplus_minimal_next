import React from "react";

const page = () => {
  const renderIntroduction = () => {
    return (
      <>
        <div className="flex flex-col items-start justify-start gap-3">
          <span className="text-text-main font-bold text-lg">
            افتخار می‌کنیم که همراه شما بوده‌ایم!
          </span>
          <span className="text-text-main leading-6 font-semibold opacity-40 text-sm text-justify">
            در آژانس هواپیمایی [نام آژانس]، همواره تلاش کرده‌ایم تا بهترین خدمات
            ممکن را به مسافران عزیزمان ارائه دهیم و در این مسیر، موفقیت‌ها و
            دستاوردهای بسیاری کسب کرده‌ایم. در این صفحه، برخی از مهم‌ترین
            افتخارات و دستاوردهای ما را با شما به اشتراک می‌گذاریم.
          </span>
        </div>
      </>
    );
  };
  const renderAchievements = () => {
    const achievements = [
      { id: 1, title: "تست" },
      { id: 2, title: "تست" },
      { id: 3, title: "تست" },
      { id: 4, title: "تست" },
      { id: 5, title: "تست" },
    ];
    return (
      <>
        <div className="flex flex-col items-start justify-start gap-3">
          <span className="text-text-main font-bold text-base">
            دستاوردهای برجسته ما
          </span>
          <span className="text-primary-main text-sm font-semibold">
            گواهینامه‌ها و استانداردهای بین‌المللی
          </span>
          <div className="grid grid-cols-5 gap-3 w-full">
            {achievements.map((item) => {
              return (
                <>
                  <div
                    key={item.id}
                    className="bg-main rounded-xl p-3 flex items-center justify-center"
                  >
                    {item.title}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  const renderAwards = () => {
    const achievements = [
      { id: 1, title: "تست" },
      { id: 2, title: "تست" },
      { id: 3, title: "تست" },
      { id: 4, title: "تست" },
      { id: 5, title: "تست" },
    ];
    return (
      <>
        <div className="flex flex-col items-start justify-start gap-3">
          <span className="text-primary-main font-bold text-base">
            جوایز و تقدیرنامه‌ها{" "}
          </span>
          <div className="grid grid-cols-5 gap-3 w-full">
            {achievements.map((item) => {
              return (
                <>
                  <div
                    key={item.id}
                    className="bg-main rounded-xl p-3 flex items-center justify-center"
                  >
                    {item.title}
                  </div>
                </>
              );
            })}
          </div>
        </div>{" "}
      </>
    );
  };
  return (
    <div className="grid grid-cols-1 gap-5">
      <div>{renderIntroduction()}</div>
      <div>{renderAchievements()}</div>
      <div>{renderAwards()}</div>
      <div className="flex items-center justify-center">
        <span className="font-bold text-lg text-primary-main">
          ما همچنان به مسیر خود ادامه می‌دهیم تا بهترین تجربه سفر را برای شما
          رقم بزنیم.
        </span>
      </div>
    </div>
  );
};

export default page;
