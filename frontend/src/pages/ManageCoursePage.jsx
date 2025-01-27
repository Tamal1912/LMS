import React, { useState, useEffect } from 'react'
import useCourseStore from '../store/useCourseStore'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

const ManageCoursePage = () => {
  const { allCourses, getCourses, deleteCourse, loading } = useCourseStore()
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    getCourses()
  }, [getCourses])

  const handleDelete = async (courseId) => {
    try {
      setIsDeleting(true)
      const success = await deleteCourse(courseId)
      if (!success) {
        toast.error('Failed to delete course')
      }
    } catch (error) {
      console.error('Error in delete handler:', error)
      toast.error('Failed to delete course')
    } finally {
      setIsDeleting(false)
    }
  }

  const navigate = useNavigate()
  // Ensure allCourses is an array
  const courses = Array.isArray(allCourses) ? allCourses : []


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate("/api/teacherDashboard")} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
          <Link 
            to="/teacherDashboard/create_course"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Course
          </Link>
        </div>

        {loading ? (
          
            <Loader/>
          
        ) : courses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl text-gray-600">No courses found</h3>
            <p className="text-gray-500 mt-2">Start by creating a new course</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.courseName}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.courseDescription}</p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Link 
                      to={`/courseDetails/${course._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </Link>
                    <div className="space-x-2">
                      <button 
                        onClick={() => handleDelete(course._id)}
                        disabled={isDeleting}
                        className={`text-red-600 hover:text-red-800 font-medium ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                      <Link 
                        to={`/teacherDashboard/update_course/${course._id}`}
                        className="text-green-600 hover:text-green-800 font-medium"
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
  )
}

export default ManageCoursePage