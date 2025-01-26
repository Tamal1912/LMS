import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import Student from '../models/Student.model.js';
import Teacher from '../models/Teacher.model.js';

// Middleware to check user roles
export const checkRole = (allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user) {
            throw new ApiError(401, "Authentication required");
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw new ApiError(403, "You don't have permission to access this resource");
        }

        next();
    });
};

// Activity logging middleware
export const logActivity = asyncHandler(async (req, res, next) => {
    const activityInfo = {
        userId: req.user?._id,
        userType: req.user?.role,
        method: req.method,
        path: req.path,
        timestamp: new Date(),
        ip: req.ip
    };
    
    // You can implement logging logic here
    // For example, save to database or log file
    console.log("User Activity:", activityInfo);
    
    next();
});
