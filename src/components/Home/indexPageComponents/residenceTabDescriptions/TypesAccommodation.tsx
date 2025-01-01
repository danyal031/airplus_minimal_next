import React from "react";

const TypesAccommodation = () => {
  const renderTypesOfResidences = () => {
    const residences = [
      { id: 1, title: "هتل", icon: "" },
      { id: 2, title: "خانه و سوییت", icon: "" },
      { id: 3, title: "بومگردی و سنتی", icon: "" },
      { id: 4, title: "هاستل", icon: "" },
      { id: 5, title: "ویلا اجاره ای", icon: "" },
    ];
    return (
      <>
        <div className="w-3/4 flex items-center justify-center gap-3 justify-self-center">
          {residences.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center gap-3 bg-paper p-5 min-w-40 max-w-40 rounded-xl border-2 hover:border-primary-main hover:cursor-pointer"
            >
              {/* icons */}
              <span className="text-text-main text-xs font-bold truncate">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center justify-center">
        <span className="text-text-main text-lg font-bold">
          انواع اقامتگاه{" "}
        </span>
      </div>{" "}
      {renderTypesOfResidences()}
    </div>
  );
};

export default TypesAccommodation;
