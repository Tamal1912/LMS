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
