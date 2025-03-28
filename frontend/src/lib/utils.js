import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // Make sure to include the "Bearer " prefix
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Debug interceptor to check what's being sent
api.interceptors.request.use(
    (config) => {
        console.log('Request Headers:', config.headers);
        return config;
    }
);

// Simplified response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && error.response?.data?.isExpired) {
            // Clear auth data
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userType');
            
            // Redirect to login
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);
