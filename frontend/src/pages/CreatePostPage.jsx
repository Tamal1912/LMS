import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostStore from '@/store/usePostStore';
import useAuthStore from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';
import { Audio } from 'react-loader-spinner'



const CreatePostPage = () => {
    const { user } = useAuthStore();
    const { createPost } = usePostStore();
    const [success, setSuccess] = useState(false);
    const [post, setPost] = useState({
        title: '',
        postBody: '',  // Changed from 'content' to 'postBody' to match backend
        links: [],
        tags: [],
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {  
        e.preventDefault();
        try {
            const result = await createPost({
                ...post,
                author: user?._id  // Add author ID
            });

            if (result) {
                setSuccess(true);
                toast.success('Post created successfully! redirecting...');
                setPost({ title: '', postBody: '', links: [], tags: [] });  // Reset form fields
                setTimeout(() => {

                    navigate('/teacherDashboard/manage_post');  // Redirect to manage posts page
                }, 4000);
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error(error.message || 'Failed to create post');
            setSuccess(false);
        }
    };




    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <button 
            onClick={() => window.history.back()} 
            className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-lg text-gray-800 hover:bg-white/60 transition-all duration-300 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">Create New Post</h1>

                {success ? (
                    <div className="flex flex-col items-center justify-center h-full">

                        <Audio
                            height="80"
                            width="80"
                            radius="9"
                            color="green"
                            ariaLabel="three-dots-loading"
                            wrapperStyle
                            wrapperClass
                        />
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

                        {/* Add important links or resources */}
                        <div className="text-sm text-gray-500 mb-4">
                            <p>Include any important links or resources related to the post:</p>
                            <input
                                type="url"
                                placeholder="e.g., https://www.example.com"
                                value={post.links.join(', ')}
                                onChange={(e) => setPost({ ...post, links: e.target.value.split(',').map(link => link.trim()) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"

                            />
                        </div>

                        {/* Add tags */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tags (comma-separated)
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., React, JavaScript"
                                value={post.tags.join(', ')}
                                onChange={(e) => setPost({ ...post, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                        >
                            Create Post
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreatePostPage;