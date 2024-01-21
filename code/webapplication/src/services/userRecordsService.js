// userRecordsService.js
import http from "./httpService";
import config from "../config.json";

export function getUsers(agency) {
  const apiUrl = config.apiUrl;
  const apiEndpoint = `${apiUrl}/Admin/registeredUsers?agency=${agency}`;
  return http.get(apiEndpoint);
}
