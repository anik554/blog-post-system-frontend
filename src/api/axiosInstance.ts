import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-post-backend-p1u2dwt3n-aniks-projects-d10b87e1.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
