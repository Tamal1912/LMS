import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCourseStore from "../store/useCourseStore.js";
import Loader from "../components/Loader.jsx";
import { Link } from "react-router-dom";

const CourseDetails = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const {
        allCourses,
        watchCourse,
        suggestedCourses,
        loading,
        error,
    } = useCourseStore();

    const [suggestedList, setSuggestedList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await watchCourse(courseId);
                const suggested = await suggestedCourses();
                setSuggestedList(suggested);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [courseId]);

    const handleEmailInstructor = () => {
        const instructorEmail = course.courseOwner?.email;
        const emailBody=`Hello ${course.courseOwner?.username},\n\nI have a question regarding the course "${course.courseName}".\n\nBest regards,\n[Your Name]`;
        const emailSubject=`Question about "${course.courseName}"`;
        const emailBodyEncoded = encodeURIComponent(emailBody);
        const emailSubjectEncoded = encodeURIComponent(emailSubject);

         const gmailURL=`https://mail.google.com/mail/?view=cm&fs=1&to=${instructorEmail} &su=${emailSubjectEncoded}&body=${emailBodyEncoded}`;
        // Open the Gmail compose window in a new tab
        window.open(gmailURL, "_blank");
    };

    const course = allCourses.find((c) => c._id === courseId);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
    if (error) return <div className="text-red-500 text-center mt-10 text-lg">Error: {error}</div>;
    if (!course) return <div className="text-gray-500 text-center mt-10 text-lg">Course not found.</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#1e3c72] text-white">
          
            <div className=" items-center p-6 bg-[#0f172a]/70 backdrop-blur-md border border-[#ffffff22] rounded-3xl shadow-2xl mb-8">
              
            <Link to="/studentDashboard" className="text-[#00fff0] pl-4 text-lg font-bold transition-all duration-300">
                ← Back to Dashboard
            </Link>

            <Link to="/courses" className="text-[#00fff0] pl-4 text-lg font-semibold transition-all duration-300">
            ← Courses Page
                
            </Link>
            </div>
          
            <div className="flex flex-col md:flex-row max-w-[1600px] mx-auto gap-8 p-8">

                {/* Left Side */}
                <div className="md:w-[70%] flex flex-col gap-6">

                    {/* Video Player */}
                    <div className="rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-[#ffffff22] bg-[#0f172a]/70 backdrop-blur-sm">
                        <video
                            className="w-full aspect-video rounded-xl"
                            controls
                            src={course.courseContent}
                            poster={course.courseImage}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Course Info */}
                    <div className="bg-[#0f172a]/60 backdrop-blur-md border border-[#ffffff22] rounded-3xl shadow-2xl p-8 text-white">
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#00fff0] to-[#ff0090] text-transparent bg-clip-text mb-5 leading-tight tracking-wide">
                            🎓 {course.courseName}
                        </h1>
                        <p className="text-gray-300 leading-relaxed text-[1.1rem] mb-6">
                            {course.courseDescription}
                        </p>

                        {/* Instructor Section */}
                        <div className="border-t border-[#ffffff33] pt-6 mt-6">
                            <h2 className="text-2xl font-bold text-white mb-4">👨‍🏫 Instructor</h2>
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00bcd4] to-[#8e24aa] text-white flex items-center justify-center text-2xl font-bold shadow-lg ring-4 ring-white/20">
                                    {course.courseOwner?.username?.[0]?.toUpperCase() || "?"}
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-white">
                                        {course.courseOwner?.username || "Instructor"}
                                    </p>
                                    <p className="text-sm text-gray-400">Email : {course.courseOwner?.email}</p>
                                    <p className="text-sm text-gray-400">{course.courseOwner?.phone}</p>
                                </div>

                            {/* gmail to instructor */}
                           
                            <button
                                className="mt-4 px-4 py-2 bg-gradient-to-r from-[#00bcd4] to-[#8e24aa] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                onClick={handleEmailInstructor}
                                >
                                Connect To Instructor
                            </button>
                                </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Suggested Courses */}
                <div className="md:w-[30%] h-[calc(100vh-4rem)] sticky top-4 overflow-y-auto bg-[#0f172a]/70 shadow-xl rounded-3xl p-6 border border-[#ffffff22] backdrop-blur-md text-white">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#80d0c7] to-[#13547a] text-transparent bg-clip-text mb-6">✨ Suggested Courses</h2>
                    <div className="space-y-6">
                        {suggestedList.map((suggestedCourse) => (
                            <div
                                key={suggestedCourse._id}
                                className="flex gap-4 p-3 rounded-xl bg-[#1e293b] hover:bg-[#2a3a55] transition-all duration-300 ease-in-out cursor-pointer group shadow-md hover:shadow-xl"
                                onClick={() => navigate(`/courseDetails/${suggestedCourse._id}`)}
                            >
                                <img
                                    src={suggestedCourse.courseImage}
                                    alt={suggestedCourse.courseName}
                                    className="w-28 h-20 object-cover rounded-xl shadow-md group-hover:scale-[1.03] transition-transform duration-200"
                                />
                                <div className="flex-1">
                                    <h3 className="text-[16px] font-semibold text-white leading-snug line-clamp-2">
                                        {suggestedCourse.courseName}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {suggestedCourse.courseOwner?.username}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                        {suggestedCourse.courseDescription}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CourseDetails;
