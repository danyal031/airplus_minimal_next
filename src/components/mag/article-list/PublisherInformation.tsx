import Image from "next/image";
import React, { FC } from "react";

interface PublisherInformationProps {
  image: any;
  name: string;
  date: string;
  className?: string;
}

const PublisherInformation: FC<PublisherInformationProps> = ({
  image,
  name,
  date,
  className,
}) => {
  return (
    <div className={`flex items-center justify-start gap-3 ${className}`}>
      <div className="relative aspect-square w-6 h-6">
        <Image
          src={image}
          alt=""
          fill
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
      </div>
      <span className="text-xs font-semibold">{name}</span>
      <span className="text-primary-main text-xs">•</span>
      <span className="text-xs font-light">{date}</span>
    </div>
  );
};

export default PublisherInformation;
