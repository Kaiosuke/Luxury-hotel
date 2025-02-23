import axios from "axios";
import Cookies from "js-cookie";

const instanceLocal = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "Content-type": "application/json" },
});

instanceLocal.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      console.log(accessToken);
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceLocal.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:8080/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", res.data.newAccessToken);

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${res.data.newAccessToken}`;

        return instanceLocal(originalRequest);
      } catch (err) {
        console.log("Refresh token failed:", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
export default instanceLocal;
