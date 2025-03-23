import React, { useState, useEffect } from "react";
import useCourseStore from "../store/useCourseStore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const ManageCoursePage = () => {
  const { allCourses, getCourses, deleteCourse, loading } = useCourseStore();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const handleDelete = async (courseId) => {
    try {
      setIsDeleting(true);
      const success = await deleteCourse(courseId);
      if (!success) {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error in delete handler:", error);
      toast.error("Failed to delete course");
    } finally {
      setIsDeleting(false);
    }
  };

  const navigate = useNavigate();
  const courses = Array.isArray(allCourses) ? allCourses : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-teal-200 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 gap-4">
          <button
            onClick={() => navigate("/api/teacherDashboard")}
            className="bg-white/50 backdrop-blur-md px-5 py-2 rounded-xl text-gray-900 hover:bg-white/80 transition-all duration-300 shadow-md"
          >
            Dashboard
          </button>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500 text-center">
            Manage Courses
          </h1>
          <Link
            to="/teacherDashboard/create_course"
            className="bg-teal-600 text-white px-5 sm:px-6 py-2 rounded-xl hover:bg-teal-700 transition-all duration-300 shadow-md"
          >
            + New Course
          </Link>
        </div>

        {/* Loading & No Course Message */}
        {loading ? (
          <Loader />
        ) : courses.length === 0 ? (
          <div className="text-center py-12 bg-white/50 backdrop-blur-lg rounded-xl shadow-lg">
            <h3 className="text-lg sm:text-xl text-gray-700 font-semibold">
              No courses found
            </h3>
            <p className="text-gray-500 mt-2">Start by creating a new course</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="rounded-xl overflow-hidden shadow-lg bg-white/80 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-2xl"
              >
                <div className="p-4 sm:p-6">
                  <img
                    src={course?.courseImage}
                    alt={course?.courseName}
                    className="w-full h-40 sm:h-48 object-cover mb-3 sm:mb-4 rounded-lg shadow-md hover:opacity-80 transition-opacity duration-300"
                  />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {course.courseName}
                  </h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                    {course.courseDescription}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-4">
                    <Link
                      to={`/courseDetails/${course._id}`}
                      className="text-teal-600 hover:text-teal-800 font-medium transition-all duration-300"
                    >
                      View Details
                    </Link>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleDelete(course._id)}
                        disabled={isDeleting}
                        className={`text-red-600 hover:text-red-800 font-medium transition-all duration-300 ${
                          isDeleting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                      <Link
                        to={`/teacherDashboard/update_course/${course._id}`}
                        className="text-green-600 hover:text-green-800 font-medium transition-all duration-300"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCoursePage;
 
