import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import useCourseStore from "../store/useCourseStore.js";
import useAuthStore from "../store/useAuthStore.js";
import { FaLock } from 'react-icons/fa';

const StudentSidebar = () => {
    const { logout, user } = useAuthStore();
    const [isVerified,setIsVerified] = useState(false)
    const [showVerifyModal, setShowVerifyModal] = useState(false);

    // Courses Section with Lock if Not Verified
    const handleCourseClick = (e) => {
        if (!isVerified) {
            e.preventDefault();
            e.stopPropagation();
            setShowVerifyModal(true);
        }
    };

    return (
        <>
            <div className="flex min-h-screen">
                <aside className="w-64 fixed h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col items-center py-6">
                    {/* Sidebar Items */}
                    <nav className="flex flex-col space-y-6 text-center w-full">
                        <div className="hover:bg-blue-500 p-4 rounded-lg cursor-pointer transition">
                            <span className="font-semibold">
                                <Link to="/studentDashboard">
                                    <button>Dashboard</button>
                                </Link>
                            </span>
                        </div>

                        <div className="hover:bg-blue-500 p-4 rounded-lg cursor-pointer transition">
                            <span className="font-semibold">
                                <Link to="/postFeed">
                                    <button>Posts</button>
                                </Link>
                            </span>
                        </div>

                        {/* Courses Section with Lock if Not Verified */}
                        <div
                            className={`hover:bg-blue-500 p-4 rounded-lg transition ${!user.isVerified ? "opacity-60" : "cursor-pointer"}`}
                            onClick={handleCourseClick}
                        >
                            <span className="font-semibold flex items-center justify-center gap-2">
                                {user.isVerified? (
                                            <Link to="/courses">
                                    <button>
                                            Courses
                                            
                                            </button>
                                    </Link>
                                ) 
                                
                                : (
                                    <>
                                        Courses <FaLock className="text-red-400" />
                                    </>
                                )}
                            </span>
                        </div>

                        <div className="hover:bg-blue-500 p-4 rounded-lg cursor-pointer transition">
                            <span className="font-semibold">
                                <Link to="/studentDashboard/studentProfile">
                                    <button>Profile</button>
                                </Link>
                            </span>
                        </div>
                    </nav>

                    {/* Logout */}
                    <div className="mt-auto">
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
                <main className="flex-1 ml-64 p-8">
                    <Outlet />
                </main>
            </div>

            {/* Modal - Moved completely outside the layout */}
            {showVerifyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Verification Required</h3>
                        <p className="text-gray-700">
                            Your account is not verified yet. Please request verification from the profile page to access courses.
                        </p>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowVerifyModal(false)}
                                className=" bg-sky-400 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentSidebar;
