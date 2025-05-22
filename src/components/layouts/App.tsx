"use client";
// import ErrorBoundaryComponent from "@/components/global/error-boundary/ErrorBoundaryComponent";
import { GlobalContextProvider, useGlobalContext } from "@/context/store";
import React, { useEffect, useState } from "react";
// import { ErrorBoundary } from "react-error-boundary";
import { CacheProvider } from "@emotion/react";
import { Alert, Button, Snackbar } from "@mui/material";
import { cacheRtl, getTheme } from "@/app/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "../BasUIComponents/ResponsiveAppBar";
import ResponsiveFooter from "../BasUIComponents/ResponsiveFooter";
import CssBaseline from "@mui/material/CssBaseline";
import { minimal_light_1, minimal_light_2 } from "@/global-files/themeColors";
import { getConfig } from "@/global-files/axioses";
import axios from "axios";
import ProgressLoading from "../BasUIComponents/ProgressLoading";
import { LoginDialog } from "../Login/LoginDialog";
import { usePathname } from "next/navigation";
import { LogoutListener } from "../LogoutListener";
import Cookies from "universal-cookie";
import useLogOut from "@/hooks/useLogOut";

// import Loading from "./loading";

const App = ({ children }: { children: React.ReactNode }) => {
  // (function ultraArt() {
  //   const art = [
  //     "  __  __ _____ _   _    __     ___  ____  _   _ _____ ____ _____ __  __ ____  ____ ",
  //     " |  \\/  | ____| \\ | |   \\ \\   / / \\/ ___|| | | | ____/ ___| ____|  \\/  / ___|/ ___|",
  //     " | |\\/| |  _| |  \\| |    \\ \\ / /| |\\___ \\| |_| |  _|| |  _|  _| |\\/| \\___ \\___ \\",
  //     " | |  | | |___| |\\  |     \\ V / | | ___) |  _  | |__| |_| | |___| |  | |___) |__) |",
  //     " |_|  |_|_____|_| \\_|      \\_/  |_| |____/|_| |_|_____\\____|_____|_|  |_|____/____/",
  //   ];

  //   // ساخت رشتهٔ لاگ با %c برای هر خط
  //   const placeholders = art.map((line) => "%c" + line).join("\n");

  //   // تولید استایل گرادیانت برای هر خط
  //   const styles = art.map((_, i) => {
  //     const start = Math.round((i / art.length) * 360);
  //     const end = Math.round(((i + 1) / art.length) * 360);
  //     return [
  //       "font-family: monospace",
  //       "font-size: 12px",
  //       "background: linear-gradient(90deg, hsl(" +
  //         start +
  //         ",100%,75%), hsl(" +
  //         end +
  //         ",100%,65%))",
  //       "-webkit-background-clip: text",
  //       "color: transparent",
  //       "text-shadow: 2px 2px 4px rgba(0,0,0,0.3)",
  //     ].join(";");
  //   });

  //   console.groupCollapsed(
  //     "%c🎨 Fancy ASCII Art Notice 🎨",
  //     "background:#222; color:#eee; padding:4px 8px; border-radius:4px; font-weight:bold;"
  //   );
  //   console.log(placeholders, ...styles);
  //   console.groupEnd();
  // })();

  if (process.env.NODE_ENV === "production") {
    const cookies = new Cookies();
    const devKey = cookies.get("developer");
    if (devKey !== "dadeh724!@#") {
      console.log = function () {};
    }
  }

  // initial states
  // theme colors
  const themes = {
    "minimal-light-1": minimal_light_1,
    "minimal-light-2": minimal_light_2,
  };
  // const [themeKey, setThemeKey] = useState<keyof typeof themes | null>(() => {
  //   const config = localStorage.getItem("minimal_config");
  //   return config
  //     ? (JSON.parse(config).design.theme as keyof typeof themes)
  //     : null;
  // });
  const [themeKey, setThemeKey] = useState<keyof typeof themes | null>(null);
  // app states
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const [showProgressConfig, setShowProgressConfig] = useState<boolean>(false);
  const [showAppBar, setShowAppBar] = useState<boolean>(true);
  const {
    setShowAlertDetails,
    showAlertDetails,
    setConfig,
    config,
    showProgress,
  } = useGlobalContext().global;
  const { setUserData } = useGlobalContext().userContext;
  const { openLoginDialog } = useGlobalContext().loginContext;
  const pathName = usePathname();

  useEffect(() => {
    if (themeKey) {
      console.log("themeKey", themeKey);

      const selectedTheme = themes[themeKey];
      // const selectedTheme = themes["minimal-light-2"];

      // change `CSS Variables`
      document.documentElement.style.setProperty(
        "--primary-main",
        selectedTheme.primary.main
      );
      document.documentElement.style.setProperty(
        "--background-main",
        selectedTheme.background.main
      );
      document.documentElement.style.setProperty(
        "--background-paper",
        selectedTheme.background.paper
      );
      document.documentElement.style.setProperty(
        "--text-main",
        selectedTheme.text.main
      );
      document.documentElement.style.setProperty(
        "--text-subText",
        selectedTheme.text.subText
      );
      document.documentElement.style.setProperty(
        "--divider",
        selectedTheme.divider
      );
    }
  }, [themeKey]);

  // const theme = useMemo(() => getTheme("light", themeKey), [config, themeKey]);

  const [theme, setTheme] = useState(getTheme("light"));
  useEffect(() => {
    if (themeKey) {
      console.log("themeKey", themeKey);
      setTheme(getTheme("light"));
    }
  }, [config, themeKey]);

  useEffect(() => {
    // app loading
    if (config) {
      setAppLoading(false);
    }
  }, [config]);
  const { handleLogout } = useLogOut();
  useEffect(() => {
    // handle user data
    const data: any = JSON.parse(
      localStorage.getItem("minimal_user") as string
    );
    if (data) {
      if (!data.data.title) {
        handleLogout();
      }
    }
    setUserData(JSON.parse(localStorage.getItem("minimal_user") as string));

    // handle get config
    // axios.defaults.headers.common["Domain"] = window.location.hostname;
    if (!localStorage.getItem("minimal_config")) {
      setShowProgressConfig(true);
    }
    getConfig()
      .then((res: any) => {
        localStorage.setItem("minimal_config", JSON.stringify(res));
        setShowProgressConfig(false);
        setConfig(res);
        setThemeKey(res.design.theme);
        document.title = `خرید بلیت هواپیما | ${res.brand.fa}`;
      })
      .catch(() => {});
  }, []);

  // handle change responsive app bar
  useEffect(() => {
    console.log("pathName", pathName);
    const path = pathName.split("/")[1];
    switch (path) {
      case "mag":
        setShowAppBar(false);
        break;
      default:
        setShowAppBar(true);
    }
  }, [pathName]);

  return (
    <>
      <link
        rel="icon"
        type="image/x-icon"
        href={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/branches/favicon/${config?.design?.favicon}`}
      />
      <CacheProvider value={cacheRtl}>
        {appLoading ? (
          <ProgressLoading />
        ) : (
          <ThemeProvider theme={theme}>
            {!showProgressConfig ? (
              <>
                <LogoutListener />
                <CssBaseline />
                <div className="flex flex-col min-h-screen">
                  {showAppBar && <ResponsiveAppBar />}
                  <div className="flex-grow w-full bg-main relative">
                    {children}
                  </div>
                  <ResponsiveFooter />
                </div>
                <Snackbar
                  open={showAlertDetails.showAlert}
                  onClose={() => {
                    setShowAlertDetails((pre) => ({
                      ...pre,
                      showAlert: false,
                    }));
                  }}
                  autoHideDuration={showAlertDetails.alertDuration || 6000}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert
                    onClose={() => {
                      setShowAlertDetails((pre) => ({
                        ...pre,
                        showAlert: false,
                      }));
                    }}
                    severity={showAlertDetails.alertType}
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {showAlertDetails.alertMessage}
                  </Alert>
                </Snackbar>
                {openLoginDialog && <LoginDialog />}
                {showProgress && <ProgressLoading />}
                {/* {isLoading && <ProgressLoading />} */}
              </>
            ) : (
              <div className="h-screen w-full bg-text-subText flex items-center justify-center">
                <ProgressLoading />
              </div>
            )}{" "}
          </ThemeProvider>
        )}{" "}
      </CacheProvider>
    </>
  );
};

export default App;
