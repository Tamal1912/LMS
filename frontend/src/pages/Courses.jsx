import React, { useEffect, useState } from "react";
import useCourseStore from "../store/useCourseStore.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Courses = () => {
   
    let navigate=useNavigate();
    const { allCourses,loading, error, getCourses, enrollCourse, getEnrolledCourses } = useCourseStore();


    useEffect(() => {
        getCourses();
    }, []);

    const handleCourseClick=async(courseId)=>{
        await enrollCourse(courseId);
        navigate(`/course/${courseId}`);
        setIsEnrolled(true);
    }


   

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Courses ({allCourses.length})</h1>
                       
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allCourses && allCourses.map((course) => (
                            <div key={course._id} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{course.courseName}</h3>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-600">{course.courseOutcome}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-green-600 h-2.5 rounded-full" style={{width: '88%'}}></div>
                                    </div>
                                </div>
                                    <Link to={`/courseDetails/${course._id}`}>
                                <button onClick={()=>handleCourseClick(course._id)} className={`mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200`}>
                                     Watch
                                </button>
                                    </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;
