import ProfileTabsContainer from "@/components/layouts/profile/ProfileTabsContainer";
import React, { FC } from "react";

export interface ProfileLayoutProps {
  children?: React.ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <div className="md:container max-md:px-4 py-24 flex flex-col items-center justify-start gap-0">
      <ProfileTabsContainer />
      {children}
    </div>
  );
};

export default ProfileLayout;
