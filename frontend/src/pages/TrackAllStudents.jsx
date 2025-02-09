import React, { useEffect } from 'react';
import useUserStore from '../store/useUserStore';
import Loader from '@/components/Loader';
import useAuthStore from '@/store/useAuthStore';
import { Link } from 'react-router-dom';
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";

const TrackAllStudents = () => {
  const { allStudents, teacher, loading, trackAllStudents, getTeacherProfile, getStudentDetails } = useUserStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getTeacherProfile();
    trackAllStudents();
  }, [trackAllStudents, user]);

  if (loading) {
    return <div className="text-center py-10 text-gray-600"><Loader /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen relative">
      {/* Improved Header */}
      <div className="mb-12 flex justify-around items-center">
      <button onClick={() => window.history.back()} className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg text-indigo-600 hover:bg-white/70 hover:text-indigo-800 transition-colors duration-300 flex items-center gap-2 shadow-sm hover:shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Dashboard
        </button>
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-left md:text-center mb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Students
            </span>
            
          </h1>
        </div>
        
      </div>

      <div className="backdrop-blur-sm bg-white/30 border border-white/30 p-8 rounded-2xl mb-12 text-center shadow-xl hover:shadow-2xl transition-all duration-300">
        <p className="text-2xl">
          <span className="text-gray-600 font-medium">Welcome,</span>
          <span className="ml-2 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {teacher?.username}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allStudents?.length > 0 ? (
          allStudents.map(student => (
            <div key={student._id} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl transition-all duration-300 group-hover:scale-x-100 scale-x-0"></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-indigo-700 transition-colors duration-300 line-clamp-1" title={student?.username}>
                {student?.username}
              </h3>
              <div className="space-y-1">
                <p className="flex items-center text-gray-600 gap-2 text-sm">
                  <MdAlternateEmail className="h-5 w-5" />
                  <span className="line-clamp-1">{student?.email}</span>
                </p>
                <p className="flex items-center text-gray-600 text-sm">
                  <BsFillTelephoneFill className="h-4 w-4 mr-2" />
                  {student.phone}
                </p>
                <p className="flex items-center text-gray-600 text-sm">
                  <FaBook className="h-4 w-4 mr-2" />
                  {student?.enrolledCourses?.length} Courses
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between items-center">
                <Link to={`/getStudentDetails/${student._id}`} className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 transition-colors duration-300">
                  View Profile
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-2xl text-gray-500 font-medium">No students found</p>
            <p className="text-gray-400 mt-2">Start by adding students to your class</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackAllStudents;