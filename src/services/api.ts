import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      console.log("Server Error:", error.response.status);
    } else if (error.request) {
      console.log("Network Error");
    } else {
      console.log("Unknown Error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
