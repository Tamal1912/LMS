import {create} from "zustand";
import {api} from "../lib/utils.js";
import {toast} from "react-toastify";


const useCourseStore=create((get,set)=>({
    courses:[],
    
    createCourse:async(course)=>{
        console.log("create course");
        try {
            const response=await api.post("/v1/teacher/create_course",course);
            set({courses:response.data});
            toast.success("Course created successfully");
            
        } catch (error) {
            toast.error("Failed to create course");
        }
    }
    
}))

export default useCourseStore;