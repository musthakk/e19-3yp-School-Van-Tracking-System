import http from "./httpService";
import config from "../config.json";

// Api endpoint should be registeredUsers

export function getDrivers() {
  const apiUrl = config.apiUrl;
  const apiEndpoint = apiUrl + "/Admin/gettingDrivers";
  return http.get(apiEndpoint);
}
