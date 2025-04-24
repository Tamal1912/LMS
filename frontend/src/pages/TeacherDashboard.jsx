import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TeacherSidebar from "../components/TeacherSidebar.jsx";
import useUserStore from '../store/useUserStore.js';
import { FiMenu, FiX } from 'react-icons/fi';

const TeacherDashboard = () => {
    const { getTeacherProfile, teacher, loading } = useUserStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                await getTeacherProfile();
            } catch (error) {
                console.error("Failed to fetch teacher profile:", error);
            }
        };
        
        if (!teacher?._id) {
            fetchTeacherData();
        }
    }, [getTeacherProfile]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader /></div>;
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setIsOverlayVisible(!isOverlayVisible);
    };

    return (
        <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 text-gray-800">
            
            {/* Overlay for mobile */}
            {isOverlayVisible && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar + Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className={`fixed md:relative z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out transform 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 h-screen overflow-y-auto`}>
                    <TeacherSidebar />
                </div>

                {/* Hamburger */}
                <button
                    className="fixed top-4 left-4 p-2 rounded-lg bg-white shadow-lg text-gray-700 text-2xl md:hidden z-50 hover:bg-gray-100"
                    onClick={toggleSidebar}
                    aria-label="Toggle Menu"
                >
                    {isSidebarOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Main content */}
                <main className={`flex-1 w-full px-2 md:px-8 pt-4 pb-0 overflow-hidden`}>
                    <div className="max-w-7xl mx-auto flex flex-col h-full">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, {teacher?.name || 'Teacher'} 👋</h1>
                            <p className="text-sm text-gray-500 mb-1">Email: {teacher?.email}</p>
                            <p className="text-sm text-gray-500">Role: <span className="capitalize">{teacher?.role || "teacher"}</span></p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                            <StatCard label="Courses Created" value={teacher?.courses?.length || 0} color="blue" />
                            <StatCard label="Posts Made" value={teacher?.posts?.length || 0} color="green" />
                             
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
                            <ActionCard
                                title="🎓 Create New Course"
                                desc="Design & launch a course your students will love."
                                to="/teacherDashboard/create_course"
                                gradient="from-indigo-500 to-indigo-700"
                            />
                            <ActionCard
                                title="📝 Manage Posts"
                                desc="Edit, delete, or create new educational content."
                                to="/teacherDashboard/manage_post"
                                gradient="from-green-500 to-green-700"
                            />
                            <ActionCard
                                title="⚙️ Profile Settings"
                                desc="Update your photo, bio, and contact details."
                                to="/teacherDashboard/update_teacher_profile"
                                gradient="from-amber-500 to-orange-600"
                            />
                        </div>

                        {/* Feature Highlights */}
                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold mb-6">✨ What You Can Do as a Teacher</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { title: "Create Rich Courses", desc: "Design structured content with videos, quizzes, and resources." },
                                    { title: "Post Regular Updates", desc: "Share announcements and motivational posts." },
                                    { title: "Earn Reputation", desc: "Build your brand and get recognized by the university." },
                                ].map((feature, i) => (
                                    <div key={i} className="bg-white rounded-xl shadow p-5 border-l-4 border-indigo-500">
                                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                        <p className="text-sm text-gray-600">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, color }) => (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 border-${color}-500`}>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <h2 className={`text-2xl font-semibold text-${color}-700`}>{value}</h2>
    </div>
);

const ActionCard = ({ title, desc, to, gradient }) => (
    <Link to={to} className={`bg-gradient-to-r ${gradient} text-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300`}>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm opacity-80">{desc}</p>
    </Link>
);

export default TeacherDashboard;
