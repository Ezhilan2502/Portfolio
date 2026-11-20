
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://127.0.0.1:8000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProfile = () => api.get("/profile/");
export const getSkills = () => api.get("/skills/");
export const getProjects = () => api.get("/projects/");
export const getExperience = () => api.get("/experience/");
export const getEducation = () => api.get("/education/");
export const getCertifications = () => api.get("/certifications/");

export const sendContactMessage = (data) =>
  api.post("/contact/", data);

export default api;
