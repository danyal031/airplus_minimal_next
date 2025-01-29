import React from "react";

const FlightDescription = () => {
  return (
    <>
      <FlightDescriptionOnDesktop />
      <FlightDescriptionOnMobile />
    </>
  );
};

export default FlightDescription;

const FlightDescriptionOnDesktop = () => {
  const renderAboutFlightTickets = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-center">
            <span className="text-text-main text-lg font-bold">
              بلیط هواپیما
            </span>
          </div>
          <p className="text-text-main text-justify text-sm font-semibold leading-7">
            مهروماه یکی از معتبرترین و بزرگ‌ترین پلتفرم‌های خرید بلیط هواپیما،
            قطار و اتوبوس در ایران است که به کاربران خود این امکان را می‌دهد تا
            به راحتی بلیط سفر خود را، چه داخلی و چه خارجی، به صورت آنلاین
            خریداری کنند. این پلتفرم از ابتدا با هدف ارائه خدمات آسان و سریع
            برای مسافران فعالیت خود را آغاز کرده و توانسته است رضایت قابل توجهی
            از مشتریان خود جلب کند. با خدمات مهروماه، شما می‌توانید سفرهای داخلی
            و بین‌المللی خود را با اطمینان و در کمترین زمان ممکن برنامه‌ریزی
            کنید.
          </p>
          <div className="grid grid-cols-12 gap-14">
            <div className="col-span-6 grid grid-cols-1 gap-2 text-text-main">
              <div className="flex items-center justify-center">
                <span className="text-lg font-bold">بلیط هواپیما داخلی</span>
              </div>
              <p className="text-justify text-sm font-semibold leading-7">
                مهروماه به شما این امکان را می‌دهد که بلیط پروازهای داخلی خود را
                از ایرلاین‌های مختلف ایرانی نظیر ماهان، ایران ایر، کیش ایر، قشم
                ایر، و دیگر ایرلاین‌های معتبر خریداری کنید. این ایرلاین‌ها با
                ویژگی‌ها و خدمات مختلفی ارائه می‌دهند، از جمله قیمت‌های رقابتی و
                امکانات رفاهی متفاوت که بسته به نیاز شما می‌توانید بهترین انتخاب
                را داشته باشید.
              </p>
            </div>
            <div className="col-span-6 grid grid-cols-1 gap-2 text-text-main">
              <div className="flex items-center justify-center">
                <span className="text-lg font-bold">بلیط هواپیما خارجی</span>
              </div>
              <p className="text-justify text-sm font-semibold leading-7">
                اگر قصد سفر به کشورهای دیگر را دارید، مهروماه این امکان را به
                شما می‌دهد که بلیط پروازهای خارجی از ایرلاین‌های بین‌المللی
                معتبر مانند ترکیش ایرلاینز، قطر ایرویز، امارات و دیگر
                ایرلاین‌های معروف جهانی را رزرو کنید. برای سفرهای خارجی،
                مهروماهبه شما این اطمینان را می‌دهد که بلیط‌هایی با قیمت‌های
                مناسب و پروازی امن در اختیارتان قرار دهد.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderPurchaseBenefits = () => {
    const benefits = [
      {
        id: 1,
        title: "دسترسی آسان",
        icon: "",
        description:
          "مهروماه به شما این امکان را می‌دهد که بلیط پروازهای داخلی خود را از ایرلاین‌های مختلف ایرانی نظیر ماهان، ایران ایر، کیش ایر، قشم ایر، و دیگر  ایرلاین‌های معتبر خریداری کنید. این ایرلاین‌ها با ویژگی‌ها و خدمات  مختلفی ارائه می‌دهند، از جمله قیمت‌های رقابتی و امکانات رفاهی متفاوت که  بسته به نیاز شما می‌توانید بهترین انتخاب را داشته باشید.",
      },
      {
        id: 2,
        title: "تقویم قیمتی",
        icon: "",
        description:
          "مهروماه به شما این امکان را می‌دهد که بلیط پروازهای داخلی خود را از ایرلاین‌های مختلف ایرانی نظیر ماهان، ایران ایر، کیش ایر، قشم ایر، و دیگر  ایرلاین‌های معتبر خریداری کنید. این ایرلاین‌ها با ویژگی‌ها و خدمات  مختلفی ارائه می‌دهند، از جمله قیمت‌های رقابتی و امکانات رفاهی متفاوت که  بسته به نیاز شما می‌توانید بهترین انتخاب را داشته باشید.",
      },
      {
        id: 3,
        title: "پرداخت آنلاین امن",
        icon: "",
        description:
          "مهروماه به شما این امکان را می‌دهد که بلیط پروازهای داخلی خود را از ایرلاین‌های مختلف ایرانی نظیر ماهان، ایران ایر، کیش ایر، قشم ایر، و دیگر  ایرلاین‌های معتبر خریداری کنید. این ایرلاین‌ها با ویژگی‌ها و خدمات  مختلفی ارائه می‌دهند، از جمله قیمت‌های رقابتی و امکانات رفاهی متفاوت که  بسته به نیاز شما می‌توانید بهترین انتخاب را داشته باشید.",
      },
      {
        id: 4,
        title: "استرداد آنلاین بلیت",
        icon: "",
        description:
          "مهروماه به شما این امکان را می‌دهد که بلیط پروازهای داخلی خود را از ایرلاین‌های مختلف ایرانی نظیر ماهان، ایران ایر، کیش ایر، قشم ایر، و دیگر  ایرلاین‌های معتبر خریداری کنید. این ایرلاین‌ها با ویژگی‌ها و خدمات  مختلفی ارائه می‌دهند، از جمله قیمت‌های رقابتی و امکانات رفاهی متفاوت که  بسته به نیاز شما می‌توانید بهترین انتخاب را داشته باشید.",
      },
      {
        id: 5,
        title: "هوش مصنوعی [Helpix]",
        icon: "",
        description:
          "مهروماه یکی از معتبرترین و بزرگ‌ترین پلتفرم‌های خرید بلیط هواپیما، قطار و اتوبوس در ایران است که به کاربران خود این امکان را می‌دهد تا به راحتی  بلیط سفر خود را، چه داخلی و چه خارجی، به صورت آنلاین خریداری کنند. این  پلتفرم از ابتدا با هدف ارائه خدمات آسان و سریع برای مسافران فعالیت خود  را آغاز کرده و توانسته است رضایت قابل توجهی از مشتریان خود جلب کند. با  خدمات مهروماه، شما می‌توانید سفرهای داخلی و بین‌المللی خود را با اطمینان و در کمترین زمان ممکن برنامه‌ریزی کنید.",
      },
    ];
    return (
      <>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-center">
            <span className="text-text-main text-lg font-bold">
              مزایای خرید هواپیما از ههروماه{" "}
            </span>
          </div>
          <div className="w-3/4 flex items-center justify-center gap-3 justify-self-center">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="flex items-center justify-center gap-3 bg-paper p-5 min-w-40 max-w-40 rounded-xl border-2 hover:border-primary-main hover:cursor-pointer"
              >
                {/* icons */}
                <span className="text-text-main text-xs font-bold truncate">
                  {benefit.title}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-14">
            {benefits.map((benefit) => (
              <>
                <div
                  className={`${
                    benefit.id === 5 ? "col-span-2" : "col-span-1"
                  } grid grid-cols-1 gap-2 text-text-main`}
                >
                  <div className="flex items-center justify-center">
                    <span className="text-lg font-bold">{benefit.title} </span>
                  </div>
                  <p className="text-justify text-sm font-semibold leading-7">
                    {benefit.description}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {" "}
      <div
        className="hidden md:grid grid-cols-1 gap-8"
        style={{
          backgroundImage: `url('/assets/images/flightSection/flight-description-banner.svg')`,
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        {renderAboutFlightTickets()}
        {renderPurchaseBenefits()}
      </div>
    </>
  );
};

const FlightDescriptionOnMobile = () => {
  // for render renderAboutFlightTickets
  const renderAboutFlightTickets = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-2 text-text-main">
            <div className="flex items-center justify-center">
              <span className="text-text-main text-lg font-bold">
                بلیط هواپیما
              </span>
            </div>
            <p className="text-text-main text-justify text-sm font-semibold leading-7">
              مهروماه یکی از معتبرترین و بزرگ‌ترین پلتفرم‌های خرید بلیط هواپیما،
              قطار و اتوبوس در ایران است که به کاربران خود این امکان را می‌دهد
              تا به راحتی بلیط سفر خود را، چه داخلی و چه خارجی، به صورت آنلاین
              خریداری کنند. این پلتفرم از ابتدا با هدف ارائه خدمات آسان و سریع
              برای مسافران فعالیت خود را آغاز کرده و توانسته است رضایت قابل
              توجهی از مشتریان خود جلب کند. با خدمات مهروماه، شما می‌توانید
              سفرهای داخلی و بین‌المللی خود را با اطمینان و در کمترین زمان ممکن
              برنامه‌ریزی کنید.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 text-text-main">
            <div className="flex items-center justify-center">
              <span className="text-lg font-bold">بلیط هواپیما داخلی</span>
            </div>
            <p className="text-justify text-sm font-semibold leading-7">
              مهروماه به شما این امکان را می‌دهد که بلیط پروازهای داخلی خود را
              از ایرلاین‌های مختلف ایرانی نظیر ماهان، ایران ایر، کیش ایر، قشم
              ایر، و دیگر ایرلاین‌های معتبر خریداری کنید. این ایرلاین‌ها با
              ویژگی‌ها و خدمات مختلفی ارائه می‌دهند، از جمله قیمت‌های رقابتی و
              امکانات رفاهی متفاوت که بسته به نیاز شما می‌توانید بهترین انتخاب
              را داشته باشید.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 text-text-main">
            <div className="flex items-center justify-center">
              <span className="text-lg font-bold">بلیط هواپیما خارجی</span>
            </div>
            <p className="text-justify text-sm font-semibold leading-7">
              اگر قصد سفر به کشورهای دیگر را دارید، مهروماه این امکان را به شما
              می‌دهد که بلیط پروازهای خارجی از ایرلاین‌های بین‌المللی معتبر
              مانند ترکیش ایرلاینز، قطر ایرویز، امارات و دیگر ایرلاین‌های معروف
              جهانی را رزرو کنید. برای سفرهای خارجی، مهروماهبه شما این اطمینان
              را می‌دهد که بلیط‌هایی با قیمت‌های مناسب و پروازی امن در اختیارتان
              قرار دهد.
            </p>
          </div>
        </div>
      </>
    );
  };

  // for render renderPurchaseBenefits
  const renderPurchaseBenefits = () => {
    const benefits = [
      {
        id: 1,
        title: "دسترسی آسان",
        icon: "",
        description:
          "مهروماه به شما این امکان را می‌دهد که بلیط پروازهای داخلی خود را از ایرلاین‌های مختلف ایرانی نظیر ماهان، ایران ایر، کیش ایر، قشم ایر، و دیگر  ایرلاین‌های معتبر خریداری کنید. این ایرلاین‌ها با ویژگی‌ها و خدمات  مختلفی ارائه می‌دهند، از جمله قیمت‌های رقابتی و امکانات رفاهی متفاوت که  بسته به نیاز شما می‌توانید بهترین انتخاب را داشته باشید.",
      },
      {
        id: 2,
        title: "تقویم قیمتی",
        icon: "",
        description:
          "مهروماه به شما این امکان را می‌دهد که بلیط پروازهای داخلی خود را از ایرلاین‌های مختلف ایرانی نظیر ماهان، ایران ایر، کیش ایر، قشم ایر، و دیگر  ایرلاین‌های معتبر خریداری کنید. این ایرلاین‌ها با ویژگی‌ها و خدمات  مختلفی ارائه می‌دهند، از جمله قیمت‌های رقابتی و امکانات رفاهی متفاوت که  بسته به نیاز شما می‌توانید بهترین انتخاب را داشته باشید.",
      },
      {
        id: 3,
        title: "پرداخت آنلاین امن",
        icon: "",
        description:
          "مهروماه به شما این امکان را می‌دهد که بلیط پروازهای داخلی خود را از ایرلاین‌های مختلف ایرانی نظیر ماهان، ایران ایر، کیش ایر، قشم ایر، و دیگر  ایرلاین‌های معتبر خریداری کنید. این ایرلاین‌ها با ویژگی‌ها و خدمات  مختلفی ارائه می‌دهند، از جمله قیمت‌های رقابتی و امکانات رفاهی متفاوت که  بسته به نیاز شما می‌توانید بهترین انتخاب را داشته باشید.",
      },
      {
        id: 4,
        title: "استرداد آنلاین بلیت",
        icon: "",
        description:
          "مهروماه به شما این امکان را می‌دهد که بلیط پروازهای داخلی خود را از ایرلاین‌های مختلف ایرانی نظیر ماهان، ایران ایر، کیش ایر، قشم ایر، و دیگر  ایرلاین‌های معتبر خریداری کنید. این ایرلاین‌ها با ویژگی‌ها و خدمات  مختلفی ارائه می‌دهند، از جمله قیمت‌های رقابتی و امکانات رفاهی متفاوت که  بسته به نیاز شما می‌توانید بهترین انتخاب را داشته باشید.",
      },
      {
        id: 5,
        title: "هوش مصنوعی [Helpix]",
        icon: "",
        description:
          "مهروماه یکی از معتبرترین و بزرگ‌ترین پلتفرم‌های خرید بلیط هواپیما، قطار و اتوبوس در ایران است که به کاربران خود این امکان را می‌دهد تا به راحتی  بلیط سفر خود را، چه داخلی و چه خارجی، به صورت آنلاین خریداری کنند. این  پلتفرم از ابتدا با هدف ارائه خدمات آسان و سریع برای مسافران فعالیت خود  را آغاز کرده و توانسته است رضایت قابل توجهی از مشتریان خود جلب کند. با  خدمات مهروماه، شما می‌توانید سفرهای داخلی و بین‌المللی خود را با اطمینان و در کمترین زمان ممکن برنامه‌ریزی کنید.",
      },
    ];
    return (
      <>
        {" "}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-center">
            <span className="text-text-main text-lg font-bold">
              مزایای خرید هواپیما از ههروماه{" "}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className={`${
                  benefit.id === 5 ? "col-span-2" : "col-span-1"
                } flex items-center justify-center gap-3 bg-paper p-5 rounded-xl border-2 hover:border-primary-main hover:cursor-pointer`}
              >
                {/* icons */}
                <span className="text-text-main text-xs font-bold truncate">
                  {benefit.title}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-14">
            {benefits.map((benefit) => (
              <>
                <div className={`grid grid-cols-1 gap-2 text-text-main`}>
                  <div className="flex items-center justify-center">
                    <span className="text-lg font-bold">{benefit.title} </span>
                  </div>
                  <p className="text-justify text-sm font-semibold leading-7">
                    {benefit.description}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="md:hidden grid grid-cols-1 gap-5">
        {renderAboutFlightTickets()}
        {renderPurchaseBenefits()}
      </div>
    </>
  );
};
