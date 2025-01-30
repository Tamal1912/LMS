import Student from "../models/Student.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponses.js";
import {asyncHandler} from "../utils/asyncHandler.js";


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

