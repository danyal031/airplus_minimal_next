"use client";
import { CacheProvider } from "@emotion/react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import { cacheRtl, getTheme } from "@/app/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Alert, Snackbar } from "@mui/material";
import ProgressLoading from "@/components/BasUIComponents/ProgressLoading";
import axios from "axios";
import { getConfig } from "@/global-files/axioses";
import {
  AlertDetailsDataType,
  ConfigDataType,
  defaultAlertDetails,
  UserInformationDataType,
} from "@/DataTypes/globalTypes";
import { UserDataType } from "@/DataTypes/user";
import { LoginDialog } from "@/components/Login/LoginDialog";
import {
  AirportDataType,
  FlightResponseDataType,
  FlightTicketDataType,
  TypeDropOffLocationType,
} from "@/DataTypes/flight/flightTicket";
import { AccommodationDataType } from "@/DataTypes/accommodation/accommodationTypes";
import {
  PassengersCapacityDataType,
  PassengersCapacityDefaultValue,
} from "@/DataTypes/accommodation/accommodationPassengersCapaciy";
import {
  AccommodationShoppingCartDataType,
  AccommodationsListDataType,
} from "@/DataTypes/accommodation/accommodationsListTypes";
import Loading from "@/components/layouts/loading";
import { minimal_light_1, minimal_light_2 } from "@/global-files/themeColors";
import ResponsiveAppBar from "@/components/BasUIComponents/ResponsiveAppBar";
import ResponsiveFooter from "@/components/BasUIComponents/ResponsiveFooter";

// Define combined context type
interface ContextProps {
  loginContext: {
    openLoginDialog: boolean;
    setOpenLoginDialog: Dispatch<SetStateAction<boolean>>;
  };
  userContext: {
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
    userData: UserDataType | null;
    setUserData: Dispatch<SetStateAction<UserDataType | null>>;
  };
  global: {
    tabValueSearchBox: string;
    setTabValueSearchBox: Dispatch<SetStateAction<string>>;
    showAlertDetails: AlertDetailsDataType;
    setShowAlertDetails: Dispatch<SetStateAction<AlertDetailsDataType>>;
    showProgress: boolean;
    setShowProgress: Dispatch<SetStateAction<boolean>>;
  };
  flightContext: {
    searchContext: {
      dropOffLocationType: TypeDropOffLocationType;
      setDropOffLocationType: Dispatch<SetStateAction<TypeDropOffLocationType>>;
      travelRoute: TypeDropOffLocationType;
      setTravelRoute: Dispatch<SetStateAction<TypeDropOffLocationType>>;
      fromDate: string | null;
      setFromDate: Dispatch<SetStateAction<string | null>>;
      toDate: string | null;
      setToDate: Dispatch<SetStateAction<string | null>>;
      origin: AirportDataType | undefined;
      setOrigin: Dispatch<SetStateAction<AirportDataType | undefined>>;
      destination: AirportDataType | undefined;
      setDestination: Dispatch<SetStateAction<AirportDataType | undefined>>;
      airports: AirportDataType[] | [];
      setAirports: Dispatch<SetStateAction<AirportDataType[] | []>>;
      ticketLoading: boolean;
      setTicketLoading: Dispatch<SetStateAction<boolean>>;
      changeStatusRequest: boolean;
      setChangeStatusRequest: Dispatch<SetStateAction<boolean>>;
      isInitialSearchDone: boolean;
      setIsInitialSearchDone: Dispatch<SetStateAction<boolean>>;
      searchFlightResponseData: FlightResponseDataType | null;
      setSearchFlightResponseData: Dispatch<
        SetStateAction<FlightResponseDataType | null>
      >;
      filteredSearchFlightResponseData: FlightResponseDataType | null;
      setFilteredSearchFlightResponseData: Dispatch<
        SetStateAction<FlightResponseDataType | null>
      >;
      selectedWentFlight: FlightTicketDataType | null;
      setSelectedWentFlight: Dispatch<
        SetStateAction<FlightTicketDataType | null>
      >;
      selectedReturnFlight: FlightTicketDataType | null;
      setSelectedReturnFlight: Dispatch<
        SetStateAction<FlightTicketDataType | null>
      >;
      flightPassengers: UserInformationDataType[] | [];
      setFlightPassengers: Dispatch<
        SetStateAction<UserInformationDataType[] | []>
      >;
      flightPassengersTickets: any[];
      setFlightPassengersTickets: Dispatch<SetStateAction<any[]>>;
      openFlightFilterDrawer: boolean;
      setOpenFlightFilterDrawer: Dispatch<SetStateAction<boolean>>;
    };
  };
  accommodationContext: {
    accommodationSearch: {
      accommodationFromDate: string | null;
      setAccommodationFromDate: Dispatch<SetStateAction<string | null>>;
      accommodationToDate: string | null;
      setAccommodationToDate: Dispatch<SetStateAction<string | null>>;
      accommodationDestination: AccommodationDataType | null;
      setAccommodationDestination: Dispatch<
        SetStateAction<AccommodationDataType | null>
      >;
      accommodations: AccommodationDataType[] | [];
      setAccommodations: Dispatch<SetStateAction<AccommodationDataType[] | []>>;
      accommodationPassengersCapacity: PassengersCapacityDataType;
      setAccommodationPassengersCapacity: Dispatch<
        SetStateAction<PassengersCapacityDataType>
      >;
      accommodationsList: AccommodationsListDataType[] | [];
      setAccommodationsList: Dispatch<
        SetStateAction<AccommodationsListDataType[] | []>
      >;
      filteredSearchAccommodationsList: AccommodationsListDataType[] | [];
      setFilteredSearchAccommodationsList: Dispatch<
        SetStateAction<AccommodationsListDataType[] | []>
      >;
      accommodationsLoading: boolean;
      setAccommodationsLoading: Dispatch<SetStateAction<boolean>>;
      selectedAccommodation: AccommodationShoppingCartDataType | null;
      setSelectedAccommodation: Dispatch<
        SetStateAction<AccommodationShoppingCartDataType | null>
      >;
      typeOfAccommodation: string;
      setTypeOfAccommodation: Dispatch<SetStateAction<string>>;
    };
  };
}

// Create combined context
const GlobalContext = createContext<ContextProps>({
  loginContext: {
    openLoginDialog: false,
    setOpenLoginDialog: () => {},
  },
  userContext: {
    userId: "",
    setUserId: () => {},
    userData: null,
    setUserData: () => {},
  },
  global: {
    tabValueSearchBox: "1",
    setTabValueSearchBox: () => {},
    showAlertDetails: defaultAlertDetails,
    setShowAlertDetails: () => {},
    showProgress: false,
    setShowProgress: () => {},
  },
  flightContext: {
    searchContext: {
      dropOffLocationType: "oneWay",
      setDropOffLocationType: () => {},
      travelRoute: "oneWay",
      setTravelRoute: () => {},
      fromDate: null,
      setFromDate: () => {},
      toDate: null,
      setToDate: () => {},
      origin: undefined,
      setOrigin: () => {},
      destination: undefined,
      setDestination: () => {},
      airports: [],
      setAirports: () => {},
      ticketLoading: false,
      setTicketLoading: () => {},
      changeStatusRequest: false,
      setChangeStatusRequest: () => {},
      isInitialSearchDone: false,
      setIsInitialSearchDone: () => {},
      searchFlightResponseData: null,
      setSearchFlightResponseData: () => {},
      filteredSearchFlightResponseData: null,
      setFilteredSearchFlightResponseData: () => {},
      selectedWentFlight: null,
      setSelectedWentFlight: () => {},
      selectedReturnFlight: null,
      setSelectedReturnFlight: () => {},
      flightPassengers: [],
      setFlightPassengers: () => {},
      flightPassengersTickets: [],
      setFlightPassengersTickets: () => {},
      openFlightFilterDrawer: false,
      setOpenFlightFilterDrawer: () => {},
    },
  },
  accommodationContext: {
    accommodationSearch: {
      accommodationFromDate: null,
      setAccommodationFromDate: () => {},
      accommodationToDate: null,
      setAccommodationToDate: () => {},
      accommodationDestination: null,
      setAccommodationDestination: () => {},
      accommodations: [],
      setAccommodations: () => {},
      accommodationPassengersCapacity: PassengersCapacityDefaultValue,
      setAccommodationPassengersCapacity: () => {},
      accommodationsList: [],
      setAccommodationsList: () => {},
      filteredSearchAccommodationsList: [],
      setFilteredSearchAccommodationsList: () => {},
      accommodationsLoading: false,
      setAccommodationsLoading: () => {},
      selectedAccommodation: null,
      setSelectedAccommodation: () => {},
      typeOfAccommodation: "list",
      setTypeOfAccommodation: () => {},
    },
  },
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

// Define combined context provider
export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
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

  // login
  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState<UserDataType | null>(null);
  // global
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [config, setConfig] = useState<null | ConfigDataType>(null);
  const [showProgressConfig, setShowProgressConfig] = useState<boolean>(false);
  const [tabValueSearchBox, setTabValueSearchBox] = useState<string>("1");
  const [showAlertDetails, setShowAlertDetails] =
    useState<AlertDetailsDataType>(defaultAlertDetails);
  // search flight
  const [openFlightFilterDrawer, setOpenFlightFilterDrawer] =
    useState<boolean>(false);
  const [flightPassengersTickets, setFlightPassengersTickets] = useState<any[]>(
    []
  );
  const [flightPassengers, setFlightPassengers] = useState<
    UserInformationDataType[] | []
  >([]);
  const [selectedWentFlight, setSelectedWentFlight] =
    useState<FlightTicketDataType | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] =
    useState<FlightTicketDataType | null>(null);
  const [
    filteredSearchFlightResponseData,
    setFilteredSearchFlightResponseData,
  ] = useState<FlightResponseDataType | null>(null);
  const [searchFlightResponseData, setSearchFlightResponseData] =
    useState<FlightResponseDataType | null>(null);
  const [isInitialSearchDone, setIsInitialSearchDone] =
    useState<boolean>(false);
  const [changeStatusRequest, setChangeStatusRequest] =
    useState<boolean>(false);
  const [ticketLoading, setTicketLoading] = useState<boolean>(false);
  const [airports, setAirports] = useState<AirportDataType[] | []>([]);
  const [dropOffLocationType, setDropOffLocationType] =
    useState<TypeDropOffLocationType>("oneWay");
  const [travelRoute, setTravelRoute] =
    useState<TypeDropOffLocationType>("oneWay");
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const [origin, setOrigin] = useState<AirportDataType | undefined>(undefined);
  const [destination, setDestination] = useState<AirportDataType | undefined>(
    undefined
  );
  // search Accommodation
  const [accommodationFromDate, setAccommodationFromDate] = useState<
    string | null
  >(null);
  const [accommodationToDate, setAccommodationToDate] = useState<string | null>(
    null
  );
  const [accommodationDestination, setAccommodationDestination] =
    useState<AccommodationDataType | null>(null);
  const [accommodations, setAccommodations] = useState<
    AccommodationDataType[] | []
  >([]);
  const [accommodationPassengersCapacity, setAccommodationPassengersCapacity] =
    useState<PassengersCapacityDataType>(PassengersCapacityDefaultValue);
  const [accommodationsList, setAccommodationsList] = useState<
    AccommodationsListDataType[] | []
  >([]);
  const [
    filteredSearchAccommodationsList,
    setFilteredSearchAccommodationsList,
  ] = useState<AccommodationsListDataType[] | []>([]);
  const [accommodationsLoading, setAccommodationsLoading] =
    useState<boolean>(false);
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<AccommodationShoppingCartDataType | null>(null);
  const [typeOfAccommodation, setTypeOfAccommodation] = useState("list");
  //

  useEffect(() => {
    if (themeKey) {
      console.log("themeKey", themeKey);

      const selectedTheme = themes[themeKey];

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

  useEffect(() => {
    // handle user data
    setUserData(JSON.parse(localStorage.getItem("minimal_user") as string));

    // handle get config
    axios.defaults.headers.common["Domain"] = window.location.hostname;
    if (!localStorage.getItem("minimal_config")) {
      setShowProgressConfig(true);
    }
    getConfig()
      .then((res: any) => {
        localStorage.setItem("minimal_config", JSON.stringify(res));
        setShowProgressConfig(false);
        setConfig(res);
        setThemeKey(res.design.theme);
      })
      .catch(() => {});
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loginContext: { openLoginDialog, setOpenLoginDialog },
        userContext: { userId, setUserId, userData, setUserData },
        global: {
          tabValueSearchBox,
          setTabValueSearchBox,
          showAlertDetails,
          setShowAlertDetails,
          showProgress,
          setShowProgress,
        },

        flightContext: {
          searchContext: {
            dropOffLocationType,
            setDropOffLocationType,
            travelRoute,
            setTravelRoute,
            fromDate,
            setFromDate,
            setToDate,
            toDate,
            origin,
            setOrigin,
            destination,
            setDestination,
            airports,
            setAirports,
            ticketLoading,
            setTicketLoading,
            changeStatusRequest,
            setChangeStatusRequest,
            isInitialSearchDone,
            setIsInitialSearchDone,
            searchFlightResponseData,
            setSearchFlightResponseData,
            filteredSearchFlightResponseData,
            setFilteredSearchFlightResponseData,
            selectedWentFlight,
            setSelectedWentFlight,
            selectedReturnFlight,
            setSelectedReturnFlight,
            flightPassengers,
            setFlightPassengers,
            flightPassengersTickets,
            setFlightPassengersTickets,
            openFlightFilterDrawer,
            setOpenFlightFilterDrawer,
          },
        },
        accommodationContext: {
          accommodationSearch: {
            accommodationDestination,
            accommodationFromDate,
            accommodationToDate,
            setAccommodationDestination,
            setAccommodationFromDate,
            setAccommodationToDate,
            accommodations,
            setAccommodations,
            accommodationPassengersCapacity,
            setAccommodationPassengersCapacity,
            accommodationsList,
            setAccommodationsList,
            filteredSearchAccommodationsList,
            setFilteredSearchAccommodationsList,
            accommodationsLoading,
            setAccommodationsLoading,
            selectedAccommodation,
            setSelectedAccommodation,
            typeOfAccommodation,
            setTypeOfAccommodation,
          },
        },
      }}
    >
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href={`${process.env.NEXT_PUBLIC_MEDIA_URL_1}/media/branches/${config?.design.favicon}`}
        />
      </head>
      <CacheProvider value={cacheRtl}>
        {" "}
        {appLoading ? (
          <Loading />
        ) : (
          <ThemeProvider theme={theme}>
            {!showProgressConfig ? (
              <>
                <CssBaseline />
                {/* {children} */}
                <div className="flex flex-col min-h-screen">
                  <ResponsiveAppBar />
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
                </Snackbar>
                {openLoginDialog && <LoginDialog />}
                {showProgress && <ProgressLoading />}
                {/* {isLoading && <ProgressLoading />} */}
              </>
            ) : (
              <div className="h-screen w-full bg-gray-400 flex items-center justify-center">
                <ProgressLoading />
              </div>
            )}{" "}
          </ThemeProvider>
        )}{" "}
      </CacheProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
