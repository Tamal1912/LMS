import {create} from "zustand";
import axios from "axios";
import {toast} from "react-hot-toast";


const useAuthStore=create((get,set)=>({
    isAuthenticated:false,
    
    handleTeacherLogin:async(teacherLogin)=>{
        try {
            const response=await api.post("/v1/users/teacher/login",teacherLogin);
            if(response.status===200){
                toast.success("Login successful");
            }
            set({isAuthenticated:true});
        } catch (error) {
            toast.error("Login failed");
        }
    }

}))

export default useAuthStore;
