import React, { FC } from "react";

interface TitleDividerProps {
  label: string;
  icon: any;
}
const TitleDivider: FC<TitleDividerProps> = ({ label, icon }) => {
  return (
    <div className="col-span-12 flex items-center justify-center gap-2">
      {icon}
      <span className="text-base font-semibold text-text-main">{label}</span>
      <div className="relative grow h-px bg-divider rounded-full overflow-hidden"></div>
    </div>
  );
};

export default TitleDivider;
