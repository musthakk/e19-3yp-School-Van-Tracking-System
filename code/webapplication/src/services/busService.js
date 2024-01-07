import http from "./httpService";
import config from "../config.json";

// Api endpoint should be registeredUsers

export function addNewBus(obj) {
  const apiUrl = config.apiUrl;
  const apiEndpoint = apiUrl + "/saveBus";
  return http.post(apiEndpoint, obj);
}
