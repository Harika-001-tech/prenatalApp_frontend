import axios from "axios";

const api = axios.create({
  baseURL: "https://doctors-app-2gw1.onrender.com/",
});

export default api;
