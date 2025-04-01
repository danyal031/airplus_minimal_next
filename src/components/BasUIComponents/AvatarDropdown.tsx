"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Switch,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
interface Props {
  className?: string;
}
import Divider from "@mui/material/Divider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { LoginDialog } from "../Login/LoginDialog";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import FaceIcon from "@mui/icons-material/Face";
import { useRouter } from "next/navigation";
import PaymentsIcon from "@mui/icons-material/Payments";
import PeopleIcon from "@mui/icons-material/People";
import { useGlobalContext } from "@/context/store";
import useLogOut from "@/hooks/useLogOut";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AvatarDropdown({ className = "" }: Props) {
  // initial states
  const { userData } = useGlobalContext().userContext;
  const { setOpenLoginDialog, openLoginDialog } =
    useGlobalContext().loginContext;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  // const [open, setOpen] = useState(false);
  const theme = useTheme();

  // const toggleMenu = () => {
  //   setOpen((prev) => !prev);
  // };
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  // handle navigate
  const router = useRouter();

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { handleLogout } = useLogOut();
  return (
    <>
      {openLoginDialog && <LoginDialog />}
      {!userData ? (
        <Button
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setOpenLoginDialog(true);
          }}
          className="rounded-lg"
          color="primary"
          variant="contained"
          size="medium"
        >
          ورود | ثبت نام
        </Button>
      ) : (
        <div
          style={{
            width: "200px",
          }}
        >
          <Button
            fullWidth
            onClick={toggleMenu}
            variant="contained"
            color="primary"
            size="medium"
            className={`flex items-center justify-between rounded-lg ${
              open && "rounded-b-none"
            }`}
          >
            حساب کاربری
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              style: {
                width: "200px",
                borderRadius: "8px",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                overflow: "hidden",
              },
            }}
          >
            <List
              component="nav"
              disablePadding
              className="border-x border-primary-main"
            >
              <ListItemButton
                className="cursor-pointer"
                onClick={() => {
                  router.push("/profile/account");
                }}
              >
                <ListItemText
                  primary="کاربر ایرپلاس"
                  primaryTypographyProps={{
                    style: {
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              </ListItemButton>
              <Divider variant="fullWidth" />
              <ListItemButton
                onClick={() => {
                  router.push("/credit-card");
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    style: {
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                    },
                  }}
                  primary="کارت اعتباری"
                />
              </ListItemButton>
              <Divider variant="fullWidth" />
              <ListItemButton className="opacity-30">
                <ListItemText primary="سفرها" />
              </ListItemButton>
              <Divider variant="fullWidth" />
              <ListItemButton className="opacity-30">
                <ListItemText primary="نشان‌ها" />
              </ListItemButton>
              <Divider variant="fullWidth" />
              <ListItemButton className="opacity-30">
                <ListItemText primary="پیام‌ها" />
              </ListItemButton>
              <Divider variant="fullWidth" />
              <ListItemButton className="opacity-30">
                <ListItemText primary="درخواست پشتیبانی" />
              </ListItemButton>
              <Divider variant="fullWidth" />
              <Button
                onClick={() => {
                  handleLogout();
                  handleCloseUserMenu();
                }}
                fullWidth
                variant="contained"
                className="flex items-center justify-center rounded-t-none"
              >
                خروج
              </Button>
            </List>
          </Popover>
        </div>
      )}
    </>
  );
}
