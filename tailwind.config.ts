import type { Config } from "tailwindcss";

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
          main: "var(--primary-main)",
        },
        text: {
          main: "var(--text-main)",
          subText: "var(--text-subText)",
        },
        main: "var(--background-main)",
        paper: "var(--background-paper)",
        divider: "var(--divider)",
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        // primary: {
        //   main: light2.primary.main,
        // },
        // text: {
        //   main: light2.text.main,
        //   subText: light2.text.subText,
        // },
        // main: light2.background.main,
        // paper: light2.background.paper,
        // divider: light2.divider,
      },
      fontFamily: {
        sans: ["var(--font-iranyekanx)"],
      },
    },
  },
  plugins: [],
};
export default config;
