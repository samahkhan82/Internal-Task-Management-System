import axios from "axios";

const API_URL = "http://localhost:5000/api";

// User Registration
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/users/register`, userData);
};

// User Login
export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/users/login`, credentials);
};

// Get token from local storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Ensure token is stored after login
  return token ? { Authorization: `Bearer ${token}` } : {}; // Return an empty object if no token
};


// Fetch Tasks (Include Token)
export const fetchTasks = async () => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  try {
    const response = await axios.get("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Create Task (Include Token)
export const createTask = async (taskData) => {
  return await axios.post(`${API_URL}/tasks`, taskData, {
    headers: getAuthHeaders(),
  });
};

// Update Task Status (Include Token)
export const updateTask = async (taskId, updatedData) => {
  return await axios.put(`${API_URL}/tasks/${taskId}`, updatedData, {
    headers: getAuthHeaders(),
  });
};
