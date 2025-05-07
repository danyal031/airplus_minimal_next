"use client";
import { AppBar, Container, Toolbar } from "@mui/material";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AvatarDropdown from "./AvatarDropdown";
import { useGlobalContext } from "@/context/store";

const ResponsiveAppBar = () => {
  // initial states
  const { config } = useGlobalContext().global;

  const router = useRouter();

  const pages = [
    { title: "صفحه نخست", link: "/", target: "_self" },
    { title: "مجله", link: "/mag", target: "_blank" },
    { title: "درباره ما", link: "/about-us", target: "_self" },
  ];
  const renderOnDesktop = () => {
    return (
      <>
        <div
          // position="sticky"
          className="md:block hidden sticky z-20 top-0 border-0 bg-paper" // bg-main
        >
          <Container
            maxWidth="lg"
            className=" bg-paper rounded-tab-up px-6 py-1"
          >
            <Toolbar disableGutters className="grid grid-cols-12">
              <div className="flex items-center justify-start col-span-2">
                <Image
                  src={
                    (process.env.NEXT_PUBLIC_MEDIA_URL_1 as string) +
                    "/media/branches/" +
                    config?.design.logo
                  }
                  alt="logo"
                  width={100}
                  height={100}
                  onClick={() => {
                    router.push("/");
                  }}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-center gap-16 truncate col-span-8">
                {pages.map((page, index) => (
                  <Link
                    key={index}
                    href={page.link}
                    //  passHref
                    target={page.target}
                    className="font-semibold"
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-end gap-3 col-span-2">
                <AvatarDropdown />
              </div>
            </Toolbar>
          </Container>
        </div>
      </>
    );
  };
  const renderOnMobile = () => {
    return (
      <>
        <AppBar
          position="sticky"
          className="bg-main text-primary-main md:hidden"
        >
          <Container
            maxWidth="xl"
            className="flex items-center justify-between min-h-11"
          >
            <span className="text-base font-bold">
              {" "}
              <Image
                src={
                  (process.env.NEXT_PUBLIC_MEDIA_URL_1 as string) +
                  "/media/branches/" +
                  config?.design.logo
                }
                alt="logo"
                width={70}
                height={70}
                className="cursor-pointer"
              />
            </span>
            {/* <span className="text-sm font-semibold">{config?.brand.fa}</span> */}
          </Container>
        </AppBar>
      </>
    );
  };
  return (
    <>
      {renderOnDesktop()}
      {renderOnMobile()}
    </>
  );
};

export default ResponsiveAppBar;
