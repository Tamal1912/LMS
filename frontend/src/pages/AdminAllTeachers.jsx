import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore';
import Loader from '@/components/Loader.jsx';
import { FiArrowLeft, FiEye, FiTrash, FiMail, FiCalendar, FiUser, FiBookOpen, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminAllTeachers = () => {
  const { getAllTeachers, allTeachers, loading, deleteTeacher } = useAdminStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingTeacher, setViewingTeacher] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        await getAllTeachers();
      } catch (error) {
        toast.error('Failed to fetch teachers');
      }
    };
    fetchTeachers();
  }, [getAllTeachers]);

  const filteredTeachers = allTeachers.filter(teacher =>
    teacher.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTeacher = (teacher) => {
    setViewingTeacher(teacher);
    setIsViewModalOpen(true);
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      if (window.confirm('Are you sure you want to delete this teacher? This action cannot be undone.')) {
        await deleteTeacher(teacherId);
        toast.success('Teacher deleted successfully');
        await getAllTeachers(); // Refresh the list
      }
    } catch (error) {
      toast.error('Failed to delete teacher');
    }
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
          <h1 className="text-3xl font-bold text-center">All Teachers</h1>
          <div className="w-24"></div> {/* Empty div for flex spacing */}
        </div>

        {/* Search */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <input
            type="text"
            placeholder="Search teachers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm">Total Teachers</h3>
              <p className="text-3xl font-bold">{allTeachers.length}</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-full">
              <FiUser className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm">Total Courses Created</h3>
              <p className="text-3xl font-bold">{allTeachers.reduce((total, teacher) => total + (teacher.courses?.length || 0), 0)}</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <FiBookOpen className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 flex items-center justify-between">
            <div>
              <h3 className="text-gray-300 text-sm">Average Courses Per Teacher</h3>
              <p className="text-3xl font-bold">
                {allTeachers.length > 0 
                  ? (allTeachers.reduce((total, teacher) => total + (teacher.courses?.length || 0), 0) / allTeachers.length).toFixed(1) 
                  : "0"}
              </p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-full">
              <FiBookOpen className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Teachers List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-6">Teacher List</h2>
          <div className="overflow-x-auto">
            {filteredTeachers.length > 0 ? (
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-300 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 rounded-tl-lg">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Courses</th>
                    <th className="px-6 py-3">Joined Date</th>
                    <th className="px-6 py-3 rounded-tr-lg text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium">
                        {teacher.username}
                      </td>
                      <td className="px-6 py-4">
                        {teacher.email}
                      </td>
                      <td className="px-6 py-4">
                        {teacher.courses?.length || 0}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(teacher.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-4">
                          <button 
                            className="text-blue-400 hover:text-blue-300"
                            title="View Teacher"
                            onClick={() => handleViewTeacher(teacher)}
                          >
                            <FiEye size={18} />
                          </button>
                          <button 
                            className="text-red-400 hover:text-red-300"
                            onClick={() => handleDeleteTeacher(teacher._id)}
                            title="Delete Teacher"
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
                <p className="text-xl text-gray-300">No teachers found</p>
                {searchTerm && (
                  <p className="text-gray-400 mt-2">
                    Try adjusting your search criteria
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Teacher View Modal */}
      {isViewModalOpen && viewingTeacher && (
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
              <div className="mb-6 flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {viewingTeacher.username?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{viewingTeacher.username}</h2>
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <FiMail size={14} />
                    <span>{viewingTeacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <FiCalendar size={14} />
                    <span>Joined {new Date(viewingTeacher.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Bio */}
              {viewingTeacher.bio && (
                <div className="mb-6">
                  <h3 className="text-gray-400 text-sm mb-2">Bio:</h3>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-gray-200">
                    {viewingTeacher.bio}
                  </div>
                </div>
              )}
              
              {/* Education */}
              {viewingTeacher.education && (
                <div className="mb-6">
                  <h3 className="text-gray-400 text-sm mb-2">Education:</h3>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <p className="text-white font-medium">{viewingTeacher.education.degree}</p>
                    <p className="text-gray-300">{viewingTeacher.education.institution}</p>
                    <p className="text-gray-400 text-sm">{viewingTeacher.education.yearOfPassing}</p>
                  </div>
                </div>
              )}
              
              {/* Experience */}
              {viewingTeacher.experience && (
                <div className="mb-6">
                  <h3 className="text-gray-400 text-sm mb-2">Experience:</h3>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <p className="text-white font-medium">{viewingTeacher.experience.role}</p>
                    <p className="text-gray-300">{viewingTeacher.experience.company}</p>
                    <p className="text-gray-400 text-sm">{viewingTeacher.experience.duration}</p>
                  </div>
                </div>
              )}
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-blue-400">
                    <FiBookOpen size={16} />
                    <span className="text-sm">Courses Created:</span>
                  </div>
                  <p className="text-xl font-bold text-white mt-1">{viewingTeacher.courses?.length || 0}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-green-400">
                    <FiUser size={16} />
                    <span className="text-sm">Students Enrolled:</span>
                  </div>
                  <p className="text-xl font-bold text-white mt-1">
                    {viewingTeacher.enrolledStudents?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllTeachers;