import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const api=axios.create({
    baseURL:"http://localhost:4000/api",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
})

// Add request interceptor to add token
api.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
              // Try to refresh token
              const response = await axios.post('/auth/refresh-token');
              const { accessToken } = response.data;
              
              localStorage.setItem('token', accessToken);
              
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return api(originalRequest);
          } catch (error) {
              // If refresh fails, logout user
              localStorage.removeItem('token');
              window.location.href = '/login';
              return Promise.reject(error);
          }
      }

      return Promise.reject(error);
  }); 
