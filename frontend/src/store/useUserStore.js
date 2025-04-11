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
        try {
            set({ loading: true });
            const response = await api.get('/v1/teacher/track_all_students');
            
            if (response.data?.statusCode === 200) {
                set({
                    allStudents: response.data.data,
                    loading: false,
                    error: null
                });
            } else {
                throw new Error(response.data?.message || 'Failed to fetch students');
            }
        } catch (error) {
            console.error('Error fetching students:', error);
            set({ 
                loading: false, 
                error: error.message,
                allStudents: []
            });
        }
    },
    getTeacherProfile: async () => {
        try {
            const response = await api.get('/v1/teacher/get_teacher_profile');
            set({ teacher: response.data.teacher, loading: false });
            return response.data.teacher;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
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
        try {
            set({loading: true});
            const response = await api.put('/v1/teacher/update_teacher_profile', profileData);
            
            if(response.data?.teacher){
                set({teacher: response.data.teacher,loading: false});
                toast.success('profile updated successfully');
                return true;
            }

            throw new Error('no teacher data found');
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