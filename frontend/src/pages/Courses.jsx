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
    <div className="fixed inset-0 overflow-y-auto bg-gradient-to-br from-[#F8EDEB] via-[#E0C3FC] to-[#8EC5FC] min-h-screen p-8">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen"><Loader /></div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/30">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <Link to="/studentDashboard" className="text-gray-700 hover:text-indigo-700 text-lg font-semibold transition-all duration-300">
                ← Back to Dashboard
              </Link>
              <h1 className="text-4xl font-extrabold text-gray-900 text-center my-4 md:my-0">🎓 Discover Your Next Skill</h1>
              <span className="bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                {allCourses.length} Courses Available
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center mb-8">
              <input
                type="text"
                placeholder="🔍 Search for a course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-5 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1"
                >
                  <img
                    src={course.courseImage}
                    alt={course.courseName}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{course.courseName}</h3>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">{course.progress || "0"}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-gradient-to-r from-[#43cea2] to-[#185a9d] rounded-full transition-all duration-1000"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm h-12 overflow-hidden">{course.courseOutcome}</p>
                  
                  <div className="mt-4">
                    <button
                     onClick={()=>navigate(`/courseDetails/${course._id}`)}
                      className="w-full bg-gradient-to-r from-[#ff6a00] to-[#ee0979] hover:brightness-110 text-white py-3 rounded-full font-medium shadow-lg transition duration-300"
                    >
                      🚀 Enroll for Free
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center text-gray-600 mt-10">
                No courses found matching "<span className="font-semibold">{searchTerm}</span>"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;