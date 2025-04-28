import { triggerLogout } from "./triggerLogout";

export function axiosErrorHandler(status: number) {
  if (status === 401) {
    triggerLogout();
    console.log("HANDLE AUTH ERROR");
  }
}
