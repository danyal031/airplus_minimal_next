import { useGlobalContext } from "@/context/store";

const useCopyToClipboard = () => {
  const { setShowAlertDetails } = useGlobalContext().global;
  const copyToClipboard = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowAlertDetails({
        alertMessage: successMessage,
        showAlert: true,
        alertType: "success",
      });
    } catch (err) {
      console.error("خطا در کپی کردن: ", err);
    }
  };
  return { copyToClipboard };
};
export default useCopyToClipboard;
