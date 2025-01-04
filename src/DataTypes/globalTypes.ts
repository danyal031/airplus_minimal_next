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
