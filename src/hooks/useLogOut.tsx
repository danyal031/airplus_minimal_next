import { useGlobalContext } from "@/context/store";

const useLogOut = () => {
  const { setUserData } = useGlobalContext().userContext;
  const handleLogout = () => {
    localStorage.removeItem("minimal_user");
    localStorage.removeItem("access_token");
    setUserData(null);
  };

  return { handleLogout };
};

export default useLogOut;
