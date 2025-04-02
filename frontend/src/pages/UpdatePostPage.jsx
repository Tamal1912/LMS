import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePostStore from '../store/usePostStore';
import { toast } from 'react-hot-toast';
import { Audio } from 'react-loader-spinner';
import {PacmanLoader} from "react-spinners" 


const UpdatePostPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { posts, updatePost, loading, getPosts } = usePostStore();
    const [success, setSuccess] = useState(false);
    const [post, setPost] = useState({
        title: '',
        postBody: '',
        links: [],
        tags: [],
    });

    useEffect(() => {
        getPosts();  
    }, []);

    useEffect(() => {
        if (postId && posts.length > 0) {
            const currentPost = posts.find(p => p._id === postId);
            if (currentPost) {
                setPost({
                    title: currentPost.title,
                    postBody: currentPost.postBody,
                    links: currentPost.links || [],
                    tags: currentPost.tags || []
                });
            } else {
                toast.error('Post not found');
                navigate('/teacherDashboard/manage_post');
            }
        }
    }, [postId, posts, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await updatePost(postId, post);

            if (result) {
                setSuccess(true);
                
                toast.success('Post updated successfully! Redirecting...');
                setTimeout(() => {
                    navigate('/teacherDashboard/manage_post');
                }, 2000);
            }
        } catch (error) {
            console.error('Error updating post:', error);
            toast.error(error.message || 'Failed to update post');
            setSuccess(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
                    Update Post
                </h1>

                {success ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <PacmanLoader className='mt-10 mb-10 text-indigo-600 w-20 h-20'/>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={post.title}
                                onChange={(e) => setPost({ ...post, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Content
                            </label>
                            <textarea
                                value={post.postBody}
                                onChange={(e) => setPost({ ...post, postBody: e.target.value })}
                                rows="6"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="text-sm text-gray-500 mb-4">
                            <p>Include any important links or resources related to the post:</p>
                            <input
                                type="url"
                                placeholder="e.g., https://www.example.com"
                                value={post.links.join(', ')}
                                onChange={(e) => setPost({ 
                                    ...post, 
                                    links: e.target.value.split(',').map(link => link.trim()) 
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tags (comma-separated)
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., React, JavaScript"
                                value={post.tags.join(', ')}
                                onChange={(e) => setPost({ 
                                    ...post, 
                                    tags: e.target.value.split(',').map(tag => tag.trim()) 
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                            >
                                {loading ? 'Updating...' : 'Update Post'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/teacherDashboard/manage_post')}
                                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdatePostPage;