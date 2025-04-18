import Student from '../models/Student.model.js';
import Teacher from '../models/Teacher.model.js';
import bcrypt from 'bcryptjs';

import {ApiError} from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponses.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils.js';

import jwt from 'jsonwebtoken';

// Student Login
const studentLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
      throw new ApiError(400, "Email and Password are required");
  }

  // Find user by email
  const user = await Student.findOne({ email });

  if (!user) {
      throw new ApiError(404, "User not found");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
  }

  // Generate JWT token
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  // Send both cookie and response with token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'strict',
    maxAge: 40 * 60 * 1000, // 40 minutes
  });

  return res.status(200).json(
    new ApiResponse(200, {
      accessToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: 'student'
      }
    }, "Login successful")
  );
});

// Student Sign-Up
const studentSignUp =asyncHandler(async (req, res) => {
 
  const {username,password,email}=req.body;


  if ([username, email, password].some((field) => !field?.trim())) {
    throw new ApiError(409, "Fill all the fields");
}

  let existedStudent=await Student.findOne({
      $or:[{ username },{ email }]
  })

  if(existedStudent){
   throw new ApiError(400, "User already exist");
  }
  

  const user=await Student.create({
      username,
      password,
      email,
  })

  const accessToken=generateAccessToken(user._id);
  const refreshToken=generateRefreshToken(user._id);

  user.refreshToken=refreshToken;
  await user.save();

  const createdUser=await Student.findById(user._id).select(
      "-password -refreshToken"
  )
  
  if(!createdUser){
      throw new ApiError(500, "internal server error");
  }
   
  res.cookie("accessToken",accessToken,{
    httpOnly:true,
    maxAge:40*60*1000,
  })
  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    maxAge:7*24*60*60*1000,
  })    

  res.status(200).json(
      new ApiResponse(201,createdUser,"user Succesfully registred")
  )
}

);

// Teacher Login
const teacherLogin =  asyncHandler(async (req, res) => {
    console.log("teacher login");
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
      throw new ApiError(400, "Email and Password are required");
  }

  // Find user by email
  const user = await Teacher.findOne({ email });

  if (!user) {
      throw new ApiError(404, "User not found");
      process.exit(1);
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
  }

  // Generate JWT token
  const accessToken=generateAccessToken(user._id);
  const refreshToken=generateRefreshToken(user._id);

  user.refreshToken=refreshToken;
  await user.save();

  res.cookie("accessToken",accessToken,{
    httpOnly:true,
    maxAge:40*60*1000,
  })
  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    maxAge:7*24*60*60*1000,
  })    

  // Send response with token
  res.status(200).json(
      new ApiResponse(200, { accessToken, refreshToken, username: user.username, email: user.email }, "Login successful")
  );
});

// Teacher Sign-Up
const teacherSignUp = async (req, res) => {
  const {username,password,email}=req.body;


  if ([username, email, password].some((field) => !field?.trim())) {
    throw new ApiError(409, "Fill all the fields");
}

  let existedTeacher=await Teacher.findOne({
      $or:[{ username },{ email }]
  })

  if(existedTeacher){
   throw new ApiError(400, "User already exist");
  }
  

  const user=await Teacher.create({
    username,
      password,
      email,
  })

  const accessToken=generateAccessToken(user._id);
  const refreshToken=generateRefreshToken(user._id);

  user.refreshToken=refreshToken;
  await user.save();

  const createdUser=await Teacher.findById(user._id).select(
      "-password -refreshToken"
  )
  
  if(!createdUser){
      throw new ApiError(500, "internal server error");
  }

  res.cookie("accessToken",accessToken,{
    httpOnly:true,
    maxAge:40*60*1000,
  })
  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    maxAge:7*24*60*60*1000,
  })    

  res.status(200).json(
      new ApiResponse(201,createdUser,"user Succesfully registred")
  )
};

const logout = asyncHandler(async (req, res) => {
    try {
      // Clear cookies
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
  
      return res.status(200).json(new ApiResponse(200,"Logged out successfully"));
    } catch (error) {
      return res.status(500).json(new ApiError(500,"Failed to log out"));
    }
  
});


const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
   console.log("refresh token generated",token);
  if (!token) {
    throw new ApiError(401, "Refresh token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const student = await Student.findById(decoded._id);
    const teacher = await Teacher.findById(decoded._id);

    const user = student || teacher;

    if (!user || user.refreshToken !== token) {
      throw new ApiError(403, "Invalid refresh token");
    }

    const newAccessToken = generateAccessToken(user._id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'strict',
      maxAge: 10 * 60 * 1000, 
    });

    return res.status(200).json(
      new ApiResponse(200, { accessToken: newAccessToken }, "Access token refreshed")
    );

  } catch (error) {
    throw new ApiError(403, "Refresh token invalid or expired");
  }
});



export { studentLogin, studentSignUp, teacherLogin , teacherSignUp, logout, refreshAccessToken };
