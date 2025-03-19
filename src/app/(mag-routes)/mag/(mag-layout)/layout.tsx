import MagSubHeader from "@/components/mag/magIndexPage/MagSubHeader";
import React, { FC } from "react";

export interface MagLayoutProps {
  children?: React.ReactNode;
}
const MagLayout: FC<MagLayoutProps> = ({ children }) => {
  return (
    <div className="container my-24 mt-5 grid grid-cols-1 gap-5">
      <MagSubHeader />
      {children}
    </div>
  );
};

export default MagLayout;
