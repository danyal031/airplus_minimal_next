import "./globals.css";
import "@/styles/custom.css";
import { GlobalContextProvider } from "@/context/store";
import { iranyekanxFonts } from "./theme/localFont";
import { headers } from "next/headers";
import { getConfig } from "@/global-files/axioses";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const host = headers().get("host"); // ex: "example.com"

  // console.log("host:", host);

  // handle get config
  // getConfig()
  //   .then((res: any) => {
  //     localStorage.setItem("minimal_config", JSON.stringify(res));

  //     // setThemeKey(res.design.theme);
  //   })
  //   .catch(() => {});
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
