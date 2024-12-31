"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  TextField,
  Toolbar,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ResponsiveAppBar = () => {
  // initial states
  const [config, setConfig] = React.useState<any>(
    JSON.parse(localStorage.getItem("minimal_config") as string)
  );

  const router = useRouter();

  const pages = [
    { title: "صفحه نخست", link: "/", target: "_self" },
    {
      title: "پنل سازمانی",
      link: `https://${config?.erp_domain}`,
      target: "_blank",
    },
    { title: "مجله", link: "http://mag.savosh.com", target: "_blank" },
  ];
  return (
    <AppBar position="sticky" className="border-b-2 border-paper">
      <Container maxWidth="lg" className="">
        <Toolbar disableGutters className="grid grid-cols-3">
          <div className="flex items-center justify-start">
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
          <div className="flex items-center justify-center gap-16">
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
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="contained"
              size="medium"
              className="rounded-lg bg-paper text-primary-main font-semibold"
            >
              Helpix
            </Button>
            <Button
              className="rounded-lg"
              color="primary"
              variant="contained"
              size="medium"
            >
              ورود | ثبت نام
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
