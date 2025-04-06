import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCourseStore from "../store/useCourseStore";
import { FiDownload, FiMaximize2 } from "react-icons/fi";


const CourseDetails = () => {
  const { courseId } = useParams();
  const { allCourses, watchCourse } = useCourseStore();
  const [showAssignment, setShowAssignment] = useState(false);

  const course = allCourses.find((course) => course._id === courseId);

  useEffect(() => {
    watchCourse(courseId);
  }, [watchCourse, courseId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <nav className="text-md text-gray-500">
          <span onClick={() => window.history.back()} className="cursor-pointer hover:text-blue-600">
            Back
          </span>{" "}
          / <span className="text-gray-700 font-medium">{course?.courseName}</span>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course?.courseName}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{course?.courseDescription}</p>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
