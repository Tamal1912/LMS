import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateAccessToken } from '../utils/jwt.utils.js';
import Student from '../models/Student.model.js';
import Teacher from '../models/Teacher.model.js';

import dotenv from 'dotenv';
dotenv.config();

export const auth = asyncHandler(async (req, res, next) => {
  
  try {
    // Get token from authorization header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log("user auth")
    

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token not found" 
      });
    }

    try {
    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists in either Student or Teacher model
    let user = await Student.findById(decodedToken?._id).select("-password -refreshToken");
    
    if (!user) {
      user = await Teacher.findById(decodedToken?._id).select("-password -refreshToken");
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or session expired" 
      });
    }

    // Add user and role to request object
    req.user = user;
    req.userType = user instanceof Student ? 'student' : 'teacher';
    
    next();
    
  }catch (jwtError) {
    if (jwtError.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login.",
        isExpired: true
      });
    }
    throw new ApiError(401, "Invalid authentication token");
  }
} catch (error) {
  return res.status(error.statusCode || 401).json({
    success: false,
    message: error.message || "Authentication failed"
  });
}
});

// Optional: Specific middleware for student routes
export const requireStudent = asyncHandler(async (req, res, next) => {
  if (req.userType !== 'student') {
    toast.error("Access denied. Students only.");
    return res.status(403).json({
      success: false,
      message: "Access denied. Students only."
    });
  }
  next();
});

// Optional: Specific middleware for teacher routes
export const requireTeacher = asyncHandler(async (req, res, next) => {
  if (req.userType !== 'teacher') {
    return res.status(403).json({
      success: false,
      message: "Access denied. Teachers only."
    });
  }
  next();;
});

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Access Forbidden");
    }
    next();
  };
};

export { authorizeRole };
