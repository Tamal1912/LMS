 
import Teacher from "../models/Teacher.model.js"
import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import Student from '../models/Student.model.js';




export const trackAllStudents = asyncHandler(async (req, res) => {
    try {
        const students = await Student.find({});
        return res.status(200).json({students});
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to fetch students");
    }
});

export const getTeacherProfile = asyncHandler(async (req, res) => {
    
    
    const teacher = await Teacher.findById(req.user._id)
    .populate('courses','courseName courseDescription');
    
    
    if (!teacher) {
        throw new ApiError(404, "Teacher not found");
    }
    return res.status(200).json({teacher});
});

export const getStudentDetails = asyncHandler(async (req, res) => {

    const student =await Student.findById(req.params.id);
    if (!student) {
        throw new ApiError(404, "Student not found");
    }    
    return res.status(200).json({student});
});

export const updateTeacherProfile = asyncHandler(async (req, res) => {
    try {
        const { username, email, phone,education, experience, bio } = req.body;
        const teacherId = req.user._id;

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            {
                $set: {
                    username,
                    email,
                    phone,
                    education,
                    experience,
                    bio,
                }
            },
            { new: true }
        ).populate('courses');

        if (!updatedTeacher) {
            throw new ApiError(404, "Teacher not found");
        }

        return res.status(200).json({
            success: true,
            teacher: updatedTeacher,
            message: "Profile updated successfully"
        });
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to update profile");
    }
});;
