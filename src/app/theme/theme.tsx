"use client";
import { createTheme, PaletteOptions, Theme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { iransansFonts } from "./localFont";
// const minimal-light-1 = require("@/global-files/themeColors/light2");
// const light4 = require("@/global-files/themeColors/light4");
const getCssVariable = (variable: string, fallback: string = "#000") =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim() || fallback;
export const getTheme = (
  mode: "light" | "dark"
  // themeKey: keyof typeof themes
) => {
  // const themes = { light2, light4 };

  return createTheme({
    direction: "rtl",
    palette: {
      mode: mode,
      ...(mode === "light"
        ? //  themes[themeKey]
          ({
            // light theme
            primary: {
              main: getCssVariable("--primary-main"),
            },
            background: {
              main: getCssVariable("--background-main"),
              paper: getCssVariable("--background-paper"),
            },
            text: {
              main: getCssVariable("--text-main"),
              subText: getCssVariable("--text-subText"),
            },
            divider: getCssVariable("--divider"),
          } as PaletteOptions)
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
            backgroundColor: getCssVariable("--background-main"),
            boxShadow: "none",
            borderBottom: `1px solid ${getCssVariable("--divider")}`,
            color: getCssVariable("--text-main"),
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
            backgroundColor: getCssVariable("--background-main"),
            color: getCssVariable("--text-main"),
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
            backgroundColor: getCssVariable("--background-paper"),
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
            backgroundColor: getCssVariable("--background-paper"),
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: getCssVariable("--background-main"),
            borderTop: `1px solid ${getCssVariable("--divider")}`,
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
