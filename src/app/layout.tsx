import "./globals.css";
import "@/styles/custom.css";
import { GlobalContextProvider } from "@/context/store";
import { iranyekanxFonts } from "./theme/localFont";
import { headers } from "next/headers";

// export async function generateMetadata() {
//   const host = headers().get("host");

//   const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_2 + "/config", {
//     cache: "no-store",
//     headers: {
//       // domain: "localhost",
//       domain: host as string,
//     },
//     // next: {
//     //   tags: ["config"],
//     // },
//   });
//   // if (!res.ok) throw new Error("Failed to fetch config");
//   const data = await res.json();
//   // console.log(data);

//   return {
//     title: {
//       template: `%s | ${data.brand.fa}`,
//       default: "خرید بلیت هواپیما",
//     },
//     description: data.hub.description,
//     other: {
//       enamad: data.hub.authentication,
//     },
//     icons: {
//       icon: `${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/branches/favicon/${data.design.favicon}`,
//       // shortcut: "icon",
//     },
//   };
// }

// export const metaData = {};



export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <html
      lang="en"
      dir="rtl"
      className={ `${ iranyekanxFonts.variable } font-sans ss02` }
    >
      <body className={ `${ iranyekanxFonts.variable } font-sans ss02` }>
        <GlobalContextProvider>{ children }</GlobalContextProvider>
      </body>
    </html>
  );
}
