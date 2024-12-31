"use client";
import { createTheme, Theme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { iransansFonts } from "./localFont";
const lightTheme = require("@/global-files/themeColors");

export const getTheme = (mode: "light" | "dark") => {
  return createTheme({
    direction: "rtl",
    palette: {
      mode: mode,
      ...(mode === "light"
        ? lightTheme
        : {
            // dark theme
            primary: {
              main: "#90caf9",
            },
            secondary: {
              main: "#f48fb1",
            },
            background: {
              default: "#22223b",
              paper: "#1d1d1d",
            },
            text: {
              primary: "#ffffff",
              secondary: "#bbbbbb",
            },
            divider: "#f5f5f5",
          }),
    },
    typography: {
      fontFamily: iransansFonts.style.fontFamily,
    },
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "#2a9d8f1a",
              borderRadius: "0.35rem",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: lightTheme.background.main,
            boxShadow: "none",
            borderBottom: `1px solid ${lightTheme.divider}`,
            color: lightTheme.text.main,
            padding: "5px 20px",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "1rem",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
        },
        styleOverrides: {
          root: {
            backgroundColor: lightTheme.background.main,
            color: lightTheme.text.main,
            borderRadius: "1rem",
            "& .MuiOutlinedInput-root": {
              borderRadius: "1rem",
            },
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            borderRadius: "1rem",
            backgroundColor: lightTheme.background.paper,
          },
          // input: {
          //   height: "0.7rem",
          // },
          paper: {
            borderRadius: "1rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            marginTop: "0.3rem",
            marginBottom: "0.3rem",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: "1rem",
            marginTop: "0.3rem",
            marginBottom: "0.3rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "1rem",
            backgroundColor: lightTheme.background.paper,
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: lightTheme.background.main,
            borderTop: `1px solid ${lightTheme.divider}`,
            minHeight: "250px",
          },
        },
      },
    },
  });
};

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
