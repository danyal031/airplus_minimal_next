import { useGlobalContext } from "@/context/store";

export const useShowAlert = () => {
  const { setShowAlertDetails } = useGlobalContext().global;
  const handleAlertDetails = (
    message = "",
    type: "info" | "success" | "error" | "warning" = "info",
    duration = 6000
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
