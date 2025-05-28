"use client";
// import ErrorBoundaryComponent from "@/components/global/error-boundary/ErrorBoundaryComponent";
import { GlobalContextProvider, useGlobalContext } from "@/context/store";
import React, { use, useEffect, useState } from "react";
// import { ErrorBoundary } from "react-error-boundary";
import { CacheProvider } from "@emotion/react";
import { Alert, Button, Snackbar } from "@mui/material";
import { cacheRtl, getTheme } from "@/app/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "../BasUIComponents/ResponsiveAppBar";
import ResponsiveFooter from "../BasUIComponents/ResponsiveFooter";
import CssBaseline from "@mui/material/CssBaseline";
import {
  minimal_light_1,
  minimal_light_10,
  minimal_light_11,
  minimal_light_12,
  minimal_light_13,
  minimal_light_14,
  minimal_light_15,
  minimal_light_16,
  minimal_light_17,
  minimal_light_18,
  minimal_light_19,
  minimal_light_2,
  minimal_light_20,
  minimal_light_21,
  minimal_light_22,
  minimal_light_23,
  minimal_light_24,
  minimal_light_25,
  minimal_light_26,
  minimal_light_3,
  minimal_light_4,
  minimal_light_5,
  minimal_light_6,
  minimal_light_7,
  minimal_light_8,
  minimal_light_9,
} from "@/global-files/themeColors";
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
  // let airplusLogPrinted = false;

  if (process.env.NODE_ENV === "production") {
    // if (!airplusLogPrinted) {
    //   console.log(
    //     "%c💡 Powered by Airplus 💡",
    //     [
    //       "font-size: 18px",
    //       'font-family: "Segoe UI", Tahoma, sans-serif',
    //       "color: #39ff14",
    //       "padding: 6px 12px",
    //       "border: 2px solid #39ff14",
    //       "border-radius: 4px",
    //       "text-shadow: 0 0 8px #39ff14, 0 0 12px #39ff14",
    //       "background: rgba(0, 0, 0, 0.8)",
    //     ].join(";")
    //   );
    //   airplusLogPrinted = true;
    // }
    const cookies = new Cookies();
    const devKey = cookies.get("developer");
    if (devKey !== "dadeh724!@#") {
      console.log = function () {};
    }
  }

  // initial states
  // theme colors
  const themes = {
    1: minimal_light_1,
    2: minimal_light_2,
    3: minimal_light_3,
    4: minimal_light_4,
    5: minimal_light_5,
    6: minimal_light_6,
    7: minimal_light_7,
    8: minimal_light_8,
    9: minimal_light_9,
    10: minimal_light_10,
    11: minimal_light_11,
    12: minimal_light_12,
    13: minimal_light_13,
    14: minimal_light_14,
    15: minimal_light_15,
    16: minimal_light_16,
    17: minimal_light_17,
    18: minimal_light_18,
    19: minimal_light_19,
    20: minimal_light_20,
    21: minimal_light_21,
    22: minimal_light_22,
    23: minimal_light_23,
    24: minimal_light_24,
    25: minimal_light_25,
    26: minimal_light_26,
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
        // setThemeKey(res.design.theme);
        setThemeKey(res.hub.palette);
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
