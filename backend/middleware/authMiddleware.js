import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateAccessToken } from '../utils/jwt.utils.js';
import Student from '../models/Student.model.js';
import Teacher from '../models/Teacher.model.js';

export const auth = asyncHandler(async (req, res, next) => {
  try {
    // Get token from cookies or authorization header
    const token = req.cookies?.accessToken || 
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check both Student and Teacher models
    let user = await Student.findById(decoded._id).select("-password");
    if (!user) {
      user = await Teacher.findById(decoded._id).select("-password");
    }

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
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
