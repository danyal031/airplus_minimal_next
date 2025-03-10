import React from "react";

const SubCategoryList = () => {
  const subCategoryList = [
    { id: 1, label: "جاذبه های طبیعی", path: "#", icon: "" },
    { id: 2, label: "جاذبه های مدرن", path: "#", icon: "" },
    { id: 3, label: "جاذبه های تاریخی", path: "#", icon: "" },
    { id: 4, label: "جاذبه های خوشمزه", path: "#", icon: "" },
    { id: 5, label: "یادگاری های سفر", path: "#", icon: "" },
  ];
  return (
    <div className="w-4/5 grid grid-cols-5 gap-3">
      {subCategoryList.map((item, index) => (
        <span
          key={index}
          className="bg-paper p-4 font-semibold cursor-pointer hover:text-primary-main border hover:border-primary-main rounded-2xl flex items-center justify-center"
        >
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default SubCategoryList;
