import { create } from 'zustand';
import { api } from '../lib/utils';
import { toast } from 'react-hot-toast';


const usePostStore = create((set) => ({
    posts: [],
    loading: false,
    error: null,
    upvotes: 0,
    downvotes: 0,

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

    deletePost: async (postId) => {
        console.log("Frontend: Trying to delete post with ID:", postId);

        if (!postId) {
            console.error("Frontend: postId is missing!");
            toast.error("Invalid post ID");
            return;
        }

        try {
            const response = await api.delete(`/v1/teacher/delete_post/${postId}`);


            if (response.data?.statusCode === 200) {
                set((state) => ({
                    posts: state.posts.filter((post) => post._id !== postId),
                    loading: false
                }));

            } else {
                throw new Error(response.data?.message || "Failed to delete post");
            }
        } catch (error) {
            console.error("Delete post error:", error);
            toast.error("Error deleting post");
        }
    },

    updatePost: async (postId, postData) => {
        try {
            set({ loading: true });
            const response = await api.put(`/v1/teacher/update_post/${postId}`, {
                title: postData.title,
                postBody: postData.postBody,
                links: postData.links,
                tags: postData.tags
            });

            if (response.data?.statusCode === 200) {
                set((state) => ({
                    posts: state.posts.map((post) =>
                        post._id === postId ? { ...post, ...response.data.data } : post
                    ),
                    loading: false
                }));
                return true;
            }
            throw new Error(response.data?.message || 'Failed to update post');
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
                set({
                    posts: response.data.data,
                    loading: false,
                    error: null
                });
            } else {
                throw new Error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            set({
                loading: false,
                error: error.message,
                posts: []
            });
            toast.error('Failed to fetch posts');
        }
    },

    getAllPosts: async () => {
        try {
            set({ loading: true });
            const response = await api.get('/v1/student/postfeed');
            if (response.data?.statusCode === 200) {
                set({
                    posts: response.data.data,
                    loading: false,
                    error: null
                });
            } else {
                throw new Error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            set({
                loading: false,
                error: error.message,
                posts: []
            });
            toast.error('Failed to fetch posts');
        }
    },

    upvotePost: async (postId) => {
        try {
            const response = await api.get(`/v1/post/upvote/${postId}`);
            if (response.data?.statusCode === 200) {
                const updatedPost = response.data.data;
                set((state) => ({
                    posts: state.posts.map((post) =>
                        post._id === postId ? updatedPost : post
                    )
                }));
                
                toast.success(response.data.message || 'Vote updated!');
            }
        } catch (error) {
            console.error('Error upvoting post:', error);
            toast.error('Failed to update vote');
        }
    },

    downvotePost: async (postId) => {
        try {
            const response = await api.get(`/v1/post/downvote/${postId}`);
            if (response.data?.statusCode === 200) {
                const updatedPost = response.data.data;
                set((state) => ({
                    posts: state.posts.map((post) =>
                        post._id === postId ? updatedPost : post
                    )
                }));
                toast.success(response.data.message || 'Vote updated!');
            }
        } catch (error) {
            console.error('Error downvoting post:', error);
            toast.error('Failed to update vote');
        }
    },

}));

export default usePostStore;