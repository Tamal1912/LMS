import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore';
import Loader from '@/components/Loader.jsx';
import { FiArrowLeft, FiEye, FiTrash, FiVideo, FiUsers, FiBookOpen, FiX, FiCalendar, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminAllCourses = () => {
  const { getAllCourses, allCourses, loading, deleteCourse, getTeacherById } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [viewingCourse, setViewingCourse] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [instructorCache, setInstructorCache] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await getAllCourses();
      } catch (error) {
        toast.error('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, [getAllCourses]);

  useEffect(() => {
    // Extract unique categories from all courses
    if (allCourses.length > 0) {
      const categoriesSet = new Set();
      allCourses.forEach(course => {
        if (course.courseCategory) {
          categoriesSet.add(course.courseCategory);
        }
      });
      setUniqueCategories(Array.from(categoriesSet));
    }
  }, [allCourses]);

  const getInstructorName = async (courseOwnerId) => {
    if (instructorCache[courseOwnerId]) {
      return instructorCache[courseOwnerId];
    }
    
    try {
      const instructor = await getTeacherById(courseOwnerId);
      if (instructor) {
        const name = instructor.username || instructor.name || 'Unknown';
        setInstructorCache(prev => ({ ...prev, [courseOwnerId]: name }));
        return name;
      }
    } catch (error) {
      console.error('Error fetching instructor:', error);
    }
    
    return 'Unknown Instructor';
  };

  const handleViewCourse = async (course) => {
    // Fetch instructor name if not in cache
    if (!instructorCache[course.courseOwner]) {
      await getInstructorName(course.courseOwner);
    }
    
    setViewingCourse(course);
    setIsViewModalOpen(true);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      if (window.confirm('Are you sure you want to delete this course?')) {
        await deleteCourse(courseId);
        toast.success('Course deleted successfully');
        await getAllCourses(); // Refresh the list
      }
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.courseDescription?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || course.courseCategory === filterCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-3xl font-bold text-center">All Courses</h1>
          <div className="w-24"></div> {/* Empty div for flex spacing */}
        </div>

        {/* Search and Filter */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search courses by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full md:w-1/2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm">Total Courses</h3>
              <p className="text-3xl font-bold">{allCourses.length}</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-full">
              <FiBookOpen className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm">Total Enrollments</h3>
              <p className="text-3xl font-bold">
                {allCourses.reduce((total, course) => total + (course.students?.length || 0), 0)}
              </p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <FiUsers className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm">Categories</h3>
              <p className="text-3xl font-bold">{uniqueCategories.length}</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-full">
              <FiBookOpen className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Course List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-6">Course List</h2>
          <div className="overflow-x-auto">
            {filteredCourses.length > 0 ? (
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-300 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 rounded-tl-lg">Course Name</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Students</th>
                    <th className="px-6 py-3">Created</th>
                    <th className="px-6 py-3 rounded-tr-lg text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredCourses.map((course) => (
                    <tr key={course._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium">
                        {course.courseName}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                          {course.courseCategory || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {course.students?.length || 0}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-4">
                          <button 
                            className="text-blue-400 hover:text-blue-300"
                            title="View Course"
                            onClick={() => handleViewCourse(course)}
                          >
                            <FiEye size={18} />
                          </button>
                          <button 
                            className="text-red-400 hover:text-red-300"
                            onClick={() => handleDeleteCourse(course._id)}
                            title="Delete Course"
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
                <p className="text-xl text-gray-300">No courses found</p>
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

      {/* Course View Modal */}
      {isViewModalOpen && viewingCourse && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl max-w-4xl w-full p-6 border border-gray-700 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button 
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
            >
              <FiX size={20} />
            </button>
            
            <div className="mt-2">
              {/* Course preview */}
              <div className="mb-6 relative overflow-hidden rounded-xl">
                <img 
                  src={viewingCourse.courseImage} 
                  alt={viewingCourse.courseName}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{viewingCourse.courseName}</h2>
                    <div className="flex items-center gap-2 text-gray-300">
                      <FiUser size={14} />
                      <span>{instructorCache[viewingCourse.courseOwner] || 'Loading instructor...'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <FiCalendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Created</p>
                    <p className="text-white font-medium">{new Date(viewingCourse.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <FiUsers className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Students</p>
                    <p className="text-white font-medium">{viewingCourse.students?.length || 0} enrolled</p>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-full">
                    <FiBookOpen className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Category</p>
                    <p className="text-white font-medium">{viewingCourse.courseCategory || 'Uncategorized'}</p>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-2">Description:</h3>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-gray-200">
                  {viewingCourse.courseDescription || 'No description provided'}
                </div>
              </div>
              
              {/* Outcome */}
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-2">Learning Outcomes:</h3>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-gray-200">
                  {viewingCourse.courseOutcome || 'No learning outcomes specified'}
                </div>
              </div>
              
              {/* Video Preview */}
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-2">Course Content Preview:</h3>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <video 
                      controls 
                      src={viewingCourse.courseContent}
                      poster={viewingCourse.courseImage}
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
              
              {/* Delete Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleDeleteCourse(viewingCourse._id);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                >
                  <FiTrash size={16} />
                  Delete this course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllCourses;