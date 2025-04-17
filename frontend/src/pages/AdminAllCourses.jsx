import React from 'react'
import { useState } from 'react'
import useCourseStore from '@/store/useCourseStore'
import { use } from 'react'
import { useEffect } from 'react'
import { useAdminStore } from '@/store/useAdminStore'
const AdminAllCourses = () => {

  // const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true)
  const {getTeacherCourses} = useCourseStore();
  const [courses, SetCourses] = useState([]);
  const {getAllCourses,allCourses} = useAdminStore();
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getAllCourses();
        SetCourses(response.data.courses);
        console.log("Courses fetched successfully:", response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  

  return (
    <>
    {/* <h1>AdminAllCourses</h1> */}
    <h1 className='text-3xl font-bold text-center'>Admin All Courses</h1>
    <div className='flex justify-center items-center h-screen'>
      <h2 className='text-2xl font-semibold'>Welcome to Admin All Courses Page</h2>
       
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {courses.map((course) => (
            <div key={course._id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
   
  
    
    </>
  )
}

export default AdminAllCourses