import {create} from 'zustand';
import {api} from '../lib/utils';
import {toast} from 'react-hot-toast';



const useAuthStore = create((set) => ({
    allStudents: [],
    teacher: null,
    isAuthenticated: false,
    loading: false,
    error: null,
   
    trackAllStudents: async () => {
        set({loading: true});
        try {
            const response = await api.get('/v1/teacher/track_all_students');
            
            set({allStudents: response.data.students});
        } catch (error) {
            set({
                error: error.message,
                allStudents: [],
                loading: false
            });
            toast.error('Failed to fetch students');
        } finally {
            set({loading: false});
        }
    },
    getTeacherProfile: async () => {
        set({loading: true});
        try {
            const response = await api.get('/v1/teacher/get_teacher_profile');
            set({teacher: response.data.teacher});
        } catch (error) {
            set({
                error: error.message,
                teacher: null,
                loading: false
            });
            toast.error('Failed to fetch teacher profile');
        } finally {
            set({loading: false});
        }
    },
    getStudentDetails: async (studentId) => {
        set({loading: true});
        try {
            const response = await api.get(`/v1/teacher/get_student_details/${studentId}`);
            set({student: response.data.student});
        } catch (error) {
            set({
                error: error.message,
                loading: false
            });
            toast.error('Failed to fetch student details');
        } finally {
            set({loading: false});
        }
    }, 
    updateTeacherProfile: async (profileData) => {
        set({loading: true});
        try {
            const response = await api.put('/v1/teacher/update_teacher_profile', profileData);
            set({teacher: response.data.teacher});
        } catch (error) {
            set({
                error: error.message,
                loading: false
            });
            toast.error('Failed to update teacher profile');
        } finally {
            set({loading: false});
        }
    },
}));

export default useAuthStore;