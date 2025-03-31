import React, { useEffect, useState } from "react";
import useCourseStore from "../store/useCourseStore.js";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate import
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";

const Courses = () => {
    const { allCourses, error, getAllCoursesStudents, loading, enrollInCourse } = useCourseStore();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllCoursesStudents();
    }, [getAllCoursesStudents]);

    const handleEnroll = async (courseId) => {
        try {
            await enrollInCourse(courseId);
            toast.success("Successfully enrolled in course!");
            // Refresh the courses list to show updated enrollment status
            await getAllCoursesStudents();
            // Navigate to watch course page after successful enrollment
            navigate(`/courseDetails/${courseId}`);
        } catch (error) {
            console.error("Failed to enroll:", error);
            toast.error(error.response?.data?.message || "Failed to enroll in course");
        }
    };

    if (error) {
        return <div className="text-red-500 text-center mt-10 text-lg">Error: {error}</div>;
    }

    const filteredCourses = allCourses.filter(course => {
        return  course.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    })

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
                                <h1 className="text-4xl font-bold text-gray-900 text-center">📚 Explore Courses</h1>
                                <span className="bg-[#A8DADC] text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                                    {allCourses.length} Courses
                                </span>
                            </div>

                            {/* Search & Filter */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Search Courses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Course Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 overflow-y-auto flex-grow">
                                {filteredCourses.map((course) => (
                                    <div key={course._id} className="relative border border-gray-200 p-6 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer">
                                        <img src={course.courseImage} alt={course.courseName} className="w-full h-48 object-cover rounded-lg mb-4" />
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
                                        <div className="mt-4">
                                            <Link to={`/courseDetails/${course._id}`}>
                                                <button

                                                    className="w-full bg-[#FF6B6B] hover:bg-[#E63946] text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-md"

                                                >
                                                    Enroll Free
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
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
