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
import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AvatarDropdown from "./AvatarDropdown";
import { ConfigDataType } from "@/DataTypes/globalTypes";

const ResponsiveAppBar = () => {
  // initial states
  const [config, setConfig] = React.useState<null | ConfigDataType>(null);

  // handle initial value
  useEffect(() => {
    setConfig(JSON.parse(localStorage.getItem("minimal_config") as string));
  }, []);

  const router = useRouter();

  const pages = [
    { title: "صفحه نخست", link: "/", target: "_self" },
    {
      title: "پنل سازمانی",
      link: `https://${config?.erp_domain}`,
      target: "_blank",
    },
    { title: "مجله", link: "http://mag.savosh.com", target: "_blank" },
    { title: "درباره ما", link: "/about-us", target: "_self" },
  ];
  return (
    <AppBar position="sticky" className="border-b-2 border-paper">
      <Container maxWidth="lg" className="">
        <Toolbar disableGutters className="grid grid-cols-12">
          <div className="flex items-center justify-start col-span-3">
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
          <div className="flex items-center justify-center gap-16 truncate col-span-6">
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
          <div className="flex items-center justify-end gap-3 col-span-3">
            <Button
              variant="contained"
              size="medium"
              className="rounded-lg bg-paper text-primary-main font-semibold"
            >
              Helpix
            </Button>
            <AvatarDropdown />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
