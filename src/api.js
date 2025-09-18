import axios from "axios";
import { useAuthStore } from "./store";

const API_BASE_URL = "http://localhost:5000/api";
//http://localhost:5000/api/jobs/createjob

// Helper to get token from Zustand or localStorage
const getToken = () => {
  const token = useAuthStore.getState().token;
  return token || localStorage.getItem("auth_token");
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
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

export const registerUser = async (email, password, name, user_type) => {
  debugger;
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      password,
      name,
      user_type,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
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
  try {
    const token =
      useAuthStore.getState().token || localStorage.getItem("auth_token");
    const response = await axios.get(`${API_BASE_URL}/jobs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return {
      message: error.response?.data?.message || "Failed to fetch jobs.",
    };
  }
};
export const getJobById = async (id) => {
  /* ... */
};

export const createJob = async (job) => {
  try {
    const token = getToken();
    const response = await axios.post(`${API_BASE_URL}/createjob`, job, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    return { error: error.response?.data?.error || "Failed to create job" };
  }
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

export const createApplication = async ({ job_id, cover_letter, cv_file }) => {
  try {
    const token =
      useAuthStore.getState().token || localStorage.getItem("auth_token");
    const formData = new FormData();
    formData.append("job_id", job_id);
    formData.append("cover_letter", cover_letter);
    formData.append("cv", cv_file);

    const response = await axios.post(
      `${API_BASE_URL}/createapplication`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || "Failed to submit application",
    };
  }
};
