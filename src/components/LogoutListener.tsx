"use client";
import { useGlobalContext } from "@/context/store";
import { useEffect } from "react";

export const LogoutListener = () => {
  const { setUserData } = useGlobalContext().userContext;

  useEffect(() => {
    const handler = () => setUserData(null);
    window.addEventListener("app:logout", handler);
    return () => window.removeEventListener("app:logout", handler);
  }, [setUserData]);

  return null;
};
