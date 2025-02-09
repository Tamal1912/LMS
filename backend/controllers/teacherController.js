 
import Teacher from "../models/Teacher.model.js"
import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import Student from '../models/Student.model.js';
import e from "express";



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
    
    
    const teacher = await Teacher.findById(req.user._id);
    
    
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
