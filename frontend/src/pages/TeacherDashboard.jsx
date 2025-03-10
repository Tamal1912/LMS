import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.js';
import { LogOut, BookOpen, Users, PlusCircle } from 'lucide-react';
import useUserStore from '../store/useUserStore.js';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const {getTeacherProfile, teacher} = useUserStore();

  useEffect(() => {
    getTeacherProfile();
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eceeff] to-[#d6e4ff] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white shadow-lg backdrop-blur-md rounded-b-3xl mx-6 mt-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Teacher Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full shadow-md border-2 border-white">
            <h3 className="text-2xl font-bold text-white ">{ teacher?.username.toUpperCase().charAt(0) }</h3>
          </div>
          <Button
            onClick={() => logout()}
            className="flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-md">
            <LogOut className="mr-2" size={18} />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-6">
        
        {/* Track Students */}
        <Link to="/api/trackAllStudents">
          <div className="group p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-400 transform hover:-translate-y-2 flex flex-col items-center">
            <Users className="text-blue-600" size={40} />
            <h2 className="text-2xl font-bold text-gray-800 mt-4 group-hover:text-blue-600">Track Students</h2>
            <p className="text-gray-600 text-center mt-2">Monitor student progress in real-time.</p>
          </div>
        </Link>

        {/* View Tasks */}
        <div className="group p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-400 transform hover:-translate-y-2 flex flex-col items-center">
          <BookOpen className="text-indigo-600" size={40} />
          <h2 className="text-2xl font-bold text-gray-800 mt-4 group-hover:text-indigo-600">View Tasks</h2>
          <p className="text-gray-600 text-center mt-2">Manage and assign tasks to students.</p>
        </div>

        {/* Manage Course */}
        <Link to="/teacherDashboard/manage_course">
          <div className="group p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-400 transform hover:-translate-y-2 flex flex-col items-center">
            <BookOpen className="text-green-600" size={40} />
            <h2 className="text-2xl font-bold text-gray-800 mt-4 group-hover:text-green-600">Manage Course</h2>
            <p className="text-gray-600 text-center mt-2">Update and organize your courses.</p>
          </div>
        </Link>

        {/* Create Course */}
        <Link to="/teacherDashboard/create_course">
          <div className="group p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-400 transform hover:-translate-y-2 flex flex-col items-center">
            <PlusCircle className="text-purple-600" size={40} />
            <h2 className="text-2xl font-bold text-gray-800 mt-4 group-hover:text-purple-600">Create Course</h2>
            <p className="text-gray-600 text-center mt-2">Design and publish new courses.</p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default TeacherDashboard;
