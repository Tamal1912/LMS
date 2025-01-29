import { create } from "zustand";
import { api } from "../lib/utils";
import useAuthStore from "./useAuthStore.js";


// const useProfileStore=create((set)=>({
//     profileData:null,
//     user:null,
//     updateProfileData:async(profileData)=>{
//         const {user}=useAuthStore();
//         const response=await api.put(`/v1/users/student/updateProfile/${user._id}`,profileData);
//         set({profileData:response.data});
//     }
    
// }))

// export default useProfileStore;