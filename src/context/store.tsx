"use client";
import { CacheProvider } from "@emotion/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import { cacheRtl, getTheme } from "@/app/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Snackbar } from "@mui/material";
import ProgressLoading from "@/components/BasUIComponents/ProgressLoading";
import axios from "axios";
import { getConfig } from "@/global-files/axioses";

// Define combined context type
interface ContextProps {}

// Create combined context
const GlobalContext = createContext<ContextProps>({});

interface GlobalContextProviderProps {
  children: ReactNode;
}

// Define combined context provider
export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  // global
  const [config, setConfig] = useState<any>(null);
  const [showProgressConfig, setShowProgressConfig] = useState<boolean>(false);

  const theme = useMemo(() => getTheme("light"), []);

  // handle get config
  useEffect(() => {
    setConfig(JSON.parse(localStorage.getItem("minimal_config") as string));
  }, []);

  useEffect(() => {
    axios.defaults.headers.common["Domain"] = window.location.hostname;
    if (!localStorage.getItem("minimal_config")) {
      setShowProgressConfig(true);
    }

    getConfig()
      .then((res: any) => {
        localStorage.setItem("minimal_config", JSON.stringify(res));
        setShowProgressConfig(false);
      })
      .catch(() => {});
  }, []);
  return (
    <GlobalContext.Provider value={{}}>
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/branches/${config?.design.favicon}`}
        />
      </head>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          {!showProgressConfig ? (
            <>
              <CssBaseline />
              {children}
              {/* <Snackbar
                open={showAlertDetails.showAlert}
                onClose={() => {
                  setShowAlertDetails((pre) => ({
                    ...pre,
                    showAlert: false,
                  }));
                }}
                autoHideDuration={showAlertDetails.alertDuration}
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
              </Snackbar> */}
              {/* {openLoginDialog && <LoginDialog />} */}
              {/* {showProgress && <ProgressLoading />} */}
              {/* {isLoading && <ProgressLoading />} */}
            </>
          ) : (
            <div className="h-screen w-full bg-gray-400 flex items-center justify-center">
              <ProgressLoading />
            </div>
          )}
        </ThemeProvider>
      </CacheProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
