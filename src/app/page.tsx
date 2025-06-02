import HomeComponents from "@/components/Home/HomeComponents";
import { headers } from "next/headers";

import React from "react";

const Home = async () => {
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

  // console.log(data.data.titles.slice(0, 9));

  return <HomeComponents airports={data.data.titles} />;
};

export default Home;
