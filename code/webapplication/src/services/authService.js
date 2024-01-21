import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/Admin/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(obj) {
  try {
    const { data: jwt } = await http.post(apiEndpoint, obj);

    // Store JWT token and current user object in localStorage
    localStorage.setItem(tokenKey, jwt);
  } catch (error) {
    // Handle errors here, e.g., display an error message
    console.error("Error during login:", error.message);
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,

  getJwt,
};
