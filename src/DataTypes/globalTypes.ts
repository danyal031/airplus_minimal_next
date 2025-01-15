export interface AlertDetailsDataType {
  alertMessage: string;
  alertType?: "success" | "info" | "error" | "warning";
  alertDuration?: number;
  showAlert: boolean;
}
export const defaultAlertDetails: AlertDetailsDataType = {
  alertMessage: "",
  alertType: "info",
  alertDuration: 6000,
  showAlert: false,
};

export type baseDataDataType = {
  action: string; // citizenship, countries, states, cities
  route?: string; // country, state
  country?: string;
  state?: string;
};

//? api inputs types
export type authInputType = {
  mobile: string | null;
};
export type authSubmitInputType = {
  passenger_id: string | null;
  otp: string | null;
};
