export function triggerLogout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("minimal_user");
  window.dispatchEvent(new Event("app:logout"));
}
