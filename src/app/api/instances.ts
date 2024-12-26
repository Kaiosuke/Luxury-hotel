import axios from "axios";

const instanceLocal = axios.create({
  baseURL: "http://localhost:3002/",
  headers: { "Content-type": "application/json" },
});

export default instanceLocal;
