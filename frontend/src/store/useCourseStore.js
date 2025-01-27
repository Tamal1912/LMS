import { create } from "zustand";
import { api } from "../lib/utils.js";
import { toast } from "react-toastify";

const useCourseStore = create()((set, get) => ({
  allCourses: [],
  enrolledCourses: [],
  loading: false,
  error: null,
  isUploaded: false,

  // Create Course
  createCourse: async (course) => {
    console.log("Creating course...");
    try {
      const response = await api.post("/v1/teacher/create_course", course);
      console.log("Response from create_course:", response.data);

      // Assuming response.data is the updated courses list
      set({ allCourses: response.data, isUploaded: true });
      toast.success("Course created successfully");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    }
  },

  // Get Courses
  getCourses: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/v1/teacher/get_all_course");

      if (response.data && response.data.courses) {
        set({
          allCourses: response.data.courses,
          loading: false,
        });
      } else {
        set({
          allCourses: [],
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      set({
        error: error.message,
        allCourses: [],
        loading: false,
      });
      toast.error("Failed to get courses");
    }
  },

  // Delete Course
  deleteCourse: async (courseId) => {
    try {
      const response = await api.delete(`/v1/teacher/delete_course/${courseId}`);
      
      if (response.status === 200) {
        set((state) => ({
          allCourses: state.allCourses.filter(course => course._id !== courseId)
        }));
        toast.success("Course deleted successfully");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error(error.response?.data?.message || "Failed to delete course");
      return false;
    }
  },

  updateCourse: async (courseId, updatedData) => {
    try {
      const response = await api.put(
        `/v1/teacher/update_course/${courseId}`,
        updatedData
      );
      
      if (response.data && response.data.course) {
        set((state) => ({
          allCourses: state.allCourses.map((course) =>
            course._id === courseId ? response.data.course : course
          ),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating course:", error);
      throw new Error(error.response?.data?.message || "Failed to update course");
    }
  },

    watchCourse:async(courseId)=>{
      try {
        const response=await api.post(`/v1/course/watch/${courseId}`)
        console.log(response.data)
        
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch course")
        
      }
    }
}));

export default useCourseStore;
