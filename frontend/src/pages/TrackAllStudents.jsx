import React, { useEffect } from 'react';
import useUserStore from '../store/useUserStore';
import useCourseStore from '../store/useCourseStore';
import Loader from '@/components/Loader';
import useAuthStore from '@/store/useAuthStore';
import { Link } from 'react-router-dom';
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";

const TrackAllStudents = () => {
  const { allStudents, teacher, trackAllStudents, getTeacherProfile } = useUserStore();
  const { teacherCourses, getTeacherCourses, loading,enrolledStudents } = useCourseStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getTeacherProfile();
    
  }, [trackAllStudents, user]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await getTeacherCourses();
        console.log("Fetched courses:", teacherCourses); // Debug log
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-600"><Loader /></div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 text-gray-900 p-6">
      {/* Header */}
      <div className="mb-12 flex flex-wrap justify-between items-center gap-2">
        <button 
          onClick={() => window.history.back()} 
          className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-lg text-gray-800 hover:bg-white/60 transition-all duration-300 flex items-center gap-2 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Dashboard
        </button>
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mt-2 sm:mt-0">
          Students
        </h1>
      </div>

      {/* Welcome Card */}
      <div className="bg-white/40 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center transition-transform duration-300 hover:scale-105">
        <p className="text-2xl font-semibold">
          Welcome, <span className="font-bold text-purple-600">{teacher?.username}</span>
        </p>
      </div>

      {/* Courses and Students */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Courses and Students</h1>

      {teacherCourses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Courses Created Yet</h2>
          <p className="text-gray-600 mb-6">Start creating your first course to track enrolled students.</p>
          <Link 
            to="/teacherDashboard/create_course"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Your First Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {teacherCourses.map((course) => (
            <div key={course._id} 
              className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-700 mb-4">
                {course.courseName}
              </h3>
              <div className="mb-4">
                <p className="text-gray-600">
                  Total Enrolled: {course.enrolledStudentsDetails?.length || 0}
                </p>
              </div>
              <div className="space-y-3">
                {course.enrolledStudentsDetails?.map((student) => (
                  <div key={student._id} 
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                    <p className="font-semibold text-purple-600">
                      {student.username}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <MdAlternateEmail className="h-4 w-4"/>
                      {student.email}
                    </p>
                    {student.phone && (
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <BsFillTelephoneFill className="h-4 w-4"/>
                        {student.phone}
                      </p>
                    )}
                  </div>
                ))}
                {!course.enrolledStudentsDetails?.length && (
                  <p className="text-center text-gray-500 py-4">
                    No students enrolled yet
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Students Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {allStudents?.length > 0 ? (
          allStudents.map((student, index) => (
            <div
              key={student._id}
              className={`p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/50 
              ${index % 2 === 0 ? 'bg-purple-100' : 'bg-blue-100'}`}
            >
              <h3 className="text-xl font-bold text-purple-700 mb-2">{student?.username}</h3>
              <div className="space-y-1 text-gray-700">
                <p className="flex items-center gap-2 text-sm">
                  <MdAlternateEmail className="h-5 w-5 text-purple-500" />
                  {student?.email}
                </p>
                <p className="flex items-center text-sm">
                  <BsFillTelephoneFill className="h-4 w-4 mr-2 text-purple-500" />
                  {student.phone}
                </p>
                <p className="flex items-center text-sm">
                  <FaBook className="h-4 w-4 mr-2 text-purple-500" />
                  {student?.enrolledCourses?.length} Courses
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-300 flex justify-between items-center">
                <Link to={`/getStudentDetails/${student._id}`} className="bg-purple-400 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-500 transition-all duration-300 shadow-md">
                  View Profile
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-2xl text-gray-500 font-medium">No students found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackAllStudents;
