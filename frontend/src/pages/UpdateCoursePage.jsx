import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import useCourseStore from "../store/useCourseStore";

const UpdateCoursePage = () => {
  const { allCourses, updateCourse, getCourses } = useCourseStore();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [submitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState({
    courseName: "",
    courseDescription: "",
    courseOutcome: "",
    courseContent: "",
    assignments: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCourses(); // Fetch all courses when component mounts
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to fetch course details");
        setLoading(false);
      }
    };
    fetchData();
  }, [getCourses]);

  useEffect(() => {
    if (allCourses.length > 0) {
      const course = allCourses.find((course) => course._id === courseId);
      if (course) {
        setCourseDetails(course);
      }
    }
  }, [allCourses, courseId]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Only convert files if they are newly uploaded (File objects)
      const videoBase64 = courseDetails.courseContent instanceof File
        ? await convertToBase64(courseDetails.courseContent)
        : courseDetails.courseContent;
      
      const assignmentBase64 = courseDetails.assignments instanceof File
        ? await convertToBase64(courseDetails.assignments)
        : courseDetails.assignments;

      const courseData = {
        ...courseDetails,
        courseContent: videoBase64,
        assignments: assignmentBase64,
      };

      await updateCourse(courseId, courseData);

      
      toast.success("Course updated successfully");
      navigate("/teacherDashboard/manage_course");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.message || "Failed to update course");
      console.error("Error updating course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        alert("Video file is too large. Maximum size is 500MB");
        return;
      }
      setCourseDetails({ ...courseDetails, courseContent: file });
    }
  };

  const handleAssignmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Assignment file is too large. Maximum size is 10MB");
        return;
      }
      setCourseDetails({ ...courseDetails, assignments: file });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Update Course
          </h1>

          {submitting ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <Loader />
                <p className="mt-4 text-lg">Updating your course...</p>
                <p className="text-sm text-gray-500">Please wait while we process your files</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Name
                </label>
                <input
                  type="text"
                  value={courseDetails.courseName}
                  onChange={(e) =>
                    setCourseDetails({ ...courseDetails, courseName: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Outcome
                </label>
                <textarea
                  value={courseDetails.courseOutcome}
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      courseOutcome: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows={4}
                  required
                />
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
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a video</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="video/*"
                          onChange={handleVideoChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      MP4, WebM up to 500MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assignment
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
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload assignment file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept=".pdf,.doc,.docx"
                          onChange={handleAssignmentChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Course
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateCoursePage;
