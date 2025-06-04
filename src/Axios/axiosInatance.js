import axios from "axios";
const getToken = () => {
  const tokenString = localStorage.getItem("accessToken");
  try {
    //const tokenObj = JSON.parse(tokenString);
    return tokenString;
  } catch (error) {
    console.error("Failed to parse token:", error);
    return "";
  }
};

// Set up axios instance
const axiosInstance = axios.create({
  baseURL: "http://208.110.83.16:90/api",
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
