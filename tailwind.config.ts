import type { Config } from "tailwindcss";
const lightTheme = require("./src/global-files/themeColors");

const config: Config = {
  important: true,
  content: ["./src/**"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        "2xl": "170px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          main: lightTheme.primary.main,
        },
        text: {
          main: lightTheme.text.main,
          subText: lightTheme.text.subText,
        },
        main: lightTheme.background.main,
        paper: lightTheme.background.paper,
        divider: lightTheme.divider,
      },
      fontFamily: {
        sans: ["var(--font-iransans)"],
      },
    },
  },
  plugins: [],
};
export default config;
