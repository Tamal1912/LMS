import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore';
import Loader from '@/components/Loader.jsx';
import { FiArrowLeft,FiThumbsUp,FiThumbsDown, FiEye, FiTrash, FiMessageCircle, FiCalendar, FiUser, FiTag, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { api } from '@/lib/utils';

const AdminAllPostsPage = () => {
  const { getAllPosts, allPosts, deletePost, loading, viewPost, error } = useAdminStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [uniqueTags, setUniqueTags] = useState([]);
  const [viewingPost, setViewingPost] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [authorMap, setAuthorMap] = useState({});

  // Add function to fetch all author details
  const fetchAuthors = useCallback(async () => {
    try {
      const response = await api.get('/v1/admin/getAllTeachers');
      const teachers = response.data.teachers || [];
      
      // Create a map of teacher IDs to usernames
      const teacherMap = {};
      teachers.forEach(teacher => {
        teacherMap[teacher._id] = teacher.username || teacher.name || teacher.email;
      });
      
      setAuthorMap(teacherMap);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await getAllPosts();
        await fetchAuthors(); // Fetch author info after posts
      } catch (error) {
        toast.error('Failed to fetch posts');
      }
    };
    fetchPosts();
  }, [getAllPosts, fetchAuthors]);

  useEffect(() => {
    // Extract unique tags from all posts
    if (allPosts.length > 0) {
      const tagsSet = new Set();
      allPosts.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach(tag => tagsSet.add(tag));
        }
      });
      setUniqueTags(Array.from(tagsSet));
    }
  }, [allPosts]);

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.postBody?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === '' || (post.tags && post.tags.includes(filterTag));
    return matchesSearch && matchesTag;
  });

  const handleViewPost = async (postId) => {
    try {
      const post = allPosts.find(p => p._id === postId);
      if (post) {
        setViewingPost(post);
        setIsViewModalOpen(true);
      } else {
        toast.error('Post not found');
      }
    } catch (error) {
      toast.error('Failed to view post');
      console.error('Error viewing post:', error);
    }
  };

  const handleDeletePost = async(postId) => {
    try {
      if (window.confirm('Are you sure you want to delete this post?')) {
        await deletePost(postId);
        toast.success('Post deleted successfully');
        await getAllPosts(); // Refresh the posts after deletion
      }
    } catch (error) {
      toast.error('Failed to delete post');
      console.error('Error deleting post:', error);
      
    }
  };

  // Better author name helper that uses the author map
  const getAuthorName = (post) => {
    // If the author is just an ID string and we have it in our map
    if (typeof post.author === 'string' && authorMap[post.author]) {
      return authorMap[post.author];
    }
    
    // For formatted display of author ID if we don't have the name
    if (typeof post.author === 'string') {
      // Format the ID for better display
      const shortId = post.author.substring(0, 6) + '...';
      return `Teacher (ID: ${shortId})`;
    }
    
    // Fall back to the existing logic for other cases
    if (post?.author && typeof post.author === 'object') {
      return post.author.username || post.author.name || post.author.email || 'Unknown';
    }
    
    return 'Unknown Author';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <Loader size={50} color="#ffffff" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 mb-8 border border-white/20 flex justify-between items-center">
          <Link to="/admin/dashboard" className="flex items-center gap-2 text-white hover:text-blue-300 transition duration-300">
            <FiArrowLeft />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-center">All Posts</h1>
          <div className="w-24"></div> {/* Empty div for flex spacing */}
        </div>

        {/* Search and Filter */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search posts by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full md:w-1/2">
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Tags</option>
                {uniqueTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm">Total Posts</h3>
              <p className="text-3xl font-bold">{allPosts.length}</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-full">
              <FiMessageCircle className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm">Today's Posts</h3>
              <p className="text-3xl font-bold">
                {allPosts.filter(post => {
                  const today = new Date();
                  const postDate = new Date(post.createdAt);
                  return today.toDateString() === postDate.toDateString();
                }).length}
              </p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <FiCalendar className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm">Unique Authors</h3>
              <p className="text-3xl font-bold">
                {new Set(allPosts.map(post => post.author?._id)).size}
              </p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-full">
              <FiUser className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Post List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-6">Posts List</h2>
          <div className="overflow-x-auto">
            {filteredPosts.length > 0 ? (
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-300 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 rounded-tl-lg">Title</th>
                    <th className="px-6 py-3">Author</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Tags</th>
                    <th className="px-6 py-3 rounded-tr-lg text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium">
                        {post.title}
                      </td>
                      <td className="px-6 py-4">
                        {getAuthorName(post)}
                        {process.env.NODE_ENV === 'development' && !getAuthorName(post).includes('Unknown') && (
                          <span className="block text-xs text-gray-500 mt-1">
                            (ID: {typeof post.author === 'object' ? post.author?._id : post.author})
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {post.tags?.map(tag => (
                            <span key={`${post._id}-${tag}`} className="inline-block bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-4">
                          <button 
                            className="text-blue-400 hover:text-blue-300"
                            title="View Post"
                            onClick={() => handleViewPost(post._id)}
                          >
                            <FiEye size={18} />
                          </button>
                          <button 
                            className="text-red-400 hover:text-red-300"
                            onClick={() => handleDeletePost(post._id)}
                            title="Delete Post"
                          >
                            <FiTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl text-gray-300">No posts found</p>
                {searchTerm && (
                  <p className="text-gray-400 mt-2">
                    Try adjusting your search or filter criteria
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post View Modal */}
      {isViewModalOpen && viewingPost && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl max-w-3xl w-full p-6 border border-gray-700 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button 
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
            >
              <FiX size={20} />
            </button>
            
            <div className="mt-2">
              {/* Title and metadata */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{viewingPost.title}</h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <FiUser size={14} />
                    <span>{getAuthorName(viewingPost)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCalendar size={14} />
                    <span>{new Date(viewingPost.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              {viewingPost.tags && viewingPost.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-gray-400 text-sm mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingPost.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-2">Content:</h3>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 whitespace-pre-wrap text-gray-200">
                  {viewingPost.postBody}
                </div>
              </div>
              
              {/* Links */}
              {viewingPost.links && viewingPost.links.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-gray-400 text-sm mb-2">Links:</h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-400">
                    {viewingPost.links.map((link, index) => (
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
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-green-400">
                    <FiThumbsUp size={16} />
                    <span className="text-sm">Upvotes:</span>
                  </div>
                  <p className="text-xl font-bold text-white mt-1">{viewingPost.upvotes || 0}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-red-400">
                    <FiThumbsDown size={16} />
                    <span className="text-sm">Downvotes:</span>
                  </div>
                  <p className="text-xl font-bold text-white mt-1">{viewingPost.downvotes || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllPostsPage;