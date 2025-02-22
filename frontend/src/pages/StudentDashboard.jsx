import React from "react";
import { useState, useEffect } from "react";
import StudentSidebar from "../components/StudentSidebar";
import useAuthStore from "../store/useAuthStore.js";
import Loader from "../components/Loader.jsx";

const StudentDashboard = () => {
  const { user, getProfile, loading, error } = useAuthStore();
  const [userName, setUserName] = useState("");
  const [firstLetter, setFirstLetter] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?._id) {
        const profileData = await getProfile(user._id);
        if (profileData?.username) {
          setUserName(profileData.username);
          setFirstLetter(profileData.username.charAt(0).toUpperCase());
        }
      }
    };
    fetchProfile();
  }, [user?._id, getProfile]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
        <Loader />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="text-center text-red-500">
          <p>Error loading profile: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      <StudentSidebar />
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="bg-white rounded-3xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600">
                Hello, {userName || 'Student'}
              </h1>
              <p className="text-gray-500 mt-2 text-lg">Let's make learning awesome today! ✨</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-white rounded-full p-1">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{firstLetter || 'S'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Academic Stats */}
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <span className="p-2 bg-violet-100 rounded-lg">📚</span>
              Academic Stats
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl">
                <span className="text-gray-600">Program</span>
                <span className="font-semibold text-indigo-600">{user.program}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold text-blue-600">{user.yearJoined}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-violet-50 rounded-2xl">
                <span className="text-gray-600">Credits</span>
                <span className="font-semibold text-violet-600">85/120</span>
              </div>
            </div>
          </div>

          {/* CGPA Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <span className="p-2 bg-blue-100 rounded-lg">🎯</span>
                Performance
              </h2>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600">
                  8.85
                </div>
                <div className="text-xl text-gray-500">Current CGPA</div>
                <div className="w-full h-3 bg-gray-100 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-full"
                    style={{ width: '88.5%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
