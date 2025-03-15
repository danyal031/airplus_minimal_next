import Image from "next/image";
import React, { FC } from "react";

interface PublisherInformationProps {
  avatar: any;
  name: string;
  date: string;
  className?: string;
}

const PublisherInformation: FC<PublisherInformationProps> = ({
  avatar,
  name,
  date,
  className,
}) => {
  return (
    <div className={`flex items-center justify-start gap-5 ${className}`}>
      <div className="relative w-10 h-10">
        <Image
          src={avatar}
          alt=""
          fill
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
      </div>
      <span className="text-base font-semibold text-text-main opacity-35">
        {name}
      </span>
      <span className="text-base font-semibold text-text-main opacity-35">
        {date}
      </span>
    </div>
  );
};

export default PublisherInformation;
