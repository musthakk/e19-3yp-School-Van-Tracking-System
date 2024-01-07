import http from "./httpService";
import config from "../config.json";

// Api endpoint should be registeredUsers

export function getUsers() {
  const apiUrl = config.apiUrl;
  const apiEndpoint = apiUrl + "/registeredUsers";
  return http.get(apiEndpoint);
}
