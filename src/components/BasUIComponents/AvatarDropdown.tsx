"use client";
import React, { useState } from "react";
import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  useTheme,
} from "@mui/material";
interface Props {
  className?: string;
}
import Divider from "@mui/material/Divider";
import { LoginDialog } from "../Login/LoginDialog";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/store";
import useLogOut from "@/hooks/useLogOut";

export default function AvatarDropdown({ className = "" }: Props) {
  // initial states
  const { userData } = useGlobalContext().userContext;
  const { setOpenLoginDialog, openLoginDialog } =
    useGlobalContext().loginContext;
  const { config } = useGlobalContext().global;
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  // handle navigate
  const router = useRouter();

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
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
            // fullWidth
            onClick={toggleMenu}
            variant="contained"
            color="primary"
            size="medium"
            className="rounded-lg"
            // className={`flex items-center justify-between rounded-lg ${
            //   open && "rounded-b-none"
            // }`}
          >
            حساب کاربری
            {/* {open ? <ExpandLessIcon /> : <ExpandMoreIcon />} */}
          </Button>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            // transformOrigin={{
            //   vertical: "top",
            //   horizontal: "left",
            // }}
            PaperProps={{
              style: {
                //   width: "200px",
                borderRadius: "8px",
                //   borderTopLeftRadius: "0px",
                //   borderTopRightRadius: "0px",
                overflow: "hidden",
              },
            }}
          >
            <List
              component="nav"
              disablePadding
              // className="border-x border-primary-main"
            >
              <ListItemButton
                className="cursor-pointer"
                onClick={() => {
                  router.push("/profile/account");
                }}
              >
                <ListItemText
                  primary={
                    userData.data.first_name_fa
                      ? `${userData.data.first_name_fa} ${userData.data.last_name_fa}`
                      : userData.data.mobile
                  }
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
                className="cursor-pointer"
                onClick={() => {
                  router.push("/profile/orders");
                }}
              >
                <ListItemText primary="سفرها" />
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
