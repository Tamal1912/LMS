import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import  useCourseStore  from "../store/useCourseStore";
import { Link } from "react-router-dom";

const CourseDetails = () => {
  const { courseId } = useParams();
  const {
    allCourses,
    loading,
    error,
    getCourses,
    enrollCourse,
    getEnrolledCourses,
    enrolledCourses,
  } = useCourseStore();

  const course = allCourses.find((course) => course._id === courseId);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    getEnrolledCourses();
  }, [getEnrolledCourses]);
  useEffect(() => {
    setIsEnrolled(enrolledCourses.includes(courseId));
  }, [enrolledCourses]);

  const handleEnroll=async()=>{
    await enrollCourse(courseId);
    setIsEnrolled(true);
  }
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Breadcrumb */}
        <div className="container mx-auto px-4 py-3">
          <nav className="text-md   text-gray-500">
            <Link to="/courses">
            <span>Courses</span> /{" "}
            <span className="text-gray-700">{course?.courseName}</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Video and Description Section */}
            <div className="w-full lg:w-2/3">
              {/* Video Player */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="relative pt-[56.25%]">
                  <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    controls
                    src={course?.courseContent}
                    poster="/video-placeholder.jpg"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Course Info Tabs */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    <button className="border-b-2 border-blue-500 pb-4 px-1 text-blue-600 font-medium">
                      Overview
                    </button>
                    
                  </nav>
                </div>

                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {course?.courseName}
                    </h1>
                    <p className="text-gray-600">{course?.courseDescription}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      What you'll learn
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course?.courseOutcome
                        ?.split("\n")
                        .map((outcome, index) => (
                          <div key={index} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mt-1 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-gray-600">{outcome}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assignments Section */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Course Assignments
                </h2>

                <div className="space-y-4">
                  {course?.assignments && (
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Assignment Materials
                      </h3>
                      <a
                        href={course.assignments}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4.586l-2.293-2.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V7z" />
                        </svg>
                        Download Materials
                      </a>
                    </div>
                  )}

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Submit Assignment
                    </h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="file"
                          className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100
                          cursor-pointer"
                        />
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
                        Submit Work
                      </button>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Your Progress
                    </h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">45% Complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
