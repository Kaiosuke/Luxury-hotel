import axios from "axios";

const instanceLocal = axios.create({
  baseURL: "http://localhost:3001/",
  headers: { "Content-Type": "Application" },
});

export default instanceLocal;
