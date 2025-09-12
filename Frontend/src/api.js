// frontend/src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request interceptor to inject token from localStorage
api.interceptors.request.use((config) => {
  try {
    const saved = JSON.parse(localStorage.getItem("auth"));
    if (saved?.token) {
      config.headers.Authorization = `Bearer ${saved.token}`;
    }
  } catch (e) {
    // ignore parse errors
  }
  return config;
});

export default api;
