import { asyncHandler } from "../utils/asyncHandler.js";
import Course from "../models/Course.model.js";
import cloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponses.js";
import Teacher from "../models/Teacher.model.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/User.model.js";

export const createCourse = asyncHandler(async (req, res) => {
    try {
        const { courseName, courseDescription,courseContent,courseOutcome,assignments } = req.body;

       
        if (!courseContent) {
            throw new Error("Video file is required");
        }


        // Upload directly to Cloudinary using the base64 string
        const videoUploadResponse = await cloudinary.uploader.upload(courseContent, {
            resource_type: "video",
            folder: "course_videos"
        });


        const assignmentUploadResponse = await cloudinary.uploader.upload(assignments, {
            resource_type: "raw",
            folder: "course_assignments"
        });

        // Create course
        const course = await Course.create({
            courseName,
            courseDescription,
            courseOutcome,
            courseContent:videoUploadResponse.secure_url,
            assignments:assignmentUploadResponse.secure_url,

        });
        await course.save();
        res.status(201).json(new ApiResponse(200,course,"Course created successfully"))

    } catch (error) {
        console.error("Error creating course:", error);
        throw new ApiError(500,"Failed to create course")

    }
});

export const deleteCourse =asyncHandler(async (req, res) => {
    try {
        const {courseId}=req.params;
        const course=await Course.findByIdAndDelete(courseId);
        if(!course) return res.status(404).json(ApiResponse.error("Course not found"))
        await course.save();
        res.status(200).json(ApiResponse.success(course,"Course deleted successfully"))
    } catch (error) {
        console.log(error);
        res.status(500).json(asyncHandler(error))
    }
}) ;

export const updateCourse =asyncHandler(async (req, res) => {
    try {
        const {courseId}=req.params;
        const {courseName,courseDescription,courseOutcome,courseContent,assignments}=req.body;
        const course=await Course.findByIdAndUpdate(courseId,{courseName,courseDescription,courseOutcome,courseContent,assignments});
        if(!course) return res.status(404).json(ApiResponse.error("Course not found"))
        await course.save();
        res.status(200).json(ApiResponse.success(course,"Course updated successfully"))
    } catch (error) {
        console.log(error);
        res.status(500).json(asyncHandler(error))
    }
})  

export const getAllCourse =asyncHandler(async (req, res) => {
    try {
        const courses=await Course.find();       
        res.status(200).json({courses});
    } catch (error) {
        console.log(error);
        throw new ApiError(500,null,"Failed to fetch courses")
    }
})


export const watchCourse = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        res.status(200).json(new ApiResponse(200,course,"Course fetched successfully"))
    } catch (error) {
        console.log(error);
        throw new ApiError(500,"Failed to Fetch course")
    }
})



// export const checkEnrollmentStatus = asyncHandler(async (req, res) => {
//     const { courseId } = req.params;
//     const userId = req.user._id;

//     try {
//         const user = await User.findById(userId);
//         const isEnrolled = user.enrolledCourses.includes(courseId);
        
//         res.status(200).json({
//             success: true,
//             isEnrolled
//         });
//     } catch (error) {
//         throw new ApiError(500, "Failed to check enrollment status");
//     }
// }

// );      

