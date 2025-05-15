"use client";
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
import {
  AlertDetailsDataType,
  ConfigDataType,
  defaultAlertDetails,
  UserInformationDataType,
} from "@/DataTypes/globalTypes";
import { UserDataType } from "@/DataTypes/user";
import {
  Airline,
  AirportDataType,
  FilteredItemsDataDataType,
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
  RoomsDetailsDataType,
} from "@/DataTypes/accommodation/accommodationsListTypes";
import ErrorBoundaryComponent from "@/components/global/error-boundary/ErrorBoundaryComponent";
import { ErrorBoundary } from "react-error-boundary";
import App from "@/components/layouts/App";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { GlobalActionsProvider, useGlobalActions } from "./actionStore";

// import { FallbackProps } from "react-error-boundary";
// const App = dynamic(() => import("@/components/layouts/App"), {
//   ssr: false,
// });

// Define combined context type
interface ContextProps {
  loginContext: {
    openLoginDialog: boolean;
    setOpenLoginDialog: Dispatch<SetStateAction<boolean>>;
    colleagueLogin: boolean;
    setColleagueLogin: Dispatch<SetStateAction<boolean>>;
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
    config: ConfigDataType | null;
    setConfig: Dispatch<SetStateAction<ConfigDataType | null>>;
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
      searchInActiveFlights: FlightResponseDataType | null;
      setSearchInActiveFlights: Dispatch<
        SetStateAction<FlightResponseDataType | null>
      >;
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
      flightTab: number;
      setFlightTab: Dispatch<SetStateAction<number>>;
      allowToSearchFlight: boolean;
      setAllowToSearchFlight: Dispatch<SetStateAction<boolean>>;
      isFlightSearching: boolean;
      setIsFlightSearching: Dispatch<SetStateAction<boolean>>;
    };
    flightFilterContext: {
      flightFilter: any;
      setFlightFilter: Dispatch<SetStateAction<any>>;
      flightSelectedSortFiltered: string;
      setFlightSelectedSortFiltered: Dispatch<SetStateAction<string>>;
      flightFilteredItemsData: any;
      setFlightFilteredItemsData: Dispatch<SetStateAction<any>>;
      selectedAirlinesFiltered: Airline[];
      setSelectedAirlineFiltered: Dispatch<SetStateAction<Airline[]>>;
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
      additionalDetailsAccommodation: AccommodationsListDataType | null;
      setAdditionalDetailsAccommodation: Dispatch<
        SetStateAction<AccommodationsListDataType | null>
      >;
      roomsDetails: RoomsDetailsDataType[] | null;
      setRoomsDetails: Dispatch<SetStateAction<RoomsDetailsDataType[] | null>>;
    };
  };
}

// Create combined context
const GlobalContext = createContext<ContextProps>({
  loginContext: {
    openLoginDialog: false,
    setOpenLoginDialog: () => {},
    colleagueLogin: false,
    setColleagueLogin: () => {},
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
    config: null,
    setConfig: () => {},
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
      ticketLoading: true,
      setTicketLoading: () => {},
      changeStatusRequest: false,
      setChangeStatusRequest: () => {},
      isInitialSearchDone: false,
      setIsInitialSearchDone: () => {},
      searchInActiveFlights: null,
      setSearchInActiveFlights: () => {},
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
      flightTab: 1,
      setFlightTab: () => {},
      allowToSearchFlight: false,
      setAllowToSearchFlight: () => {},
      isFlightSearching: false,
      setIsFlightSearching: () => {},
    },
    flightFilterContext: {
      flightFilter: {
        cabinType: [] as string[],
        ticketType: [] as string[],
        airline: [] as Airline[],
        timeRange: [0, 24] as number[],
      },
      setFlightFilter: () => {},
      flightSelectedSortFiltered: "1",
      setFlightSelectedSortFiltered: () => {},
      flightFilteredItemsData: null,
      setFlightFilteredItemsData: () => {},
      selectedAirlinesFiltered: [],
      setSelectedAirlineFiltered: () => {},
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
      additionalDetailsAccommodation: null,
      setAdditionalDetailsAccommodation: () => {},
      roomsDetails: null,
      setRoomsDetails: () => {},
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
  // action context
  // login
  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [colleagueLogin, setColleagueLogin] = useState<boolean>(false);
  // global
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [config, setConfig] = useState<null | ConfigDataType>(null);
  const [tabValueSearchBox, setTabValueSearchBox] = useState<string>("1");
  const [showAlertDetails, setShowAlertDetails] =
    useState<AlertDetailsDataType>(defaultAlertDetails);

  // flight filter
  const [flightFilter, setFlightFilter] = useState({
    cabinType: [] as string[],
    ticketType: [] as string[],
    airline: [] as Airline[],
    timeRange: [0, 24] as number[],
  });
  const [flightSelectedSortFiltered, setFlightSelectedSortFiltered] =
    useState<string>("1");
  const [flightFilteredItemsData, setFlightFilteredItemsData] =
    useState<FilteredItemsDataDataType | null>(null);
  const [selectedAirlinesFiltered, setSelectedAirlineFiltered] = useState<
    Airline[]
  >([]);
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
  const [searchInActiveFlights, setSearchInActiveFlights] =
    useState<FlightResponseDataType | null>(null);
  const [searchFlightResponseData, setSearchFlightResponseData] =
    useState<FlightResponseDataType | null>(null);
  const [isInitialSearchDone, setIsInitialSearchDone] =
    useState<boolean>(false);
  const [changeStatusRequest, setChangeStatusRequest] =
    useState<boolean>(false);
  const [ticketLoading, setTicketLoading] = useState<boolean>(true);
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
  const [flightTab, setFlightTab] = useState<number>(1);
  const [allowToSearchFlight, setAllowToSearchFlight] =
    useState<boolean>(false);
  const [isFlightSearching, setIsFlightSearching] = useState<boolean>(false);
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
  const [additionalDetailsAccommodation, setAdditionalDetailsAccommodation] =
    useState<AccommodationsListDataType | null>(null);
  const [roomsDetails, setRoomsDetails] = useState<
    RoomsDetailsDataType[] | null
  >(null);
  //

  // handle error boundary
  function fallbackRender({ error, resetErrorBoundary }: any) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    return (
      <ErrorBoundaryComponent
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    );
  }

  return (
    <>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <GlobalContext.Provider
          value={{
            loginContext: {
              openLoginDialog,
              setOpenLoginDialog,
              colleagueLogin,
              setColleagueLogin,
            },
            userContext: { userId, setUserId, userData, setUserData },
            global: {
              tabValueSearchBox,
              setTabValueSearchBox,
              showAlertDetails,
              setShowAlertDetails,
              showProgress,
              setShowProgress,
              config,
              setConfig,
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
                searchInActiveFlights,
                setSearchInActiveFlights,
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
                flightTab,
                setFlightTab,
                allowToSearchFlight,
                setAllowToSearchFlight,
                isFlightSearching,
                setIsFlightSearching,
              },
              flightFilterContext: {
                flightFilter,
                setFlightFilter,
                flightSelectedSortFiltered,
                setFlightSelectedSortFiltered,
                flightFilteredItemsData,
                setFlightFilteredItemsData,
                selectedAirlinesFiltered,
                setSelectedAirlineFiltered,
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
                additionalDetailsAccommodation,
                setAdditionalDetailsAccommodation,
                roomsDetails,
                setRoomsDetails,
              },
            },
          }}
        >
          <GlobalActionsProvider>
            <ReCaptchaProvider
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            >
              <App>{children}</App>
            </ReCaptchaProvider>
          </GlobalActionsProvider>
        </GlobalContext.Provider>
      </ErrorBoundary>
    </>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
