import axios from "axios";

// buat instance axios
const API = axios.create({
  baseURL: "http://localhost:5000/api", // ganti sesuai backend kamu
});

export default API;