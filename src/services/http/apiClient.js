import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://mini-erp-system-eight.vercel.app/api/v1",
  withCredentials: true, // HttpOnly cookie
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default apiClient;
