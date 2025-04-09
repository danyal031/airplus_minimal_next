import "./globals.css";
import "@/styles/custom.css";
import { GlobalContextProvider } from "@/context/store";
import { iranyekanxFonts } from "./theme/localFont";

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
