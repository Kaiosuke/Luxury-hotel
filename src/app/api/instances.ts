import axios from "axios";

const instanceLocal = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "Content-type": "application/json" },
});

instanceLocal.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instanceLocal;
