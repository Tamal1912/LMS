import { create } from 'zustand';
import { api } from '../lib/utils';
import { toast } from 'react-hot-toast';


const usePostStore = create((set) => ({
    posts: [],
    loading: false,
    error: null,

    createPost: async (postData) => {
        try {
            set({ loading: true });
            const response = await api.post('/v1/teacher/create_post', {
                title: postData.title,
                postBody: postData.postBody,  
                links: postData.links,
                tags: postData.tags
            });
            
            if (response.data?.statusCode === 200) {  
                set((state) => ({
                    posts: [...state.posts, response.data.data],
                    loading: false
                }));
                return true;
            }
            throw new Error(response.data?.message || 'Failed to create post');
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    getPosts: async () => { 
        try {
            set({ loading: true });
            const response = await api.get('/v1/teacher/get_teacher_posts');
            
            if (response.data?.statusCode === 200) {  
                set({ posts: response.data.data, loading: false });
            } else {
                throw new Error(response.data?.message || 'Failed to fetch posts');
            }
        }
        catch (error) {
            set({ loading: false, error: error.message });
            toast.error(error.message); 
        }
    },
}));

export default usePostStore;