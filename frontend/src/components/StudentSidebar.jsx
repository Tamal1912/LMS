import React,{useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import useCourseStore from "../store/useCourseStore.js";
import useAuthStore from "../store/useAuthStore.js";



const StudentSidebar = () => {
    const {courses,getCourses}=useCourseStore();
    const {logout}=useAuthStore();
 
   
       let navigate=useNavigate()
    

   return (
        <div className="flex min-h-screen">
            <aside className="w-64 fixed h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col items-center py-6">
                {/* Logo */}
                <div className="bg-blue-500 w-16 h-16 rounded-full mb-6 flex items-center justify-center text-2xl font-bold shadow-lg">
                    L
                </div>
                {/* Sidebar Items */}
                <nav className="flex flex-col space-y-6 text-center w-full">
                    <div className="hover:bg-blue-500 p-4 rounded-lg cursor-pointer transition">
                        <span className="font-semibold">
                            <Link to="/api/studentDashboard">
                            <button>
                                Dashboard
                            </button>
                            </Link>
                        </span>
                    </div>
                    <div className="hover:bg-blue-500 p-4 rounded-lg cursor-pointer transition">
                        <span className="font-semibold">
                            <Link to="/grades">
                                <button>
                                    Grades
                                </button>
                            </Link>
                        </span>
                    </div>
                    <div className="hover:bg-blue-500 p-4 rounded-lg cursor-pointer transition">
                        <span className="font-semibold">
                            <Link to="/courses" onClick={()=>getCourses()}>
                            <button>
                                Courses
                            </button>
                            </Link>
                        </span>
                    </div>
                    <div className="hover:bg-blue-500 p-4 rounded-lg cursor-pointer transition">
                        <span className="font-semibold">
                            <Link to="/studentDashboard/studentProfile">
                            <button >
                                Profile
                            </button>
                            </Link>
                        </span>
                    </div>
                </nav>
                {/* Logout */}
                <div className="mt-auto">
                    <button
                        onClick={()=>logout()}
                        className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg">
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
            
            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    )
}

export default StudentSidebar