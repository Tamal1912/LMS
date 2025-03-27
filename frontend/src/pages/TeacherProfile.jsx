import React, { useState, useEffect } from 'react';
import useUserStore from '../store/useUserStore';
import Loader from '../components/Loader';
import { MdAlternateEmail, MdEdit } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaUserCircle, FaGraduationCap } from 'react-icons/fa';

const TeacherProfile = () => {
  const { teacher, getTeacherProfile, updateTeacherProfile, loading } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    courses: []
  });

  useEffect(() => {
    getTeacherProfile();
  }, []);

  useEffect(() => {
    if (teacher) {
      setFormData({
        username: teacher.username || '',
        email: teacher.email || '',
        phone: teacher.phone || '',
        courses: teacher.courses || []
      });
    }
  }, [teacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const success = await updateTeacherProfile({
            username: formData.username,
            email: formData.email,
            phone: formData.phone
        });
        
        if (success) {
            setIsEditing(false);
            await getTeacherProfile(); // Refresh profile data
        }
    } catch (error) {
        console.error('Profile update error:', error);
        
    }
};

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex justify-between items-center">
          <button 
            onClick={() => window.history.back()} 
            className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-lg text-gray-800 hover:bg-white/60 transition-all duration-300 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Teacher Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white mb-4">
              <FaUserCircle className="w-24 h-24" />
            </div>
            {!isEditing ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">{teacher?.username}</h2>
                <p className="text-purple-600 font-medium">Teacher</p>
              </div>
            ) : null}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MdAlternateEmail className="w-5 h-5 mr-2 text-purple-500" />
                    <span className="font-medium">Email</span>
                  </div>
                  <p className="text-gray-800">{teacher?.email}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center text-gray-600 mb-2">
                    <BsFillTelephoneFill className="w-5 h-5 mr-2 text-purple-500" />
                    <span className="font-medium">Phone</span>
                  </div>
                  <p className="text-gray-800">{teacher?.phone || 'Not provided'}</p>
                </div>

                <div className="bg-white/50 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaGraduationCap className="w-5 h-5 mr-2 text-purple-500" />
                    <span className="font-medium">Courses Created</span>
                  </div>
                  <p className="text-gray-800">
                    {teacher?.courses?.length || 0} Course{teacher?.courses?.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  <MdEdit className="w-5 h-5" />
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;