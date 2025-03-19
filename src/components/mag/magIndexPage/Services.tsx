import React from "react";
import TitleDivider from "../TitleDivider";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "خرید و رزرو بلیت هواپیما",
      icon: "",
    },
    {
      id: 2,
      title: "رزرو هتل و اقامتگاه",
      icon: "",
    },
    {
      id: 3,
      title: "خرید و رزرو بلیت اوتوبوس",
      icon: "",
    },
    {
      id: 4,
      title: "خرید و رزرو بلیت قطار",
      icon: "",
    },
    {
      id: 5,
      title: "خرید و رزرو تور",
      icon: "",
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start gap-4 p-4 bg-paper rounded-2xl">
      <TitleDivider label="خدمات" />
      <div className="grid grid-cols-1 gap-3 w-full">
        {services.map((item) => {
          return (
            <div key={item.id} className="flex items-center justify-start">
              <span className="text-text-main font-extrabold text-sm">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
