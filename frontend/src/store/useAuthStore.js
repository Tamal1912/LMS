import {create} from "zustand";
import axios from "axios";
import {toast} from "react-hot-toast";
import { api } from '../lib/utils';


const useAuthStore=create((set)=>({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,

    studentLogin: async (loginData) => {
        try {
            set({ loading: true, error: null });
            const response = await api.post('/v1/users/student/login', loginData);
            
            localStorage.setItem('token', response.data.data.accessToken);
            localStorage.setItem('userType', 'student');
            
            set({ 
                user: response.data.data,
                isAuthenticated: true,
                loading: false 
            });
            
            toast.success("Login successful!");
            return true;
        } catch (error) {
            set({ 
                error: error.response?.data?.message || 'Login failed',
                loading: false 
            });
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    },

    teacherLogin: async (loginData) => {
        try {
            set({ loading: true, error: null });
            const response = await api.post('/v1/users/teacher/login', loginData);
            
            localStorage.setItem('token', response.data.data.accessToken);
            localStorage.setItem('userType', 'teacher');
            
            set({ 
                user: response.data.data,
                isAuthenticated: true,
                loading: false 
            });
            
            toast.success("Login successful!");
            return true;
        } catch (error) {
            set({ 
                error: error.response?.data?.message || 'Login failed',
                loading: false 
            });
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    },

    studentSignup: async (signupData) => {
        try {
            set({ loading: true, error: null });
            const response = await api.post('/v1/users/student/signup', signupData);
            
            localStorage.setItem('token', response.data.data.accessToken);
            localStorage.setItem('userType', 'student');
            
            set({ 
                user: response.data.data,
                isAuthenticated: true,
                loading: false 
            });
            
            toast.success("Registration successful!");
            return true;
        } catch (error) {
            set({ 
                error: error.response?.data?.message || 'Registration failed',
                loading: false 
            });
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    },

    teacherSignup: async (signupData) => {
        try {
            set({ loading: true, error: null });
            const response = await api.post('/v1/users/teacher/signup', signupData);
            
            localStorage.setItem('token', response.data.data.accessToken);
            localStorage.setItem('userType', 'teacher');
            
            set({ 
                user: response.data.data,
                isAuthenticated: true,
                loading: false 
            });
            
            toast.success("Registration successful!");
            return true;
        } catch (error) {
            set({ 
                error: error.response?.data?.message || 'Registration failed',
                loading: false 
            });
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    },

    logout: async () => {
        try {
            await api.post('/v1/users/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            set({ 
                user: null,
                isAuthenticated: false 
            });
            toast.success("Logged out successfully");
        } catch (error) {
            console.error('Logout error:', error);
            toast.error("Error logging out");
        }
    },

    checkAuth: async () => {
        try {
            const token = localStorage.getItem('token');
            const userType = localStorage.getItem('userType');
            
            if (!token || !userType) {
                set({ isAuthenticated: false });
                return;
            }

            const response = await api.get(`/v1/users/${userType}/me`);
            set({ 
                user: response.data.data,
                isAuthenticated: true 
            });
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            set({ 
                user: null,
                isAuthenticated: false 
            });
        }
    }
}))

export default useAuthStore;
