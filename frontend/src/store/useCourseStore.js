import { create } from "zustand";
import { api } from "../lib/utils.js";
import { toast } from "react-toastify";


const useCourseStore = create((set, get) => ({
  allCourses: [],
  enrolledCourses: [],
  loading: false,
  error: null,
  isUploaded: false,
  teacherCourses: [],
  suggestedCourses: [],

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
        set({ loading: true }); 
        const response = await api.put(
            `/v1/teacher/update_course/${courseId}`,
            updatedData
        );
        
        
        if (response.data?.data) {
            set((state) => ({
                allCourses: state.allCourses.map((course) =>
                    course._id === courseId ? response.data.data : course
                ),
                loading: false
            }));
            toast.success("Course updated successfully");
            return true;
        }
        throw new Error("No data received from server");
    } catch (error) {
        console.error("Error updating course:", error);
        set({ loading: false });
        toast.error(error.response?.data?.message || "Failed to update course");
        throw error; 
    }
},

    watchCourse: async (courseId) => {
      try {
        const response = await api.post(`/v1/course/watch/${courseId}`);
        if (response.data?.statusCode === 200) {
          set((state) => ({
            allCourses: state.allCourses.map((course) =>
              course._id === courseId ? response.data.data : course
            ),
          }));
          return response.data.data;
        }
      } catch (error) {
        console.error('Error watching course:', error);
        toast.error('Failed to load course details');
      }
    },

    getTeacherCourses: async () => {
      try {
        set({ loading: true });
        const response = await api.get('/v1/teacher/courses');
       
        
        if (response.data?.data) {  
          set({
            teacherCourses: response.data.data,
            allCourses: response.data.data, 
            loading: false,
          });
        } else {
          set({
            teacherCourses: [],
            allCourses: [],
            loading: false,
          });
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        set({
          error: error.message,
          teacherCourses: [],
          allCourses: [],
          loading: false,
        });
        toast.error("Failed to get courses");
      }
    },
    getAllCoursesStudents: async (courseId) => {
      try {
        set({ loading: true, error: null });
          const response = await api.get(`/v1/student/allCourses`);
          
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
        }
    },

  // enrollInCourse: async (courseId) => {
  //   try {
  //     set({ loading: true });
  //     const response = await api.post(`/v1/student/enroll/${courseId}`);
      
  //     if (response.data?.statusCode === 200) {
  //       toast.success("Successfully enrolled in course!");
  //       return true;
  //     }
  //     throw new Error(response.data?.message || "Failed to enroll in course");
  //   } catch (error) {
  //     console.error("Error enrolling in course:", error);
  //     toast.error(error.response?.data?.message || "Failed to enroll in course");
  //     return false;
  //   } finally {
  //     set({ loading: false });
  //   }
  // },

  //   showEnrolledStudents: async (courseId) => {
  //     try {
  //       const response = await api.get(`/v1/course/enrolledStudents/${courseId}`);
  //       console.log(response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching enrolled students:", error);
  //       toast.error("Failed to fetch enrolled students");
  //     }
  //   },

  suggestedCourses: async () => {
    try {
      set({ loading: true });
      const response = await api.get('/v1/course/suggestedCourses');
      set({ loading: false });

      if (response.data?.statusCode === 200 && response.data?.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching suggested courses:", error);
      set({ loading: false });
      toast.error("Failed to fetch suggested courses");
      return [];
    }
  },

  getAllCourses: async () => {
    try {
        set({ loading: true, error: null });
        const response = await axios.get('/api/courses/all');
        set({ 
            allCourses: response.data.data, 
            loading: false 
        });
        return response.data.data;
    } catch (error) {
        set({ 
            error: error.response?.data?.message || "Failed to fetch courses", 
            loading: false 
        });
        console.error("Error fetching courses:", error);
        throw error;
    }
},

  
 
}));

export default useCourseStore;
