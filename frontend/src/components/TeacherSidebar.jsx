import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import useCourseStore from "../store/useCourseStore.js";
import useAuthStore from "../store/useAuthStore.js";
import { Transition } from '@headlessui/react'; // npm install @headlessui/react

const TeacherSidebar = () => {
    const { getCourses } = useCourseStore();
    const { logout } = useAuthStore();

    const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
    const [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 fixed h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col py-6">
                <div className="px-6 text-2xl font-bold text-center mb-8">Teacher Panel</div>

                {/* Nav */}
                <nav className="flex flex-col space-y-4 text-left w-full px-6">
                    <Link
                        to="/teacherDashboard"
                        className="hover:bg-blue-500 p-3 rounded-lg font-semibold block"
                    >
                        Dashboard
                    </Link>

                    {/* Course Dropdown */}
                    <div>
                        <button
                            onClick={() => setIsCourseDropdownOpen(prev => !prev)}
                            className="hover:bg-blue-500 w-full text-left p-3 rounded-lg font-semibold flex justify-between items-center"
                        >
                            Course Info
                            <span className="ml-2">{isCourseDropdownOpen ? "▲" : "▼"}</span>
                        </button>

                        <Transition
                            show={isCourseDropdownOpen}
                            enter="transition-all duration-300 ease-in-out"
                            enterFrom="opacity-0 max-h-0"
                            enterTo="opacity-100 max-h-40"
                            leave="transition-all duration-200 ease-in-out"
                            leaveFrom="opacity-100 max-h-40"
                            leaveTo="opacity-0 max-h-0"
                            className="overflow-hidden"
                        >
                            <div className="ml-4 mt-2 space-y-2 text-sm">
                                <Link
                                    to="/teacherDashboard/create_course"
                                    className="block p-2 hover:bg-blue-600 rounded-md"
                                >
                                    Create Course
                                </Link>
                                <Link
                                    to="/teacherDashboard/manage_course"
                                    className="block p-2 hover:bg-blue-600 rounded-md"
                                >
                                    Manage Courses
                                </Link>
                            </div>
                        </Transition>
                    </div>

                    {/* Post Dropdown */}
                    <div>
                        <button
                            onClick={() => setIsPostDropdownOpen(prev => !prev)}
                            className="hover:bg-blue-500 w-full text-left p-3 rounded-lg font-semibold flex justify-between items-center"
                        >
                            Post Feed
                            <span className="ml-2">{isPostDropdownOpen ? "▲" : "▼"}</span>
                        </button>

                        <Transition
                            show={isPostDropdownOpen}
                            enter="transition-all duration-300 ease-in-out"
                            enterFrom="opacity-0 max-h-0"
                            enterTo="opacity-100 max-h-40"
                            leave="transition-all duration-200 ease-in-out"
                            leaveFrom="opacity-100 max-h-40"
                            leaveTo="opacity-0 max-h-0"
                            className="overflow-hidden"
                        >
                            <div className="ml-4 mt-2 space-y-2 text-sm">
                                <Link
                                    to="/teacherDashboard/create_post"
                                    className="block p-2 hover:bg-blue-600 rounded-md"
                                >
                                    Create Post
                                </Link>
                                <Link
                                    to="/teacherDashboard/manage_post"
                                    className="block p-2 hover:bg-blue-600 rounded-md"
                                >
                                    Manage Post
                                </Link>
                            </div>
                        </Transition>
                    </div>

                    <Link
                        to="/teacherDashboard/update_teacher_profile"
                        className="hover:bg-blue-500 p-3 rounded-lg font-semibold block"
                    >
                        Profile
                    </Link>
                </nav>

                {/* Logout */}
                <div className="mt-auto px-6 pt-6">
                    <button
                        onClick={() => logout()}
                        className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V15m3-3h-12m6 6l6-6m-6-6l6 6"
                            />
                        </svg>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className=" p-8 bg-gray-100 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default TeacherSidebar;
