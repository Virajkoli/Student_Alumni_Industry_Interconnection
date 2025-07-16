import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Change this to your backend URL
  withCredentials: true, // Optional: if your backend uses cookies/session
});

// You can add interceptors for auth token here if needed

export default api;
