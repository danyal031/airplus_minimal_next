import Image from "next/image";
import React, { FC, useState } from "react";

const PopularDestinations = () => {
  // initial states
  const [destinationsTab, setDestinationsTab] = useState<string>("1");

  const handleChangeTab = (tabValue: string) => {
    setDestinationsTab(tabValue);
  };

  const renderTab = () => {
    const tabList = [
      {
        id: "1",
        label: "داخلی",
      },
      {
        id: "2",
        label: "خارجی",
      },
    ];
    return (
      <>
        <div className="grid grid-cols-2 gap-0 bg-paper rounded-full min-w-72 p-0 overflow-hidden">
          {tabList.map((tab) => {
            const isActive = destinationsTab === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => handleChangeTab(tab.id)}
                className={`h-9 hover:cursor-pointer col-span-1 flex items-center justify-center font-semibold  ${
                  isActive
                    ? "bg-primary-main text-paper z-[1]"
                    : "text-primary-main bg-paper z-[0]"
                } ${
                  destinationsTab === "1"
                    ? "rounded-r-none border-r-0 rounded-tab-down-sm -ml-4"
                    : "rounded-l-none border-l-0 rounded-tab-up-sm -mr-4"
                }`}
              >
                {tab.label}
              </span>
            );
          })}
        </div>
      </>
    );
  };

  const renderInternalDestinationsTabContent = () => {
    const internalResidences = [
      [
        {
          id: 1,
          label: "هتل های شیراز",
          cover: "shiraz.jpg",
        },
        {
          id: 2,
          label: "هتل های کیش",
          cover: "kish.jpg",
        },
      ],
      [
        {
          id: 1,
          label: "هتل های شیراز",
          cover: "shiraz.jpg",
        },
        {
          id: 2,
          label: "هتل های کیش",
          cover: "kish.jpg",
        },
      ],
      [
        {
          id: 3,
          label: "هتل های اصفهان",
          cover: "esfahan.jpg",
        },
        {
          id: 4,
          label: "هتل های تبریز",
          cover: "tabriz.jpg",
        },
      ],
      [
        {
          id: 5,
          label: "هتل های قزوین",
          cover: "qazvin.jpg",
        },
        {
          id: 6,
          label: "هتل های قزوین",
          cover: "qazvin.jpg",
        },
      ],
      [
        {
          id: 7,
          label: "هتل های قزوین",
          cover: "qazvin.jpg",
        },
        {
          id: 8,
          label: "هتل های قزوین",
          cover: "qazvin.jpg",
        },
      ],
    ];
    return (
      <>
        <div className="bg-paper overflow-x-auto max-w-full flex items-center justify-start rounded-xl gap-2 p-2">
          {internalResidences.map((item: any[]) => {
            return item.map((el: any, index) => {
              return (
                <RenderImageComponent index={index} element={el} key={index} />
              );
            });
          })}
        </div>
      </>
    );
  };
  const renderForeignerDestinationsTabContent = () => {
    return <></>;
  };

  const renderDestinationsTabContent = () => {
    switch (destinationsTab) {
      case "1":
        return <>{renderInternalDestinationsTabContent()}</>;
      case "2":
        return renderInternalDestinationsTabContent();

      // return renderForeignerDestinationsTabContent();
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 flex flex-col items-center justify-center gap-1">
        <span className="text-text-main text-lg font-bold">
          مقصدهای پرطرفدار
        </span>
        <span className="text-text-main text-sm font-semibold">
          خارجی/داخلی{" "}
        </span>
      </div>
      <div className="col-span-12 flex items-center justify-center">
        {renderTab()}
      </div>
      <div className="col-span-12">{renderDestinationsTabContent()}</div>
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
            index % 2 === 0 ? "top-0 right-14" : "bottom-0 right-[105px]"
          } z-[3]`}
        >
          {element.label}
        </span>
        <Image
          style={{
            WebkitMaskImage:
              index % 2 !== 0
                ? `url('/assets/images/test/pic2up.svg')`
                : `url('/assets/images/test/pic2bottom.svg')`,
            WebkitMaskSize: "cover",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskImage:
              index % 2 !== 0
                ? `url('/assets/images/test/pic2up.svg')`
                : `url('/assets/images/test/pic2bottom.svg')`,
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
export default PopularDestinations;
