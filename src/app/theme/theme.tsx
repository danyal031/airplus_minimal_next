"use client";
import { createTheme, PaletteOptions, Theme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { iranyekanxFonts } from "./localFont";
// const getCssVariable = (variable: string, fallback: string = "#000") =>
//   getComputedStyle(document.documentElement)
//     .getPropertyValue(variable)
//     .trim() || fallback;
const getCssVariable = (variable: string, fallback: string = "#000") => {
  if (typeof window === "undefined") return fallback;
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim() || fallback
  );
};
export const getTheme = (mode: "light" | "dark") => {
  // console.log("themeKey111", themeKey);

  return createTheme({
    direction: "rtl",
    palette: {
      mode: mode,
      ...(mode === "light"
        ? ({
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
        : // ({
          //   primary: { main: colors["--primary-main"] },
          //   background: {
          //     main: colors["--background-main"],
          //     paper: colors["--background-paper"],
          //   },
          //   text: {
          //     main: colors["--text-main"],
          //     subText: colors["--text-subText"],
          //   },
          //   divider: colors["--divider"],
          // } as PaletteOptions)
          {
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
      fontFamily: iranyekanxFonts.style.fontFamily,
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
            borderRadius: "6px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
            },
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            borderRadius: "6px",
            backgroundColor: getCssVariable("--background-paper"),
          },
          // input: {
          //   height: "0.7rem",
          // },
          paper: {
            borderRadius: "6px",
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
