import Image from "next/image";
import React, { FC } from "react";

const PopularResidence = () => {
  const renderPopularResidences = () => {
    const internalResidences = [
      [
        {
          id: 1,
          label: "درباری",
          cover: "shiraz.jpg",
        },
        {
          id: 2,
          label: "آرامیس",
          cover: "kish.jpg",
        },
      ],
      [
        {
          id: 1,
          label: "شمس",
          cover: "shiraz.jpg",
        },
        {
          id: 2,
          label: "اسپادانا",
          cover: "kish.jpg",
        },
      ],
      [
        {
          id: 3,
          label: "عالی قاپو",
          cover: "esfahan.jpg",
        },
        {
          id: 4,
          label: "پتروشیمی",
          cover: "tabriz.jpg",
        },
      ],
      [
        {
          id: 5,
          label: "سینا",
          cover: "qazvin.jpg",
        },
        {
          id: 6,
          label: "ایرانیان",
          cover: "qazvin.jpg",
        },
      ],
      [
        {
          id: 7,
          label: "مرمر",
          cover: "qazvin.jpg",
        },
        {
          id: 8,
          label: "مینو",
          cover: "qazvin.jpg",
        },
      ],
    ];
    return (
      <>
        <div className="bg-paper overflow-x-auto max-w-full flex items-center justify-start rounded-xl gap-2 p-2">
          {internalResidences.map((item: any[]) => {
            return (
              <>
                {item.map((el: any, index) => {
                  return (
                    <>
                      <RenderImageComponent index={index} element={el} />
                    </>
                  );
                })}
              </>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 flex flex-col items-center justify-center gap-1">
        <span className="text-text-main text-lg font-bold">
          هتل ها و اقامتگاه های محبوب{" "}
        </span>
      </div>

      <div className="col-span-12">{renderPopularResidences()}</div>
    </div>
  );
};
interface RenderImageComponentProps {
  index: number;
  element: any;
}
const RenderImageComponent: FC<RenderImageComponentProps> = ({
  index,
  element,
}) => {
  return (
    <>
      {" "}
      <div
        key={index}
        className={`${
          index % 2 !== 0 ? "-mr-[60px]" : ""
        } aspect-video relative overflow-hidden min-w-60 min-h-36`}
      >
        <span
          className={`h-5 w-20 absolute text-center text-xs font-semibold text-text-main truncate ${
            index % 2 === 0 ? "bottom-0 right-14" : "top-0 right-[105px]"
          } z-[3]`}
        >
          {element.label}
        </span>
        <Image
          style={{
            WebkitMaskImage:
              index % 2 === 0
                ? `url('/assets/images/test/pic2left.svg')`
                : `url('/assets/images/test/pic2right.svg')`,
            WebkitMaskSize: "cover",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskImage:
              index % 2 === 0
                ? `url('/assets/images/test/pic2left.svg')`
                : `url('/assets/images/test/pic2right.svg')`,
            maskSize: "cover",
            maskRepeat: "no-repeat",
            maskPosition: "center",
          }}
          src={`/assets/images/test/residencesCover/${element.cover}`}
          alt={element.label}
          className="object-cover flex-shrink-0"
          fill
        />
      </div>
    </>
  );
};
export default PopularResidence;
