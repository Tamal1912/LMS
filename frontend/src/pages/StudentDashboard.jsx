import React, { useState, useEffect } from "react";
import StudentSidebar from "../components/StudentSidebar";
import useAuthStore from "../store/useAuthStore.js";
import Loader from "../components/Loader.jsx";
import { FiMenu, FiX } from "react-icons/fi";

const StudentDashboard = () => {
  const { user, getProfile, loading, error } = useAuthStore();
  const [userName, setUserName] = useState("");
  const [firstLetter, setFirstLetter] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="text-center text-red-500">
          <p>Error loading profile: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-pink-50 to-purple-100">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
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

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 relative overflow-y-auto">
        {/* Header */}
        <header className="bg-white bg-opacity-80 rounded-3xl shadow-lg p-6 md:p-8 mb-6 md:mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                Hello, {userName || "Student"}
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-lg">
                Let’s make learning amazing today! ✨
              </p>
            </div>
            <div className="relative group mt-4 md:mt-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-1000"></div>
              <div className="relative bg-white rounded-full p-1">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl font-bold">
                    {firstLetter || "S"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Academic Stats */}
          <div className="bg-white bg-opacity-80 rounded-3xl shadow-md p-6 md:p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="p-2 bg-pink-100 rounded-lg">📚</span>
              Academic Stats
            </h2>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
                <span className="text-gray-600">Program</span>
                <span className="font-semibold text-purple-600">{user.program}</span>
              </div>
              <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold text-indigo-600">{user.yearJoined}</span>
              </div>
              <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-2xl">
                <span className="text-gray-600">Credits</span>
                <span className="font-semibold text-pink-600">85/120</span>
              </div>
            </div>
          </div>

          {/* Performance Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative bg-white bg-opacity-80 rounded-3xl shadow-md p-6 md:p-8 border border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="p-2 bg-purple-100 rounded-lg">🎯</span>
                Performance
              </h2>
              <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4">
                <div className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                  8.85
                </div>
                <div className="text-lg md:text-xl text-gray-500">Current CGPA</div>
                <div className="w-full h-2 md:h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"
                    style={{ width: "88.5%" }}
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
