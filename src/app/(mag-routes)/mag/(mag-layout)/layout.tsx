import MagHeader from "@/components/mag/MagHeader";
import React, { FC } from "react";

export interface MagLayoutProps {
  children?: React.ReactNode;
}
const MagLayout: FC<MagLayoutProps> = ({ children }) => {
  return (
    <div className="container mt-28 md:mt-24 mb-24 grid grid-cols-1 gap-5">
      <MagHeader />
      {children}
    </div>
  );
};

export default MagLayout;
