import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from '../lib/utils';
import { toast } from "react-hot-toast";


const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
            


            getProfile: async (id) => {
                try {
                    set({ loading: true, error: null });
                    const response = await api.get(`/v1/student/profile/${id}`);
                    
                    if (response.data?.success && response.data?.data) {
                        set(state => ({
                            ...state,
                            user: response.data.data,
                            loading: false
                        }));
                        return response.data.data;
                    } else {
                        throw new Error("Invalid response format");
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                    set(state => ({
                        ...state,
                        error: error.message || "Failed to fetch profile",
                        loading: false
                    }));
                    toast.error(error.message || "Error fetching profile");
                    return null;
                }
            },

            updateUser: async (id, userData) => {
                try {
                    const response = await api.put(`/v1/student/updateProfile/${id}`, userData);
                    
                    if (response.data && response.data.data) {
                        set(state => ({ 
                            ...state,
                            user: response.data.data 
                        }));
                        return { success: true, message: "Profile updated successfully" };
                    } else {
                        throw new Error("Invalid response format");
                    }
                } catch (error) {
                    console.error("Update error:", error);
                    return {
                        success: false,
                        message: error.response?.data?.message || "Failed to update profile"
                    };
                }
            },

            studentLogin: async (loginData) => {
                try {
                    set({ loading: true, error: null });
                    const response = await api.post('/v1/users/student/login', loginData);
                    
                    const token = response.data.data.accessToken;
                    if (!token) {
                        throw new Error('No token received from server');
                    }

                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('userType', 'student');
                    
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    set({ 
                        user: response.data.data.user,
                        isAuthenticated: true,
                        loading: false 
                    });
                    
                    return true;
                } catch (error) {
                    console.error('Login error:', error);
                    set({ 
                        error: error.response?.data?.message || 'Login failed',
                        loading: false 
                    });
                    return false;
                }
            },

            teacherLogin: async (loginData) => {
                try {
                    set({ loading: true, error: null });
                    const response = await api.post('/v1/users/teacher/login', loginData);
                    
                    const token = response.data.data.accessToken;
                    if (!token) {
                        throw new Error('No token received from server');
                    }

                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('userType', 'teacher');
                    
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    set({ 
                        user: response.data.data.user,
                        isAuthenticated: true,
                        loading: false 
                    });
                    
                    return true;
                } catch (error) {
                    console.error('Login error:', error);
                    set({ 
                        error: error.response?.data?.message || 'Login failed',
                        loading: false 
                    });
                    return false;
                }
            },

            studentSignup: async (signupData) => {
                console.log("signup");
                
                try {
                    set({ loading: true, error: null });
                    const response = await api.post('/v1/users/student/signup', signupData);
                    
                    localStorage.setItem('accessToken', response.data.data.accessToken);
                    localStorage.setItem('userType', 'student');
                    
                    set({ 
                        user: response.data.data,
                        isAuthenticated: true,
                        loading: false 
                    });
                    
                    return true;
                } catch (error) {
                    set({ 
                        error: error.response?.data?.message || 'Registration failed',
                        loading: false 
                    });
                    return false;
                }
            },

            teacherSignup: async (signupData) => {
                try {
                    set({ loading: true, error: null });
                    const response = await api.post('/v1/users/teacher/signup', signupData);
                    
                    localStorage.setItem('accessToken', response.data.data.accessToken);
                    localStorage.setItem('userType', 'teacher');
                    
                    set({ 
                        user: response.data.data,
                        isAuthenticated: true,
                        loading: false 
                    });
                    
                    return true;
                } catch (error) {
                    set({ 
                        error: error.response?.data?.message || 'Registration failed',
                        loading: false 
                    });
                    return false;
                }
            },

            logout: async () => {
                try {
                    await api.post('/v1/users/logout');
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userType');
                    delete api.defaults.headers.common['Authorization'];
                    set({ 
                        user: null,
                        isAuthenticated: false 
                    });
                }
                window.location.href = '/';
            },

            checkAuth: async () => {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    set({ isAuthenticated: false });
                    return;
                }

                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    const userType = localStorage.getItem('userType');
                    const response = await api.get(`/v1/users/${userType}/me`);
                    set({ 
                        user: response.data.data,
                        isAuthenticated: true 
                    });
                } catch (error) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userType');
                    delete api.defaults.headers.common['Authorization'];
                    set({ 
                        user: null,
                        isAuthenticated: false 
                    });
                }
            },
           
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;
