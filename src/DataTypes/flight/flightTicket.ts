//? type drop of location type
export type TypeDropOffLocationType = "roundTrip" | "oneWay" | "";

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
