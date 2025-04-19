import Student from "../models/Student.model.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import Course from "../models/Course.model.js";



export const getStudentProfile = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id || req.user._id;
        
        const student = await Student.findById(userId)
            .select('-password -refreshToken')
            

        if (!student) {
            throw new ApiError(404, "Student not found");
        }

        return res.status(200).json({
            success: true,
            message: "Student profile fetched successfully",
            data: student
        });
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while fetching profile");
    }
});

export const updateStudentProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, phone, yearJoined, program } = req.body;
        
        const updatedStudent = await Student.findByIdAndUpdate(
            userId,
            { username, email, phone, yearJoined, program },
            { new: true, runValidators: true }
        ).select('-password'); 

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Send response with consistent format
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedStudent
        });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

export const getAllCourses =asyncHandler(async (req, res) => {
    try {
        const courses=await Course.find().sort({createdAt:-1}).populate('courseOwner', 'username email phoneNumber profileImage').lean(); 
              
        res.status(200).json({courses});
    } catch (error) {
        console.log(error);
        throw new ApiError(500,null,"Failed to fetch courses")
    }
})

export const enrollInCourse = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user._id; // Assuming the user is authenticated and their ID is in req.user._id

        const course = await Course.findById(courseId);
        if (!course) {
            throw new ApiError(404, "Course not found");
        }

        // Check if the student is already enrolled in the course
        const alreadyEnrolled = course.enrolledStudents.some(
            (student) => student.student.toString() === studentId.toString()
        );

        if (alreadyEnrolled) {
            return res.status(400).json({
                success: false,
                message: "Already enrolled in this course",
            });
        }

        // Enroll the student in the course
        course.enrolledStudents.push({ student: studentId });
        await course.save();

        return res.status(200).json({
            success: true,
            message: "Successfully enrolled in the course",
            data: course,
        });
    } catch (error) {
        
        console.error("Enrollment error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
});

