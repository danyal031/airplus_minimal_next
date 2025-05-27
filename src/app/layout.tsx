import "./globals.css";
import "@/styles/custom.css";
import { GlobalContextProvider } from "@/context/store";
import { iranyekanxFonts } from "./theme/localFont";
import { headers } from "next/headers";
import { getConfig } from "@/global-files/axioses";

// export async function generateMetadata() {
//   const host = headers().get("host");

//   const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_2 + "/config", {
//     cache: "no-store",
//     headers: {
//       domain: "localhost",
//     },
//   });
//   // if (!res.ok) throw new Error("Failed to fetch config");
//   const data = await res.json();
//   console.log(data);

//   // const { data } = await res.json();
//   // const { post } = data || {};
//   // return { title: `پست ${post.title}` };
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="rtl"
      className={`${iranyekanxFonts.variable} font-sans ss02`}
    >
      <body className={`${iranyekanxFonts.variable} font-sans ss02`}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
