import axios from "axios";
// const dotenv = require("dotenv");
// dotenv.config();

// Pode ser algum servidor executando localmente:
// http://localhost:3000

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL,
});

export default api;
