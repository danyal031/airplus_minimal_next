import localFont from "next/font/local";
export const iransansFonts = localFont({
    src: [
      {
        path: "../../../public/assets/fonts/iransans/IRANSansXFaNum-Black.woff",
        weight: "900",
      },
      {
        path: "../../../public/assets/fonts/iransans/IRANSansXFaNum-Bold.woff",
        weight: "700",
      },
      {
        path: "../../../public/assets/fonts/iransans/IRANSansXFaNum-DemiBold.woff",
        weight: "600",
      },
      {
        path: "../../../public/assets/fonts/iransans/IRANSansXFaNum-ExtraBold.woff",
        weight: "800",
      },
      {
        path: "../../../public/assets/fonts/iransans/IRANSansXFaNum-Light.woff",
        weight: "300",
      },
      {
        path: "../../../public/assets/fonts/iransans/IRANSansXFaNum-Medium.woff",
        weight: "500",
      },
      {
        path: "../../../public/assets/fonts/iransans/IRANSansXFaNum-Regular.woff",
        weight: "400",
      },
      {
        path: "../../../public/assets/fonts/iransans/IRANSansXFaNum-Thin.woff",
        weight: "100",
      },
      {
        path: "../../../public/assets/fonts/iransans/IRANSansXFaNum-UltraLight.woff",
        weight: "200",
      },
    ],
    variable: "--font-iransans",
  });