import React, { useEffect, useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
import { FiMenu, FiX } from "react-icons/fi";
import usePostStore from "@/store/usePostStore";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader.jsx";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

const PostFeed = () => {
  const { posts, loading, getAllPosts, upvotePost, downvotePost } = usePostStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleUpvote = async (postId) => {
    try {
      await upvotePost(postId);
    } catch (error) {
      console.error("Error upvoting post:", error);
      toast.error("Failed to upvote post");
    }
  };

  const handleDownvote = async (postId) => {
    try {
      await downvotePost(postId);
    } catch (error) {
      console.error("Error downvoting post:", error);
      toast.error("Failed to downvote post");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await getAllPosts();
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to fetch posts");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar - Always fixed */}
      <div
        className={`fixed z-40 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <StudentSidebar />
      </div>
  
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
  
      {/* Hamburger button */}
      <button
        className="fixed top-4 left-4 p-2 bg-white rounded-full shadow-md z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX /> : <FiMenu />}
      </button>
  
      {/* Content Area - Scrollable */}
      <div className="flex-1 ml-0 md:ml-24 h-full overflow-y-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-14">
              🎓 Teacher Updates Timeline
            </h1>
  
            <div className="relative border-l-4 border-purple-400 pl-8 space-y-12">
              {posts.map((post, index) => (
                <div
                  key={post._id}
                  className="relative bg-white shadow-xl rounded-lg px-6 py-6 hover:scale-[1.01] transition-transform duration-300 group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-4 top-6 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white font-bold text-sm">
                    {post.author?.username?.charAt(0)?.toUpperCase() || "?"}
                  </div>
  
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-purple-700">
                        {post.title}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      Posted by:{" "}
                      <span className="text-blue-600">
                        {post.author?.username || "Unknown"}
                      </span>
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {post.postBody}
                    </p>
  
                    {/* Links */}
                    {post.links?.length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-sm font-semibold text-gray-800">
                          Resources:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-blue-500 text-sm">
                          {post.links.map((link, index) => (
                            <li key={index}>
                              <a
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                              >
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
  
                    {/* Tags */}
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap mt-2 gap-2">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
  
                    {/* Votes */}
                    <div className="flex items-center gap-4 mt-4">
                      <BiSolidUpvote
                        onClick={() => handleUpvote(post._id)}
                        className={`cursor-pointer transition-colors ${
                          post.userVote === 'upvote'
                            ? "text-green-600" 
                            : "text-gray-400 hover:text-green-500"
                        }`}
                        size={22}
                      />
                      <span className="text-sm">{post.upvotes || 0}</span>
                      <BiSolidDownvote
                        onClick={() => handleDownvote(post._id)}
                        className={`cursor-pointer transition-colors ${
                          post.userVote === 'downvote'
                            ? "text-red-600" 
                            : "text-gray-400 hover:text-red-500"
                        }`}
                        size={22}
                      />
                      <span className="text-sm">{post.downvotes || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default PostFeed;
