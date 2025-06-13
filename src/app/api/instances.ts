import axios from "axios";
import Cookies from "js-cookie";

// const url = "https://hotel-backend-production-a519.up.railway.app"
const url = "https://hotel-backend-s287.onrender.com";

const instanceLocal = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: { "Content-type": "application/json" }
});

instanceLocal.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instanceLocal.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response.data.message !== "Invalid Password" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:8080/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.newAccessToken;

        Cookies.set("accessToken", newAccessToken, {
          expires: 1,
          secure: true,
          sameSite: "Strict"
        });

        originalRequest.headers.Authorization = `Bearer ${res.data.newAccessToken}`;

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
