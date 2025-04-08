import React, { useEffect, useState } from "react";
import useCourseStore from "../store/useCourseStore.js";
import { Link, useNavigate } from "react-router-dom";
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
            await getAllCoursesStudents();
            setTimeout(() => {
                toast.success("Redirecting to course details...");
                navigate(`/courseDetails/${courseId}`);
            }, 2000);
        } catch (error) {
            console.error("Failed to enroll:", error);
            toast.error(error.response?.data?.message || "Failed to enroll in course");
        }
    };

    if (error) {
        return <div className="text-red-500 text-center mt-10 text-lg">Error: {error}</div>;
    }

    const filteredCourses = allCourses.filter(course =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#f5f9ff] via-[#e0f2ff] to-[#f5f9ff] p-6 overflow-x-hidden">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Loader />
                </div>
            ) : (
                <div className="max-w-7xl mx-auto ">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <Link to="/api/studentDashboard" className="text-blue-600 hover:underline text-lg font-medium">
                            ← Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-center text-gray-800">
                            🚀 Discover Your Next Course
                        </h1>
                        <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold shadow">
                            {allCourses.length} Courses
                        </span>
                    </div>

                    {/* Search Bar */}
                    <div className="flex justify-center mb-10">
                        <input
                            type="text"
                            placeholder="Search Courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <div key={course._id} className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                <img
                                    src={course.courseImage}
                                    alt={course.courseName}
                                    className="w-full h-48 object-cover rounded-xl mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.courseName}</h3>

                                {/* Progress Bar */}
                                <div className="mb-3">
                                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                                        <span>Progress</span>
                                        <span>{course.progress || 0}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                                            style={{ width: `${course.progress || 0}%` }}
                                        />
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm h-12 overflow-hidden mb-4">
                                    {course.courseOutcome}
                                </p>

                                <Link to={`/courseDetails/${course._id}`}>
                                    <button
                                        onClick={() => handleEnroll(course._id)}
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                                    >
                                        Enroll Free
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
