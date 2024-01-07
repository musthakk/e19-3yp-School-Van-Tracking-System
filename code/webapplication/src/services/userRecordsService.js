import http from "./httpService";
import config from "../config.json";

// Api endpoint should be registeredUsers
const apiUrl = config.apiUrl;
const apiEndpoint = apiUrl + "/registration";

export function getUsers() {
  return http.get(apiEndpoint);
}
