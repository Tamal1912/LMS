import React, { useEffect, useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
import { FiMenu, FiX } from "react-icons/fi";
import useUserStore from "../store/useUserStore.js";
import usePostStore from "@/store/usePostStore";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader.jsx";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";

const PostFeed = () => {
  const { posts, loading, getAllPosts, upvotePost, downvotePost } = usePostStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  console.log("Posts in PostFeed:", posts); // Debugging line
  
  const handleUpvote = async (postId) => {
    try {
      await upvotePost(postId);
    } catch (error) {
      console.error('Error upvoting post:', error);
      toast.error('Failed to upvote post');
    }
  };

  const handleDownvote = async (postId) => {
    try {
      await downvotePost(postId);
    } catch (error) {
      console.error('Error downvoting post:', error);
      toast.error('Failed to downvote post');
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await getAllPosts();
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to fetch posts');
      }
    };
    fetchPosts();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Sidebar */}
      <div
        className={`fixed z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <StudentSidebar />
      </div>

      {/* Hamburger Menu */}
      <button
        className="absolute top-5 left-5 text-gray-700 text-3xl md:hidden z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Teacher Updates 📢
        </h1>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post._id} // Fixed key to use `_id` instead of `id`
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                  {post.author.username.charAt(0).toUpperCase()}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {post.authorName}
                      </h3>
                      <p className="text-lg font-bold text-purple-600 font-medium">
                        {post.title}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{post.createdAt}</span>
                  </div>
                  
                  <p className="mt-3 text-gray-600">{post.postBody}</p>

                  {/* Links or Resources */}
                  {post.links && post.links.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <h4 className="font-semibold text-gray-800">Resources:</h4>
                      {post.links.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags && post.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <BiSolidUpvote
                      onClick={() => handleUpvote(post._id)}
                      style={{ color: "green", cursor: "pointer" }}
                    />
                    <span className="text-gray-600">{post.upvotes}</span>
                    <BiSolidDownvote
                      onClick={() => handleDownvote(post._id)}
                      style={{ color: "red", cursor: "pointer" }}
                    />
                    <span className="text-gray-600">{post.downvotes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
