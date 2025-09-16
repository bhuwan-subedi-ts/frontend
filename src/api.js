import axios from "axios";
import { useAuthStore } from "./store";

const API_BASE_URL = "http://localhost:5000/api";

// Helper to get token from Zustand or localStorage
const getToken = () => {
  const token = useAuthStore.getState().token;
  return token || localStorage.getItem("auth_token");
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return { message: error.response?.data?.message || "Login failed." };
  }
};

// Example: Authenticated request
export const getProfile = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return {
      message: error.response?.data?.message || "Failed to fetch profile.",
    };
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return { message: error.response?.data?.message || "Registration failed." };
  }
};

export const getAdminStats = async () => {
  try {
    const token =
      useAuthStore.getState().token || localStorage.getItem("auth_token");
    const response = await axios.get(`${API_BASE_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return {
      message: error.response?.data?.message || "Failed to fetch stats.",
    };
  }
};

// Example signatures:
export const getJobs = async () => {
  /* ... */
};
export const getJobById = async (id) => {
  /* ... */
};
export const createJob = async (job) => {
  /* ... */
};
export const updateJob = async (id, job) => {
  /* ... */
};
export const deleteJob = async (id) => {
  /* ... */
};
export const getApplicationsForJob = async (jobId) => {
  /* ... */
};
