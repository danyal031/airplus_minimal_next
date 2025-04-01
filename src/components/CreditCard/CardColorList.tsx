import React, { FC } from "react";

interface CardColorListProps {
  toggleCardColor: (color: string) => void;
}
const CardColorList: FC<CardColorListProps> = ({ toggleCardColor }) => {
  const colors = [
    { id: 1, name: "gray", title: "مشکی", bgColor: "bg-gray-600" },
    {
      id: 2,
      name: "blue",
      title: "برنزی",
      bgColor: "bg-blue-600",
    },
    {
      id: 3,
      name: "yellow",
      title: "طلایی",
      bgColor: "bg-yellow-600",
    },
    {
      id: 4,
      name: "teal",
      title: "الماسی",
      bgColor: "bg-teal-600",
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-4">
      {colors.map((color) => (
        <div
          onClick={() => {
            toggleCardColor(color.name);
          }}
          className={`${color.bgColor} cursor-pointer p-3 flex items-center justify-center rounded-xl`}
          key={color.id}
        >
          <span className="text-sm text-paper">{color.title}</span>
        </div>
      ))}
    </div>
  );
};

export default CardColorList;
