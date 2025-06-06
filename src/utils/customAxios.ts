import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { axiosErrorHandler } from "./axiosErrorHandler";

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_2,
});

customAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    const domain = window.location.hostname;

    if (config.headers) {
      config.headers.set("Content-Type", "application/json");
      config.headers.set("Domain", domain);
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// customAxios.interceptors.request.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    axiosErrorHandler(status);
    return Promise.reject(error);
  }
);

export default customAxios;
