"use client";
import { useGlobalContext } from "@/context/store";
import { useShowAlert } from "@/hooks/useShowAlert";
import { useEffect } from "react";

export const LogoutListener = () => {
  const { setUserData } = useGlobalContext().userContext;
  const { handleAlertDetails } = useShowAlert();

  useEffect(() => {
    const handler = () => {
      setUserData(null);
      setTimeout(() => {
        handleAlertDetails("شما از حساب کاربری خارج شدید.", "warning");
      }, 4000);

      setTimeout(() => {
        handleAlertDetails("لطفا دوباره وارد حساب کاربری شوید.", "info");
      }, 6000);
    };
    window.addEventListener("app:logout", handler);
    return () => window.removeEventListener("app:logout", handler);
  }, [setUserData, handleAlertDetails]);

  return null;
};
