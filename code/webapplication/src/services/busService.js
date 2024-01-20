import http from "./httpService";
import config from "../config.json";

// Api endpoint should be registeredUsers

export function addNewBus(obj) {
  const apiUrl = config.apiUrl;
  const apiEndpoint = apiUrl + "/Admin/vehicleRegistration";
  return http.post(apiEndpoint, obj);
}

export function getBuses() {
  const apiUrl = config.apiUrl;
  const apiEndpoint = apiUrl + "/Admin/registeredVehicles";
  return http.get(apiEndpoint);
}

export function getUnasignedChildren() {
  const apiUrl = config.apiUrl;
  const apiEndpoint = apiUrl + "/Admin/busNotAssignedChildren";
  return http.get(apiEndpoint);
}
