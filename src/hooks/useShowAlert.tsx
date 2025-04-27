import { useGlobalContext } from "@/context/store";

export const useShowAlert = () => {
  const { setShowAlertDetails } = useGlobalContext().global;
  const handleAlertDetails = (
    message = "",
    type: "info" | "success" | "error" | "warning" = "info",
    duration = 3500
  ) => {
    setShowAlertDetails({
      alertMessage: message,
      alertType: type,
      alertDuration: duration,
      showAlert: true,
    });
  };
  return { handleAlertDetails };
};
