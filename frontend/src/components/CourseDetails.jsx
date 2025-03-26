import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCourseStore from "../store/useCourseStore";


const CourseDetails = () => {
  const { courseId } = useParams();
  const { allCourses, watchCourse } = useCourseStore();

  const course = allCourses.find((course) => course._id === courseId);

  useEffect(() => {
    watchCourse(courseId);
  }, [watchCourse, courseId]);



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <nav className="text-md text-gray-500">
            <span onClick={() => window.history.back()} className="cursor-pointer hover:text-blue-600">Back</span> /{" "}
            <span className="text-gray-700 font-medium">{course?.courseName}</span>
          
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Video and Description Section */}
          <div className="w-full lg:w-2/3">
            {/* Video Player */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
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

            {/* Course Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                  <button className="border-b-2 border-blue-500 pb-4 px-1 text-blue-600 font-medium">
                    Course Overview
                  </button>
                </nav>
              </div>

              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {course?.courseName}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {course?.courseDescription}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    What you'll learn
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {course?.courseOutcome?.split("\n").map((outcome, index) => (
                      <div key={index} className="flex items-start bg-blue-50 p-4 rounded-xl">
                        <svg
                          className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0"
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
                        <span className="text-gray-700">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assignments Section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Course Materials
              </h2>

              <div className="space-y-6">
                {course?.assignments && (
                  <div className="p-6 border-2 border-blue-100 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">
                      Assignment Resources
                    </h3>
                    <a
                      href={course.assignments}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4.586l-2.293-2.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V7z" />
                      </svg>
                      Download Assignment
                    </a>
                  </div>
                )}

                {/* Progress Section */}
                <div className="p-6 border-2 border-green-100 rounded-xl bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">
                    Course Progress
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 font-medium">
                    45% Course Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
