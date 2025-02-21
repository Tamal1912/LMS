import React, { useEffect } from "react";
import useCourseStore from "../store/useCourseStore.js";
import { Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";

const Courses = () => {
    const { allCourses, error, getCourses,loading } = useCourseStore();

    useEffect(() => {
        getCourses();
    }, [getCourses]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        loading ? <div className="flex justify-center items-center h-screen"><Loader/></div> :

            // Start of Selection
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                            <Link to="/api/studentDashboard" className="text-indigo-600 hover:text-indigo-500 mb-4 md:mb-0 text-lg font-semibold">
                                Back to Dashboard
                            </Link>
                            <div className="relative">
                                <h1 className="text-4xl font-bold text-indigo-700">
                                    My Learning Journey
                                </h1>
                                <span className="absolute -top-4 right-0 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                    {allCourses.length} Courses
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-8">
                            <input type="search" placeholder="Search for courses" className="w-full bg-indigo-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50" />
                            <button className="bg-indigo-600 text-white px-4 py-2 ml-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">Search</button>
                        </div>

                        <div className="flex justify-between items-center mb-8">
                         {/* //filtering courses */}
                            <select className="bg-indigo-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
                                <option value="all">All Courses</option>
                                <option value="development">Developement Courses</option>
                                <option value="dsa">DSA</option>
                                <option value="design">Design</option>
                                <option value="database">Database</option>
                            </select>
                        </div>
    
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {allCourses && allCourses.map((course) => (
                                <div key={course._id} className="bg-indigo-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-semibold text-indigo-700">{course.courseName}</h3>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-indigo-600 mb-1">
                                            <span>Progress</span>
                                            <span className="font-medium">{course.progress || '0'}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-indigo-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-600 rounded-full transition-width duration-500" style={{width: `${course.progress || 0}%`}}></div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-6 line-clamp-2 h-12">{course.courseOutcome}</p>
                                    <Link to={`/courseDetails/${course._id}`}>
                                        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-medium transition-colors duration-300">
                                            Watch Now
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Courses;
