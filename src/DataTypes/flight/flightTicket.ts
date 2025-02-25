//? type drop of location type
export type TypeDropOffLocationType = "roundTrip" | "oneWay" | "";

//? filtered items type
export type FilteredItemsDataDataType = {
  cabinType: string[];
  ticketType: string[];
  airlineType: Airline[];
};
//? end filtered items type

//? airport type
export type AirportDataType = {
  id: number;
  iata: string;
  title: string;
  title_fa: string;
  country: number;
  state: string;
  priority: number;
  status: number;
  group_by: string;
};
//? end airport type

export type onlineFlightSearchInputType = {
  origin: string | null;
  destination: string | null;
  departure_date: string | null | false;
  returning_date: string | null | false;
};

//? flight ticket type
export interface FlightResponseDataType {
  Went: FlightTicketDataType[];
  Return: FlightTicketDataType[];
}
export interface FlightTicketDataType {
  Service: string;
  Verified: boolean;
  FlightType: string;
  FlightRoute: string;
  FlightNumber: string;
  Origin: Origin;
  Destination: Origin;
  DepartureDateTime: string;
  ArrivalDateTime: string | false;
  Duration: boolean | number;
  Aircraft: Aircraft;
  Airline: Airline;
  Remarks: Remarks;
  ReturningFlight: boolean | ReturningFlight2;
  Steps: boolean;
  Classes: Class[] | Class;
}

export interface Class {
  FlightStatus: boolean;
  Reservable: boolean;
  CancelationPolicy: boolean | string;
  BookingPolicy: boolean;
  Supplier: Supplier;
  SystemSupplier: Supplier;
  FlightId: number | string;
  FareName: number | string;
  CabinType: CabinType;
  AvailableSeat: number;
  Financial: Financial;
  BaseData: BaseData;
  Baggage: Baggage;
}

interface BaseData {
  Supplier: BaseDataSupplier;
  Financial: Financial;
}

interface BaseDataSupplier {
  Supplier: Supplier;
  SystemSupplier: Supplier;
}

interface Baggage {
  Adult: BaggageAge;
  Child: BaggageAge;
  Infant: BaggageAge;
}

interface BaggageAge {
  Trunk: Trunk;
  Hand: Trunk;
}

interface Trunk {
  Number: number | false;
  TotalWeight: number | false;
}

interface Financial {
  PriceAdditions: PriceAdditions;
  CommissionPaid: CommissionPaid;
  Adult: Adult;
  Child: Child;
  Infant: Infant;
  RoundtripFare?: boolean;
}

interface Infant {
  BaseFare: number;
  Tax: boolean | number;
  TotalFare: number;
  Payable: number;
  Commission: Commission3;
  Markup?: number;
}

interface Commission3 {
  Percentage: boolean | number;
  Final: boolean | number;
  Price: boolean | number;
}

interface Child {
  BaseFare: number;
  Tax: boolean | number;
  TotalFare: number;
  Payable: number;
  Commission: Commission2;
  Markup?: number;
}

interface Commission2 {
  Percentage: boolean | number;
  Final: number;
  Price: number;
}

interface Adult {
  BaseFare: number;
  Tax: boolean | number;
  Markup: number;
  TotalFare: number;
  Payable: number;
  Commission: Commission;
}

interface Commission {
  Percentage: number;
  Final: number;
  Price: number;
}

interface CommissionPaid {
  Percentage: boolean;
  Transaction: string;
  MembershipRight: boolean;
}

interface PriceAdditions {
  Citizens: number;
}

interface CabinType {
  iata: string;
  title: Title;
}

interface Title {
  fa: string;
  en: string;
}

interface Supplier {
  id: number;
  title_fa: string;
  title_en: string;
  first_name?: string;
  last_name?: string;
  credit_amount?: string | null;
  status: number;
}

interface ReturningFlight2 {
  AllowedReturnFlights: AllowedReturnFlights;
  UnauthorizedReturnFlights: boolean;
  ReturnOnlyFromTheAirlineOfOrigin: boolean;
  ReturnFlightProvider: boolean;
  DistanceToReturnFlight: DistanceToReturnFlight;
}

interface DistanceToReturnFlight {
  Min: number;
  Max: number;
}

interface AllowedReturnFlights {
  FlightNumber: boolean;
  FlightDate: boolean;
}

interface Remarks {
  AirlineSupplier: boolean;
  TourRequirement: boolean | number;
  OneWayRequirement: boolean;
  RoundtripRequirement: boolean;
  PhoneRequirement: boolean;
  Description: boolean | string;
  FlightReturn?: boolean;
  DateReturn?: boolean;
}

export interface Airline {
  id: number;
  iata: string;
  icao: string;
  logo: string;
  title: string;
  title_fa: string;
  country: Country;
  priority: number;
  status: number;
}

interface Aircraft {
  iata: string;
}

interface Origin {
  Iata: Iata;
  Terminal: boolean;
}

interface Iata {
  id: number;
  iata: string;
  title: string;
  title_fa: string;
  country: Country;
  state: Country;
  priority: number;
  status: number;
}

interface Country {
  id: number;
  title_fa: string;
  title_en: string;
}
//? end flight ticket type
