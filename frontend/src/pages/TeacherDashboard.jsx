import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.js';
import useUserStore from '../store/useUserStore.js';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const { getTeacherProfile, teacher } = useUserStore(); 


    useEffect(() => {
        getTeacherProfile();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F0E6FA] via-[#D6F0F7] to-[#FDE5E5] p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center p-5 bg-white shadow-md rounded-xl border border-gray-200">
                <h1 className="text-3xl font-bold text-indigo-800">📚 Teacher Dashboard</h1>
                <div className="flex items-center space-x-4">
                    {/* Profile Avatar */}
                    <div className="h-10 w-10 bg-gray-300 rounded-full border border-gray-400 flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-800">
                            {teacher?.username?.charAt(0).toUpperCase() || "?"}
                        </span>
                    </div>
                    <Button
                        onClick={() => logout()}
                        className="bg-indigo-500 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 
                        hover:bg-indigo-600 hover:shadow-[0_0_15px_#6366f1] hover:scale-105"
                    >
                        Logout
                    </Button>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                

                {/* Track Students */}
                <div className="p-6 bg-white bg-opacity-90 shadow-lg rounded-xl border border-blue-300 
                hover:shadow-[0_0_15px_#3b82f6] hover:scale-105 transition duration-300 ease-in-out">
                    <Link to="/api/trackAllStudents" className="block">
                        <h2 className="text-xl font-semibold text-blue-800 mb-2">🎯 Track Students</h2>
                        <p className="text-gray-600">Monitor student progress with real-time tracking.</p>
                    </Link>
                </div>

                {/* View Tasks */}
                <div className="p-6 bg-white bg-opacity-90 shadow-lg rounded-xl border border-teal-300 
                hover:shadow-[0_0_15px_#14b8a6] hover:scale-105 transition duration-300 ease-in-out">
                    <Link to="/teacherDashboard/update_teacher_profile">
                    <h2 className="text-xl font-semibold text-teal-800 mb-2"> View Profile</h2>
                    <p className="text-gray-600">View and update your teacher profile.</p>
                    </Link>
                </div>

                {/* Manage Course */}
                <div className="p-6 bg-white bg-opacity-90 shadow-lg rounded-xl border border-purple-300 
                hover:shadow-[0_0_15px_#8b5cf6] hover:scale-105 transition duration-300 ease-in-out">
                    <Link to="/teacherDashboard/manage_course">
                        <h2 className="text-xl font-semibold text-purple-800 mb-2">📖 Manage Course</h2>
                        <p className="text-gray-600">Oversee and update your courses.</p>
                    </Link>
                </div>

                {/* Create Course */}
                <div className="p-6 bg-white bg-opacity-90 shadow-lg rounded-xl border border-indigo-300 
                hover:shadow-[0_0_15px_#6366f1] hover:scale-105 transition duration-300 ease-in-out">
                    <Link to="/teacherDashboard/create_course">
                        <h2 className="text-xl font-semibold text-indigo-800 mb-2">🚀 Create Course</h2>
                        <p className="text-gray-600">Build and launch new courses.</p>
                    </Link>
                </div>
                {/* create post */}
                <div className="p-6 bg-white bg-opacity-90 shadow-lg rounded-xl border border-indigo-300 
                hover:shadow-[0_0_15px_#6366f1] hover:scale-105 transition duration-300 ease-in-out">
                    <Link to="/teacherDashboard/create_post">
                        <h2 className="text-xl font-semibold text-indigo-800 mb-2"> 🚀 Create Post</h2>
                        <p className="text-gray-600">share Your daily thoughts</p>
                    </Link>
                </div>

                 {/* manage posts */}
                 <div className="p-6 bg-white bg-opacity-90 shadow-lg rounded-xl border border-indigo-300 
                hover:shadow-[0_0_15px_#6366f1] hover:scale-105 transition duration-300 ease-in-out">
                    <Link to="/teacherDashboard/manage_post">
                        <h2 className="text-xl font-semibold text-indigo-800 mb-2"> 🚀 Manage Post</h2>
                        <p className="text-gray-600">Manage Your posts</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
