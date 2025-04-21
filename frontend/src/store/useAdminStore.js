import { create } from "zustand";
import { api } from "../lib/utils";
import { use } from "react";
import { all } from "axios";



export const useAdminStore = create((set) => ({
    allCourses: [],
    allStudents: [],
    allTeachers: [],
    allPosts: [],
    loading: false,
    error: null,
    isUploaded: false,
    teacherUsers: {}, // Add a new state for teacher users map
    trackAllStudents: async () => {
        set({ loading: true });
        try {
            const response = await api.get("/v1/admin/trackAllStudents");
            set({ allStudents: response.data.students, loading: false });
            return response.data.students;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },
    getAllCourses: async () => {
        set({ loading: true });
        try {
            const response = await api.get("/v1/admin/getAllCourses");
            set({ allCourses: response.data.courses, loading: false });
            return response.data.courses;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },
    getAllTeachers: async () => {
        set({ loading: true });
        try {
            const response = await api.get("/v1/admin/getAllTeachers");
            set({ allTeachers: response.data.teachers, loading: false });
            return response.data.teachers;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    getAllPosts: async () => {
        set({ loading: true });
        try {
            const response = await api.get("/v1/admin/getAllPosts");
            set({ allPosts: response.data.posts, loading: false });
            return response.data.posts;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },
    deletePost: async (postId) => {
        set({ loading: true });
        try {
            const response = await api.delete(`/v1/admin/deletePost/${postId}`);
            set({ isUploaded: true, loading: false });
            return response.data;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },
    viewPost: async (postId) => {
        set({ loading: true });
        try {
            const response = await api.get(`/v1/admin/viewPost/${postId}`);
            set({ allPosts: response.data.post, loading: false });
            return response.data.post;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },
    getTeacherById: async (teacherId) => { // Method to get teacher details by ID
        try {
            const response = await api.get(`/v1/admin/getTeacher/${teacherId}`);
            
            // Update the teacherUsers map with the new teacher
            set(state => ({
                teacherUsers: {
                    ...state.teacherUsers,
                    [teacherId]: response.data.teacher
                }
            }));
            
            return response.data.teacher;
        } catch (error) {
            console.error("Error fetching teacher:", error);
            return null;
        }
    },
}));