import { create } from "zustand";
import { api } from "../lib/utils";
import { use } from "react";
import { all } from "axios";



export const useAdminStore = create((set) => ({
    allCourses: [],
    allStudents: [],
    loading: false,
    error: null,
    isUploaded: false,
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
}));