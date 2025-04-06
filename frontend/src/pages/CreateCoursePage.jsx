import React, { useState, useEffect } from "react";
import useCourseStore from "../store/useCourseStore";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";




const CreateCoursePage = () => {
  const navigate = useNavigate();
  const {teacher,getTeacherProfile} = useUserStore();
  const { createCourse} = useCourseStore();
  const [submitting, setIsSubmitting] = useState(false);
  const [courseDetails, setCourseDetails] = useState({
    courseName: "",
    courseDescription: "",
    courseOutcome: "",
    courseContent: "",
    courseImage: "",

  });
  
  useEffect(() => {
    getTeacherProfile();
  }, []);

  // Add function to convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Modified handleSubmit to handle file conversions
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Creating course...");
    setIsSubmitting(true);

    try {
      // Convert files to base64 strings
      const videoBase64 = courseDetails.courseContent
        ? await convertToBase64(courseDetails.courseContent)
        : null;

      const courseImageBase64 = courseDetails.courseImage
        ? await convertToBase64(courseDetails.courseImage)
        : null;

      const courseData = {
        ...courseDetails,
        courseContent: videoBase64,

        courseImage: courseImageBase64,
      };

      await createCourse(courseData);

      setIsSubmitting(false);
      toast.success("Course created successfully");
      setCourseDetails({
        courseName: "",
        courseDescription: "",
        courseOutcome: "",
        courseImage: "",
        courseContent: "",
        assignments: "",
      });
      navigate("/teacherDashboard/manage_course");
    } catch (error) {
      toast.error(error.message || "Failed to create course");
      console.error("Error processing files:", error);
    }
  };

  // Modified file input handlers
  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Optional: Add file size validation
      if (file.size > 500 * 1024 * 1024) {
        // 500MB limit
        alert("Video file is too large. Maximum size is 500MB");
        return;
      }
      setCourseDetails({ ...courseDetails, courseContent: file });
    }
  };



  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      
      if (file.size > 10 * 1024 * 1024) {
       
        alert("Image file is too large. Maximum size is 10MB");
        return;
      }
      setCourseDetails({ ...courseDetails, courseImage: file });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <button 
            onClick={() => navigate("/api/teacherDashboard")} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Dashboard
          </button>
          <h1 className="text-3xl font-bold text-center mb-8">
            Create New Course
          </h1>

          {submitting ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <Loader />
                <p className="mt-4 text-lg">Creating your course...</p>
                <p className="text-sm text-gray-500">Please wait while we process your files</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Course Owner : {teacher?.username}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={courseDetails.courseName}
                    onChange={(e) =>
                      setCourseDetails({
                        ...courseDetails,
                        courseName: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Course Description
                  </label>
                  <textarea
                    value={courseDetails.courseDescription}
                    onChange={(e) =>
                      setCourseDetails({
                        ...courseDetails,
                        courseDescription: e.target.value,
                      })
                    }
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

               

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Course Outcomes
                  </label>
                  <textarea
                    value={courseDetails.courseOutcome}
                    onChange={(e) =>
                      setCourseDetails({
                        ...courseDetails,
                        courseOutcome: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Course Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path 
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 "
                        > 
                          <span>Upload a Course Image</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange}
                            required 
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Course Content (Video)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 ">
                          <span>Upload a Course Video</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="video/*"
                            onChange={handleVideoChange}
                            required
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        MP4, WebM up to 500MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Course
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateCoursePage;
 
