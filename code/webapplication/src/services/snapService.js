import http from "./httpService";
import config from "../config.json";

export async function getDriverSnaps(obj) {
  const apiEndpoint = `${config.apiUrl}/Admin/gettingDriverSnaps`;
  return http.get(apiEndpoint, obj);
}
