import React, { useEffect } from "react";
import useCourseStore from "../store/useCourseStore.js";
import { Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";

const Courses = () => {
    const { allCourses, error, getCourses, loading } = useCourseStore();

    useEffect(() => {
        getCourses();
    }, [getCourses]);

    if (error) {
        return <div className="text-red-500 text-center mt-10 text-lg">Error: {error}</div>;
    }

    return (
        <div className="fixed inset-0 overflow-hidden flex flex-col bg-gradient-to-br from-[#FAE3D9] via-[#A8DADC] to-[#FFCAD4] w-full">
            {loading ? (
                <div className="flex justify-center items-center flex-grow"><Loader /></div>
            ) : (
                <div className="flex-grow flex flex-col items-center w-full p-12 overflow-hidden">
                    <div className="w-full max-w-7xl h-full flex flex-col">
                        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-gray-200 w-full h-full flex flex-col overflow-hidden">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                                <Link to="/api/studentDashboard" className="text-gray-700 hover:text-gray-900 text-lg font-semibold transition-all duration-300">
                                    ← Back to Dashboard
                                </Link>
                                <h1 className="text-4xl font-bold text-gray-900 text-center">📚 My Learning Journey</h1>
                                <span className="bg-[#A8DADC] text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                                    {allCourses.length} Courses
                                </span>
                            </div>

                            {/* Search & Filter */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                                <input 
                                    type="search" 
                                    placeholder="Search for courses..." 
                                    className="w-full bg-white p-3 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-[#A8DADC] outline-none"
                                />
                                <select className="bg-white p-3 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-[#A8DADC]">
                                    <option value="all">All Courses</option>
                                    <option value="development">Development</option>
                                    <option value="dsa">DSA</option>
                                    <option value="design">Design</option>
                                    <option value="database">Database</option>
                                </select>
                            </div>

                            {/* Course Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 overflow-y-auto flex-grow">
                                {allCourses && allCourses.map((course) => (
                                    <Link to={`/courseDetails/${course._id}`} key={course._id}>
                                        <div className="relative bg-white border border-gray-200 p-6 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer">
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{course.courseName}</h3>
                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                    <span>Progress</span>
                                                    <span className="font-medium">{course.progress || '0'}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-[#A8DADC] rounded-full transition-all duration-1000"
                                                        style={{ width: `${course.progress || 0}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 mb-4 text-sm h-12 overflow-hidden">{course.courseOutcome}</p>
                                            <button className="w-full bg-[#FF6B6B] hover:bg-[#E63946] text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-md">
                                                Watch Now
                                            </button>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
