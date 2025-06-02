import SearchHeaderReservationContainer from "@/components/global/search/SearchHeaderReservationContainer";
import { headers } from "next/headers";
import React, { FC } from "react";

export interface ListingLayoutProps {
  children?: React.ReactNode;
}
const ListingLayout: FC<ListingLayoutProps> = async ({ children }) => {
  const host = headers().get("host");

  const url = new URL(process.env.NEXT_PUBLIC_BASE_URL_2 + "/base/data");

  url.searchParams.set("action", "airports");
  url.searchParams.set("route", "1");

  const res = await fetch(url.toString(), {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: ["airports"],
    },
    headers: {
      // domain: "localhost",
      domain: host as string,
    },
  });
  const data = await res.json();
  return (
    <div className="md:container max-md:px-4">
      <div className="fixed w-full left-1/2 -translate-x-1/2 md:container max-md:px-4 z-10">
        <SearchHeaderReservationContainer airports={data.data.titles} />
      </div>
      <div className="relative w-full max-md:pb-6 max-md: pt-24 md:pb-24 md:pt-36">
        {children}
      </div>
    </div>
  );
};

export default ListingLayout;
