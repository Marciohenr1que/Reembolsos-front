import axios from "axios";
import { handleApiError } from "../src/notifications/ErrorHandler";
import { handleApiSuccess } from "../src/notifications/SuccessHandler";

const API_BASE_URL = "http://localhost:3001";

const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

ApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

ApiClient.interceptors.response.use(
  (response) => {
    handleApiSuccess(response.status);
    return response;
  },
  (error) => handleApiError(error)
);

export default ApiClient;
